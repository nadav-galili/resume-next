/**
 * Example usage of ProfessionalSection component
 *
 * This file demonstrates how to integrate the ProfessionalSection
 * into your page using data from resume.json
 */

import { ProfessionalSection } from '@/components/sections/ProfessionalSection'
import resumeData from '@/data/resume.json'

// Usage in app/page.tsx or any page component:
export default function HomePage() {
  return (
    <main>
      {/* Other sections... */}

      {/* Professional Experience Section */}
      <ProfessionalSection experience={resumeData.professional[0]} />

      {/* Other sections... */}
    </main>
  )
}

/**
 * Component Features:
 *
 * 1. Data-driven from resume.json
 * 2. Scroll-triggered reveal animations
 * 3. Glass morphism styling
 * 4. Responsive grid (2 columns desktop, 1 column mobile)
 * 5. Achievement cards with hover effects
 * 6. Metrics badges with iOS blue accent
 * 7. Impact highlights
 * 8. Tech stack tags with hover animations
 * 9. Staggered animations for smooth reveals
 * 10. Respects prefers-reduced-motion
 *
 * Animations:
 * - Section header: Fade in + slide up
 * - Company card: Fade in + slide up (delayed)
 * - Achievement cards: Staggered fade in + slide up
 * - Tech tags: Sequential fade in + scale (with delay)
 * - Hover effects: Scale up + shadow
 *
 * Accessibility:
 * - Semantic HTML structure
 * - Proper heading hierarchy
 * - ARIA labels (implicit through semantic structure)
 * - Keyboard navigation support
 * - Respects reduced motion preferences
 *
 * Performance:
 * - Only animates transform and opacity (GPU accelerated)
 * - useInView with once: true (animations trigger once)
 * - Lazy animation triggers (margin: -100px)
 * - No layout shifts during animations
 */
