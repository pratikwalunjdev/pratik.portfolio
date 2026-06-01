import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import SkillLogo from '../components/SkillLogo'

export default function SkillsSection({ skills }) {
  const allItems = skills.flatMap((c) => c.items)

  return (
    <section id="sec-skills" style={{ padding: '5rem 2rem', background: 'var(--bg)' }}>
      <Reveal>
        <SectionHeader
          num="03"
          tag="skills"
          title="My"
          titleAccent="Tech Stack"
          subtitle="Tools and technologies I work with every day."
        />
      </Reveal>

      <div style={{ maxWidth: 940, margin: '0 auto' }}>
        {skills.map((cat, ci) => (
          <Reveal key={cat.cat} delay={ci * 0.08} style={{ marginBottom: '2.5rem' }}>
            {/* Category label */}
            <div
              className="mono"
              style={{
                fontSize: '.7rem',
                color: 'var(--pul)',
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              {cat.cat}
              <span style={{ flex: 1, height: 1, background: 'var(--bd)', display: 'block' }} />
            </div>

            {/* Skill pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {cat.items.map((sk, si) => (
                <div
                  key={sk}
                  className="skill-pill"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    background: 'var(--surf)',
                    border: `1px solid ${si < 3 ? 'rgba(124,58,237,.3)' : 'var(--bd)'}`,
                    borderRadius: 7,
                    padding: '.42rem .85rem',
                    fontSize: '.82rem',
                    color: si < 3 ? 'var(--pul)' : 'var(--tx2)',
                  }}
                >
                  <SkillLogo name={sk} size={24} />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Scrolling marquee */}
      <Reveal
        style={{
          overflow: 'hidden',
          padding: '1.5rem 0',
          borderTop: '1px solid var(--bd)',
          borderBottom: '1px solid var(--bd)',
          marginTop: '1rem',
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
          {[...allItems, ...allItems].map((sk, i) => (
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
              <SkillLogo name={sk} size={24} />
              <span>{sk}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
