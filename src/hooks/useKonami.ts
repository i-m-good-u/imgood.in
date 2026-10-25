import { useEffect } from 'react'

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonami(onTrigger: () => void) {
  useEffect(() => {
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      pos = e.key === SEQUENCE[pos] ? pos + 1 : e.key === SEQUENCE[0] ? 1 : 0
      if (pos === SEQUENCE.length) {
        pos = 0
        onTrigger()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onTrigger])
}
