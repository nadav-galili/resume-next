'use client'

/**
 * ContactSection Component
 * Final CTA section with contact links and resume downloads
 * Features: social links, email, download buttons with analytics tracking
 */

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mail, Linkedin, Github, Download, FileText } from 'lucide-react'
import { trackLinkClick } from '@/lib/analytics'
import resumeData from '@/data/resume.json'

export function ContactSection() {
  const { personal } = resumeData

  // Handle link clicks with analytics
  const handleLinkClick = (linkName: string, url: string) => {
    trackLinkClick(linkName, url)
  }

  // Social links configuration
  const socialLinks = [
    {
      name: 'Email',
      icon: <Mail className="size-5" />,
      href: `mailto:${personal.email}`,
      label: personal.email,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="size-5" />,
      href: personal.links.linkedin,
      label: 'Connect on LinkedIn',
    },
    {
      name: 'GitHub',
      icon: <Github className="size-5" />,
      href: personal.links.github,
      label: 'View GitHub Profile',
    },
  ]

  // Download links configuration
  const downloadLinks = [
    {
      name: 'Resume PDF',
      icon: <Download className="size-5" />,
      href: '/resume/nadav-galili-resume.pdf',
      label: 'Download PDF',
      variant: 'default' as const,
    },
    {
      name: 'Resume DOCX',
      icon: <FileText className="size-5" />,
      href: '/resume/nadav-galili-resume.docx',
      label: 'Download DOCX',
      variant: 'outline' as const,
    },
  ]

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-card py-24 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Heading */}
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Let&apos;s Connect
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Interested in working together? Get in touch or download my resume.
          </p>

          {/* Social Links */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                onClick={() => handleLinkClick(link.name, link.href)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 px-6 py-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background/80 hover:shadow-lg hover:shadow-primary/10"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="text-primary transition-transform"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {link.icon}
                </motion.div>
                <span className="font-medium text-foreground">{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {downloadLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={link.variant}
                  size="lg"
                  asChild
                  className="min-w-[200px] gap-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <a
                    href={link.href}
                    download
                    onClick={() => handleLinkClick(link.name, link.href)}
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-sm text-muted-foreground"
          >
            Built with Next.js, TypeScript, and Tailwind CSS
          </motion.p>
        </motion.div>

        {/* Background Gradient Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
            className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
          />
        </div>
      </div>
    </section>
  )
}
