'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScrollProvider
 * Wraps the app with Lenis smooth scrolling library
 * Provides momentum-based smooth scrolling with 60fps performance
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with custom settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    // Request animation frame loop for smooth scrolling
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
