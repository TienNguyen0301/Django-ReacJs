
from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(prefix='users', viewset=views.UserViewSet, basename='user')
router.register(prefix='posts', viewset=views.PostViewSet, basename='post')
router.register(prefix='postdetail', viewset=views.PostDetailViewSet, basename='postdetail')
router.register(prefix='comments', viewset=views.CommentViewSet, basename='comment')
router.register(prefix='likes', viewset=views.LikeViewSet, basename='like')
router.register(prefix='uppost', viewset=views.UpPostViewSet, basename='uppost')
router.register(prefix='HashTagViewSet', viewset=views.HashTagViewSet, basename='HashTag')
router.register(prefix='HashTagViewSet', viewset=views.HashTagViewSet, basename='HashTag')




urlpatterns = [
    path('', include(router.urls)),
    path('oauth2-info/', views.AuthInfo.as_view()),
]