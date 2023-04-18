from django.contrib import admin
from .models import Publicacion, Comentario, Album, AlbumImage

# Register your models here.
class PublicacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'foto', 'descripcion', 'fecha', 'owner')
    

class ComentarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'contenido', 'fecha', 'publicacion')


class AlbumAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'titulo', 'fecha')


class AlbumImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'album', 'imagen')

admin.site.register(Publicacion, PublicacionAdmin)
admin.site.register(Comentario, ComentarioAdmin)
admin.site.register(Album, AlbumAdmin)
admin.site.register(AlbumImage, AlbumImageAdmin)