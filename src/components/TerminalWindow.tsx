import type { ReactNode } from 'react'

type Props = {
  title?: string
  children: ReactNode
  className?: string
  glow?: boolean
}

export function TerminalWindow({ title = 'bash — 80×24', children, className = '', glow = false }: Props) {
  return (
    <div
      className={`gborder glass rounded-xl shadow-window overflow-hidden ${
        glow ? 'shadow-glow' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-edge/70 bg-panel-2/80 px-4 py-2.5">
        <span className="size-3 rounded-full bg-red/90" />
        <span className="size-3 rounded-full bg-yellow/90" />
        <span className="size-3 rounded-full bg-green/80" />
        <span className="ml-3 truncate font-mono text-xs text-fg-dim select-none">{title}</span>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  )
}
