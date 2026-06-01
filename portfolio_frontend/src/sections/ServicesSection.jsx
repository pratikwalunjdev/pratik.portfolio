import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'

export default function ServicesSection({ services = [] }) {
  return (
    <section id="sec-services" style={{ padding: '5rem 2rem', background: 'var(--bg2)' }}>
      <Reveal>
        <SectionHeader
          num="03"
          tag="services"
          title="What I"
          titleAccent="Offer"
          subtitle="End-to-end development services to turn your ideas into reality."
        />
      </Reveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
          maxWidth: 800,
          margin: '0 auto',
        }}
      >
        {services.map((svc, i) => (
          <Reveal key={svc.id ?? svc.name} delay={i * 0.06}>
            <div
              className="svc-card"
              style={{
                background: 'var(--surf)',
                border: '1px solid var(--bd)',
                borderRadius: 'var(--r)',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 9,
                  background: 'var(--surf2)',
                  border: '1px solid var(--bd2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                }}
              >
                {svc.icon}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>{svc.name}</div>
              <p style={{ color: 'var(--tx2)', fontSize: '.82rem', lineHeight: 1.7, marginBottom: '.85rem' }}>
                {svc.desc}
              </p>
              <span
                className="mono"
                style={{
                  fontSize: '.65rem',
                  color: 'var(--te)',
                  background: 'rgba(0,212,180,.08)',
                  border: '1px solid rgba(0,212,180,.2)',
                  borderRadius: 4,
                  padding: '.22rem .55rem',
                }}
              >
                {svc.tag}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
