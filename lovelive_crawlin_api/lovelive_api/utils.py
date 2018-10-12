from rest_framework.pagination import PageNumberPagination

class ListPagination(PageNumberPagination) :
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class CardPagination(PageNumberPagination) :
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 16