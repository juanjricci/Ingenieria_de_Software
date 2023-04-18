# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import email

from django.shortcuts import render
from django.contrib.auth.models import User
from validacion.serializers import UserSerializer, RegisterSerializer, LoginSerializer
from rest_framework import viewsets

# Create your views here.


class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class RegisterView(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()


class LoginView(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    queryset = User.objects.all()
