import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import SkillLogo from '../components/SkillLogo'

const CAT_GRADIENTS = [
  ['#7c3aed', '#a78bfa'],
  ['#00d4b4', '#34d399'],
  ['#f59e0b', '#fbbf24'],
  ['#3b82f6', '#60a5fa'],
]

function SkillBar({ name, level, gradient, delay }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  const label =
    level >= 90 ? 'Expert' :
    level >= 75 ? 'Advanced' :
    level >= 60 ? 'Intermediate' : 'Learning'

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
        <SkillLogo name={name} size={22} />
        <span style={{ fontSize: '.83rem', fontWeight: 500, color: 'var(--tx)', flex: 1 }}>{name}</span>
        <span
          className="mono skill-label-hide"
          style={{
            fontSize: '.6rem',
            padding: '.15rem .4rem',
            borderRadius: 3,
            background: `${gradient[0]}18`,
            color: gradient[0],
            border: `1px solid ${gradient[0]}30`,
          }}
        >
          {label}
        </span>
        <span className="mono" style={{ fontSize: '.65rem', color: 'var(--tx3)', minWidth: 30, textAlign: 'right' }}>
          {level}%
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          background: 'var(--bg3)',
          borderRadius: 6,
          height: 6,
          overflow: 'hidden',
          border: '1px solid var(--bd)',
        }}
      >
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width:  animate ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`,
            borderRadius: 6,
            transition: `width 1s ${delay}s cubic-bezier(.4,0,.2,1)`,
            boxShadow: `0 0 8px ${gradient[0]}60`,
          }}
        />
      </div>
    </div>
  )
}

export default function SkillsSection({ skills }) {
  const ref          = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const allNames = skills.flatMap(c =>
    c.items.map(i => (typeof i === 'string' ? i : i.name))
  )

  return (
    <section id="sec-skills" style={{ padding: '5rem 2rem', background: 'var(--bg)' }}>
      <div
        style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'none' : 'translateY(20px)',
          transition: 'opacity .5s ease, transform .5s ease',
        }}
      >
        <SectionHeader
          num="04"
          tag="skills"
          title="My"
          titleAccent="Tech Stack"
          subtitle="Tools and technologies I work with, and my expertise level in each."
        />
      </div>

      {/* Skill bars grid */}
      <div
        ref={ref}
        style={{
          maxWidth: 960,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
          gap: '2rem 3.5rem',
        }}
      >
        {skills.map((cat, ci) => {
          const grad = CAT_GRADIENTS[ci % CAT_GRADIENTS.length]
          return (
            <div
              key={cat.cat}
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? 'none' : 'translateY(24px)',
                transition: `opacity .5s ${ci * 0.1}s ease, transform .5s ${ci * 0.1}s ease`,
              }}
            >
              {/* Category header */}
              <div
                className="mono"
                style={{
                  fontSize: '.7rem',
                  color: grad[0],
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                {cat.cat}
                <span style={{ flex: 1, height: 1, background: `${grad[0]}30`, display: 'block' }} />
              </div>

              {/* Skill bars */}
              {cat.items.map((sk, si) => {
                const name  = typeof sk === 'string' ? sk : sk.name
                const level = typeof sk === 'string' ? 80  : (sk.level ?? 80)
                const baseDelay = ci * 0.1 + si * 0.06
                return (
                  <SkillBar
                    key={name}
                    name={name}
                    level={level}
                    gradient={grad}
                    delay={visible ? baseDelay : 99}
                  />
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Scrolling marquee strip */}
      <div
        style={{
          overflow: 'hidden',
          padding: '1.5rem 0',
          borderTop: '1px solid var(--bd)',
          borderBottom: '1px solid var(--bd)',
          marginTop: '3rem',
          opacity:    visible ? 1 : 0,
          transition: 'opacity .6s .4s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 20,
            width: 'max-content',
            animation: 'marquee 32s linear infinite',
          }}
        >
          {[...allNames, ...allNames].map((name, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                color: 'var(--tx3)',
                fontFamily: "'Space Mono',monospace",
                fontSize: '.72rem',
                whiteSpace: 'nowrap',
              }}
            >
              <SkillLogo name={name} size={20} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
