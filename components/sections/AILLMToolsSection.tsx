'use client'

/**
 * AILLMToolsSection Component
 * Showcases proficiency with AI/LLM development tools (Claude Code, Cursor IDE)
 * Features:
 * - Tool cards with capabilities
 * - Workflow visualization
 * - Results/metrics showcase
 * - Glass morphism styling
 * - Scroll-triggered animations
 */

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { motion, useInView } from 'framer-motion'
import {
  Brain,
  Code,
  ClipboardList,
  Search,
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import resumeData from '@/data/resume.json'

// Icon mapping for workflow steps
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  code: Code,
  'clipboard-list': ClipboardList,
  search: Search,
  'file-text': FileText,
}

// Logo paths for AI tools
const toolLogos: Record<string, { light: string; dark: string } | string> = {
  'Claude Code': '/images/tech-logos/claude-color.svg',
  'Cursor IDE': {
    light: '/images/tech-logos/CUBE_2D_LIGHT.svg',
    dark: '/images/tech-logos/CUBE_2D_DARK.svg',
  },
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

// Tool Card Component
function ToolCard({
  tool,
  isDark,
}: {
  tool: {
    name: string
    category: string
    icon: string
    description: string
    capabilities: string[]
    impact: string
  }
  isDark: boolean
}) {
  const Icon = iconMap[tool.icon] || Brain
  const logoConfig = toolLogos[tool.name]

  // Get the appropriate logo path based on theme
  const logoPath = logoConfig
    ? typeof logoConfig === 'string'
      ? logoConfig
      : isDark ? logoConfig.dark : logoConfig.light
    : null

  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5 md:p-8"
    >
      {/* Icon/Logo and Category */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          {logoPath ? (
            <Image
              src={logoPath}
              alt={`${tool.name} logo`}
              width={32}
              height={32}
              className="h-8 w-8"
            />
          ) : (
            <Icon className="h-7 w-7" />
          )}
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {tool.category}
        </span>
      </div>

      {/* Title and Description */}
      <h4 className="mb-2 text-xl font-bold text-foreground">{tool.name}</h4>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {tool.description}
      </p>

      {/* Capabilities */}
      <div className="mb-4 space-y-2">
        {tool.capabilities.map((capability, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-sm text-muted-foreground">{capability}</span>
          </div>
        ))}
      </div>

      {/* Impact */}
      <div className="mt-auto rounded-lg bg-primary/5 p-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">
            {tool.impact}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Workflow Step Component
function WorkflowStep({
  step,
  isLast,
}: {
  step: {
    step: number
    title: string
    description: string
    icon: string
  }
  isLast: boolean
}) {
  const Icon = iconMap[step.icon] || ClipboardList

  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center text-center">
        {/* Step Number with Icon */}
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary shadow-lg shadow-primary/10">
          <Icon className="h-7 w-7" />
        </div>
        {/* Step Title */}
        <h5 className="mb-1 text-sm font-semibold text-foreground">
          {step.title}
        </h5>
        {/* Step Description */}
        <p className="max-w-[120px] text-xs text-muted-foreground">
          {step.description}
        </p>
      </div>
      {/* Arrow connector */}
      {!isLast && (
        <div className="mx-2 hidden text-muted-foreground/50 md:block lg:mx-4">
          <ArrowRight className="h-5 w-5" />
        </div>
      )}
    </div>
  )
}

// Result Metric Component
function ResultMetric({
  metric,
  label,
}: {
  metric: string
  label: string
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center rounded-xl bg-card/30 p-4 text-center backdrop-blur-sm"
    >
      <span className="mb-1 text-3xl font-bold text-primary md:text-4xl">
        {metric}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </motion.div>
  )
}

export default function AILLMToolsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch - defer state update to avoid cascading renders
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  // Get AI tools data from resume
  const aiTools = resumeData.aiTools

  if (!aiTools) {
    return null
  }

  const isDark = mounted ? theme === 'dark' : true // Default to dark during SSR

  return (
    <section
      id="ai-tools"
      className="relative overflow-hidden py-24 md:py-32"
      ref={ref}
    >
      {/* Background gradient effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/15 blur-3xl"
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Augmented Development
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {aiTools.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {aiTools.description}
          </p>
        </motion.div>

        {/* Tool Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20 grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {aiTools.tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} isDark={isDark} />
          ))}
        </motion.div>

        {/* Workflow Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
            Development Workflow
          </h3>
          <div className="flex flex-wrap items-start justify-center gap-6 md:flex-nowrap md:gap-4 lg:gap-8">
            {aiTools.workflow.map((step, index) => (
              <WorkflowStep
                key={step.step}
                step={step}
                isLast={index === aiTools.workflow.length - 1}
              />
            ))}
          </div>
        </motion.div>

        {/* Results Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-2xl"
        >
          <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
            Results & Impact
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {aiTools.results.map((result) => (
              <ResultMetric
                key={result.label}
                metric={result.metric}
                label={result.label}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
