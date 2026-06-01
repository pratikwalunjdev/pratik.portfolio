import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'

export default function ContactSection({ data }) {
  return (
    <section id="sec-contact" style={{ padding: '5rem 2rem', background: 'var(--bg)', textAlign: 'center' }}>
      <Reveal>
        <SectionHeader num="05" tag="contact" title="Get In" titleAccent="Touch" />

        <div
          style={{
            fontSize: 'clamp(1.8rem,4vw,3.5rem)',
            fontWeight: 800,
            letterSpacing: '-.04em',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          Let's build
          <br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(167,139,250,.4)' }}>
            something
          </span>
          <br />
          great together
        </div>

        <p style={{ color: 'var(--tx2)', maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.8, fontSize: '.9rem' }}>
          {data.contactSub}
        </p>

        {/* Social links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '.85rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {[
            ['✉', data.email, 'mailto:' + data.email],
            ['⌥', data.github.replace('https://', ''), data.github],
            ['in', 'LinkedIn', data.linkedin],
          ].map(([icon, label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                color: 'var(--tx2)',
                fontFamily: "'Space Mono',monospace",
                fontSize: '.75rem',
                border: '1px solid var(--bd)',
                borderRadius: 8,
                padding: '.62rem 1.1rem',
                background: 'var(--surf)',
              }}
            >
              {icon} {label}
            </a>
          ))}
        </div>

        {/* Contact form */}
        <div
          style={{
            background: 'var(--surf)',
            border: '1px solid var(--bd)',
            borderRadius: 14,
            padding: '2rem',
            maxWidth: 600,
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[['Name', 'Your name'], ['Email', 'your@email.com']].map(([label, ph]) => (
              <div key={label}>
                <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>
                  {label}
                </div>
                <input className="contact-input" placeholder={ph} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>
              Subject
            </div>
            <input className="contact-input" placeholder="Project idea / Job opportunity" />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>
              Message
            </div>
            <textarea className="contact-input" placeholder="Tell me about your project..." rows={4} />
          </div>

          <button className="btn-primary" style={{ width: '100%', borderRadius: 8, padding: '.85rem' }}>
            Send Message →
          </button>
        </div>
      </Reveal>
    </section>
  )
}
