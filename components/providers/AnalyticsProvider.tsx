'use client'

import { useEffect, useCallback, useRef } from 'react'
import { initAnalytics, trackPageView, trackEvent } from '@/lib/analytics'
import { useScrollDepthTracking, useTimeOnPage } from '@/hooks/useSectionTracking'

/**
 * Analytics Tracker Component
 * Handles scroll depth and time on page tracking
 * Separated to keep provider clean
 */
function AnalyticsTracker() {
  useScrollDepthTracking()
  useTimeOnPage()
  return null
}

/**
 * AnalyticsProvider
 * Initializes Mixpanel analytics and tracks:
 * - Initial page view
 * - Scroll depth (25%, 50%, 75%, 100%)
 * - Time on page (30s, 60s, 120s, 300s)
 * - Page visibility changes
 *
 * Uses lazy loading for better initial page performance
 * Should be placed near the root of the app
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const analyticsReady = useRef(false)
  const sessionStart = useRef<number | null>(null)

  // Track page visibility changes (user leaving/returning)
  const trackVisibilityChange = useCallback(() => {
    if (!analyticsReady.current) return

    if (document.visibilityState === 'hidden' && sessionStart.current) {
      const timeSpent = Math.floor((Date.now() - sessionStart.current) / 1000)
      trackEvent('Page Hidden', {
        timeSpentSeconds: timeSpent,
        timestamp: new Date().toISOString(),
      })
    } else if (document.visibilityState === 'visible') {
      trackEvent('Page Visible', {
        timestamp: new Date().toISOString(),
      })
    }
  }, [])

  useEffect(() => {
    // Use requestIdleCallback to defer analytics loading
    // This ensures it doesn't block the main thread during initial render
    const loadAnalytics = async () => {
      await initAnalytics()
      analyticsReady.current = true
      sessionStart.current = Date.now()
      trackPageView('Resume Home')

      // Track initial referrer
      if (document.referrer) {
        trackEvent('Referrer', {
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
        })
      }

      // Track device info
      trackEvent('Device Info', {
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        userAgent: navigator.userAgent,
        language: navigator.language,
        timestamp: new Date().toISOString(),
      })
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadAnalytics())
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadAnalytics, 1000)
    }

    // Track visibility changes
    document.addEventListener('visibilitychange', trackVisibilityChange)

    // Track page unload
    const handleBeforeUnload = () => {
      if (sessionStart.current) {
        const timeSpent = Math.floor((Date.now() - sessionStart.current) / 1000)
        trackEvent('Session End', {
          totalTimeSeconds: timeSpent,
          timestamp: new Date().toISOString(),
        })
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', trackVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [trackVisibilityChange])

  return (
    <>
      {children}
      <AnalyticsTracker />
    </>
  )
}
