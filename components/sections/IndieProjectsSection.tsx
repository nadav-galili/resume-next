'use client'

/**
 * Indie Projects Section Component
 * Showcases Poker AI flagship project with App Store aesthetics
 * Features:
 * - Two-column layout (desktop): 3D mockup left, content right
 * - Single column (mobile): stacked vertically
 * - 3D device mockup with lazy loading
 * - Feature cards with icons
 * - App Store/Play Store badges with analytics
 * - Metrics showcase (downloads, rating, users)
 * - Tech stack tags
 * - Scroll-triggered animations
 */

import { lazy, Suspense, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Brain,
  BarChart,
  GraduationCap,
  TrendingUp,
  Star,
  Download,
  Users,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import AppStoreBadge from '@/components/features/AppStoreBadge'
import resumeData from '@/data/resume.json'

// Lazy load 3D component for better performance
const DeviceMockup3D = lazy(
  () => import('@/components/features/DeviceMockup3D')
)

// Icon mapping for features
const iconMap = {
  brain: Brain,
  'chart-bar': BarChart,
  'graduation-cap': GraduationCap,
  'trending-up': TrendingUp,
}

// Device Mockup Skeleton (fallback while loading)
function DeviceMockupSkeleton() {
  return (
    <div className="flex h-[600px] items-center justify-center">
      <div className="relative h-[500px] w-[280px] animate-pulse rounded-[3rem] bg-card/50 shadow-2xl" />
    </div>
  )
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  image,
  index,
}: {
  icon: string
  title: string
  description: string
  image?: string
  index: number
}) {
  const Icon = iconMap[icon as keyof typeof iconMap] || Brain
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
        {/* Background Image (shown on hover) */}
        {image && (
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <CardHeader className="relative z-10">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Metric Display Component
function MetricDisplay({
  icon: Icon,
  label,
  value,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex items-center gap-3 rounded-lg bg-card/30 p-4 backdrop-blur-sm"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  )
}

// Tech Stack Badge Component
function TechBadge({ name, index }: { name: string; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="inline-block rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-md"
    >
      {name}
    </motion.span>
  )
}

export default function IndieProjectsSection() {
  // Get Poker AI project from resume data
  const project = resumeData.indieProjects[0]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  if (!project) {
    return null
  }

  return (
    <section
      id="indie-projects"
      className="relative overflow-hidden py-20 md:py-32"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Indie Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From concept to app stores - building and shipping mobile apps end-to-end
          </p>
        </motion.div>

        {/* Main Content: Two-column layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: 3D Device Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <Suspense fallback={<DeviceMockupSkeleton />}>
              <DeviceMockup3D
                platform="ios"
                screenshot="/images/poker-ai/hero-screenshot.webp"
                enableRotation={true}
              />
            </Suspense>
          </motion.div>

          {/* Right Column: Project Details */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Project Title & Tagline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                {project.name}
              </h3>
              <p className="mb-4 text-xl text-primary">{project.tagline}</p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </motion.div>

            {/* App Store Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {project.links.appStore && (
                <AppStoreBadge
                  platform="ios"
                  url={project.links.appStore}
                  className="w-40"
                />
              )}
              {project.links.playStore && (
                <AppStoreBadge
                  platform="android"
                  url={project.links.playStore}
                  className="w-40"
                />
              )}
            </motion.div>

            {/* Metrics */}
            {project.metrics && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid grid-cols-3 gap-4"
              >
                {project.metrics.downloads && (
                  <MetricDisplay
                    icon={Download}
                    label="Downloads"
                    value={project.metrics.downloads}
                    index={0}
                  />
                )}
                {project.metrics.rating && (
                  <MetricDisplay
                    icon={Star}
                    label="Rating"
                    value={project.metrics.rating.toString()}
                    index={1}
                  />
                )}
                {project.metrics.users && (
                  <MetricDisplay
                    icon={Users}
                    label="Active Users"
                    value={project.metrics.users}
                    index={2}
                  />
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h4 className="mb-8 text-center text-2xl font-bold text-foreground">
            Key Features
          </h4>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                image={feature.image}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <h4 className="mb-6 text-center text-xl font-semibold text-foreground">
            Built With
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {project.techStack.map((tech, index) => (
              <TechBadge key={tech.name} name={tech.name} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
