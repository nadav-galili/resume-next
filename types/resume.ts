/**
 * TypeScript interfaces for resume data structure
 * Single source of truth for all resume content types
 */

// Personal Information
export interface PersonalInfo {
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  location: string
  links: {
    linkedin: string
    github: string
    portfolio?: string
    twitter?: string
  }
}

// Professional Experience
export interface Achievement {
  title: string
  description: string
  metrics?: string
  impact?: string
}

export interface ProfessionalExperience {
  company: string
  role: string
  duration: string
  startDate: string
  endDate?: string
  description: string
  achievements: Achievement[]
  techStack: string[]
  location?: string
  companyUrl?: string
}

// Indie Projects
export interface Feature {
  icon: string
  title: string
  description: string
  image?: string
}

export interface BuildNotes {
  architecture: string[]
  performance: string[]
  deployment: string[]
  tradeoffs: string[]
  challenges?: string[]
  learnings?: string[]
}

export interface ProjectLinks {
  appStore?: string
  playStore?: string
  github?: string
  website?: string
  demo?: string
}

export interface ProjectMetrics {
  downloads?: string
  rating?: number
  users?: string
  stars?: number
  activeUsers?: string
  impact?: string
}

export interface TechStack {
  name: string
  category: 'mobile' | 'frontend' | 'backend' | 'database' | 'devops' | 'tools'
}

export interface IndieProject {
  name: string
  tagline: string
  description: string
  platforms: Array<'iOS' | 'Android' | 'Web'>
  features: Feature[]
  techStack: TechStack[]
  buildNotes: BuildNotes
  links: ProjectLinks
  metrics?: ProjectMetrics
  screenshots?: string[]
  featured?: boolean
}

// AI/LLM Tools
export interface AITool {
  name: string
  category: string
  icon: string
  description: string
  capabilities: string[]
  impact: string
}

export interface WorkflowStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface AIToolsResult {
  metric: string
  label: string
}

export interface AITools {
  title: string
  description: string
  tools: AITool[]
  workflow: WorkflowStep[]
  results: AIToolsResult[]
}

// Skills
export interface Skills {
  mobile: string[]
  fullStack: string[]
  backend: string[]
  tools: string[]
  categories?: {
    name: string
    items: string[]
  }[]
}

// Root Resume Data Interface
export interface ResumeData {
  personal: PersonalInfo
  professional: ProfessionalExperience[]
  indieProjects: IndieProject[]
  aiTools?: AITools
  skills: Skills
  meta?: {
    lastUpdated: string
    version: string
  }
}

// Type guards for runtime validation
export function isResumeData(data: unknown): data is ResumeData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'personal' in data &&
    'professional' in data &&
    'indieProjects' in data &&
    'skills' in data
  )
}

export function isIndieProject(data: unknown): data is IndieProject {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'tagline' in data &&
    'description' in data
  )
}
