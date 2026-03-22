import React, { useEffect, useRef, useState } from 'react'
import './App.css'

// ===== DATA =====
const PROJECTS = [
  {
    title: 'PKU Muhammadyah Bantul - Aplikasi berbasis web untuk pengingat minum obat pada pengidap penyakit Tuberkulosis',
    roles: ['Fullstack Developer'],
    desc: 'Aplikasi web pengingat minum obat untuk pasien Tuberkulosis dengan fitur notifikasi dan monitoring.',
    detail: 'Aplikasi ini dikembangkan untuk membantu pasien Tuberkulosis di PKU Muhammadiyah Bantul dalam mengelola jadwal minum obat. Fitur utama meliputi notifikasi pengingat otomatis, dashboard monitoring kepatuhan pasien, manajemen data pasien oleh tenaga medis, serta laporan progress pengobatan. Dibangun menggunakan Laravel sebagai backend framework dengan database MySQL dan tampilan antarmuka yang responsif.',
    tech: ['Laravel', 'PHP', 'MySQL'],
    img: '/images/tuberkulosis.png',
    repo: 'https://github.com/MuhNaufalAkbar/pku-bantul',       // ← isi link GitHub di sini
    demo: 'https://pku-bantul.up.railway.app/',       // ← isi link Live Demo di sini
  },
  {
    title: 'PersonaWay - Understand Yourself, Empower Your Future',
    roles: ['Backend Developer'],
    desc: 'Aplikasi berbasis AI untuk memahami kepribadian dan potensi diri pengguna.',
    detail: 'PersonaWay adalah aplikasi berbasis kecerdasan buatan yang membantu pengguna memahami kepribadian dan potensi diri mereka. Saya bertanggung jawab dalam membangun backend menggunakan Flask Python, mengintegrasikan layanan Google Cloud Platform untuk deployment dan skalabilitas, serta mengelola database menggunakan Cloud SQL dan Firebase Firestore untuk data realtime.',
    tech: ['Flask', 'Python', 'Google Cloud Platform', 'Google Cloud Run', 'Firebase', 'Google Cloud Firestore', 'Cloud SQL'],
    img: '/images/personaway.png',
    repo: '',       // ← isi link GitHub di sini
    demo: '',       // ← isi link Live Demo di sini
  },
  {
    title: 'Segmentasi UMKM Yogyakarta Menggunakan K-Means & Analisis Median dan Mean untuk Perencanaan Strategi Pemasaran Digital',
    roles: ['Data Analyst'],
    desc: 'Segmentasi UMKM menggunakan algoritma K-Means clustering dengan analisis statistik mendalam.',
    detail: 'Proyek analisis data ini bertujuan mengelompokkan UMKM di Yogyakarta menggunakan algoritma K-Means Clustering. Analisis mencakup preprocessing data, penentuan jumlah cluster optimal menggunakan Elbow Method, serta interpretasi hasil clustering berdasarkan analisis median dan mean untuk merumuskan strategi pemasaran digital yang tepat bagi masing-masing segmen UMKM. Visualisasi interaktif dibangun menggunakan Streamlit.',
    tech: ['Google Collab', 'Streamlit', 'Python', 'CSS'],
    img: '/images/segmentasi.png',
    repo: '',       // ← isi link GitHub di sini
    demo: '',       // ← isi link Live Demo di sini
  },
  {
    title: 'Work as A Student Employee',
    roles: ['Graphic Design', 'Journal Manager', 'Study Program Administration'],
    desc: 'Desain grafis untuk keperluan promosi dan media sosial organisasi kampus.',
    detail: 'Sebagai Student Employee, saya bertugas membuat berbagai materi desain grafis untuk keperluan promosi, konten media sosial, poster acara, dan branding organisasi kampus. Semua desain dibuat menggunakan Canva dengan memperhatikan identitas visual yang konsisten, menarik, dan sesuai target audiens.',
    tech: ['Canva', 'Wordpress', 'Microsoft Office'],
    img: '/images/design.png',
    repo: '',       // ← isi link GitHub di sini
    demo: '',       // ← isi link Live Demo di sini
  },
  {
    title: 'UI / UX : Aplikasi berbasis web untuk pengingat minum obat pada pengidap penyakit Tuberkulosis',
    roles: ['UI UX DESIGNER'],
    desc: 'Desain antarmuka aplikasi pengingat minum obat yang intuitif dan mudah digunakan.',
    detail: 'Perancangan UI/UX untuk aplikasi pengingat minum obat pasien Tuberkulosis. Proses desain dimulai dari riset pengguna, pembuatan user persona, user flow, wireframe, hingga high-fidelity prototype menggunakan Figma. Desain mengutamakan kemudahan penggunaan bagi pasien yang mungkin kurang familiar dengan teknologi, dengan tampilan bersih dan navigasi yang intuitif.',
    tech: ['Figma'],
    img: '/images/uiux.png',
    repo: '',       // ← isi link GitHub di sini
    demo: '',       // ← isi link Live Demo di sini
  },
]

const CERTIFICATES = [
  { title: 'BANGKIT CERTIFICATE', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/certificate.png', detail: 'Dalam program Bangkit Academy jalur Cloud Computing, telah diselesaikan rangkaian pelatihan intensif yang mencakup penguasaan infrastruktur Google Cloud, pengembangan back-end menggunakan Node.js dan RESTful API, serta implementasi machine learning pada lingkungan cloud.' },
  { title: 'BANGKIT FINAL TRANSCRIPT', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/transkrip.png', detail: 'Dalam program Bangkit Academy jalur Cloud Computing, telah diselesaikan rangkaian pelatihan intensif yang mencakup penguasaan infrastruktur Google Cloud, pengembangan back-end menggunakan Node.js dan RESTful API, serta implementasi machine learning pada lingkungan cloud.' },
  { title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/dasarpemrograman.png', detail: 'Dalam pelatihan ini, dipelajari dasar-dasar pengembangan perangkat lunak yang mencakup analisis kebutuhan aplikasi dari sisi pengguna dan spesifikasi teknis.' },
  { title: 'Belajar Dasar AI', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/AI.png', detail: 'Dalam pelatihan ini, dipelajari konsep fundamental kecerdasan buatan yang mencakup pemahaman dasar mengenai ekosistem AI dan peran krusial data dalam pengembangannya.' },
  { title: 'Belajar Penerapan Machine Learning dengan Google Cloud', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/penerapanml.png', detail: 'Dalam pelatihan ini, dipelajari penerapan Machine Learning menggunakan infrastruktur Google Cloud selama total 40 jam.' },
  { title: 'Menjadi Google Cloud Engineer', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/cloud.png', detail: 'Dalam pelatihan ini, dipelajari kompetensi sebagai Google Cloud Engineer selama total 42 jam.' },
  { title: 'Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/backend.png', detail: 'Dalam pelatihan ini, dipelajari dasar-dasar pengembangan Back-End dengan standar kompetensi Google.' },
  { title: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/web.png', detail: 'Dalam pelatihan ini, dipelajari fondasi utama pembuatan website selama total 41 jam.' },
  { title: 'Pengenalan ke Logika Pemrograman (Programming Logic 101)', issuer: 'Dicoding Indonesia', year: '2024', img: '/images/logika.png', detail: 'Dalam pelatihan ini, dipelajari konsep dasar logika pemrograman selama total 6 jam.' },
]

const TECHS = [
  { name: 'HTML',          img: '/images/html.png' },
  { name: 'CSS',           img: '/images/css.png' },
  { name: 'JavaScript',    img: '/images/javascript.png' },
  { name: 'React',         img: '/images/react.png' },
  { name: 'Python',        img: '/images/python.png' },
  { name: 'Node.js',       img: '/images/node.png' },
  { name: 'Laravel',       img: '/images/laravel.png' },
  { name: 'TailwindCSS',   img: '/images/tailwind.png' },
  { name: 'MySQL',         img: '/images/mysql.png' },
  { name: 'Figma',         img: '/images/figma.png' },
  { name: 'PHP',           img: '/images/php.png' },
  { name: 'C++',           img: '/images/c++.png' },
  { name: 'C',             img: '/images/C.png' },
  { name: 'Firebase',      img: '/images/firebase.png' },
  { name: 'Google Collab', img: '/images/collab.png' },
]

// ===== TYPEWRITER HOOK =====
function useTypewriter(words, typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deletingSpeed)
    } else {
      setIsDeleting(false)
      setWordIndex(i => i + 1)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs])
  return displayed
}

// ===== CERTIFICATES GRID + MODAL =====
function CertificatesGrid() {
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <>
      <div className="cert-card-grid">
        {CERTIFICATES.map((c, i) => (
          <div key={i} className="cert-card-new">
            <div className="cert-card-img-wrap">
              <img src={c.img} alt={c.title} className="cert-card-img" />
              <div className="cert-card-overlay">
                <button className="cert-detail-btn" onClick={() => setSelected(c)}>Lihat Detail</button>
              </div>
            </div>
            <div className="cert-card-info">
              <p className="cert-card-title">{c.title}</p>
              <span className="cert-card-meta">{c.issuer} · {c.year}</span>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="cert-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="cert-modal" onClick={e => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelected(null)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <div className="cert-modal-img-wrap"><img src={selected.img} alt={selected.title} className="cert-modal-img" /></div>
            <div className="cert-modal-body">
              <span className="cert-modal-issuer">{selected.issuer} · {selected.year}</span>
              <h3 className="cert-modal-title">{selected.title}</h3>
              <p className="cert-modal-desc">{selected.detail}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ===== PROJECT TABS =====
function ProjectTabs() {
  const [active, setActive] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(null)

  // Lock scroll saat modal project terbuka
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedProject])

  // Tutup dengan Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedProject(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const tabs = [
    { id: 'projects', label: 'Projects', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/></svg> },
    { id: 'certificates', label: 'Certificates', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.7"/><path d="M8 14l-2 7 6-3 6 3-2-7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg> },
    { id: 'techstack', label: 'Tech Stack', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg> },
  ]

  return (
    <>
      <div className="ptabs">
        <div className="ptab-nav">
          {tabs.map(tab => (
            <button key={tab.id} className={`ptab-btn ${active === tab.id ? 'active' : ''}`} onClick={() => setActive(tab.id)}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {active === 'projects' && (
          <div className="pcard-grid">
            {PROJECTS.map((p, i) => (
              <div key={i} className="pcard">
                <div className="pcard-thumb">
                  <img src={p.img} alt={p.title} className="pcard-thumb-img" />
                  {/* Overlay hover sama seperti sertifikat */}
                  <div className="pcard-thumb-overlay">
                    <button className="cert-detail-btn" onClick={() => setSelectedProject(p)}>Lihat Detail</button>
                  </div>
                </div>
                <div className="pcard-body">
                  <h3 className="pcard-title">{p.title}</h3>
                  <span className={`pcard-role-wrap`}>
                    {p.roles.map(r => <span key={r} className={`pcard-role pcard-role--${r.toLowerCase().replace(/ /g, '-')}`}>{r}</span>)}
                  </span>
                  <p className="pcard-desc">{p.desc}</p>
                  <div className="pcard-techs">{p.tech.map(t => <span key={t} className="pcard-tech">{t}</span>)}</div>
                  <div className="pcard-actions">
                    <button className="pcard-btn pcard-btn--repo" onClick={() => setSelectedProject(p)}>
                      Details
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" className="pcard-btn pcard-btn--live">
                        Live Demo
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {active === 'certificates' && <CertificatesGrid />}

        {active === 'techstack' && (
          <div className="tech-grid">
            {TECHS.map((t, i) => (
              <div key={i} className="tech-card">
                <div className="tech-img-wrap"><img src={t.img} alt={t.name} className="tech-img" /></div>
                <span className="tech-name">{t.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== PROJECT MODAL — struktur identik dengan cert-modal ===== */}
      {selectedProject && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="cert-modal" onClick={e => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelectedProject(null)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {/* Gambar project */}
            <div className="cert-modal-img-wrap">
              <img src={selectedProject.img} alt={selectedProject.title} className="cert-modal-img" />
            </div>
            {/* Isi modal */}
            <div className="cert-modal-body">
              {/* Role badge sebagai pengganti "issuer · year" */}
              <div className="pcard-role-wrap" style={{marginBottom:'14px'}}>
                {selectedProject.roles.map(r => <span key={r} className={`pcard-role pcard-role--${r.toLowerCase().replace(/ /g, '-')}`}>{r}</span>)}
              </div>
              <h3 className="cert-modal-title">{selectedProject.title}</h3>
              <p className="cert-modal-desc">{selectedProject.detail}</p>
              {/* Tech stack */}
              <div className="pcard-techs" style={{ marginTop: '16px' }}>
                {selectedProject.tech.map(t => <span key={t} className="pcard-tech">{t}</span>)}
              </div>
              {/* Tombol Live Demo di modal — hanya muncul kalau link diisi */}
              {selectedProject.demo && (
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="cert-modal-live-btn">
                  Live Demo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ===== MAIN APP =====
function App() {
  const touchStartY = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const typed = useTypewriter(['Front End Developer Enthusiast', 'Junior Fullstack Developer Enthusiast'])

  useEffect(() => {
    const scrollByPage = (dir) => window.scrollBy({ top: dir * window.innerHeight, behavior: 'smooth' })
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') scrollByPage(1)
      if (e.key === 'ArrowUp'   || e.key === 'PageUp')   scrollByPage(-1)
    }
    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY }
    const onTouchEnd   = (e) => {
      if (touchStartY.current == null) return
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 40) scrollByPage(delta > 0 ? 1 : -1)
      touchStartY.current = null
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view')
        else e.target.classList.remove('in-view')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.page-section').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleNav = (id) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className={`nav ${menuOpen ? 'open' : ''}`}>
        <div className="nav-inner">
          <nav className="nav-links">
            <a href="#home"     className="nav-link" onClick={handleNav('home')}>Home</a>
            <a href="#about"    className="nav-link" onClick={handleNav('about')}>About</a>
            <a href="#projects" className="nav-link" onClick={handleNav('projects')}>Project</a>
            <a href="#contact"  className="nav-link" onClick={handleNav('contact')}>Contact</a>
          </nav>
          <button className="nav-toggle" onClick={() => setMenuOpen(v => !v)}>
            <span className="bar"/><span className="bar"/><span className="bar"/>
          </button>
        </div>
        <div className={`nav-overlay ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
      </header>

      {/* ===== HERO ===== */}
      <main className="hero" id="home">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
        <div className="hero-center">
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring" />
            <div className="hero-photo-glow" />
            <img src="/images/diri.png" alt="Muhammad Naufal Akbar" className="hero-photo" />
          </div>
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">Muhammad<br />Naufal Akbar</h1>
          <div className="hero-typerow">
            <span className="hero-typed">{typed}</span>
            <span className="hero-cursor">|</span>
          </div>
          <p className="hero-desc">
            Passionate about building elegant digital experiences and<br />
            turning ideas into real-world solutions.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="hero-btn hero-btn--primary" onClick={handleNav('projects')}>View Projects</a>
            <a href="#contact"  className="hero-btn hero-btn--outline"  onClick={handleNav('contact')}>Contact Me</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          <div className="hero-scroll-dot" />
        </div>
      </main>

      {/* ===== ABOUT ===== */}
      <section id="about" className="page-section about-section">
        <div className="about-inner container">
          <div className="about-text">
            <div className="about-chip"><span className="chip-dot" />Available for work</div>
            <h1 className="about-name">MUHAMMAD<br />NAUFAL AKBAR</h1>
            <div className="about-role-row">
              <span className="role-line" />
              <span className="about-role">Front End Developer • Junior Fullstack Developer</span>
            </div>
            <p className="lead">
              An undergraduate Informatics student at <strong>Universitas Ahmad Dahlan</strong> — responsible, disciplined, and resilient.
              Experienced in programming &amp; design, with a strong drive to grow as a <strong>Fullstack Developer</strong>.
            </p>
            <div className="skill-badges">
              {['React','Node.js','Laravel','MySQL','TailwindCSS','Figma'].map(s => <span key={s} className="badge">{s}</span>)}
            </div>
            <div className="about-stats">
              <div className="stat"><span className="stat-num">3.5</span><span className="stat-label">Years Learning</span></div>
              <div className="stat-divider"/>
              <div className="stat"><span className="stat-num">5</span><span className="stat-label">Projects Done</span></div>
              <div className="stat-divider"/>
              <div className="stat"><span className="stat-num">UAD</span><span className="stat-label">Informatics</span></div>
            </div>
            <div className="nav-cards">
              <a href="#projects" className="nav-card nav-card--project" onClick={handleNav('projects')}>
                <div className="nav-card__icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/></svg></div>
                <div className="nav-card__body"><span className="nav-card__label">My Projects</span><span className="nav-card__desc">Explore my work & portfolio</span></div>
                <div className="nav-card__arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              </a>
              <a href="#contact" className="nav-card nav-card--contact" onClick={handleNav('contact')}>
                <div className="nav-card__icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 5H3a1 1 0 00-1 1v12a1 1 0 001 1h18a1 1 0 001-1V6a1 1 0 00-1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <div className="nav-card__body"><span className="nav-card__label">Contact Me</span><span className="nav-card__desc">Let's build something together</span></div>
                <div className="nav-card__arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              </a>
            </div>
          </div>
          <div className="about-media">
            <div className="photo-frame">
              <div className="photo-glow" />
              <img src="/images/acul.jpeg" alt="Muhammad Naufal Akbar" className="profile-photo" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="page-section projects-section">
        <div className="container">
          <div className="projects-header">
            <h2 className="projects-title">Portfolio Showcase</h2>
            <p className="projects-sub">Explore my journey through projects, certifications, and technical expertise.</p>
          </div>
          <ProjectTabs />
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="page-section contact-section">
        <div className="container">
          <div className="contact-header">
            <h2 className="contact-title">Get In Touch</h2>
            <p className="contact-sub">Tertarik bekerja sama atau punya pertanyaan? Jangan ragu untuk menghubungi saya!</p>
          </div>
          <div className="contact-cards">
            <a href="https://wa.me/62895339946290" target="_blank" rel="noopener noreferrer" className="contact-card contact-card--wa">
              <div className="contact-card__img-wrap"><img src="/images/whatsapp.png" alt="WhatsApp" className="contact-card__img" /></div>
              <div className="contact-card__body"><span className="contact-card__platform">WhatsApp</span><span className="contact-card__handle">+62 8953-3994-6290</span></div>
              <div className="contact-card__arrow">→</div>
            </a>
            <a href="https://linkedin.com/in/muhammad-naufal-ab4859333" target="_blank" rel="noopener noreferrer" className="contact-card contact-card--li">
              <div className="contact-card__img-wrap"><img src="/images/linkedin.png" alt="LinkedIn" className="contact-card__img" /></div>
              <div className="contact-card__body"><span className="contact-card__platform">LinkedIn</span><span className="contact-card__handle">Muhammad Naufal Akbar</span></div>
              <div className="contact-card__arrow">→</div>
            </a>
            <a href="https://instagram.com/akbrnfl" target="_blank" rel="noopener noreferrer" className="contact-card contact-card--ig">
              <div className="contact-card__img-wrap"><img src="/images/instagram.png" alt="Instagram" className="contact-card__img" /></div>
              <div className="contact-card__body"><span className="contact-card__platform">Instagram</span><span className="contact-card__handle">@akbrnfl</span></div>
              <div className="contact-card__arrow">→</div>
            </a>
            <a href="mailto:naufal.indo345@gmail.com" className="contact-card contact-card--em">
              <div className="contact-card__img-wrap"><img src="/images/gmail.png" alt="Email" className="contact-card__img" /></div>
              <div className="contact-card__body"><span className="contact-card__platform">Email</span><span className="contact-card__handle">naufal.indo345@gmail.com</span></div>
              <div className="contact-card__arrow">→</div>
            </a>
          </div>
          <p className="contact-footer">© 2026 Muhammad Naufal Akbar</p>
        </div>
      </section>

    </div>
  )
}

export default App