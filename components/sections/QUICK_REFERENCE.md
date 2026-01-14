# Quick Reference - Section Components

## HeroSection

### Import & Usage
```tsx
import HeroSection from '@/components/sections/HeroSection'
import resumeData from '@/data/resume.json'

<HeroSection personal={resumeData.personal} />
```

### Props
| Prop | Type | Required | Source |
|------|------|----------|--------|
| `personal` | `PersonalInfo` | ✅ Yes | `resume.json` → `personal` |

### Key Features
- ✅ Full viewport gradient hero
- ✅ Staggered Framer Motion animations
- ✅ Two CTA buttons (scroll + download)
- ✅ Analytics tracking
- ✅ Mobile-first responsive
- ✅ Spring physics animations
- ✅ Animated scroll indicator

### Dependencies
```json
{
  "framer-motion": "^11.x",
  "lucide-react": "^0.x"
}
```

### Files Created
```
components/sections/
├── HeroSection.tsx          # Main component
├── HeroSection.example.tsx  # Usage example
├── HeroSection.md           # Detailed docs
├── README.md                # All sections docs
└── TESTING.md               # Testing guide
```

### Quick Test
1. Run dev server: `npm run dev`
2. Navigate to page with HeroSection
3. Check animations play in order
4. Click "View My Work" → scrolls smoothly
5. Click "Download Resume" → downloads PDF
6. Check analytics in console (debug mode)

### Common Issues
| Problem | Solution |
|---------|----------|
| Animations not playing | Check Framer Motion installed + 'use client' |
| Gradient not showing | Verify `.hero-gradient` in globals.css |
| Scroll not working | Ensure `#professional` section exists |
| Analytics not tracking | Check Mixpanel token in .env.local |

### Animation Timeline
```
0.1s: Name appears
0.3s: Title appears
0.5s: Bio appears
0.7s: Buttons appear
∞:    Scroll indicator bounces
```

### Responsive Breakpoints
| Size | Width | Layout |
|------|-------|--------|
| Mobile | < 640px | Stacked buttons, small text |
| Tablet | 640-1024px | Side-by-side buttons, medium text |
| Desktop | > 1024px | Side-by-side buttons, large text |

### Analytics Events
```typescript
trackCTAClick('View My Work', 'hero')
trackCTAClick('Download Resume', 'hero')
```

### Required Assets
- `/public/resume/nadav-galili-resume.pdf`

### Color Palette
- Background: Linear gradient #007AFF → #5856D6
- Text: White (#FFFFFF)
- Primary button: White bg, blue text
- Secondary button: White/10 bg + backdrop blur

### Performance
- Target: 60fps animations
- GPU-accelerated: ✅ (transform + opacity only)
- Bundle impact: ~15KB (with Framer Motion)
- Lighthouse: 95+ expected

---

## Component Status

| Component | Status | File | Docs |
|-----------|--------|------|------|
| HeroSection | ✅ Complete | `HeroSection.tsx` | ✅ Full |
| ProfessionalSection | ✅ Complete | `ProfessionalSection.tsx` | ✅ Full |
| IndieProjectsSection | ⏳ Pending | - | - |
| BuildNotesSection | ⏳ Pending | - | - |
| TechStackSection | ✅ Complete | `TechStackSection.tsx` | ⏳ Basic |
| ContactSection | ✅ Complete | `ContactSection.tsx` | ⏳ Basic |

---

## Development Workflow

### Before Starting a New Component
1. Read `/data/resume.json` to understand data structure
2. Review `/types/resume.ts` for TypeScript types
3. Check `app/globals.css` for available styles
4. Review existing components for patterns

### Creating a Component
1. Create `ComponentName.tsx` in `/components/sections/`
2. Mark as client component if interactive: `'use client'`
3. Import necessary dependencies
4. Define props interface
5. Implement component logic
6. Add animations (Framer Motion)
7. Add analytics tracking
8. Test responsive behavior

### After Creating a Component
1. Create usage example: `ComponentName.example.tsx`
2. Update `README.md` with component docs
3. Add testing notes to `TESTING.md`
4. Test in dev mode: `npm run dev`
5. Run type check: `npm run build`
6. Commit changes with descriptive message

### Code Style
- Use TypeScript strict mode (no `any`)
- Follow existing naming conventions
- Mobile-first responsive design
- Respect `prefers-reduced-motion`
- Add JSDoc comments for complex logic
- Use semantic HTML
- WCAG AA accessibility

---

## Essential Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build + type check
npm run start            # Serve production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript validation

# shadcn/ui
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add tabs

# Git
git checkout -b feature/component-name
git add .
git commit -m "feat: add ComponentName section"
git push -u origin feature/component-name
```

---

## Data Sources

All content comes from `/data/resume.json`:

```typescript
{
  personal: {
    name, title, bio, email, location, links
  },
  professional: [{
    company, role, duration, achievements, techStack
  }],
  indieProjects: [{
    name, tagline, features, buildNotes, links, metrics
  }],
  skills: {
    mobile, fullStack, backend, tools
  }
}
```

---

## Useful Imports

```typescript
// Animations
import { motion, useInView } from 'framer-motion'

// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Analytics
import { trackCTAClick, trackSectionView } from '@/lib/analytics'

// Types
import type { PersonalInfo, ProfessionalExperience, IndieProject } from '@/types/resume'

// Icons
import { ChevronDown, Github, Linkedin } from 'lucide-react'

// Data
import resumeData from '@/data/resume.json'
```

---

## Design Tokens (globals.css)

### Colors
```css
--primary: oklch(60% 0.22 250);      /* iOS blue #007AFF */
--background: oklch(0% 0 0);         /* Black #000000 (dark) */
--foreground: oklch(100% 0 0);       /* White (dark) */
--card: oklch(18% 0 0);              /* Dark gray #1C1C1E */
--muted-foreground: oklch(66% 0 0);  /* Gray #949494 */
```

### Custom Classes
```css
.hero-gradient { /* iOS blue → purple */ }
.glass { /* Glass morphism */ }
```

### Typography Scale
```css
text-5xl  /* 3rem / 48px */
text-6xl  /* 3.75rem / 60px */
text-7xl  /* 4.5rem / 72px */
```

---

## Animation Patterns

### Scroll-Triggered Reveal
```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: "-100px" })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
/>
```

### Stagger Children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.div variants={container} initial="hidden" animate="show">
  <motion.div variants={item}>Item 1</motion.div>
  <motion.div variants={item}>Item 2</motion.div>
</motion.div>
```

### Spring Physics
```tsx
transition={{
  type: 'spring',
  stiffness: 100,
  damping: 15
}}
```

---

## Accessibility Checklist

- [ ] Semantic HTML (section, header, main, footer)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Touch targets ≥ 44x44px
- [ ] WCAG AA color contrast
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] Screen reader labels
- [ ] `prefers-reduced-motion` support
- [ ] Link security (rel="noopener noreferrer")

---

## Next Steps

1. ✅ HeroSection complete
2. ✅ ProfessionalSection complete
3. ⏳ IndieProjectsSection - Next priority
4. ⏳ BuildNotesSection - Technical depth
5. ✅ TechStackSection - Skills showcase
6. ✅ ContactSection - Links and CTA

---

## Support & Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Mixpanel Docs](https://developer.mixpanel.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
