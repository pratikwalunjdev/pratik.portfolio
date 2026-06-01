// ─── GLOBAL STYLES (injected once) ────────────────────────────────────────
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg:     #0f0f14;
    --bg2:    #16161f;
    --bg3:    #1c1c28;
    --surf:   #212130;
    --surf2:  #2a2a3d;
    --pu:     #7c3aed;
    --pul:    #a78bfa;
    --pug:    rgba(124,58,237,0.22);
    --te:     #00d4b4;
    --teg:    rgba(0,212,180,0.15);
    --tx:     #f0f0f8;
    --tx2:    #b0b0c8;
    --tx3:    #6b6b88;
    --bd:     rgba(255,255,255,0.07);
    --bd2:    rgba(124,58,237,0.3);
    --r:      10px;
    --sans:   'Outfit', sans-serif;
    --mono:   'Space Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--tx);
    font-family: var(--sans);
    overflow-x: hidden;
  }

  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; font-family: var(--sans); }
  input, textarea, select { font-family: var(--sans); }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--pu); border-radius: 2px; }

  /* ── ANIMATIONS ─────────────────────────────────── */
  @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes pulse      { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.18);opacity:.55} }
  @keyframes pulse2     { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.22);opacity:.4} }
  @keyframes marquee    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  @keyframes fadeUp     { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes panelFade  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes termLine   { to{width:100%} }

  /* ── UTILITY CLASSES ─────────────────────────────── */
  .mono     { font-family: var(--mono); }
  .blink    { animation: blink 1.8s ease-in-out infinite; }
  .status-dot { width:8px; height:8px; border-radius:50%; display:inline-block; }
  .t-cursor { display:inline-block; width:9px; height:1em; background:var(--te); vertical-align:middle; animation:blink .85s step-end infinite; }
  .hero-anim { animation: fadeUp .85s ease both; }
  .panel-anim { animation: panelFade .35s ease; }

  /* ── TERMINAL SYNTAX ─────────────────────────────── */
  .kw   { color: #c792ea; }
  .fn   { color: #00d4b4; }
  .str  { color: #c3e88d; }
  .cm   { color: #546e7a; }
  .var  { color: #82aaff; }
  .punc { color: #6b6b88; }

  /* ── NAV LINKS ───────────────────────────────────── */
  .nav-link { color: var(--tx2); font-size:.8rem; letter-spacing:.08em; text-transform:uppercase; transition:color .2s; }
  .nav-link:hover { color: var(--pul); }

  /* ── SKILL PILL ──────────────────────────────────── */
  .skill-pill { transition: all .25s; }
  .skill-pill:hover { border-color: var(--bd2) !important; color: var(--pul) !important; transform: translateY(-2px); }

  /* ── SERVICE CARD ────────────────────────────────── */
  .svc-card { transition: all .3s; }
  .svc-card:hover { border-color: var(--bd2) !important; transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,.3); }

  /* ── PROJECT CARD ────────────────────────────────── */
  .proj-card { transition: all .3s; }
  .proj-card:hover { border-color: var(--bd2) !important; transform: translateY(-5px); box-shadow: 0 18px 40px rgba(0,0,0,.35); }

  /* ── CONTACT LINK ────────────────────────────────── */
  .contact-link { transition: all .25s; }
  .contact-link:hover { border-color: var(--bd2) !important; color: var(--pul) !important; transform: translateY(-2px); }

  /* ── BUTTONS ─────────────────────────────────────── */
  .btn-primary { background:var(--pu); color:#fff; padding:.78rem 2.2rem; border:none; border-radius:8px; font-weight:600; font-size:.92rem; box-shadow:0 0 28px var(--pug); transition:all .25s; cursor:pointer; }
  .btn-primary:hover { background:#6d28d9; transform:translateY(-2px); box-shadow:0 0 40px rgba(124,58,237,.45); }
  .btn-outline { background:transparent; color:var(--tx2); padding:.78rem 2.2rem; border:1px solid var(--bd); border-radius:8px; font-size:.92rem; transition:all .25s; cursor:pointer; }
  .btn-outline:hover { border-color:var(--pul); color:var(--pul); }

  /* ── ADMIN ───────────────────────────────────────── */
  .admin-tab { flex:1; padding:.42rem; border-radius:5px; border:none; font-size:.72rem; transition:all .2s; text-transform:capitalize; cursor:pointer; }
  .admin-field input, .admin-field textarea, .admin-field select {
    width:100%; background:var(--bg); border:1px solid var(--bd); border-radius:7px;
    padding:.6rem .85rem; color:var(--tx); font-size:.85rem; outline:none;
  }
  .admin-field textarea { resize:vertical; }
  .admin-field input:focus, .admin-field textarea:focus, .admin-field select:focus { border-color:var(--pu); }
  .admin-save-btn { width:100%; background:var(--pu); color:#fff; border:none; padding:.65rem; border-radius:7px; font-weight:600; font-size:.88rem; margin-top:6px; cursor:pointer; transition:background .2s; }
  .admin-save-btn:hover { background:#6d28d9; }
  .admin-del-btn { background:none; border:1px solid rgba(239,68,68,.3); color:#f87171; padding:.22rem .6rem; border-radius:5px; font-size:.7rem; cursor:pointer; }

  /* ── AVAILABILITY BUTTONS ────────────────────────── */
  .avail-btn { display:flex; align-items:center; gap:12px; padding:.9rem 1.1rem; border-radius:9px; cursor:pointer; text-align:left; transition:all .25s; width:100%; }

  /* ── FORM INPUTS ─────────────────────────────────── */
  .contact-input {
    width:100%; background:var(--bg2); border:1px solid var(--bd); border-radius:7px;
    padding:.65rem .85rem; color:var(--tx); font-size:.86rem; outline:none; transition:border-color .2s;
  }
  .contact-input:focus { border-color:var(--pu); }

  /* ── SECTION TAG ─────────────────────────────────── */
  .s-tag { font-family:var(--mono); font-size:.68rem; color:var(--te); letter-spacing:.2em; text-transform:uppercase; display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:8px; }
  .s-tag::before, .s-tag::after { content:''; width:28px; height:1px; background:rgba(0,212,180,.35); display:block; }

  /* ── RESPONSIVE NAVBAR ──────────────────────────── */
  .nav-links-desktop { display:flex; gap:1.5rem; }
  .nav-hire-desktop  { display:block; }
  .nav-hamburger     { display:none; flex-direction:column; justify-content:center; gap:5px; background:none; border:none; padding:6px; cursor:pointer; }
  .nav-hamburger span { display:block; width:22px; height:2px; background:var(--tx); border-radius:2px; transition:transform .3s, opacity .3s; }
  .nav-drawer { display:none; }

  /* ── RESPONSIVE GRIDS ───────────────────────────── */
  .about-grid      { display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; max-width:1000px; margin:0 auto; }
  .contact-2col    { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
  .admin-form-row  { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

  /* ── BREAKPOINT: TABLET ≤ 900px ─────────────────── */
  @media (max-width: 900px) {
    .about-grid { grid-template-columns:1fr !important; gap:2.5rem !important; }
    .about-avatar { display:flex; justify-content:center; }
  }

  /* ── BREAKPOINT: MOBILE ≤ 768px ─────────────────── */
  @media (max-width: 768px) {
    /* Navbar */
    .nav-links-desktop { display:none; }
    .nav-hire-desktop  { display:none; }
    .nav-hamburger     { display:flex; }
    .nav-drawer {
      display:flex; flex-direction:column; gap:1rem;
      position:fixed; top:53px; left:0; right:0;
      background:rgba(15,15,20,.97); backdrop-filter:blur(16px);
      border-bottom:1px solid var(--bd);
      padding:1.5rem 2rem 2rem; z-index:98;
    }
    .nav-drawer a { font-size:.88rem; color:var(--tx2); letter-spacing:.1em; text-transform:uppercase; padding:.25rem 0; }

    /* Section horizontal padding */
    section[id] { padding-left:1.25rem !important; padding-right:1.25rem !important; }

    /* Grids */
    .contact-2col  { grid-template-columns:1fr !important; }
    .admin-form-row { grid-template-columns:1fr !important; }

    /* Admin panel tabs */
    .admin-tab { font-size:.6rem !important; padding:.35rem .28rem !important; }

    /* Skill slider label */
    .skill-label-hide { display:none; }
  }

  /* ── BREAKPOINT: SMALL MOBILE ≤ 480px ───────────── */
  @media (max-width: 480px) {
    section[id] { padding-top:3rem !important; padding-bottom:3rem !important; }
    .admin-form-row { grid-template-columns:1fr !important; }
    .btn-primary, .btn-outline { padding:.72rem 1.5rem !important; font-size:.86rem !important; }
  }
`

// ─── SECTION WRAPPER ───────────────────────────────────────────────────────
export const sectionStyle = (bg = 'var(--bg)') => ({
  padding: '5rem 2rem',
  background: bg,
})

// ─── SECTION HEADER ───────────────────────────────────────────────────────
export const sectionHeaderStyle = {
  textAlign: 'center',
  marginBottom: '3rem',
}

// ─── SECTION TITLE ────────────────────────────────────────────────────────
export const sectionTitleStyle = {
  fontSize: 'clamp(1.7rem, 3vw, 2.5rem)',
  fontWeight: 800,
  letterSpacing: '-.03em',
}
