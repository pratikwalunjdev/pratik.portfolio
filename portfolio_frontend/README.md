# Dev Portfolio

A bold, dark-themed personal portfolio built with React + Vite.

## Features

- **6 sections**: Home, About, Services, Skills, Projects, Contact
- **Typing effect** on hero — cycles through role phrases
- **Animated coding terminal** with line-by-line reveal
- **Skill logos** with brand colors + infinite scrolling marquee
- **Tabbed project cards** — filter by category (All / Web Apps / Mobile / AI ML / Open Source)
- **Admin panel** (⚙ button, bottom-right) — password protected, updates all content live
  - Change availability status (Available / Busy / Not Available)
  - Edit profile, bio, skills, projects, contact info
- **localStorage persistence** — data survives page refresh (swap for Django API later)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production

```bash
npm run build
```

## File Structure

```
src/
├── main.jsx              # React entry point
├── App.jsx               # Root app component
├── Portfolio.jsx         # Main portfolio orchestrator
├── data.js               # Default data, constants, localStorage helpers
├── hooks.js              # Custom hooks (typing effect, scroll reveal, terminal)
├── styles.js             # Global CSS-in-JS styles and theme tokens
├── components/
│   ├── GlobalStyle.jsx   # Injects global CSS
│   ├── Navbar.jsx        # Sticky navigation bar
│   ├── Reveal.jsx        # Scroll-triggered reveal wrapper
│   ├── SkillLogo.jsx     # Colored abbreviation logo for each skill
│   └── SectionHeader.jsx # Reusable section tag + title
├── sections/
│   ├── HeroSection.jsx   # Hero with typing effect + terminal
│   ├── AboutSection.jsx  # About with floating avatar
│   ├── ServicesSection.jsx
│   ├── SkillsSection.jsx # Skills with logos + marquee
│   ├── ProjectsSection.jsx # Tabbed project cards
│   ├── ContactSection.jsx  # Contact form + links
│   └── Footer.jsx
└── admin/
    └── AdminPanel.jsx    # Full admin panel (password: admin123)
```

## Admin Panel

Open the ⚙ button in the bottom-right corner.

- **Default password**: `admin123` (change in `AdminPanel.jsx`)
- **Profile tab**: Edit name, role, bio, experience, location
- **Availability tab**: Switch between Available / Busy / Not Available
- **Projects tab**: Add or delete projects with category, tags, links
- **Skills tab**: Add or delete skill categories
- **Contact tab**: Update email, GitHub, LinkedIn

## Connecting Django Backend (Later)

Replace the `loadData()` and `saveData()` functions in `src/data.js` with API calls:

```js
// src/data.js
export async function loadData() {
  const res = await fetch('/api/portfolio/')
  return res.json()
}

export async function saveData(data) {
  await fetch('/api/portfolio/', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
```

## Deployment

```bash
npm run build
# Deploy the /dist folder to Netlify, Vercel, GitHub Pages, etc.
```

## Color Palette

| Token     | Value     | Usage              |
|-----------|-----------|--------------------|
| `--pu`    | `#7c3aed` | Purple primary     |
| `--pul`   | `#a78bfa` | Purple light       |
| `--te`    | `#00d4b4` | Teal accent        |
| `--bg`    | `#0f0f14` | Page background    |
| `--surf`  | `#212130` | Card surfaces      |
| `--tx`    | `#f0f0f8` | Primary text       |
| `--tx2`   | `#b0b0c8` | Secondary text     |
