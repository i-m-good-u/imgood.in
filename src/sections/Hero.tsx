import { useEffect, useState } from 'react'
import { GlitchText } from '../components/GlitchText'
import { identity } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'

const FLOAT_BITS = [
  { text: 'kafka.send(topic)', left: '8%', delay: '0s', dur: '16s' },
  { text: 'plan → confirm → execute', left: '78%', delay: '2.5s', dur: '18s' },
  { text: '200 OK · 12ms', left: '88%', delay: '6s', dur: '14s' },
  { text: 'SELECT * FROM wins;', left: '16%', delay: '8s', dur: '17s' },
  { text: 'agent.invoke()', left: '68%', delay: '11s', dur: '15s' },
  { text: 'git push --force-with-lease', left: '4%', delay: '13s', dur: '16s' },
]

export function Hero({ started }: { started: boolean }) {
  const prompt = useTypewriter('whoami', started, 65, 500)
  const [showName, setShowName] = useState(false)
  const [showRest, setShowRest] = useState(false)

  useEffect(() => {
    if (!prompt.done) return
    const a = setTimeout(() => setShowName(true), 260)
    const b = setTimeout(() => setShowRest(true), 700)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [prompt.done])

  return (
    <header id="top" className="relative flex min-h-svh flex-col justify-center overflow-hidden px-4 sm:px-6">
      {/* perspective grid floor */}
      <div className="grid-floor" aria-hidden />

      {/* floating code bits */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {FLOAT_BITS.map((b) => (
          <span
            key={b.text}
            className="float-bit top-[72%]"
            style={{ left: b.left, animationDelay: b.delay, animationDuration: b.dur }}
          >
            {b.text}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <p className="font-mono text-sm text-fg-dim sm:text-base">
          <span className="text-green">{identity.handle}</span>
          <span className="text-fg-faint">:~$ </span>
          <span className="text-fg">{prompt.typed}</span>
          {!showName && <span className="cursor" />}
        </p>

        <h1
          className={`mt-6 font-mono text-[14vw] font-extrabold leading-[0.93] tracking-tighter transition-all duration-700 sm:text-9xl lg:text-[10.5rem] ${
            showName ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <span className="block text-fg">
            <GlitchText text="GUDDU" />
          </span>
          <span className="text-gradient block drop-shadow-[0_0_30px_rgba(61,242,139,0.25)]">
            <GlitchText text="KUMAR" />
          </span>
        </h1>

        <div
          className={`mt-8 transition-all delay-100 duration-700 ${
            showRest ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="max-w-2xl text-xl text-fg sm:text-2xl">
            I build <span className="text-gradient font-bold">AI agents</span> &amp;{' '}
            <span className="text-gradient font-bold">distributed systems</span>{' '}
            <span className="text-fg-dim">that don't go down.</span>
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm">
            <span className="gborder glass rounded-full px-4 py-2 text-fg-dim">
              <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-green align-middle shadow-glow" />
              backend · ai agents
            </span>
            <span className="gborder glass rounded-full px-4 py-2 text-fg-dim">📍 {identity.location}</span>
            <span className="gborder glass rounded-full px-4 py-2 text-fg-dim">eloelo group · se1</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 font-mono text-sm">
            <a href="#work" className="btn-gradient rounded-lg px-6 py-3 font-bold">
              $ scroll --to work
            </a>
            <a
              href={identity.resumePath}
              download
              className="gborder glass rounded-lg px-6 py-3 text-fg transition-colors hover:text-green"
            >
              $ curl resume.pdf
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce font-mono text-xs text-fg-faint">
        ▼ scroll
      </div>
    </header>
  )
}
