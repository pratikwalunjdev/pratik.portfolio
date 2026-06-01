export default function Footer({ name }) {
  const slug = name.toLowerCase().replace(' ', '')
  return (
    <footer
      style={{
        background: 'var(--bg2)',
        borderTop: '1px solid var(--bd)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '.75rem',
        color: 'var(--tx3)',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div className="mono" style={{ color: 'var(--pul)' }}>
        {slug}.dev
      </div>
      <div>Built with React · Django backend coming soon</div>
      <div>© {new Date().getFullYear()} All rights reserved</div>
    </footer>
  )
}
