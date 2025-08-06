import React from 'react'
import { Button } from '@/components/ui/button'
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
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 p-0"
    >
      {theme === 'light' ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </Button>
  )
}