"use client";

/**
 * HeroSection Component
 *
 * Dark-first hero in the App Store "Today" style:
 * - Aurora glow + faint grid backdrop (no flat gradient)
 * - Avatar chip, name, title and bio from resume.json
 * - Highlights strip (data-driven)
 * - Fan of real store screenshots from the flagship project
 * - Only transform/opacity are animated
 */

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks";
import type { PersonalInfo } from "@/types/resume";

interface HeroSectionProps {
  personal: PersonalInfo;
  /** Up to three portrait screenshots, front card first */
  screenshots?: { src: string; alt: string }[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Resting pose for each card in the fan: [x%, rotate, scale, z]
const FAN = [
  { x: "0%", rotate: 0, scale: 1, z: 30 },
  { x: "-58%", rotate: -9, scale: 0.86, z: 20 },
  { x: "58%", rotate: 9, scale: 0.86, z: 10 },
];

export default function HeroSection({
  personal,
  screenshots = [],
}: HeroSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const { trackSection, trackCTA, trackResumeDownload } = useAnalytics();

  useEffect(() => {
    if (isInView) {
      trackSection("hero");
    }
  }, [isInView, trackSection]);

  const handleScrollToWork = () => {
    trackCTA("View My Work", "hero");
    document
      .getElementById("indie-projects")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    trackCTA("Download Resume", "hero");
    trackResumeDownload("pdf", "hero");
  };

  const cards = screenshots.slice(0, 3);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:min-h-screen lg:flex lg:items-center">
      {/* Backdrop */}
      <div className="hero-aurora pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          {/* Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left">
            <motion.div
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/60 py-1.5 pl-1.5 pr-4 backdrop-blur-md">
              <span className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-border">
                <Image
                  src="/images/hero/hero.webp"
                  alt={`${personal.name} headshot`}
                  fill
                  priority
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {personal.location}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl font-semibold tracking-tighter text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              {personal.name}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gradient mt-4 text-xl font-medium tracking-tight sm:text-2xl lg:text-3xl">
              {personal.title}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
              {personal.bio}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                onClick={handleScrollToWork}
                size="lg"
                className="h-12 min-w-[190px] gap-2 rounded-full px-7 text-base font-semibold"
                aria-label="View my work and projects">
                View my work
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                onClick={handleDownloadResume}
                className="h-12 min-w-[190px] gap-2 rounded-full border-border/70 bg-card/40 px-7 text-base font-semibold backdrop-blur-md">
                <a
                  href="/resume/nadav-galili-resume.pdf"
                  download="nadav-galili-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download résumé
                </a>
              </Button>
            </motion.div>

            {personal.highlights && personal.highlights.length > 0 && (
              <motion.dl
                variants={itemVariants}
                className="mx-auto mt-12 grid max-w-xl grid-cols-3 divide-x divide-border/60 border-t border-border/60 pt-6 lg:mx-0">
                {personal.highlights.map((item) => (
                  <div key={item.label} className="px-3 first:pl-0 last:pr-0">
                    <dt className="sr-only">{item.label}</dt>
                    <dd className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {item.value}
                    </dd>
                    <dd
                      aria-hidden="true"
                      className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            )}
          </motion.div>

          {/* Screenshot fan */}
          {cards.length > 0 && (
            <div
              className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[520px] lg:h-[600px]"
              aria-label="Screenshots of Poker AI: HomeStack">
              <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
              {cards.map((shot, i) => {
                const pose = FAN[i];
                return (
                  <motion.div
                    key={shot.src}
                    initial={{ opacity: 0, y: 60, x: "0%", rotate: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      x: pose.x,
                      rotate: pose.rotate,
                      scale: pose.scale,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 60,
                      damping: 16,
                      delay: reduceMotion ? 0 : 0.35 + i * 0.12,
                    }}
                    style={{ zIndex: pose.z }}
                    className="absolute inset-y-0 left-1/2 -ml-[97px] w-[194px] sm:-ml-[120px] sm:w-[240px] lg:-ml-[139px] lg:w-[278px]">
                    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-white/15 bg-black shadow-2xl shadow-black/60 sm:rounded-[2.25rem]">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 640px) 194px, (max-width: 1024px) 240px, 278px"
                        className="object-cover object-top"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
