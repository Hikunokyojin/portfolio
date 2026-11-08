import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const

// Parent/child variants for staggered lists that animate once when scrolled into view.
export const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
export const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}
export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-80px' } } as const

// A hairline rule that draws itself from left to right.
export function Rule({ className = '' }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease }}
      className={`h-px origin-left bg-line ${className}`}
    />
  )
}

// Text that slides up from behind a mask.
export function MaskText({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden pb-[0.12em] align-bottom ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Two-column section: a sticky label on the left, content on the right.
export function Section({ id, index, title, note, children }: { id: string; index: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-16 px-5 sm:px-8">
      <Rule />
      <div className="grid gap-8 py-16 md:grid-cols-[200px_1fr] md:gap-12 md:py-24">
        <div className="md:sticky md:top-24 md:self-start">
          <p className="font-mono text-xs text-muted"><MaskText>{index}</MaskText></p>
          <h2 className="mt-1 font-serif text-3xl leading-tight"><MaskText delay={0.08}>{title}</MaskText></h2>
          {note && (
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-3 text-sm text-muted">
              {note}
            </motion.p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}
