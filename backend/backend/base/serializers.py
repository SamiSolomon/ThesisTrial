from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from .models import Hospital, Service, Appointment, Feedback
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'name', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
class userSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token', 'first_name', 'last_name']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
        
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description']

class HospitalSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Hospital
        fields = ['id', 'name', 'services', 'location', 'information', 'image', 'contact', 'latitude', 'longitude']
        
    def get_distance(self, obj):
        return getattr(obj, 'distance', None)

    def create(self, validated_data):
        services_data = validated_data.pop('services')
        hospital = Hospital.objects.create(**validated_data)
        for service_data in services_data:
            Service.objects.create(hospital=hospital, **service_data)
        return hospital
    
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if username and password:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                raise serializers.ValidationError(_("Invalid username or password"))

            if not user.check_password(password):
                raise serializers.ValidationError(_("Invalid username or password"))

            token = RefreshToken.for_user(user)
            return {
                'username': user.username,
                'token': str(token.access_token)
            }
        else:
            raise serializers.ValidationError(_("Must include username and password"))
