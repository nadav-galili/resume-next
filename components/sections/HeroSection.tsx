'use client'

/**
 * HeroSection Component
 *
 * Displays the hero section with:
 * - Full viewport height with App Store aesthetic
 * - Animated gradient background
 * - Personal info from resume.json
 * - Hero images with floating card effects
 * - Staggered Framer Motion animations
 * - Two CTA buttons with analytics tracking
 * - Scroll indicator
 */

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

// Image card animation with floating effect
const imageCardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 20,
      delay: 0.4,
    }
  }
}

// Floating animation for images
const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
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
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs for depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen lg:min-h-[600px]">
          {/* Text Content - Left Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 text-center lg:text-left lg:pr-8"
          >
            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
            >
              {personal.name}
            </motion.h1>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-6"
            >
              {personal.title}
            </motion.h2>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-white/80 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {personal.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <Button
                onClick={handleScrollToWork}
                size="lg"
                className="bg-white text-[oklch(60%_0.22_250)] hover:bg-white/90 font-semibold px-8 py-6 text-base min-w-[200px] h-12 shadow-2xl hover:shadow-xl transition-all hover:scale-105"
                aria-label="View my work and projects"
              >
                View My Work
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                onClick={handleDownloadResume}
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white backdrop-blur-sm font-semibold px-8 py-6 text-base min-w-[200px] h-12 hover:scale-105 transition-all"
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

          {/* Hero Images - Right Side */}
          <div className="relative z-10 flex flex-col items-center lg:items-end gap-6 lg:gap-8">
            {/* Main Hero Image Card - Professional Headshot */}
            <motion.div
              variants={imageCardVariants}
              initial="hidden"
              animate="show"
              className="relative w-full max-w-[400px] lg:max-w-[450px]"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative glass rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                <div className="aspect-square relative">
                  <Image
                    src="/images/hero/hero.png"
                    alt={`${personal.name} - Professional headshot`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Secondary Image Card - Developer at Work */}
            <motion.div
              variants={imageCardVariants}
              initial="hidden"
              animate="show"
              className="relative w-full max-w-[350px] lg:max-w-[400px] lg:-mt-12"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '1s' }}
                className="relative glass rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/hero/developing.png"
                    alt={`${personal.name} - Developing software`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        variants={scrollIndicatorVariants}
        animate="animate"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={handleScrollToWork}
      >
        <span className="text-white/70 text-sm font-medium">Scroll to explore</span>
        <ChevronDown className="w-6 h-6 text-white/70" />
      </motion.div>
    </section>
  )
}
