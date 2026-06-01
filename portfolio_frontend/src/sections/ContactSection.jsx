import { useState } from 'react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { sendMessage } from '../data'

export default function ContactSection({ data, onToast }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      return onToast('Name, email, and message are required', true)
    }
    setSending(true)
    try {
      await sendMessage(form)
      setForm({ name: '', email: '', subject: '', message: '' })
      onToast('Message sent!')
    } catch (err) {
      onToast(err.message || 'Failed to send message', true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="sec-contact" style={{ padding: '5rem 2rem', background: 'var(--bg)', textAlign: 'center' }}>
      <Reveal>
        <SectionHeader num="07" tag="contact" title="Get In" titleAccent="Touch" />

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
        <form
          onSubmit={handleSubmit}
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
            {[['name', 'Name', 'Your name'], ['email', 'Email', 'your@email.com']].map(([field, label, ph]) => (
              <div key={field}>
                <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>
                  {label}
                </div>
                <input className="contact-input" placeholder={ph} value={form[field]} onChange={set(field)} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>
              Subject
            </div>
            <input className="contact-input" placeholder="Project idea / Job opportunity" value={form.subject} onChange={set('subject')} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>
              Message
            </div>
            <textarea className="contact-input" placeholder="Tell me about your project..." rows={4} value={form.message} onChange={set('message')} />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={sending}
            style={{ width: '100%', borderRadius: 8, padding: '.85rem', opacity: sending ? 0.7 : 1 }}
          >
            {sending ? 'Sending…' : 'Send Message →'}
          </button>
        </form>
      </Reveal>
    </section>
  )
}
