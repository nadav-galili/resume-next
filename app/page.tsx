import HeroSection from '@/components/sections/HeroSection'
import { ProfessionalSection } from '@/components/sections/ProfessionalSection'
import IndieProjectsSection from '@/components/sections/IndieProjectsSection'
import { BuildNotesSection } from '@/components/sections/BuildNotesSection'
import AILLMToolsSection from '@/components/sections/AILLMToolsSection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { ContactSection } from '@/components/sections/ContactSection'
import resumeData from '@/data/resume.json'

/**
 * Home Page
 * Single-page resume application with all sections
 * Mobile-first, App Store aesthetic design
 */
export default function Home() {
  return (
    <>
      {/* Hero Section - Full viewport with gradient */}
      <HeroSection personal={resumeData.personal} />

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
