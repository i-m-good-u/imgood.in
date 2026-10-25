import { useEffect, useRef, useState } from 'react'
import { SectionHeading } from '../components/SectionHeading'
import { TerminalWindow } from '../components/TerminalWindow'
import { aboutLines, marqueeItems } from '../data/profile'

/** Renders **bold** segments in green */
function Rich({ line }: { line: string }) {
  if (line.startsWith('# ')) return <span className="text-amber glow-amber font-bold">{line}</span>
  const parts = line.split('**')
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-bold text-green">
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  )
}

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* marquee divider */}
      <div className="mb-20 -rotate-1 overflow-hidden border-y border-green/20 bg-panel-2/80 py-4 select-none" aria-hidden>
        <div className="marquee-track gap-12 font-mono text-base font-extrabold tracking-[0.25em]" style={{ animationDuration: '16s' }}>
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className={i % 2 === 0 ? 'text-gradient' : 'text-fg-dim'}>{m}</span>
              <span className="text-green/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading index="01" cmd="cat about.md" title="Guddu Kumar (i_m_good_u)" className="mb-2" />
        <TerminalWindow title="~/about.md" glow>
          <div className="font-mono text-[13.5px] leading-7 text-fg sm:text-[15px] sm:leading-8">
            {aboutLines.map((line, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 60}ms` }}
                className={`min-h-4 transition-all duration-500 ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
              >
                <Rich line={line} />
              </div>
            ))}
            <span className="cursor" />
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}
