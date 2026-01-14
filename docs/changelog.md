# Changelog

All notable changes to the Resume Web App will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 2026-01-14

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
