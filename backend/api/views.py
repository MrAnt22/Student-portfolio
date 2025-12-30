from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, generics, status, authentication, exceptions
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
import requests

class RegisterView(generics.CreateAPIView):
    queryset = Student.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': user.username
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(student=self.request.user)

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class UpdateUser(generics.UpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = UpdateUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class ProjectViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self,request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)
    
    def update(self, request, pk):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    
    def destroy(self, request, pk):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def github_stats(request):
    student = request.user
    username = student.github_username()

    if not username:
        return Response({"error": "GitHub link not set"}, status=400)

    url = f"https://api.github.com/users/{username}/repos"
    headers = {
        "Authorization": f"token {settings.GITHUB_TOKEN}"
    }
    resp = requests.get(url, headers=headers)

    if resp.status_code != 200:
        return Response({"error": "Cannot fetch GitHub data"}, status=resp.status_code)

    repos = resp.json()

    repo_count = len(repos)
    total_stars = sum(r.get("stargazers_count", 0) for r in repos)
    total_forks = sum(r.get("forks_count", 0) for r in repos)
    total_watchers = sum(r.get("watchers_count", 0) for r in repos)

    top_repos = sorted(repos, key=lambda r: r.get("stargazers_count", 0), reverse=True)[:5]
    top = [
        {
            "name": r["name"],
            "stars": r["stargazers_count"],
            "url": r["html_url"],
            "language": r.get("language")
        }
        for r in top_repos
    ]

    language_totals = {}

    for repo in top_repos:
        lang = repo.get("language")
        if lang:
            language_totals[lang] = language_totals.get(lang, 0) + 1

    top_languages = sorted(language_totals.items(), key=lambda x: x[1], reverse=True)

    last_push = max((r.get("pushed_at") for r in repos if r.get("pushed_at")), default=None)

    largest_repo = max(repos, key=lambda r: r.get("size", 0), default=None)
    largest_repo_info = {
        "name": largest_repo["name"],
        "size": largest_repo.get("size", 0),
        "url": largest_repo["html_url"]
    } if largest_repo else None

    return Response({
        "github_username": username,
        "repo_count": repo_count,
        "total_stars": total_stars,
        "total_forks": total_forks,
        "total_watchers": total_watchers,
        "last_push": last_push,
        "top_repos": top,
        "top_languages": top_languages,
        "largest_repo": largest_repo_info,
    })
    

def get_top_repos(username, limit=5):
    url = f"https://api.github.com/users/{username}/repos?per_page=100"
    repos = requests.get(url).json()

    if isinstance(repos, dict) and repos.get("message"):
        return []

    repos_sorted = sorted(repos, key=lambda r: r.get("stargazers_count", 0), reverse=True)

    top = []
    for r in repos_sorted[:limit]:
        top.append({
            "name": r["name"],
            "stars": r["stargazers_count"],
            "html_url": r["html_url"],
            "language": r["language"]
        })
    return top


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_summary(request):
    student = request.user
    skills = Skill.objects.filter(student=student).order_by('-level')
    serializer = SkillSerializer(skills, many=True)
    g_username = student.github_username()
    top_repos = get_top_repos(g_username) if g_username else []
    

    return Response({
        "profile": {
            "username": student.username,
            "email": student.email,
            "first_name": student.first_name,
            "last_name": student.last_name,
            "group": student.group,
            "year_of_study": student.year_of_study,
            "specialization": student.specialization,
            "bio": student.bio,
        },
        "top_repos": top_repos,
        "skills": serializer.data
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def public_portfolio(request, username):
    try:
        student = Student.objects.get(username=username)
    except Student.DoesNotExist:
        return Response({"error": "Користувача не знайдено"}, status=404)

    skills = Skill.objects.filter(student=student) if hasattr(Skill, "student") else []
    g_username = student.github_username()
    top_repos = get_top_repos(g_username) if g_username else []

    data = {
        "user": UserSerializer(student).data,
        "skills": SkillSerializer(skills, many=True).data if skills else [],
        "top_repos": top_repos,
    }

    return Response(data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

