# CLAUDE.md

## Project Goals

**Current milestone:** MVP - a stunning resume for a full stack developer.

---

## Architecture Overview

### Project Structure

```
resume/
├── app/
│   ├── layout.tsx           # Root layout, fonts, providers
│   ├── page.tsx             # Home page (all sections)
│   ├── globals.css          # Tailwind + custom App Store theme
│   └── fonts/               # Font files (if needed)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Sticky navigation
│   │   └── Footer.tsx       # Contact links, social icons
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx              # Hero with gradient background
│   │   ├── ProfessionalSection.tsx      # Mobile-Brain experience
│   │   ├── IndieProjectsSection.tsx     # Poker AI showcase
│   │   ├── BuildNotesSection.tsx        # Technical depth
│   │   ├── AILLMToolsSection.tsx        # AI/LLM tools proficiency (Claude Code, Cursor IDE)
│   │   ├── TechStackSection.tsx         # Skills grid
│   │   └── ContactSection.tsx           # Links & resume downloads
│   │
│   ├── features/
│   │   ├── DeviceMockup3D.tsx          # 3D phone mockups
│   │   ├── CodeSnippet.tsx             # Shiki syntax highlighting
│   │   ├── TechLogo.tsx                # Hoverable tech icons
│   │   └── AppStoreBadge.tsx           # iOS/Android badges
│   │
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── accordion.tsx
│   │
│   └── providers/
│       ├── SmoothScrollProvider.tsx    # Lenis wrapper
│       └── AnalyticsProvider.tsx       # Mixpanel integration
│
├── data/
│   └── resume.json          # Single source of truth for all content
│
├── lib/
│   ├── utils.ts             # clsx + tailwind-merge helper
│   ├── analytics.ts         # Mixpanel setup
│   └── constants.ts         # App Store colors, breakpoints
│
├── public/
│   ├── images/
│   │   ├── poker-ai/        # App screenshots
│   │   ├── tech-logos/      # Technology icons
│   │   └── favicon/         # Favicons
│   │
│   ├── resume/
│   │   ├── nadav-galili-resume.pdf
│   │   └── nadav-galili-resume.docx
│   │
│   └── robots.txt
│
├── styles/
│   └── app-store-theme.css  # Custom App Store colors
│
├── types/
│   └── resume.ts            # TypeScript interfaces for resume data
│
├── .env.example             # Environment variables template
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Data Source Layer                       │
│  /data/resume.json (Single Source of Truth)                 │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ├──> Server Components (SSR/SSG)
                   │    └──> Pre-render with resume data
                   │
                   ├──> Client Components (Interactive)
                   │    └──> Animations, 3D, Scroll effects
                   │
                   └──> AI Chatbot (Phase 2)
                        └──> Query resume data via AI SDK
```

**Key Principles**:

1. **Build Time**: Next.js reads `/data/resume.json` and pre-renders static pages
2. **Runtime**: Client components hydrate with animations and interactions
3. **User Interaction**: Framer Motion + Lenis handle scroll-based animations
4. **Analytics**: Mixpanel tracks user behavior (page views, CTA clicks, section visibility)

---

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
├── AILLMToolsSection (AI-powered development with Claude Code & Cursor IDE)
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

## Design Style Guide

### Design Philosophy

- **Inspiration**: Apple App Store product pages + Linear.app + Stripe docs
- **Approach**: Clean, premium, dark-first aesthetic
- **Mobile-First**: Perfect on phones, stunning on desktop
- **Performance**: 60fps animations, <1s load time
- **Accessibility**: WCAG AA compliant

### App Store Color Theme

#### Dark Mode (Default)

```css
--background: 0 0% 0%; /* Pure black #000000 */
--card: 0 0% 11%; /* Dark gray #1C1C1E */
--primary: 213 100% 50%; /* iOS blue #007AFF */
--foreground: 0 0% 100%; /* White text */
--muted: 0 0% 58%; /* Gray text #949494 */
--border: 0 0% 20%; /* Subtle borders */
--accent: 213 100% 50%; /* iOS blue accent */
```

#### Light Mode (Optional)

```css
--background: 0 0% 100%; /* White */
--card: 0 0% 96%; /* Light gray */
--primary: 213 100% 50%; /* iOS blue */
--foreground: 0 0% 0%; /* Black text */
--muted: 0 0% 45%; /* Gray text */
```

#### Gradients & Effects

```css
/* Hero gradient */
.hero-gradient {
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
}

/* Glass morphism */
.glass {
  background: rgba(28, 28, 30, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Typography

- **System Fonts**: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui`
- **SF Pro on Apple devices**: Native iOS/macOS fonts
- **Principle**: Typography with breathing room, generous whitespace

### Visual Style

- Clean, generous whitespace
- Glass morphism + depth shadows
- Gradient accents (subtle, not overwhelming)
- Device mockups with realistic depth
- iOS/Android platform badges

### Animation Strategy

- **Scroll-triggered reveals**: Framer Motion with `useInView`
- **Physics-based micro-interactions**: Spring animations
- **3D phone mockups**: Rotate/float on scroll
- **Parallax effects**: Subtle, not distracting
- **Stagger animations**: For lists/grids
- **GPU acceleration**: Only animate `transform` and `opacity`
- **Performance**: 60fps target, respect `prefers-reduced-motion`

## Content Management

### Editing Resume Content

**Always edit `/data/resume.json`** - never hardcode content in components.

Structure:

```typescript
{
  personal: { name, title, bio, contact, links },
  professional: { company, role, duration, achievements, techStack },
  indieProjects: [{ name, tagline, features, buildNotes, links, metrics }],
  aiTools: { title, description, tools, workflow, results },
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

---

## Constraints & Policies

### Security - MUST follow:

- **NEVER expose API keys to the client** - server-side only
- **ALWAYS use environment variables for secrets** (see `.env.example`)
- **NEVER commit `.env.local`** or any file with API keys
- **Validate and sanitize all user input** (if Phase 2 chatbot is implemented)

### Code Quality:

- **TypeScript strict mode** - no exceptions
- **Run `npm run lint` before committing**
- **No `any` types without justification** - use proper TypeScript types
- **Component organization**: Follow the established folder structure
- **Naming conventions**: PascalCase for components, camelCase for functions/variables

### Dependencies:

- **Prefer shadcn/ui components** over adding new UI libraries
- **Minimize external dependencies** for MVP - keep bundle size small
- **Justify new dependencies** - explain why existing tools won't work

### Performance:

- **Lazy load heavy components** (3D, large images)
- **Optimize images**: Use Next.js Image component, WebP/AVIF formats
- **Monitor bundle size**: Keep total JS bundle under 200KB (gzipped)
- **GPU-accelerated animations only**: Use `transform` and `opacity`

### Content:

- **Always edit `/data/resume.json`** - never hardcode content in components
- **Maintain single source of truth** - all content comes from resume.json
- **Type-safe content**: Use TypeScript interfaces from `types/resume.ts`

---

## Repository Etiquette

### Branching:

- **ALWAYS create a feature branch** before starting major changes
- **NEVER commit directly to `main`**
- **Branch naming**: `feature/description` or `fix/description`

### Git workflow for major changes:

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Develop and commit on the feature branch
3. Test locally before pushing:
   - `npm run dev` - start dev server at localhost:3000
   - `npm run lint` - check for linting errors
   - `npm run build` - production build to catch type errors
4. Push the branch: `git push -u origin feature/your-feature-name`
5. Create a PR to merge into `main`
6. Use the `/update-docs-and-commit` slash command for commits - this ensures docs are updated alongside code changes

### Commits:

- Write clear commit messages describing the change
- Keep commits focused on single changes

### Pull Requests:

- Create PRs for all changes to `main`
- **NEVER force push to `main`**
- Include description of what changed and why

### Before pushing:

1. Run `npm run lint`
2. Run `npm run build` to catch type errors

---

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

## Documentation

- [Project Spec](project_spec.md): Complete technical specification.
- [Architecture](docs/architecture.md) - System design and data flow
- [Changelog](docs/changelog.md) - Version history
- [Project Status](docs/project_status.md) - Current progress
- `brainstorm.md`: Product vision and goals
- `/data/resume.json`: Single source of truth for all content
- `types/resume.ts`: TypeScript interfaces for resume data structure
- Update files in the docs folder after major milestones and major additions to the project.
- Use the /update-docs-and-commit slash commands when making git commits.
