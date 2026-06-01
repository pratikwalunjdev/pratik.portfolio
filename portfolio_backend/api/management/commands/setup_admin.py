from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.apps import _seed_defaults
from api.models import Service, Skill

SKILL_LEVELS = {
    'React': 95, 'TypeScript': 88, 'Next.js': 82, 'HTML5': 95, 'CSS3': 90,
    'Tailwind': 87, 'Vue.js': 72, 'Redux': 78, 'Node.js': 88, 'Python': 92,
    'Express': 85, 'FastAPI': 80, 'Django': 84, 'GraphQL': 72, 'Go': 65,
    'PostgreSQL': 83, 'MySQL': 82, 'MongoDB': 76, 'Redis': 73, 'Supabase': 70,
    'Docker': 82, 'AWS': 76, 'Kubernetes': 68, 'GitHub Actions': 79,
    'Git': 95, 'Linux': 84, 'Nginx': 76,
}

ADMIN_USERNAME = 'pratikwalunjdev'
ADMIN_PASSWORD = 'P@ss123'


class Command(BaseCommand):
    help = 'Create or update the admin user and reseed default data'

    def handle(self, *args, **options):
        # Remove unwanted services
        removed = Service.objects.filter(name__in=['Mobile Development', 'UI/UX Design']).delete()
        self.stdout.write(f'Removed services: {removed[0]} rows.')

        # Reseed all default data
        _seed_defaults(sender=None)
        self.stdout.write('Default data seeded.')

        # Apply correct expertise levels to existing skills
        for name, level in SKILL_LEVELS.items():
            Skill.objects.filter(name=name).update(level=level)
        self.stdout.write('Skill levels updated.')

        # Create / update admin user
        user, created = User.objects.get_or_create(username=ADMIN_USERNAME)
        user.set_password(ADMIN_PASSWORD)
        user.is_staff = True
        user.is_superuser = True
        user.save()

        User.objects.filter(username='admin').delete()

        action = 'Created' if created else 'Updated'
        self.stdout.write(
            self.style.SUCCESS(f'{action} admin: {ADMIN_USERNAME} / {ADMIN_PASSWORD}')
        )
