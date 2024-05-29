from django.urls import path
from . import views


urlpatterns = [
    path('', views.HomeView.as_view() ),
    path('api/login/', views.UserLoginView.as_view(), name='token_obtain_pair'),
    path('api/register/', views.RegisterUserAPIView.as_view(), name='token_obtain_pair'),

    path('api/users/profile/', views.UserProfileAPIView.as_view(), name='users-profile'),
    path('api/users', views.UserProfileListView.as_view(),name="user-list"),
    path('api/search/', views.SearchAPIView.as_view(), name='search'),


    path('api/hospitals/', views.HospitalListAPIView.as_view(), name='hospital-list'),
    path('api/services/', views.AllServicesListAPIView.as_view(), name='all-services-list'),
    path('api/nearbyhospitals/', views.NearbyHospitalsAPIView.as_view(), name='nearby-hospitals'),

    path('api/feedback/', views.SubmitFeedbackView.as_view(), name='submit_feedback'),

    path('api/hospitals/<str:hospital_id>/', views.ServiceListAPIView.as_view(), name='hospital-services-list'),

    path('api/appointments/', views.AppointmentCreateAPIView.as_view(), name='appointment-create'),

]

