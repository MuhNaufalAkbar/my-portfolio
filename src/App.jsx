import React, { useEffect, useState } from 'react'
import './App.css'

// ===== DATA =====
const PROJECTS = [
  {
    title: 'RentaKita - Platform Rental Mobil Online',
    roles: ['Front End Developer'],
    desc: 'Deskripsi singkat menyusul.',
    detail: 'Deskripsi detail mengenai proyek RentaKita akan diperbarui segera.',
    tech: ['Laravel', 'PHP', 'HTML', 'CSS'],
    img: '/images/rentakita.png',
    repo: '',
    demo: '',
  },
  {
    title: 'PKU Muhammadyah Bantul - Aplikasi berbasis web untuk pengingat minum obat pada pengidap penyakit Tuberkulosis',
    roles: ['Fullstack Developer'],
    desc: 'Aplikasi web pengingat minum obat untuk pasien Tuberkulosis dengan fitur notifikasi dan monitoring.',
    detail: 'Aplikasi ini dikembangkan untuk membantu pasien Tuberkulosis di PKU Muhammadiyah Bantul dalam mengelola jadwal minum obat. Fitur utama meliputi notifikasi pengingat otomatis, dashboard monitoring kepatuhan pasien, manajemen data pasien oleh tenaga medis, serta laporan progress pengobatan. Dibangun menggunakan Laravel sebagai backend framework dengan database MySQL dan tampilan antarmuka yang responsif.',
    tech: ['Laravel', 'PHP', 'MySQL'],
    img: '/images/tuberkulosis.png',
    repo: 'https://github.com/MuhNaufalAkbar/pku-bantul',
    demo: 'https://tbc-care.vercel.app/',
  },
  {
    title: 'PersonaWay - Understand Yourself, Empower Your Future',
    roles: ['Backend Developer'],
    desc: 'Aplikasi berbasis AI untuk memahami kepribadian dan potensi diri pengguna.',
    detail: 'PersonaWay adalah aplikasi berbasis kecerdasan buatan yang membantu pengguna memahami kepribadian dan potensi diri mereka. Saya bertanggung jawab dalam membangun backend menggunakan Flask Python, mengintegrasikan layanan Google Cloud Platform untuk deployment dan skalabilitas, serta mengelola database menggunakan Cloud SQL dan Firebase Firestore untuk data realtime.',
    tech: ['Flask', 'Python', 'Google Cloud Platform', 'Google Cloud Run', 'Firebase', 'Google Cloud Firestore', 'Cloud SQL'],
    img: '/images/personaway.png',
    repo: '',
    demo: '',
  },
  {
    title: 'Segmentasi UMKM Yogyakarta Menggunakan K-Means & Analisis Median dan Mean untuk Perencanaan Strategi Pemasaran Digital',
    roles: ['Data Analyst'],
    desc: 'Segmentasi UMKM menggunakan algoritma K-Means clustering dengan analisis statistik mendalam.',
    detail: 'Proyek analisis data ini bertujuan mengelompokkan UMKM di Yogyakarta menggunakan algoritma K-Means Clustering. Analisis mencakup preprocessing data, penentuan jumlah cluster optimal menggunakan Elbow Method, serta interpretasi hasil clustering berdasarkan analisis median dan mean untuk merumuskan strategi pemasaran digital yang tepat bagi masing-masing segmen UMKM. Visualisasi interaktif dibangun menggunakan Streamlit.',
    tech: ['Google Collab', 'Streamlit', 'Python', 'CSS'],
    img: '/images/segmentasi.png',
    repo: '',
    demo: '',
  },
  {
    title: 'Work as A Student Employee',
    roles: ['Graphic Design', 'Journal Manager', 'Study Program Administration'],
    desc: 'Desain grafis untuk keperluan promosi dan media sosial organisasi kampus.',
    detail: 'Sebagai Student Employee, saya bertugas membuat berbagai materi desain grafis untuk keperluan promosi, konten media sosial, poster acara, dan branding organisasi kampus. Semua desain dibuat menggunakan Canva dengan memperhatikan identitas visual yang konsisten, menarik, dan sesuai target audiens.',
    tech: ['Canva', 'Wordpress', 'Microsoft Office'],
    img: '/images/design.png',
    repo: '',
    demo: '',
  },
  {
    title: 'UI / UX : Aplikasi berbasis web untuk pengingat minum obat pada pengidap penyakit Tuberkulosis',
    roles: ['UI UX DESIGNER'],
    desc: 'Desain antarmuka aplikasi pengingat minum obat yang intuitif dan mudah digunakan.',
    detail: 'Perancangan UI/UX untuk aplikasi pengingat minum obat pasien Tuberkulosis. Proses desain dimulai dari riset pengguna, pembuatan user persona, user flow, wireframe, hingga high-fidelity prototype menggunakan Figma. Desain mengutamakan kemudahan penggunaan bagi pasien yang mungkin kurang familiar dengan teknologi, dengan tampilan bersih dan navigasi yang intuitif.',
    tech: ['Figma'],
    img: '/images/uiux.png',
    repo: '',
    demo: '',
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

const CONTACTS = [
  { label: 'WhatsApp',  value: '+62 8953-3994-6290',       href: 'https://wa.me/62895339946290',                        img: '/images/whatsapp.png' },
  { label: 'LinkedIn',  value: 'Muhammad Naufal Akbar',    href: 'https://linkedin.com/in/muhammad-naufal-ab4859333',   img: '/images/linkedin.png' },
  { label: 'Instagram', value: '@akbrnfl',                 href: 'https://instagram.com/akbrnfl',                       img: '/images/instagram.png' },
  { label: 'Email',     value: 'naufal.indo345@gmail.com', href: 'mailto:naufal.indo345@gmail.com',                     img: '/images/gmail.png' },
]

// ===== HOOKS =====
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

function useModalBehavior(isOpen, onClose) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
}

// ===== ICONS =====
const ArrowUR = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M8 7h9v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
)
const Close = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
)

// ===== MODAL SHELL =====
function Modal({ onClose, img, alt, children }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup"><Close /></button>
        <div className="modal-img-wrap"><img src={img} alt={alt} className="modal-img" /></div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

// ===== CERTIFICATES =====
function CertificatesGrid() {
  const [selected, setSelected] = useState(null)
  useModalBehavior(!!selected, () => setSelected(null))

  return (
    <>
      <div className="grid grid--3">
        {CERTIFICATES.map((c, i) => (
          <button key={i} className="cert" onClick={() => setSelected(c)}>
            <div className="cert-img-wrap">
              <img src={c.img} alt={c.title} className="cert-img" />
              <span className="cert-plus"><ArrowUR /></span>
            </div>
            <div className="cert-info">
              <span className="cert-meta">{c.issuer} · {c.year}</span>
              <p className="cert-title">{c.title}</p>
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <Modal onClose={() => setSelected(null)} img={selected.img} alt={selected.title}>
          <span className="modal-eyebrow">{selected.issuer} · {selected.year}</span>
          <h3 className="modal-title">{selected.title}</h3>
          <p className="modal-desc">{selected.detail}</p>
        </Modal>
      )}
    </>
  )
}

// ===== PROJECT TABS =====
function ProjectTabs() {
  const [active, setActive] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(null)
  useModalBehavior(!!selectedProject, () => setSelectedProject(null))

  const tabs = [
    { id: 'projects', label: 'Projects', count: PROJECTS.length },
    { id: 'certificates', label: 'Certificates', count: CERTIFICATES.length },
    { id: 'techstack', label: 'Tech Stack', count: TECHS.length },
  ]

  return (
    <>
      <div className="tabs" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={`tab ${active === tab.id ? 'is-active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}<sup>{tab.count}</sup>
          </button>
        ))}
      </div>

      {active === 'projects' && (
        <div className="grid grid--3">
          {PROJECTS.map((p, i) => (
            <article key={i} className="project">
              <button className="project-thumb" onClick={() => setSelectedProject(p)} aria-label={`Detail ${p.title}`}>
                <img src={p.img} alt={p.title} />
                <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="project-open"><ArrowUR size={18} /></span>
              </button>
              <div className="project-body">
                <div className="chips">
                  {p.roles.map(r => <span key={r} className="chip chip--role">{r}</span>)}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="chips">
                  {p.tech.slice(0, 4).map(t => <span key={t} className="chip">{t}</span>)}
                  {p.tech.length > 4 && <span className="chip chip--more">+{p.tech.length - 4}</span>}
                </div>
                <div className="project-actions">
                  <button className="btn btn--ink btn--sm" onClick={() => setSelectedProject(p)}>
                    Details <ArrowUR size={14} />
                  </button>
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn--lime btn--sm">
                      Live Demo <ArrowUR size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {active === 'certificates' && <CertificatesGrid />}

      {active === 'techstack' && (
        <div className="tech-grid">
          {TECHS.map((t, i) => (
            <div key={i} className="tech-card">
              <img src={t.img} alt={t.name} className="tech-img" />
              <span className="tech-name">{t.name}</span>
            </div>
          ))}
        </div>
      )}

      {selectedProject && (
        <Modal onClose={() => setSelectedProject(null)} img={selectedProject.img} alt={selectedProject.title}>
          <div className="chips" style={{ marginBottom: 14 }}>
            {selectedProject.roles.map(r => <span key={r} className="chip chip--role">{r}</span>)}
          </div>
          <h3 className="modal-title">{selectedProject.title}</h3>
          <p className="modal-desc">{selectedProject.detail}</p>
          <div className="chips" style={{ marginTop: 18 }}>
            {selectedProject.tech.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          {(selectedProject.demo || selectedProject.repo) && (
            <div className="modal-actions">
              {selectedProject.demo && (
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="btn btn--lime">
                  Live Demo <ArrowUR size={14} />
                </a>
              )}
              {selectedProject.repo && (
                <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer" className="btn btn--ink">
                  Repository <ArrowUR size={14} />
                </a>
              )}
            </div>
          )}
        </Modal>
      )}
    </>
  )
}

// ===== MAIN APP =====
function App() {
  const typed = useTypewriter(['Data Analyst Enthusiast', 'Junior Fullstack Developer Enthusiast'])
  const [scrolled, setScrolled] = useState(false)

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const marquee = [...TECHS, ...TECHS]

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#home" className="nav-logo" onClick={goTo('home')}>NA<span>.</span></a>
        <nav className="nav-links">
          <a href="#about" onClick={goTo('about')}>About</a>
          <a href="#projects" onClick={goTo('projects')}>Work</a>
          <a href="#contact" onClick={goTo('contact')}>Contact</a>
        </nav>
      </header>

      {/* HERO — BENTO */}
      <main className="hero" id="home">
        <div className="bento">
          <section className="card card--hero reveal">
            <span className="status"><i /> Available for work</span>
            <p className="hero-hi">Hi, I'm</p>
            <h1 className="hero-name">
              Muhammad <em>Naufal</em> Akbar
            </h1>
            <div className="hero-type">
              <span className="hero-typed">{typed}</span>
              <span className="hero-caret" />
            </div>
            <p className="hero-desc">
              Passionate about building elegant digital experiences and turning ideas into real-world solutions.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn btn--ink" onClick={goTo('projects')}>View Projects <ArrowUR size={15} /></a>
              <a href="#contact" className="btn btn--ghost" onClick={goTo('contact')}>Contact Me</a>
            </div>
          </section>

          <section className="card card--photo reveal" style={{ '--d': '.1s' }}>
            <img src="/images/diri.png" alt="Muhammad Naufal Akbar" />
            <span className="photo-tag">Yogyakarta, ID</span>
          </section>

          <section className="card card--lime reveal" style={{ '--d': '.18s' }}>
            <span className="card-label">Focus</span>
            <p className="card-big">Data &amp;<br />Web Dev</p>
          </section>

          <section className="card card--stats reveal" style={{ '--d': '.26s' }}>
            <div className="stat"><b>3.3</b><span>Years Learning</span></div>
            <div className="stat"><b>6</b><span>Projects Done</span></div>
          </section>
        </div>
      </main>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marquee.map((t, i) => (
            <span key={i} className="marquee-item"><i />{t.name}</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">01 — About</span>
            <h2 className="section-title">Data-minded builder with an eye for <em>clean design.</em></h2>
          </div>
          <div className="about-grid">
            <div className="card card--about reveal">
              <p className="lead">
                Fresh Graduate in Informatics from <strong>Universitas Ahmad Dahlan</strong> — responsible, disciplined, and resilient.
                Experienced in data analysis, data processing, and visualization &amp; design, with a strong drive to grow as a <strong>Data Analyst</strong>.
              </p>
              <div className="chips chips--lg">
                {['React', 'Node.js', 'Laravel', 'MySQL', 'TailwindCSS', 'Figma'].map(s => <span key={s} className="chip chip--solid">{s}</span>)}
              </div>
            </div>
            <div className="card card--about-photo reveal" style={{ '--d': '.1s' }}>
              <img src="/images/acul.jpeg" alt="Muhammad Naufal Akbar" />
            </div>
            <div className="card card--edu reveal" style={{ '--d': '.15s' }}>
              <span className="card-label">Education</span>
              <p className="card-big card-big--sm">Informatics</p>
              <span className="card-sub">Universitas Ahmad Dahlan</span>
            </div>
            <a href="#projects" className="card card--link card--ink reveal" style={{ '--d': '.2s' }} onClick={goTo('projects')}>
              <span className="card-label">Explore</span>
              <p className="card-big card-big--sm">My Projects</p>
              <span className="card-arrow"><ArrowUR size={22} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">02 — Work</span>
            <h2 className="section-title">Portfolio <em>showcase.</em></h2>
            <p className="section-sub">Explore my journey through projects, certifications, and technical expertise.</p>
          </div>
          <div className="reveal">
            <ProjectTabs />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section section--contact">
        <div className="container">
          <div className="contact-box reveal">
            <span className="eyebrow eyebrow--light">03 — Contact</span>
            <h2 className="contact-title">Let's build something <em>together.</em></h2>
            <p className="contact-sub">Tertarik bekerja sama atau punya pertanyaan? Jangan ragu untuk menghubungi saya!</p>
            <div className="contact-list">
              {CONTACTS.map(c => (
                <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-row">
                  <img src={c.img} alt={c.label} />
                  <div>
                    <span className="contact-label">{c.label}</span>
                    <span className="contact-value">{c.value}</span>
                  </div>
                  <span className="contact-go"><ArrowUR size={20} /></span>
                </a>
              ))}
            </div>
          </div>
          <p className="footer">© 2026 Muhammad Naufal Akbar</p>
        </div>
      </section>
    </div>
  )
}

export default App