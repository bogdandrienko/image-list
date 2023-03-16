import time

from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django_app import models as django_models, serializers as django_serializers


def index(request: HttpRequest) -> HttpResponse:
    return render(request, "index.html", context={})


@api_view(http_method_names=["GET"])
def images(request: WSGIRequest) -> Response:
    time.sleep(1.5)

    images_objs = django_models.ImageModel.objects.filter(is_view=True)
    images_json = django_serializers.ImageModelSerializer(instance=images_objs, many=True).data
    return Response(data={"response": images_json}, status=status.HTTP_200_OK)


# @csrf_exempt
# @permission_classes([AllowAny])
@api_view(http_method_names=["POST"])
def images_upload(request: WSGIRequest) -> Response:
    time.sleep(1.5)

    user = None
    if not request.user.is_anonymous:
        user = request.user

    django_models.ImageModel.objects.create(
        author=user,
        title=request.POST.get("title", None),
        description=request.POST.get("description", ""),
        avatar=request.FILES.get("avatar", None),
        is_view=True,  # False
    )

    return Response(data={"response": "Запись успешно добавлена!"}, status=status.HTTP_201_CREATED)


# def images(request: HttpRequest) -> JsonResponse:
#     data = {"name": "Python"}
#     return JsonResponse(data=data, status=200, safe=False)

@api_view(http_method_names=["GET"])
def data(request):
    time.sleep(1.5)
    datas = [{"name": f"Python {i}"} for i in range(1, 100)]
    return Response(data={"response": datas}, status=status.HTTP_200_OK)
