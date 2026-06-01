import { useState, useEffect, useRef } from 'react'
import { TYPING_PHRASES } from './data'

// ─── TYPING EFFECT ─────────────────────────────────────────────────────────
export function useTypingEffect(phrases = TYPING_PHRASES, speed = 65, pause = 1600) {
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState('typing')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = phrases[idx]
    let timer

    if (phase === 'typing') {
      if (charIdx < current.length) {
        timer = setTimeout(() => setCharIdx((c) => c + 1), speed)
      } else {
        timer = setTimeout(() => setPhase('deleting'), pause)
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
      } else {
        setPhase('typing')
        setIdx((i) => (i + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timer)
  }, [charIdx, phase, idx, phrases, speed, pause])

  useEffect(() => {
    setDisplay(phrases[idx].slice(0, charIdx))
  }, [charIdx, idx, phrases])

  return display
}

// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────
export function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}

// ─── TERMINAL LINE REVEAL ──────────────────────────────────────────────────
export function useTerminalLine(delay) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return visible
}
