from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField



class User(AbstractUser):
    avatar = models.ImageField(null=True, upload_to='users/%Y/%m')


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='post')
    post_id = models.AutoField(primary_key=True)
    title = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='users/%Y/%m', default=None)
    content = models.TextField(blank=True, null=True)
    auctioneer = models.CharField(max_length=1)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True, null=True, blank=True)
    views = models.IntegerField(default=0)

    class Meta:
        managed = True
        db_table = 'post'

    def __str__(self):
        return self.content

    def save(self, *args, **kwargs):
        title = self.title
        post_id = self.post_id

        super(Post, self).save(*args, **kwargs)

        s = title.split()
        hashtag = []
        for i in s:
            if i[0] == '#':
                hashtag.append(i)
        print(hashtag)

        for ht in hashtag:
            hgt = HashTag.objects.filter(name = ht)
            if len(list(hgt)) == 0:
                p = HashTag.objects.create(name = ht)
                p.post.add(Post.objects.get(post_id=post_id))
                p.save()
            else:
                p = HashTag.objects.get(name = ht)
                p.post.add(Post.objects.get(post_id=post_id))
                p.save()


class HashTag(models.Model):
    name = models.CharField(max_length=20, unique=True)
    post = models.ManyToManyField(Post, blank=True, null=True, related_name='hashtags')

    def __str__(self):
        return self.name




class ActionBase(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        unique_together = ('post', 'creator')

class Action(ActionBase):
    LIKE, HAHA, HEART = range(3)
    ACTIONS = [
        (LIKE, 'like'),
        (HAHA, 'haha'),
        (HEART, 'heart')

    ]
    type = models.PositiveSmallIntegerField(choices=ACTIONS, default=LIKE)


class Likes(models.Model):
    like_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='likes')
    created_date = models.DateTimeField(auto_now_add=True)



class Rating(ActionBase):
    rate = models.PositiveSmallIntegerField(default=0)


class PostView(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    views = models.IntegerField(default=0)
    post = models.OneToOneField(Post, on_delete=models.CASCADE)



class Auction(models.Model):
    auction_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='auctions')
    date_created = models.DateTimeField()
    price = models.BigIntegerField()

    class Meta:
        managed = True
        db_table = 'auction'


# class Imagepost(models.Model):
#     image_post_id = models.AutoField(primary_key=True)
#     image_url = models.CharField(max_length=255, db_collation='utf8_general_ci')
#     post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='imageposts')
#
#     class Meta:
#         managed = True
#         db_table = 'imagepost'

class ModelBase(models.Model):
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Comment(ModelBase):
    content = models.TextField()
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content



