from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import Profile, ContactInfo, SkillCategory, Skill, Project, Service, ContactMessage, Education, Certification


class PortfolioView(APIView):
    """GET /api/portfolio/"""
    def get(self, request):
        profile    = Profile.objects.first()    or Profile()
        contact    = ContactInfo.objects.first() or ContactInfo()
        categories = SkillCategory.objects.prefetch_related('skills').all()
        projects   = Project.objects.all()
        services   = Service.objects.all()
        edu_rows   = Education.objects.all()
        cert_rows  = Certification.objects.all()

        skills_data = [
            {
                'id':    cat.id,
                'cat':   cat.name,
                'items': [{'id': s.id, 'name': s.name, 'level': s.level} for s in cat.skills.all()],
            }
            for cat in categories
        ]

        projects_data = [
            {
                'id':     p.id,
                'name':   p.name,
                'cat':    p.category,
                'desc':   p.description,
                'tags':   p.tags,
                'icon':   p.icon,
                'live':   p.live_url or '#',
                'github': p.github_url or '#',
            }
            for p in projects
        ]

        services_data = [
            {
                'id':   s.id,
                'icon': s.icon,
                'name': s.name,
                'desc': s.description,
                'tag':  s.tag,
            }
            for s in services
        ]

        education = [
            {
                'id':          e.id,
                'degree':      e.degree,
                'institution': e.institution,
                'duration':    e.duration,
                'grade':       e.grade,
                'description': e.description,
            }
            for e in edu_rows
        ]

        certifications = [
            {
                'id':             c.id,
                'title':          c.title,
                'issuer':         c.issuer,
                'date':           c.date,
                'credential_url': c.credential_url,
                'description':    c.description,
            }
            for c in cert_rows
        ]

        return Response({
            'name':       profile.name,
            'role':       profile.role,
            'bio':        profile.bio,
            'exp':        profile.exp,
            'loc':        profile.loc,
            'projcount':  profile.projcount,
            'status':     profile.status,
            'email':      contact.email,
            'github':     contact.github,
            'linkedin':   contact.linkedin,
            'contactSub': contact.contact_subtitle,
            'skills':     skills_data,
            'projects':   projects_data,
            'services':   services_data,
            'education':      education,
            'certifications': certifications,
        })


class LoginView(APIView):
    """POST /api/auth/login/"""
    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '').strip()

        if not username or not password:
            return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        token = RefreshToken.for_user(user).access_token
        return Response({'token': str(token)})


class ProfileView(APIView):
    """PUT /api/profile/"""
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = Profile.objects.first()
        fields  = ['name', 'role', 'bio', 'exp', 'loc', 'projcount', 'status']
        for field in fields:
            if field in request.data:
                setattr(profile, field, request.data[field])
        profile.save()
        return Response({'message': 'Profile updated'})


class SkillsView(APIView):
    """POST /api/skills/"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cat   = request.data.get('cat', '').strip()
        items = request.data.get('items', [])

        if not cat or not items:
            return Response({'error': 'cat and items[] are required'}, status=status.HTTP_400_BAD_REQUEST)

        category, _ = SkillCategory.objects.get_or_create(
            name=cat,
            defaults={'display_order': SkillCategory.objects.count()},
        )
        existing_offset = Skill.objects.filter(category=category).count()
        for i, name in enumerate(items):
            name = name.strip()
            if name:
                Skill.objects.get_or_create(
                    category=category,
                    name=name,
                    defaults={'display_order': existing_offset + i},
                )
        return Response({'message': 'Skills saved'})


class SkillDetailView(APIView):
    """DELETE /api/skills/<pk>/"""
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            SkillCategory.objects.get(pk=pk).delete()
            return Response({'message': 'Skill category deleted'})
        except SkillCategory.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class ProjectsView(APIView):
    """POST /api/projects/"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        name = request.data.get('name', '').strip()
        if not name:
            return Response({'error': 'name is required'}, status=status.HTTP_400_BAD_REQUEST)

        project = Project.objects.create(
            name=name,
            category=request.data.get('cat', 'Other'),
            description=request.data.get('desc', ''),
            tags=request.data.get('tags', []),
            icon=request.data.get('icon', '💻'),
            live_url=request.data.get('live', '#'),
            github_url=request.data.get('github', '#'),
            display_order=Project.objects.count(),
        )
        return Response({'id': project.id, 'message': 'Project created'}, status=status.HTTP_201_CREATED)


class ProjectDetailView(APIView):
    """DELETE /api/projects/<pk>/"""
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            Project.objects.get(pk=pk).delete()
            return Response({'message': 'Project deleted'})
        except Project.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class ServicesView(APIView):
    """POST /api/services/"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        name = request.data.get('name', '').strip()
        if not name:
            return Response({'error': 'name is required'}, status=status.HTTP_400_BAD_REQUEST)

        service = Service.objects.create(
            icon=request.data.get('icon', '🔧'),
            name=name,
            description=request.data.get('desc', ''),
            tag=request.data.get('tag', ''),
            display_order=Service.objects.count(),
        )
        return Response({'id': service.id, 'message': 'Service created'}, status=status.HTTP_201_CREATED)


class ServiceDetailView(APIView):
    """DELETE /api/services/<pk>/"""
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            Service.objects.get(pk=pk).delete()
            return Response({'message': 'Service deleted'})
        except Service.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class ContactView(APIView):
    """PUT /api/contact/"""
    permission_classes = [IsAuthenticated]

    def put(self, request):
        contact  = ContactInfo.objects.first()
        mapping  = {'email': 'email', 'github': 'github', 'linkedin': 'linkedin', 'contactSub': 'contact_subtitle'}
        for api_key, model_field in mapping.items():
            if api_key in request.data:
                setattr(contact, model_field, request.data[api_key])
        contact.save()
        return Response({'message': 'Contact info updated'})


class ContactMessageView(APIView):
    """POST /api/contact/message/"""
    def post(self, request):
        name    = request.data.get('name', '').strip()
        email   = request.data.get('email', '').strip()
        message = request.data.get('message', '').strip()

        if not name or not email or not message:
            return Response({'error': 'name, email, and message are required'}, status=status.HTTP_400_BAD_REQUEST)

        ContactMessage.objects.create(
            sender_name=name,
            email=email,
            subject=request.data.get('subject', ''),
            message=message,
        )
        return Response({'message': 'Message received'}, status=status.HTTP_201_CREATED)


class MessagesView(APIView):
    """GET /api/messages/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        msgs = ContactMessage.objects.all()
        return Response([
            {
                'id':          m.id,
                'sender_name': m.sender_name,
                'email':       m.email,
                'subject':     m.subject,
                'message':     m.message,
                'is_read':     m.is_read,
                'created_at':  m.created_at.isoformat(),
            }
            for m in msgs
        ])


class MessageReadView(APIView):
    """PUT /api/messages/<pk>/read/"""
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            msg = ContactMessage.objects.get(pk=pk)
            msg.is_read = True
            msg.save()
            return Response({'message': 'Marked as read'})
        except ContactMessage.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class SkillItemView(APIView):
    """PUT /api/skills/item/<pk> — update level (and name) of a single skill
       DELETE /api/skills/item/<pk> — remove a single skill"""
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            skill = Skill.objects.get(pk=pk)
        except Skill.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        if 'level' in request.data:
            skill.level = max(0, min(100, int(request.data['level'])))
        if 'name' in request.data:
            name = request.data['name'].strip()
            if name:
                skill.name = name
        skill.save()
        return Response({'message': 'Skill updated'})

    def delete(self, request, pk):
        try:
            Skill.objects.get(pk=pk).delete()
            return Response({'message': 'Skill deleted'})
        except Skill.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class EducationView(APIView):
    """POST /api/education"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        degree      = request.data.get('degree', '').strip()
        institution = request.data.get('institution', '').strip()
        if not degree or not institution:
            return Response({'error': 'degree and institution are required'}, status=status.HTTP_400_BAD_REQUEST)

        edu = Education.objects.create(
            degree=degree,
            institution=institution,
            duration=request.data.get('duration', ''),
            grade=request.data.get('grade', ''),
            description=request.data.get('description', ''),
            display_order=Education.objects.count(),
        )
        return Response({'id': edu.id, 'message': 'Education added'}, status=status.HTTP_201_CREATED)


class EducationDetailView(APIView):
    """DELETE /api/education/<pk>"""
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            Education.objects.get(pk=pk).delete()
            return Response({'message': 'Education deleted'})
        except Education.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class CertificationView(APIView):
    """POST /api/certifications"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        title  = request.data.get('title', '').strip()
        issuer = request.data.get('issuer', '').strip()
        if not title or not issuer:
            return Response({'error': 'title and issuer are required'}, status=status.HTTP_400_BAD_REQUEST)

        cert = Certification.objects.create(
            title=title,
            issuer=issuer,
            date=request.data.get('date', ''),
            credential_url=request.data.get('credential_url', ''),
            description=request.data.get('description', ''),
            display_order=Certification.objects.count(),
        )
        return Response({'id': cert.id, 'message': 'Certification added'}, status=status.HTTP_201_CREATED)


class CertificationDetailView(APIView):
    """DELETE /api/certifications/<pk>"""
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            Certification.objects.get(pk=pk).delete()
            return Response({'message': 'Certification deleted'})
        except Certification.DoesNotExist:
            return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
