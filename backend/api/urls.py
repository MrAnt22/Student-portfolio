from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('project', ProjectViewset, basename="project")
router.register('skills', SkillViewSet, basename="skills")

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/update/', UpdateUser.as_view(), name='user_update'),
    path('api/github_stats/', github_stats, name='github_stats'),
    path('api/summary/', profile_summary, name='profile_summary'),
    path('api/public/<str:username>/', public_portfolio, name='public_portfolio'),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# urlpatterns = [
#     path('', home)
# ]