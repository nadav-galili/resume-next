'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

// Hook to detect reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/**
 * MobileMenuButton Component
 * A hamburger icon that morphs into an X with spring physics
 *
 * Closed state: Three horizontal lines (hamburger)
 * Open state: Lines rotate to form an X
 * Supports prefers-reduced-motion
 */
export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  const prefersReducedMotion = useReducedMotion()

  // Spring configuration for smooth animations
  const springConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 400, damping: 30 }

  return (
    <motion.button
      className={`relative z-[110] flex h-11 w-11 items-center justify-center rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isOpen
          ? 'bg-foreground/10 dark:bg-white/20 backdrop-blur-sm'
          : 'bg-foreground/5 hover:bg-foreground/10'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {/* Three lines that morph into X */}
      <div className="relative flex h-6 w-6 flex-col items-center justify-center">
        {/* Top line - rotates to form top-left to bottom-right diagonal */}
        <motion.span
          className="absolute left-0 h-[2.5px] w-6 rounded-full bg-foreground"
          style={{ transformOrigin: 'center' }}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -7,
          }}
          transition={springConfig}
        />
        {/* Middle line - fades out */}
        <motion.span
          className="absolute left-0 h-[2.5px] w-6 rounded-full bg-foreground"
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={springConfig}
        />
        {/* Bottom line - rotates to form bottom-left to top-right diagonal */}
        <motion.span
          className="absolute left-0 h-[2.5px] w-6 rounded-full bg-foreground"
          style={{ transformOrigin: 'center' }}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 7,
          }}
          transition={springConfig}
        />
      </div>
    </motion.button>
  )
}
