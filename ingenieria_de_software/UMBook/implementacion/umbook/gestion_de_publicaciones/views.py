from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PublicacionSerializer, ComentarioSerializer, AlbumSerializer, AlbumImageSerializer
from .models import Publicacion, Comentario, Album, AlbumImage

# Create your views here.
class PublicacionView(viewsets.ModelViewSet):
    serializer_class = PublicacionSerializer
    queryset = Publicacion.objects.all()


class ComentarioView(viewsets.ModelViewSet):
    serializer_class = ComentarioSerializer
    queryset = Comentario.objects.all()


class AlbumView(viewsets.ModelViewSet):
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()


class AlbumImageView(viewsets.ModelViewSet):
    serializer_class = AlbumImageSerializer
    queryset = AlbumImage.objects.all()