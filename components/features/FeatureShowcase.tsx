'use client'

/**
 * FeatureShowcase Component
 * Lightweight tab-based gallery for showcasing app feature screenshots
 * - Uses shadcn/ui Tabs (no new dependencies)
 * - CSS transitions only (no heavy Framer Motion)
 * - Mobile-first responsive design
 * - Glass morphism styling
 */

import { useState } from 'react'
import Image from 'next/image'
import { Brain, BarChart, GraduationCap, TrendingUp } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

// Icon mapping (same as IndieProjectsSection)
const iconMap = {
  brain: Brain,
  'chart-bar': BarChart,
  'graduation-cap': GraduationCap,
  'trending-up': TrendingUp,
}

interface Feature {
  icon: string
  title: string
  description: string
  image?: string
}

interface FeatureShowcaseProps {
  features: Feature[]
}

export default function FeatureShowcase({ features }: FeatureShowcaseProps) {
  const [activeTab, setActiveTab] = useState(features[0]?.title || '')

  if (!features.length) return null

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      {/* Tab Navigation - Horizontal scroll on mobile */}
      <div className="mb-8 flex justify-center">
        <TabsList className="inline-flex h-auto gap-1 overflow-x-auto rounded-xl border border-border/50 bg-card/50 p-1.5 backdrop-blur-sm scrollbar-hide">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Brain
            return (
              <TabsTrigger
                key={feature.title}
                value={feature.title}
                className={cn(
                  'inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5',
                  'text-sm font-medium text-muted-foreground',
                  'transition-all duration-200',
                  'hover:text-foreground',
                  'data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
                  'data-[state=active]:shadow-sm',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{feature.title}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </div>

      {/* Tab Content Panels */}
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon as keyof typeof iconMap] || Brain
        const isActive = activeTab === feature.title

        return (
          <TabsContent
            key={feature.title}
            value={feature.title}
            className="mt-0 outline-none data-[state=inactive]:hidden"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:items-center">
              {/* Screenshot Display */}
              <div className="flex justify-center">
                <div
                  className={cn(
                    'relative w-full max-w-[320px] lg:max-w-[380px]',
                    'rounded-3xl border border-border/50 bg-card/50 p-3 lg:p-4',
                    'shadow-xl shadow-primary/5 backdrop-blur-sm',
                    'transition-all duration-300',
                    isActive && 'scale-100 opacity-100',
                    !isActive && 'scale-95 opacity-0'
                  )}
                >
                  {/* Device frame */}
                  <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-2xl bg-black">
                    {feature.image ? (
                      <Image
                        src={feature.image}
                        alt={`${feature.title} screenshot`}
                        fill
                        sizes="(max-width: 1024px) 320px, 380px"
                        className="object-cover"
                        quality={90}
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        No screenshot
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Feature Details */}
              <div
                className={cn(
                  'flex flex-col items-center text-center lg:items-start lg:text-left',
                  'space-y-6 py-4',
                  'transition-all duration-300 delay-100',
                  isActive && 'translate-y-0 opacity-100',
                  !isActive && 'translate-y-4 opacity-0'
                )}
              >
                {/* Icon */}
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-lg shadow-primary/10">
                  <Icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h5 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                  {feature.title}
                </h5>

                {/* Description */}
                <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
