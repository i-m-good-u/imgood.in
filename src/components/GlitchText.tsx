import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  text: string
  className?: string
  /** re-glitch on hover */
  interactive?: boolean
}

export function GlitchText({ text, className = '', interactive = true }: Props) {
  const [glitching, setGlitching] = useState(false)
  const reduced = useReducedMotion()
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const fire = () => {
    if (reduced) return
    setGlitching(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setGlitching(false), 340)
  }

  useEffect(() => {
    const t = setTimeout(fire, 150)
    return () => {
      clearTimeout(t)
      clearTimeout(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span
      data-text={text}
      onMouseEnter={interactive ? fire : undefined}
      className={`glitch ${glitching ? 'glitching' : ''} ${className}`}
    >
      {text}
    </span>
  )
}
