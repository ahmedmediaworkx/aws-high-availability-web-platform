import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  ArrowUpRight,
  Braces,
  Check,
  Cloud,
  Container,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react'
import './App.css'

function App() {
  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!orbitRef.current) return
    gsap.to(orbitRef.current, { rotate: 360, duration: 28, ease: 'none', repeat: -1 })
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  } as const

  return (
    <main className="portfolio-shell">
      <nav className="topbar layout-width">
        <a className="identity" href="#home" aria-label="Ahmed Wael home">
          <span className="identity-icon"><Terminal size={15} /></span>
          <span>ahmed<span className="accent">@</span>cloud</span>
        </a>
        <div className="topbar-links">
          <a href="#work">Selected work</a>
          <a href="#experience">Experience</a>
          <a className="availability" href="mailto:ahmedmediaworkx.freelance@gmail.com"><span /> Open to opportunities</a>
        </div>
      </nav>

      <section className="intro layout-width" id="home">
        <motion.div className="intro-copy" initial="hidden" animate="visible" variants={fadeUp}>
          <p className="eyebrow"><span className="eyebrow-line" /> DEVOPS ENGINEER / CAIRO, EGYPT</p>
          <h1>DevOps Engineer<br />in <span>Cairo.</span></h1>
          <p className="intro-summary">As a DevOps Engineer in Cairo, I design, automate, and troubleshoot AWS cloud infrastructure that turns complexity into reliable, repeatable operations.</p>
          <div className="intro-actions">
            <a className="primary-action" href="mailto:ahmedmediaworkx.freelance@gmail.com">Let&apos;s work together <ArrowUpRight size={16} /></a>
            <a className="quiet-action" href="#work">See what I build <ArrowUpRight size={15} /></a>
          </div>
        </motion.div>
        <motion.div className="availability-orbit" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .15 }}>
          <div ref={orbitRef} className="orbit-ring"><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /></div>
          <div className="orbit-core"><Cloud size={30} /><strong>READY</strong><small>to deploy</small></div>
          <span className="orbit-label label-top">AWS / DEVOPS</span><span className="orbit-label label-bottom">BUILD · BREAK · FIX</span>
        </motion.div>
      </section>

      <section className="bento layout-width" id="work">
        <motion.article className="bento-card profile-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="card-heading"><span className="card-index">01</span><span className="card-label">THE OPERATOR</span></div>
          <h2>Real engineering happens when systems have to work.</h2>
          <p>I learn by building, breaking, troubleshooting, and automating. My IT infrastructure background taught me how to diagnose problems; cloud engineering lets me make those fixes scalable.</p>
            <div className="profile-signature"><img className="profile-photo" src="/profile.png" alt="Ahmed Wael" /><span>Ahmed Wael<br /><small>Cloud Engineer</small></span></div>
        </motion.article>

        <motion.article className="bento-card stack-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="card-heading"><span className="card-index">02</span><span className="card-label">THE TOOLKIT</span></div>
          <div className="tool-grid"><span><Cloud size={16} />AWS</span><span><Braces size={16} />Terraform</span><span><Container size={16} />Docker</span><span><Network size={16} />Kubernetes</span><span><Terminal size={16} />Linux</span><span><GitBranch size={16} />CI / CD</span></div>
          <div className="tool-note"><Check size={15} /> Production-minded by default</div>
        </motion.article>

        <motion.article className="bento-card project-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="card-heading"><span className="card-index">03</span><span className="card-label">FEATURED PROJECT</span><a href="#contact" className="card-link">Explore <ArrowUpRight size={15} /></a></div>
          <div className="project-layout"><div><div className="project-status"><span /> LIVE SYSTEM DESIGN</div><h2>AWS High-Availability<br /><em>Web Platform</em> for DevOps</h2><p>A production-minded architecture with Multi-AZ compute, load balancing, health checks, and a clear path through failure.</p><div className="project-tags"><span>EC2</span><span>ALB</span><span>Route 53</span><span>Auto Scaling</span></div></div><div className="architecture-mark"><div className="arch-node arch-entry"><Cloud size={17} /></div><div className="arch-node arch-core"><ShieldCheck size={19} /></div><div className="arch-node arch-leaf leaf-left"><Server size={15} /></div><div className="arch-node arch-leaf leaf-right"><Server size={15} /></div><i className="arch-line line-a" /><i className="arch-line line-b" /><i className="arch-line line-c" /></div></div>
        </motion.article>

        <motion.article className="bento-card values-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="card-heading"><span className="card-index">04</span><span className="card-label">HOW I WORK</span></div>
          <ul className="values-list"><li><Wrench size={16} /><span><strong>Automate the repeatable.</strong><small>Bash, Terraform, and pipelines over manual drift.</small></span></li><li><ShieldCheck size={16} /><span><strong>Secure the foundation.</strong><small>Least privilege, segmentation, observable systems.</small></span></li><li><Network size={16} /><span><strong>Keep the path moving.</strong><small>Design for scale, recovery, and the next deploy.</small></span></li></ul>
        </motion.article>

        <motion.article className="bento-card experience-card" id="experience" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="card-heading"><span className="card-index">05</span><span className="card-label">EXPERIENCE</span><a className="card-link" href="https://www.linkedin.com/in/ahmedmediaworkx" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={13} /></a></div>
          <div className="role"><span className="role-year">2025 — NOW</span><div><h3>Cloud Engineer</h3><p>ahmedwaelcloud · Cairo</p><span className="role-detail">AWS infrastructure · Terraform · Linux · Docker · CI/CD</span></div></div>
          <div className="role"><span className="role-year">2023 — NOW</span><div><h3>IT Support Specialist</h3><p>Frey-M · Egypt</p><span className="role-detail">Infrastructure operations · Troubleshooting · Reliability</span></div></div>
          <div className="role"><span className="role-year">2024 — 2026</span><div><h3>Founder & Lead Video Editor</h3><p>Ahmedmediaworkx · Kafr El Sheikh</p><span className="role-detail">Storytelling · Retention science · Creative systems</span></div></div>
        </motion.article>

        <motion.article className="bento-card contact-card" id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="contact-icon"><Mail size={22} /></div><span className="card-label">HAVE A SYSTEM TO BUILD?</span><h2>Need a DevOps<br /><span>Engineer in Cairo?</span></h2><a className="contact-email" href="mailto:ahmedmediaworkx.freelance@gmail.com">ahmedmediaworkx.freelance@gmail.com <ArrowUpRight size={15} /></a><p><MapPin size={13} /> Cairo, Egypt · Available remotely</p>
        </motion.article>
      </section>

      <footer className="footer layout-width"><span>© 2026 AHMED WAEL / ABOMORAD</span><span>BUILDING THE NEXT RELIABLE THING</span><a href="#home">Back to top ↑</a></footer>
    </main>
  )
}

export default App
