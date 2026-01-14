'use client'

/**
 * TechLogo Component
 * Hoverable tech icon with tooltip showing category
 * Displays technology name with scale animation on hover
 */

import { motion } from 'framer-motion'
import {
  Smartphone,
  Code2,
  Database,
  Wrench,
  Globe,
  Server,
  Box,
  Zap,
} from 'lucide-react'

interface TechLogoProps {
  name: string
  category: 'mobile' | 'fullStack' | 'backend' | 'tools'
}

// Icon mapping - returns appropriate icon for common technologies
const getIcon = (name: string) => {
  const lowerName = name.toLowerCase()

  if (
    lowerName.includes('react native') ||
    lowerName.includes('expo') ||
    lowerName.includes('ios') ||
    lowerName.includes('android')
  ) {
    return <Smartphone className="size-5" />
  }

  if (
    lowerName.includes('react') ||
    lowerName.includes('next') ||
    lowerName.includes('typescript') ||
    lowerName.includes('javascript')
  ) {
    return <Code2 className="size-5" />
  }

  if (
    lowerName.includes('postgres') ||
    lowerName.includes('mongo') ||
    lowerName.includes('firebase') ||
    lowerName.includes('redis')
  ) {
    return <Database className="size-5" />
  }

  if (
    lowerName.includes('node') ||
    lowerName.includes('express') ||
    lowerName.includes('server')
  ) {
    return <Server className="size-5" />
  }

  if (
    lowerName.includes('docker') ||
    lowerName.includes('aws') ||
    lowerName.includes('nginx')
  ) {
    return <Box className="size-5" />
  }

  if (
    lowerName.includes('graphql') ||
    lowerName.includes('rest') ||
    lowerName.includes('api')
  ) {
    return <Globe className="size-5" />
  }

  if (lowerName.includes('git') || lowerName.includes('jest')) {
    return <Wrench className="size-5" />
  }

  // Default icon
  return <Zap className="size-5" />
}

// Category display names
const categoryNames: Record<
  TechLogoProps['category'],
  string
> = {
  mobile: 'Mobile',
  fullStack: 'Full-Stack',
  backend: 'Backend',
  tools: 'Tools',
}

export function TechLogo({ name, category }: TechLogoProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Glass morphism card */}
      <div className="glass dark:glass flex flex-col items-center gap-3 rounded-xl p-4 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        {/* Icon */}
        <div className="text-primary transition-transform group-hover:scale-110">
          {getIcon(name)}
        </div>

        {/* Tech name */}
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">
            {categoryNames[category]}
          </p>
        </div>
      </div>

      {/* Tooltip - shows on hover */}
      <div className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-card px-3 py-1.5 text-xs font-medium text-card-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {categoryNames[category]}
        {/* Arrow */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-card" />
      </div>
    </motion.div>
  )
}
