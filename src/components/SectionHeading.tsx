type Props = {
  index: string
  cmd: string
  title: string
  className?: string
}

export function SectionHeading({ index, cmd, title, className = '' }: Props) {
  return (
    <div className={`relative ${className}`}>
      <span className="pointer-events-none absolute -top-10 -left-2 select-none font-mono text-[7rem] font-extrabold leading-none text-fg/4 sm:-top-14 sm:text-[11rem]">
        {index}
      </span>
      <p className="relative mb-2 font-mono text-sm text-fg-dim">
        <span className="text-green">$</span> {cmd}
      </p>
      <h2 className="relative mb-10 font-mono text-4xl font-extrabold tracking-tight sm:text-6xl">
        <span className="text-gradient">{title}</span>
        <span className="text-green">_</span>
      </h2>
    </div>
  )
}
