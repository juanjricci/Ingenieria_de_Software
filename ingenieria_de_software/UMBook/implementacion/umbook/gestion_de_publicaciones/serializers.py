from rest_framework import serializers
from django.db.models import fields
from .models import Publicacion, Comentario, Album, AlbumImage

class PublicacionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Publicacion
        fields = ('id', 'foto', 'descripcion', 'fecha', 'owner')

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ('id', 'owner', 'contenido', 'fecha', 'publicacion')

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'owner', 'titulo', 'fecha')

class AlbumImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumImage
        fields = ('id', 'album', 'imagen')