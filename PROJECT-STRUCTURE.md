# Project Structure

Complete file tree of the Resume Web App MVP.

```
resume/
│
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx               # Root layout with fonts, providers
│   ├── page.tsx                 # Home page (all sections)
│   ├── globals.css              # ✅ Tailwind + App Store theme
│   └── favicon.ico              # Favicon
│
├── components/
│   ├── layout/                  # ✅ Directory created
│   │   ├── Header.tsx          # TODO: Sticky navigation
│   │   └── Footer.tsx          # TODO: Contact links, social icons
│   │
│   ├── sections/                # ✅ Directory created
│   │   ├── HeroSection.tsx              # TODO: Hero with gradient
│   │   ├── ProfessionalSection.tsx      # TODO: Mobile-Brain experience
│   │   ├── IndieProjectsSection.tsx     # TODO: Poker AI showcase
│   │   ├── BuildNotesSection.tsx        # TODO: Technical depth
│   │   ├── TechStackSection.tsx         # TODO: Skills grid
│   │   └── ContactSection.tsx           # TODO: Links & downloads
│   │
│   ├── features/                # ✅ Directory created
│   │   ├── DeviceMockup3D.tsx          # TODO: 3D phone mockups
│   │   ├── CodeSnippet.tsx             # TODO: Shiki highlighting
│   │   ├── TechLogo.tsx                # TODO: Hoverable icons
│   │   └── AppStoreBadge.tsx           # TODO: iOS/Android badges
│   │
│   ├── ui/                      # shadcn/ui components (TODO: install)
│   │   ├── button.tsx          # TODO: npx shadcn add button
│   │   ├── card.tsx            # TODO: npx shadcn add card
│   │   ├── tabs.tsx            # TODO: npx shadcn add tabs
│   │   ├── accordion.tsx       # TODO: npx shadcn add accordion
│   │   └── separator.tsx       # TODO: npx shadcn add separator
│   │
│   └── providers/               # ✅ Directory created
│       ├── SmoothScrollProvider.tsx    # TODO: Lenis wrapper
│       └── AnalyticsProvider.tsx       # TODO: Mixpanel integration
│
├── data/
│   └── resume.json              # ✅ Single source of truth for content
│
├── lib/
│   ├── utils.ts                 # ✅ clsx + tailwind-merge helper
│   ├── analytics.ts             # ✅ Mixpanel setup and tracking
│   └── constants.ts             # ✅ App Store colors, breakpoints, config
│
├── types/
│   └── resume.ts                # ✅ TypeScript interfaces for all data
│
├── public/
│   ├── images/
│   │   ├── poker-ai/           # ✅ Directory + README for screenshots
│   │   │   └── README.md       # ✅ Instructions for image guidelines
│   │   └── tech-logos/         # ✅ Directory + README for tech icons
│   │       └── README.md       # ✅ Instructions for logo guidelines
│   │
│   ├── resume/                  # ✅ Directory + README for resume files
│   │   ├── README.md           # ✅ Instructions for resume files
│   │   ├── nadav-galili-resume.pdf    # TODO: Add PDF resume
│   │   └── nadav-galili-resume.docx   # TODO: Add DOCX resume
│   │
│   ├── favicon.ico              # Favicon
│   └── robots.txt               # SEO robots file
│
├── docs/                         # Project documentation
│   ├── architecture.md          # System design and data flow
│   ├── changelog.md             # Version history
│   └── project_status.md        # Current progress tracking
│
├── .env.example                  # Environment variables template
├── .env                          # ✅ Local environment variables (gitignored)
├── .gitignore                    # Git ignore rules
├── .mcp.json                     # MCP configuration
│
├── components.json               # ✅ shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
├── package.json                  # ✅ Dependencies list
├── package-lock.json             # Dependency lock file
│
├── CLAUDE.md                     # ✅ Project instructions for AI
├── README.md                     # Project overview
├── project_spec.md               # Complete technical specification
├── brainstorm.md                 # Product vision and goals
│
├── FOUNDATION-SETUP-COMPLETE.md  # ✅ Foundation setup summary
├── PROJECT-STRUCTURE.md          # ✅ This file
└── .setup-instructions.md        # ✅ Manual setup steps

```

## Legend

- ✅ = File/directory completed
- TODO = Needs to be created
- 📦 = Requires npm install

## Current Status

### Phase 1: Foundation Setup (COMPLETE)
- [x] TypeScript type system
- [x] Resume data structure
- [x] App Store theme
- [x] Constants and utilities
- [x] Analytics setup
- [x] Directory structure
- [ ] Dependencies installation (MANUAL STEP REQUIRED)
- [ ] shadcn/ui components (MANUAL STEP REQUIRED)

### Phase 2: Component Development (NEXT)
- [ ] Layout components (Header, Footer)
- [ ] Section components (Hero, Professional, Indie, Build Notes, Tech Stack, Contact)
- [ ] Feature components (3D mockups, code snippets, tech logos, badges)
- [ ] Provider components (Smooth scroll, Analytics)

### Phase 3: Integration & Polish (FUTURE)
- [ ] Connect all components to resume data
- [ ] Implement animations and interactions
- [ ] Add 3D device mockups
- [ ] Optimize images and assets
- [ ] Performance testing
- [ ] Accessibility audit
- [ ] SEO optimization

## Key Files by Purpose

### Data & Types
- `/data/resume.json` - All content (single source of truth)
- `/types/resume.ts` - TypeScript interfaces

### Styling & Design
- `/app/globals.css` - App Store theme + Tailwind
- `/lib/constants.ts` - Design system values

### Utilities & Tools
- `/lib/utils.ts` - Helper functions (cn)
- `/lib/analytics.ts` - Mixpanel tracking

### Configuration
- `components.json` - shadcn/ui setup
- `next.config.ts` - Next.js config
- `tailwind.config.ts` - Tailwind config
- `tsconfig.json` - TypeScript config

### Documentation
- `CLAUDE.md` - AI assistant instructions
- `project_spec.md` - Technical specification
- `FOUNDATION-SETUP-COMPLETE.md` - Setup summary
- `.setup-instructions.md` - Manual steps

---

**Last Updated**: 2026-01-14
**Phase**: Foundation Complete
