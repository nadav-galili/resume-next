'use client'

import { useEffect } from 'react'
import { initAnalytics, trackPageView } from '@/lib/analytics'

/**
 * AnalyticsProvider
 * Initializes Mixpanel analytics and tracks initial page view
 * Should be placed near the root of the app
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Mixpanel
    initAnalytics()

    // Track initial page view
    trackPageView('Resume Home')
  }, [])

  return <>{children}</>
}
