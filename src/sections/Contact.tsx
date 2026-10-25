import { TerminalWindow } from '../components/TerminalWindow'
import { identity } from '../data/profile'

const rows = [
  { key: 'email', value: identity.email, href: `mailto:${identity.email}` },
  { key: 'github', value: 'github.com/i-m-good-u', href: identity.github },
  { key: 'linkedin', value: 'linkedin.com/in/i-m-good-u', href: identity.linkedin },
  { key: 'resume', value: 'Guddu_Kumar_Resume.pdf', href: identity.resumePath },
]

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="mb-2 font-mono text-sm text-fg-dim">
          <span className="text-green">$</span> ssh guddu@imgood.in
        </p>
        <h2 className="mb-10 font-mono text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          open a connection<span className="text-green">_</span>
        </h2>

        <TerminalWindow title="ssh guddu@imgood.in" glow>
          <div className="font-mono text-sm leading-7">
            <p className="text-fg-dim">
              The authenticity of host <span className="text-cyan">'imgood.in'</span> can't be established.
            </p>
            <p className="mb-4 text-fg-dim">
              Are you sure you want to continue connecting? <span className="text-green">yes</span>
            </p>
            <p className="mb-4 text-green glow-green">
              Welcome. Building something ambitious? Hiring? Riding out of BLR this weekend? Say hi.
            </p>
            <div className="space-y-1.5">
              {rows.map((r) => (
                <p key={r.key}>
                  <span className="inline-block w-24 text-fg-faint">{r.key}</span>
                  <a
                    href={r.href}
                    target={r.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    download={r.key === 'resume' || undefined}
                    className="text-fg underline decoration-edge underline-offset-4 transition-colors hover:text-green hover:decoration-green"
                  >
                    {r.value}
                  </a>
                </p>
              ))}
            </div>
            <p className="mt-6 text-fg-dim">
              <span className="text-green">guddu@imgood.in</span>
              <span className="text-fg-faint">:~$ </span>
              <span className="cursor" />
            </p>
          </div>
        </TerminalWindow>

        <footer className="mt-16 flex flex-col items-center gap-2 text-center font-mono text-xs text-fg-faint">
          <p>
            © {new Date().getFullYear()} Guddu Kumar · built with React + GSAP · hosted on Hostinger ·{' '}
            <span className="text-fg-dim">press / for a surprise</span>
          </p>
          <p>no servers were harmed — this site is 100% static</p>
        </footer>
      </div>
    </section>
  )
}
