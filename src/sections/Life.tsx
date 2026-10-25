import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { life } from '../data/profile'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function Life() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !root.current) return
    const ctx = gsap.context(() => {
      gsap.from('.life-card', {
        y: 48,
        opacity: 0,
        stagger: 0.14,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="life" ref={root} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-2 font-mono text-sm text-fg-dim">
          <span className="text-green">$</span> ls ~/life/
        </p>
        <h2 className="mb-4 font-mono text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          beyond the terminal<span className="text-green">_</span>
        </h2>
        <p className="mb-12 max-w-xl text-fg-dim">
          Multi-threaded in real life too — the same discipline that ships systems also rides mountains and moves iron.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {life.map((item) => (
            <div
              key={item.file}
              className="life-card group rounded-xl border border-edge bg-panel p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-green/50 hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-green">{item.file}</span>
                <span className="text-2xl grayscale transition-all duration-300 group-hover:grayscale-0">{item.icon}</span>
              </div>
              <h3 className="mt-4 font-mono text-xl font-bold text-fg">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-dim">{item.desc}</p>
              <p className="mt-5 font-mono text-xs text-fg-faint">-rwxr-xr-x 1 guddu staff</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
