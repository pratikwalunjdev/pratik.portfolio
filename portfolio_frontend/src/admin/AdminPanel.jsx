import { useState } from 'react'
import { STATUS_MAP } from '../data'

// ─── FIELD HELPERS ─────────────────────────────────────────────────────────
function Field({ label, id, value, onChange, textarea, type = 'text' }) {
  return (
    <div className="admin-field" style={{ marginBottom: 10 }}>
      <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>
        {label}
      </div>
      {textarea ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

function Row({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>
}

// ─── TABS ──────────────────────────────────────────────────────────────────
const TABS = ['profile', 'availability', 'projects', 'skills', 'contact']

export default function AdminPanel({ data, onUpdate, onClose }) {
  const [unlocked, setUnlocked] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [tab, setTab] = useState('profile')

  // Form states
  const [profile, setProfile] = useState({
    name: data.name, role: data.role, bio: data.bio,
    exp: data.exp, loc: data.loc, projcount: data.projcount,
  })
  const [contact, setContact] = useState({
    email: data.email, github: data.github,
    linkedin: data.linkedin, contactSub: data.contactSub,
  })
  const [newProj, setNewProj] = useState({ name: '', cat: 'Web Apps', desc: '', tags: '', icon: '💻', live: '', github: '' })
  const [newSkill, setNewSkill] = useState({ cat: '', items: '' })

  function tryLogin() {
    if (pw === 'admin123') { setUnlocked(true); setPwErr(false) }
    else setPwErr(true)
  }

  function saveProfile() {
    onUpdate({ ...data, ...profile })
  }
  function saveContact() {
    onUpdate({ ...data, ...contact })
  }
  function setStatus(key) {
    onUpdate({ ...data, status: key })
  }
  function addProject() {
    if (!newProj.name.trim()) return
    const proj = { ...newProj, tags: newProj.tags.split(',').map((t) => t.trim()).filter(Boolean) }
    onUpdate({ ...data, projects: [...data.projects, proj] })
    setNewProj({ name: '', cat: 'Web Apps', desc: '', tags: '', icon: '💻', live: '', github: '' })
  }
  function deleteProject(i) {
    onUpdate({ ...data, projects: data.projects.filter((_, j) => j !== i) })
  }
  function addSkill() {
    if (!newSkill.cat.trim() || !newSkill.items.trim()) return
    const items = newSkill.items.split(',').map((s) => s.trim()).filter(Boolean)
    const skills = [...data.skills]
    const existing = skills.find((s) => s.cat === newSkill.cat)
    if (existing) existing.items.push(...items)
    else skills.push({ cat: newSkill.cat, items })
    onUpdate({ ...data, skills })
    setNewSkill({ cat: '', items: '' })
  }
  function deleteSkill(i) {
    onUpdate({ ...data, skills: data.skills.filter((_, j) => j !== i) })
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,.78)',
        backdropFilter: 'blur(6px)',
        zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: 'var(--bg2)',
          border: '1px solid var(--bd2)',
          borderRadius: 18,
          width: 'min(660px, 95vw)',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.75rem',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--bd)' }}>
          <div className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--pul)' }}>⚙ Admin Panel</div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: '1px solid var(--bd)', width: 28, height: 28, borderRadius: 5, color: 'var(--tx2)', fontSize: '.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >✕</button>
        </div>

        {/* Login */}
        {!unlocked ? (
          <div>
            <Field label="Password" type="password" value={pw} onChange={setPw} />
            {pwErr && <p className="mono" style={{ color: '#f87171', fontSize: '.65rem', marginTop: -6, marginBottom: 8 }}>Wrong password. Try: admin123</p>}
            <button className="admin-save-btn" onClick={tryLogin} onKeyDown={(e) => e.key === 'Enter' && tryLogin()}>
              Unlock Panel
            </button>
            <p className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textAlign: 'center', marginTop: 8 }}>
              Default password: admin123
            </p>
          </div>
        ) : (
          <>
            {/* Tab bar */}
            <div style={{ display: 'flex', gap: 3, background: 'var(--surf)', borderRadius: 8, padding: 3, border: '1px solid var(--bd)', marginBottom: '1.25rem' }}>
              {TABS.map((t) => (
                <button
                  key={t}
                  className="admin-tab"
                  onClick={() => setTab(t)}
                  style={{ background: tab === t ? 'var(--pu)' : 'transparent', color: tab === t ? '#fff' : 'var(--tx2)' }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* ── PROFILE ── */}
            {tab === 'profile' && (
              <div>
                <Row>
                  <Field label="Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
                  <Field label="Role" value={profile.role} onChange={(v) => setProfile({ ...profile, role: v })} />
                </Row>
                <Field label="Bio" value={profile.bio} onChange={(v) => setProfile({ ...profile, bio: v })} textarea />
                <Row>
                  <Field label="Experience" value={profile.exp} onChange={(v) => setProfile({ ...profile, exp: v })} />
                  <Field label="Location" value={profile.loc} onChange={(v) => setProfile({ ...profile, loc: v })} />
                </Row>
                <Field label="Projects count" value={profile.projcount} onChange={(v) => setProfile({ ...profile, projcount: v })} />
                <button className="admin-save-btn" onClick={saveProfile}>Save Profile</button>
              </div>
            )}

            {/* ── AVAILABILITY ── */}
            {tab === 'availability' && (
              <div>
                <p style={{ color: 'var(--tx2)', fontSize: '.82rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  Click a status to update it instantly across the entire site.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {Object.entries(STATUS_MAP).map(([key, s]) => (
                    <button
                      key={key}
                      className="avail-btn"
                      onClick={() => setStatus(key)}
                      style={{
                        border: `2px solid ${data.status === key ? s.border : 'var(--bd)'}`,
                        background: data.status === key ? s.bg : 'var(--surf)',
                      }}
                    >
                      <span className="status-dot" style={{ background: s.color, width: 11, height: 11, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '.88rem', color: data.status === key ? s.color : 'var(--tx)' }}>{s.label}</div>
                        <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', marginTop: 1 }}>key: "{key}"</div>
                      </div>
                      {data.status === key && (
                        <span className="mono" style={{ marginLeft: 'auto', color: s.color, fontSize: '.65rem' }}>● active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── PROJECTS ── */}
            {tab === 'projects' && (
              <div>
                <Row>
                  <Field label="Project name" value={newProj.name} onChange={(v) => setNewProj({ ...newProj, name: v })} />
                  <div className="admin-field" style={{ marginBottom: 10 }}>
                    <div className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 5 }}>Category</div>
                    <select value={newProj.cat} onChange={(e) => setNewProj({ ...newProj, cat: e.target.value })}>
                      {['Web Apps', 'Mobile', 'Open Source', 'AI / ML', 'Other'].map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </Row>
                <Field label="Description" value={newProj.desc} onChange={(v) => setNewProj({ ...newProj, desc: v })} textarea />
                <Row>
                  <Field label="Tags (comma separated)" value={newProj.tags} onChange={(v) => setNewProj({ ...newProj, tags: v })} />
                  <Field label="Emoji icon" value={newProj.icon} onChange={(v) => setNewProj({ ...newProj, icon: v })} />
                </Row>
                <Row>
                  <Field label="Live URL" value={newProj.live} onChange={(v) => setNewProj({ ...newProj, live: v })} />
                  <Field label="GitHub URL" value={newProj.github} onChange={(v) => setNewProj({ ...newProj, github: v })} />
                </Row>
                <button className="admin-save-btn" onClick={addProject}>+ Add Project</button>

                <div style={{ marginTop: '1.25rem' }}>
                  {data.projects.map((p, i) => (
                    <div key={i} style={{ background: 'var(--surf)', border: '1px solid var(--bd)', borderRadius: 7, padding: '.65rem .9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, fontSize: '.82rem' }}>
                      <span>{p.icon} {p.name} <span style={{ color: 'var(--tx3)', fontSize: '.7rem' }}>[{p.cat}]</span></span>
                      <button className="admin-del-btn" onClick={() => deleteProject(i)}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SKILLS ── */}
            {tab === 'skills' && (
              <div>
                <Row>
                  <Field label="Category name" value={newSkill.cat} onChange={(v) => setNewSkill({ ...newSkill, cat: v })} />
                  <Field label="Skills (comma separated)" value={newSkill.items} onChange={(v) => setNewSkill({ ...newSkill, items: v })} />
                </Row>
                <button className="admin-save-btn" onClick={addSkill}>+ Add Skills</button>

                <div style={{ marginTop: '1.25rem' }}>
                  {data.skills.map((s, i) => (
                    <div key={i} style={{ background: 'var(--surf)', border: '1px solid var(--bd)', borderRadius: 7, padding: '.65rem .9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, fontSize: '.82rem' }}>
                      <span><strong style={{ color: 'var(--pul)' }}>{s.cat}</strong>: {s.items.join(', ')}</span>
                      <button className="admin-del-btn" onClick={() => deleteSkill(i)}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CONTACT ── */}
            {tab === 'contact' && (
              <div>
                <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
                <Field label="GitHub URL" value={contact.github} onChange={(v) => setContact({ ...contact, github: v })} />
                <Field label="LinkedIn URL" value={contact.linkedin} onChange={(v) => setContact({ ...contact, linkedin: v })} />
                <Field label="Contact subtitle" value={contact.contactSub} onChange={(v) => setContact({ ...contact, contactSub: v })} textarea />
                <button className="admin-save-btn" onClick={saveContact}>Save Contact Info</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
