import { useCallback, useEffect, useState } from 'react'
import { BootIntro } from './components/BootIntro'
import { Nav } from './components/Nav'
import { TerminalOverlay } from './components/TerminalOverlay'
import { useKonami } from './hooks/useKonami'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Life } from './sections/Life'
import { Skills } from './sections/Skills'
import { Work } from './sections/Work'

const BOOT_KEY = 'imgood:booted'

export default function App() {
  const [booted, setBooted] = useState(() => sessionStorage.getItem(BOOT_KEY) === '1')
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [rainbow, setRainbow] = useState(false)

  const finishBoot = useCallback(() => {
    sessionStorage.setItem(BOOT_KEY, '1')
    setBooted(true)
  }, [])

  const triggerRainbow = useCallback(() => {
    setRainbow(true)
    setTimeout(() => setRainbow(false), 6000)
  }, [])

  useKonami(triggerRainbow)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      if (e.key === '/') {
        e.preventDefault()
        setTerminalOpen((o) => !o)
      }
      if (e.key === 'Escape') setTerminalOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={rainbow ? 'rainbow-mode' : ''}>
      <div className="crt-overlay" aria-hidden />
      <div className="crt-vignette" aria-hidden />

      {!booted && <BootIntro onDone={finishBoot} />}

      <Nav onOpenTerminal={() => setTerminalOpen(true)} />
      <main>
        <Hero started={booted} />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Life />
        <Contact />
      </main>

      <TerminalOverlay open={terminalOpen} onClose={() => setTerminalOpen(false)} onRainbow={triggerRainbow} />
    </div>
  )
}
