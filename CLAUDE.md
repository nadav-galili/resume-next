# CLAUDE.md

## Project Goals

**Current milestone:** MVP - a stunning resume for a full stack developer.
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **mobile-first resume web app** designed as an App Store-style product page. The primary goal is to showcase Nadav Galili's professional experience (5 years at Mobile-Brain) and indie mobile app development (Poker AI: HomeStack shipped to iOS & Android app stores).

**Target audience**: React Native/Expo recruiters and hiring managers
**Design philosophy**: Apple App Store aesthetic with level 1000 UI/UX

## Architecture

### Data-Driven Design

The entire site is driven by a **single source of truth**: `/data/resume.json`

All content (professional experience, indie projects, skills, build notes) lives in this structured JSON file. The Next.js app renders from this data at build time (SSG).

### Component Hierarchy

```
app/page.tsx (Single page, all sections)
├── HeroSection
├── ProfessionalSection (Mobile-Brain experience)
├── IndieProjectsSection (Poker AI flagship)
├── BuildNotesSection (Technical depth showcase)
├── TechStackSection
└── ContactSection
```

### Performance Strategy

- **Static Site Generation**: All pages pre-rendered at build time
- **Lazy Loading**: 3D components (`DeviceMockup3D`) load on scroll via React.lazy + Suspense
- **Animation Performance**: Only animate `transform` and `opacity` for GPU acceleration
- **Smooth Scrolling**: Lenis provides 60fps momentum scrolling

### State Management

No global state library (Redux/Zustand) - intentionally kept minimal:

- Server state: Static JSON (no runtime fetching)
- Client state: Local useState for tabs, theme toggle, scroll position (Lenis), 3D camera (React Three Fiber)

## Tech Stack

**Core**: Next.js 15 (App Router), TypeScript (strict), Tailwind CSS, shadcn/ui
**Animations**: Framer Motion, Lenis (smooth scroll)
**3D**: React Three Fiber + Drei for phone mockups
**Features**: Shiki (syntax highlighting), Mixpanel (analytics)

## Development Commands

### Initial Setup

```bash
# Install dependencies
npm install

# Copy environment variables and fill in values
cp .env.example .env.local
# Required: NEXT_PUBLIC_MIXPANEL_TOKEN, NEXT_PUBLIC_SITE_URL
```

### Development

```bash
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run start            # Serve production build locally
npm run lint             # ESLint check
npm run type-check       # TypeScript validation (if configured)
```

### shadcn/ui Components

```bash
# Add shadcn/ui components as needed
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add tabs
npx shadcn@latest add accordion
```

## Design System

### App Store Color Theme (Dark Mode Default)

- **Background**: Pure black `#000000`
- **Cards**: Dark gray `#1C1C1E`
- **Primary**: iOS blue `#007AFF`
- **Fonts**: System fonts (SF Pro on Apple devices via `-apple-system`)

Reference: `app/globals.css` for CSS custom properties

### Glass Morphism Pattern

```css
.glass {
  background: rgba(28, 28, 30, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Content Management

### Editing Resume Content

**Always edit `/data/resume.json`** - never hardcode content in components.

Structure:

```typescript
{
  personal: { name, title, bio, contact, links },
  professional: { company, role, duration, achievements, techStack },
  indieProjects: [{ name, tagline, features, buildNotes, links, metrics }],
  skills: { mobile, fullStack, backend, tools }
}
```

See `types/resume.ts` for full TypeScript interfaces.

## Key Implementation Patterns

### 3D Phone Mockups

`DeviceMockup3D.tsx` uses React Three Fiber to render iPhone/Android device frames with screenshots. Load this component lazily:

```tsx
const DeviceMockup3D = lazy(() => import('@/components/features/DeviceMockup3D'))

<Suspense fallback={<DeviceMockupSkeleton />}>
  <DeviceMockup3D />
</Suspense>
```

### Scroll-Triggered Animations

Use Framer Motion's `useInView` hook for reveal animations:

```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: "-100px" })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>
```

### Syntax Highlighting (Build Notes)

Use Shiki for code snippets. Example in `CodeSnippet.tsx`:

```tsx
import { codeToHtml } from "shiki";

const html = await codeToHtml(code, {
  lang: "typescript",
  theme: "github-dark",
});
```

## Critical Requirements

### Mobile-First

- Design for mobile FIRST, enhance for desktop
- Test in iPhone Safari, Android Chrome, and LinkedIn in-app browser
- All CTAs must be easily tappable (min 44x44px touch targets)

### Performance Targets

- Lighthouse: 95+ on all metrics
- First Contentful Paint: <1s
- Time to Interactive: <2s
- 60fps animations on mid-range phones

### Accessibility

- Respect `prefers-reduced-motion` (disable animations if set)
- WCAG AA color contrast
- Semantic HTML + ARIA labels
- Keyboard navigation support

## Phase 2: AI Chatbot (Not MVP)

When implementing the AI chatbot:

- Use Vercel AI SDK
- System prompt MUST restrict answers to `/data/resume.json` content only
- Predefined question buttons (not open-ended chat)
- Clearly marked as optional (not required for navigation)

## Deployment

**Platform**: Vercel (automatic deployments)

- **Production**: Pushes to `main` branch
- **Preview**: All PRs get preview deployments
- **Environment Variables**: Set in Vercel dashboard (never commit `.env.local`)

## What Makes This Project Different

This is **NOT a generic portfolio site**. Key differentiators:

1. **App Store aesthetic**: Mimics Apple product pages (clean, premium, dark-first)
2. **Mobile-first showcase**: The site itself demonstrates mobile dev expertise
3. **Flagship project focus**: Poker AI is treated like a real shipped product, not a demo
4. **Build Notes section**: Shows engineering judgment, not just features
5. **Professional + Indie balance**: Credibility (Mobile-Brain) + Initiative (Poker AI)

## Content Priorities

When editing or suggesting changes:

1. **React Native/Expo positions** are the primary target (optimize for this first)
2. Mobile-Brain establishes credibility (5 years professional)
3. Poker AI proves end-to-end shipping ability (indie craft)
4. Build Notes demonstrate technical depth (architecture, performance, tradeoffs)

## Important Files to Reference

- `project_spec.md`: Complete technical specification
- `brainstorm.md`: Product vision and goals
- `/data/resume.json`: Single source of truth for all content
- `types/resume.ts`: TypeScript interfaces for resume data structure
