/**
 * Analytics utilities for tracking user interactions
 * Uses Mixpanel for event tracking with lazy loading for better performance
 */

// Get Mixpanel token from environment variables
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

// Track if analytics has been initialized
let isInitialized = false
let mixpanelInstance: typeof import('mixpanel-browser') | null = null

/**
 * Lazy load Mixpanel library
 * Only loads the library when first needed
 */
const getMixpanel = async () => {
  if (!mixpanelInstance && typeof window !== 'undefined') {
    mixpanelInstance = await import('mixpanel-browser')
  }
  return mixpanelInstance
}

/**
 * Initialize Mixpanel analytics
 * Call this once in the root layout or app component
 */
export const initAnalytics = async () => {
  if (MIXPANEL_TOKEN && !isInitialized) {
    const mixpanel = await getMixpanel()
    if (mixpanel) {
      mixpanel.default.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === 'development',
        track_pageview: true,
        persistence: 'localStorage',
        api_host: 'https://api-eu.mixpanel.com', // EU data residency
      })
      isInitialized = true
      console.log('Mixpanel analytics initialized')
    }
  } else if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token not found - analytics disabled')
  }
}

/**
 * Track a custom event
 * @param eventName - Name of the event to track
 * @param properties - Optional properties to attach to the event
 */
export const trackEvent = async (
  eventName: string,
  properties?: Record<string, unknown>
) => {
  if (MIXPANEL_TOKEN && isInitialized && mixpanelInstance) {
    mixpanelInstance.default.track(eventName, properties)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Mixpanel] ${eventName}`, properties)
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.warn(`[Mixpanel] Event not sent: ${eventName}`, {
      hasToken: !!MIXPANEL_TOKEN,
      isInitialized,
      hasInstance: !!mixpanelInstance,
    })
  }
}

/**
 * Track a page view
 * @param pageName - Name of the page being viewed
 */
export const trackPageView = (pageName: string) => {
  trackEvent('Page View', {
    page: pageName,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track when a section comes into view
 * @param sectionName - Name of the section (hero, professional, etc.)
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('Section View', {
    section: sectionName,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track CTA (Call to Action) button clicks
 * @param ctaName - Name of the CTA (e.g., "Download Resume", "View App Store")
 * @param location - Where the CTA is located (e.g., "hero", "contact")
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('CTA Click', {
    cta: ctaName,
    location,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track link clicks
 * @param linkName - Name of the link (e.g., "LinkedIn", "GitHub")
 * @param url - URL being navigated to
 */
export const trackLinkClick = (linkName: string, url: string) => {
  trackEvent('Link Click', {
    link: linkName,
    url,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track project interactions
 * @param projectName - Name of the project
 * @param action - Action taken (e.g., "view_details", "visit_app_store")
 */
export const trackProjectInteraction = (
  projectName: string,
  action: string
) => {
  trackEvent('Project Interaction', {
    project: projectName,
    action,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track scroll depth
 * @param depth - Percentage of page scrolled (0-100)
 */
export const trackScrollDepth = (depth: number) => {
  // Only track at 25%, 50%, 75%, 100% milestones
  const milestones = [25, 50, 75, 100]
  const milestone = milestones.find(m => depth >= m && depth < m + 5)

  if (milestone) {
    trackEvent('Scroll Depth', {
      depth: milestone,
      timestamp: new Date().toISOString(),
    })
  }
}

/**
 * Identify a user (optional - for future use)
 * @param userId - Unique identifier for the user
 * @param traits - Optional user traits
 */
export const identifyUser = async (
  userId: string,
  traits?: Record<string, unknown>
) => {
  if (MIXPANEL_TOKEN && isInitialized && mixpanelInstance) {
    mixpanelInstance.default.identify(userId)
    if (traits) {
      mixpanelInstance.default.people.set(traits)
    }
  }
}

/**
 * Reset analytics state (useful for testing)
 */
export const resetAnalytics = () => {
  if (MIXPANEL_TOKEN && isInitialized && mixpanelInstance) {
    mixpanelInstance.default.reset()
  }
}
