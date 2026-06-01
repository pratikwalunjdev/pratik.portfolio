import { SKILL_COLORS, SKILL_ABBR } from '../data'

export default function SkillLogo({ name, size = 26 }) {
  const color = SKILL_COLORS[name] || '#7c3aed'
  const abbr = SKILL_ABBR[name] || name.slice(0, 2).toUpperCase()

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 5,
        background: `${color}22`,
        border: `1px solid ${color}44`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: size <= 26 ? 8 : 10,
          fontWeight: 700,
          color: color,
          lineHeight: 1,
        }}
      >
        {abbr}
      </span>
    </span>
  )
}
