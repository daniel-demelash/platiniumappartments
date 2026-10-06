import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'

const currentTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme)
  const next = theme === 'dark' ? 'light' : 'dark'

  const toggle = (e) => {
    const root = document.documentElement
    const apply = () => {
      flushSync(() => setTheme(next))
      root.dataset.theme = next
    }
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }

    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      apply()
      return
    }
    const x = e.clientX || window.innerWidth - 40
    const y = e.clientY || 40
    root.style.setProperty('--tx', `${x}px`)
    root.style.setProperty('--ty', `${y}px`)
    root.style.setProperty('--tr', `${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px`)
    document.startViewTransition(apply)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      <span key={theme} className="theme-toggle-icon">
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  )
}

export default ThemeToggle
