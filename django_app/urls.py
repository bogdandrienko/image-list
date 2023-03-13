from django.urls import re_path
from django_app import views

urlpatterns = [
    re_path(r"^images/$", views.images),
    re_path(r"^images/(?P<pk>\d+)/$", views.index),  # todo detail of image model
    re_path(r"^images/upload/$", views.index),  # todo upload of new image model
]
