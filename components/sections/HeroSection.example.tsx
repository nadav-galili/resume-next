/**
 * Example usage of HeroSection component
 *
 * This file demonstrates how to use the HeroSection component in app/page.tsx
 */

import HeroSection from '@/components/sections/HeroSection'
import resumeData from '@/data/resume.json'

export default function HomePage() {
  return (
    <main>
      {/* Hero Section - First section of the page */}
      <HeroSection personal={resumeData.personal} />

      {/* Other sections will follow... */}
      <section id="professional">
        {/* ProfessionalSection will go here */}
      </section>
    </main>
  )
}

/**
 * Key Features Implemented:
 *
 * 1. Data Source: Reads from /data/resume.json (personal.name, personal.title, personal.bio)
 * 2. Hero Gradient: Uses .hero-gradient class from globals.css
 * 3. Full Viewport: min-h-screen ensures full viewport height
 * 4. Centered Content: Flexbox centering with max-w-4xl container
 * 5. Typography Hierarchy:
 *    - Name: text-5xl md:text-6xl lg:text-7xl (large)
 *    - Title: text-xl md:text-2xl lg:text-3xl (medium)
 *    - Bio: text-base md:text-lg (smaller)
 * 6. Two CTA Buttons:
 *    - Primary: "View My Work" (scrolls to #professional)
 *    - Secondary: "Download Resume" (links to /resume/nadav-galili-resume.pdf)
 * 7. Framer Motion Stagger Animations:
 *    - Container with staggerChildren: 0.2
 *    - Items with spring physics (stiffness: 100, damping: 15)
 *    - Sequence: Name → Title → Bio → Buttons
 * 8. Scroll Indicator: Animated chevron at bottom with bounce effect
 * 9. Analytics: trackCTAClick from lib/analytics for both buttons
 * 10. Mobile-First: Responsive breakpoints (sm, md, lg)
 * 11. Accessibility: Semantic HTML, proper touch targets (min 44x44px)
 * 12. Background Effects: Decorative gradient orbs for depth
 */
