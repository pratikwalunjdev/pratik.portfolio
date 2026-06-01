// ─── STATUS OPTIONS ────────────────────────────────────────────────────────
export const STATUS_MAP = {
  available: {
    label: 'Available for hire',
    color: '#22c55e',
    bg: 'rgba(34,197,94,.12)',
    border: 'rgba(34,197,94,.3)',
  },
  busy: {
    label: 'Currently working · busy',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,.1)',
    border: 'rgba(245,158,11,.28)',
  },
  unavailable: {
    label: 'Not available right now',
    color: '#ef4444',
    bg: 'rgba(239,68,68,.1)',
    border: 'rgba(239,68,68,.28)',
  },
}

// ─── SKILL BRAND COLORS ────────────────────────────────────────────────────
export const SKILL_COLORS = {
  React: '#61DAFB',
  TypeScript: '#3178C6',
  'Next.js': '#888',
  HTML5: '#E34F26',
  CSS3: '#1572B6',
  Tailwind: '#06B6D4',
  'Vue.js': '#4FC08D',
  Redux: '#764ABC',
  'Node.js': '#339933',
  Python: '#3776AB',
  Express: '#555',
  FastAPI: '#009688',
  GraphQL: '#E10098',
  Go: '#00ADD8',
  Django: '#44B78B',
  PostgreSQL: '#336791',
  MySQL: '#4479A1',
  MongoDB: '#47A248',
  Redis: '#DC382D',
  Supabase: '#3ECF8E',
  Docker: '#2496ED',
  AWS: '#FF9900',
  Kubernetes: '#326CE5',
  'GitHub Actions': '#2088FF',
  Git: '#F05032',
  Linux: '#FCC624',
  Nginx: '#009639',
  Figma: '#F24E1E',
  'React Native': '#61DAFB',
}

// ─── SKILL ABBREVIATIONS ───────────────────────────────────────────────────
export const SKILL_ABBR = {
  React: 'Re',
  'Next.js': 'Nx',
  TypeScript: 'TS',
  HTML5: 'HT',
  CSS3: 'CS',
  Tailwind: 'TW',
  'Vue.js': 'Vu',
  Redux: 'Rx',
  'Node.js': 'No',
  Python: 'Py',
  Express: 'Ex',
  FastAPI: 'FA',
  GraphQL: 'GQ',
  Go: 'Go',
  Django: 'Dj',
  PostgreSQL: 'PG',
  MySQL: 'My',
  MongoDB: 'Mo',
  Redis: 'Rd',
  Supabase: 'Su',
  Docker: 'Do',
  AWS: 'AW',
  Kubernetes: 'K8',
  'GitHub Actions': 'GH',
  Git: 'Gt',
  Linux: 'Lx',
  Nginx: 'Ng',
  Figma: 'Fi',
  'React Native': 'RN',
}

// ─── CARD ACCENT COLORS ────────────────────────────────────────────────────
export const CARD_COLORS = [
  '#7c3aed',
  '#00d4b4',
  '#f59e0b',
  '#ec4899',
  '#3b82f6',
  '#10b981',
]

// ─── TYPING PHRASES ────────────────────────────────────────────────────────
export const TYPING_PHRASES = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'Cloud Architect',
  'Problem Solver',
  'Open Source Contributor',
]

// ─── DEFAULT PORTFOLIO DATA ────────────────────────────────────────────────
export const DEFAULT_DATA = {
  name: 'Your Name',
  role: 'Full Stack Developer',
  bio: 'Passionate software engineer with a love for building impactful digital experiences.\n\nI specialise in crafting end-to-end web applications — from intuitive UIs to scalable backend systems. When I\'m not coding, you\'ll find me exploring new tech or contributing to open source.',
  exp: '5+',
  loc: 'Pune, India',
  projcount: '30+',
  status: 'available',
  email: 'your@email.com',
  github: 'https://github.com/you',
  linkedin: 'https://linkedin.com/in/you',
  contactSub:
    'Open to full-time roles, freelance projects, and interesting collaborations. Don\'t hesitate to reach out.',
  skills: [
    {
      cat: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind', 'Vue.js', 'Redux'],
    },
    {
      cat: 'Backend',
      items: ['Node.js', 'Python', 'Express', 'FastAPI', 'Django', 'GraphQL', 'Go'],
    },
    {
      cat: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Supabase'],
    },
    {
      cat: 'DevOps & Tools',
      items: ['Docker', 'AWS', 'Kubernetes', 'GitHub Actions', 'Git', 'Linux', 'Nginx'],
    },
  ],
  projects: [
    {
      name: 'E-Commerce Platform',
      cat: 'Web Apps',
      desc: 'Full-stack e-commerce solution with real-time inventory, payment integration and admin dashboard.',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      icon: '🛒',
      live: '#',
      github: '#',
    },
    {
      name: 'AI Chat Assistant',
      cat: 'AI / ML',
      desc: 'LLM-powered conversational AI with context memory, RAG pipeline and streaming responses.',
      tags: ['Python', 'LangChain', 'React'],
      icon: '🤖',
      live: '#',
      github: '#',
    },
    {
      name: 'Task Manager App',
      cat: 'Mobile',
      desc: 'Cross-platform mobile app for team task management with real-time sync and push notifications.',
      tags: ['React Native', 'Supabase', 'Expo'],
      icon: '✅',
      live: '#',
      github: '#',
    },
    {
      name: 'Dev CLI Toolkit',
      cat: 'Open Source',
      desc: 'A collection of CLI utilities for automating common developer workflows. 500+ GitHub stars.',
      tags: ['Node.js', 'TypeScript'],
      icon: '⚡',
      live: '#',
      github: '#',
    },
    {
      name: 'SaaS Dashboard',
      cat: 'Web Apps',
      desc: 'Analytics dashboard for SaaS metrics with real-time charts, user cohort analysis, and exports.',
      tags: ['Next.js', 'PostgreSQL'],
      icon: '📊',
      live: '#',
      github: '#',
    },
    {
      name: 'Portfolio Generator',
      cat: 'Open Source',
      desc: 'Open source tool to generate developer portfolios from a simple config file. Used by 200+ devs.',
      tags: ['React', 'Node.js'],
      icon: '🎨',
      live: '#',
      github: '#',
    },
  ],
}

// ─── STORAGE HELPERS ───────────────────────────────────────────────────────
const STORAGE_KEY = 'portfolio_data_v3'

export function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_DATA
  } catch {
    return DEFAULT_DATA
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Failed to save data:', e)
  }
}
