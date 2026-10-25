import { useEffect, useState } from 'react'
import { GlitchText } from '../components/GlitchText'
import { identity } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'

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
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-green/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[480px] rounded-full bg-cyan/4 blur-[100px]" />

      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-sm text-fg-dim sm:text-base">
          <span className="text-green">{identity.handle}</span>
          <span className="text-fg-faint">:~$ </span>
          <span className="text-fg">{prompt.typed}</span>
          {!showName && <span className="cursor" />}
        </p>

        <h1
          className={`mt-6 font-mono text-[13vw] font-extrabold leading-[0.95] tracking-tighter text-fg transition-all duration-500 sm:text-8xl lg:text-9xl ${
            showName ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="block">
            <GlitchText text="GUDDU" />
          </span>
          <span className="block text-green glow-green">
            <GlitchText text="KUMAR" />
          </span>
        </h1>

        <div
          className={`mt-8 transition-all delay-100 duration-500 ${
            showRest ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="max-w-xl text-lg text-fg-dim sm:text-xl">
            {identity.tagline}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm">
            <span className="rounded-full border border-edge bg-panel px-3 py-1.5 text-fg-dim">
              <span className="mr-1.5 inline-block size-2 animate-pulse rounded-full bg-green align-middle" />
              backend · ai agents
            </span>
            <span className="rounded-full border border-edge bg-panel px-3 py-1.5 text-fg-dim">📍 {identity.location}</span>
            <span className="rounded-full border border-edge bg-panel px-3 py-1.5 text-fg-dim">eloelo group · se1</span>
          </div>
          <div className="mt-10 flex flex-wrap gap-4 font-mono text-sm">
            <a
              href="#work"
              className="rounded-md bg-green px-5 py-2.5 font-bold text-ink transition-all hover:shadow-glow hover:brightness-110"
            >
              $ scroll --to work
            </a>
            <a
              href={identity.resumePath}
              download
              className="rounded-md border border-edge bg-panel px-5 py-2.5 text-fg transition-all hover:border-green/60 hover:text-green"
            >
              $ curl resume.pdf
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce font-mono text-xs text-fg-faint">
        ▼ scroll
      </div>
    </header>
  )
}
