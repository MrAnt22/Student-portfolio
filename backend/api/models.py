from django.db import models
from django.conf import settings
from django.contrib.auth.models import User, AbstractUser

class Student(AbstractUser):
    date_of_birth = models.DateField(null=True, blank=True)
    patronymic = models.CharField(max_length=50, blank=True)
    profile_photo = models.ImageField(upload_to='students/photos/', blank=True, null=True)
    faculty = models.CharField(max_length=100, default="ІПЗЕ")
    group = models.CharField(max_length=20, blank=True)
    year_of_study = models.PositiveIntegerField(null=True, blank=True)
    specialization = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    github_link = models.URLField(blank=True)
    linkedin_link = models.URLField(blank=True)
    portfolio_link = models.URLField(blank=True)
    bio = models.TextField(blank=True)

    def github_username(self):
        if self.github_link:
            return self.github_link.rstrip("/").split("/")[-1]
        return None

    def __str__(self):
        return f"{self.last_name} {self.first_name}"
    
class Skill(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="skills")
    name = models.CharField(max_length=100)
    level = models.PositiveIntegerField(default=2)
    def category(self):
        if self.level == 4:
            return "Дуже добре"
        elif self.level == 3:
            return "Добре"
        elif self.level == 2:
            return "Середньо"
        else:
            return "Є що повчити"

    def __str__(self):
        return f"{self.name} ({self.level}%)"

class Project(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(blank=True, null=True, max_length=300)

    def __str__(self):
        return self.name
