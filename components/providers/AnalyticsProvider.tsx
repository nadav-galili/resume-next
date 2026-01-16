'use client'

import { useEffect } from 'react'
import { initAnalytics, trackPageView } from '@/lib/analytics'

/**
 * AnalyticsProvider
 * Initializes Mixpanel analytics and tracks initial page view
 * Uses lazy loading for better initial page performance
 * Should be placed near the root of the app
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Use requestIdleCallback to defer analytics loading
    // This ensures it doesn't block the main thread during initial render
    const loadAnalytics = async () => {
      await initAnalytics()
      trackPageView('Resume Home')
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadAnalytics())
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(loadAnalytics, 1000)
    }
  }, [])

  return <>{children}</>
}
