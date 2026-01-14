'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { ProfessionalExperience } from '@/types/resume'

interface ProfessionalSectionProps {
  experience: ProfessionalExperience
}

export function ProfessionalSection({ experience }: ProfessionalSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
      className="relative py-20 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
          {experience.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              className="h-full"
            >
              <motion.div variants={cardHoverVariants} className="h-full">
                <Card className="group h-full border-border/50 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">
                      {achievement.title}
                    </CardTitle>
                    {achievement.metrics && (
                      <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
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
          ))}
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
