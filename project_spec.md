# Resume Web App – Project Specification

## Overview
Build a **stunning, mobile-first resume web app** styled like an **App Store product page** that showcases 5 years of professional full-stack development + indie mobile app shipping experience.

---

## Positioning

**Nadav Galili** – Full-Stack Developer & Indie App Developer

**Professional**: 5 years as Full-Stack Developer at **Mobile-Brain**
**Indie**: Shipped production mobile apps (iOS + Android) independently

**Target Roles**:
1. React Native / Expo Developer (primary)
2. Full-Stack Developer
3. Mobile Developer
4. Backend Developer

---

## Tech Stack

### Core
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui
- **Deployment**: Vercel

### UI & Animations
- **Icons**: Lucide React (comes with shadcn/ui)
- **Fonts**: System fonts (SF Pro on Apple devices via -apple-system)
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Drei (3D phone mockups)
- **Smooth Scrolling**: Lenis (buttery smooth momentum scrolling)
- **Device Mockups**: react-device-frameset

### Features
- **Syntax Highlighting**: Shiki (for code snippets in Build Notes)
- **Analytics**: Mixpanel
- **SEO**: Next.js Metadata API + next-sitemap

### Utilities
- **Class Management**: clsx + tailwind-merge (via shadcn/ui)
- **Contact**: Simple mailto link (no form library needed)

### Optional (AI Chatbot - Phase 2)
- **AI SDK**: Vercel AI SDK
- **Data Format**: Structured JSON resume data

---

## Technical Architecture

### Data Flow

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

**Flow**:
1. **Build Time**: Next.js reads `/data/resume.json` and pre-renders static pages
2. **Runtime**: Client components hydrate with animations and interactions
3. **User Interaction**: Framer Motion + Lenis handle scroll-based animations
4. **Analytics**: Mixpanel tracks user behavior (page views, CTA clicks, section visibility)
5. **AI Chatbot** (Phase 2): Vercel AI SDK queries structured resume data

---

### Key Components

#### Layout Components
- `RootLayout` - App-wide layout with fonts, analytics, Lenis provider
- `Header` - Sticky navigation (desktop) with smooth scroll anchors
- `Footer` - Contact links, social icons, copyright

#### Section Components
- `HeroSection` - Animated hero with gradient background, name, title, CTAs
- `ProfessionalSection` - Mobile-Brain experience timeline
- `IndieProjectsSection` - Poker AI showcase with 3D phone mockups
- `BuildNotesSection` - Tabbed/accordion interface with code snippets
- `AILLMToolsSection` - AI-powered development tools showcase (Claude Code, Cursor IDE)
- `TechStackSection` - Animated grid of tech logos
- `ContactSection` - Links, email, download resume buttons

#### Feature Components
- `DeviceMockup3D` - React Three Fiber 3D phone with screenshots
- `AnimatedCard` - Framer Motion card with scroll reveal
- `CodeSnippet` - Shiki syntax-highlighted code block
- `TechLogo` - Hoverable tech icon with tooltip
- `SmoothScrollProvider` - Lenis wrapper for smooth scrolling
- `AppStoreBadge` - iOS/Android download badges

#### Utility Components (shadcn/ui)
- `Button` - Primary/secondary CTAs
- `Card` - Content containers
- `Tabs` - Build notes navigation
- `Accordion` - Expandable content
- `Separator` - Visual dividers

---

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
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProfessionalSection.tsx
│   │   ├── IndieProjectsSection.tsx
│   │   ├── BuildNotesSection.tsx
│   │   ├── AILLMToolsSection.tsx
│   │   ├── TechStackSection.tsx
│   │   └── ContactSection.tsx
│   │
│   ├── features/
│   │   ├── DeviceMockup3D.tsx
│   │   ├── CodeSnippet.tsx
│   │   ├── TechLogo.tsx
│   │   └── AppStoreBadge.tsx
│   │
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   │
│   └── providers/
│       ├── SmoothScrollProvider.tsx
│       └── AnalyticsProvider.tsx
│
├── data/
│   └── resume.json          # Single source of truth
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
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

### State Management

**Approach**: Minimal state, mostly server-rendered

- **Server State**: Resume data (static JSON, no runtime state)
- **Client State**:
  - Scroll position (Lenis)
  - Animation states (Framer Motion)
  - 3D camera position (React Three Fiber)
  - Active tab in Build Notes (React.useState)
  - Dark/light mode toggle (React.useState + localStorage)

**Why No Global State Library**:
- Single-page resume site (no complex state)
- Data is static (JSON file)
- React Context sufficient for theme toggle
- No user authentication or complex interactions

---

### Performance Optimization Strategy

#### Build Time
- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js Image component for screenshots
- **Font Optimization**: next/font with system font fallbacks
- **Code Splitting**: Automatic per-route + dynamic imports for heavy components

#### Runtime
- **Lazy Loading**: 3D components load on scroll (React.lazy + Suspense)
- **Bundle Analysis**: Monitor bundle size (next-bundle-analyzer)
- **Tree Shaking**: Remove unused shadcn/ui components
- **CSS Purging**: Tailwind removes unused styles

#### Assets
- **Image Formats**: WebP/AVIF with fallbacks
- **Compression**: Vercel automatic compression
- **CDN**: Vercel Edge Network for global delivery
- **Preload**: Critical assets (hero background, fonts)

#### Animations
- **GPU Acceleration**: Use `transform` and `opacity` only
- **Will-Change**: Apply to animated elements
- **RequestAnimationFrame**: Lenis for smooth 60fps scrolling
- **Reduced Motion**: Respect `prefers-reduced-motion`

---

### Build & Deployment Pipeline

#### Local Development
```bash
npm install           # Install dependencies
npm run dev           # Start dev server (localhost:3000)
npm run build         # Production build
npm run lint          # ESLint check
npm run type-check    # TypeScript validation
```

#### CI/CD (Vercel)
```
┌─────────────┐
│  Push to    │
│  Git Repo   │
└──────┬──────┘
       │
       ├──> Vercel Detects Push
       │
       ├──> Install Dependencies
       │
       ├──> Run Build (next build)
       │    ├─> TypeScript Check
       │    ├─> ESLint
       │    ├─> Generate Static Pages
       │    └─> Optimize Assets
       │
       ├──> Deploy to Edge Network
       │
       └──> Live Site Updated
```

**Deployment Triggers**:
- **Production**: Pushes to `main` branch
- **Preview**: PRs and feature branches
- **Rollback**: One-click revert in Vercel dashboard

#### Environment Variables
```bash
# .env.local (not committed)
NEXT_PUBLIC_MIXPANEL_TOKEN=your_token_here
```

---

### API Routes (Phase 2 - AI Chatbot)

```
POST /api/chat
├── Input: User question
├── Process: Query resume.json via AI SDK
├── Output: AI-generated answer
└── Rate Limiting: Vercel Edge Config
```

**Example Structure**:
```typescript
// app/api/chat/route.ts
import { streamText } from 'ai'
import resumeData from '@/data/resume.json'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: yourModel,
    system: `You are a helpful assistant. Answer only using this resume data: ${JSON.stringify(resumeData)}`,
    messages,
  })

  return result.toAIStreamResponse()
}
```

---

### App Store Color Theme

#### Dark Mode (Default)
```css
--background: 0 0% 0%;          /* Pure black #000000 */
--card: 0 0% 11%;               /* Dark gray #1C1C1E */
--primary: 213 100% 50%;        /* iOS blue #007AFF */
--foreground: 0 0% 100%;        /* White text */
--muted: 0 0% 58%;              /* Gray text #949494 */
--border: 0 0% 20%;             /* Subtle borders */
--accent: 213 100% 50%;         /* iOS blue accent */
```

#### Light Mode (Optional)
```css
--background: 0 0% 100%;        /* White */
--card: 0 0% 96%;               /* Light gray */
--primary: 213 100% 50%;        /* iOS blue */
--foreground: 0 0% 0%;          /* Black text */
--muted: 0 0% 45%;              /* Gray text */
```

#### Gradients
```css
/* Hero gradient */
.hero-gradient {
  background: linear-gradient(135deg, #007AFF 0%, #5856D6 100%);
}

/* Glass morphism */
.glass {
  background: rgba(28, 28, 30, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

---

### TypeScript Interfaces

```typescript
// types/resume.ts

export interface ResumeData {
  personal: PersonalInfo
  professional: ProfessionalExperience
  indieProjects: IndieProject[]
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
  techStack: TechStack[]
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

### Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "framer-motion": "^11.0.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.95.0",
    "three": "^0.160.0",
    "lenis": "^1.0.0",
    "lucide-react": "latest",
    "react-device-frameset": "^1.3.0",
    "shiki": "^1.0.0",
    "mixpanel-browser": "^2.48.0",
    "next-sitemap": "^4.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.160.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.1.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

---

## Design Philosophy

### UI/UX Level 1000 ✨
- **Inspiration**: Apple product pages + Linear.app + Stripe docs
- **Mobile-first**: Perfect on phones, stunning on desktop
- **Performance**: 60fps animations, <1s load time
- **Accessibility**: WCAG AA compliant
- **Dark mode**: Default (with light mode toggle)

### Animation Strategy
- Smooth scroll-triggered reveals (Framer Motion)
- Physics-based micro-interactions
- 3D phone mockups that rotate/float on scroll
- Parallax effects (subtle, not distracting)
- Stagger animations for lists/grids
- Page transitions

### Visual Style
- Clean, generous whitespace
- Glass morphism + depth shadows
- Gradient accents (subtle)
- Typography with breathing room
- Device mockups with realistic depth
- iOS/Android platform badges

---

## Site Structure

### 1. Hero Section
**Purpose**: Immediate impact in 5 seconds

**Content**:
- Name: Nadav Galili
- Title: Full-Stack Developer & Indie App Developer
- Value proposition: "5 years building production systems at Mobile-Brain + shipping mobile apps independently"
- Subtext: "Professional full-stack development meets indie mobile app craft"
- Primary CTA: "View My Work"
- Secondary CTA: "Download Resume"

**Design**:
- Animated gradient background
- Large, confident typography
- Subtle 3D floating elements
- Split visual showing both professional + indie work
- Mobile-optimized layout

---

### 2. Professional Experience – Mobile-Brain

**Purpose**: Establish credibility and professional background

**Content**:
- **Company**: Mobile-Brain
- **Role**: Full-Stack Developer
- **Duration**: 5 years (2020 - Present)
- **Overview**: Brief description of company and your role
- **Key Achievements**: To be filled in later
- **Tech Stack**: Technologies used professionally
- **Impact**: Metrics/outcomes (if applicable)

**Design**:
- Company logo/branding
- Timeline visualization
- Key highlights in card format
- Clean, corporate-professional aesthetic
- Expandable details (not overwhelming)

**Note**: Content to be expanded later with specific projects/achievements

---

### 3. Indie Projects – Poker AI (Flagship)

**Purpose**: Showcase end-to-end mobile app shipping ability

**Poker AI Details**:
- **Name**: Poker AI: HomeStack
- **Type**: Indie Project (Self-Published)
- **Platforms**: iOS & Android (both App Store & Google Play)
- **Status**: Live in production, publicly available
- **Tagline**: "Your personal AI poker coach for home games"
- **Description**: Essential app for casual poker players hosting home games. Tracks hands, buy-ins, cashouts, and provides AI-powered insights to improve play.

**Key Features** (to display):
1. 🧠 **AI-Powered Insights**: Advanced AI analyzes game data for actionable improvements
2. 📊 **Effortless Tracking**: Log hands, buy-ins, cashouts with intuitive UI
3. 📈 **Personal Poker Coach**: Transforms friendly matches into strategic advantages
4. 🎯 **Accessible Statistics**: Complex stats made simple and fun

**Why This Matters**:
- Demonstrates **full ownership**: design → development → deployment → maintenance
- Proves ability to **ship to real users** on both platforms
- Shows **product thinking**, not just coding
- **Real-world** app in production stores

**Design Elements**:
- 3D phone mockups (iPhone + Android) with app screenshots
- Rotate/float on scroll interaction
- Device frames with realistic shadows/depth
- Feature cards with icons + short descriptions
- Platform badges (Download on App Store / Get it on Google Play)
- App Store/Play Store links
- "Indie Project" badge/label to distinguish from work projects

---

### 4. Build Notes (Critical Section)

**Purpose**: Demonstrate technical depth and engineering judgment

**Applies to**: Poker AI (can be expanded to include Mobile-Brain projects later)

**Content Areas**:

#### Architecture Decisions
- Why React Native + Expo
- State management approach
- Data persistence strategy
- Offline-first considerations

#### Performance Optimizations
- List optimization techniques
- Bundle size management
- Startup time improvements
- Memory management

#### Release & Deployment
- EAS Build pipeline
- CI/CD setup
- App Store submission process
- OTA updates strategy
- Managing both iOS + Android releases solo

#### Tradeoffs & Learnings
- Technical decisions made
- What worked well
- What would be done differently
- Cross-platform challenges solved
- Lessons from shipping independently

**Design**:
- Tabbed or accordion interface
- Code snippets (syntax highlighted)
- Before/after metrics
- Clean, scannable layout
- Engineering blog post aesthetic

---

### 4.5. AI/LLM Tools (Modern Development)

**Purpose**: Showcase proficiency with cutting-edge AI development tools and demonstrate modern, AI-augmented development workflow

**Content**:

#### Tools Highlighted
1. **Claude Code**
   - Advanced AI agent for planning complex features
   - Multi-agent orchestration for complex workflows
   - Code generation with architectural awareness
   - Automated code reviews and optimization
   - Technical documentation generation
   - **Impact**: "Reduced feature planning time by 80%, enabling faster iteration and higher quality implementations"

2. **Cursor IDE**
   - AI-native code editor for intelligent code completion
   - Context-aware multi-file editing
   - AI-assisted refactoring and debugging
   - Natural language to code generation
   - Rapid prototyping and iteration
   - **Impact**: "3x faster code delivery with maintained quality and consistency"

#### AI-Augmented Workflow
Visualized step-by-step process:
1. **Planning** → Use Claude Code to break down complex features into actionable tasks
2. **Implementation** → Leverage Cursor IDE for rapid, context-aware code generation
3. **Review** → AI-assisted code review for quality and best practices
4. **Documentation** → Automatically generate comprehensive technical docs

#### Results & Metrics
- "3x faster feature delivery time"
- "80% reduction in planning overhead"
- "70% faster prototyping cycles"
- "Near-zero architectural debt from proper AI guidance"
- "Comprehensive documentation with minimal manual effort"

**Design**:
- Tool cards with hover effects and glass morphism styling
- Workflow visualization with arrow connectors
- Results showcase with checkmarks/icons
- App Store aesthetic (gradient accents, depth shadows)
- Responsive grid (2 columns desktop, 1 column mobile)
- Framer Motion scroll animations

**Why This Matters**:
- Demonstrates **modern development practices** with cutting-edge tools
- Shows **productivity multiplier** through AI-augmented workflow
- Proves ability to **leverage AI** as a force multiplier, not replacement
- Appeals to **forward-thinking** hiring managers
- Highlights **competitive advantage** in fast-paced environments

---

### 5. Tech Stack (Curated)

**Purpose**: Show relevant skills without overwhelming

**Categories**:

#### Mobile (Primary Focus)
- React Native
- Expo
- TypeScript
- React Navigation
- Expo EAS

#### Full-Stack (Professional)
- Node.js / Express / NestJS
- React / Next.js
- TypeScript
- REST / GraphQL APIs

#### Backend & Infrastructure
- PostgreSQL / Firebase / MongoDB
- AWS / GCP / Vercel
- Docker
- Git / GitHub Actions / CI/CD

#### Tools & Practices
- Git/GitHub
- Agile/Scrum
- Code review
- Testing (Jest, React Testing Library)

**Design**:
- Grid of tech logos
- Hover effects revealing context (professional vs indie)
- Grouped by category
- No generic "skill bars"
- Visual distinction between primary/secondary skills

---

### 6. Proof & Links

**Purpose**: Build trust and enable action

**Content**:

#### Indie Projects
- App Store link (Poker AI)
- Google Play link (Poker AI)
- GitHub profile (personal projects)

#### Professional
- LinkedIn
- GitHub (professional contributions if public)
- Mobile-Brain website (if relevant)

#### Contact
- Email
- Calendar link (if using Calendly)
- Social profiles

**Design**:
- Prominent app store badges
- Social proof elements (downloads, ratings if available)
- Easy-to-tap buttons (mobile)
- Contact form or mailto link
- LinkedIn/GitHub stats (followers, contributions)

---

### 7. Download Resume

**Purpose**: Traditional format for ATS/recruiters

**Files** (to be created separately):
- PDF resume
- Word resume (.docx)

**Content Versions**:
- Version emphasizing mobile/RN experience
- Version emphasizing full-stack experience
- Or single comprehensive version

**Design**:
- Clear download buttons
- File format icons
- Last updated date
- Preview thumbnails

---

## Optional: AI Chatbot (Phase 2)

### Level 1 Implementation
- Floating chat button (bottom-right)
- Predefined question buttons:
  - "Tell me about your work at Mobile-Brain"
  - "Tell me about Poker AI"
  - "What's your React Native experience?"
  - "What's your full-stack expertise?"
  - "What's your availability?"
- Answers from structured resume data only
- Fast, minimal UI

### Technical Approach
- Vercel AI SDK
- Resume content as JSON
- System rules: only answer from provided data
- Admit when info is missing
- Concise, skimmable responses

---

## Content Strategy

### Single Source of Truth
- All resume content in `/data/resume.json` or `/content/resume.md`
- Website renders from this data
- PDF/Word generated from same source (later)
- No content divergence

### Structured Data Format
```json
{
  "personal": {
    "name": "Nadav Galili",
    "title": "Full-Stack Developer & Indie App Developer",
    "bio": "",
    "contact": {}
  },
  "professional": {
    "current": {
      "company": "Mobile-Brain",
      "role": "Full-Stack Developer",
      "duration": "5 years",
      "startDate": "2020",
      "description": "",
      "achievements": [],
      "techStack": []
    },
    "previous": []
  },
  "indieProjects": [
    {
      "name": "Poker AI: HomeStack",
      "type": "Mobile App",
      "platforms": ["iOS", "Android"],
      "description": "",
      "features": [],
      "techStack": [],
      "buildNotes": {},
      "links": {
        "appStore": "",
        "playStore": "",
        "github": ""
      },
      "metrics": {
        "downloads": "",
        "rating": ""
      }
    }
  ],
  "skills": {
    "mobile": [],
    "fullStack": [],
    "backend": [],
    "tools": []
  }
}
```

---

## Performance Requirements

- **Lighthouse Score**: 95+ on all metrics
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Mobile optimized**: Perfect on iPhone/Android browsers
- **LinkedIn in-app browser**: Must work flawlessly
- **60fps animations**: No jank on mid-range phones

---

## Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Color contrast: WCAG AA
- Focus indicators
- Reduced motion support

---

## SEO & Meta

- Optimized meta tags
- Open Graph images
- Twitter cards
- Structured data (JSON-LD)
- Sitemap
- robots.txt

---

## Non-Goals (MVP)

- ❌ Overly complex animations that hurt performance
- ❌ Large interactive demos
- ❌ Making chatbot the centerpiece
- ❌ Covering every past project equally
- ❌ Generic portfolio site feel
- ❌ Long loading times
- ❌ Desktop-first design

---

## Success Criteria

### Immediate Impact (0-5 seconds)
- ✅ Visitor instantly knows: "5 years professional + ships mobile apps"
- ✅ Feels like a real product, not a template
- ✅ Clean, professional, modern design
- ✅ Balance between corporate credibility + indie craft

### Engagement (5-60 seconds)
- ✅ Mobile-Brain experience establishes professional foundation
- ✅ Poker AI showcase proves end-to-end shipping ability
- ✅ Build notes demonstrate technical depth
- ✅ Easy to navigate on mobile
- ✅ Fast, smooth, delightful interactions

### Conversion
- ✅ Hiring managers think: "Experienced professional who also ships independently"
- ✅ Clear path to contact or download resume
- ✅ Memorable enough to stand out
- ✅ Appeals to both corporate and startup/scale-up environments

---

## Missing Information Needed

Before starting implementation, gather:

### Poker AI
1. **Screenshots**: 4-6 high-quality screenshots (iOS + Android)
2. **App Store URLs**: Apple App Store link + Google Play Store link
3. **Metrics**: Downloads, ratings, user count (if shareable)
4. **Build Notes Details**: Specific architecture, performance metrics, deployment setup

### Mobile-Brain (Professional Experience)
1. **Company Description**: What does Mobile-Brain do?
2. **Your Role Details**: Specific responsibilities and scope
3. **Key Projects**: 2-3 major projects you worked on (high level)
4. **Achievements**: Quantifiable impact (performance improvements, features shipped, users affected)
5. **Tech Stack**: Exact technologies used professionally
6. **Timeframe**: Exact start date (month/year)

### Personal Info
1. Full name: Nadav Galili ✅
2. Contact email
3. LinkedIn URL
4. GitHub URL
5. Location (if including)
6. Professional photo (optional)

---

## Site Flow & Narrative Arc

### Story We're Telling:
1. **Hero**: "I'm a full-stack developer with 5 years of professional experience who also ships mobile apps independently"
2. **Professional**: "Here's my solid foundation – 5 years at Mobile-Brain building production systems"
3. **Indie**: "And here's proof I can own the entire process – I shipped Poker AI to both app stores"
4. **Technical Depth**: "Let me show you how I think about engineering"
5. **Skills**: "Here's my technical toolkit across the stack"
6. **Action**: "Let's talk" / "Download my resume"

### Why This Works:
- Professional experience = **Credibility & Stability**
- Indie projects = **Initiative & Full-Stack Ownership**
- Build notes = **Technical Depth & Engineering Judgment**
- Combined = **Best of both worlds**: Proven professional + self-directed shipper

---

## Implementation Phases

### Phase 1: MVP (Core Resume Site)
1. Next.js setup + project structure
2. Hero section with animations
3. Professional Experience section (Mobile-Brain – placeholder content)
4. Poker AI showcase with 3D mockups
5. Build notes section
6. Tech stack grid
7. Links & contact
8. Download resume buttons
9. Responsive design polish
10. Performance optimization
11. Deploy to Vercel

### Phase 2: Content Expansion
1. Fill in Mobile-Brain details
2. Add more work projects (if applicable)
3. Add more indie projects (if any)
4. Expand build notes

### Phase 3: Enhancements
1. AI chatbot (Level 1)
2. Dark/light mode toggle
3. PDF/Word resume generation from data
4. Analytics integration

### Phase 4: Polish
1. Advanced animations
2. Easter eggs / delightful details
3. Blog section (optional)
4. Case studies for work projects

---

## Next Immediate Steps

1. ✅ Gather Poker AI assets (screenshots, URLs, metrics)
2. ✅ Gather Mobile-Brain details (company info, role, achievements)
3. Create detailed build notes content
4. Initialize Next.js project
5. Set up project structure
6. Start with Hero section
