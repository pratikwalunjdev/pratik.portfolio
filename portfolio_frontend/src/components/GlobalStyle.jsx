import { useEffect } from 'react'
import { GLOBAL_CSS } from '../styles'

export default function GlobalStyle() {
  useEffect(() => {
    const id = 'portfolio-global-styles'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = GLOBAL_CSS
      document.head.appendChild(style)
    }
    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [])

  return null
}
