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
  'Python Developer',
  'Full Stack Developer',
  'React Developer',
  'Java Developer',
  'Problem Solver',
  'Open Source Contributor',
  'Agentic AI Developer',
]

// ─── DEFAULT DATA (fallback when API is unavailable) ──────────────────────
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
  contactSub: "Open to full-time roles, freelance projects, and interesting collaborations. Don't hesitate to reach out.",
  skills: [
    { cat: 'Frontend',       items: [{ name: 'React', level: 95 }, { name: 'TypeScript', level: 88 }, { name: 'Next.js', level: 82 }] },
    { cat: 'Backend',        items: [{ name: 'Node.js', level: 88 }, { name: 'Python', level: 92 }] },
    { cat: 'Databases',      items: [{ name: 'PostgreSQL', level: 83 }, { name: 'MySQL', level: 82 }] },
    { cat: 'DevOps & Tools', items: [{ name: 'Docker', level: 82 }, { name: 'Git', level: 95 }] },
  ],
  projects: [],
  services: [
    { icon: '⚡', name: 'Frontend Development', desc: 'Pixel-perfect, responsive UIs with React, Next.js and modern CSS.', tag: 'React · Next.js · TypeScript' },
    { icon: '🔧', name: 'Backend Engineering',  desc: 'Scalable REST & GraphQL APIs and robust database design.', tag: 'Node.js · Django · PostgreSQL' },
  ],
  education: [],
  certifications: [],
}

// ─── API HELPERS ───────────────────────────────────────────────────────────
//const API = 'pratikportfolio-production.up.railway.app'  // Vite dev proxy forwards /api/* → localhost:3001
const API =
  import.meta.env.PROD
    ? 'https://pratikportfolio-production.up.railway.app'
    : 'http://localhost:8000'
export async function loadData() {
  try {
    const res = await fetch(`${API}/api/portfolio`)
    if (!res.ok) throw new Error('API unavailable')
    return res.json()
  } catch {
    console.warn('Backend unavailable — using default data')
    return DEFAULT_DATA
  }
}

async function parseJson(res) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    if (!res.ok) throw new Error(`Backend error (${res.status}) — is the Django server running on port 8000?`)
    throw new Error('Server returned an unexpected response — is the Django server running on port 8000?')
  }
}

export async function loginAdmin(username, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await parseJson(res)
  if (!res.ok) throw new Error(data.error || 'Login failed')
  return data.token
}

async function apiCall(method, path, token, body) {
  const res = await fetch(`${API}/api${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })
  const data = await parseJson(res)
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const updateProfile = (token, profile) => apiCall('PUT', '/profile', token, profile)
export const updateContact  = (token, contact) => apiCall('PUT', '/contact', token, contact)
export const addProject     = (token, project) => apiCall('POST', '/projects', token, project)
export const deleteProject  = (token, id)      => apiCall('DELETE', `/projects/${id}`, token)
export const addSkill       = (token, skill)   => apiCall('POST', '/skills', token, skill)
export const deleteSkill    = (token, id)      => apiCall('DELETE', `/skills/${id}`, token)
export const sendMessage     = (form)           => apiCall('POST', '/contact/message', null, form)
export const getMessages     = (token)          => apiCall('GET', '/messages', token)
export const markMessageRead = (token, id)      => apiCall('PUT', `/messages/${id}/read`, token)
export const addEducation     = (token, edu)        => apiCall('POST', '/education', token, edu)
export const deleteEducation  = (token, id)         => apiCall('DELETE', `/education/${id}`, token)
export const updateSkillItem  = (token, id, patch)  => apiCall('PUT',    `/skills/item/${id}`,       token, patch)
export const deleteSkillItem  = (token, id)         => apiCall('DELETE',  `/skills/item/${id}`,       token)
export const addCertification    = (token, cert)    => apiCall('POST',   '/certifications',            token, cert)
export const deleteCertification = (token, id)      => apiCall('DELETE', `/certifications/${id}`,     token)
