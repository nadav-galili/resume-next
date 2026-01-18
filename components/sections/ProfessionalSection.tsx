'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useAnalytics } from '@/hooks'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Trophy,
  Zap,
  Code2,
  Rocket,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import type { ProfessionalExperience } from '@/types/resume'

// Icon mapping for achievements
const achievementIcons = [Trophy, Zap, Code2, Rocket]

interface ProfessionalSectionProps {
  experience: ProfessionalExperience
}

export function ProfessionalSection({ experience }: ProfessionalSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { trackSection } = useAnalytics()

  // Track section view
  useEffect(() => {
    if (isInView) {
      trackSection('professional')
    }
  }, [isInView, trackSection])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const, // Custom easing
      },
    },
  }

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section
      id="professional"
      ref={ref}
      className="relative overflow-hidden py-20 scroll-mt-20"
    >
      {/* Background gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-primary/3 to-background" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Professional Experience
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Building production applications at scale
          </p>
        </motion.div>

        {/* Company Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="glass border-border/50 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2 text-2xl sm:text-3xl">
                    {experience.role}
                  </CardTitle>
                  <CardDescription className="text-base sm:text-lg">
                    <span className="font-semibold text-primary">
                      {experience.company}
                    </span>
                    {experience.location && (
                      <>
                        <span className="text-muted-foreground mx-2">•</span>
                        <span className="text-muted-foreground">
                          {experience.location}
                        </span>
                      </>
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium">
                    {experience.duration}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                {experience.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="mb-12 grid gap-6 sm:grid-cols-2"
        >
          {experience.achievements.map((achievement, index) => {
            const Icon = achievementIcons[index % achievementIcons.length]
            return (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
                className="h-full"
              >
                <motion.div variants={cardHoverVariants} className="h-full">
                  <Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10">
                    <CardHeader>
                      <div className="mb-3 flex items-center gap-3">
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <div className="flex-1">
                          <CardTitle className="text-lg sm:text-xl">
                            {achievement.title}
                          </CardTitle>
                        </div>
                      </div>
                      {achievement.metrics && (
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {achievement.metrics}
                        </div>
                      )}
                    </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {achievement.description}
                    </p>
                    {achievement.impact && (
                      <div className="border-border/50 rounded-lg border bg-secondary/30 p-3">
                        <p className="text-sm font-medium">
                          <span className="text-muted-foreground">Impact:</span>{' '}
                          <span className="text-foreground">
                            {achievement.impact}
                          </span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )
        })}
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Separator className="mb-8" />
          <div className="text-center">
            <h3 className="text-muted-foreground mb-6 text-sm font-semibold uppercase tracking-wider">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {experience.techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + index * 0.05,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  className="inline-flex items-center rounded-full border border-border/50 bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
