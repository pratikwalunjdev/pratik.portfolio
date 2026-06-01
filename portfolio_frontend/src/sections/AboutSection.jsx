import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { STATUS_MAP } from '../data'

export default function AboutSection({ data }) {
  const st = STATUS_MAP[data.status] || STATUS_MAP.available

  return (
    <section id="sec-about" style={{ padding: '5rem 2rem', background: 'var(--bg)' }}>
      <Reveal>
        <SectionHeader num="01" tag="about" title="Who" titleAccent="I Am" />
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        {/* Avatar */}
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: 260,
                  height: 260,
                  borderRadius: 18,
                  background: 'var(--surf)',
                  border: '1px solid var(--bd2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'float 5s ease-in-out infinite',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg,var(--pug),var(--teg))',
                    opacity: 0.6,
                  }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>👨‍💻</span>
              </div>
              {/* Status badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -12,
                  right: 10,
                  background: st.bg,
                  border: `1px solid ${st.border}`,
                  borderRadius: 50,
                  padding: '.38rem .9rem',
                  fontFamily: "'Space Mono',monospace",
                  fontSize: '.65rem',
                  color: st.color,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span className="status-dot blink" style={{ background: st.color }} />
                {st.label}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Info */}
        <Reveal delay={0.15}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: 4 }}>
            {data.name}
          </div>
          <div
            className="mono"
            style={{ fontSize: '.75rem', color: 'var(--pul)', letterSpacing: '.1em', marginBottom: '1.25rem' }}
          >
            {data.role.toUpperCase()} · {data.loc.toUpperCase()}
          </div>
          <p
            style={{
              color: 'var(--tx2)',
              lineHeight: 1.9,
              marginBottom: '1.5rem',
              fontSize: '.9rem',
              whiteSpace: 'pre-line',
            }}
          >
            {data.bio}
          </p>

          {/* Info grid */}
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1.5rem' }}
          >
            {[
              ['Experience', data.exp + ' Years'],
              ['Location', data.loc],
              ['Projects Done', data.projcount + '+'],
              ['Status', data.status === 'available' ? 'Open to Work' : data.status === 'busy' ? 'Currently Busy' : 'Not Available'],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  background: 'var(--surf)',
                  border: '1px solid var(--bd)',
                  borderRadius: 8,
                  padding: '.75rem .9rem',
                }}
              >
                <div
                  className="mono"
                  style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 3 }}
                >
                  {label}
                </div>
                <div style={{ fontSize: '.88rem', fontWeight: 500 }}>{val}</div>
              </div>
            ))}
          </div>

          <a href="#sec-contact" className="btn-primary" style={{ display: 'inline-block' }}>
            Let's Talk
          </a>
        </Reveal>
      </div>
    </section>
  )
}
