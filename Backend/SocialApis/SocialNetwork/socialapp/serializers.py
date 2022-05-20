from .models import User, Post, Action, Rating, Comment, PostView, HashTag, Likes
from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField, ModelSerializer


class UserSerializer(serializers.ModelSerializer):
    # avatar = serializers.SerializerMethodField(source='avatar')
    #
    # def get_avatar(self, obj):
    #     try:
    #         request = self.context['request']
    #         if obj.avatar and not obj.avatar.name.startswith("/static"):
    #             path = '/static/%s' % obj.avatar.name
    #
    #             return request.build_absolute_uri(path)
    #     except:
    #         return request.build_absolute_uri('ok')
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'avatar',
                  'last_name', 'email', 'date_joined', 'id', 'is_superuser']
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        data = validated_data.copy()

        u = User(**data)
        u.set_password(u.password)
        u.save()

        return u


class PostSerializer(serializers.ModelSerializer):
    image = SerializerMethodField()
    user = UserSerializer()
    #user = serializers.ReadOnlyField(source='user.id')


    def get_image(self, posts):
        request = self.context['request']
        name = posts.image.name
        if name.startswith('static/'):
            path = '/%s' % name
        else:
            path = '/static/%s' % name

        return request.build_absolute_uri(path)



    class Meta:
        model = Post
        fields = ('__all__')

class HashTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = HashTag
        fields = '__all__'
        lookup_field = 'name'




class PostDetailSerializer(serializers.ModelSerializer):
    image = SerializerMethodField()
    rate = SerializerMethodField()

    def get_rate(self, post):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            r = post.rating_set.filter(creator=request.user).first()
            if r:
                return r.rate

        return -1

    def get_like(self, post):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            l = post.like_set.filter(creator=request.user).first()
            if l:
                return l.rate

        return -1

    def get_image(self, posts):
        request = self.context['request']
        name = posts.image.name
        if name.startswith('static/'):
            path = '/%s' % name
        else:
            path = '/static/%s' % name

        return request.build_absolute_uri(path)

    class Meta:
        model = PostSerializer.Meta.model
        fields = PostSerializer.Meta.fields
        fields = [field.name for field in model._meta.fields]
        fields.append('rate')


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = ['id', 'type', 'created_date']


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'rate', 'created_date']


class AddCommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_date', 'updated_date', 'user']


class LikeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    # user = UserSerializer()

    class Meta:
        model = Likes
        fields = '__all__'

class UpPostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    class Meta:
        model = Post
        fields = '__all__'
# class AddPostSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Post
#         fields = ['id', 'content', 'title', 'created_date', 'updated_date']


# class AddPostSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Post
#         fields = ['id', 'content', 'created_date', 'updated_date']



class PostViewSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = PostView
        fields = ['id', 'views', 'post']
        # exclude = ['user']

class CommentSerializer(serializers.ModelSerializer):
    creator = UserSerializer()


    class Meta:
        model = Comment
        exclude = ['active']

# class PostDesSerializer(serializers.ModelSerializer):
#     user = UserSerializer()
#
#     class Meta:
#         model = PostDetail
#         exclude = ['active']