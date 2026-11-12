"use client";

/**
 * Indie Projects Section Component
 * Showcases multiple indie projects with App Store aesthetics
 * Features:
 * - Project selector tabs for switching between projects
 * - Two-column layout (desktop): mockup left, content right
 * - Single column (mobile): stacked vertically
 * - Device mockup for mobile apps, simplified view for web apps
 * - Feature cards with icons
 * - App Store/Play Store badges OR website links
 * - Metrics showcase
 * - Tech stack tags
 * - Scroll-triggered animations
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useAnalytics } from "@/hooks";
import {
  Brain,
  BarChart,
  BarChart2,
  GraduationCap,
  TrendingUp,
  Star,
  RefreshCw,
  Bell,
  Layout,
  ExternalLink,
  Zap,
  Calculator,
  Swords,
  Trophy,
  Sparkles,
  Languages,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppStoreBadge from "@/components/features/AppStoreBadge";
import FeatureShowcase from "@/components/features/FeatureShowcase";
import Image from "next/image";
import resumeData from "@/data/resume.json";
import type { IndieProject } from "@/types/resume";

// Extended icon mapping for all features
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain,
  "chart-bar": BarChart,
  "bar-chart-2": BarChart2,
  "graduation-cap": GraduationCap,
  "trending-up": TrendingUp,
  "refresh-cw": RefreshCw,
  bell: Bell,
  layout: Layout,
  zap: Zap,
  calculator: Calculator,
  swords: Swords,
  trophy: Trophy,
  sparkles: Sparkles,
  languages: Languages,
};

// Feature Card Component (for projects without images)
function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  const Icon = iconMap[icon] || Brain;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="relative z-10">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <CardDescription className="text-sm leading-relaxed">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Feature List Component (simple grid for projects without feature images)
function FeatureList({ features }: { features: IndieProject["features"] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          index={index}
        />
      ))}
    </div>
  );
}

// App Store style info ribbon: small caps label, big value, sub label
function InfoRibbon({
  items,
}: {
  items: { label: string; value: string; sub?: string; stars?: boolean }[];
}) {
  return (
    <dl className="scrollbar-hide flex divide-x divide-border/60 overflow-x-auto border-y border-border/60 py-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex min-w-[112px] flex-1 flex-col items-center gap-1 px-4 text-center">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {item.label}
          </dt>
          <dd className="text-xl font-semibold tracking-tight text-foreground">
            {item.value}
          </dd>
          <dd className="flex items-center gap-0.5 text-xs text-muted-foreground">
            {item.stars
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-current"
                    aria-hidden="true"
                  />
                ))
              : item.sub}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Horizontally scrolling store screenshots with snap, like an App Store listing
function ScreenshotGallery({
  shots,
  appName,
}: {
  shots: NonNullable<IndieProject["screenshots"]>;
  appName: string;
}) {
  return (
    <div className="relative -mx-4 md:-mx-6">
      <ul
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 pt-2 md:gap-5 md:px-6"
        aria-label={`${appName} store screenshots`}>
        {shots.map((shot, index) => (
          <motion.li
            key={shot.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.07 }}
            className="w-[62vw] max-w-[230px] shrink-0 snap-center lg:w-auto lg:max-w-none lg:flex-1 lg:shrink">
            <div className="relative aspect-[828/1792] overflow-hidden rounded-[1.5rem] border border-border/60 bg-black shadow-xl shadow-black/30 transition-transform duration-300 hover:-translate-y-1.5">
              <Image
                src={shot.src}
                alt={`${appName} – ${shot.title}`}
                fill
                sizes="230px"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-foreground">
              {shot.title}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

// Tech Stack Badge Component
function TechBadge({ name, index }: { name: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="inline-block rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-md">
      {name}
    </motion.span>
  );
}

// Check if project has mobile platforms
function isMobileProject(project: IndieProject): boolean {
  return (
    project.platforms.includes("iOS") || project.platforms.includes("Android")
  );
}

// Check if project has feature images
function hasFeatureImages(project: IndieProject): boolean {
  return project.features.some((f) => f.image);
}

export default function IndieProjectsSection() {
  const projects = resumeData.indieProjects as IndieProject[];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { trackSection, trackProject } = useAnalytics();

  // Track section view
  useEffect(() => {
    if (isInView) {
      trackSection("indie-projects");
    }
  }, [isInView, trackSection]);

  // Track project selection changes
  const handleProjectSelect = (index: number) => {
    setSelectedIndex(index);
    trackProject(projects[index].name, "select_tab");
  };

  if (!projects.length) {
    return null;
  }

  const selectedProject = projects[selectedIndex];

  return (
    <section
      id="indie-projects"
      className="relative overflow-hidden py-20 md:py-32"
      ref={ref}>
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-primary/8 to-background" />

      {/* Additional gradient orbs for depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl"
        />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Shipped Products
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Designed, built and shipped end to end — from first commit to the
            App Store and Google Play
          </p>
        </motion.div>

        {/* Project Selector Tabs (only show if multiple projects) */}
        {projects.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 flex justify-center">
            <div className="scrollbar-hide inline-flex max-w-full gap-2 overflow-x-auto rounded-xl border border-border/50 bg-card/30 p-1.5 backdrop-blur-sm">
              {projects.map((project, index) => (
                <button
                  key={project.name}
                  onClick={() => handleProjectSelect(index)}
                  className={`
                    relative shrink-0 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300
                    ${
                      selectedIndex === index
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
                    }
                  `}>
                  {project.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Project Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProject.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}>
            {isMobileProject(selectedProject) ? (
              <div className="mx-auto max-w-5xl">
                {/* Store header: icon, name, badges */}
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
                  {selectedProject.icon && (
                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[22%] border border-border/60 shadow-xl shadow-primary/20 sm:h-32 sm:w-32">
                      <Image
                        src={selectedProject.icon}
                        alt={`${selectedProject.name} app icon`}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                      {selectedProject.name}
                    </h3>
                    <p className="mt-1 text-lg text-muted-foreground">
                      {selectedProject.tagline}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      {selectedProject.links.appStore && (
                        <AppStoreBadge
                          platform="ios"
                          url={selectedProject.links.appStore}
                        />
                      )}
                      {selectedProject.links.playStore && (
                        <AppStoreBadge
                          platform="android"
                          url={selectedProject.links.playStore}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {selectedProject.store && (
                  <div className="mt-8">
                    <InfoRibbon items={selectedProject.store} />
                  </div>
                )}

                {selectedProject.screenshots && (
                  <div className="mt-10">
                    <ScreenshotGallery
                      shots={selectedProject.screenshots}
                      appName={selectedProject.name}
                    />
                  </div>
                )}

                <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
                  {selectedProject.description}
                </p>

                <div className="mt-12">
                  <FeatureList features={selectedProject.features} />
                </div>
              </div>
            ) : (
              <>
                <div className="mx-auto flex max-w-2xl flex-col justify-center space-y-8 text-center">
                  <div>
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                      <Layout className="h-4 w-4" />
                      Progressive Web App
                    </div>
                    <h3 className="mb-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                      {selectedProject.name}
                    </h3>
                    <p className="mb-4 text-xl text-primary">
                      {selectedProject.tagline}
                    </p>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.links.website && (
                    <div className="flex justify-center">
                      <Button asChild variant="default" size="lg">
                        <a
                          href={selectedProject.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Visit Website
                        </a>
                      </Button>
                    </div>
                  )}

                  {selectedProject.metrics?.impact && (
                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-4 py-2 text-sm font-medium text-foreground">
                      <Zap className="h-4 w-4 text-primary" />
                      {selectedProject.metrics.impact}
                    </div>
                  )}
                </div>

                <div className="mt-16">
                  {hasFeatureImages(selectedProject) ? (
                    <FeatureShowcase
                      features={selectedProject.features}
                      isWebProject
                    />
                  ) : (
                    <FeatureList features={selectedProject.features} />
                  )}
                </div>
              </>
            )}

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16">
              <h4 className="mb-6 text-center text-xl font-semibold text-foreground">
                Built With
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {selectedProject.techStack.map((tech, index) => (
                  <TechBadge key={tech.name} name={tech.name} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
