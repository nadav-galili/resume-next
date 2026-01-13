# Resume Web App – Brainstorm (MVP Phase)

## Goal
Create a **stunning, mobile-first resume web app** that feels like a real product and helps secure the next role, with **primary focus on React Native + Expo positions**.

The site should:
- Feel like an **App Store product page**
- Demonstrate **engineering judgment**, not just visuals
- Convert quickly (30–60 seconds) for recruiters & hiring managers
- Be backed by downloadable **Word/PDF resumes** (separate artifacts)

---

## Target Roles (Priority Order)
1. **React Native / Expo Developer** (primary)
2. Full-Stack Developer
3. Backend Developer
4. Frontend Developer

All design and content decisions should optimize for #1 first.

---

## Chosen Concept
### ✅ “App Store Product Page” Style Resume

The resume website behaves like a **mobile app landing page**:
- Polished, mobile-first UI
- Fast load, smooth transitions
- Clear hierarchy and scannability
- Looks and feels like something built by a senior RN/Expo dev

This is **not** a generic portfolio site.

---

## Flagship Project
### Poker AI (iOS + Android)

- Publicly available on **App Store & Google Play**
- Will be the **primary showcased product**
- Treated like a real shipped product, not a demo

Poker AI will anchor credibility and act as the main proof of experience.

---

## MVP Scope (Phase 1)

### Core Sections
1. **Hero**
   - Name + Role positioning
   - One-line value proposition (RN/Expo focused)
   - App Store–style primary CTA

2. **Product Showcase (Poker AI)**
   - App screenshots in device frames
   - Short feature captions
   - Platform badges (iOS / Android)

3. **Build Notes (Key Section)**
   Focus on *how* it was built:
   - React Native + Expo usage
   - Architecture decisions
   - Performance considerations
   - Release & deployment experience
   - Tradeoffs made

4. **Tech Stack (Curated)**
   - RN / Expo / TypeScript
   - Backend & infra only as supporting context
   - No long, generic tool lists

5. **Proof & Links**
   - App Store / Play Store links
   - GitHub (if applicable)
   - Contact actions

6. **Download Resume**
   - PDF
   - Word
   (Generated separately, but linked from the site)

---

## AI Chatbot Feature (Optional – Level 1 / Level 2)

### Purpose
The AI chatbot exists to:
- Answer **common hiring questions faster**
- Clarify experience without forcing long reading
- Act as a helpful assistant, not a gimmick

### Scope Control
- **Not** the centerpiece
- **Not** required for navigation
- Clearly optional

### Level 1 (MVP+)
- Simple “Ask me about my experience” chatbot
- Predefined suggested questions (buttons)
- Answers sourced only from resume content
- Fast, minimal UI

### Level 2 (Later Enhancement)
- Better retrieval from structured resume data
- More nuanced answers
- Clear citations (“Based on Poker AI…”)

### Tech Direction
- Use **Vercel AI SDK**
- Resume content stored as structured data (JSON / MD)
- Strict system rules:
  - Answer only from provided data
  - Admit when info is missing
  - Prefer concise, skimmable responses

---

## Content Strategy
- Single source of truth for resume content
- Website renders from structured data
- PDF/Word versions derived from same content (later step)
- Avoid divergence between formats

---

## Non-Goals (MVP)
- Overly complex animations
- Large interactive demos
- Making the chatbot the main feature
- Covering every past project equally

---

## Success Criteria
- Feels like a **real mobile product**
- RN/Expo expertise is obvious within seconds
- Poker AI clearly demonstrates shipped experience
- Works great on mobile, LinkedIn browser, low attention spans
- Leaves hiring managers with:  
  *“This person knows how to ship.”*

---

## Next Steps
- Define the **exact hero positioning sentence**
- Break down Poker AI into:
  - Features
  - Technical decisions
  - Metrics (if available)
- Sketch the MVP page structure
