import { useEffect, useRef, useState } from 'react'
import { bootLines } from '../data/profile'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = { onDone: () => void }

export function BootIntro({ onDone }: Props) {
  const [visible, setVisible] = useState<number>(0)
  const [poweringOff, setPoweringOff] = useState(false)
  const reduced = useReducedMotion()
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    setPoweringOff(true)
    setTimeout(onDone, 430)
  }

  useEffect(() => {
    if (reduced) {
      onDone()
      return
    }
    let cancelled = false
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const next = () => {
      if (cancelled) return
      i += 1
      setVisible(i)
      if (i < bootLines.length) {
        t = setTimeout(next, bootLines[i].delay)
      } else {
        t = setTimeout(finish, 500)
      }
    }
    t = setTimeout(next, 300)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  useEffect(() => {
    const skip = () => finish()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-center justify-center bg-ink px-4 ${poweringOff ? 'crt-off' : ''}`}
      aria-label="Boot animation — press any key to skip"
    >
      <div className="w-full max-w-2xl font-mono text-[13px] leading-7 sm:text-sm">
        {bootLines.slice(0, visible).map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line.text.includes('[ OK ]') ? (
              <>
                <span className="text-fg-dim">{line.text.split('[ OK ]')[0]}</span>
                <span className="text-green glow-green">[ OK ]</span>
                <span className="text-fg">{line.text.split('[ OK ]')[1]}</span>
              </>
            ) : (
              <span className={idx === 0 ? 'text-amber glow-amber' : 'text-fg'}>{line.text}</span>
            )}
          </div>
        ))}
        <span className="cursor" />
        <div className="mt-8 text-center text-xs text-fg-faint select-none">press any key to skip</div>
      </div>
    </div>
  )
}
