'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { trackEvent } from '@/lib/analytics'
import { MobileMenu } from '@/components/layout/MobileMenu'
import resumeData from '@/data/resume.json'

/**
 * Header Component
 * Sticky navigation with glass morphism effect on scroll
 * Features:
 * - Desktop: Horizontal nav links
 * - Mobile: Premium radial menu with morphing button
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position for glass morphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle desktop navigation click
  const handleNavClick = (label: string, href: string) => {
    trackEvent('Navigation Click', {
      label,
      href,
      location: 'header',
    })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Name */}
          <Link
            href="#hero"
            className="text-lg md:text-xl font-semibold text-foreground hover:text-primary transition-colors"
            onClick={() => handleNavClick('Logo', '#hero')}
            aria-label={`${resumeData.personal.name} - Go to top of page`}
          >
            {resumeData.personal.name}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8" role="menubar">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} role="none">
                <a
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  onClick={() => handleNavClick(item.label, item.href)}
                  role="menuitem"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu - Premium radial menu with morphing button */}
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  )
}
