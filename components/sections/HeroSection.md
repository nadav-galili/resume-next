# HeroSection Component Documentation

## Overview

The HeroSection is the first impression of the resume website - a full-screen hero with an animated gradient background and staggered text reveals using Framer Motion.

## Visual Structure

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                     [Gradient Background]                     │
│                  (iOS Blue → Purple gradient)                 │
│                                                               │
│                      Nadav Galili                            │
│            Full-Stack Developer & Indie App Developer        │
│                                                               │
│    Full-stack developer with 5 years of experience          │
│    building production React and Node.js applications        │
│    at Mobile-Brain. Passionate about creating polished       │
│    mobile experiences...                                      │
│                                                               │
│    ┌──────────────────┐  ┌──────────────────┐              │
│    │  View My Work    │  │ Download Resume  │              │
│    └──────────────────┘  └──────────────────┘              │
│                                                               │
│                                                               │
│                    Scroll to explore                          │
│                           ↓                                   │
└─────────────────────────────────────────────────────────────┘
```

## Animation Sequence

```
Timeline (seconds)
0.0s  │ Component mounts (opacity: 0)
      │
0.1s  │ Container animation starts
      │
0.1s  │ ━━━━━━ Name fades in ━━━━━━━━━━━━━━━
      │        (opacity: 0 → 1, y: 20 → 0)
      │
0.3s  │        ━━━━━━ Title fades in ━━━━━━━━
      │               (opacity: 0 → 1, y: 20 → 0)
      │
0.5s  │               ━━━━━━ Bio fades in ━━━━━━
      │                      (opacity: 0 → 1, y: 20 → 0)
      │
0.7s  │                      ━━━━━━ Buttons fade in ━━━━━━
      │                             (opacity: 0 → 1, y: 20 → 0)
      │
1.0s  │ All animations complete
      │
∞     │ Scroll indicator bounces continuously
```

## Component Breakdown

### 1. Gradient Background Layer
- Full viewport height (`min-h-screen`)
- CSS gradient defined in `globals.css` (`.hero-gradient`)
- Two decorative blur orbs for depth
- iOS-style colors: #007AFF → #5856D6

### 2. Content Layer (Center-aligned)
- Max width: 1024px (4xl)
- Horizontal padding: 24px (px-6)
- Vertical padding: 80px (py-20)
- Z-index: 10 (above decorative elements)

### 3. Typography Hierarchy

#### Name (H1)
- Font size: 3rem (mobile) → 4.5rem (desktop)
- Font weight: Bold (700)
- Color: White
- Margin bottom: 1rem

#### Title (H2)
- Font size: 1.25rem (mobile) → 1.875rem (desktop)
- Font weight: Medium (500)
- Color: White with 90% opacity
- Margin bottom: 1.5rem

#### Bio (P)
- Font size: 1rem (mobile) → 1.125rem (desktop)
- Color: White with 80% opacity
- Max width: 672px (2xl)
- Line height: Relaxed (1.625)
- Margin bottom: 2.5rem

### 4. CTA Buttons

#### Primary: "View My Work"
- Background: White
- Text: Primary blue (#007AFF)
- Size: Large (height: 48px)
- Min width: 200px
- Shadow: Large (hover: extra large)
- Action: Smooth scroll to #professional section
- Analytics: Tracks "View My Work" click in "hero" location

#### Secondary: "Download Resume"
- Background: White with 10% opacity + backdrop blur
- Text: White
- Border: White with 30% opacity
- Size: Large (height: 48px)
- Min width: 200px
- Action: Downloads PDF from /resume/nadav-galili-resume.pdf
- Analytics: Tracks "Download Resume" click in "hero" location

### 5. Scroll Indicator
- Position: Absolute bottom-8 center
- Animation: Bounces up and down (0 → 8px → 0) every 1.5s
- Contains: "Scroll to explore" text + ChevronDown icon
- Interactive: Clicking scrolls to work section

### 6. Decorative Elements
- Two gradient orbs with blur-3xl effect
- Positioned at 1/4 points (top-left and bottom-right)
- Low opacity (20-30%) for subtle depth
- Pointer-events disabled (non-interactive)

## Responsive Behavior

### Mobile (< 640px)
- Buttons stack vertically (flex-col)
- Smaller text sizes
- Reduced padding
- Full-width buttons

### Tablet (640px - 1024px)
- Buttons side by side (flex-row)
- Medium text sizes
- Increased spacing

### Desktop (> 1024px)
- Largest text sizes
- Maximum spacing and padding
- Side-by-side buttons with gap

## Code Example

```tsx
import HeroSection from '@/components/sections/HeroSection'
import resumeData from '@/data/resume.json'

export default function HomePage() {
  return (
    <main>
      <HeroSection personal={resumeData.personal} />
    </main>
  )
}
```

## Analytics Events

```typescript
// Tracked when user clicks "View My Work"
{
  event: 'CTA Click',
  cta: 'View My Work',
  location: 'hero',
  timestamp: '2026-01-14T...'
}

// Tracked when user clicks "Download Resume"
{
  event: 'CTA Click',
  cta: 'Download Resume',
  location: 'hero',
  timestamp: '2026-01-14T...'
}
```

## CSS Classes Used

### Custom Classes (from globals.css)
- `.hero-gradient` - iOS-style gradient background
- `.glass` - Glass morphism effect (not used in hero, but available)

### Tailwind Utilities
- Layout: `min-h-screen`, `flex`, `items-center`, `justify-center`
- Spacing: `px-6`, `py-20`, `mb-4`, `mb-6`, `mb-10`, `gap-4`
- Typography: `text-5xl`, `md:text-6xl`, `lg:text-7xl`, `font-bold`
- Colors: `text-white`, `text-white/90`, `text-white/80`
- Effects: `overflow-hidden`, `backdrop-blur-sm`, `shadow-lg`
- Positioning: `relative`, `absolute`, `z-10`
- Responsive: `sm:flex-row`, `md:text-2xl`, `lg:text-3xl`

## Spring Physics Explained

The component uses spring animations for natural, bouncy motion:

```typescript
{
  type: 'spring',
  stiffness: 100,  // How bouncy (higher = more bouncy)
  damping: 15,     // Resistance (higher = less bouncy)
}
```

This creates smooth, physics-based animations that feel natural and polished.

## Performance Considerations

1. **GPU Acceleration**: Only animates `opacity` and `transform` (y-axis)
2. **Will-change**: Framer Motion automatically adds `will-change` hints
3. **Lazy Decoration**: Decorative elements load after content
4. **Reduced Motion**: Respects `prefers-reduced-motion` via globals.css
5. **Client Component**: Marked with `'use client'` for interactivity

## Accessibility Features

- ✅ Semantic HTML (section, h1, h2, p, button, a)
- ✅ Proper heading hierarchy (h1 → h2)
- ✅ Touch targets ≥ 44x44px (buttons are 48px tall)
- ✅ Keyboard accessible (buttons and links)
- ✅ Screen reader friendly (descriptive text)
- ✅ Reduced motion support (via CSS)
- ✅ Focus indicators (outline-ring from button component)
- ✅ Link security (rel="noopener noreferrer")

## Testing Checklist

When testing this component:

- [ ] Animations play in correct order (name → title → bio → buttons)
- [ ] "View My Work" button scrolls to #professional section smoothly
- [ ] "Download Resume" button triggers PDF download
- [ ] Scroll indicator bounces continuously
- [ ] Clicking scroll indicator scrolls to work section
- [ ] Analytics events fire for both CTA buttons
- [ ] Component is responsive on mobile/tablet/desktop
- [ ] Text is readable on gradient background
- [ ] Buttons have adequate touch targets on mobile
- [ ] Component respects prefers-reduced-motion
- [ ] No layout shift during animation

## Integration with Page

To use this component in your page:

1. Import the component and resume data
2. Pass `personal` prop from resume.json
3. Ensure analytics is initialized in root layout
4. Add a section with `id="professional"` below for scroll target
5. Add resume PDF to `/public/resume/nadav-galili-resume.pdf`

## Dependencies

- `framer-motion` (^11.x) - Animation library
- `lucide-react` (^0.x) - Icon library
- `@/components/ui/button` - shadcn/ui Button component
- `@/lib/analytics` - Custom analytics utilities
- `@/types/resume` - TypeScript type definitions

## Troubleshooting

### Animations not playing
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check that component is marked with `'use client'`
- Verify no CSS is overriding Framer Motion styles

### Scroll not working
- Ensure target section has `id="professional"`
- Check that scroll-behavior is set in globals.css
- Verify JavaScript is not blocked

### Analytics not tracking
- Confirm Mixpanel is initialized in root layout
- Check NEXT_PUBLIC_MIXPANEL_TOKEN in .env.local
- Open browser console to see debug messages
- Verify analytics.ts is imported correctly

### Gradient not showing
- Check that globals.css includes `.hero-gradient` class
- Verify Tailwind is processing the CSS file
- Inspect element to see if class is applied
- Check for CSS specificity issues

### Buttons not styled correctly
- Ensure shadcn/ui button component is installed
- Verify Tailwind config includes shadcn/ui paths
- Check that CSS variables are defined in globals.css
- Inspect element for conflicting styles
