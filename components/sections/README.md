# Sections Components

This directory contains all section components for the resume website. Each section is a standalone component that can be composed in the main page.

## HeroSection

The hero section component with animated gradient background and staggered Framer Motion reveals.

### Features

- **Full Viewport Height**: Takes up entire screen on load
- **Animated Gradient Background**: iOS-style blue to purple gradient
- **Staggered Animations**: Name, title, bio, and buttons animate in sequence
- **Spring Physics**: Smooth, natural animations with bounce
- **Two CTA Buttons**:
  - Primary: "View My Work" (smooth scroll to #professional)
  - Secondary: "Download Resume" (PDF download)
- **Scroll Indicator**: Animated chevron encouraging scroll
- **Analytics Tracking**: Tracks CTA clicks via Mixpanel
- **Mobile-First Responsive**: Optimized for all screen sizes
- **Accessibility**: Semantic HTML, proper touch targets, respects prefers-reduced-motion

### Usage

```tsx
import HeroSection from '@/components/sections/HeroSection'
import resumeData from '@/data/resume.json'

export default function Page() {
  return <HeroSection personal={resumeData.personal} />
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `personal` | `PersonalInfo` | Yes | Personal information from resume.json including name, title, and bio |

### Data Structure

The component expects the following data structure from `resume.json`:

```json
{
  "personal": {
    "name": "Nadav Galili",
    "title": "Full-Stack Developer & Indie App Developer",
    "bio": "Full-stack developer with 5 years of experience..."
  }
}
```

### Animation Details

#### Container Animation
- Initial: opacity 0
- Animated: opacity 1
- Stagger children by 0.2s
- Delay of 0.1s before starting

#### Item Animation
- Initial: opacity 0, translateY 20px
- Animated: opacity 1, translateY 0
- Spring physics: stiffness 100, damping 15

#### Scroll Indicator
- Bounces up and down continuously
- 1.5s duration, infinite loop
- Translates Y: [0, 8px, 0]

### Styling

- Uses `.hero-gradient` class from `app/globals.css`
- White text on gradient background
- Glass morphism for secondary button (backdrop-blur)
- Shadow effects on primary button
- Responsive typography scales:
  - Name: 3rem → 3.75rem → 4.5rem
  - Title: 1.25rem → 1.5rem → 1.875rem
  - Bio: 1rem → 1.125rem

### Analytics Events

The component tracks the following events:

```typescript
// When "View My Work" is clicked
trackCTAClick('View My Work', 'hero')

// When "Download Resume" is clicked
trackCTAClick('Download Resume', 'hero')
```

### Accessibility

- Semantic HTML5 elements (`<section>`, `<h1>`, `<h2>`, `<p>`)
- Touch targets are minimum 44x44px
- Respects `prefers-reduced-motion` via globals.css
- Proper heading hierarchy (h1 → h2 → p)
- Link includes `rel="noopener noreferrer"` for security

### Performance

- Client component (`'use client'`) for animations
- Minimal re-renders (stateless component)
- GPU-accelerated animations (transform, opacity only)
- Lazy loads Framer Motion only when needed
- Decorative elements don't block interaction (`pointer-events-none`)

### Mobile Optimization

- Stacks buttons vertically on mobile (flex-col)
- Reduces font sizes on smaller screens
- Adjusts padding and spacing for mobile
- Touch-friendly button sizes
- Scroll indicator visible on all screen sizes

### Future Enhancements

Potential improvements for future versions:

- [ ] Parallax scroll effect on decorative elements
- [ ] Video background option
- [ ] Additional CTA button variants
- [ ] Social media links
- [ ] Dark mode toggle
- [ ] Internationalization support

## Component Dependencies

- `framer-motion`: Animation library
- `lucide-react`: Icon library (ChevronDown)
- `@/components/ui/button`: shadcn/ui Button component
- `@/lib/analytics`: Analytics tracking utilities
- `@/types/resume`: TypeScript type definitions

---

## ProfessionalSection

Professional experience section showcasing Mobile-Brain work history with timeline and achievement cards.

### Features

- **Scroll-Triggered Animations**: Reveals content as user scrolls into view
- **Glass Morphism Styling**: Modern, translucent card design
- **Responsive Grid**: 2 columns on desktop, 1 column on mobile
- **Achievement Cards**: Individual cards for each professional achievement
- **Metrics Badges**: Highlighted metrics with iOS blue accent color
- **Impact Highlights**: Secondary background for impact statements
- **Tech Stack Tags**: Animated technology pills at bottom
- **Staggered Animations**: Sequential card reveals for smooth visual flow
- **Hover Effects**: Scale and shadow transitions on cards
- **Accessibility**: Respects `prefers-reduced-motion`, proper semantics

### Usage

```tsx
import { ProfessionalSection } from '@/components/sections/ProfessionalSection'
import resumeData from '@/data/resume.json'

export default function Page() {
  return <ProfessionalSection experience={resumeData.professional[0]} />
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `experience` | `ProfessionalExperience` | Yes | Professional experience data from resume.json |

### Data Structure

The component expects data from `/data/resume.json`:

```json
{
  "company": "Mobile-Brain",
  "role": "Full-Stack Developer",
  "duration": "5 years",
  "startDate": "2020-01-01",
  "description": "Company description...",
  "achievements": [
    {
      "title": "Achievement title",
      "description": "Achievement description",
      "metrics": "40% faster development",
      "impact": "Improved user retention by 28%"
    }
  ],
  "techStack": ["React", "TypeScript", "Node.js"],
  "location": "Tel Aviv, Israel"
}
```

### Animation Details

| Element | Animation | Duration | Delay | Easing |
|---------|-----------|----------|-------|--------|
| Section header | Fade in + slide up | 0.6s | 0s | ease-out |
| Company card | Fade in + slide up | 0.6s | 0.2s | custom cubic-bezier |
| Achievement cards | Staggered fade + slide | 0.6s | 0.2s + stagger 0.1s | custom cubic-bezier |
| Tech tags | Sequential fade + scale | 0.4s | 0.7s + stagger 0.05s | ease-out |
| Card hover | Scale 1.02 + shadow | 0.3s | 0s | ease-out |

#### Container Animation (Achievement Grid)
```typescript
{
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}
```

#### Item Animation (Individual Cards)
```typescript
{
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing curve
    }
  }
}
```

### Styling Classes

- `.glass` - Glass morphism effect with backdrop blur
- `border-border/50` - Semi-transparent borders
- `shadow-xl` - Large shadow for depth
- `hover:shadow-primary/5` - Subtle blue shadow on hover
- Custom App Store color theme from globals.css
- Responsive utilities: `sm:`, `lg:` prefixes

### Accessibility

- Semantic HTML with proper heading hierarchy (`<h2>` → `<h3>`)
- Section landmark with `id="professional"` for anchor navigation
- `scroll-mt-20` for proper scroll positioning with fixed header
- Keyboard navigation support on all interactive elements
- Respects `prefers-reduced-motion` system preference
- WCAG AA color contrast compliance
- Touch-friendly targets (min 44x44px)

### Performance Optimizations

- **GPU-Accelerated Animations**: Only animates `transform` and `opacity`
- **useInView with once: true**: Animations trigger once, no repeated calculations
- **Lazy Trigger**: `-100px` margin starts animations before scroll into view
- **No Layout Shifts**: All animations use transform, not layout properties
- **Minimal Re-renders**: Proper key usage and component structure

### Mobile Considerations

- **Single Column Layout**: Cards stack vertically on mobile
- **Stacked Header**: Company info stacks on small screens with `flex-col`
- **Responsive Typography**: Text scales down on mobile (`text-base` → `sm:text-lg`)
- **Touch-Friendly**: All buttons and cards exceed 44x44px minimum
- **Proper Spacing**: Adequate padding and gaps for mobile readability
- **Glass Effect**: Backdrop blur creates depth without overwhelming small screens

### Component Dependencies

- `framer-motion` - Animation library (`motion`, `useInView`)
- `@/components/ui/card` - shadcn/ui Card components
- `@/components/ui/separator` - shadcn/ui Separator for divider
- `@/types/resume` - TypeScript type definitions

### Future Enhancements

Potential improvements for future versions:

- [ ] Accordion for expandable achievement details
- [ ] Timeline visualization with vertical line
- [ ] Company logo image support
- [ ] Link to company website
- [ ] Skills filtering by technology
- [ ] Export achievement cards as images
- [ ] Print-friendly view

---

## Future Sections

Components to be built:

- `IndieProjectsSection.tsx` - Poker AI showcase with app store badges
- `BuildNotesSection.tsx` - Technical depth with code snippets
- `TechStackSection.tsx` - Skills grid with logo icons
- `ContactSection.tsx` - Links & resume downloads
