'use client'

/**
 * TechStackSection Component
 * Displays skills organized by category with glass morphism cards
 * Features: stagger animations, responsive grid layout
 */

import { motion } from 'framer-motion'
import { Smartphone, Layers, Server, Wrench, Sparkles } from 'lucide-react'
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

  // Categories in display order; `span` makes the lead card wider on desktop
  const categories = [
    { key: 'mobile' as const, title: 'Mobile', icon: Smartphone, span: 'lg:col-span-3' },
    { key: 'ai' as const, title: 'AI Engineering', icon: Sparkles, span: 'lg:col-span-3' },
    { key: 'fullStack' as const, title: 'Web & Full-Stack', icon: Layers, span: 'lg:col-span-2' },
    { key: 'backend' as const, title: 'Backend & Data', icon: Server, span: 'lg:col-span-2' },
    { key: 'tools' as const, title: 'Tooling & Ops', icon: Wrench, span: 'lg:col-span-2' },
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
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Tech Stack
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Technologies I use to build modern, scalable applications
          </p>
        </motion.div>

        {/* Skills bento */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-6"
        >
          {categories.map(({ key, title, icon: Icon, span }) => {
            const categorySkills = skills[key]

            if (!categorySkills || categorySkills.length === 0) return null

            return (
              <motion.div
                key={key}
                variants={categoryVariants}
                className={`relative z-10 rounded-3xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/40 ${span}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <li
                      key={`${key}-${skill}`}
                      className="rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-sm text-foreground/90"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
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
