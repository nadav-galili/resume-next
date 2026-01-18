'use client'

import { useCallback, useRef } from 'react'
import {
  trackEvent,
  trackCTAClick,
  trackLinkClick,
  trackSectionView,
  trackProjectInteraction,
  trackScrollDepth,
} from '@/lib/analytics'

/**
 * useAnalytics Hook
 * Provides memoized analytics tracking functions for components
 * All tracking is done asynchronously to avoid blocking UI
 */
export function useAnalytics() {
  // Track which sections have been viewed to prevent duplicate tracking
  const viewedSections = useRef<Set<string>>(new Set())
  // Track which scroll milestones have been tracked
  const trackedMilestones = useRef<Set<number>>(new Set())

  /**
   * Track a generic event
   */
  const track = useCallback(
    (eventName: string, properties?: Record<string, unknown>) => {
      trackEvent(eventName, properties)
    },
    []
  )

  /**
   * Track CTA button clicks
   */
  const trackCTA = useCallback((ctaName: string, location: string) => {
    trackCTAClick(ctaName, location)
  }, [])

  /**
   * Track link clicks
   */
  const trackLink = useCallback((linkName: string, url: string) => {
    trackLinkClick(linkName, url)
  }, [])

  /**
   * Track section view (only once per session)
   */
  const trackSection = useCallback((sectionName: string) => {
    if (!viewedSections.current.has(sectionName)) {
      viewedSections.current.add(sectionName)
      trackSectionView(sectionName)
    }
  }, [])

  /**
   * Track project interactions
   */
  const trackProject = useCallback((projectName: string, action: string) => {
    trackProjectInteraction(projectName, action)
  }, [])

  /**
   * Track scroll depth milestone (25%, 50%, 75%, 100%)
   */
  const trackScroll = useCallback((depth: number) => {
    const milestones = [25, 50, 75, 100]
    const milestone = milestones.find((m) => depth >= m && depth < m + 10)

    if (milestone && !trackedMilestones.current.has(milestone)) {
      trackedMilestones.current.add(milestone)
      trackScrollDepth(milestone)
    }
  }, [])

  /**
   * Track resume download
   */
  const trackResumeDownload = useCallback(
    (format: 'pdf' | 'docx', location: string) => {
      trackEvent('Resume Download', {
        format,
        location,
        timestamp: new Date().toISOString(),
      })
    },
    []
  )

  /**
   * Track theme toggle
   */
  const trackThemeChange = useCallback((theme: 'light' | 'dark' | 'system') => {
    trackEvent('Theme Change', {
      theme,
      timestamp: new Date().toISOString(),
    })
  }, [])

  /**
   * Track navigation click
   */
  const trackNavigation = useCallback((destination: string, source: string) => {
    trackEvent('Navigation Click', {
      destination,
      source,
      timestamp: new Date().toISOString(),
    })
  }, [])

  /**
   * Track time spent on page
   */
  const trackTimeOnPage = useCallback((seconds: number) => {
    trackEvent('Time on Page', {
      seconds,
      timestamp: new Date().toISOString(),
    })
  }, [])

  return {
    track,
    trackCTA,
    trackLink,
    trackSection,
    trackProject,
    trackScroll,
    trackResumeDownload,
    trackThemeChange,
    trackNavigation,
    trackTimeOnPage,
  }
}

export type UseAnalyticsReturn = ReturnType<typeof useAnalytics>
