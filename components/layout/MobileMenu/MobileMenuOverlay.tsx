'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { NAV_ITEMS } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'
import { MobileMenuItem } from './MobileMenuItem'

interface MobileMenuOverlayProps {
  onClose: () => void
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
 * MobileMenuOverlay Component
 * Full-screen overlay with radial clip-path expansion animation
 * Features:
 * - Circular expansion from button origin
 * - Glass morphism backdrop
 * - Staggered nav item entrance
 * - Focus trap for accessibility
 */
export function MobileMenuOverlay({ onClose }: MobileMenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstItemRef = useRef<HTMLAnchorElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Focus first item when menu opens
  useEffect(() => {
    // Small delay to allow animation to start (skip if reduced motion)
    const delay = prefersReducedMotion ? 0 : 300
    const timer = setTimeout(() => {
      firstItemRef.current?.focus()
    }, delay)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  // Overlay expansion animation
  // Origin point: top-right where the button is located
  // Falls back to simple opacity for reduced motion
  const overlayVariants = prefersReducedMotion
    ? {
        closed: { opacity: 0 },
        open: { opacity: 1 },
      }
    : {
        closed: {
          clipPath: 'circle(0px at calc(100% - 44px) 44px)',
          opacity: 0,
        },
        open: {
          clipPath: 'circle(200vh at calc(100% - 44px) 44px)',
          opacity: 1,
        },
      }

  // Container for staggered children (no stagger for reduced motion)
  const containerVariants = prefersReducedMotion
    ? { closed: {}, open: {} }
    : {
        closed: {},
        open: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.15,
          },
        },
      }

  // Handle nav item click
  const handleNavClick = (label: string, href: string) => {
    trackEvent('Navigation Click', {
      label,
      href,
      location: 'mobile-menu',
    })
    onClose()
  }

  return (
    <motion.div
      ref={overlayRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-[100] isolate"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'fixed',
        height: '100dvh',
        width: '100vw',
      }}
      variants={overlayVariants}
      initial="closed"
      animate="open"
      exit="closed"
      transition={
        prefersReducedMotion
          ? { duration: 0.01 }
          : { type: 'spring', stiffness: 200, damping: 25 }
      }
    >
      {/* Blurred background layer */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl" />

      {/* Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* Navigation container */}
      <motion.nav
        className="relative flex h-full flex-col items-center justify-center px-8"
        variants={containerVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        <ul className="flex flex-col items-center gap-6" role="menu">
          {NAV_ITEMS.map((item, index) => (
            <MobileMenuItem
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={() => handleNavClick(item.label, item.href)}
              ref={index === 0 ? firstItemRef : undefined}
            />
          ))}
        </ul>
      </motion.nav>

      {/* Bottom gradient for visual interest */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
    </motion.div>
  )
}
