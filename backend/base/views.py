from django.utils.translation import gettext_lazy as _
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.core.mail import send_mail
from rest_framework.response import Response
from django.db.models import Count
from .models import Service, Hospital, User, Appointment, Feedback
from .serializers import ServiceSerializer, HospitalSerializer, UserSerializer, userSerializerWithToken, AppointmentSerializer, FeedbackSerializer, RegisterSerializer, UserLoginSerializer

from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.db.models import Q
from geopy.distance import geodesic


class UserProfileListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = userSerializerWithToken(self.user).data
        
        for k, v in serializer.items():
            data[k] = v
        
        return data

        # Add custom claims    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterUserAPIView(APIView):
    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            token_serializer = userSerializerWithToken(user)
            return Response(token_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class HospitalListAPIView(generics.ListAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer


class ServiceListAPIView(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        hospital_id = self.kwargs.get('hospital_id')
        return Service.objects.filter(hospital_id=hospital_id)


class AllServicesListAPIView(generics.ListAPIView):
    queryset = Service.objects.values('id', 'name', 'description').annotate(count=Count('id')).order_by('id').distinct()
    serializer_class = ServiceSerializer


class AppointmentCreateAPIView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        appointment = serializer.save()
        self.send_appointment_email(appointment)

    def send_appointment_email(self, appointment):
        email_content = _(
            f"""
            A new appointment request has been submitted with the following details:

            Hospital: {appointment.hospital}
            Service : {appointment.service}
            Patient Name: {appointment.first_name} {appointment.last_name}
            Appointment Date: {appointment.appointment_date}
            Appointment Time: {appointment.appointment_time}
        """
        )

        send_mail(
            _('New Appointment Request'),
            email_content,
            'doctorhakim54@gmail.com',  # Replace with your sender email
            ['samuelsolomon452@gmail.com', ],  # List of hospital emails
            fail_silently=False,
        )


class SearchAPIView(APIView):
    def get(self, request, format=None):
        query = request.GET.get('query', '').strip()
        user_lat = request.GET.get('latitude', None)
        user_lng = request.GET.get('longitude', None)

        if query:
            hospitals = Hospital.objects.filter(
                Q(name__icontains=query) |
                Q(location__icontains=query) |
                Q(services__name__icontains=query)
            ).distinct()
        else:
            hospitals = Hospital.objects.all()

        if user_lat and user_lng:
            user_location = (float(user_lat), float(user_lng))
            for hospital in hospitals:
                hospital.distance = geodesic(user_location, (hospital.latitude, hospital.longitude)).km
            hospitals = sorted(hospitals, key=lambda x: x.distance)

        hospital_serializer = HospitalSerializer(hospitals, many=True)

        return Response({
            'hospitals': hospital_serializer.data,
        }, status=status.HTTP_200_OK)


class NearbyHospitalsAPIView(APIView):
    def get(self, request, format=None):
        user_lat = request.GET.get('latitude')
        user_lng = request.GET.get('longitude')
     

        if user_lat is not None and user_lng is not None:
            user_location = (float(user_lat), float(user_lng))
            hospitals = Hospital.objects.all()
            hospital_list = []

            for hospital in hospitals:
                if hospital.latitude is not None and hospital.longitude is not None:
                    distance = geodesic(user_location, (hospital.latitude, hospital.longitude)).km
                    hospital.distance = distance  # Dynamically add the distance attribute
                    hospital_list.append(hospital)
                else:
                    hospital.distance = None  # Set distance to None if lat/lng are missing
                    hospital_list.append(hospital)
            
            hospital_list.sort(key=lambda x: x.distance if x.distance is not None else float('inf'))
            hospital_serializer = HospitalSerializer(hospital_list, many=True)
            serialized_data = hospital_serializer.data
            
            for hospital_data, hospital_obj in zip(serialized_data, hospital_list):
                hospital_data['distance'] = hospital_obj.distance
            
            return Response({'hospitals': serialized_data}, status=status.HTTP_200_OK)
        
        return Response({'error': _('Latitude and Longitude required')}, status=status.HTTP_400_BAD_REQUEST)


class SubmitFeedbackView(APIView):
    def post(self, request):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
from django.shortcuts import render
from django.views import View

class HomeView(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'base/home.html')
