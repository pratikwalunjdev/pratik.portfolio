from django.db import models


class Profile(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('busy', 'Busy'),
        ('unavailable', 'Unavailable'),
    ]
    name      = models.CharField(max_length=255, default='Your Name')
    role      = models.CharField(max_length=255, default='Full Stack Developer')
    bio       = models.TextField(blank=True)
    exp       = models.CharField(max_length=50, default='5+')
    loc       = models.CharField(max_length=255, default='Pune, India')
    projcount = models.CharField(max_length=50, default='30+')
    status    = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    updated_at = models.DateTimeField(auto_now=True)


class ContactInfo(models.Model):
    email            = models.CharField(max_length=255, default='your@email.com')
    github           = models.CharField(max_length=500, default='https://github.com/you')
    linkedin         = models.CharField(max_length=500, default='https://linkedin.com/in/you')
    contact_subtitle = models.TextField(blank=True)
    updated_at       = models.DateTimeField(auto_now=True)


class SkillCategory(models.Model):
    name          = models.CharField(max_length=255)
    display_order = models.IntegerField(default=0)
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order']


class Skill(models.Model):
    category      = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name          = models.CharField(max_length=255)
    level         = models.IntegerField(default=80)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']


class Project(models.Model):
    name          = models.CharField(max_length=255)
    category      = models.CharField(max_length=50, default='Other')
    description   = models.TextField(blank=True)
    tags          = models.JSONField(default=list)
    icon          = models.CharField(max_length=20, default='💻')
    live_url      = models.CharField(max_length=500, blank=True, default='#')
    github_url    = models.CharField(max_length=500, blank=True, default='#')
    display_order = models.IntegerField(default=0)
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', 'created_at']


class Service(models.Model):
    icon          = models.CharField(max_length=20, blank=True)
    name          = models.CharField(max_length=255)
    description   = models.TextField(blank=True)
    tag           = models.CharField(max_length=255, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']


class Education(models.Model):
    degree      = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    duration    = models.CharField(max_length=100, blank=True)
    grade       = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']


class Certification(models.Model):
    title          = models.CharField(max_length=255)
    issuer         = models.CharField(max_length=255)
    date           = models.CharField(max_length=100, blank=True)
    credential_url = models.CharField(max_length=500, blank=True)
    description    = models.TextField(blank=True)
    display_order  = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']


class ContactMessage(models.Model):
    sender_name = models.CharField(max_length=255)
    email       = models.CharField(max_length=255)
    subject     = models.CharField(max_length=255, blank=True)
    message     = models.TextField()
    is_read     = models.BooleanField(default=False)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
