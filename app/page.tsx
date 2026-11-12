import HeroSection from '@/components/sections/HeroSection'
import { ProfessionalSection } from '@/components/sections/ProfessionalSection'
import IndieProjectsSection from '@/components/sections/IndieProjectsSection'
import { BuildNotesSection } from '@/components/sections/BuildNotesSection'
import AILLMToolsSection from '@/components/sections/AILLMToolsSection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { ContactSection } from '@/components/sections/ContactSection'
import resumeData from '@/data/resume.json'
import type { IndieProject } from '@/types/resume'

/**
 * Home Page
 * Single-page resume application with all sections
 * Mobile-first, App Store aesthetic design
 */
export default function Home() {
  // Hero shows the flagship app's first store screenshots
  const projects = resumeData.indieProjects as IndieProject[]
  const flagship = projects.find((project) => project.featured) ?? projects[0]
  const heroShots = (flagship?.screenshots ?? []).slice(0, 3).map((shot) => ({
    src: shot.src,
    alt: `${flagship.name} – ${shot.title}`,
  }))

  return (
    <>
      {/* Hero Section - Full viewport with gradient */}
      <HeroSection personal={resumeData.personal} screenshots={heroShots} />

      {/* Professional Experience - Mobile-Brain */}
      <ProfessionalSection experience={resumeData.professional[0]} />

      {/* Indie Projects - Poker AI Showcase */}
      <IndieProjectsSection />

      {/* Build Notes - Technical Depth */}
      <BuildNotesSection />

      {/* AI/LLM Tools - Development Workflow */}
      <AILLMToolsSection />

      {/* Tech Stack - Skills Grid */}
      <TechStackSection />

      {/* Contact & Links */}
      <ContactSection />
    </>
  )
}
