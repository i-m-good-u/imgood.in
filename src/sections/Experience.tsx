import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '../components/SectionHeading'
import { experience } from '../data/profile'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.commit-entry').forEach((el) => {
        gsap.from(el, {
          x: -36,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
      gsap.from('.commit-line', {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="experience" ref={root} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="02" cmd="git log --graph --career" title="commit history" className="mb-4" />

        <div className="relative">
          <div className="commit-line absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-green via-edge to-edge sm:left-[9px]" />
          <div className="space-y-12">
            {experience.map((c) => (
              <article key={c.hash} className="commit-entry relative pl-8 sm:pl-12">
                <span className="absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-green bg-ink shadow-glow sm:size-[19px]" />
                <p className="font-mono text-xs text-fg-dim sm:text-sm">
                  <span className="text-amber">{c.hash}</span>
                  {c.ref && <span className="ml-2 text-cyan">({c.ref})</span>}
                  <span className="ml-2 text-fg-faint">· {c.meta}</span>
                </p>
                <h3 className="mt-2 font-mono text-lg font-bold text-fg sm:text-2xl">{c.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-fg-dim">
                      <span className="mt-0.5 shrink-0 font-mono text-green">+</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tech.map((t) => (
                    <span key={t} className="rounded border border-edge bg-panel px-2 py-0.5 font-mono text-xs text-fg-dim">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
