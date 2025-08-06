import React from 'react'
import { Moon, Sun } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'

export function ThemeToggle() {
  const [theme, setTheme] = useKV<'light' | 'dark'>('theme', 'light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  // Initialize theme on first load
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      {theme === 'light' ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  )
}