import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { MaskText, Rule, Section, ease, inView, item, list } from './components/ui'
import { apps, education, experience, profile, projects, skills, strengths } from './data/profile'

const nav = ['about', 'skills', 'projects', 'apps', 'experience', 'contact']
const usedIn = (skill: string) => projects.filter((p) => p.skills.includes(skill))
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`
const SPEC_KEYS = ['problem', 'built', 'result'] as const

type Strength = (typeof strengths)[number]

function Filter({ label, value, back, backLabel, onClear }: { label: string; value: string; back: string; backLabel: string; onClear: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4 text-sm">
        <p className="text-muted">{label} <span className="font-medium text-fg">{value}</span></p>
        <div className="flex gap-5">
          <a href={back} className="link text-muted">{backLabel}</a>
          <button type="button" onClick={onClear} className="link cursor-pointer text-muted">Show all</button>
        </div>
      </div>
    </motion.div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease }}
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${scrolled || open ? 'border-b border-line bg-bg/90 backdrop-blur' : ''}`}>
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-serif text-xl">Divik Bhaskar</a>
        <ul className="hidden gap-6 text-sm text-muted md:flex">
          {nav.map((n) => (
            <li key={n}>
              <a href={`#${n}`} className="group relative capitalize transition-colors hover:text-fg">
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
          <li><a href="/resume.html" target="_blank" rel="noreferrer" className="text-fg transition-colors hover:text-accent">Résumé ↗</a></li>
        </ul>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ ease }} className="overflow-hidden px-5 md:hidden">
            {[...nav, 'résumé'].map((n, i) => (
              <motion.li key={n} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}
                className="border-t border-line first:border-0">
                <a onClick={() => setOpen(false)} href={n === 'résumé' ? '/resume.html' : `#${n}`} className="block py-3 capitalize">{n}</a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

const headline = ['Backend', 'and', 'cloud', 'security', 'engineer,', 'building', 'systems', 'that']
const accentWords = ["don't", 'trust', 'the', 'network.']

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const word = (w: string, i: number) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.35 + i * 0.06, ease }}>
        {w}
      </motion.span>
    </span>
  )
  return (
    <section ref={ref} id="top" className="mx-auto flex min-h-[92vh] max-w-5xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 md:pb-24">
      <motion.div style={{ y, opacity: fade }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="flex items-center gap-2 text-sm text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {profile.location} · open to internships and roles
        </motion.p>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl" aria-label="Backend and cloud security engineer, building systems that don't trust the network.">
          <span aria-hidden className="flex flex-wrap gap-x-[0.25em]">
            {headline.map(word)}
            <span className="relative inline-flex flex-wrap gap-x-[0.25em] italic text-accent">
              {accentWords.map((w, i) => word(w, headline.length + i))}
              <motion.span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-accent"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 1.4, ease }} />
            </span>
          </span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2, ease }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          I'm {profile.name}, an IT student at VIT. I work on zero-trust cloud architecture, backend and data optimization, and AI-agent systems.
        </motion.p>
        <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 1.4 } } }}
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
          {[
            ['GitHub ↗', profile.github, true],
            ['LinkedIn ↗', profile.linkedin, true],
            ['Live apps', '#apps', false],
            ['Email', `mailto:${profile.email}`, false],
          ].map(([label, href, ext]) => (
            <motion.a key={label as string} variants={item} href={href as string} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})} className="link">
              {label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// Slow ticker of skill names between the hero and the first section.
function Marquee() {
  const names = skills.flatMap((g) => g.items)
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-8 pr-8">
      {names.map((n) => (
        <span key={n} className="flex items-center gap-8 whitespace-nowrap">
          {n}<span className="text-accent">/</span>
        </span>
      ))}
    </div>
  )
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.8 }}
      className="group relative overflow-hidden border-y border-line py-4 font-serif text-2xl text-muted [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </motion.div>
  )
}

function About({ onPick }: { onPick: (s: Strength) => void }) {
  return (
    <Section id="about" index="01" title="What I do best" note="Select an area to see the skills behind it.">
      <motion.p {...inView} variants={item} className="mb-10 max-w-2xl text-lg leading-relaxed">{profile.summary}</motion.p>
      <motion.ul {...inView} variants={list} className="border-t border-line">
        {strengths.map((s, i) => (
          <motion.li key={s.title} variants={item} className="border-b border-line">
            <button onClick={() => onPick(s)}
              className="group relative grid w-full cursor-pointer gap-2 overflow-hidden py-6 text-left sm:grid-cols-[2rem_1fr_auto] sm:gap-6 sm:px-3">
              <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-soft transition-transform duration-500 ease-out group-hover:scale-y-100" />
              <span className="relative font-mono text-xs text-muted sm:pt-1.5">0{i + 1}</span>
              <span className="relative transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                <span className="block text-lg font-medium">{s.title}</span>
                <span className="mt-1 block leading-relaxed text-muted">{s.body}</span>
              </span>
              <span className="relative whitespace-nowrap text-sm text-muted transition-colors group-hover:text-accent sm:pt-1">
                {plural(s.skills.length, 'skill')}{' '}
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

function Skills({ onPick, area, onClear }: { onPick: (skill: string) => void; area: Strength | null; onClear: () => void }) {
  const inArea = (s: string) => !area || (area.skills as readonly string[]).includes(s)
  return (
    <Section id="skills" index="02" title="Skills" note="Select a skill to see what I've built with it. Numbers show how many projects use it.">
      <AnimatePresence>
        {area && <Filter label="Skills behind" value={area.title} back="#about" backLabel="Back to about" onClear={onClear} />}
      </AnimatePresence>
      <motion.dl {...inView} variants={list} className="border-t border-line">
        {skills.map((g) => (
          <motion.div key={g.group} variants={item} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
            <dt className="text-sm text-muted sm:pt-1">{g.group}</dt>
            <motion.dd variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }} className="flex flex-wrap gap-2">
              {g.items.map((s) => {
                const count = usedIn(s).length
                const lit = !!area && inArea(s)
                const base = `inline-flex min-h-9 items-center rounded-full border px-3 py-1 text-sm transition-all duration-300 ${inArea(s) ? '' : 'opacity-25'}`
                return (
                  <motion.span key={s} variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } } }} className="inline-flex">
                    {count ? (
                      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => onPick(s)} title={`See ${plural(count, 'project')} built with ${s}`}
                        className={`${base} cursor-pointer ${lit ? 'border-fg bg-fg text-bg' : 'border-line hover:border-fg'}`}>
                        {s}<sup className="ml-1 font-mono text-[10px] opacity-60">{count}</sup>
                      </motion.button>
                    ) : (
                      <span title="Coursework / fundamentals" className={`${base} border-dashed ${lit ? 'border-fg text-fg' : 'border-line text-muted'}`}>{s}</span>
                    )}
                  </motion.span>
                )
              })}
            </motion.dd>
          </motion.div>
        ))}
      </motion.dl>
    </Section>
  )
}

function Projects({ focus, onClear }: { focus: string | null; onClear: () => void }) {
  return (
    <Section id="projects" index="03" title="Selected work">
      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {focus && <Filter label={`${plural(usedIn(focus).length, 'project')} built with`} value={focus} back="#skills" backLabel="Back to skills" onClear={onClear} />}
        </AnimatePresence>
      </div>
      <motion.ul {...inView} variants={list} className="border-t border-line">
        {projects.map((p, n) => {
          const match = focus ? p.skills.includes(focus) : null
          return (
            <motion.li key={p.name} variants={item} className="group relative border-b border-line">
              <motion.span aria-hidden className="absolute inset-y-0 left-0 w-0.5 origin-top bg-accent"
                initial={false} animate={{ scaleY: match ? 1 : 0 }} transition={{ duration: 0.5, ease }} />
              <div className={`py-8 pl-4 transition-opacity duration-500 sm:pl-5 ${match === false ? 'opacity-25' : ''}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="flex items-baseline gap-3 font-serif text-3xl">
                    <span className="font-mono text-xs text-muted">{String(n + 1).padStart(2, '0')}</span>
                    <span className="transition-transform duration-500 ease-out group-hover:translate-x-1.5">{p.name}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted">{p.period} · {p.role}</p>
                </div>
                <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
                <p className="mt-3 font-mono text-xs text-accent">{p.highlight}</p>
                <dl className="mt-5 max-w-2xl space-y-3 leading-relaxed">
                  {SPEC_KEYS.map((k) => (
                    <div key={k} className="grid gap-1 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
                      <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">{k}</dt>
                      <dd>{p.spec[k]}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${p.name} stack`}>
                  {p.tags.map((t) => (
                    <li key={t} className={`rounded-sm border px-2 py-0.5 font-mono text-xs transition-colors duration-300 ${t === focus ? 'border-accent text-accent' : 'border-line text-muted'}`}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>
      <motion.a {...inView} variants={item} href={profile.github} target="_blank" rel="noreferrer"
        className="group relative mt-10 flex items-center justify-between gap-4 pb-4 transition-colors hover:text-accent">
        <span>
          <span className="block font-serif text-2xl">More on GitHub<span className="sr-only"> (opens in a new tab)</span></span>
          <span className="text-sm text-muted">github.com/Hikunokyojin</span>
        </span>
        <ArrowUpRight aria-hidden="true" className="h-6 w-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-fg" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
      </motion.a>
    </Section>
  )
}

function Apps() {
  const [notice, setNotice] = useState<string | null>(null)
  useEffect(() => {
    if (!notice) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setNotice(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [notice])
  return (
    <Section id="apps" index="04" title="Live apps" note="Hosted versions of my projects.">
      <motion.ul {...inView} variants={list} className="border-t border-line">
        {apps.map((a, i) => (
          <motion.li key={i} variants={item} className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-6">
            <div className="max-w-md">
              <p className="font-medium">{a.name}</p>
              <p className="mt-1 text-sm text-muted">{a.body}</p>
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => (a.url ? window.open(a.url, '_blank', 'noopener') : setNotice(a.name))}
              className="cursor-pointer rounded-full border border-fg px-4 py-1.5 text-sm transition-colors hover:bg-fg hover:text-bg">
              Open app ↗
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>
      <AnimatePresence>
        {notice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setNotice(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-fg/40 p-5 backdrop-blur-[2px]">
            <motion.div initial={{ y: 24, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 12, opacity: 0 }} transition={{ duration: 0.45, ease }}
              onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="notice-title" className="w-full max-w-sm border border-line bg-bg p-8">
              <p className="font-mono text-xs text-muted">Not deployed yet</p>
              <h3 id="notice-title" className="mt-2 font-serif text-3xl">Coming soon</h3>
              <p className="mt-3 leading-relaxed text-muted">{notice === 'Coming soon' ? 'This app' : notice} is being prepared for deployment. Check back shortly.</p>
              <button autoFocus onClick={() => setNotice(null)} className="mt-6 cursor-pointer rounded-full bg-fg px-5 py-2 text-sm text-bg">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

function Experience() {
  return (
    <Section id="experience" index="05" title="Experience" note="Work, leadership and education.">
      <motion.ul {...inView} variants={list} className="border-t border-line">
        {experience.map((e) => (
          <motion.li key={e.org} variants={item} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[180px_1fr] sm:gap-6">
            <p className="text-sm text-muted">{e.when}</p>
            <div>
              <h3 className="font-medium">{e.role}, {e.org}</h3>
              {e.points.length > 0 && (
                <motion.ul variants={list} className="mt-3 space-y-2 leading-relaxed text-muted">
                  {e.points.map((p) => <motion.li variants={item} key={p} className="pl-4 -indent-4">– {p}</motion.li>)}
                </motion.ul>
              )}
            </div>
          </motion.li>
        ))}
      </motion.ul>
      <motion.h3 {...inView} variants={item} className="mt-14 font-mono text-xs uppercase tracking-wider text-muted">Education</motion.h3>
      <motion.ul {...inView} variants={list} className="mt-4 border-t border-line">
        {education.map((e) => (
          <motion.li key={e.school} variants={item} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[180px_1fr] sm:gap-6">
            <p className="text-sm text-muted">{e.when}</p>
            <div>
              <h4 className="font-medium">{e.school}</h4>
              <p className="mt-1 text-muted">{e.detail}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" index="06" title="Contact">
      <motion.p {...inView} variants={item} className="max-w-xl text-lg leading-relaxed text-muted">{profile.status}</motion.p>
      <a href={`mailto:${profile.email}`} className="group relative mt-8 inline-block break-all font-serif text-3xl transition-colors hover:text-accent sm:text-5xl">
        <MaskText delay={0.1}>{profile.email}</MaskText>
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
      </a>
      <motion.div {...inView} variants={list} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
        {[['LinkedIn ↗', profile.linkedin], ['GitHub ↗', profile.github], ['Résumé ↗', '/resume.html']].map(([l, h]) => (
          <motion.a key={l} variants={item} href={h} target="_blank" rel="noreferrer" className="link">{l}</motion.a>
        ))}
      </motion.div>
    </Section>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const [focus, setFocus] = useState<string | null>(null)
  const [area, setArea] = useState<Strength | null>(null)
  const pick = (skill: string) => {
    setFocus(skill)
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }
  const pickArea = (s: Strength) => {
    setArea(s)
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <MotionConfig reducedMotion="user">
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About onPick={pickArea} />
        <Skills onPick={pick} area={area} onClear={() => setArea(null)} />
        <Projects focus={focus} onClear={() => setFocus(null)} />
        <Apps />
        <Experience />
        <Contact />
      </main>
      <footer className="mx-auto max-w-5xl px-5 sm:px-8">
        <Rule />
        <div className="flex flex-wrap justify-between gap-2 py-8 text-xs text-muted">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a href="#top" className="link">Back to top ↑</a>
        </div>
      </footer>
    </MotionConfig>
  )
}
