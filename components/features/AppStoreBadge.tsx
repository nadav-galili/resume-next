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

  if (platform === 'ios') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-block transition-transform hover:scale-105 ${className}`}
        aria-label="Download on the App Store"
      >
        <svg
          width="180"
          height="60"
          viewBox="0 0 180 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
        >
          {/* Background */}
          <rect
            width="180"
            height="60"
            rx="8"
            fill="black"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.2"
          />

          {/* Apple Logo */}
          <path
            d="M35.5 20.5c-2.8 0-5.1 2.3-5.1 5.1 0 2.8 2.3 5.1 5.1 5.1s5.1-2.3 5.1-5.1c0-2.8-2.3-5.1-5.1-5.1zm-1.2 8.5c-.8-.4-1.3-1.2-1.3-2.1 0-.9.5-1.7 1.3-2.1.2-.1.4-.2.6-.2.5 0 1 .2 1.4.6.3.3.5.7.5 1.1 0 .5-.2.9-.5 1.2-.4.4-.9.6-1.4.6-.2 0-.4-.1-.6-.2v.1z"
            fill="white"
          />
          <path
            d="M37.2 18.5c-.2-.7-.7-1.3-1.4-1.6-.3-.1-.6-.2-.9-.2-.5 0-1 .2-1.4.5-.6.5-1 1.2-1 2 0 .3 0 .5.1.7.2.7.7 1.3 1.4 1.6.3.1.6.2.9.2.5 0 1-.2 1.4-.5.6-.5 1-1.2 1-2 0-.2 0-.5-.1-.7z"
            fill="white"
          />

          {/* Text */}
          <text
            x="55"
            y="25"
            fill="white"
            fontSize="10"
            fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="400"
          >
            Download on the
          </text>
          <text
            x="55"
            y="42"
            fill="white"
            fontSize="18"
            fontFamily="-apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="600"
          >
            App Store
          </text>
        </svg>
      </a>
    )
  }

  // Android Play Store Badge
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-block transition-transform hover:scale-105 ${className}`}
      aria-label="Get it on Google Play"
    >
      <svg
        width="180"
        height="60"
        viewBox="0 0 180 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full"
      >
        {/* Background */}
        <rect width="180" height="60" rx="8" fill="black" />
        <rect
          x="0.5"
          y="0.5"
          width="179"
          height="59"
          rx="7.5"
          stroke="white"
          strokeOpacity="0.2"
        />

        {/* Play Store Icon */}
        <g transform="translate(18, 15)">
          {/* Triangle paths for Play icon */}
          <path
            d="M4 4.5L22 15L4 25.5V4.5Z"
            fill="url(#playGradient1)"
            stroke="none"
          />
          <path
            d="M4 4.5L22 15L15 11L4 4.5Z"
            fill="url(#playGradient2)"
            stroke="none"
          />
          <path
            d="M15 19L22 15L4 25.5L15 19Z"
            fill="url(#playGradient3)"
            stroke="none"
          />
          <path
            d="M4 25.5L15 19L15 11L4 4.5V25.5Z"
            fill="url(#playGradient4)"
            stroke="none"
          />
        </g>

        {/* Gradients for Play icon */}
        <defs>
          <linearGradient
            id="playGradient1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#00A0FF" />
            <stop offset="100%" stopColor="#00A1FF" />
          </linearGradient>
          <linearGradient
            id="playGradient2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FFD800" />
            <stop offset="100%" stopColor="#FF9900" />
          </linearGradient>
          <linearGradient
            id="playGradient3"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF3A44" />
            <stop offset="100%" stopColor="#C31162" />
          </linearGradient>
          <linearGradient
            id="playGradient4"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#32A071" />
            <stop offset="100%" stopColor="#2DA771" />
          </linearGradient>
        </defs>

        {/* Text */}
        <text
          x="62"
          y="25"
          fill="white"
          fontSize="9"
          fontFamily="sans-serif"
          fontWeight="400"
        >
          GET IT ON
        </text>
        <text
          x="62"
          y="42"
          fill="white"
          fontSize="17"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          Google Play
        </text>
      </svg>
    </a>
  )
}
