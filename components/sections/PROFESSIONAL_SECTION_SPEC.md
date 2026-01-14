# ProfessionalSection Component Specification

## Visual Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     Professional Experience                  │
│            Building production applications at scale         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [GLASS CARD - Company Header]                               │
│                                                              │
│  Full-Stack Developer                                       │
│  Mobile-Brain • Tel Aviv, Israel              [5 years]     │
│                                                              │
│  Leading development of enterprise web applications          │
│  using React, Node.js, and TypeScript...                    │
└─────────────────────────────────────────────────────────────┘

┌───────────────────────────┬───────────────────────────────┐
│ [ACHIEVEMENT CARD 1]      │ [ACHIEVEMENT CARD 2]          │
│                           │                               │
│  Architected React        │  Optimized Application        │
│  Component Library        │  Performance                  │
│  [40% faster dev]         │  [74% improvement]            │
│                           │                               │
│  Built and maintained     │  Reduced page load time       │
│  comprehensive library... │  from 4.2s to 1.1s...         │
│                           │                               │
│                           │  ┌─────────────────────────┐  │
│                           │  │ Impact: Improved user   │  │
│                           │  │ retention by 28%        │  │
│                           │  └─────────────────────────┘  │
└───────────────────────────┴───────────────────────────────┘

┌───────────────────────────┬───────────────────────────────┐
│ [ACHIEVEMENT CARD 3]      │ [ACHIEVEMENT CARD 4]          │
│                           │                               │
│  Led TypeScript Migration │  Implemented CI/CD Pipeline   │
│  [60% reduction]          │  [90% faster deployments]     │
│                           │                               │
│  Spearheaded migration of │  Built automated testing      │
│  legacy JavaScript...     │  and deployment pipeline...   │
│                           │                               │
│                           │  ┌─────────────────────────┐  │
│                           │  │ Impact: Enabled daily   │  │
│                           │  │ releases                │  │
│                           │  └─────────────────────────┘  │
└───────────────────────────┴───────────────────────────────┘

                  ─────────────────────────────

                   Technologies & Tools

  [React] [TypeScript] [Node.js] [PostgreSQL] [AWS]
     [Docker] [Redis] [GraphQL]
```

## Component Hierarchy

```
<section id="professional" className="py-20">
  <div className="max-w-6xl mx-auto px-4">

    <!-- Section Header -->
    <motion.div className="text-center mb-12">
      <h2>Professional Experience</h2>
      <p>Building production applications at scale</p>
    </motion.div>

    <!-- Company Header Card -->
    <motion.div className="mb-12">
      <Card className="glass">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>{role}</CardTitle>
              <CardDescription>
                {company} • {location}
              </CardDescription>
            </div>
            <span className="bg-secondary">{duration}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
    </motion.div>

    <!-- Achievements Grid -->
    <motion.div className="grid sm:grid-cols-2 gap-6 mb-12">
      {achievements.map((achievement) => (
        <motion.div>
          <Card>
            <CardHeader>
              <CardTitle>{achievement.title}</CardTitle>
              {achievement.metrics && (
                <div className="bg-primary/10">
                  {achievement.metrics}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <p>{achievement.description}</p>
              {achievement.impact && (
                <div className="bg-secondary/30">
                  Impact: {achievement.impact}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>

    <!-- Tech Stack -->
    <motion.div>
      <Separator />
      <h3>Technologies & Tools</h3>
      <div className="flex flex-wrap gap-3">
        {techStack.map((tech) => (
          <motion.span className="border rounded-full px-4 py-2">
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>

  </div>
</section>
```

## Color Scheme (Dark Mode)

```
Background:        oklch(0% 0 0)           Pure black
Card Background:   oklch(18% 0 0)          Dark gray #1C1C1E
Text:              oklch(100% 0 0)         White
Muted Text:        oklch(66% 0 0)          Gray #949494
Primary (iOS Blue): oklch(60% 0.22 250)    #007AFF
Border:            oklch(32% 0 0)          Subtle dark borders

Glass Effect:      rgba(28, 28, 30, 0.7) + backdrop-blur(20px)
Metrics Badge:     bg-primary/10 + text-primary
Impact Box:        bg-secondary/30 + border-border/50
```

## Responsive Breakpoints

```
Mobile (< 640px):
  - Single column grid
  - Stack company header (flex-col)
  - Text: base size
  - Padding: px-4

Tablet (640px - 1024px):
  - Two column grid
  - Text: sm: prefix (slightly larger)
  - Padding: px-6

Desktop (> 1024px):
  - Two column grid
  - Text: lg: prefix (largest)
  - Padding: px-8
  - Max width: 1152px (6xl)
```

## Animation Timeline

```
Time    Element                  Animation
────────────────────────────────────────────────────────
0.0s    Section Header          Fade in + slide up
0.2s    Company Card            Fade in + slide up
0.4s    Achievement Card 1      Fade in + slide up
0.5s    Achievement Card 2      Fade in + slide up
0.6s    Achievement Card 3      Fade in + slide up
0.7s    Achievement Card 4      Fade in + slide up
0.9s    Separator               Fade in + slide up
1.0s    Tech Stack Header       Fade in + slide up
1.05s   Tech Tag 1              Fade in + scale
1.10s   Tech Tag 2              Fade in + scale
1.15s   Tech Tag 3              Fade in + scale
...     (continues with 0.05s stagger)
```

## Interaction States

### Achievement Cards

```
Default:
  - scale: 1
  - shadow: sm
  - border: border/50

Hover:
  - scale: 1.02
  - shadow: lg + shadow-primary/5
  - border: border/50 (unchanged)
  - transition: 0.3s ease-out
```

### Tech Tags

```
Default:
  - border: border/50
  - background: card
  - scale: 1

Hover:
  - scale: 1.1
  - border: primary/50
  - background: primary/5
  - transition: 0.2s
```

## Data Binding

```typescript
// From /data/resume.json
const experience = {
  company: "Mobile-Brain",
  role: "Full-Stack Developer",
  duration: "5 years",
  startDate: "2020-01-01",
  location: "Tel Aviv, Israel",
  description: "Leading development...",
  achievements: [
    {
      title: "Architected React Component Library",
      description: "Built and maintained...",
      metrics: "40% faster development",      // Optional
      impact: "Improved user retention by 28%" // Optional
    },
    // ... 3 more achievements
  ],
  techStack: [
    "React", "TypeScript", "Node.js", "PostgreSQL",
    "AWS", "Docker", "Redis", "GraphQL"
  ]
}
```

## Key Features Summary

1. **Data-Driven**: All content from `/data/resume.json`
2. **Animated**: Scroll-triggered Framer Motion animations
3. **Responsive**: Mobile-first design with breakpoints
4. **Accessible**: Semantic HTML, WCAG AA, reduced motion support
5. **Performant**: GPU-accelerated animations, lazy loading
6. **Interactive**: Hover effects on cards and tags
7. **Modular**: Reusable Card components from shadcn/ui
8. **Styled**: Glass morphism + App Store dark theme
9. **Professional**: Highlights metrics and impact clearly
10. **Maintainable**: TypeScript types, clear structure

## File Size

```
Component:           ~7.4 KB
Example Usage:       ~1.7 KB
TypeScript Types:    Imported from types/resume.ts
Dependencies:        framer-motion, shadcn/ui components
```

## Browser Support

- Modern browsers with ES2020+ support
- CSS Grid and Flexbox required
- Backdrop filter for glass morphism (graceful degradation)
- Framer Motion requires JavaScript enabled
- Animations respect prefers-reduced-motion

## Testing Checklist

- [ ] Renders with valid resume.json data
- [ ] Animations trigger on scroll into view
- [ ] Animations trigger only once (once: true)
- [ ] Cards hover effect works
- [ ] Tech tags hover effect works
- [ ] Responsive grid (2 → 1 column)
- [ ] Typography scales properly
- [ ] Glass effect renders correctly
- [ ] Metrics badges display when present
- [ ] Impact boxes display when present
- [ ] Tech tags render in correct order
- [ ] Section anchor link works (#professional)
- [ ] Respects prefers-reduced-motion
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Works in LinkedIn in-app browser
- [ ] Works in mobile Safari
- [ ] Works in Chrome mobile
