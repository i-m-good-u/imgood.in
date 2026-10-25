import { useEffect, useRef, useState } from 'react'
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
      <div className="mb-20 overflow-hidden border-y border-edge bg-panel-2 py-3 select-none" aria-hidden>
        <div className="marquee-track gap-10 font-mono text-sm font-bold tracking-widest text-fg-faint">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className={i % 3 === 0 ? 'text-green/85' : i % 3 === 1 ? 'text-fg-dim' : 'text-amber/80'}>{m}</span>
              <span className="text-edge">✕</span>
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="mb-6 font-mono text-sm text-fg-dim">
          <span className="text-green">$</span> cat about.md
        </p>
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
