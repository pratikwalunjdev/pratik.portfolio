import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../components/SectionHeader'

const ACCENTS = ['#7c3aed', '#00d4b4', '#f59e0b', '#3b82f6', '#ec4899', '#10b981']

function CertCard({ cert, index, visible }) {
  const accent = ACCENTS[index % ACCENTS.length]
  const delay  = index * 0.12

  return (
    <div
      style={{
        background:  'var(--surf)',
        border:      '1px solid var(--bd)',
        borderRadius: 'var(--r)',
        padding:     '1.4rem 1.5rem',
        position:    'relative',
        overflow:    'hidden',
        opacity:     visible ? 1 : 0,
        transform:   visible ? 'translateY(0)' : 'translateY(28px)',
        transition:  `opacity .55s ${delay}s ease, transform .55s ${delay}s ease`,
        display:     'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${accent}, ${accent}44)`,
          transform:  visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: `transform .7s ${delay + 0.15}s cubic-bezier(.4,0,.2,1)`,
        }}
      />

      {/* Badge + title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {/* Verified badge icon */}
        <div
          style={{
            width: 38, height: 38, borderRadius: 9, flexShrink: 0,
            background: `${accent}18`,
            border: `1.5px solid ${accent}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem',
          }}
        >
          ✦
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '.97rem', fontWeight: 700, lineHeight: 1.35, marginBottom: 3 }}>
            {cert.title}
          </div>
          <div style={{ color: accent, fontSize: '.8rem', fontWeight: 600 }}>
            {cert.issuer}
          </div>
        </div>

        {/* Date badge */}
        {cert.date && (
          <span
            className="mono"
            style={{
              fontSize: '.62rem',
              color: 'var(--tx3)',
              background: 'var(--bg3)',
              border: '1px solid var(--bd)',
              borderRadius: 4,
              padding: '.2rem .5rem',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {cert.date}
          </span>
        )}
      </div>

      {/* Description */}
      {cert.description && (
        <p style={{ color: 'var(--tx2)', fontSize: '.8rem', lineHeight: 1.7, margin: 0 }}>
          {cert.description}
        </p>
      )}

      {/* Credential link */}
      {cert.credential_url && (
        <a
          href={cert.credential_url}
          target="_blank"
          rel="noreferrer"
          className="mono"
          style={{
            alignSelf: 'flex-start',
            fontSize: '.68rem',
            color: accent,
            textDecoration: 'none',
            borderBottom: `1px solid ${accent}50`,
            paddingBottom: 1,
            transition: 'opacity .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          View Credential →
        </a>
      )}

      {/* Corner glow */}
      <div
        style={{
          position: 'absolute',
          bottom: -24, right: -24,
          width: 80, height: 80,
          borderRadius: '50%',
          background: `${accent}0d`,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

export default function CertificationsSection({ certifications = [] }) {
  const ref              = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!certifications.length) return
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [certifications.length])

  if (!certifications.length) return null

  return (
    <section id="sec-certifications" style={{ padding: '5rem 2rem', background: 'var(--bg)' }}>
      <div
        style={{
          opacity:   visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}
      >
        <SectionHeader
          num="06"
          tag="certifications"
          title="My"
          titleAccent="Certifications"
          subtitle="Professional certifications and achievements."
        />
      </div>

      <div
        ref={ref}
        style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(420px, 100%), 1fr))',
          gap: '1.25rem',
        }}
      >
        {certifications.map((cert, i) => (
          <CertCard key={cert.id} cert={cert} index={i} visible={visible} />
        ))}
      </div>
    </section>
  )
}
