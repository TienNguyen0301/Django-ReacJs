from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, generics
from django.conf import settings
from .models import User, Post, Action, Rating, Comment, PostView, HashTag, Likes
from .paginators import SocialPaginator
from .perms import CommentOwnerPermisson
from .serializers import (
    UserSerializer,
    PostSerializer,
    ActionSerializer,
    RatingSerializer,
    CommentSerializer,
    AddCommentSerializer,
    PostViewSerializer,
    PostDetailSerializer,
    # AddPostSerializer,
    LikeSerializer,
    UpPostSerializer,
    HashTagSerializer,

)
from django.db.models import F
from django.http import Http404




class PostViewSet(viewsets.ViewSet, generics.ListAPIView, generics.CreateAPIView):
    queryset = Post.objects.all().order_by('-created_date')
    serializer_class = PostSerializer
    pagination_class = SocialPaginator

    # def get(self, request, pk):
    #     p = Post.objects.get(pk=pk)
    #     return Response(p,
    #                     status=status.HTTP_200_OK)
    def retrieve(self, request, pk):
        p = Post.objects.get_or_create(post=self.get_object())
        p.views += 1
        p.save()

        return Response(p,
                        status=status.HTTP_200_OK)


    def get_permissions(self):
        if self.action in ['add_comment', 'take_action', 'rate']:
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]




    @action(methods=['post'], detail=True, url_path='add-comment')
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content:
            c = Comment.objects.create(content=content,
                                       post=self.get_object(),
                                       creator=request.user)

            return Response(AddCommentSerializer(c).data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description='Get the comments of a lesson',
        responses={
            status.HTTP_200_OK: CommentSerializer()
        }
    )
    @action(methods=['get'], url_path='comments', detail=True)
    def get_comments(self, request, pk):

        post = self.get_object()
        comments = post.comments.select_related('creator').filter(active=True).order_by('created_date')

        return Response(CommentSerializer(comments, many=True).data,
                        status=status.HTTP_200_OK)


    @action(methods=['post'], detail=True, url_path='like')
    def take_action(self, request, pk):
        try:
            action_type = int(request.data['type'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            action = Action.objects.update_or_create(creator=request.user,
                                                     post=self.get_object(),
                                                     defaults={'type': action_type})

            return Response(ActionSerializer(action).data,
                            status=status.HTTP_200_OK)


    @action(methods=['post'], detail=True, url_path='rating')
    def rate(self, request, pk):
        try:
            rating = int(request.data['rating'])
        except IndexError | ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            r = Rating.objects.update_or_create(creator=request.user,
                                                post=self.get_object(),
                                                defaults={'rate': rating}
                                                )

            return Response(RatingSerializer(r).data,
                            status=status.HTTP_200_OK)


    @action(methods=['get'], detail=True, url_path='views')
    def inc_view(self, request, pk):
        v, created = PostView.objects.get_or_create(post=self.get_object())
        v.views = F('views') + 1
        v.save()

        v.refresh_from_db()

        return Response(PostViewSerializer(v).data,
                        status=status.HTTP_200_OK)



class PostDetailViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Post.objects.filter()
    serializer_class = PostDetailSerializer


class HashTagViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = HashTag.objects.filter()
    serializer_class = HashTagSerializer
    lookup_field = 'name'




class CommentViewSet(viewsets.ViewSet, generics.DestroyAPIView,
                     generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().destroy(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)


    def partial_update(self, request, *args, **kwargs):
        if request.user == self.get_object().creator:
            return super().partial_update(request, *args, **kwargs)

        return Response(status=status.HTTP_403_FORBIDDEN)



class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]


    def get_permissions(self):
        if self.action == 'get_current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], detail=False, url_path='current-user')
    def get_current_user(self, request):
        return Response(self.serializer_class(request.user).data,
                        status=status.HTTP_200_OK)


class AuthInfo(APIView):
    def get(self, request):
        return Response(settings.OAUTH2_INFO, status=status.HTTP_200_OK)



class LikeViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = Likes.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        id_post = serializer.data['post']
        id_user = serializer.data['user']

        likes_object = Likes.objects.filter(user=id_user, post=id_post)
        if len(likes_object) > 1:
            for like_object in likes_object:
                like_object.delete()

class UpPostViewSet(viewsets.ViewSet, generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = UpPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


