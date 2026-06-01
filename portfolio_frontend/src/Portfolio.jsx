import { useState } from 'react'
import GlobalStyle from './components/GlobalStyle'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import SkillsSection from './sections/SkillsSection'
import ProjectsSection from './sections/ProjectsSection'
import ContactSection from './sections/ContactSection'
import Footer from './sections/Footer'
import AdminPanel from './admin/AdminPanel'
import { loadData, saveData } from './data'

export default function Portfolio() {
  const [data, setData] = useState(loadData)
  const [adminOpen, setAdminOpen] = useState(false)
  const [toast, setToast] = useState(false)

  function handleUpdate(newData) {
    setData(newData)
    saveData(newData)
    showToast()
  }

  function showToast() {
    setToast(true)
    setTimeout(() => setToast(false), 2400)
  }

  return (
    <>
      <GlobalStyle />
      <Navbar name={data.name} />
      <HeroSection data={data} />
      <AboutSection data={data} />
      <ServicesSection />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <ContactSection data={data} />
      <Footer name={data.name} />

      {/* Admin FAB */}
      <button
        onClick={() => setAdminOpen(true)}
        title="Admin Panel"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 200,
          background: 'var(--surf)',
          border: '1px solid var(--bd2)',
          width: 46,
          height: 46,
          borderRadius: '50%',
          fontSize: '1.1rem',
          boxShadow: '0 0 18px var(--pug)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--tx)',
          transition: 'all .25s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--pu)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surf)')}
      >
        ⚙
      </button>

      {/* Admin panel */}
      {adminOpen && (
        <AdminPanel
          data={data}
          onUpdate={handleUpdate}
          onClose={() => setAdminOpen(false)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '1.5rem',
            background: 'var(--surf)',
            border: '1px solid rgba(0,212,180,.4)',
            borderRadius: 8,
            padding: '.65rem 1.1rem',
            fontSize: '.82rem',
            color: 'var(--te)',
            zIndex: 400,
            animation: 'panelFade .3s ease',
          }}
        >
          ✓ Saved successfully!
        </div>
      )}
    </>
  )
}
