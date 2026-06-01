from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        from django.db.models.signals import post_migrate
        post_migrate.connect(_seed_defaults, sender=self)


def _seed_defaults(sender, **kwargs):
    from django.contrib.auth.models import User
    from .models import Profile, ContactInfo, SkillCategory, Skill, Project, Service, Education, Certification

    if not Profile.objects.exists():
        Profile.objects.create(
            name='Your Name',
            role='Full Stack Developer',
            bio=(
                'Passionate software engineer with a love for building impactful digital experiences.\n\n'
                "I specialise in crafting end-to-end web applications — from intuitive UIs to scalable "
                "backend systems. When I'm not coding, you'll find me exploring new tech or contributing "
                'to open source.'
            ),
            exp='5+',
            loc='Pune, India',
            projcount='30+',
            status='available',
        )

    if not ContactInfo.objects.exists():
        ContactInfo.objects.create(
            email='your@email.com',
            github='https://github.com/you',
            linkedin='https://linkedin.com/in/you',
            contact_subtitle=(
                "Open to full-time roles, freelance projects, and interesting collaborations. "
                "Don't hesitate to reach out."
            ),
        )

    if not User.objects.filter(username='pratikwalunjdev').exists():
        User.objects.create_superuser('pratikwalunjdev', '', 'P@ss123')
        print('  Default admin created  →  username: pratikwalunjdev  /  password: P@ss123')

    if not SkillCategory.objects.exists():
        skill_data = [
            ('Frontend',       [('React',95),('TypeScript',88),('Next.js',82),('HTML5',95),('CSS3',90),('Tailwind',87),('Vue.js',72),('Redux',78)]),
            ('Backend',        [('Node.js',88),('Python',92),('Express',85),('FastAPI',80),('Django',84),('GraphQL',72),('Go',65)]),
            ('Databases',      [('PostgreSQL',83),('MySQL',82),('MongoDB',76),('Redis',73),('Supabase',70)]),
            ('DevOps & Tools', [('Docker',82),('AWS',76),('Kubernetes',68),('GitHub Actions',79),('Git',95),('Linux',84),('Nginx',76)]),
        ]
        for order, (cat_name, items) in enumerate(skill_data):
            cat = SkillCategory.objects.create(name=cat_name, display_order=order)
            for i, (skill_name, level) in enumerate(items):
                Skill.objects.create(category=cat, name=skill_name, level=level, display_order=i)

    if not Project.objects.exists():
        projects = [
            ('E-Commerce Platform', 'Web Apps',    'Full-stack e-commerce solution with real-time inventory, payment integration and admin dashboard.', ['React', 'Node.js', 'PostgreSQL'], '🛒'),
            ('AI Chat Assistant',   'AI / ML',     'LLM-powered conversational AI with context memory, RAG pipeline and streaming responses.',           ['Python', 'LangChain', 'React'],  '🤖'),
            ('Task Manager App',    'Mobile',      'Cross-platform mobile app for team task management with real-time sync and push notifications.',      ['React Native', 'Supabase', 'Expo'], '✅'),
            ('Dev CLI Toolkit',     'Open Source', 'A collection of CLI utilities for automating common developer workflows. 500+ GitHub stars.',         ['Node.js', 'TypeScript'],        '⚡'),
            ('SaaS Dashboard',      'Web Apps',    'Analytics dashboard for SaaS metrics with real-time charts, user cohort analysis, and exports.',      ['Next.js', 'PostgreSQL'],         '📊'),
            ('Portfolio Generator', 'Open Source', 'Open source tool to generate developer portfolios from a simple config file. Used by 200+ devs.',    ['React', 'Node.js'],              '🎨'),
        ]
        for i, (name, cat, desc, tags, icon) in enumerate(projects):
            Project.objects.create(
                name=name, category=cat, description=desc,
                tags=tags, icon=icon, display_order=i,
            )

    if not Service.objects.exists():
        services = [
            ('⚡', 'Frontend Development', 'Pixel-perfect, responsive UIs with React, Next.js and modern CSS. Fast, accessible, and beautiful.', 'React · Next.js · TypeScript'),
            ('🔧', 'Backend Engineering',  'Scalable REST & GraphQL APIs, microservices architecture, and robust database design.',               'Node.js · Django · PostgreSQL'),
            ('☁️', 'Cloud & DevOps',       'CI/CD pipelines, Docker/Kubernetes deployments, and cloud infrastructure on AWS.',                   'AWS · Docker · K8s'),
            ('🤖', 'AI Integration',       'Integrate LLMs, build AI-powered features and automate workflows with modern AI tooling.',            'OpenAI · LangChain · RAG'),
        ]
        for i, (icon, name, desc, tag) in enumerate(services):
            Service.objects.create(icon=icon, name=name, description=desc, tag=tag, display_order=i)

    if not Education.objects.exists():
        edu_data = [
            ('B.E. Computer Engineering', 'Savitribai Phule Pune University', '2020 – 2024', 'CGPA: 8.5', ''),
            ('HSC (12th Grade)', 'Maharashtra State Board', '2019 – 2020', '80%', ''),
            ('SSC (10th Grade)', 'Maharashtra State Board', '2017 – 2018', '85%', ''),
        ]
        for i, (degree, institution, duration, grade, desc) in enumerate(edu_data):
            Education.objects.create(
                degree=degree, institution=institution,
                duration=duration, grade=grade,
                description=desc, display_order=i,
            )

    if not Certification.objects.exists():
        cert_data = [
            ('AWS Certified Developer – Associate', 'Amazon Web Services', 'Jan 2024', '', 'Validates expertise in developing and maintaining AWS-based applications.'),
            ('Meta React Developer Certificate',    'Meta (Coursera)',       'Jun 2023', '', 'Professional certification covering advanced React patterns and ecosystem.'),
            ('Google IT Automation with Python',    'Google (Coursera)',     'Mar 2023', '', 'Covers Python scripting, Git, and IT automation best practices.'),
            ('Docker & Kubernetes Fundamentals',    'Udemy',                 'Nov 2022', '', 'Hands-on containerisation and orchestration with Docker and Kubernetes.'),
        ]
        for i, (title, issuer, date, url, desc) in enumerate(cert_data):
            Certification.objects.create(
                title=title, issuer=issuer, date=date,
                credential_url=url, description=desc, display_order=i,
            )
