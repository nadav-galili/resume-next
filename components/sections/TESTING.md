# Testing Guide for Section Components

This document provides testing instructions for all section components.

## HeroSection Testing

### Visual Tests

1. **Gradient Background**
   - [ ] Gradient displays correctly (blue to purple)
   - [ ] Background covers full viewport height
   - [ ] Gradient is smooth without banding

2. **Typography**
   - [ ] Name is largest and most prominent
   - [ ] Title is medium-sized below name
   - [ ] Bio text is readable on gradient
   - [ ] All text scales properly on mobile/tablet/desktop

3. **Buttons**
   - [ ] Primary button is white with blue text
   - [ ] Secondary button has glass morphism effect
   - [ ] Buttons stack vertically on mobile
   - [ ] Buttons are side-by-side on tablet/desktop
   - [ ] Buttons have proper hover states
   - [ ] Buttons have minimum 44x44px touch target

4. **Scroll Indicator**
   - [ ] Indicator appears at bottom center
   - [ ] Chevron icon bounces continuously
   - [ ] "Scroll to explore" text is visible
   - [ ] Indicator is clickable

5. **Decorative Elements**
   - [ ] Two gradient orbs are visible
   - [ ] Orbs create subtle depth effect
   - [ ] Orbs don't interfere with content

### Functional Tests

1. **"View My Work" Button**
   - [ ] Clicking scrolls smoothly to #professional section
   - [ ] Scroll behavior is smooth (not instant jump)
   - [ ] Analytics event fires: `trackCTAClick('View My Work', 'hero')`

2. **"Download Resume" Button**
   - [ ] Clicking downloads PDF file
   - [ ] File name is correct: `nadav-galili-resume.pdf`
   - [ ] Opens in new tab (target="_blank")
   - [ ] Analytics event fires: `trackCTAClick('Download Resume', 'hero')`

3. **Scroll Indicator**
   - [ ] Clicking scrolls to #professional section
   - [ ] Same smooth scroll as button

### Animation Tests

1. **Initial Load**
   - [ ] All content starts invisible (opacity: 0)
   - [ ] Animations trigger after 0.1s delay

2. **Stagger Sequence**
   - [ ] Name fades in first (0.1s)
   - [ ] Title fades in second (0.3s)
   - [ ] Bio fades in third (0.5s)
   - [ ] Buttons fade in last (0.7s)

3. **Spring Physics**
   - [ ] Elements have slight bounce when animating
   - [ ] Animation feels natural and smooth
   - [ ] No stuttering or lag

4. **Scroll Indicator Animation**
   - [ ] Bounces continuously in loop
   - [ ] Animation is smooth (60fps)
   - [ ] Doesn't distract from content

### Responsive Tests

1. **Mobile (< 640px)**
   - [ ] Text scales down appropriately
   - [ ] Buttons stack vertically
   - [ ] Buttons are full-width or nearly full-width
   - [ ] Content has adequate padding (24px)
   - [ ] Everything is readable and accessible

2. **Tablet (640px - 1024px)**
   - [ ] Text is medium-sized
   - [ ] Buttons are side-by-side
   - [ ] Layout is balanced
   - [ ] No awkward spacing

3. **Desktop (> 1024px)**
   - [ ] Text is largest size
   - [ ] Generous spacing and whitespace
   - [ ] Content centered with max-width
   - [ ] Looks premium and polished

### Accessibility Tests

1. **Keyboard Navigation**
   - [ ] Tab through all interactive elements
   - [ ] Focus indicator is visible
   - [ ] Enter/Space activates buttons and links

2. **Screen Readers**
   - [ ] Heading hierarchy is correct (h1 → h2 → p)
   - [ ] Buttons have descriptive labels
   - [ ] Link has proper rel attributes

3. **Reduced Motion**
   - [ ] Animations respect `prefers-reduced-motion`
   - [ ] Content is still accessible without animations

4. **Color Contrast**
   - [ ] White text on gradient meets WCAG AA
   - [ ] Button text meets contrast requirements

### Performance Tests

1. **Load Time**
   - [ ] Component renders within 100ms
   - [ ] No blocking scripts

2. **Animation Performance**
   - [ ] Animations run at 60fps
   - [ ] No janky or stuttering motion
   - [ ] GPU-accelerated (check DevTools)

3. **Memory Usage**
   - [ ] No memory leaks
   - [ ] Framer Motion doesn't hold stale references

### Browser Tests

Test in these browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Safari iOS (iPhone)
- [ ] Chrome Android
- [ ] LinkedIn in-app browser (important!)

### Edge Cases

1. **No JavaScript**
   - [ ] Content is still visible
   - [ ] Buttons are still functional (link works)

2. **Long Content**
   - [ ] Bio text wraps correctly if longer than expected
   - [ ] No overflow issues

3. **Missing Data**
   - [ ] Component handles missing optional fields
   - [ ] No console errors with minimal data

### Analytics Verification

Open browser console and check:

1. **Mixpanel Events**
   ```javascript
   // Should see these events in console (debug mode)
   mixpanel.track('CTA Click', {
     cta: 'View My Work',
     location: 'hero',
     timestamp: '...'
   })

   mixpanel.track('CTA Click', {
     cta: 'Download Resume',
     location: 'hero',
     timestamp: '...'
   })
   ```

2. **Event Timing**
   - [ ] Events fire immediately on click
   - [ ] No duplicate events
   - [ ] Timestamps are accurate

### Manual Testing Checklist

Copy this checklist for manual testing sessions:

```markdown
## HeroSection Test Session - [Date]

Tester: [Name]
Browser: [Browser + Version]
Device: [Device/Screen Size]

### Quick Visual Check
- [ ] Gradient looks good
- [ ] Text is readable
- [ ] Buttons look correct
- [ ] Animations are smooth

### Interaction Check
- [ ] "View My Work" scrolls correctly
- [ ] "Download Resume" downloads PDF
- [ ] Scroll indicator works
- [ ] Analytics tracking confirmed

### Responsive Check
- [ ] Looks good on mobile
- [ ] Looks good on tablet
- [ ] Looks good on desktop

### Accessibility Check
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] No color contrast issues

### Issues Found
[List any issues discovered]

### Notes
[Any additional observations]
```

## Automated Testing

### Component Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import HeroSection from './HeroSection'
import { trackCTAClick } from '@/lib/analytics'

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  trackCTAClick: jest.fn(),
}))

const mockPersonal = {
  name: 'Nadav Galili',
  title: 'Full-Stack Developer & Indie App Developer',
  bio: 'Full-stack developer with 5 years of experience...',
  email: 'nadav@example.com',
  location: 'Tel Aviv, Israel',
  links: {
    linkedin: 'https://linkedin.com/in/nadav-galili',
    github: 'https://github.com/nadav-galili',
  },
}

describe('HeroSection', () => {
  it('renders personal information correctly', () => {
    render(<HeroSection personal={mockPersonal} />)

    expect(screen.getByText('Nadav Galili')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Developer & Indie App Developer')).toBeInTheDocument()
    expect(screen.getByText(/Full-stack developer with 5 years/)).toBeInTheDocument()
  })

  it('renders both CTA buttons', () => {
    render(<HeroSection personal={mockPersonal} />)

    expect(screen.getByText('View My Work')).toBeInTheDocument()
    expect(screen.getByText('Download Resume')).toBeInTheDocument()
  })

  it('tracks analytics when "View My Work" is clicked', () => {
    render(<HeroSection personal={mockPersonal} />)

    const button = screen.getByText('View My Work')
    fireEvent.click(button)

    expect(trackCTAClick).toHaveBeenCalledWith('View My Work', 'hero')
  })

  it('tracks analytics when "Download Resume" is clicked', () => {
    render(<HeroSection personal={mockPersonal} />)

    const button = screen.getByText('Download Resume')
    fireEvent.click(button)

    expect(trackCTAClick).toHaveBeenCalledWith('Download Resume', 'hero')
  })

  it('download button has correct href', () => {
    render(<HeroSection personal={mockPersonal} />)

    const link = screen.getByText('Download Resume').closest('a')
    expect(link).toHaveAttribute('href', '/resume/nadav-galili-resume.pdf')
    expect(link).toHaveAttribute('download', 'nadav-galili-resume.pdf')
  })

  it('renders scroll indicator', () => {
    render(<HeroSection personal={mockPersonal} />)

    expect(screen.getByText('Scroll to explore')).toBeInTheDocument()
  })
})
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test HeroSection
```

## Common Issues & Solutions

### Issue: Animations not playing
**Solution**: Check that Framer Motion is installed and component is client-side

### Issue: Gradient not showing
**Solution**: Verify `.hero-gradient` class is in globals.css and Tailwind is processing it

### Issue: Scroll not working
**Solution**: Ensure target section has `id="professional"` and smooth scroll is enabled

### Issue: Analytics not tracking
**Solution**: Check Mixpanel initialization and NEXT_PUBLIC_MIXPANEL_TOKEN env var

### Issue: Buttons not styled
**Solution**: Verify shadcn/ui button component is installed and configured

### Issue: Mobile layout broken
**Solution**: Check responsive classes (sm:, md:, lg:) and flex direction

## Performance Benchmarks

Target metrics:

- **First Paint**: < 100ms
- **Animation Frame Rate**: 60fps (16.67ms per frame)
- **Total Bundle Size**: < 50KB (including dependencies)
- **Lighthouse Performance**: 95+
- **Time to Interactive**: < 2s

## Next Steps

After testing HeroSection:

1. Fix any issues found during testing
2. Document any edge cases discovered
3. Optimize performance if needed
4. Move on to testing ProfessionalSection
5. Continue with remaining sections
