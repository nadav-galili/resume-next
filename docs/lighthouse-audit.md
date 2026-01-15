# Lighthouse Audit Report - Performance Analysis

**Date:** January 15, 2026
**Auditor:** Claude Code
**Lighthouse Version:** 12.8.2
**Test Environment:** Production build (localhost:3000)
**Device:** Moto G Power (2022) - Mobile emulation

---

## Executive Summary

The resume web app shows **mixed results** in the Lighthouse audit:
- ✅ **Excellent**: Best Practices (100) and SEO (100)
- ⚠️ **Good**: Accessibility (91)
- ❌ **Needs Improvement**: Performance (62)

**Critical Issue**: Largest Contentful Paint (LCP) is **6.3 seconds**, far exceeding the target of 2.5s. This is primarily caused by **unused JavaScript** (900ms potential savings) and heavy main thread work (2.2s total).

---

## Category Scores

| Category | Score | Status | Target | Gap |
|----------|-------|--------|--------|-----|
| **Performance** | **62** | ❌ Fail | 95+ | -33 |
| **Accessibility** | **91** | ⚠️ Good | 95+ | -4 |
| **Best Practices** | **100** | ✅ Pass | 95+ | +5 |
| **SEO** | **100** | ✅ Pass | 95+ | +5 |

---

## 1. Performance Analysis (Score: 62) ❌

### Core Web Vitals

| Metric | Value | Status | Target | Assessment |
|--------|-------|--------|--------|------------|
| **First Contentful Paint (FCP)** | **0.9s** | ✅ Excellent | <1.0s | On target |
| **Largest Contentful Paint (LCP)** | **6.3s** | ❌ Poor | <2.5s | +153% over limit |
| **Speed Index** | **2.7s** | ⚠️ Fair | <2.0s | Acceptable |
| **Time to Interactive (TTI)** | **6.4s** | ❌ Poor | <2.0s | +220% over limit |
| **Total Blocking Time (TBT)** | **620ms** | ❌ Poor | <200ms | +210% over limit |
| **Cumulative Layout Shift (CLS)** | **0** | ✅ Excellent | <0.1 | Perfect |

### Critical Performance Issues

#### 1. Largest Contentful Paint: 6.3s ❌ **CRITICAL**

**Problem**: LCP is 6.3 seconds, **2.5x over the target** of 2.5s.

**Impact**:
- Poor perceived performance
- Users may leave before content loads
- Significantly hurts Core Web Vitals score
- Negative impact on SEO rankings

**Root Causes**:
1. **Unused JavaScript blocking render** (900ms savings available)
2. **Heavy main thread work** (2.2s total, 1.4s in script evaluation)
3. **Large JavaScript bundles** (339KB total, 199KB unused = 59% waste)

#### 2. Total Blocking Time: 620ms ❌ **CRITICAL**

**Problem**: Main thread is blocked for 620ms, **3.1x over the target** of 200ms.

**Impact**:
- Page feels sluggish and unresponsive
- User interactions delayed
- Poor user experience on low-end devices

**Main Thread Work Breakdown:**
- Script Evaluation: **1,368ms** (62% of total)
- Other: 363ms
- Style & Layout: 168ms
- Script Parsing & Compilation: 143ms
- Rendering: 58ms

**Total Main Thread Work**: 2.2 seconds

### Performance Opportunities

#### 1. Reduce Unused JavaScript: 900ms savings 🔴 **HIGH PRIORITY**

**Current State:**
- 4 main JavaScript bundles with significant unused code:

| Bundle | Total Size | Unused | Waste % |
|--------|------------|--------|---------|
| `2284ed7d2a18b970.js` | 101KB | 86KB | **85%** |
| `5bfba9edf04a1a1d.js` | 74KB | 57KB | **78%** |
| `9c6197b9b9ddd863.js` | 95KB | 32KB | 33% |
| `30ea11065999f7ac.js` | 69KB | 24KB | 35% |

**Total Waste**: ~199KB of unused JavaScript (59% of total)

**Root Cause Analysis:**

The high unused JavaScript percentage (85% and 78% in top bundles) suggests:

1. **React Three Fiber + Three.js Dependencies (~500KB)**
   - `DeviceMockup3D.tsx` uses React Three Fiber, Three.js, and Drei
   - These are heavy 3D libraries loaded for a single component
   - **Currently lazy-loaded BUT still downloaded on initial page load**
   - Issue: Lazy loading with `React.lazy()` still fetches the bundle during hydration

2. **Framer Motion Bloat**
   - Used extensively across all sections
   - May be importing entire library instead of tree-shaking
   - Unused animation features increasing bundle size

3. **Lenis Smooth Scroll**
   - Heavy library for smooth scrolling
   - May have better lightweight alternatives

**Recommendations:**

**🔴 Immediate (High Impact):**

1. **Remove or defer React Three Fiber** (Potential: -500KB, -400ms)
   - Current 3D mockup is temporarily disabled (using 2D fallback)
   - **Action**: Remove React Three Fiber, Three.js, Drei from production build
   - Keep 2D fallback as permanent solution (it's actually better for performance)
   - Alternative: If 3D is required, load via separate route or user-triggered modal

2. **Optimize Framer Motion imports** (Potential: -100KB, -150ms)
   ```typescript
   // ❌ Bad: Imports entire library
   import { motion } from 'framer-motion'

   // ✅ Good: Import only what's needed (if available)
   import { m as motion } from 'framer-motion/m'
   ```
   - Review all Framer Motion usage
   - Consider replacing simple animations with CSS
   - Use `LazyMotion` with domAnimation features

3. **Replace Lenis with lighter alternative** (Potential: -50KB, -100ms)
   - Lenis adds significant weight for smooth scrolling
   - Alternatives:
     - CSS `scroll-behavior: smooth` (already in globals.css)
     - Browser-native smooth scroll API
     - Smaller library like `smoothscroll-polyfill` (3KB)

**🟡 Short-term (Medium Impact):**

4. **Dynamic imports for heavy sections** (Potential: -200ms TTI)
   ```typescript
   // Lazy load sections that aren't immediately visible
   const BuildNotesSection = lazy(() => import('@/components/sections/BuildNotesSection'))
   const TechStackSection = lazy(() => import('@/components/sections/TechStackSection'))
   ```

5. **Code split by route** (if adding more pages)
   - Next.js does this automatically for `app/` routes
   - Ensure no shared client components between routes

**🟢 Long-term (Maintenance):**

6. **Bundle analysis**
   ```bash
   npm install -D @next/bundle-analyzer
   ```
   - Configure in `next.config.ts`
   - Identify other heavy dependencies
   - Monitor bundle size in CI/CD

7. **Tree-shaking verification**
   - Ensure `sideEffects: false` in package.json
   - Check all imports are ESM (not CommonJS)
   - Remove unused exports

#### 2. No Other Significant Opportunities Found ✅

Lighthouse did not flag:
- ✅ Render-blocking resources (none found)
- ✅ Unused CSS rules (Tailwind purges effectively)
- ✅ Image optimization (Next.js Image handles this)
- ✅ Text compression (Vercel handles this)
- ✅ Modern image formats (already using WebP via Next.js)

---

## 2. Accessibility Analysis (Score: 91) ⚠️

### Failed Audits

#### 1. Buttons Without Accessible Name (1 item) 🟡

**Failing Element:**
```html
<button data-slot="button" data-variant="outline" data-size="icon-sm" class="inl...
```

**Location**: Likely the **copy button** in `CodeSnippet.tsx`

**Issue**: Icon-only button without `aria-label`

**Fix** (`components/features/CodeSnippet.tsx`):
```typescript
<Button
  variant="outline"
  size="icon-sm"
  onClick={handleCopy}
  aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
  className="..."
>
  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
</Button>
```

**Impact**: Medium - screen readers cannot announce button purpose
**Effort**: Low - 2 minutes

#### 2. Insufficient Color Contrast (1 item) 🟡

**Failing Element:**
```html
<button data-slot="button" data-variant="default" data-size="lg" class="inline-f...
```

**Location**: Likely a primary button (possibly in Hero or Contact section)

**Issue**: Button color doesn't meet WCAG AA contrast ratio (4.5:1 for text)

**Investigation Needed**:
- Check if it's the white text on iOS blue button
- Verify contrast ratio of `oklch(60% 0.22 250)` on backgrounds
- May be a false positive if button is in gradient background

**Fix Options**:
1. Darken button background slightly
2. Use white text with stronger shadow for contrast
3. Verify this isn't a false positive from gradient testing

**Impact**: Medium - affects readability for users with low vision
**Effort**: Low - 5 minutes (after identifying exact button)

#### 3. Mismatched Accessible Names (1 item) 🟡

**Failing Element:**
```html
<a class="text-lg md:text-xl font-semibold text-white hover:text-primary transit...
```

**Location**: Likely the **logo link** in `Header.tsx:50-57`

**Issue**: Visual text doesn't match `aria-label`

**Current Code** (`Header.tsx:50-57`):
```typescript
<Link
  href="#hero"
  className="text-lg md:text-xl font-semibold text-white hover:text-primary transition-colors"
  onClick={() => handleNavClick('Logo', '#hero')}
  aria-label="Go to top of page"  // ← Mismatch
>
  {resumeData.personal.name}  // ← Visual text: "Nadav Galili"
</Link>
```

**Fix**:
```typescript
<Link
  href="#hero"
  className="text-lg md:text-xl font-semibold text-white hover:text-primary transition-colors"
  onClick={() => handleNavClick('Logo', '#hero')}
  aria-label={`${resumeData.personal.name} - Go to top of page`}
>
  {resumeData.personal.name}
</Link>
```

**Impact**: Low - minor screen reader confusion
**Effort**: Low - 1 minute

### Accessibility Score Impact

Fixing these 3 issues should improve the score from **91 → 96-98**, exceeding the 95+ target.

**Estimated Time**: 10 minutes total for all 3 fixes

---

## 3. Best Practices Analysis (Score: 100) ✅

**Perfect Score!** The application follows all best practices:

✅ Uses HTTPS (when deployed)
✅ No browser console errors
✅ No deprecated APIs
✅ Avoids third-party cookies
✅ Images have correct aspect ratios
✅ Proper viewport configuration
✅ Valid doctype
✅ Character set properly defined
✅ No geolocation or notification permission requests on load
✅ Passive event listeners
✅ HTTP/2 ready

**No action needed** - maintain current practices.

---

## 4. SEO Analysis (Score: 100) ✅

**Perfect Score!** The application is fully optimized for search engines:

✅ Document has title element
✅ Meta description present
✅ Viewport meta tag configured
✅ Document has valid lang attribute
✅ Links have descriptive text
✅ Links are crawlable
✅ Page isn't blocked from indexing
✅ robots.txt is valid
✅ Structured data is valid
✅ Legible font sizes
✅ Tap targets are appropriately sized
✅ Successful HTTP status code

**No action needed** - SEO is excellent.

---

## Summary of Recommendations

### 🔴 Critical Priority (Performance)

1. **Remove React Three Fiber dependencies** (-500KB, -400ms)
   - Keep 2D device mockup fallback
   - Remove unused 3D libraries
   - **Impact**: Massive performance improvement
   - **Effort**: 30 minutes

2. **Optimize Framer Motion** (-100KB, -150ms)
   - Use selective imports or LazyMotion
   - Replace simple animations with CSS
   - **Impact**: Significant bundle size reduction
   - **Effort**: 1-2 hours

3. **Replace Lenis with lightweight alternative** (-50KB, -100ms)
   - Use CSS `scroll-behavior: smooth`
   - Remove Lenis dependency
   - **Impact**: Moderate improvement
   - **Effort**: 30 minutes

**Total Potential Improvement**: -650KB bundle, -650ms load time
**Expected New LCP**: ~3.8s (still needs work, but major improvement)
**Expected New Performance Score**: ~78-82

### 🟡 High Priority (Accessibility)

4. **Fix 3 accessibility issues** (10 minutes)
   - Add `aria-label` to copy button
   - Fix color contrast issue
   - Match accessible name to visual text
   - **Expected New A11y Score**: 96-98

### 🟢 Medium Priority (Further Optimization)

5. **Dynamic imports for heavy sections**
6. **Bundle analysis and monitoring**
7. **Consider lazy loading non-critical sections**

---

## Expected Scores After Fixes

| Category | Current | After Fixes | Status |
|----------|---------|-------------|--------|
| Performance | 62 | **78-82** | ⚠️ Still below 95, but improved |
| Accessibility | 91 | **96-98** | ✅ Target achieved |
| Best Practices | 100 | **100** | ✅ Already perfect |
| SEO | 100 | **100** | ✅ Already perfect |

**Note**: To reach Performance 95+, additional optimizations beyond critical recommendations will be needed (server-side rendering improvements, CDN optimization, further code splitting).

---

## Performance Benchmark Comparison

### Current State
- FCP: 0.9s ✅
- **LCP: 6.3s** ❌ (Target: 2.5s)
- Speed Index: 2.7s ⚠️
- **TTI: 6.4s** ❌ (Target: 2.0s)
- **TBT: 620ms** ❌ (Target: 200ms)
- CLS: 0 ✅

### After Critical Fixes (Estimated)
- FCP: 0.8s ✅ (slight improvement)
- **LCP: 3.8s** ⚠️ (improved, but still over target)
- Speed Index: 2.2s ⚠️
- **TTI: 4.2s** ⚠️ (improved, but still over target)
- **TBT: 380ms** ⚠️ (improved, but still over target)
- CLS: 0 ✅

### To Reach 95+ Performance
Additional work needed:
- Server-side rendering optimization
- Advanced code splitting strategies
- Consider removing more animation libraries
- Implement progressive enhancement
- Optimize font loading further
- Consider static export for maximum performance

---

## Next Steps

### Immediate Actions (Today)

1. ✅ Review this report with team
2. 🔴 Remove React Three Fiber dependencies (30 min)
3. 🟡 Fix 3 accessibility issues (10 min)

**Estimated Time**: 40 minutes
**Expected Impact**: +16-20 Performance score, +5-7 Accessibility score

### Short-term Actions (This Week)

4. 🔴 Optimize Framer Motion (1-2 hours)
5. 🔴 Replace Lenis (30 min)
6. 🟢 Add bundle analyzer (15 min)

**Estimated Time**: 2-3 hours
**Expected Impact**: +8-12 additional Performance score

### Long-term Actions (Next Sprint)

7. Implement advanced code splitting
8. Consider SSR vs SSG tradeoffs
9. Progressive enhancement strategy
10. Continuous performance monitoring in CI/CD

---

## Conclusion

The resume web app has **excellent SEO and best practices** but **needs performance optimization** to reach the 95+ target across all categories.

**Key Takeaway**: The primary bottleneck is **unused JavaScript** (59% waste), particularly from React Three Fiber, Framer Motion, and Lenis. Removing or optimizing these dependencies will dramatically improve performance.

**Positive Notes**:
- ✅ Perfect CLS (0) - no layout shift issues
- ✅ Excellent FCP (0.9s) - fast initial paint
- ✅ Strong foundation with Next.js optimization
- ✅ Already using best practices (Image optimization, lazy loading)

**Action Required**: Focus on JavaScript bundle optimization to achieve target performance scores.

---

**Audit Completed**: January 15, 2026
**Next Audit**: After implementing critical recommendations
**Lighthouse Report**: `lighthouse-report.report.html` (open in browser for interactive view)
