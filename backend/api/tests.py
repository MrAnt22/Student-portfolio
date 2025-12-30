from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Student, Skill
from unittest.mock import patch

class StudentPortfolioTests(APITestCase):

    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('token_obtain_pair')
        self.refresh_url = reverse('token_refresh')
        self.update_url = reverse('user_update')
        self.summary_url = reverse('profile_summary')
        self.public_url = lambda username: reverse('public_portfolio', args=[username])
        self.github_url = reverse('github_stats')

        self.user_data = {
            "username": "tester",
            "password": "pass12345",
            "email": "tester@example.com"
        }

        res = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(res.status_code, 201)

        login_res = self.client.post(self.login_url, {
            "username": "tester",
            "password": "pass12345"
        }, format='json')
        self.assertEqual(login_res.status_code, 200)

        self.access = login_res.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access}")

    def test_registration(self):
        data = {
            "username": "newuser",
            "password": "pass123123",
            "email": "newuser@example.com"
        }
        response = self.client.post(self.register_url, data, format="json")
        self.assertEqual(response.status_code, 201)

    def test_login(self):
        response = self.client.post(self.login_url, self.user_data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)

    def test_update_profile(self):
        response = self.client.patch(self.update_url, {
            "first_name": "Max",
        }, format="multipart")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["first_name"], "Max")

    def test_create_skill(self):
        res = self.client.post("/api/skills/", {
            "name": "Python",
            "level": 5
        })
        self.assertEqual(res.status_code, 201)
        self.assertEqual(Skill.objects.count(), 1)

    def test_summary(self):
        Skill.objects.create(student=Student.objects.get(username="tester"), name="Python", level=4)

        res = self.client.get(self.summary_url)
        self.assertEqual(res.status_code, 200)
        self.assertIn("skills", res.data)

    def test_public_portfolio(self):
        res = self.client.get(self.public_url("tester"))
        self.assertEqual(res.status_code, 200)
        self.assertIn("user", res.data)

    @patch("api.views.requests.get")
    def test_github_stats(self, mock_get):
        mock_response = mock_get.return_value
        mock_response.status_code = 200
        mock_response.json.return_value = [
            {
                "name": "repo1",
                "stargazers_count": 10,
                "forks_count": 2,
                "watchers_count": 5,
                "html_url": "url1",
                "language": "Python",
            },
            {
                "name": "repo2",
                "stargazers_count": 5,
                "forks_count": 1,
                "watchers_count": 3,
                "html_url": "url2",
                "language": "JavaScript",
            },
        ]

        student = Student.objects.get(username="tester")
        student.github_link = "https://github.com/tester"
        student.save()

        res = self.client.get(self.github_url)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["repo_count"], 2)
        self.assertEqual(res.data["total_stars"], 15)
