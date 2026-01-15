# Changelog

All notable changes to the Resume Web App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 2026-01-15 - AI/LLM Tools Section Planning

### Added
- **GitHub Issue #7**: Created comprehensive feature specification for AI/LLM Tools Proficiency section
  - Detailed technical implementation plan
  - Content strategy for Claude Code and Cursor IDE showcase
  - Acceptance criteria and success metrics
  - Design specifications following App Store aesthetic
- **Documentation updates**:
  - `project_spec.md`: Added Section 4.5 documenting AI/LLM Tools section
  - `CLAUDE.md`: Updated component hierarchy and data structure to include `AILLMToolsSection`
  - Planning document created with complete implementation roadmap

### Planned
- **AILLMToolsSection component**: New section to showcase AI-powered development workflow
  - Claude Code capabilities (feature planning, multi-agent orchestration, code review)
  - Cursor IDE features (AI-assisted completion, intelligent refactoring)
  - Workflow visualization (Planning → Implementation → Review → Documentation)
  - Impact metrics (3x faster delivery, 80% reduction in planning overhead)
- **Data structure**: `aiTools` field in `resume.json` with tools, workflow steps, and results
- **TypeScript interfaces**: `AITool`, `WorkflowStep`, and `AITools` types

### Technical Details
- **Section placement**: Between BuildNotesSection and TechStackSection
- **Design pattern**: Tool cards with glass morphism, workflow arrows, results showcase
- **Animation**: Framer Motion scroll-triggered reveals, staggered card animations
- **Content focus**: Modern AI development practices, productivity multipliers, competitive advantage
- **Target audience**: Forward-thinking hiring managers valuing cutting-edge tools

---

## 2026-01-15 - Poker AI Screenshots Integration

### Added
- **5 WebP screenshots** added to `/public/images/poker-ai/`:
  - `hero-screenshot.webp` - Main app screenshot (543KB)
  - `feature-1.webp` - AI-Powered Insights (824KB)
  - `feature-2.webp` - Hand Tracking (919KB)
  - `feature-3.webp` - Personal Coach (864KB)
  - `feature-4.webp` - Statistics & Trends (767KB)
- **Image field** added to Feature interface in `types/resume.ts`
- **Feature hover previews** - Screenshots fade in as background on hover (20% opacity)
- **Enhanced 2D device mockup** with hover effects (scale + glow)

### Changed
- **DeviceMockup3D component**:
  - Fixed hydration mismatch by initializing 3D state to `false`
  - Improved texture loading with proper error handling and console logging
  - Configured THREE.js textures with `SRGBColorSpace` and linear filtering
  - Switched screen mesh from `RoundedBox` to `plane` geometry for proper UV mapping
  - Temporarily disabled 3D mode in favor of reliable 2D fallback
  - Added hover animations (scale and glow effects) to 2D fallback
- **IndieProjectsSection component**:
  - Updated to use `hero-screenshot.webp` for device mockup
  - Enhanced FeatureCard to display background images on hover
  - Added `image` prop to feature cards
- **resume.json data**:
  - Added `image` paths to all 4 feature objects
- **poker-ai README.md**:
  - Updated to reflect actual WebP files
  - Documented component usage and image guidelines

### Fixed
- **Image loading issues** - Resolved texture rendering problems in 3D component
- **Browser caching** - Cleared Next.js build cache to ensure fresh compilation
- **TypeScript types** - Added `image?: string` to Feature interface

### Technical Details
- **Image format**: WebP chosen for optimal web performance (25-50% smaller than PNG)
- **Total image size**: ~3.9MB for 5 screenshots (optimized for web)
- **Texture loading**: THREE.TextureLoader with success/error callbacks
- **2D fallback**: Enhanced with CSS transitions and hover effects
- **Performance**: Images lazy-loaded, displayed only when component in view
- **Browser compatibility**: WebP supported by all modern browsers and THREE.js

### User Experience
- Hero screenshot displays immediately in iPhone device frame
- Feature cards show preview images on hover for visual context
- Smooth transitions create polished, professional feel
- All images maintain aspect ratio and display correctly

---

## 2026-01-14 - Phases 2-4 Complete: MVP Feature Complete

### Status
**MVP is now feature-complete!** All core functionality implemented and working. Ready for Phase 5 (Polish & Performance).

### Verified Complete
- ✅ **All interactive features working** - DeviceMockup3D, CodeSnippet, TechLogo, AppStoreBadge fully implemented
- ✅ **Scroll animations** - All sections animate smoothly on scroll with Framer Motion
- ✅ **Performance optimized** - Lazy loading for 3D components, GPU-accelerated animations
- ✅ **All sections wired up** - Complete data flow from resume.json to UI
- ✅ **Build successful** - Production build compiles without errors
- ✅ **TypeScript strict mode** - All type errors resolved

### Component Status
**Layout Components:**
- Header: Sticky navigation, mobile menu, glass morphism on scroll ✅
- Footer: Social links, quick navigation, resume downloads ✅

**Section Components:**
- HeroSection: Gradient background, animations, CTAs ✅
- ProfessionalSection: Timeline, achievement cards, scroll animations ✅
- IndieProjectsSection: 3D device mockups, feature showcase ✅
- BuildNotesSection: Tabbed interface, code snippets with Shiki ✅
- TechStackSection: Tech logos with hover effects and tooltips ✅
- ContactSection: Contact form, social links ✅

**Feature Components:**
- DeviceMockup3D: React Three Fiber, lazy loaded, 2D fallback ✅
- CodeSnippet: Shiki syntax highlighting, copy button ✅
- TechLogo: Glass morphism, hover effects, tooltips ✅
- AppStoreBadge: iOS/Android badges with analytics ✅

**Providers:**
- SmoothScrollProvider: Lenis momentum scrolling ✅
- AnalyticsProvider: Mixpanel event tracking ✅

### Technical Details
- All scroll-triggered animations use Framer Motion `whileInView`
- DeviceMockup3D lazy loaded with React.Suspense for performance
- CodeSnippet uses Shiki for syntax highlighting (github-dark theme)
- TechLogo has glass morphism effects with category tooltips
- AppStoreBadge includes official iOS and Google Play designs
- All animations respect `prefers-reduced-motion`
- GPU-accelerated with `transform` and `opacity` only

### Next Steps
Phase 5 priorities:
1. Performance audit (Lighthouse 95+ target)
2. Mobile device testing (iPhone Safari, Android Chrome)
3. Accessibility audit (WCAG AA compliance)
4. Image optimization
5. Bundle size analysis

---

## 2026-01-14 - Phase 1 Foundation Complete

### Added

- **App Store design theme implementation** in `app/globals.css`:
  - Complete dark mode color system (pure black #000000 background, iOS blue #007AFF accents)
  - Light mode color system (white background with complementary palette)
  - Custom utility classes: `.hero-gradient`, `.glass`, `.glass-light`
  - `prefers-reduced-motion` support for accessibility
  - OKLCH color space for perceptually uniform colors
- **Complete component architecture**:
  - **Layout components**: `Header.tsx`, `Footer.tsx` with sticky navigation and social links
  - **Section components**: `HeroSection.tsx`, `ProfessionalSection.tsx`, `IndieProjectsSection.tsx`, `BuildNotesSection.tsx`, `TechStackSection.tsx`, `ContactSection.tsx`
  - **Feature components**: `DeviceMockup3D.tsx` (React Three Fiber), `CodeSnippet.tsx` (Shiki), `TechLogo.tsx`, `AppStoreBadge.tsx`
  - **Provider components**: `SmoothScrollProvider.tsx` (Lenis), `AnalyticsProvider.tsx` (Mixpanel)
  - **UI components** (shadcn/ui): button, card, tabs, accordion, separator
- **Data infrastructure**:
  - `/data/resume.json` - Complete resume content structure (single source of truth)
  - `/types/resume.ts` - TypeScript interfaces for type-safe data access
- **Library utilities**:
  - `lib/analytics.ts` - Mixpanel analytics integration with page tracking and event logging
  - `lib/constants.ts` - App Store colors, breakpoints, and app config constants
  - `lib/utils.ts` - clsx + tailwind-merge helper for className management
- **Major dependencies installed**:
  - Animation: Framer Motion 12.26.2, Lenis 1.3.17 (smooth scrolling)
  - 3D Graphics: React Three Fiber 9.5.0, Drei 10.7.7, Three.js 0.182.0
  - Code highlighting: Shiki 3.21.0
  - Analytics: Mixpanel Browser 2.73.0
  - UI: Radix UI components (accordion, tabs, separator, slot)
  - SEO: next-sitemap 4.2.3
- **Enhanced `app/layout.tsx`**:
  - SEO-optimized metadata (title, description, OpenGraph, Twitter cards)
  - Keywords targeting React Native/Expo/Full-Stack positions
  - Dark mode by default with `className="dark"`
  - Smooth scroll setup and analytics providers
  - Header/Footer layout integration
- **Foundation setup documentation**:
  - `FOUNDATION-SETUP-COMPLETE.md` - Phase 1 completion summary
  - `PROJECT-STRUCTURE.md` - Component hierarchy reference
  - `.setup-instructions.md` - Development environment guide

### Changed

- **Claude Code settings** (`.claude/settings.json`):
  - Fixed permission syntax: `Bash(git :*::*)` (was `Bash(git *:*)`)
  - Fixed ask permissions: `Bash(rm :*)`, `Bash(del :*)`, `Bash(mv :*)` (prefix matching)
- **Claude Code local settings** (`.claude/settings.local.json`):
  - Added `Bash(claude-code doctor:*)`, `Bash(doctor)`, `Bash(cat:*)` to allow list
- **Slash commands** (`.claude/commands/`):
  - Updated `create-issues.md` and `update-docs-and-commit.md` frontmatter: `allowed-tools` → `tools`

### Fixed

- Permission syntax errors in Claude settings that prevented file loading
- System font stack configuration for proper SF Pro rendering on Apple devices

### Technical Details

- **App Store Theme Colors**: Using OKLCH color space for perceptually uniform colors across light/dark modes
  - Dark mode: pure black (#000000) background with iOS blue (#007AFF) accents
  - Light mode: white (#FFFFFF) background with matching iOS blue
  - Subtle borders: 20% gray (dark) / 89% gray (light)
  - Muted text: 58% gray (dark) / 45% gray (light)
- **Component Organization**: Following established architecture with 7 categories:
  - Layout (Header, Footer)
  - Sections (Hero, Professional, IndieProjects, BuildNotes, TechStack, Contact)
  - Features (DeviceMockup3D, CodeSnippet, TechLogo, AppStoreBadge)
  - Providers (SmoothScroll, Analytics)
  - UI (shadcn/ui components)
- **Performance Optimization**:
  - GPU-accelerated custom utility classes for glass morphism
  - `prefers-reduced-motion` support disables animations for accessibility
  - Lazy loading strategy prepared for 3D components
- **Bundle Size**: Added 13 new major dependencies (~1.2MB uncompressed)
  - Mitigation: Lazy loading for Three.js components, tree-shaking for unused code
- **Metadata Strategy**: Comprehensive SEO setup targeting React Native/Expo recruiters
  - OpenGraph and Twitter card metadata for social sharing
  - Keywords: React Native, Expo, Full-Stack Developer, Mobile Developer, TypeScript

---

## 2026-01-14 - Initial Project Setup

### Added

- **Next.js 15 project setup**: Initialized complete Next.js application with App Router in root directory
  - Core dependencies: Next.js 16.1.1, React 19.2.3, TypeScript 5
  - Tailwind CSS 4 with shadcn/ui integration
  - App structure: `app/`, `lib/`, `public/` folders
  - Configuration files: `package.json`, `tsconfig.json`, `next.config.ts`, `components.json`
- **MCP (Model Context Protocol) server integration**: Added `.mcp.json` with three MCP servers:
  - **Vercel MCP** (HTTP): Deployment and project management integration
  - **shadcn MCP** (stdio): Direct access to shadcn/ui component library and documentation
  - **Playwright MCP** (stdio): Browser automation capabilities for testing
- **Environment configuration**: Updated `.env.example` with `VERCEL_MCP_TOKEN` for MCP authentication
- **Project documentation structure**: Created comprehensive `docs/` folder with:
  - `docs/architecture.md` - Complete system architecture, component hierarchy, data flow, and deployment strategy
  - `docs/changelog.md` - Version history tracking following Keep a Changelog format
  - `docs/project_status.md` - Current phase tracking, milestone progress, and next steps
- **Custom slash command**: `.claude/commands/update-docs-and-commit.md` - Automated documentation update and git commit workflow
- CLAUDE.md with comprehensive project guidelines and architecture

### Changed

- **Project structure**: Moved Next.js application from `/resume/` subdirectory to project root
  - All Next.js files now at root level for proper project organization
  - Removed empty `/resume/` directory
- Refactored CLAUDE.md for improved clarity and organization

### Technical Details

- **Next.js Setup**: Using latest App Router architecture with TypeScript strict mode
  - shadcn/ui configured with components ready to add (`npx shadcn@latest add <component>`)
  - Tailwind CSS v4 with `@tailwindcss/postcss` for modern styling
  - ESLint and PostCSS configured for development quality
- **MCP Integration**: Three specialized servers for development workflow
  - Vercel MCP uses Bearer token authentication via environment variable expansion
  - shadcn and Playwright MCP run as stdio servers using `npx` for zero-config setup
  - All servers configured in project-scoped `.mcp.json` for team consistency
- **Architecture documentation** covers 6 major layers: Root Layout, Page Layout, Section Components, Feature Components, UI Components, and Provider Components
- **Data flow diagrams** document build-time SSG, runtime hydration, and user interaction flows
- **Project status** establishes 6-phase development plan with clear milestones
- **Custom command** enables conservative documentation updates that only modify files when genuine changes occur

## Initial Commit

### Added

- **Next.js 15 project setup**: App Router with TypeScript
- Project structure following App Store aesthetic design philosophy
- Core architecture:
  - `/data/resume.json` as single source of truth
  - Component hierarchy (Hero, Professional, IndieProjects, BuildNotes, TechStack, Contact sections)
  - Mobile-first design approach
- Documentation:
  - `project_spec.md` with complete technical specification
  - `brainstorm.md` with product vision and goals
  - `types/resume.ts` for TypeScript interfaces
- Development environment configuration
