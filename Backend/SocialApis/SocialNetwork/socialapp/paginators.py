from rest_framework import pagination


class SocialPaginator(pagination.PageNumberPagination):
    page_size = 30
    page_query_param = 'page'
