---
name: create-issues
description: Creates GitHub issues from project specs or prompts. Breaks down features into structured, actionable issues with proper labels and formatting.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# create-issues

Creates GitHub issues from project specs or prompts. Intelligently breaks down features, bugs, or tasks into well-structured GitHub issues with proper formatting, labels, and organization.

## Usage

```bash
# Create issues from a prompt
/create-issues "Implement hero section with gradient animations"

# Create issues from project spec
/create-issues --spec project_spec.md

# Create issues with specific template
/create-issues --type feature "Add dark mode toggle"

# Create issues with labels and milestone
/create-issues --labels "enhancement,ui" --milestone "MVP" "Redesign contact section"

# Batch create from multiple specs
/create-issues --batch brainstorm.md
```

## What it does:

1. **Analyzes input** - Understands the scope and breaks down into logical issues
2. **Creates structured issues** - Proper titles, descriptions, acceptance criteria
3. **Adds metadata** - Labels, milestones, assignees, project boards
4. **Links related issues** - Dependencies and parent/child relationships
5. **Validates repo** - Ensures GitHub repo is configured

## Parameters

### Required
- `<prompt or description>` - What to create issues for

### Optional Flags
- `--spec <file>` - Create issues from a specification file
- `--type <type>` - Issue type: `feature`, `bug`, `task`, `enhancement`, `documentation`
- `--labels <labels>` - Comma-separated labels (e.g., "frontend,high-priority")
- `--milestone <name>` - Milestone to assign issues to
- `--assignee <username>` - GitHub username to assign
- `--project <number>` - Project board number to add to
- `--batch` - Create multiple issues from a document with sections
- `--dry-run` - Preview issues without creating them
- `--template <name>` - Use specific issue template

## Issue Types & Templates

### Feature Issues
```markdown
## Description
[What the feature does and why it's needed]

## User Story
As a [user type], I want [goal] so that [benefit]

## Acceptance Criteria
- [ ] [Specific measurable criterion]
- [ ] [Another criterion]

## Technical Notes
- [Implementation details]
- [Dependencies or prerequisites]

## Design References
- [Figma links, screenshots, etc.]

Labels: feature, frontend/backend
```

### Bug Issues
```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. [First step]
2. [Second step]
3. [See error]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]
- Device: [e.g., iPhone 14]

## Screenshots/Logs
[Attach if applicable]

## Priority
[High/Medium/Low]

Labels: bug, needs-investigation
```

### Task Issues
```markdown
## Task Description
[What needs to be done]

## Why
[Context or reason for this task]

## Checklist
- [ ] [Subtask 1]
- [ ] [Subtask 2]
- [ ] [Subtask 3]

## Dependencies
- Blocks: #[issue number]
- Requires: #[issue number]

Labels: task
```

## How It Works

### Step 1: Validate GitHub Access

Check if `gh` CLI is authenticated:
```bash
gh auth status
```

If not authenticated:
```bash
gh auth login
```

### Step 2: Get Repository Info

```bash
# Get current repo
gh repo view --json name,owner

# List existing labels
gh label list

# List milestones
gh milestone list

# Check if issues are enabled
gh repo view --json hasIssuesEnabled
```

### Step 3: Parse Input

**From Prompt:**
- Analyze the prompt to understand scope
- Break down into logical, atomic issues
- Infer issue type (feature, bug, task)
- Extract key requirements

**From Spec File:**
- Read the specification document
- Parse sections/headings as potential issues
- Extract requirements, constraints, acceptance criteria
- Identify dependencies between issues

### Step 4: Structure Issues

For each issue:
1. **Generate Title** - Clear, actionable (e.g., "Add smooth scroll animation to hero section")
2. **Write Description** - Context, why it matters, what it accomplishes
3. **Add Acceptance Criteria** - Specific, measurable, testable
4. **Include Technical Notes** - Implementation hints, gotchas, dependencies
5. **Set Metadata** - Labels, milestone, assignee, project

### Step 5: Create Issues

```bash
# Create issue with gh CLI
gh issue create \
  --title "Issue Title" \
  --body "Issue body with description" \
  --label "feature,frontend" \
  --milestone "MVP" \
  --assignee "@me" \
  --project 1

# Capture issue number for linking
ISSUE_NUM=$(gh issue create --title "..." --body "..." --json number --jq .number)

# Create related issue with link
gh issue create \
  --title "Related Task" \
  --body "Depends on #${ISSUE_NUM}" \
  --label "task"
```

### Step 6: Report Created Issues

Provide summary:
```
✅ Created 5 GitHub Issues

Features (3):
- #123: Implement hero section animations
- #124: Add 3D phone mockups
- #125: Create build notes section

Tasks (2):
- #126: Set up Framer Motion
- #127: Configure Lenis smooth scroll

View all: https://github.com/user/repo/issues
```

## Example Workflows

### Example 1: Create Feature from Prompt

```bash
/create-issues "Implement responsive navigation with mobile menu"
```

**Result:**
Creates issues:
1. **Feature: Responsive navigation header** (#101)
   - Desktop sticky nav with smooth scroll links
   - Mobile hamburger menu toggle
   - Accessibility (keyboard nav, ARIA labels)
   - Labels: `feature`, `frontend`, `accessibility`

2. **Task: Design mobile menu UI** (#102)
   - Depends on #101
   - Labels: `task`, `design`

3. **Task: Add navigation tests** (#103)
   - Test responsive breakpoints
   - Test menu interactions
   - Labels: `task`, `testing`

### Example 2: Create from Project Spec

```bash
/create-issues --spec project_spec.md --milestone "MVP"
```

**Process:**
1. Reads `project_spec.md`
2. Parses major sections as features
3. Extracts requirements as acceptance criteria
4. Creates hierarchical issues:
   - Parent: Epic/Feature
   - Children: Tasks to implement feature

**Result:**
```
✅ Created 15 issues from project_spec.md

Epics (2):
- #130: Hero Section (epic)
- #131: Professional Experience Section (epic)

Features (5):
- #132: Gradient background animation
- #133: Hero CTA buttons
- #134: Mobile-Brain timeline
- #135: Achievement cards
- #136: Tech stack icons

Tasks (8):
- #137: Install Framer Motion
- #138: Configure Tailwind gradients
- ...
```

### Example 3: Batch Create from Brainstorm

```bash
/create-issues --batch brainstorm.md --labels "enhancement"
```

**Parses brainstorm.md:**
```markdown
# Phase 1 Ideas
- Add theme toggle (dark/light)
- Implement search functionality

# Phase 2 Ideas
- Add blog section
- Integrate comments
```

**Creates:**
- #140: Add dark/light theme toggle
- #141: Implement search functionality
- #142: Add blog section (future)
- #143: Integrate comments system (future)

### Example 4: Bug Report

```bash
/create-issues --type bug "Hero CTA button not clickable on mobile"
```

**Creates:**
```markdown
Title: [Bug] Hero CTA button not clickable on mobile

## Bug Description
Hero CTA button ("View My Work") is not responding to taps on mobile devices.

## Steps to Reproduce
1. Visit site on iPhone Safari
2. Scroll to hero section
3. Tap "View My Work" button
4. Nothing happens

## Expected Behavior
Button should smooth scroll to Professional section

## Actual Behavior
Button does not respond to touch events

## Environment
- Device: iPhone 14
- Browser: Safari iOS 17
- Screen: 390x844

## Priority
High - Affects primary CTA

## Suggested Fix
- Check touch target size (min 44x44px)
- Verify z-index (may be behind overlay)
- Test pointer-events CSS

Labels: bug, mobile, high-priority
Milestone: MVP
```

## Smart Issue Breakdown

The command intelligently breaks down large features:

**Input:** "Implement hero section"

**Output (4 issues):**

1. **Feature: Hero Section Layout** (#150)
   ```
   - Responsive container
   - Gradient background
   - Typography hierarchy
   - CTA button placement
   ```

2. **Feature: Hero Animations** (#151)
   ```
   - Fade in on load
   - Gradient animation
   - CTA hover effects
   - Scroll indicator
   ```

3. **Task: Hero Content Integration** (#152)
   ```
   - Connect to resume.json
   - TypeScript interfaces
   - Handle missing data
   ```

4. **Task: Hero Section Tests** (#153)
   ```
   - Responsive tests
   - Animation tests
   - Accessibility tests
   ```

## Integration with Resume Web App

### Automatically Adds Project Context

Issues created include:
- **Project-specific labels**: `app-store-aesthetic`, `mobile-first`, `performance`
- **Component context**: Links to relevant CLAUDE.md sections
- **Tech stack tags**: `nextjs`, `react`, `tailwind`, `framer-motion`
- **Design references**: App Store guidelines, performance targets

### Example Issue Body

```markdown
## Feature: Hero Section Gradient Animation

### Description
Implement animated gradient background for hero section following Apple App Store aesthetic.

### User Story
As a visitor, I want an eye-catching animated hero section so that I'm immediately engaged.

### Acceptance Criteria
- [ ] Gradient transitions from iOS blue (#007AFF) to purple (#5856D6)
- [ ] Animation runs at 60fps on mid-range devices
- [ ] Respects `prefers-reduced-motion` media query
- [ ] Works on mobile (iPhone/Android) and desktop

### Technical Implementation
- Use CSS `background: linear-gradient()` with animation
- Animate via `transform` and `opacity` (GPU-accelerated)
- Fallback to static gradient if motion disabled
- Test on iPhone 14, Pixel 7, Desktop Chrome

### Design References
- CLAUDE.md: App Store Color Theme (line 201)
- Inspiration: Apple product pages gradient backgrounds

### Performance Target
- No frame drops (<16.67ms per frame)
- Lighthouse score: 95+

### Dependencies
- Requires: Tailwind CSS configuration
- Blocks: Hero section layout (#150)

Labels: feature, frontend, animations, performance
Milestone: MVP - Phase 2
```

## Advanced Features

### Dependency Mapping

Automatically detect and link related issues:
```bash
/create-issues "Implement 3D phone mockups with React Three Fiber"
```

Creates:
1. #160: Research React Three Fiber setup
2. #161: Create DeviceMockup3D component (depends on #160)
3. #162: Add lazy loading for 3D component (depends on #161)
4. #163: Test 3D performance on mobile (depends on #161)

Links issues with:
```markdown
Depends on: #160
Blocks: #162, #163
Related: #150 (Hero Section)
```

### Label Suggestions

Based on issue content:
- Keywords "animation" → `animations`, `performance`
- Keywords "mobile" → `mobile-first`, `responsive`
- Keywords "test" → `testing`, `quality`
- Keywords "accessibility" → `a11y`, `wcag`
- Keywords "bug" → `bug`, `needs-investigation`

### Milestone Auto-Assignment

Based on CLAUDE.md priorities:
- Hero section → MVP Phase 2
- Testing → MVP Phase 5
- AI chatbot → Phase 2 (future)
- Performance → MVP Phase 5

## Issue Templates

### Custom Templates

Create `.github/ISSUE_TEMPLATE/`:

**feature_request.md**
```markdown
---
name: Feature Request
about: Suggest a new feature for Resume Web App
labels: feature, needs-triage
---

## Feature Description
<!-- What feature do you want? -->

## User Benefit
<!-- How does this help users? -->

## Acceptance Criteria
- [ ] <!-- Specific criterion -->

## Design Mockups
<!-- Link to Figma, screenshots, etc. -->
```

**bug_report.md**
```markdown
---
name: Bug Report
about: Report a bug in Resume Web App
labels: bug, needs-triage
---

## Bug Description
<!-- Clear description of the bug -->

## Steps to Reproduce
1.
2.
3.

## Expected vs Actual
**Expected:**
**Actual:**

## Environment
- Device:
- Browser:
- OS:
```

## Dry Run Mode

Preview issues before creating:

```bash
/create-issues --dry-run "Implement contact section"
```

Output:
```
🔍 Dry Run - Issues to be created:

1. Feature: Contact Section Layout
   Labels: feature, frontend
   Milestone: MVP
   Body: 420 characters

2. Task: Add contact form validation
   Labels: task, frontend
   Depends on: #1
   Body: 315 characters

3. Task: Integrate email service
   Labels: task, backend
   Depends on: #1
   Body: 280 characters

Run without --dry-run to create these issues.
```

## Best Practices

### ✅ Do This

- **Be specific**: "Add smooth scroll to hero CTA" not "Fix scrolling"
- **Include context**: Reference CLAUDE.md, designs, or existing code
- **Set milestones**: Organize issues by MVP phases
- **Add labels**: Makes issues discoverable and filterable
- **Link dependencies**: Show relationship between issues
- **Use templates**: Consistent structure helps clarity

### ❌ Avoid This

- **Vague titles**: "Update stuff" or "Fix things"
- **Mega issues**: Break down large features into tasks
- **No acceptance criteria**: Makes "done" ambiguous
- **Missing labels**: Hard to filter and organize
- **Duplicate issues**: Check existing issues first

## Troubleshooting

### Error: "gh: command not found"

**Solution**: Install GitHub CLI
```bash
brew install gh
gh auth login
```

### Error: "Could not resolve to a Repository"

**Solution**: Ensure you're in a git repo with remote
```bash
git remote -v
gh repo set-default
```

### Error: "Resource not accessible by integration"

**Solution**: Check repo permissions
```bash
gh auth refresh -s write:org,repo
```

### Error: "Label 'xyz' does not exist"

**Solution**: Create label first
```bash
gh label create "xyz" --color "FF0000" --description "Description"
```

## Output Format

After creating issues:

```
✅ GitHub Issues Created Successfully

Repository: username/resume
Milestone: MVP - Phase 2

Features (3):
  #201: Implement hero section animations
    https://github.com/username/resume/issues/201
    Labels: feature, frontend, animations

  #202: Add 3D phone mockups
    https://github.com/username/resume/issues/202
    Labels: feature, 3d, react-three-fiber

  #203: Create build notes section
    https://github.com/username/resume/issues/203
    Labels: feature, frontend, documentation

Tasks (2):
  #204: Set up Framer Motion
    https://github.com/username/resume/issues/204
    Labels: task, dependencies
    Depends on: #201

  #205: Configure performance monitoring
    https://github.com/username/resume/issues/205
    Labels: task, performance

View All Issues: https://github.com/username/resume/issues?q=is%3Aissue+is%3Aopen

Next Steps:
- Review issues and adjust priorities
- Assign yourself to issues you'll work on
- Add to project board: gh issue list --assignee @me
- Start work: git checkout -b feature/hero-animations
```

## Your Workflow

```
Idea/Spec → /create-issues → GitHub Issues → Development → PR → Close Issues
```

This command transforms your ideas into actionable, organized work items that drive your Resume Web App to completion! 🚀
