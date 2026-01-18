'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import { useAnalytics } from './useAnalytics'

type MarginType = `${number}${'px' | '%'}` | `${number}${'px' | '%'} ${number}${'px' | '%'}` | `${number}${'px' | '%'} ${number}${'px' | '%'} ${number}${'px' | '%'}` | `${number}${'px' | '%'} ${number}${'px' | '%'} ${number}${'px' | '%'} ${number}${'px' | '%'}`

interface UseSectionTrackingOptions {
  /** Percentage of section that must be visible (0-1) */
  threshold?: number
  /** Only track once per session */
  once?: boolean
  /** Margin around the viewport for triggering */
  margin?: MarginType
}

/**
 * useSectionTracking Hook
 * Automatically tracks when a section comes into view
 * Uses Intersection Observer via Framer Motion's useInView
 *
 * @param sectionName - Name of the section for analytics
 * @param options - Configuration options
 * @returns ref to attach to the section element
 *
 * @example
 * ```tsx
 * function MySection() {
 *   const ref = useSectionTracking('hero')
 *   return <section ref={ref}>...</section>
 * }
 * ```
 */
export function useSectionTracking(
  sectionName: string,
  options: UseSectionTrackingOptions = {}
) {
  const { threshold = 0.3, once = true, margin = '-100px' as MarginType } = options
  const ref = useRef<HTMLElement>(null)
  const hasTracked = useRef(false)
  const { trackSection } = useAnalytics()

  const isInView = useInView(ref, {
    once,
    margin,
    amount: threshold,
  })

  useEffect(() => {
    if (isInView && !hasTracked.current) {
      hasTracked.current = true
      trackSection(sectionName)
    }
  }, [isInView, sectionName, trackSection])

  return ref
}

/**
 * useScrollDepthTracking Hook
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%)
 * Automatically sets up and cleans up scroll listener
 */
export function useScrollDepthTracking() {
  const { trackScroll } = useAnalytics()
  const lastTrackedDepth = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const depth = Math.round((scrollTop / scrollHeight) * 100)

      // Only track if we've scrolled deeper than before
      if (depth > lastTrackedDepth.current) {
        lastTrackedDepth.current = depth
        trackScroll(depth)
      }
    }

    // Throttle scroll events
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [trackScroll])
}

/**
 * useTimeOnPage Hook
 * Tracks how long a user spends on the page
 * Reports at certain intervals (30s, 60s, 120s, 300s)
 */
export function useTimeOnPage() {
  const { trackTimeOnPage } = useAnalytics()
  const trackedIntervals = useRef<Set<number>>(new Set())

  useEffect(() => {
    const intervals = [30, 60, 120, 300] // seconds
    const startTime = Date.now()

    const checkTime = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)

      for (const interval of intervals) {
        if (elapsed >= interval && !trackedIntervals.current.has(interval)) {
          trackedIntervals.current.add(interval)
          trackTimeOnPage(interval)
        }
      }
    }

    const timer = setInterval(checkTime, 10000) // Check every 10 seconds
    return () => clearInterval(timer)
  }, [trackTimeOnPage])
}
