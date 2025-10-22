from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model= Project
        fields = ('id', 'name', 'start_date', 'end_date', 'comments')

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'level']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password',
            'date_of_birth', 'faculty', 'group', 'year_of_study',
            'specialization', 'github_link', 'linkedin_link', 'bio', 'profile_photo']
        
    def create(self, validated_data):
        user = Student.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            group=validated_data.get('group', ''),
            year_of_study=validated_data.get('year_of_study', None),
            github_link=validated_data.get('github_link', ''),
            linkedin_link=validated_data.get('linkedin_link', ''),
            bio=validated_data.get('bio', ''),
        )
        return user

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['first_name', 'last_name', 'email', 'faculty', 'group', 'year_of_study', 'specialization', 'github_link', 'linkedin_link', 'bio', 'profile_photo']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

        return token