import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'cd about' },
  { href: '#work', label: 'cd work' },
  { href: '#skills', label: 'cd skills' },
  { href: '#life', label: 'cd life' },
  { href: '#contact', label: 'ssh contact' },
]

export function Nav({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-edge bg-ink/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 font-mono text-[13px] sm:px-6">
        <a href="#top" className="text-green glow-green font-bold tracking-tight">
          ~/imgood.in<span className="cursor" />
        </a>
        <div className="hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-fg-dim transition-colors hover:text-green">
              <span className="text-fg-faint">$ </span>
              {l.label}
            </a>
          ))}
          <button
            onClick={onOpenTerminal}
            className="rounded-md border border-edge bg-panel px-3 py-1.5 text-green transition-all hover:border-green/60 hover:shadow-glow"
            title="Open terminal (/)"
          >
            &gt;_ terminal
          </button>
        </div>
        <button
          onClick={onOpenTerminal}
          className="rounded-md border border-edge bg-panel px-3 py-1.5 text-green md:hidden"
          aria-label="Open terminal"
        >
          &gt;_
        </button>
      </div>
    </nav>
  )
}
