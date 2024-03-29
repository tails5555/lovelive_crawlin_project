from rest_framework.pagination import PageNumberPagination

class ListPagination(PageNumberPagination) :
    page_size = 20
    page_size_query_param = 'sz'
    max_page_size = 100

class CardPagination(PageNumberPagination) :
    page_size = 9
    page_size_query_param = 'sz'
    max_page_size = 18

class SongPagination(PageNumberPagination) :
    page_size = 12
    page_size_query_description = 'sz'
    max_page_size = 24