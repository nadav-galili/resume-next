'use client'

/**
 * Indie Projects Section Component
 * Showcases multiple indie projects with App Store aesthetics
 * Features:
 * - Project selector tabs for switching between projects
 * - Two-column layout (desktop): mockup left, content right
 * - Single column (mobile): stacked vertically
 * - Device mockup for mobile apps, simplified view for web apps
 * - Feature cards with icons
 * - App Store/Play Store badges OR website links
 * - Metrics showcase
 * - Tech stack tags
 * - Scroll-triggered animations
 */

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Brain,
  BarChart,
  BarChart2,
  GraduationCap,
  TrendingUp,
  Star,
  Download,
  Users,
  RefreshCw,
  Bell,
  Layout,
  ExternalLink,
  Zap,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AppStoreBadge from '@/components/features/AppStoreBadge'
import FeatureShowcase from '@/components/features/FeatureShowcase'
import DeviceMockup from '@/components/features/DeviceMockup'
import resumeData from '@/data/resume.json'
import type { IndieProject } from '@/types/resume'

// Extended icon mapping for all features
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  'chart-bar': BarChart,
  'bar-chart-2': BarChart2,
  'graduation-cap': GraduationCap,
  'trending-up': TrendingUp,
  'refresh-cw': RefreshCw,
  bell: Bell,
  layout: Layout,
  zap: Zap,
}

// Feature Card Component (for projects without images)
function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: string
  title: string
  description: string
  index: number
}) {
  const Icon = iconMap[icon] || Brain
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

// Feature List Component (simple grid for projects without feature images)
function FeatureList({ features }: { features: IndieProject['features'] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </div>
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

// Check if project has mobile platforms
function isMobileProject(project: IndieProject): boolean {
  return (
    project.platforms.includes('iOS') || project.platforms.includes('Android')
  )
}

// Check if project has feature images
function hasFeatureImages(project: IndieProject): boolean {
  return project.features.some((f) => f.image)
}

export default function IndieProjectsSection() {
  const projects = resumeData.indieProjects as IndieProject[]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  if (!projects.length) {
    return null
  }

  const selectedProject = projects[selectedIndex]

  return (
    <section
      id="indie-projects"
      className="relative overflow-hidden py-20 md:py-32"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-primary/8 to-background" />

      {/* Additional gradient orbs for depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl"
        />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Indie Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From concept to production - building and shipping apps end-to-end
          </p>
        </motion.div>

        {/* Project Selector Tabs (only show if multiple projects) */}
        {projects.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 flex justify-center"
          >
            <div className="inline-flex gap-2 rounded-xl border border-border/50 bg-card/30 p-1.5 backdrop-blur-sm">
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  onClick={() => setSelectedIndex(index)}
                  className={`
                    relative rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300
                    ${
                      selectedIndex === index
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-card/50 hover:text-foreground'
                    }
                  `}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Main Content: Two-column layout for mobile apps, centered for web */}
            <div
              className={`grid gap-12 ${isMobileProject(selectedProject) ? 'lg:grid-cols-2 lg:gap-16' : ''}`}
            >
              {/* Left Column: Device Mockup (only for mobile apps) */}
              {isMobileProject(selectedProject) && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <DeviceMockup
                    platform="ios"
                    screenshot="/images/poker-ai/hero-screenshot.webp"
                  />
                </motion.div>
              )}

              {/* Right Column (or centered for web): Project Details */}
              <div
                className={`flex flex-col justify-center space-y-8 ${!isMobileProject(selectedProject) ? 'mx-auto max-w-2xl text-center' : ''}`}
              >
                {/* Project Title & Tagline */}
                <motion.div
                  initial={{ opacity: 0, x: isMobileProject(selectedProject) ? 50 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  {/* Platform Badge for Web projects */}
                  {!isMobileProject(selectedProject) && (
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                      <Layout className="h-4 w-4" />
                      Progressive Web App
                    </div>
                  )}
                  <h3 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                    {selectedProject.name}
                  </h3>
                  <p className="mb-4 text-xl text-primary">
                    {selectedProject.tagline}
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </motion.div>

                {/* App Store Badges OR Website Link */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`flex flex-wrap gap-4 ${!isMobileProject(selectedProject) ? 'justify-center' : ''}`}
                >
                  {/* Mobile app badges */}
                  {selectedProject.links.appStore && (
                    <AppStoreBadge
                      platform="ios"
                      url={selectedProject.links.appStore}
                      className="w-40"
                    />
                  )}
                  {selectedProject.links.playStore && (
                    <AppStoreBadge
                      platform="android"
                      url={selectedProject.links.playStore}
                      className="w-40"
                    />
                  )}

                  {/* Web project link */}
                  {!isMobileProject(selectedProject) &&
                    selectedProject.links.website && (
                      <Button asChild variant="default" size="lg">
                        <a
                          href={selectedProject.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Visit Website
                        </a>
                      </Button>
                    )}

                  {/* GitHub link (for any project type) */}
                  {selectedProject.links.github && (
                    <Button asChild variant="outline" size="lg">
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        View Source
                      </a>
                    </Button>
                  )}
                </motion.div>

                {/* Metrics */}
                {selectedProject.metrics && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className={`grid gap-4 ${isMobileProject(selectedProject) ? 'grid-cols-3' : 'grid-cols-2 max-w-md mx-auto'}`}
                  >
                    {/* Mobile app metrics */}
                    {selectedProject.metrics.downloads && (
                      <MetricDisplay
                        icon={Download}
                        label="Downloads"
                        value={selectedProject.metrics.downloads}
                        index={0}
                      />
                    )}
                    {selectedProject.metrics.rating && (
                      <MetricDisplay
                        icon={Star}
                        label="Rating"
                        value={selectedProject.metrics.rating.toString()}
                        index={1}
                      />
                    )}
                    {selectedProject.metrics.users && (
                      <MetricDisplay
                        icon={Users}
                        label="Active Users"
                        value={selectedProject.metrics.users}
                        index={2}
                      />
                    )}
                    {/* Web project metrics */}
                    {selectedProject.metrics.impact && (
                      <MetricDisplay
                        icon={Zap}
                        label="Impact"
                        value={selectedProject.metrics.impact}
                        index={0}
                      />
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Feature Showcase - Use gallery for images, list for no images */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-20"
            >
              <h4 className="mb-8 text-center text-2xl font-bold text-foreground">
                Key Features
              </h4>
              {hasFeatureImages(selectedProject) ? (
                <FeatureShowcase features={selectedProject.features} />
              ) : (
                <FeatureList features={selectedProject.features} />
              )}
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16"
            >
              <h4 className="mb-6 text-center text-xl font-semibold text-foreground">
                Built With
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {selectedProject.techStack.map((tech, index) => (
                  <TechBadge key={tech.name} name={tech.name} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
