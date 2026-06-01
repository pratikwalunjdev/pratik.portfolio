import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../components/SectionHeader'

const ACCENT = ['#7c3aed', '#00d4b4', '#f59e0b', '#3b82f6']

function TimelineNode({ edu, index, isVisible }) {
  const accent = ACCENT[index % ACCENT.length]
  const delay  = index * 0.18

  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        position: 'relative',
        opacity:    isVisible ? 1 : 0,
        transform:  isVisible ? 'none' : 'translateY(30px)',
        transition: `opacity .6s ${delay}s ease, transform .6s ${delay}s ease`,
      }}
    >
      {/* Left column: node + vertical connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '1.5rem', flexShrink: 0 }}>
        {/* Node */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: `${accent}18`,
            border: `2px solid ${accent}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            zIndex: 1,
            opacity:    isVisible ? 1 : 0,
            transform:  isVisible ? 'scale(1)' : 'scale(0)',
            transition: `opacity .4s ${delay + 0.1}s ease, transform .4s ${delay + 0.1}s cubic-bezier(.34,1.56,.64,1)`,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: accent,
              animation: isVisible ? `nodePulse 2.4s ${delay + 0.5}s ease-in-out infinite` : 'none',
            }}
          />
        </div>

        {/* Connector line (except for last item) */}
        <div
          style={{
            width: 2,
            flex: 1,
            minHeight: 32,
            background: `linear-gradient(to bottom, ${accent}80, ${ACCENT[(index + 1) % ACCENT.length]}40)`,
            opacity:    isVisible ? 1 : 0,
            transform:  isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: `opacity .4s ${delay + 0.3}s, transform .5s ${delay + 0.3}s ease`,
          }}
        />
      </div>

      {/* Right column: card */}
      <div
        style={{
          flex: 1,
          background: 'var(--surf)',
          border: '1px solid var(--bd)',
          borderLeft: `3px solid ${accent}`,
          borderRadius: 'var(--r)',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.5rem',
          opacity:    isVisible ? 1 : 0,
          transform:  isVisible ? 'translateX(0)' : 'translateX(-16px)',
          transition: `opacity .5s ${delay + 0.15}s ease, transform .5s ${delay + 0.15}s ease`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>{edu.degree}</div>
          {edu.duration && (
            <span
              className="mono"
              style={{
                fontSize: '.65rem',
                color: accent,
                background: `${accent}14`,
                border: `1px solid ${accent}35`,
                borderRadius: 4,
                padding: '.2rem .55rem',
                whiteSpace: 'nowrap',
              }}
            >
              {edu.duration}
            </span>
          )}
        </div>

        <div style={{ color: 'var(--tx2)', fontSize: '.86rem', marginBottom: edu.grade ? 6 : 0 }}>
          {edu.institution}
        </div>

        {edu.grade && (
          <div className="mono" style={{ fontSize: '.72rem', color: accent, marginBottom: edu.description ? 8 : 0 }}>
            {edu.grade}
          </div>
        )}

        {edu.description && (
          <p style={{ color: 'var(--tx3)', fontSize: '.8rem', lineHeight: 1.7, margin: 0, marginTop: 8 }}>
            {edu.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default function EducationSection({ education = [] }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!education.length) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [education.length])

  if (!education.length) return null

  return (
    <section id="sec-education" style={{ padding: '5rem 2rem', background: 'var(--bg2)' }}>
      <style>{`
        @keyframes nodePulse {
          0%, 100% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
          50%       { opacity: .6; transform: scale(1.2); }
        }
      `}</style>

      <div
        style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}
      >
        <SectionHeader
          num="02"
          tag="education"
          title="My"
          titleAccent="Education"
          subtitle="Academic background and qualifications."
        />
      </div>

      <div ref={ref} style={{ maxWidth: 700, margin: '0 auto' }}>
        {education.map((edu, i) => (
          <TimelineNode key={edu.id} edu={edu} index={i} isVisible={visible} />
        ))}
      </div>
    </section>
  )
}
