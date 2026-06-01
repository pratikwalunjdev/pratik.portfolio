import { useState } from 'react'

const LINKS = ['home', 'about', 'education', 'services', 'skills', 'projects', 'certifications', 'contact']

export default function Navbar({ name }) {
  const slug = name.toLowerCase().replace(/\s+/g, '')
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '.85rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(15,15,20,.92)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--bd)',
        }}
      >
        {/* Logo */}
        <div className="mono" style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--pul)' }}>
          {slug}<span style={{ color: 'var(--te)' }}>.dev</span>
        </div>

        {/* Desktop nav links */}
        <div className="nav-links-desktop">
          {LINKS.map((s) => (
            <a key={s} href={`#sec-${s}`} className="nav-link">{s}</a>
          ))}
        </div>

        {/* Desktop hire-me button */}
        <a
          href="#sec-contact"
          className="nav-hire-desktop"
          style={{
            background: 'transparent',
            border: '1px solid var(--pu)',
            color: 'var(--pul)',
            padding: '.42rem 1.2rem',
            borderRadius: 6,
            fontSize: '.8rem',
            transition: 'all .25s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--pu)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--pul)' }}
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1, transform: open ? 'translateX(-6px)' : 'none' }} />
          <span style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="nav-drawer">
          {LINKS.map((s) => (
            <a key={s} href={`#sec-${s}`} className="nav-link" onClick={close}>
              {s}
            </a>
          ))}
          <a
            href="#sec-contact"
            onClick={close}
            style={{
              color: 'var(--pul)',
              borderTop: '1px solid var(--bd)',
              paddingTop: '1rem',
              marginTop: '.25rem',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              fontSize: '.88rem',
              fontWeight: 600,
            }}
          >
            Hire Me →
          </a>
        </div>
      )}
    </>
  )
}
