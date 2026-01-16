'use client'

/**
 * App Store Badge Component
 * Official iOS App Store and Google Play Store badges with analytics tracking
 * Features:
 * - Platform-specific styling (iOS/Android)
 * - Opens links in new tab
 * - Tracks clicks with Mixpanel
 * - Hover effects
 * - Accessible with proper ARIA labels
 */

import Image from 'next/image'
import { trackLinkClick } from '@/lib/analytics'

interface AppStoreBadgeProps {
  platform: 'ios' | 'android'
  url: string
  className?: string
}

export default function AppStoreBadge({
  platform,
  url,
  className = '',
}: AppStoreBadgeProps) {
  const handleClick = () => {
    const storeName = platform === 'ios' ? 'App Store' : 'Play Store'
    trackLinkClick(storeName, url)
  }

  const isIOS = platform === 'ios'
  const ariaLabel = isIOS ? 'Download on the App Store' : 'Get it on Google Play'

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-block transition-transform hover:scale-105 ${className}`}
      aria-label={ariaLabel}
    >
      {isIOS ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/badges/appstore.svg"
          alt="Download on the App Store"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      ) : (
        <Image
          src="/badges/google_play.png"
          alt="Get it on Google Play"
          width={135}
          height={40}
          className="h-10 w-auto"
        />
      )}
    </a>
  )
}
