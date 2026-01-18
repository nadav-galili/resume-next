# Architecture Documentation

**Project**: Resume Web App
**Last Updated**: 2026-01-14
**Status**: Planning Phase

---

## System Overview

### Purpose
This is a **mobile-first, static resume web application** designed with an Apple App Store aesthetic. The application serves as a professional portfolio showcasing:

- 5 years of full-stack development experience at Mobile-Brain
- Indie mobile app development (Poker AI: HomeStack on iOS & Android)
- Technical depth through detailed build notes
- Production-ready engineering skills

### Target Audience
- React Native / Expo recruiters and hiring managers (primary)
- Full-stack development positions
- Mobile development roles

### Architecture Type
**Static Site Generation (SSG)** with client-side interactivity

- **Build Time**: All pages pre-rendered from structured JSON data
- **Runtime**: Minimal JavaScript for animations, 3D graphics, and analytics
- **Deployment**: Vercel Edge Network for global CDN distribution

### Core Principles

1. **Data-Driven**: Single source of truth in `/data/resume.json`
2. **Performance-First**: <1s load time, 60fps animations, Lighthouse 95+
3. **Mobile-First**: Optimized for phone/tablet, enhanced for desktop
4. **Minimal State**: No global state management, local React state only
5. **Type-Safe**: TypeScript strict mode throughout

### Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | React framework with SSG |
| **Language** | TypeScript (strict) | Type safety |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS + components |
| **Animations** | Framer Motion + Lenis | Scroll animations + smooth scrolling |
| **3D Graphics** | React Three Fiber + Drei | 3D phone mockups |
| **Syntax Highlighting** | Shiki | Code snippets in Build Notes |
| **Analytics** | Mixpanel | User behavior tracking |
| **Deployment** | Vercel | Automatic deployments |

---

## Data Flow

### Build-Time Data Flow

```
┌──────────────────────────────────────────────────────┐
│  Source: /data/resume.json                           │
│  (Personal info, experience, projects, skills)       │
└────────────────┬─────────────────────────────────────┘
                 │
                 ├─> TypeScript Validation
                 │   (types/resume.ts interfaces)
                 │
                 ├─> Next.js Build Process
                 │   │
                 │   ├─> Server Components
                 │   │   └─> Read resume.json
                 │   │       └─> Render static HTML
                 │   │
                 │   ├─> CSS Generation
                 │   │   └─> Tailwind purges unused styles
                 │   │
                 │   └─> Asset Optimization
                 │       ├─> Image optimization (WebP/AVIF)
                 │       ├─> Font subsetting
                 │       └─> Bundle minification
                 │
                 └─> Static HTML/CSS/JS Output
                     └─> Deployed to Vercel Edge Network
```

**Key Steps**:

1. **Data Loading**: Next.js reads `/data/resume.json` during build
2. **Type Validation**: TypeScript checks data against `ResumeData` interface
3. **Server Rendering**: Server components generate static HTML with resume data
4. **Asset Processing**: Images, fonts, and scripts optimized automatically
5. **Static Output**: Pre-rendered pages ready for instant serving

### Runtime Data Flow

```
User Visits Site
    │
    ├─> HTML Served (instant, from CDN)
    │   └─> Static content visible immediately
    │
    ├─> JavaScript Hydration
    │   ├─> React hydrates client components
    │   ├─> Lenis initializes smooth scrolling
    │   └─> Framer Motion sets up scroll observers
    │
    ├─> Progressive Enhancement
    │   ├─> 3D components lazy load on scroll
    │   ├─> Animations trigger on intersection
    │   └─> Mixpanel tracks user behavior
    │
    └─> User Interactions
        ├─> Scroll → Animations + 3D rotations
        ├─> Tab Changes → Build Notes navigation
        ├─> CTA Clicks → Tracked events
        └─> Link Clicks → External navigation
```

**Key Points**:

- **Instant First Paint**: Static HTML served from edge network (<100ms)
- **Progressive Enhancement**: Core content works without JS, animations enhance
- **Lazy Loading**: Heavy components (3D) only load when visible
- **Analytics**: Mixpanel events sent asynchronously (non-blocking)

### User Interaction Flow

```
User Scrolls Page
    │
    ├─> Lenis Smooth Scroll
    │   └─> Updates scroll position smoothly (60fps)
    │
    ├─> Framer Motion Observers
    │   ├─> Detect sections entering viewport
    │   └─> Trigger reveal animations
    │       └─> Fade in + slide up effects
    │
    ├─> 3D Phone Mockups
    │   └─> Rotate based on scroll position
    │       └─> React Three Fiber canvas updates
    │
    └─> Analytics Tracking
        └─> Mixpanel: Section visibility events
```

### Data Update Flow (Content Changes)

```
Developer Updates /data/resume.json
    │
    ├─> Local Testing
    │   └─> npm run dev (hot reload)
    │
    ├─> Git Commit & Push
    │   └─> Trigger Vercel deployment
    │
    ├─> Vercel Build
    │   ├─> Install dependencies
    │   ├─> Run TypeScript check
    │   ├─> Build static pages with new data
    │   └─> Optimize assets
    │
    └─> Deploy to Production
        └─> New static site live on edge network
```

---

## Component Architecture

### Frontend Components

#### Layer 1: Root Layout

**app/layout.tsx**
- Purpose: App-wide wrapper with providers and global settings
- Responsibilities:
  - System font loading (SF Pro fallback)
  - Theme provider (dark/light mode)
  - Lenis smooth scroll provider
  - Mixpanel analytics provider
  - Global CSS imports (Tailwind + custom)

```tsx
// Pseudo-structure
export default function RootLayout({ children }) {
  return (
    <html>
      <body className="font-system">
        <AnalyticsProvider>
          <SmoothScrollProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </SmoothScrollProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
```

#### Layer 2: Page Layout Components

**components/layout/Header.tsx**
- Sticky navigation (desktop)
- Smooth scroll anchors to sections
- Mobile menu toggle (hamburger)
- Minimal, semi-transparent background

**components/layout/Footer.tsx**
- Contact links (email, LinkedIn, GitHub)
- Social icons
- Copyright notice
- Download resume buttons

#### Layer 3: Section Components

All sections are **client components** (`'use client'`) for animations.

**components/sections/HeroSection.tsx**
- Purpose: Immediate impact, establish identity
- Data: `personal.name`, `personal.title`, `personal.bio`
- Features:
  - Animated gradient background
  - Large typography with fade-in animation
  - Primary CTA: "View My Work" (smooth scroll)
  - Secondary CTA: "Download Resume"

**components/sections/ProfessionalSection.tsx**
- Purpose: Establish credibility with 5 years at Mobile-Brain
- Data: `professional.company`, `professional.role`, `professional.achievements`
- Features:
  - Timeline visualization
  - Key highlights in card format
  - Tech stack used professionally
  - Expandable achievement details

**components/sections/IndieProjectsSection.tsx**
- Purpose: Showcase Poker AI (flagship indie project)
- Data: `indieProjects[0]` (Poker AI)
- Features:
  - **3D phone mockups** (iPhone + Android) with screenshots
  - Feature cards (AI insights, tracking, coaching)
  - Platform badges (App Store + Google Play)
  - "Indie Project" badge to distinguish from work

**components/sections/BuildNotesSection.tsx**
- Purpose: Demonstrate technical depth and engineering judgment
- Data: `indieProjects[0].buildNotes`
- Features:
  - **Tabbed interface**: Architecture, Performance, Deployment, Tradeoffs
  - **Code snippets** with Shiki syntax highlighting
  - Before/after metrics
  - Engineering blog post aesthetic

**components/sections/AILLMToolsSection.tsx**
- Purpose: Showcase proficiency with cutting-edge AI development tools
- Data: `aiTools.tools`, `aiTools.workflow`, `aiTools.results`
- Features:
  - **Tool cards** highlighting Claude Code and Cursor IDE
  - **Workflow visualization** showing AI-augmented development process
  - **Impact metrics** (3x faster delivery, 80% planning reduction)
  - Glass morphism styling with hover effects
  - Scroll-triggered animations with Framer Motion
  - Demonstrates modern development practices and competitive advantage

**components/sections/TechStackSection.tsx**
- Purpose: Show relevant skills without overwhelming
- Data: `skills.mobile`, `skills.fullStack`, `skills.backend`, `skills.tools`
- Features:
  - Animated grid of tech logos
  - Hover effects revealing proficiency context
  - Grouped by category (Mobile, Full-Stack, Backend, Tools)
  - Visual distinction for primary vs. secondary skills

**components/sections/ContactSection.tsx**
- Purpose: Enable recruiter action
- Data: `personal.email`, `personal.links`
- Features:
  - Email link (mailto)
  - Social links (LinkedIn, GitHub)
  - Download buttons (PDF + Word resume)
  - Prominent app store badges for Poker AI

#### Layer 4: Feature Components

**components/features/DeviceMockup3D.tsx**
- Technology: React Three Fiber + Drei
- Purpose: Render realistic 3D phone mockups with screenshots
- Features:
  - iPhone and Android device frames
  - Screenshots as textures
  - Rotate on scroll interaction
  - Realistic shadows and lighting
- Performance:
  - **Lazy loaded** (React.lazy + Suspense)
  - Only renders when section is visible
  - GPU-accelerated via WebGL

**components/features/CodeSnippet.tsx**
- Technology: Shiki
- Purpose: Syntax-highlighted code blocks in Build Notes
- Features:
  - Supports TypeScript, JavaScript, JSON, etc.
  - GitHub Dark theme (matches App Store aesthetic)
  - Copy-to-clipboard button
  - Line numbers (optional)

**components/features/TechLogo.tsx**
- Purpose: Hoverable tech logo with tooltip
- Features:
  - SVG or PNG logo
  - Tooltip on hover (proficiency level or context)
  - Animate on hover (subtle scale + glow)
  - Accessibility: ARIA labels

**components/features/AppStoreBadge.tsx**
- Purpose: Official Apple/Google download badges
- Features:
  - SVG badges (Download on App Store / Get it on Google Play)
  - External links to Poker AI
  - Hover effects
  - Analytics tracking on click

**components/features/AnimatedCard.tsx**
- Purpose: Reusable card with scroll reveal animation
- Technology: Framer Motion
- Features:
  - Fade in + slide up on scroll
  - Glass morphism background
  - Configurable animation delay (for stagger)

#### Layer 5: UI Components (shadcn/ui)

Copied from shadcn/ui, customized with App Store theme:

- **Button**: Primary (iOS blue) + Secondary (outline)
- **Card**: Glass morphism container
- **Tabs**: Build Notes navigation
- **Accordion**: Expandable content
- **Separator**: Visual dividers

All components use Tailwind CSS with custom App Store color variables.

#### Layer 6: Provider Components

**components/providers/SmoothScrollProvider.tsx**
- Technology: Lenis
- Purpose: Enable buttery smooth 60fps scrolling
- Implementation:
  ```tsx
  'use client'
  import Lenis from '@studio-freight/lenis'

  export function SmoothScrollProvider({ children }) {
    useEffect(() => {
      const lenis = new Lenis({ duration: 1.2, easing: (t) => t })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }, [])

    return children
  }
  ```

**components/providers/AnalyticsProvider.tsx**
- Technology: Mixpanel
- Purpose: Track user behavior
- Events:
  - Page view
  - Section visibility (scroll tracking)
  - CTA clicks
  - App Store badge clicks
  - Build Notes tab changes

### API Layer

**Current State**: No API layer in MVP

The application is fully static with no backend API routes.

**Phase 2 (AI Chatbot)**: Will add API routes

**app/api/chat/route.ts** (Future)
- HTTP Method: POST
- Purpose: Handle AI chatbot queries
- Technology: Vercel AI SDK
- Flow:
  1. Receive user question
  2. Load `/data/resume.json`
  3. Query AI with system prompt: "Answer only from this data"
  4. Stream response back to client
- Security:
  - Rate limiting via Vercel Edge Config
  - API key stored server-side only
  - Input validation and sanitization

### Development Tooling

#### .mcp.json
**Purpose**: Model Context Protocol (MCP) server configuration for Claude Code integration

```json
{
  "mcpServers": {
    "vercel": {
      "type": "http",
      "url": "https://mcp.vercel.com",
      "headers": {
        "Authorization": "Bearer ${VERCEL_MCP_TOKEN}"
      }
    },
    "shadcn": {
      "type": "stdio",
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

**MCP Servers**:
- **Vercel**: Deployment and project management integration
- **shadcn**: Direct access to shadcn/ui component documentation and registry
- **Playwright**: Browser automation for testing and interaction

### Hooks Module

#### hooks/useAnalytics.ts
**Purpose**: Reusable analytics hook for components

```typescript
export function useAnalytics() {
  return {
    track,           // Generic event tracking
    trackCTA,        // Button clicks
    trackLink,       // External links
    trackSection,    // Section views (deduped)
    trackProject,    // Project interactions
    trackScroll,     // Scroll depth milestones
    trackResumeDownload, // Resume downloads
    trackThemeChange,    // Theme toggle
    trackNavigation,     // Nav clicks
    trackTimeOnPage,     // Time tracking
  }
}
```

#### hooks/useSectionTracking.ts
**Purpose**: Automatic section view tracking via Intersection Observer

```typescript
// Track when section enters viewport
export function useSectionTracking(sectionName: string) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  // Tracks section view when visible
  return ref
}

// Track scroll depth milestones (25%, 50%, 75%, 100%)
export function useScrollDepthTracking() { ... }

// Track time on page (30s, 60s, 120s, 300s)
export function useTimeOnPage() { ... }
```

### Library Modules

#### lib/utils.ts
**Purpose**: Utility functions

```typescript
// clsx + tailwind-merge for className management
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Used throughout components for conditional Tailwind classes.

#### lib/analytics.ts
**Purpose**: Mixpanel integration

```typescript
import mixpanel from 'mixpanel-browser'

export const analytics = {
  init: () => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!)
  },

  track: (event: string, properties?: object) => {
    mixpanel.track(event, properties)
  },

  trackPageView: () => {
    mixpanel.track('Page View')
  },

  trackSectionView: (section: string) => {
    mixpanel.track('Section View', { section })
  },

  trackCTAClick: (cta: string) => {
    mixpanel.track('CTA Click', { cta })
  }
}
```

#### lib/constants.ts
**Purpose**: App Store theme constants

```typescript
// App Store color palette
export const COLORS = {
  background: '#000000',
  card: '#1C1C1E',
  primary: '#007AFF',
  foreground: '#FFFFFF',
  muted: '#949494',
  border: '#333333',
} as const

// Breakpoints (mobile-first)
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const

// Animation durations
export const ANIMATION = {
  fast: 0.2,
  normal: 0.6,
  slow: 1.0,
} as const
```

#### types/resume.ts
**Purpose**: TypeScript interfaces for resume data

```typescript
export interface ResumeData {
  personal: PersonalInfo
  professional: ProfessionalExperience
  indieProjects: IndieProject[]
  aiTools?: AITools
  skills: Skills
}

export interface PersonalInfo {
  name: string
  title: string
  bio: string
  email: string
  location?: string
  links: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}

export interface ProfessionalExperience {
  company: string
  role: string
  duration: string
  startDate: string
  endDate?: string
  description: string
  achievements: Achievement[]
  techStack: string[]
}

export interface Achievement {
  title: string
  description: string
  metrics?: string
}

export interface IndieProject {
  name: string
  tagline: string
  description: string
  platforms: ('iOS' | 'Android')[]
  features: Feature[]
  techStack: string[]
  buildNotes: BuildNotes
  links: ProjectLinks
  metrics?: ProjectMetrics
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface BuildNotes {
  architecture: string[]
  performance: string[]
  deployment: string[]
  tradeoffs: string[]
}

export interface ProjectLinks {
  appStore?: string
  playStore?: string
  github?: string
  website?: string
}

export interface ProjectMetrics {
  downloads?: string
  rating?: number
  users?: string
}

export interface Skills {
  mobile: string[]
  fullStack: string[]
  backend: string[]
  tools: string[]
}
```

---

## Component Relationships

```
app/layout.tsx (Root)
│
├─> Providers
│   ├─> AnalyticsProvider (Mixpanel)
│   ├─> SmoothScrollProvider (Lenis)
│   └─> ThemeProvider (Dark/Light)
│
└─> app/page.tsx (Home Page)
    │
    ├─> Header (Sticky Nav)
    │
    ├─> HeroSection
    │   └─> AnimatedCard
    │       └─> Button (CTAs)
    │
    ├─> ProfessionalSection
    │   └─> Card (Timeline + Achievements)
    │       └─> TechLogo[]
    │
    ├─> IndieProjectsSection
    │   ├─> DeviceMockup3D (Lazy loaded)
    │   │   └─> Canvas (React Three Fiber)
    │   ├─> Card[] (Features)
    │   └─> AppStoreBadge[]
    │
    ├─> BuildNotesSection
    │   ├─> Tabs (Navigation)
    │   └─> CodeSnippet[] (Shiki)
    │
    ├─> TechStackSection
    │   └─> TechLogo[] (Grid)
    │
    ├─> ContactSection
    │   ├─> Button (Email/Social)
    │   └─> AppStoreBadge[]
    │
    └─> Footer
```

---

## Performance Architecture

### Optimization Strategy

**Build Time**:
- Static Site Generation (SSG) - all pages pre-rendered
- Image optimization - Next.js Image component (WebP/AVIF)
- Font optimization - next/font with system font fallbacks
- Automatic code splitting - per route + dynamic imports

**Runtime**:
- Lazy loading - 3D components load on scroll (React.lazy + Suspense)
- Tree shaking - remove unused shadcn/ui components
- CSS purging - Tailwind removes unused styles
- Bundle analysis - monitor total size (<200KB gzipped target)

**Animation Performance**:
- GPU acceleration - only animate `transform` and `opacity`
- Will-change CSS - applied to animated elements
- RequestAnimationFrame - Lenis for 60fps scrolling
- Reduced motion - respect `prefers-reduced-motion` media query

**Asset Optimization**:
- Image formats - WebP with JPEG fallback, AVIF where supported
- Compression - Vercel automatic Gzip/Brotli
- CDN - Vercel Edge Network for global delivery
- Preload - critical assets (hero background, fonts)

### Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| First Contentful Paint | <1s |
| Time to Interactive | <2s |
| Total Bundle Size | <200KB gzipped |
| Animation Frame Rate | 60fps |

---

## Security Architecture

### Environment Variables

**Client-Side** (exposed via `NEXT_PUBLIC_`):
- `NEXT_PUBLIC_MIXPANEL_TOKEN` - Analytics tracking
- `NEXT_PUBLIC_SITE_URL` - Site URL for SEO

**Server-Side Only** (Phase 2):
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` - AI chatbot

### Security Best Practices

1. **Never expose API keys to client bundle**
2. **All secrets in environment variables** (`.env.local`)
3. **Never commit `.env.local`** to git
4. **Input validation** for any user input (Phase 2 chatbot)
5. **Content Security Policy** (CSP) headers via Vercel
6. **HTTPS enforced** (automatic via Vercel)

---

## Deployment Architecture

### Vercel Edge Network

```
Developer Push to Git
    │
    ├─> Vercel Detects Change
    │   └─> Webhook trigger
    │
    ├─> Install Dependencies
    │   └─> npm install (cached)
    │
    ├─> Build Process
    │   ├─> TypeScript check (tsc --noEmit)
    │   ├─> ESLint (npm run lint)
    │   ├─> Next.js build (next build)
    │   │   ├─> Static page generation
    │   │   ├─> Asset optimization
    │   │   └─> Bundle minification
    │   └─> Output: .next/ static files
    │
    ├─> Deploy to Edge
    │   └─> Distribute to global CDN
    │
    └─> Live Site Updated
        └─> Zero downtime deployment
```

### Deployment Triggers

- **Production**: Pushes to `main` branch → deploy to production domain
- **Preview**: PRs and feature branches → unique preview URLs
- **Rollback**: One-click revert in Vercel dashboard

### Environment-Specific Behavior

| Environment | Branch | Domain | Analytics |
|------------|--------|--------|-----------|
| Production | `main` | Custom domain | Enabled |
| Preview | Feature branches | `*.vercel.app` | Disabled |
| Local | N/A | `localhost:3000` | Disabled |

---

## Future Architectural Considerations

### Phase 2: AI Chatbot

**New Components**:
- `app/api/chat/route.ts` - API route for chatbot
- `components/features/ChatBot.tsx` - Chat UI
- `components/features/ChatMessage.tsx` - Message bubble

**Architecture Changes**:
- Add API layer (Next.js API routes)
- Server-side AI integration (Vercel AI SDK)
- Rate limiting (Vercel Edge Config)

### Scalability Paths

**If Expanding Beyond Single Resume**:
1. Multi-page structure for blog/case studies
2. Incremental Static Regeneration (ISR) for dynamic content
3. Database integration for CMS
4. Authentication for admin panel

**Internationalization (i18n)**:
1. Multiple `resume.json` files (resume.en.json, resume.he.json)
2. Next.js i18n routing
3. Same component structure, different data source

### Monitoring & Observability

**Current** (MVP):
- Mixpanel for user analytics
- Vercel Analytics for performance

**Future Enhancements**:
- Error tracking (Sentry)
- Real User Monitoring (RUM)
- Synthetic monitoring (uptime checks)
- A/B testing platform
