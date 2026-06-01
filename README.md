# Portfolio — Full Stack Developer Portfolio

A fully dynamic, database-driven developer portfolio built with **React + Vite** on the frontend and **Django + MySQL** on the backend. Every section is editable through a built-in admin panel without touching any code.

---

## Screenshots

### Hero Section
![Hero Section](docs/screenshots/hero.png)
> Typing animation cycles through roles (Python Developer, Full Stack Developer, React Developer, Java Developer, Problem Solver, Open Source Contributor, Agentic AI Developer). Animated terminal widget on the right.

### Education — Roadmap Timeline
![Education Section](docs/screenshots/education.png)
> Vertical timeline with animated nodes, connector lines, and staggered card reveals triggered by scroll.

### Skills — Expertise Meters
![Skills Section](docs/screenshots/skills.png)
> Progress bars grouped by category (Frontend, Backend, Databases, DevOps & Tools) with live expertise labels (Expert / Advanced / Intermediate / Learning) and an infinite scrolling skill marquee.

### Services
![Services Section](docs/screenshots/services.png)
> Clean 2×2 card grid. No orphan cards. Managed via admin panel.

### Projects
![Projects Section](docs/screenshots/projects.png)
> Filterable project cards. Stylised project-name thumbnail (large initials + full name) instead of emoji. Category filter tabs.

### Certifications
![Certifications Section](docs/screenshots/certifications.png)
> Animated card grid. Each card has a coloured accent bar that scales in, a badge icon, issuer name, date, description, and optional credential link.

### Admin Panel — Skills Tab
![Admin Panel Skills](docs/screenshots/admin_skills.png)
> Interactive range sliders per skill. Drag to set expertise level 0–100. Auto-saves 600 ms after you stop dragging. ✓ indicator confirms save. ✕ removes individual skill.

### Admin Panel — Certifications Tab
![Admin Panel Certs](docs/screenshots/admin_certs.png)
> Full CRUD for certifications: title, issuer, date, credential URL, description.

---

## Features

| Area | What's included |
|---|---|
| **Dynamic data** | Every section (profile, skills, projects, services, education, certifications, contact) is stored in MySQL and editable live |
| **Admin panel** | Password-protected in-app admin — no separate Django admin UI needed |
| **Skill sliders** | Drag range cursor in the admin panel to set expertise level per skill; auto-saves with debounce |
| **Education timeline** | Animated roadmap with pulsing nodes, growing connector lines, and staggered card reveals |
| **Certifications** | Animated card grid with scroll-triggered entrance |
| **Contact form** | Submissions stored in DB; viewable in the admin panel's Messages tab |
| **JWT auth** | Stateless admin authentication; token valid for 24 h |
| **Availability badge** | One-click Available / Busy / Not Available toggle in admin |
| **Typing animation** | Configurable role phrases in `data.js` |

---

## Tech Stack

### Frontend
| Tool | Version | Purpose |
|---|---|---|
| React | 18.2 | UI framework |
| Vite | 5 | Build tool + dev server |
| CSS-in-JS | — | Inline styles + global CSS via `GlobalStyle.jsx` |
| Space Mono | — | Monospace font (Google Fonts) |
| Outfit | — | Primary sans-serif font (Google Fonts) |

### Backend
| Tool | Version | Purpose |
|---|---|---|
| Django | 5.x | Web framework |
| Django REST Framework | 3.15 | API layer |
| djangorestframework-simplejwt | 5.3 | JWT authentication |
| django-cors-headers | 4.3 | CORS for Vite dev server |
| PyMySQL | 1.1 | Pure-Python MySQL driver |
| MySQL | 8.x | Primary database |
| python-dotenv | 1.0 | `.env` config loading |

---

## Project Structure

```
portfolio/
├── portfolio_backend/               # Django project
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env                         # Your local env vars (git-ignored)
│   ├── .env.example                 # Template
│   ├── portfolio_project/           # Django settings / URLs
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── api/                         # Single Django app
│   │   ├── models.py                # All DB models
│   │   ├── views.py                 # All API views
│   │   ├── urls.py                  # All API routes
│   │   ├── apps.py                  # Auto-seed on migrate
│   │   ├── exceptions.py            # Custom DRF exception handler
│   │   └── management/commands/
│   │       └── setup_admin.py       # python manage.py setup_admin
│   └── database/
│       └── schema.sql               # Creates the MySQL database
│
└── portfolio_frontend/              # React + Vite project
    ├── vite.config.js               # Dev proxy → localhost:8000
    ├── src/
    │   ├── Portfolio.jsx            # Root layout, data fetch
    │   ├── data.js                  # API helpers + constants
    │   ├── hooks.js                 # Typing effect, reveal hooks
    │   ├── admin/
    │   │   └── AdminPanel.jsx       # Full admin UI
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Reveal.jsx           # Scroll-based fade-in
    │   │   ├── SectionHeader.jsx
    │   │   └── SkillLogo.jsx        # Branded skill badge
    │   └── sections/
    │       ├── HeroSection.jsx      # Typing effect + terminal
    │       ├── AboutSection.jsx     # Bio, stats, status
    │       ├── EducationSection.jsx # Roadmap timeline
    │       ├── ServicesSection.jsx  # 2×2 service cards
    │       ├── SkillsSection.jsx    # Expertise meters + marquee
    │       ├── ProjectsSection.jsx  # Filterable project grid
    │       ├── CertificationsSection.jsx
    │       ├── ContactSection.jsx   # Form + social links
    │       └── Footer.jsx
```

---

## Database Schema

| Table | Purpose |
|---|---|
| `api_profile` | Name, role, bio, location, experience, status |
| `api_contactinfo` | Email, GitHub, LinkedIn, contact subtitle |
| `api_skillcategory` | Skill category (Frontend, Backend, …) |
| `api_skill` | Individual skill with name and `level` (0–100) |
| `api_project` | Project metadata, tags, links |
| `api_service` | "What I Offer" cards |
| `api_education` | Degree, institution, duration, grade |
| `api_certification` | Cert title, issuer, date, credential URL |
| `api_contactmessage` | Contact form submissions |
| `auth_user` | Django admin users (JWT login) |

---

## Prerequisites

- **Python** 3.10+ (tested on 3.13)
- **Node.js** 18+ and npm
- **MySQL** 8.0+

---

## Quick Start

### 1 — Clone the repo

```bash
git clone <your-repo-url>
cd portfolio
```

### 2 — Backend setup

```bash
cd portfolio_backend

# Install Python dependencies
pip install -r requirements.txt

# Copy and fill in your environment variables
cp .env.example .env
# Edit .env with your DB credentials

# Create the MySQL database (one-time)
mysql -u root -p < database/schema.sql

# Apply Django migrations and seed default data
python manage.py migrate

# Set your admin credentials (also updates skill levels)
python manage.py setup_admin

# Start the backend server
python manage.py runserver 8000
```

### 3 — Frontend setup

```bash
cd portfolio_frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

### 4 — Open in browser

```
http://localhost:5173
```

---

## Environment Variables

Create `portfolio_backend/.env` from `.env.example`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=portfolio_db
SECRET_KEY=your-long-random-django-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
PORT=8000
```

> **Production note:** Set `DEBUG=False`, use a strong `SECRET_KEY`, and restrict `ALLOWED_HOSTS` to your domain.

---

## API Reference

All endpoints are prefixed with `/api/`.

### Public (no auth required)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/portfolio` | Returns all portfolio data in one response |
| `POST` | `/api/auth/login` | Login — returns JWT access token |
| `POST` | `/api/contact/message` | Submit contact form |

### Protected (Bearer token required)

| Method | Endpoint | Description |
|---|---|---|
| `PUT` | `/api/profile` | Update profile (any field, partial update) |
| `POST` | `/api/projects` | Add project |
| `DELETE` | `/api/projects/<id>` | Delete project |
| `POST` | `/api/skills` | Add skill category (or append to existing) |
| `DELETE` | `/api/skills/<id>` | Delete entire skill category |
| `PUT` | `/api/skills/item/<id>` | Update skill level / name |
| `DELETE` | `/api/skills/item/<id>` | Remove individual skill |
| `POST` | `/api/services` | Add service |
| `DELETE` | `/api/services/<id>` | Delete service |
| `PUT` | `/api/contact` | Update contact info |
| `POST` | `/api/education` | Add education entry |
| `DELETE` | `/api/education/<id>` | Delete education entry |
| `POST` | `/api/certifications` | Add certification |
| `DELETE` | `/api/certifications/<id>` | Delete certification |
| `GET` | `/api/messages` | List contact form submissions |
| `PUT` | `/api/messages/<id>/read` | Mark message as read |

### Authentication

```bash
# 1. Get token
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"pratikwalunjdev","password":"P@ss123"}'

# 2. Use token
curl -X PUT http://localhost:8000/api/profile \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status":"busy"}'
```

---

## Admin Panel Guide

Click the **⚙** button (bottom-right corner) to open the admin panel.

| Tab | What you can do |
|---|---|
| **Profile** | Edit name, role, bio, experience, location, project count |
| **Availability** | Toggle Available / Busy / Not Available — updates site instantly |
| **Projects** | Add new projects (name, category, tags, links); delete existing |
| **Skills** | Drag sliders to set expertise level per skill; remove individual skills; add new categories |
| **Education** | Add / delete education timeline entries |
| **Certs** | Add / delete certifications (title, issuer, date, credential URL) |
| **Contact** | Update email, GitHub, LinkedIn, contact subtitle |
| **Messages** | Read contact form submissions; mark as read |

---

## Sections

| # | Section | Background |
|---|---|---|
| 01 | About | `--bg` (dark) |
| 02 | Education | `--bg2` (slightly lighter) |
| 03 | Services | `--bg2` |
| 04 | Skills | `--bg` |
| 05 | Projects | `--bg2` |
| 06 | Certifications | `--bg` |
| 07 | Contact | `--bg` |

---

## Customisation

### Typing phrases
Edit `TYPING_PHRASES` in [portfolio_frontend/src/data.js](portfolio_frontend/src/data.js):
```js
export const TYPING_PHRASES = [
  'Python Developer',
  'Full Stack Developer',
  'React Developer',
  // ...
]
```

### Colour theme
All CSS variables are in [portfolio_frontend/src/styles.js](portfolio_frontend/src/styles.js):
```js
--bg:   #0f0f14   // main background
--pu:   #7c3aed   // purple accent
--te:   #00d4b4   // teal accent
```

### Skill brand colours
Extend `SKILL_COLORS` and `SKILL_ABBR` in [portfolio_frontend/src/data.js](portfolio_frontend/src/data.js) to add logos for new skills.

---

## Production Build

```bash
# Build the frontend
cd portfolio_frontend
npm run build
# Outputs to portfolio_frontend/dist/

# Serve Django with gunicorn (example)
cd portfolio_backend
pip install gunicorn
gunicorn portfolio_project.wsgi:application --bind 0.0.0.0:8000
```

> Configure Django to serve the `dist/` folder as static files, or deploy the frontend separately to Vercel / Netlify and point `CORS_ALLOWED_ORIGINS` to its URL.

---

## License

MIT — free to use, modify, and distribute.

---

*Built with React, Django, and MySQL.*
