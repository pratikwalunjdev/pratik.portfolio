import { useTerminalLine, useTypingEffect } from '../hooks'
import { STATUS_MAP } from '../data'

function TermLine({ html, delay }) {
  const visible = useTerminalLine(delay)
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity .4s',
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        lineHeight: 2.1,
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default function HeroSection({ data }) {
  const typed = useTypingEffect()
  const st = STATUS_MAP[data.status] || STATUS_MAP.available

  return (
    <section
      id="sec-home"
      style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(124,58,237,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.04) 1px,transparent 1px)',
          backgroundSize: '55px 55px',
          pointerEvents: 'none',
        }}
      />
      {/* Glow orbs */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(124,58,237,.16) 0%,transparent 70%)',
          top: -80,
          left: -80,
          pointerEvents: 'none',
          animation: 'pulse 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(0,212,180,.1) 0%,transparent 70%)',
          bottom: -60,
          right: -60,
          pointerEvents: 'none',
          animation: 'pulse2 10s ease-in-out infinite',
        }}
      />

      <div className="hero-anim" style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
        {/* Status badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: st.bg,
            border: `1px solid ${st.border}`,
            borderRadius: 100,
            padding: '.38rem 1rem',
            fontFamily: "'Space Mono',monospace",
            fontSize: '.68rem',
            color: st.color,
            letterSpacing: '.1em',
            marginBottom: '1.75rem',
          }}
        >
          <span className="status-dot blink" style={{ background: st.color }} />
          {st.label}
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.2rem,5vw,4.2rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-.04em',
            marginBottom: '1.1rem',
          }}
        >
          Hi, I'm <span style={{ color: 'var(--pul)' }}>{data.name}</span>
          <br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(167,139,250,.5)' }}>
            I'm a{' '}
          </span>
          <span style={{ color: 'var(--te)' }}>{typed}</span>
          <span className="t-cursor" />
        </h1>

        <p
          style={{
            color: 'var(--tx2)',
            fontSize: '.98rem',
            lineHeight: 1.8,
            maxWidth: 520,
            margin: '0 auto 2.2rem',
          }}
        >
          Building fast, scalable, and beautiful digital products — from pixel-perfect frontends to
          robust backend architectures.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: 'flex',
            gap: '.85rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          <a href="#sec-projects" className="btn-primary">
            View My Work
          </a>
          <a href="#sec-contact" className="btn-outline">
            Get In Touch
          </a>
        </div>

        {/* Terminal */}
        <div
          style={{
            width: '100%',
            maxWidth: 640,
            margin: '0 auto',
            background: 'var(--bg2)',
            border: '1px solid var(--bd)',
            borderRadius: 'var(--r)',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(0,0,0,.45)',
          }}
        >
          {/* Terminal title bar */}
          <div
            style={{
              background: 'var(--bg3)',
              padding: '.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '1px solid var(--bd)',
            }}
          >
            <div style={{ display: 'flex', gap: 5 }}>
              {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
              ))}
            </div>
            <span
              className="mono"
              style={{ fontSize: '.65rem', color: 'var(--tx3)', flex: 1, textAlign: 'center' }}
            >
              ~/portfolio/about_me.js
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '1.25rem', minHeight: 190 }}>
            <TermLine html={`<span class="cm">// loading developer profile...</span>`} delay={600} />
            <TermLine html={`<span class="kw">const</span><span class="var"> developer</span> <span class="punc">= {</span>`} delay={1000} />
            <TermLine html={`&nbsp;&nbsp;<span class="fn">name</span><span class="punc">:</span> <span class="str">"${data.name}"</span><span class="punc">,</span>`} delay={1500} />
            <TermLine html={`&nbsp;&nbsp;<span class="fn">role</span><span class="punc">:</span> <span class="str">"${data.role}"</span><span class="punc">,</span>`} delay={2000} />
            <TermLine html={`&nbsp;&nbsp;<span class="fn">loves</span><span class="punc">: [</span><span class="str">"clean code"</span><span class="punc">,</span> <span class="str">"great UX"</span><span class="punc">,</span> <span class="str">"coffee"</span><span class="punc">],</span>`} delay={2500} />
            <TermLine html={`&nbsp;&nbsp;<span class="fn">openTo</span><span class="punc">:</span> <span class="str">"${st.label}"</span>`} delay={3000} />
            <TermLine html={`<span class="punc">}</span>`} delay={3500} />
            <TermLine html={`<span class="kw">export default</span><span class="var"> developer</span><span class="punc">;</span> <span class="t-cursor"></span>`} delay={4000} />
          </div>
        </div>
      </div>
    </section>
  )
}
