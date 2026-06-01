import { useState, useEffect, useCallback } from 'react'
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
import EducationSection from './sections/EducationSection'
import CertificationsSection from './sections/CertificationsSection'
import { loadData, DEFAULT_DATA } from './data'

export default function Portfolio() {
  const [data, setData] = useState(DEFAULT_DATA)
  const [loading, setLoading] = useState(true)
  const [adminOpen, setAdminOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const refreshData = useCallback(async () => {
    const d = await loadData()
    setData(d)
  }, [])

  useEffect(() => {
    loadData()
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  function showToast(msg = 'Saved successfully!', isError = false) {
    setToast({ msg, isError })
    setTimeout(() => setToast(null), 2800)
  }

  if (loading) {
    return (
      <>
        <GlobalStyle />
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg)',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '3px solid var(--bd2)',
              borderTopColor: 'var(--pu)',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <p className="mono" style={{ color: 'var(--tx3)', fontSize: '.8rem' }}>
            Loading portfolio…
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </>
    )
  }

  return (
    <>
      <GlobalStyle />
      <Navbar name={data.name} />
      <HeroSection data={data} />
      <AboutSection data={data} />
      <EducationSection education={data.education} />
      <ServicesSection services={data.services} />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <CertificationsSection certifications={data.certifications} />
      <ContactSection data={data} onToast={showToast} />
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

      {adminOpen && (
        <AdminPanel
          data={data}
          onRefresh={refreshData}
          onToast={showToast}
          onClose={() => setAdminOpen(false)}
        />
      )}

      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '1.5rem',
            background: 'var(--surf)',
            border: `1px solid ${toast.isError ? 'rgba(239,68,68,.4)' : 'rgba(0,212,180,.4)'}`,
            borderRadius: 8,
            padding: '.65rem 1.1rem',
            fontSize: '.82rem',
            color: toast.isError ? '#f87171' : 'var(--te)',
            zIndex: 400,
            animation: 'panelFade .3s ease',
          }}
        >
          {toast.isError ? '✕' : '✓'} {toast.msg}
        </div>
      )}
    </>
  )
}
