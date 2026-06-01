<div align="center">

# 🖥️ Developer Portfolio

### A fully dynamic, database-driven portfolio — every section editable live from a built-in admin panel.

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Django](https://img.shields.io/badge/Django-5-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

</div>

---

## 📸 Screenshots

> **To add real screenshots** — save images to `docs/screenshots/` with the names shown below and they will appear here automatically.

<table>
  <tr>
    <td align="center" width="50%">
      <b>🏠 Hero Section</b><br/>
      <sub>Typing animation · Animated terminal widget · Status badge</sub><br/><br/>
      <code>docs/screenshots/hero.jpeg</code>
    </td>
    <td align="center" width="50%">
      <b>🎓 Education — Roadmap Timeline</b><br/>
      <sub>Animated nodes · Growing connector lines · Staggered card reveals</sub><br/><br/>
      <code>docs/screenshots/education.jpeg</code>
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>⚡ Skills — Expertise Meters</b><br/>
      <sub>Progress bars per skill · Expert/Advanced/Intermediate badges · Infinite marquee</sub><br/><br/>
      <code>docs/screenshots/skills.jpeg</code>
    </td>
    <td align="center">
      <b>🚀 Projects</b><br/>
      <sub>Filterable grid · Stylised name thumbnail · Live & GitHub links</sub><br/><br/>
      <code>docs/screenshots/projects.jpeg</code>
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>🏆 Certifications</b><br/>
      <sub>Scroll-triggered entrance · Accent bar animation · Credential links</sub><br/><br/>
      <code>docs/screenshots/certifications.jpeg</code>
    </td>
    <td align="center">
      <b>⚙️ Admin Panel — Skill Sliders</b><br/>
      <sub>Drag to set level · Debounced auto-save · Live label badge</sub><br/><br/>
      <code>docs/screenshots/admin_skills.jpeg</code>
    </td>
  </tr>
</table>

---

## ✨ Features

| Feature | Details |
|---|---|
| 🗄️ **Fully Dynamic** | Every section (profile, skills, projects, services, education, certifications, contact) stored in MySQL |
| 🔐 **JWT Admin Panel** | Built-in password-protected admin — no separate Django admin UI required |
| 🎚️ **Skill Level Sliders** | Drag a range cursor in admin to set expertise 0–100; auto-saves with 600 ms debounce |
| 🗺️ **Education Timeline** | Animated roadmap with pulsing nodes, growing connector lines, and staggered reveals |
| 🏆 **Certifications Grid** | Scroll-triggered card entrance with coloured accent bars and credential links |
| 💬 **Contact Form** | Submissions stored in DB and viewable in admin's Messages tab |
| 🟢 **Availability Toggle** | One-click Available / Busy / Not Available — updates the status badge site-wide |
| 🔄 **Typing Animation** | Fully configurable role phrases cycling in the hero section |

---

## 🛠️ Tech Stack

### Frontend
| Tool | Version | Role |
|---|---|---|
| **React** | 18.2 | UI framework |
| **Vite** | 5 | Dev server + bundler |
| **CSS-in-JS** | — | Inline styles + global CSS |
| **Space Mono / Outfit** | — | Typography (Google Fonts) |

### Backend
| Tool | Version | Role |
|---|---|---|
| **Django** | 5.x | Web framework |
| **Django REST Framework** | 3.15 | REST API layer |
| **djangorestframework-simplejwt** | 5.3 | JWT authentication |
| **django-cors-headers** | 4.3 | CORS for Vite dev proxy |
| **PyMySQL** | 1.1 | Pure-Python MySQL driver |
| **MySQL** | 8.x | Primary database |
| **python-dotenv** | 1.0 | `.env` configuration |

---

## 📂 Project Structure

```
portfolio/
├── README.md
│
├── portfolio_backend/                   # Django project
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env                             # Local environment variables (git-ignored)
│   ├── .env.example                     # Template — copy to .env
│   │
│   ├── portfolio_project/               # Django config package
│   │   ├── settings.py                  # All settings (reads from .env)
│   │   ├── urls.py                      # Root URL conf (includes api.urls)
│   │   └── wsgi.py
│   │
│   ├── api/                             # Single Django app — all logic lives here
│   │   ├── models.py                    # All DB models
│   │   ├── views.py                     # All API views (PortfolioView, LoginView, …)
│   │   ├── urls.py                      # All API routes
│   │   ├── apps.py                      # AppConfig — auto-seeds DB on migrate
│   │   ├── exceptions.py                # Custom DRF exception handler (returns JSON for 500s)
│   │   └── management/
│   │       └── commands/
│   │           └── setup_admin.py       # python manage.py setup_admin
│   │
│   └── database/
│       └── schema.sql                   # Creates the MySQL database (run once)
│
└── portfolio_frontend/                  # React + Vite project
    ├── vite.config.js                   # Dev proxy: /api → localhost:8000
    ├── index.html
    ├── package.json
    └── src/
        ├── Portfolio.jsx                # Root layout — fetches data, renders all sections
        ├── data.js                      # API helpers, constants, DEFAULT_DATA fallback
        ├── hooks.js                     # useTypingEffect, useReveal
        ├── styles.js                    # CSS variables & global animation keyframes
        │
        ├── admin/
        │   └── AdminPanel.jsx           # Full in-app admin UI (8 tabs)
        │
        ├── components/
        │   ├── Navbar.jsx               # Sticky navigation
        │   ├── Reveal.jsx               # Scroll-triggered fade-in wrapper
        │   ├── SectionHeader.jsx        # Numbered section headers
        │   └── SkillLogo.jsx            # Branded skill badge (abbr + colour)
        │
        └── sections/
            ├── HeroSection.jsx          # Typing effect + animated terminal
            ├── AboutSection.jsx         # Bio, stats, availability status
            ├── EducationSection.jsx     # Roadmap timeline animation
            ├── ServicesSection.jsx      # 2×2 service cards
            ├── SkillsSection.jsx        # Expertise progress bars + marquee
            ├── ProjectsSection.jsx      # Filterable project grid
            ├── CertificationsSection.jsx# Animated certification cards
            ├── ContactSection.jsx       # Form (saves to DB) + social links
            └── Footer.jsx
```

---

## 🗃️ Database Schema

| Table | Key Columns |
|---|---|
| `api_profile` | `name`, `role`, `bio`, `exp`, `loc`, `projcount`, `status` |
| `api_contactinfo` | `email`, `github`, `linkedin`, `contact_subtitle` |
| `api_skillcategory` | `name`, `display_order` |
| `api_skill` | `category_id`, `name`, `level` (0–100), `display_order` |
| `api_project` | `name`, `category`, `description`, `tags` (JSON), `icon`, `live_url`, `github_url` |
| `api_service` | `icon`, `name`, `description`, `tag` |
| `api_education` | `degree`, `institution`, `duration`, `grade`, `description` |
| `api_certification` | `title`, `issuer`, `date`, `credential_url`, `description` |
| `api_contactmessage` | `sender_name`, `email`, `subject`, `message`, `is_read` |
| `auth_user` | Django's built-in user table (used for admin JWT login) |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- MySQL 8.0+

---

### Step 1 — Clone

```bash
git clone <your-repo-url>
cd portfolio
```

---

### Step 2 — Backend

```bash
cd portfolio_backend

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Open .env and fill in your DB credentials and SECRET_KEY
```

**`.env` values to set:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=portfolio_db
SECRET_KEY=replace-with-a-long-random-string
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
PORT=8000
```

```bash
# Apply migrations — creates all tables and seeds default data automatically
python manage.py migrate

# Create your admin user (also sets correct skill levels)
python manage.py setup_admin

# Start the backend
python manage.py runserver 8000
```

> `setup_admin` creates the admin user defined in the command file. Default: **`pratikwalunjdev` / `P@ss123`** — change these inside `api/management/commands/setup_admin.py` before running.

---

### Step 3 — Frontend

```bash
cd portfolio_frontend

npm install
npm run dev
```

---

### Step 4 — Open in browser

```
http://localhost:5173
```

Click the **⚙** button in the bottom-right corner to open the Admin Panel.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DB_HOST` | ✅ | MySQL host (usually `localhost`) |
| `DB_PORT` | ✅ | MySQL port (default `3306`) |
| `DB_USER` | ✅ | MySQL username |
| `DB_PASS` | ✅ | MySQL password |
| `DB_NAME` | ✅ | Database name (default `portfolio_db`) |
| `SECRET_KEY` | ✅ | Django secret key — use a long random string in production |
| `DEBUG` | ✅ | `True` for development, `False` for production |
| `ALLOWED_HOSTS` | ✅ | Comma-separated list of allowed hosts |
| `PORT` | — | Server port (default `8000`) |

---

## 📡 API Reference

Base URL: `http://localhost:8000/api`

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/portfolio` | Returns all portfolio data in one request |
| `POST` | `/auth/login` | Authenticate — returns a 24 h JWT access token |
| `POST` | `/contact/message` | Submit the contact form |

### Protected Endpoints
> Add `Authorization: Bearer <token>` header to all requests below.

| Method | Endpoint | Description |
|---|---|---|
| `PUT` | `/profile` | Update any profile field (partial update supported) |
| `POST` | `/projects` | Add a project |
| `DELETE` | `/projects/<id>` | Delete a project |
| `POST` | `/skills` | Add skills to a category (creates category if new) |
| `DELETE` | `/skills/<id>` | Delete an entire skill category |
| `PUT` | `/skills/item/<id>` | Update a skill's `level` or `name` |
| `DELETE` | `/skills/item/<id>` | Remove a single skill |
| `POST` | `/services` | Add a service card |
| `DELETE` | `/services/<id>` | Delete a service card |
| `PUT` | `/contact` | Update contact info |
| `POST` | `/education` | Add education entry |
| `DELETE` | `/education/<id>` | Delete education entry |
| `POST` | `/certifications` | Add a certification |
| `DELETE` | `/certifications/<id>` | Delete a certification |
| `GET` | `/messages` | List all contact form submissions |
| `PUT` | `/messages/<id>/read` | Mark a message as read |

### Example — Login and update status

```bash
# 1. Get token
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"pratikwalunjdev","password":"P@ss123"}'
# → {"token":"eyJ..."}

# 2. Update availability
curl -X PUT http://localhost:8000/api/profile \
  -H "Authorization: Bearer eyJ..." \
  -H "Content-Type: application/json" \
  -d '{"status":"busy"}'
```

---

## 🛠️ Admin Panel — Tab Guide

> Open: click **⚙** button · Bottom-right corner of the page

| Tab | What you can do |
|---|---|
| **Profile** | Edit name, role, bio, experience, location, project count |
| **Availability** | Toggle Available / Busy / Not Available — updates the hero badge instantly |
| **Projects** | Add projects with name, category, tags, icon, live URL, GitHub URL; delete existing |
| **Skills** | Drag range sliders to set expertise level (0–100) per skill; remove individual skills; add new categories with comma-separated items |
| **Education** | Add/delete timeline entries with degree, institution, duration, grade, description |
| **Certs** | Add/delete certifications with title, issuer, date, credential URL, description |
| **Contact** | Update email, GitHub URL, LinkedIn URL, contact section subtitle |
| **Messages** | View contact form submissions; mark as read |

---

## 📄 Section Reference

| # | Section | Route Anchor | Background |
|---|---|---|---|
| 01 | About | `#sec-about` | `--bg` |
| 02 | Education | `#sec-education` | `--bg2` |
| 03 | Services | `#sec-services` | `--bg2` |
| 04 | Skills | `#sec-skills` | `--bg` |
| 05 | Projects | `#sec-projects` | `--bg2` |
| 06 | Certifications | `#sec-certifications` | `--bg` |
| 07 | Contact | `#sec-contact` | `--bg` |

---

## 🎨 Customisation

### Typing phrases
Edit `TYPING_PHRASES` in [`portfolio_frontend/src/data.js`](portfolio_frontend/src/data.js):
```js
export const TYPING_PHRASES = [
  'Python Developer',
  'Full Stack Developer',
  'React Developer',
  'Java Developer',
  'Problem Solver',
  'Open Source Contributor',
  'Agentic AI Developer',
]
```

### Colour theme
All CSS variables live in [`portfolio_frontend/src/styles.js`](portfolio_frontend/src/styles.js):
```css
--bg:   #0f0f14   /* main dark background  */
--bg2:  #16161f   /* slightly lighter bg   */
--pu:   #7c3aed   /* purple primary        */
--pul:  #a78bfa   /* purple light          */
--te:   #00d4b4   /* teal accent           */
--tx:   #f0f0f8   /* primary text          */
--tx2:  #b0b0c8   /* secondary text        */
```

### Skill brand colours & abbreviations
Add entries to `SKILL_COLORS` and `SKILL_ABBR` in [`portfolio_frontend/src/data.js`](portfolio_frontend/src/data.js) to support new skills with their brand colours and two-letter abbreviations.

---

## 🏗️ Production Build

```bash
# Build the frontend
cd portfolio_frontend
npm run build
# → outputs to portfolio_frontend/dist/

# Serve with gunicorn
cd portfolio_backend
pip install gunicorn
gunicorn portfolio_project.wsgi:application --bind 0.0.0.0:8000
```

For production, set in `.env`:
```env
DEBUG=False
SECRET_KEY=<long-random-string>
ALLOWED_HOSTS=yourdomain.com
```

And update `CORS_ALLOWED_ORIGINS` in `settings.py` to your frontend's URL.

---

## 📋 Running Commands Summary

```bash
# First-time setup
python manage.py migrate          # Create tables + seed default data
python manage.py setup_admin      # Create admin user + set skill levels

# Daily development
python manage.py runserver 8000   # Start backend
npm run dev                        # Start frontend (in portfolio_frontend/)

# Re-seed (if data was deleted)
python manage.py setup_admin      # Safe to run multiple times
```

---

<div align="center">

**Built with React · Django · MySQL**

</div>
