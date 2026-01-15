'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { trackEvent } from '@/lib/analytics'
import resumeData from '@/data/resume.json'

/**
 * Header Component
 * Sticky navigation with glass morphism effect on scroll
 * Includes mobile hamburger menu and smooth scroll navigation
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Track scroll position for glass morphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle navigation click
  const handleNavClick = (label: string, href: string) => {
    trackEvent('Navigation Click', {
      label,
      href,
      location: 'header',
    })
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/10'
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

            {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border"
            role="menu"
          >
            <ul className="py-4 px-4 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} role="none">
                  <a
                    href={item.href}
                    className="block py-3 px-4 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
                    onClick={() => handleNavClick(item.label, item.href)}
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
