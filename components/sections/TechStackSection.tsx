'use client'

/**
 * TechStackSection Component
 * Displays skills organized by category with glass morphism cards
 * Features: stagger animations, responsive grid layout
 */

import { motion } from 'framer-motion'
import { TechLogo } from '@/components/features/TechLogo'
import resumeData from '@/data/resume.json'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function TechStackSection() {
  const { skills } = resumeData

  // Define categories with their display names and keys
  const categories = [
    { key: 'mobile' as const, title: 'Mobile Development', color: 'text-blue-400' },
    { key: 'fullStack' as const, title: 'Full-Stack Development', color: 'text-purple-400' },
    { key: 'backend' as const, title: 'Backend & Infrastructure', color: 'text-green-400' },
    { key: 'tools' as const, title: 'Tools & DevOps', color: 'text-orange-400' },
  ]

  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Tech Stack
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Technologies I use to build modern, scalable applications
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {categories.map(({ key, title, color }) => {
            const categorySkills = skills[key]

            if (!categorySkills || categorySkills.length === 0) return null

            return (
              <motion.div
                key={key}
                variants={categoryVariants}
                className="space-y-6"
              >
                {/* Category Title */}
                <div className="flex items-center gap-3">
                  <div className={`h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent`} />
                  <h3 className={`text-2xl font-semibold ${color}`}>
                    {title}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {categorySkills.map((skill) => (
                    <TechLogo
                      key={`${key}-${skill}`}
                      name={skill}
                      category={key}
                    />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Background Gradient Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Top gradient */}
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          {/* Bottom gradient */}
          <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
