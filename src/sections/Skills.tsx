import { useEffect, useRef, useState } from 'react'
import { TerminalWindow } from '../components/TerminalWindow'
import { skills } from '../data/profile'

function Bar({ name, level, inView, delay }: { name: string; level: number; inView: boolean; delay: number }) {
  const SEGMENTS = 24
  const filled = Math.round((level / 100) * SEGMENTS)
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <span className="w-full truncate font-mono text-[13px] text-fg sm:w-72">{name}</span>
      <div className="flex flex-1 items-center gap-3">
        <div className="flex flex-1 gap-[3px] overflow-hidden" aria-hidden>
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <span
              key={i}
              style={{ transitionDelay: `${delay + i * 22}ms` }}
              className={`h-3.5 flex-1 rounded-[2px] transition-all duration-200 ${
                i < filled
                  ? inView
                    ? i > SEGMENTS * 0.78
                      ? 'bg-amber opacity-100'
                      : 'bg-green opacity-100'
                    : 'bg-green opacity-0'
                  : 'bg-edge'
              }`}
            />
          ))}
        </div>
        <span className="w-10 text-right font-mono text-xs text-fg-dim">{level}%</span>
      </div>
    </div>
  )
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="mb-2 font-mono text-sm text-fg-dim">
          <span className="text-green">$</span> htop --sort-key=SKILL
        </p>
        <h2 className="mb-10 font-mono text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          running processes<span className="text-green">_</span>
        </h2>
        <TerminalWindow title="htop — skills" glow>
          <div className="space-y-8">
            {skills.map((group, gi) => (
              <div key={group.label}>
                <p className="mb-3 font-mono text-xs font-bold tracking-[0.2em] text-amber uppercase">
                  ── {group.label} ──
                </p>
                <div className="space-y-3">
                  {group.items.map((s, si) => (
                    <Bar key={s.name} name={s.name} level={s.level} inView={inView} delay={gi * 180 + si * 90} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-xs text-fg-faint">
            load average: high · uptime: since 2001 · 0 zombie processes
          </p>
        </TerminalWindow>
      </div>
    </section>
  )
}
