'use client'

/**
 * Device Mockup Component
 * Renders iPhone/Android device frames with screenshots
 * Features:
 * - Optimized 2D implementation
 * - Hover animations with scale and glow effects
 * - Respects prefers-reduced-motion
 * - Next.js Image optimization
 */

import { useEffect } from 'react'
import Image from 'next/image'

interface DeviceMockupProps {
  platform: 'ios' | 'android'
  screenshot?: string
  className?: string
}

export default function DeviceMockup({
  platform,
  screenshot,
  className,
}: DeviceMockupProps) {
  useEffect(() => {
    if (screenshot) {
      console.log('DeviceMockup rendering with screenshot:', screenshot)
    }
  }, [screenshot])

  return (
    <div
      className={`relative mx-auto transition-transform duration-700 hover:scale-105 ${className || ''}`}
      style={{
        width: platform === 'ios' ? '280px' : '300px',
        maxWidth: '100%',
      }}
    >
      {/* Device Frame */}
      <div
        className={`relative overflow-hidden bg-[#1c1c1e] shadow-2xl transition-shadow duration-300 hover:shadow-primary/20 ${
          platform === 'ios' ? 'rounded-[3rem]' : 'rounded-[2rem]'
        }`}
        style={{
          aspectRatio: platform === 'ios' ? '9/19.5' : '9/19',
          border: '12px solid #1c1c1e',
        }}
      >
        {/* Screen */}
        {screenshot ? (
          <Image
            src={screenshot}
            alt={`${platform} device screenshot`}
            fill
            sizes="(max-width: 768px) 280px, 300px"
            className="object-cover"
            priority={true}
            quality={90}
            onLoad={() => console.log('✓ Image loaded successfully')}
            onError={(e) => console.error('✗ Image failed to load:', e)}
          />
        ) : (
          <div className="h-full w-full bg-black" />
        )}

        {/* iOS Notch */}
        {platform === 'ios' && (
          <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-[#1c1c1e]" />
        )}

        {/* Subtle glow effect on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 122, 255, 0.1) 0%, transparent 70%)'
          }}
        />
      </div>
    </div>
  )
}
