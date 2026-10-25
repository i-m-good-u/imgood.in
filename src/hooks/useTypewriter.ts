import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Types `text` one character at a time once `start` is true.
 * Instant under prefers-reduced-motion.
 */
export function useTypewriter(text: string, start: boolean, speed = 28, startDelay = 0) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const done = count >= text.length
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (!start) return
    if (reduced) {
      setCount(text.length)
      return
    }
    let i = 0
    const tick = () => {
      i += 1
      setCount(i)
      if (i < text.length) {
        // slight jitter makes typing feel human
        timer.current = setTimeout(tick, speed + Math.sin(i * 2.7) * speed * 0.35)
      }
    }
    timer.current = setTimeout(tick, startDelay)
    return () => clearTimeout(timer.current)
  }, [text, start, speed, startDelay, reduced])

  return { typed: text.slice(0, count), done }
}
