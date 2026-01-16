'use client'

import { forwardRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MobileMenuItemProps {
  href: string
  label: string
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
 * MobileMenuItem Component
 * Individual nav item with staggered entrance animation
 * Features:
 * - Slide + fade entrance from right
 * - Scale and glow on hover
 * - Large touch target
 * - Reduced motion support
 */
export const MobileMenuItem = forwardRef<HTMLAnchorElement, MobileMenuItemProps>(
  function MobileMenuItem({ href, label, onClick }, ref) {
    const prefersReducedMotion = useReducedMotion()

    // Item entrance animation (simplified for reduced motion)
    const itemVariants = prefersReducedMotion
      ? {
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }
      : {
          closed: {
            opacity: 0,
            x: 50,
            y: -10,
          },
          open: {
            opacity: 1,
            x: 0,
            y: 0,
          },
        }

    return (
      <motion.li
        role="none"
        variants={itemVariants}
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { type: 'spring', stiffness: 300, damping: 30 }
        }
      >
        <motion.a
          ref={ref}
          href={href}
          onClick={onClick}
          role="menuitem"
          className="group relative block px-8 py-4 text-center text-2xl font-semibold text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:text-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow effect on hover */}
          <span className="absolute inset-0 -z-10 rounded-2xl bg-primary/0 blur-xl transition-all duration-300 group-hover:bg-primary/10" />

          {/* Background pill on hover */}
          <span className="absolute inset-0 -z-10 rounded-2xl bg-foreground/0 transition-colors duration-200 group-hover:bg-foreground/5" />

          {/* Label */}
          <span className="relative">{label}</span>

          {/* Underline indicator */}
          <motion.span
            className="absolute bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary"
            initial={{ width: 0 }}
            whileHover={{ width: '50%' }}
            transition={{ duration: 0.2 }}
          />
        </motion.a>
      </motion.li>
    )
  }
)
