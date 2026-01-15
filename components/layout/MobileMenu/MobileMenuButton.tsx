'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

// Hook to detect reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/**
 * MobileMenuButton Component
 * A 2x2 dot grid that morphs into an X with spring physics
 *
 * Closed state: 4 dots in a 2x2 grid (like iOS app grid icon)
 * Open state: Dots rotate and translate to form an X
 * Supports prefers-reduced-motion
 */
export function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  const prefersReducedMotion = useReducedMotion()

  // Spring configuration for smooth, satisfying animations
  // Use instant transition for reduced motion
  const springConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 300, damping: 25 }

  // Dot positions for 2x2 grid (closed) and X shape (open)
  // Grid: TL(0,0) TR(1,0) BL(0,1) BR(1,1)
  // X: dots move to center and rotate to form diagonal lines
  const dotVariants = {
    topLeft: {
      closed: { x: 0, y: 0, rotate: 0 },
      open: { x: 6, y: 6, rotate: 45 },
    },
    topRight: {
      closed: { x: 12, y: 0, rotate: 0 },
      open: { x: 6, y: 6, rotate: 45 },
    },
    bottomLeft: {
      closed: { x: 0, y: 12, rotate: 0 },
      open: { x: 6, y: 6, rotate: -45 },
    },
    bottomRight: {
      closed: { x: 12, y: 12, rotate: 0 },
      open: { x: 6, y: 6, rotate: -45 },
    },
  }

  // Container scale on hover/tap
  const containerVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  const state = isOpen ? 'open' : 'closed'

  return (
    <motion.button
      className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/5 transition-colors hover:bg-foreground/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      onClick={onClick}
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {/* Glow effect on open */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-primary/20 blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Dot container - 20x20 grid for the 4 dots */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="relative z-10"
        aria-hidden="true"
      >
        {/* Top Left Dot */}
        <motion.circle
          cx="4"
          cy="4"
          r="2.5"
          className="fill-foreground"
          variants={dotVariants.topLeft}
          animate={state}
          transition={springConfig}
          style={{ originX: '4px', originY: '4px' }}
        />

        {/* Top Right Dot */}
        <motion.circle
          cx="4"
          cy="4"
          r="2.5"
          className="fill-foreground"
          variants={dotVariants.topRight}
          animate={state}
          transition={springConfig}
          style={{ originX: '4px', originY: '4px' }}
        />

        {/* Bottom Left Dot */}
        <motion.circle
          cx="4"
          cy="4"
          r="2.5"
          className="fill-foreground"
          variants={dotVariants.bottomLeft}
          animate={state}
          transition={springConfig}
          style={{ originX: '4px', originY: '4px' }}
        />

        {/* Bottom Right Dot */}
        <motion.circle
          cx="4"
          cy="4"
          r="2.5"
          className="fill-foreground"
          variants={dotVariants.bottomRight}
          animate={state}
          transition={springConfig}
          style={{ originX: '4px', originY: '4px' }}
        />
      </svg>
    </motion.button>
  )
}
