/**
 * Constants for the resume web app
 * Design system values, breakpoints, and configuration
 */

// Responsive breakpoints (mobile-first)
export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
  wide: 1920,
} as const

// App Store color palette
export const COLORS = {
  // iOS/App Store brand colors
  iosBlue: '#007AFF',
  purple: '#5856D6',

  // Dark mode (default)
  black: '#000000',
  darkGray: '#1C1C1E',
  gray: '#949494',

  // Light mode
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkText: '#1C1C1E',
} as const

// Animation configuration
export const ANIMATION = {
  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.3,
    slow: 0.6,
    verySlow: 1.0,
  },
  ease: 'easeOut',
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 15,
  },
} as const

// Section IDs for navigation
export const SECTIONS = {
  hero: 'hero',
  professional: 'professional',
  indieProjects: 'indie-projects',
  buildNotes: 'build-notes',
  techStack: 'tech-stack',
  contact: 'contact',
} as const

// Navigation menu items
export const NAV_ITEMS = [
  { label: 'Experience', href: `#${SECTIONS.professional}` },
  { label: 'Projects', href: `#${SECTIONS.indieProjects}` },
  { label: 'Build Notes', href: `#${SECTIONS.buildNotes}` },
  { label: 'Skills', href: `#${SECTIONS.techStack}` },
  { label: 'Contact', href: `#${SECTIONS.contact}` },
] as const

// App Store badges
export const BADGES = {
  appStore: {
    url: 'https://apps.apple.com',
    alt: 'Download on the App Store',
  },
  playStore: {
    url: 'https://play.google.com',
    alt: 'Get it on Google Play',
  },
} as const

// Social links configuration
export const SOCIAL_LINKS = {
  github: {
    label: 'GitHub',
    icon: 'github',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: 'linkedin',
  },
  email: {
    label: 'Email',
    icon: 'mail',
  },
} as const

// Performance thresholds
export const PERFORMANCE = {
  lazyLoadOffset: 100, // pixels before element enters viewport
  imageQuality: 90,
  maxImageWidth: 1920,
} as const

// Type exports
export type SectionId = typeof SECTIONS[keyof typeof SECTIONS]
export type NavItem = typeof NAV_ITEMS[number]
