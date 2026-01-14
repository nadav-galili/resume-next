# Integration Guide: ProfessionalSection

This guide shows how to integrate the ProfessionalSection component into your Next.js application.

## Step 1: Import the Component

In your `app/page.tsx` or any page component:

```tsx
import { ProfessionalSection } from '@/components/sections/ProfessionalSection'
import resumeData from '@/data/resume.json'
```

## Step 2: Add to Your Page

```tsx
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Other sections like HeroSection */}

      <ProfessionalSection experience={resumeData.professional[0]} />

      {/* Other sections like IndieProjectsSection */}
    </main>
  )
}
```

## Step 3: Verify Data Structure

Make sure your `/data/resume.json` has the correct structure:

```json
{
  "professional": [
    {
      "company": "Mobile-Brain",
      "role": "Full-Stack Developer",
      "duration": "5 years",
      "startDate": "2020-01-01",
      "description": "Leading development of enterprise web applications...",
      "achievements": [
        {
          "title": "Achievement Title",
          "description": "Achievement description...",
          "metrics": "40% improvement",
          "impact": "Increased user retention by 28%"
        }
      ],
      "techStack": ["React", "TypeScript", "Node.js"],
      "location": "Tel Aviv, Israel"
    }
  ]
}
```

## Step 4: Install Dependencies (if needed)

The component requires the following dependencies:

```bash
npm install framer-motion
```

If you haven't already added the shadcn/ui components:

```bash
npx shadcn@latest add card
npx shadcn@latest add separator
```

## Step 5: Verify Styling

The component uses custom classes from `app/globals.css`. Make sure these are present:

```css
/* Glass morphism effect */
.glass {
  background: rgba(28, 28, 30, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Complete Example

### Full Page Implementation

```tsx
// app/page.tsx
import { ProfessionalSection } from '@/components/sections/ProfessionalSection'
import { HeroSection } from '@/components/sections/HeroSection'
import resumeData from '@/data/resume.json'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero with gradient */}
      <HeroSection personal={resumeData.personal} />

      {/* Professional Experience */}
      <ProfessionalSection experience={resumeData.professional[0]} />

      {/* Add other sections as they're built */}
    </main>
  )
}
```

## Navigation Integration

If you have a sticky header with navigation links:

```tsx
// components/layout/Header.tsx
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <nav>
        <a href="#professional" className="hover:text-primary">
          Experience
        </a>
        {/* Other nav links */}
      </nav>
    </header>
  )
}
```

The section has `id="professional"` and `scroll-mt-20` for proper scroll positioning.

## Customization

### Change Animation Timing

Edit the component's animation variants:

```tsx
// In ProfessionalSection.tsx
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // Change stagger delay
      delayChildren: 0.2,    // Change initial delay
    },
  },
}
```

### Change Grid Layout

Modify the grid classes:

```tsx
// Default: 2 columns on sm and up
<div className="grid gap-6 sm:grid-cols-2">

// Change to 3 columns on large screens:
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

### Customize Colors

The component uses CSS variables from globals.css:

```css
:root.dark {
  --primary: oklch(60% 0.22 250);     /* Change iOS blue */
  --card: oklch(18% 0 0);             /* Change card background */
  --border: oklch(32% 0 0);           /* Change border color */
}
```

## Troubleshooting

### Animations Not Triggering

1. Make sure `framer-motion` is installed
2. Check browser console for errors
3. Verify the component is in viewport
4. Check if `prefers-reduced-motion` is enabled (animations will be minimal)

### Glass Effect Not Showing

1. Verify `.glass` class is in `globals.css`
2. Check browser support for `backdrop-filter`
3. Ensure parent elements don't have `overflow: hidden`

### TypeScript Errors

1. Make sure types are imported from `@/types/resume`
2. Verify `resume.json` matches the `ProfessionalExperience` interface
3. Check `tsconfig.json` has proper path aliases configured

### Layout Issues

1. Verify parent has proper width (not constrained)
2. Check for conflicting CSS
3. Ensure responsive utilities are loading (check Tailwind config)

## Performance Tips

1. **Lazy Loading**: The component uses `useInView` with `once: true` - animations trigger once
2. **GPU Acceleration**: All animations use `transform` and `opacity`
3. **Minimal Re-renders**: Component is stateless and won't re-render unnecessarily
4. **Code Splitting**: If the page is large, consider lazy loading:

```tsx
import dynamic from 'next/dynamic'

const ProfessionalSection = dynamic(
  () => import('@/components/sections/ProfessionalSection').then(
    mod => ({ default: mod.ProfessionalSection })
  ),
  { loading: () => <div className="min-h-screen">Loading...</div> }
)
```

## Accessibility Checklist

- [x] Semantic HTML structure
- [x] Proper heading hierarchy (h2 → h3)
- [x] Section landmark with ID
- [x] Keyboard navigation support
- [x] WCAG AA color contrast
- [x] Touch target sizes (44x44px+)
- [x] Respects `prefers-reduced-motion`
- [x] Screen reader friendly

## Testing

Test the component in different scenarios:

```bash
# Development server
npm run dev

# Production build
npm run build && npm run start

# Lint check
npm run lint
```

### Browser Testing

- Chrome Desktop
- Safari Desktop
- Chrome Mobile (Android)
- Safari Mobile (iOS)
- LinkedIn in-app browser (important for resume sites!)

### Viewport Testing

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1440px (MacBook Pro)
- Large Desktop: 1920px

## Next Steps

After integrating ProfessionalSection:

1. Add `IndieProjectsSection` for Poker AI showcase
2. Add `BuildNotesSection` for technical depth
3. Add `TechStackSection` for skills visualization
4. Add `ContactSection` for links and downloads
5. Implement smooth scroll behavior (Lenis)
6. Add analytics tracking (Mixpanel)
7. Test on real devices
8. Deploy to Vercel

## Support

If you encounter issues:

1. Check the component's TypeScript types in `types/resume.ts`
2. Review the data structure in `data/resume.json`
3. Read the detailed spec in `PROFESSIONAL_SECTION_SPEC.md`
4. Check the example usage in `ProfessionalSection.example.tsx`
5. Review animation patterns in the main component file
