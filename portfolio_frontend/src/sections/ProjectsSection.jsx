import { useState } from 'react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { CARD_COLORS } from '../data'

function ProjectCard({ project, index }) {
  const color = CARD_COLORS[index % CARD_COLORS.length]

  return (
    <div
      className="proj-card"
      style={{
        background: 'var(--surf)',
        border: '1px solid var(--bd)',
        borderRadius: 'var(--r)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Thumbnail — stylised project name */}
      <div
        style={{
          height: 130,
          background: `linear-gradient(135deg,${color}18,var(--bg3))`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 1.2rem',
          position: 'relative',
          overflow: 'hidden',
          gap: 4,
        }}
      >
        {/* large initials */}
        <div
          className="mono"
          style={{
            fontSize: '2.4rem',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: color,
            userSelect: 'none',
          }}
        >
          {project.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}
        </div>
        {/* full name */}
        <div
          style={{
            fontSize: '.6rem',
            fontWeight: 600,
            color: 'var(--tx3)',
            textTransform: 'uppercase',
            letterSpacing: '.12em',
            textAlign: 'center',
            lineHeight: 1.4,
            maxWidth: '90%',
          }}
        >
          {project.name}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: color }} />
      </div>

      {/* Number badge */}
      <div
        className="mono"
        style={{
          position: 'absolute',
          top: '.85rem',
          right: '.85rem',
          fontSize: '.62rem',
          color: 'var(--tx3)',
          background: 'var(--bg)',
          border: '1px solid var(--bd)',
          borderRadius: 4,
          padding: '.18rem .45rem',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem' }}>
        {/* Tag pills */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: '.75rem' }}>
          {project.tags.map((t, ti) => (
            <span
              key={t}
              className="mono"
              style={{
                fontSize: '.62rem',
                padding: '.2rem .5rem',
                borderRadius: 4,
                background: ti % 2 === 0 ? 'rgba(124,58,237,.12)' : 'rgba(0,212,180,.1)',
                color: ti % 2 === 0 ? 'var(--pul)' : 'var(--te)',
                border: `1px solid ${ti % 2 === 0 ? 'rgba(124,58,237,.2)' : 'rgba(0,212,180,.2)'}`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 6 }}>{project.name}</div>
        <p style={{ color: 'var(--tx2)', fontSize: '.82rem', lineHeight: 1.7, marginBottom: '1rem' }}>
          {project.desc}
        </p>

        {/* Links */}
        <div style={{ display: 'flex', gap: 10 }}>
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="mono"
              style={{ fontSize: '.72rem', color: 'var(--tx3)', transition: 'color .2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--te)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--tx3)')}
            >
              ⬡ Live Demo
            </a>
          )}
          {project.github && project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="mono"
              style={{ fontSize: '.72rem', color: 'var(--tx3)', transition: 'color .2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--te)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--tx3)')}
            >
              ⌥ GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection({ projects }) {
  const [activeTab, setActiveTab] = useState('All')
  const cats = ['All', ...new Set(projects.map((p) => p.cat))]
  const visible = activeTab === 'All' ? projects : projects.filter((p) => p.cat === activeTab)

  return (
    <section id="sec-projects" style={{ padding: '5rem 2rem', background: 'var(--bg2)' }}>
      <Reveal>
        <SectionHeader
          num="05"
          tag="projects"
          title="My"
          titleAccent="Work"
          subtitle="Selected projects across different domains."
        />
      </Reveal>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Category tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              gap: 3,
              background: 'var(--surf)',
              borderRadius: 9,
              border: '1px solid var(--bd)',
              padding: 4,
            }}
          >
            {cats.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: '.48rem 1.1rem',
                  borderRadius: 6,
                  border: 'none',
                  background: activeTab === cat ? 'var(--pu)' : 'transparent',
                  color: activeTab === cat ? '#fff' : 'var(--tx2)',
                  fontSize: '.8rem',
                  fontWeight: 500,
                  transition: 'all .25s',
                  boxShadow: activeTab === cat ? '0 0 18px var(--pug)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid */}
        <div
          className="panel-anim"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {visible.map((project, i) => (
            <ProjectCard key={project.name + i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
