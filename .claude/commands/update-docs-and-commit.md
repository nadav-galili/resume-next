---
name: update-docs-and-commit
description: Updates documentation files after major changes and creates a git commit
allowed-tools: Bash, Read, Edit, Write, Glob, Grep
---

# update-docs-and-commit

Updates documentation files after major changes and creates a git commit.

## Usage

```
/update-docs-and-commit [optional commit message or description]
```

## What it does:

1. **Analyzes git changes** (status + diff)
2. **Updates `docs/changelog.md`** - adds entries for new features/fixes
3. **Updates `docs/architecture.md`** - only if structural changes occurred
4. **Updates `docs/project_status.md`** - moves completed items, updates progress
5. **Stages and commits all changes**

**The command is conservative by design** - it only updates docs that genuinely need updating based on the actual code changes.

## When to Use

Use this command when:
- ✅ Completing a major feature or section
- ✅ Making architectural changes
- ✅ Adding new components or libraries
- ✅ Finishing a milestone (e.g., Hero section complete)
- ✅ Before creating a pull request

**Don't use** for:
- ❌ Minor typo fixes
- ❌ Small CSS tweaks
- ❌ Documentation-only changes

## Example Workflow

```bash
# After implementing the Hero section:
/update-docs-and-commit -m "Implement hero section with animations"

# Result:
# - docs/changelog.md updated with entry
# - docs/project_status.md shows Hero section complete
# - Git commit created with all changes
```

## Implementation Steps

### Step 1: Analyze Git Changes

Run the following commands to understand what changed:

```bash
git status
git diff
git diff --staged
```

**Analyze the changes to determine:**
- What files were added/modified/deleted?
- What components were added or changed?
- Were there structural changes (new folders, architecture changes)?
- Is this a new feature, bug fix, refactor, or documentation update?

### Step 2: Update Documentation (Conservative Approach)

**ALWAYS update:**

**`docs/changelog.md`** - Add entry for new features/fixes:
```markdown
## [YYYY-MM-DD] - [Brief Description]

### Added
- New components or features

### Changed
- Modified functionality

### Fixed
- Bug fixes

### Technical Details
- Implementation notes, tech stack used, performance metrics
```

**CONDITIONALLY update (only if genuinely needed):**

**`docs/architecture.md`** - Update ONLY if structural changes occurred:
- New component categories (e.g., new folder in `components/`)
- New library modules in `lib/`
- Changes to data flow or build process
- New dependencies that affect architecture
- **Do NOT update** for simple component additions within existing folders

**`docs/project_status.md`** - Update ONLY if milestone progress changed:
- Mark items as complete when finished
- Update current progress percentages
- Move items between "In Progress" and "Completed"
- **Do NOT update** if no milestones were completed

### Step 3: Stage and Commit All Changes

```bash
# Stage all changes (code + updated docs)
git add .

# Create commit with message
git commit -m "$(cat <<'EOF'
[User's commit message or auto-generated summary of changes]

Documentation updated:
- docs/changelog.md: Added entry for [change]
[- docs/architecture.md: Updated [section] (only if updated)]
[- docs/project_status.md: Marked [item] complete (only if updated)]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

## Conservative Update Rules

| Change Type | Update changelog.md | Update architecture.md | Update project_status.md |
|-------------|---------------------|------------------------|-------------------------|
| New component in existing folder | ✅ Yes | ❌ No | Only if milestone |
| New folder/category | ✅ Yes | ✅ Yes | Only if milestone |
| New dependency | ✅ Yes | ✅ Yes | ❌ No |
| Bug fix | ✅ Yes | ❌ No | ❌ No |
| Refactor existing code | ✅ Yes | ❌ No | ❌ No |
| Complete milestone | ✅ Yes | ❌ No | ✅ Yes |
| New lib/ utility | ✅ Yes | ✅ Yes | ❌ No |
| CSS/styling only | ✅ Yes | ❌ No | ❌ No |

## Best Practices

- **Be conservative**: Only update docs that genuinely need it
- **Run lint**: Execute `npm run lint` before committing (auto-fix if possible)
- **Respect hooks**: Never skip git hooks (pre-commit, commit-msg)
- **Clear messages**: Write descriptive commit messages
- **Follow etiquette**: Adhere to repository guidelines in CLAUDE.md

## Example

**Scenario**: Added HeroSection component in `components/sections/`

**Analysis**:
- New file: `components/sections/HeroSection.tsx`
- Modified: `app/page.tsx` (imported and used HeroSection)
- Category exists: `components/sections/` folder already exists
- No new dependencies

**Documentation Updates**:
- ✅ `docs/changelog.md` - Add entry for new HeroSection
- ❌ `docs/architecture.md` - No structural changes (sections folder exists)
- ❌ `docs/project_status.md` - Unless "Hero section" was a tracked milestone

**Commit**:
```
feat: implement hero section with animations

Added HeroSection component with gradient background and Framer Motion animations.
- Framer Motion for scroll reveals
- GPU-accelerated animations (60fps)
- Mobile-first responsive design

Documentation updated:
- docs/changelog.md: Added entry for HeroSection

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```
