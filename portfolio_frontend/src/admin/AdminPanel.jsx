import { useState, useRef } from 'react'
import { STATUS_MAP, loginAdmin, updateProfile, updateContact, addProject, deleteProject, addSkill, deleteSkill, getMessages, markMessageRead, addEducation, deleteEducation, updateSkillItem, deleteSkillItem, addCertification, deleteCertification } from '../data'

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
  return <div className="admin-form-row">{children}</div>
}

function Spinner() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 14,
        height: 14,
        border: '2px solid rgba(255,255,255,.3)',
        borderTopColor: '#fff',
        borderRadius: '50%',
        animation: 'spin .7s linear infinite',
        marginRight: 6,
        verticalAlign: 'middle',
      }}
    />
  )
}

// ─── TABS ──────────────────────────────────────────────────────────────────
const TABS = ['profile', 'availability', 'projects', 'skills', 'education', 'certs', 'contact', 'messages']

export default function AdminPanel({ data, onRefresh, onToast, onClose }) {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const [pw, setPw] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [tab, setTab] = useState('profile')
  const [busy, setBusy] = useState(false)

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
  const [pendingLevels, setPendingLevels] = useState({})   // skillId → level (in-flight)
  const [savedIds, setSavedIds] = useState({})             // skillId → true (briefly shown)
  const levelTimers = useRef({})
  const [newEdu,  setNewEdu]  = useState({ degree: '', institution: '', duration: '', grade: '', description: '' })
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', credential_url: '', description: '' })
  const [messages, setMessages] = useState(null)

  async function tryLogin() {
    if (!username.trim() || !pw.trim()) return setLoginErr('Enter username and password')
    setLoggingIn(true)
    setLoginErr('')
    try {
      const t = await loginAdmin(username, pw)
      setToken(t)
    } catch (e) {
      setLoginErr(e.message)
    } finally {
      setLoggingIn(false)
    }
  }

  async function run(fn) {
    setBusy(true)
    try {
      await fn()
      await onRefresh()
      onToast('Saved successfully!')
    } catch (e) {
      onToast(e.message, true)
    } finally {
      setBusy(false)
    }
  }

  async function saveProfile() {
    await run(() => updateProfile(token, profile))
  }

  async function saveContact() {
    await run(() => updateContact(token, contact))
  }

  async function setStatus(key) {
    await run(() => updateProfile(token, { status: key }))
  }

  async function handleAddProject() {
    if (!newProj.name.trim()) return
    const proj = { ...newProj, tags: newProj.tags.split(',').map((t) => t.trim()).filter(Boolean) }
    await run(() => addProject(token, proj))
    setNewProj({ name: '', cat: 'Web Apps', desc: '', tags: '', icon: '💻', live: '', github: '' })
  }

  async function handleDeleteProject(id) {
    await run(() => deleteProject(token, id))
  }

  async function handleAddSkill() {
    if (!newSkill.cat.trim() || !newSkill.items.trim()) return
    const items = newSkill.items.split(',').map((s) => s.trim()).filter(Boolean)
    await run(() => addSkill(token, { cat: newSkill.cat, items }))
    setNewSkill({ cat: '', items: '' })
  }

  async function handleDeleteSkill(id) {
    await run(() => deleteSkill(token, id))
  }

  function handleLevelChange(skillId, level) {
    setPendingLevels(p => ({ ...p, [skillId]: level }))
    clearTimeout(levelTimers.current[skillId])
    levelTimers.current[skillId] = setTimeout(async () => {
      try {
        await updateSkillItem(token, skillId, { level })
        setSavedIds(p => ({ ...p, [skillId]: true }))
        setTimeout(() => setSavedIds(p => { const n = { ...p }; delete n[skillId]; return n }), 1400)
      } catch (e) {
        onToast(e.message, true)
      }
    }, 600)
  }

  async function handleDeleteSkillItem(skillId) {
    try {
      await deleteSkillItem(token, skillId)
      setPendingLevels(p => { const n = { ...p }; delete n[skillId]; return n })
      await onRefresh()
      onToast('Skill removed')
    } catch (e) {
      onToast(e.message, true)
    }
  }

  async function handleAddEducation() {
    if (!newEdu.degree.trim() || !newEdu.institution.trim()) return
    await run(() => addEducation(token, newEdu))
    setNewEdu({ degree: '', institution: '', duration: '', grade: '', description: '' })
  }

  async function handleDeleteEducation(id) {
    await run(() => deleteEducation(token, id))
  }

  async function handleAddCert() {
    if (!newCert.title.trim() || !newCert.issuer.trim()) return
    await run(() => addCertification(token, newCert))
    setNewCert({ title: '', issuer: '', date: '', credential_url: '', description: '' })
  }

  async function handleDeleteCert(id) {
    await run(() => deleteCertification(token, id))
  }

  async function loadMessages() {
    setBusy(true)
    try {
      const msgs = await getMessages(token)
      setMessages(msgs)
    } catch (e) {
      onToast(e.message, true)
    } finally {
      setBusy(false)
    }
  }

  async function handleMarkRead(id) {
    try {
      await markMessageRead(token, id)
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, is_read: true } : m))
    } catch (e) {
      onToast(e.message, true)
    }
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.78)', backdropFilter: 'blur(6px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div
        style={{
          background: 'var(--bg2)',
          border: '1px solid var(--bd2)',
          borderRadius: 18,
          width: 'min(680px, 95vw)',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '1.75rem',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--bd)' }}>
          <div className="mono" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--pul)' }}>⚙ Admin Panel</div>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--bd)', width: 28, height: 28, borderRadius: 5, color: 'var(--tx2)', fontSize: '.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Login */}
        {!token ? (
          <div>
            <Field label="Username" value={username} onChange={setUsername} />
            <Field label="Password" type="password" value={pw} onChange={setPw} />
            {loginErr && (
              <p className="mono" style={{ color: '#f87171', fontSize: '.65rem', marginTop: -6, marginBottom: 8 }}>
                {loginErr}
              </p>
            )}
            <button
              className="admin-save-btn"
              onClick={tryLogin}
              disabled={loggingIn}
              style={{ opacity: loggingIn ? 0.7 : 1 }}
            >
              {loggingIn && <Spinner />}
              Unlock Panel
            </button>
            <p className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)', textAlign: 'center', marginTop: 8 }}>
              Enter your admin credentials to continue
            </p>
          </div>
        ) : (
          <>
            {/* Tab bar */}
            <div style={{ display: 'flex', gap: 3, background: 'var(--surf)', borderRadius: 8, padding: 3, border: '1px solid var(--bd)', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {TABS.map((t) => (
                <button
                  key={t}
                  className="admin-tab"
                  onClick={() => { setTab(t); if (t === 'messages' && messages === null) loadMessages() }}
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
                <button className="admin-save-btn" onClick={saveProfile} disabled={busy}>
                  {busy && <Spinner />} Save Profile
                </button>
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
                      disabled={busy}
                      style={{
                        border: `2px solid ${data.status === key ? s.border : 'var(--bd)'}`,
                        background: data.status === key ? s.bg : 'var(--surf)',
                        opacity: busy ? 0.6 : 1,
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
                <button className="admin-save-btn" onClick={handleAddProject} disabled={busy}>
                  {busy && <Spinner />} + Add Project
                </button>

                <div style={{ marginTop: '1.25rem' }}>
                  {data.projects.map((p) => (
                    <div key={p.id} style={{ background: 'var(--surf)', border: '1px solid var(--bd)', borderRadius: 7, padding: '.65rem .9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, fontSize: '.82rem' }}>
                      <span>{p.icon} {p.name} <span style={{ color: 'var(--tx3)', fontSize: '.7rem' }}>[{p.cat}]</span></span>
                      <button className="admin-del-btn" onClick={() => handleDeleteProject(p.id)} disabled={busy}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── SKILLS ── */}
            {tab === 'skills' && (
              <div>
                <style>{`
                  .skill-slider { -webkit-appearance:none; appearance:none; width:100%; height:4px; border-radius:4px; background:var(--bg3); outline:none; cursor:pointer; }
                  .skill-slider::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; background:var(--pu); border:2px solid var(--pul); cursor:pointer; transition:transform .15s; }
                  .skill-slider::-webkit-slider-thumb:hover { transform:scale(1.25); }
                  .skill-slider::-moz-range-thumb { width:16px; height:16px; border-radius:50%; background:var(--pu); border:2px solid var(--pul); cursor:pointer; }
                  .skill-slider::-webkit-slider-runnable-track { height:4px; border-radius:4px; }
                `}</style>

                {/* Existing categories */}
                {data.skills.map((cat) => (
                  <div
                    key={cat.id}
                    style={{ background: 'var(--surf)', border: '1px solid var(--bd)', borderRadius: 10, padding: '1rem 1.1rem', marginBottom: '1rem' }}
                  >
                    {/* Category header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                      <span className="mono" style={{ fontSize: '.72rem', color: 'var(--pul)', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                        {cat.cat}
                      </span>
                      <button className="admin-del-btn" onClick={() => handleDeleteSkill(cat.id)} disabled={busy}>
                        Delete Category
                      </button>
                    </div>

                    {/* Skill rows */}
                    {cat.items.map((item, si) => {
                      const id    = item.id ?? `${cat.id}_${si}`   // always unique
                      const level = pendingLevels[id] ?? item.level ?? 80
                      const saved = savedIds[id]
                      const pct   = level
                      const label = pct >= 90 ? 'Expert' : pct >= 75 ? 'Advanced' : pct >= 55 ? 'Intermediate' : 'Learning'
                      return (
                        <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, flexWrap: 'wrap', minWidth: 0 }}>
                          {/* Skill name */}
                          <span style={{ width: 120, fontSize: '.8rem', color: 'var(--tx2)', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {item.name}
                          </span>

                          {/* Slider */}
                          <div style={{ flex: 1, position: 'relative' }}>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={level}
                              onChange={(e) => handleLevelChange(id, parseInt(e.target.value))}
                              className="skill-slider"
                              style={{
                                background: `linear-gradient(to right, var(--pu) ${level}%, var(--bg3) ${level}%)`,
                              }}
                            />
                          </div>

                          {/* Level % */}
                          <span className="mono" style={{ width: 30, fontSize: '.72rem', color: 'var(--tx3)', textAlign: 'right', flexShrink: 0 }}>
                            {level}%
                          </span>

                          {/* Label badge */}
                          <span className="mono" style={{ width: 80, fontSize: '.6rem', color: 'var(--pu)', background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.25)', borderRadius: 3, padding: '.14rem .35rem', textAlign: 'center', flexShrink: 0 }}>
                            {label}
                          </span>

                          {/* Saved / Delete */}
                          {saved ? (
                            <span style={{ fontSize: '.72rem', color: '#22c55e', width: 18, flexShrink: 0 }}>✓</span>
                          ) : (
                            <button
                              onClick={() => handleDeleteSkillItem(id)}
                              style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: '.78rem', cursor: 'pointer', width: 18, flexShrink: 0, padding: 0, lineHeight: 1 }}
                              title="Remove skill"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}

                {/* Add skills form */}
                <div style={{ borderTop: '1px solid var(--bd)', paddingTop: '1.1rem', marginTop: '.5rem' }}>
                  <p className="mono" style={{ fontSize: '.65rem', color: 'var(--tx3)', marginBottom: 10 }}>
                    Add skills — use existing category name to append, or type a new one to create
                  </p>
                  <Row>
                    <Field label="Category" value={newSkill.cat} onChange={(v) => setNewSkill({ ...newSkill, cat: v })} />
                    <Field label="Skills (comma separated)" value={newSkill.items} onChange={(v) => setNewSkill({ ...newSkill, items: v })} />
                  </Row>
                  <button className="admin-save-btn" onClick={handleAddSkill} disabled={busy}>
                    {busy && <Spinner />} + Add Skills
                  </button>
                </div>
              </div>
            )}

            {/* ── EDUCATION ── */}
            {tab === 'education' && (
              <div>
                <Row>
                  <Field label="Degree / Course" value={newEdu.degree} onChange={(v) => setNewEdu({ ...newEdu, degree: v })} />
                  <Field label="Institution" value={newEdu.institution} onChange={(v) => setNewEdu({ ...newEdu, institution: v })} />
                </Row>
                <Row>
                  <Field label="Duration (e.g. 2020 – 2024)" value={newEdu.duration} onChange={(v) => setNewEdu({ ...newEdu, duration: v })} />
                  <Field label="Grade / CGPA (optional)" value={newEdu.grade} onChange={(v) => setNewEdu({ ...newEdu, grade: v })} />
                </Row>
                <Field label="Description (optional)" value={newEdu.description} onChange={(v) => setNewEdu({ ...newEdu, description: v })} textarea />
                <button className="admin-save-btn" onClick={handleAddEducation} disabled={busy}>
                  {busy && <Spinner />} + Add Education
                </button>

                <div style={{ marginTop: '1.25rem' }}>
                  {(data.education || []).map((e) => (
                    <div key={e.id} style={{ background: 'var(--surf)', border: '1px solid var(--bd)', borderRadius: 7, padding: '.65rem .9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, fontSize: '.82rem' }}>
                      <span>
                        <strong style={{ color: 'var(--pul)' }}>{e.degree}</strong>
                        <span style={{ color: 'var(--tx3)', fontSize: '.7rem' }}> · {e.institution}</span>
                      </span>
                      <button className="admin-del-btn" onClick={() => handleDeleteEducation(e.id)} disabled={busy}>Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CERTIFICATIONS ── */}
            {tab === 'certs' && (
              <div>
                <Row>
                  <Field label="Certification Title" value={newCert.title} onChange={(v) => setNewCert({ ...newCert, title: v })} />
                  <Field label="Issuing Organisation" value={newCert.issuer} onChange={(v) => setNewCert({ ...newCert, issuer: v })} />
                </Row>
                <Row>
                  <Field label="Date (e.g. Jan 2024)" value={newCert.date} onChange={(v) => setNewCert({ ...newCert, date: v })} />
                  <Field label="Credential URL (optional)" value={newCert.credential_url} onChange={(v) => setNewCert({ ...newCert, credential_url: v })} />
                </Row>
                <Field label="Description (optional)" value={newCert.description} onChange={(v) => setNewCert({ ...newCert, description: v })} textarea />
                <button className="admin-save-btn" onClick={handleAddCert} disabled={busy}>
                  {busy && <Spinner />} + Add Certification
                </button>

                <div style={{ marginTop: '1.25rem' }}>
                  {(data.certifications || []).map((c) => (
                    <div key={c.id} style={{ background: 'var(--surf)', border: '1px solid var(--bd)', borderRadius: 7, padding: '.65rem .9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, fontSize: '.82rem' }}>
                      <div>
                        <strong style={{ color: 'var(--pul)' }}>{c.title}</strong>
                        <span style={{ color: 'var(--tx3)', fontSize: '.72rem' }}> · {c.issuer}</span>
                        {c.date && <span className="mono" style={{ color: 'var(--tx3)', fontSize: '.65rem', marginLeft: 6 }}>{c.date}</span>}
                      </div>
                      <button className="admin-del-btn" onClick={() => handleDeleteCert(c.id)} disabled={busy}>Delete</button>
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
                <button className="admin-save-btn" onClick={saveContact} disabled={busy}>
                  {busy && <Spinner />} Save Contact Info
                </button>
              </div>
            )}

            {/* ── MESSAGES ── */}
            {tab === 'messages' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '.88rem', color: 'var(--tx2)' }}>Contact form submissions</span>
                  <button className="admin-save-btn" style={{ padding: '.4rem .9rem', fontSize: '.72rem' }} onClick={loadMessages} disabled={busy}>
                    {busy && <Spinner />} Refresh
                  </button>
                </div>

                {messages === null ? (
                  <p className="mono" style={{ color: 'var(--tx3)', fontSize: '.8rem' }}>Loading…</p>
                ) : messages.length === 0 ? (
                  <p className="mono" style={{ color: 'var(--tx3)', fontSize: '.8rem' }}>No messages yet.</p>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        background: m.is_read ? 'var(--surf)' : 'rgba(124,58,237,.08)',
                        border: `1px solid ${m.is_read ? 'var(--bd)' : 'rgba(124,58,237,.25)'}`,
                        borderRadius: 8,
                        padding: '.9rem 1rem',
                        marginBottom: 8,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: '.85rem' }}>{m.sender_name}</span>
                          <span className="mono" style={{ color: 'var(--tx3)', fontSize: '.68rem', marginLeft: 8 }}>{m.email}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          {!m.is_read && (
                            <button
                              onClick={() => handleMarkRead(m.id)}
                              className="mono"
                              style={{ fontSize: '.62rem', color: 'var(--pul)', background: 'none', border: '1px solid rgba(124,58,237,.3)', borderRadius: 4, padding: '.18rem .5rem' }}
                            >
                              Mark read
                            </button>
                          )}
                          <span className="mono" style={{ fontSize: '.62rem', color: 'var(--tx3)' }}>
                            {new Date(m.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {m.subject && (
                        <div className="mono" style={{ fontSize: '.72rem', color: 'var(--te)', marginBottom: 4 }}>{m.subject}</div>
                      )}
                      <p style={{ color: 'var(--tx2)', fontSize: '.82rem', lineHeight: 1.6, margin: 0 }}>{m.message}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
