from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Album(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    titulo = models.CharField(max_length=100)
    fecha = models.CharField(max_length=100)

    def __str__(self):
        return str(self.titulo)


class AlbumImage(models.Model):
    album = models.ForeignKey(Album, related_name='images', on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='albums/images/')

    def __unicode__(self,):
        return str(self.image)


class Publicacion(models.Model):
    foto = models.ImageField(upload_to="fotos", null=True)
    descripcion = models.TextField()
    fecha = models.CharField(max_length=50)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)


class Comentario(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    contenido = models.TextField()
    fecha = models.CharField(max_length=100)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.pk)
