from django.urls import path
from . import views

urlpatterns = [
    path('portfolio',              views.PortfolioView.as_view()),
    path('auth/login',             views.LoginView.as_view()),
    path('profile',                views.ProfileView.as_view()),
    path('skills',                 views.SkillsView.as_view()),
    path('skills/<int:pk>',        views.SkillDetailView.as_view()),
    path('skills/item/<int:pk>',   views.SkillItemView.as_view()),
    path('projects',               views.ProjectsView.as_view()),
    path('projects/<int:pk>',      views.ProjectDetailView.as_view()),
    path('services',               views.ServicesView.as_view()),
    path('services/<int:pk>',      views.ServiceDetailView.as_view()),
    path('contact',                views.ContactView.as_view()),
    path('contact/message',        views.ContactMessageView.as_view()),
    path('messages',               views.MessagesView.as_view()),
    path('messages/<int:pk>/read', views.MessageReadView.as_view()),
    path('education',                   views.EducationView.as_view()),
    path('education/<int:pk>',          views.EducationDetailView.as_view()),
    path('certifications',              views.CertificationView.as_view()),
    path('certifications/<int:pk>',     views.CertificationDetailView.as_view()),
]
