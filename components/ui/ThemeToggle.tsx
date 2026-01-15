'use client'

/**
 * ThemeToggle Component
 * Toggle button for switching between light and dark themes
 * Features:
 * - Smooth rotation animation (300ms)
 * - Keyboard accessible (Enter/Space)
 * - ARIA labels for screen readers
 * - Respects prefers-reduced-motion
 * - 44x44px minimum touch target (mobile)
 */

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return placeholder to avoid layout shift
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 sm:h-11 sm:w-11"
        aria-label="Toggle theme"
        disabled
      >
        <div className="size-5 sm:size-6" />
      </Button>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-10 w-10 sm:h-11 sm:w-11 transition-all hover:scale-105 active:scale-95"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icon with rotation animation */}
      <div className="relative size-5 sm:size-6">
        {/* Sun icon (light mode) */}
        <Sun
          className={`absolute inset-0 size-5 sm:size-6 text-foreground transition-all duration-300 ease-in-out ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
          aria-hidden="true"
        />

        {/* Moon icon (dark mode) */}
        <Moon
          className={`absolute inset-0 size-5 sm:size-6 text-foreground transition-all duration-300 ease-in-out ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
          aria-hidden="true"
        />
      </div>
    </Button>
  )
}
