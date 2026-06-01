import { useReveal } from '../hooks'

export default function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(28px)',
        transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
