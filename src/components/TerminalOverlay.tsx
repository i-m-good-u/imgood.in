import { useEffect, useRef, useState } from 'react'
import { experience, identity, projects, skills } from '../data/profile'

type Line = { text: string; tone?: 'green' | 'amber' | 'cyan' | 'red' | 'dim' }

const toneClass = {
  green: 'text-green',
  amber: 'text-amber',
  cyan: 'text-cyan',
  red: 'text-red',
  dim: 'text-fg-dim',
} as const

const WELCOME: Line[] = [
  { text: 'imgood.in interactive shell — v1.0.0', tone: 'amber' },
  { text: "type 'help' to see available commands", tone: 'dim' },
  { text: '' },
]

function run(input: string): { lines: Line[]; action?: 'close' | 'clear' | 'rainbow' } {
  const [cmd, ...args] = input.trim().split(/\s+/)
  const arg = args.join(' ')

  switch (cmd) {
    case '':
      return { lines: [] }
    case 'help':
      return {
        lines: [
          { text: 'available commands:', tone: 'amber' },
          { text: '  whoami          who is this guy' },
          { text: '  projects        featured work' },
          { text: '  skills          tech stack' },
          { text: '  experience      career git log' },
          { text: '  social          links' },
          { text: '  resume          download the pdf' },
          { text: '  sudo hire-me    do it' },
          { text: '  konami          hint for the curious' },
          { text: '  clear | exit    housekeeping' },
        ],
      }
    case 'whoami':
      return {
        lines: [
          { text: 'guddu kumar (i_m_good_u)', tone: 'green' },
          { text: 'backend engineer · ai agents & distributed systems · bengaluru' },
          { text: identity.tagline, tone: 'dim' },
          { text: 'also: bike rider, gym freak, professional shipper of things', tone: 'dim' },
        ],
      }
    case 'projects':
      return {
        lines: projects.flatMap((p) => [
          { text: `▸ ${p.name}`, tone: 'green' as const },
          { text: `  ${p.blurb}`, tone: 'dim' as const },
        ]),
      }
    case 'skills':
      return {
        lines: skills.flatMap((g) => [
          { text: `[${g.label}]`, tone: 'amber' as const },
          ...g.items.map((s) => ({ text: `  ${s.name}`, tone: 'dim' as const })),
        ]),
      }
    case 'experience':
      return {
        lines: experience.map((c) => ({ text: `${c.hash} ${c.title}`, tone: 'dim' as const })),
      }
    case 'social':
      return {
        lines: [
          { text: `github    → ${identity.github}`, tone: 'cyan' },
          { text: `linkedin  → ${identity.linkedin}`, tone: 'cyan' },
          { text: `email     → ${identity.email}`, tone: 'cyan' },
        ],
      }
    case 'resume':
      window.open(identity.resumePath, '_blank')
      return { lines: [{ text: 'fetching resume.pdf ... done ✓', tone: 'green' }] }
    case 'sudo':
      if (arg === 'hire-me' || arg === 'hire me') {
        return {
          lines: [
            { text: '[sudo] password for you: ********', tone: 'dim' },
            { text: 'authentication successful.', tone: 'green' },
            { text: '' },
            { text: '╔══════════════════════════════════════════╗', tone: 'green' },
            { text: '║   OFFER GENERATED: hire guddu kumar       ║', tone: 'green' },
            { text: '║   role: engineer who actually ships      ║', tone: 'green' },
            { text: '║   status: PENDING YOUR EMAIL →            ║', tone: 'green' },
            { text: `║   ${identity.email}        ║`, tone: 'amber' },
            { text: '╚══════════════════════════════════════════╝', tone: 'green' },
          ],
        }
      }
      return { lines: [{ text: `sudo: ${arg || '(nothing)'}: permission granted but pointless`, tone: 'red' }] }
    case 'konami':
      return { lines: [{ text: '↑ ↑ ↓ ↓ ← → ← → b a  (on the page, not in here)', tone: 'amber' }] }
    case 'rainbow':
      return { lines: [{ text: 'engaging chromatic overdrive...', tone: 'amber' }], action: 'rainbow' }
    case 'clear':
      return { lines: [], action: 'clear' }
    case 'exit':
    case 'q':
      return { lines: [], action: 'close' }
    case 'ls':
      return { lines: [{ text: 'about/  work/  skills/  life/  contact/  secrets/', tone: 'cyan' }] }
    case 'cat':
      if (arg.includes('secret')) return { lines: [{ text: 'nice try. secrets are encrypted with gym gains.', tone: 'red' }] }
      return { lines: [{ text: `cat: ${arg || '(no file)'}: try 'whoami' or 'projects'`, tone: 'dim' }] }
    case 'rm':
      return { lines: [{ text: 'rm: refusing to delete production. this IS production.', tone: 'red' }] }
    case 'vim':
      return { lines: [{ text: "you can't exit vim. luckily this isn't vim. type 'help'.", tone: 'amber' }] }
    case 'ping':
      return { lines: [{ text: '64 bytes from bengaluru: icmp_seq=1 ttl=420 time=0.042 ms — always up.', tone: 'green' }] }
    default:
      return { lines: [{ text: `command not found: ${cmd} — try 'help'`, tone: 'red' }] }
  }
}

export function TerminalOverlay({
  open,
  onClose,
  onRainbow,
}: {
  open: boolean
  onClose: () => void
  onRainbow: () => void
}) {
  const [history, setHistory] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histPos, setHistPos] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [history])

  if (!open) return null

  const submit = () => {
    const value = input
    const echo: Line = { text: `i_m_good_u@imgood.in:~$ ${value}`, tone: 'dim' }
    const result = run(value)
    if (result.action === 'close') return onClose()
    if (result.action === 'rainbow') onRainbow()
    setHistory((h) => (result.action === 'clear' ? [] : [...h, echo, ...result.lines]))
    if (value.trim()) setCmdHistory((h) => [value, ...h])
    setHistPos(-1)
    setInput('')
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-label="Interactive terminal"
    >
      <div
        className="flex h-[70svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-edge bg-panel-2 shadow-window sm:h-[480px] sm:rounded-xl"
        onClick={(e) => {
          e.stopPropagation()
          inputRef.current?.focus()
        }}
      >
        <div className="flex items-center gap-2 border-b border-edge bg-panel px-4 py-2.5">
          <button onClick={onClose} className="size-3 rounded-full bg-red/90" aria-label="Close terminal" />
          <span className="size-3 rounded-full bg-yellow/90" />
          <span className="size-3 rounded-full bg-green/80" />
          <span className="ml-3 font-mono text-xs text-fg-dim select-none">i_m_good_u@imgood.in — zsh</span>
          <span className="ml-auto font-mono text-[10px] text-fg-faint select-none">esc to close</span>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-[13px] leading-6">
          {history.map((l, i) => (
            <div key={i} className={`whitespace-pre-wrap ${l.tone ? toneClass[l.tone] : 'text-fg'}`}>
              {l.text || ' '}
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-green">i_m_good_u@imgood.in:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
                if (e.key === 'Escape') onClose()
                if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  const next = Math.min(histPos + 1, cmdHistory.length - 1)
                  if (cmdHistory[next]) {
                    setHistPos(next)
                    setInput(cmdHistory[next])
                  }
                }
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  const next = histPos - 1
                  setHistPos(next)
                  setInput(next < 0 ? '' : cmdHistory[next])
                }
              }}
              className="w-full bg-transparent font-mono text-[13px] text-fg caret-green outline-none"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Terminal command input"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
