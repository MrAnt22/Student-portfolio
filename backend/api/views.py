from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions, generics, status
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
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
    resp = requests.get(url)

    if resp.status_code != 200:
        return Response({"error": "Cannot fetch GitHub data"}, status=resp.status_code)

    repos = resp.json()
    repo_count = len(repos)
    total_stars = sum(r.get("stargazers_count", 0) for r in repos)
    top_repos = sorted(repos, key=lambda r: r.get("stargazers_count", 0), reverse=True)[:4]

    top = [
        {
            "name": r["name"],
            "stars": r["stargazers_count"],
            "url": r["html_url"],
        }
        for r in top_repos
    ]

    return Response({
        "github_username": username,
        "repo_count": repo_count,
        "total_stars": total_stars,
        "top_repos": top
    })       

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_summary(request):
    student = request.user
    skills = Skill.objects.filter(student=student).order_by('-level')
    serializer = SkillSerializer(skills, many=True)

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

    data = {
        "user": UserSerializer(student).data,
        "skills": SkillSerializer(skills, many=True).data if skills else [],
    }

    return Response(data)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

