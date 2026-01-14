'use client'

/**
 * HeroSection Component
 *
 * Displays the hero section with:
 * - Full viewport height
 * - Animated gradient background
 * - Personal info from resume.json
 * - Staggered Framer Motion animations
 * - Two CTA buttons with analytics tracking
 * - Scroll indicator
 */

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { trackCTAClick } from '@/lib/analytics'
import type { PersonalInfo } from '@/types/resume'

interface HeroSectionProps {
  personal: PersonalInfo
}

// Animation variants for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    }
  }
}

// Scroll indicator animation
const scrollIndicatorVariants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    }
  }
}

export default function HeroSection({ personal }: HeroSectionProps) {
  const handleScrollToWork = () => {
    trackCTAClick('View My Work', 'hero')
    const professionalSection = document.getElementById('professional')
    if (professionalSection) {
      professionalSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDownloadResume = () => {
    trackCTAClick('Download Resume', 'hero')
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden"
    >
      {/* Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center"
      >
        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          {personal.name}
        </motion.h1>

        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-6"
        >
          {personal.title}
        </motion.h2>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personal.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={handleScrollToWork}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-base min-w-[200px] h-12 shadow-lg hover:shadow-xl transition-shadow"
          >
            View My Work
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            onClick={handleDownloadResume}
            className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm font-semibold px-8 py-6 text-base min-w-[200px] h-12"
          >
            <a
              href="/resume/nadav-galili-resume.pdf"
              download="nadav-galili-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={scrollIndicatorVariants}
        animate="animate"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollToWork}
      >
        <span className="text-white/70 text-sm font-medium">Scroll to explore</span>
        <ChevronDown className="w-6 h-6 text-white/70" />
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs for depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>
    </section>
  )
}
