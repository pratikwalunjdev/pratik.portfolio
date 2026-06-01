export default function SectionHeader({ num, tag, title, titleAccent, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <div className="s-tag">
        {num} / {tag}
      </div>
      <h2
        style={{
          fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-.03em',
          marginBottom: subtitle ? '1rem' : 0,
        }}
      >
        {title} <span style={{ color: 'var(--pul)' }}>{titleAccent}</span>
      </h2>
      {subtitle && (
        <p style={{ color: 'var(--tx2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8, fontSize: '.9rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
