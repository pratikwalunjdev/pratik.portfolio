export default function Navbar({ name }) {
  const slug = name.toLowerCase().replace(' ', '')

  return (
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
      <div className="mono" style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--pul)' }}>
        {slug}
        <span style={{ color: 'var(--te)' }}>.dev</span>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {['home', 'about', 'services', 'skills', 'projects', 'contact'].map((s) => (
          <a key={s} href={`#sec-${s}`} className="nav-link">
            {s}
          </a>
        ))}
      </div>

      <a
        href="#sec-contact"
        style={{
          background: 'transparent',
          border: '1px solid var(--pu)',
          color: 'var(--pul)',
          padding: '.42rem 1.2rem',
          borderRadius: 6,
          fontSize: '.8rem',
          transition: 'all .25s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--pu)'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--pul)'
        }}
      >
        Hire Me
      </a>
    </nav>
  )
}
