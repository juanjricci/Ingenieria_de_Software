import email
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django import forms

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    #password = forms.CharField(widget=forms.PasswordInput)
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password')
        #extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError("Incorrect Credentials")