'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MobileMenuButton } from './MobileMenuButton'
import { MobileMenuOverlay } from './MobileMenuOverlay'

/**
 * MobileMenu Component
 * Premium radial menu with morphing button and clip-path expansion
 * Features:
 * - 2x2 dot grid button that morphs to X
 * - Full-screen radial expansion animation
 * - Staggered nav item entrance
 * - Focus trap and keyboard navigation
 * - Reduced motion support
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  // Handle escape key to close menu
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])

  // Add/remove keyboard listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="relative z-[120] md:hidden">
      <MobileMenuButton isOpen={isOpen} onClick={toggleMenu} />
      <AnimatePresence>
        {isOpen && <MobileMenuOverlay onClose={closeMenu} />}
      </AnimatePresence>
    </div>
  )
}
