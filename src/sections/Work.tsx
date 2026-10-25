import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TerminalWindow } from '../components/TerminalWindow'
import { projects, type Project } from '../data/profile'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const accentText: Record<Project['accent'], string> = {
  green: 'text-green glow-green',
  amber: 'text-amber glow-amber',
  cyan: 'text-cyan',
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <TerminalWindow title={`guddu@prod: ${p.id}`} className="project-card h-full w-[86vw] shrink-0 sm:w-[560px]">
      <p className="font-mono text-xs text-fg-dim">
        <span className="text-green">$</span> {p.cmd}
      </p>
      <h3 className={`mt-3 font-mono text-3xl font-extrabold tracking-tight sm:text-4xl ${accentText[p.accent]}`}>
        {p.name}
      </h3>
      <p className="mt-3 text-[15px] text-fg">{p.blurb}</p>
      <ul className="mt-4 space-y-2">
        {p.points.map((pt, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-fg-dim">
            <span className="mt-0.5 shrink-0 font-mono text-green">▸</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {p.tech.map((t) => (
          <span key={t} className="rounded border border-edge bg-panel-2 px-2 py-0.5 font-mono text-xs text-fg-dim">
            {t}
          </span>
        ))}
      </div>
      {p.link && (
        <a
          href={p.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block rounded-md bg-green px-4 py-2 font-mono text-sm font-bold text-ink transition-all hover:shadow-glow hover:brightness-110"
        >
          {p.link.label}
        </a>
      )}
    </TerminalWindow>
  )
}

export function Work() {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !root.current || !track.current) return
    const mm = gsap.matchMedia()
    // pinned horizontal scroll on desktop only
    mm.add('(min-width: 768px)', () => {
      const getDistance = () => track.current!.scrollWidth - root.current!.clientWidth + 96
      const tween = gsap.to(track.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
      return () => tween.scrollTrigger?.kill()
    })
    return () => mm.revert()
  }, [reduced])

  const useHorizontal = !reduced

  return (
    <section id="work" className="relative py-24 sm:py-0">
      <div ref={root} className={useHorizontal ? 'md:flex md:min-h-svh md:flex-col md:justify-center md:overflow-hidden' : ''}>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="mb-2 font-mono text-sm text-fg-dim">
            <span className="text-green">$</span> ls ~/work --featured
          </p>
          <h2 className="mb-10 font-mono text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
            shipped &amp; running<span className="text-green">_</span>
          </h2>
        </div>
        <div
          ref={track}
          className="flex flex-col gap-6 px-4 sm:px-6 md:w-max md:flex-row md:gap-8 md:pl-[max(1.5rem,calc((100vw-72rem)/2))]"
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
          <div className="hidden w-[20vw] shrink-0 md:block" />
        </div>
      </div>
    </section>
  )
}
