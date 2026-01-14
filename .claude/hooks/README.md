# Claude Code Hooks

Hooks are shell scripts that run at specific points in Claude Code's execution lifecycle. They enable automation, validation, and workflow enhancement.

## Available Hooks

### 🛑 stop.sh (Highlighted Hook)
**When it fires**: When Claude finishes responding

**What it does**:
- ✅ Runs TypeScript type checking
- ✅ Executes ESLint for code quality
- ⚠️ Warns about console.log statements
- ⚠️ Warns about debugger statements
- ℹ️ Counts TODO/FIXME comments

**Use case**: Automatic quality checks after Claude makes changes

**Example output**:
```
🔍 Running post-response checks...
📝 Uncommitted changes detected
🔎 Running TypeScript type check...
✅ TypeScript: No type errors
🔍 Running ESLint...
✅ ESLint: No issues
✅ Post-response checks complete
```

---

### 🎨 post-tool-use.sh
**When it fires**: After tool completes successfully

**What it does**:
- Auto-formats TypeScript/JavaScript files with Prettier
- Auto-formats JSON files with jq
- Shows git status after git commands

**Use case**: Keep code formatted automatically

**Example output**:
```
🎨 Auto-formatting TypeScript/JavaScript file...
✅ Formatted: src/components/HeroSection.tsx
```

---

### 🚦 pre-tool-use.sh
**When it fires**: Before any tool is executed

**What it does**:
- 🚨 **Blocks** dangerous rm commands (`rm -rf /`, `rm -rf *`)
- ⚠️ Warns about force pushes to main/master
- ℹ️ Shows info when installing dependencies
- ⚠️ Warns when editing sensitive files (.env.local, .ssh/)

**Use case**: Prevent destructive operations

**Example output**:
```
🚨 BLOCKED: Dangerous rm command detected
   This command could delete critical files
```

---

### 💬 user-prompt-submit.sh
**When it fires**: When user submits prompts

**What it does**:
- Suggests relevant commands based on keywords
- Hints at using specialized agents
- Reminds about environment variables

**Use case**: Context-aware hints

**Example output**:
```
ℹ️ Hint: Use /create-issues to generate structured GitHub issues
ℹ️ Remember: Set VERCEL_MCP_TOKEN for MCP integration
```

**Triggers**:
- "test" → Suggests `frontend-tester` agent
- "commit" → Suggests `/update-docs-and-commit`
- "issue" → Suggests `/create-issues`
- "improve" → Suggests `retro-agent`

---

### 🚀 session-start.sh
**When it fires**: When a session begins/resumes

**What it does**:
- Shows Node.js version
- Checks if dependencies installed
- Verifies .env.local exists
- Shows current git branch
- Lists available commands and agents
- Checks if dev server is running

**Use case**: Project status overview at session start

**Example output**:
```
🚀 Resume Web App - Development Session Starting

📦 Node.js: v18.17.0
✅ Dependencies installed
✅ Environment variables configured
🌿 Current branch: main
📝 Uncommitted changes: 3 files

📚 Available commands:
  /update-docs-and-commit - Update docs and commit
  /create-issues - Create GitHub issues from specs

🤖 Available agents:
  changelog-updater - Maintain version history
  frontend-tester - Run Playwright tests
  retro-agent - Continuous improvement

🌐 Dev server running at http://localhost:3000

✨ Ready to build your App Store-style resume!
```

---

### 👋 session-end.sh
**When it fires**: When a session ends

**What it does**:
- Shows session summary (commits made)
- Lists uncommitted changes
- Suggests next tasks from project_status.md
- Recommends running retro-agent if appropriate

**Use case**: Session wrap-up and planning

**Example output**:
```
👋 Session Ending - Resume Web App

📊 Session Summary:
  Commits: 3
    - feat: implement hero section
    - fix: mobile responsive issues
    - docs: update changelog

⚠️ Reminder: You have 2 uncommitted files
   Consider committing or stashing before ending session

💡 Suggestions for next session:
  📋 Next task: Implement 3D phone mockups
  🔄 Consider running retro-agent for continuous improvement

✅ Session ended. See you next time!
```

---

### 🤖 subagent-stop.sh
**When it fires**: When subagent finishes

**What it does**:
- Shows agent-specific completion messages
- Validates agent work
- Lists modified files

**Use case**: Agent work summary

**Example output**:
```
🤖 Subagent completed: changelog-updater (status: success)
📝 Changelog updated - verify entries in docs/changelog.md

📊 Files modified by agent:
 M docs/changelog.md
```

---

## Hook Lifecycle

```
┌─────────────────────────────────────────────┐
│         Session Start                        │
│         ↓                                    │
│    session-start.sh                          │
└─────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         User Input                           │
│         ↓                                    │
│    user-prompt-submit.sh                     │
└─────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         Tool Execution                       │
│    pre-tool-use.sh → Tool → post-tool-use.sh│
└─────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         Response Complete                    │
│         ↓                                    │
│    stop.sh (Run checks)                      │
└─────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         Session End                          │
│         ↓                                    │
│    session-end.sh                            │
└─────────────────────────────────────────────┘
```

## Customization

All hooks are bash scripts. You can customize them by editing the files:

```bash
# Edit a hook
code .claude/hooks/stop.sh

# Test a hook manually
./.claude/hooks/stop.sh

# Disable a hook (rename to .disabled)
mv .claude/hooks/stop.sh .claude/hooks/stop.sh.disabled

# Re-enable
mv .claude/hooks/stop.sh.disabled .claude/hooks/stop.sh
```

## Hook Best Practices

### ✅ Do This
- Keep hooks fast (<2 seconds)
- Use `set -e` to exit on errors
- Provide clear output messages
- Make checks non-blocking when possible
- Test hooks before committing

### ❌ Avoid This
- Long-running operations
- Blocking user workflow unnecessarily
- Silent failures
- Complex logic (keep it simple)
- Modifying files without user knowing

## Project-Specific Hooks

These hooks are tailored for the Resume Web App:

### Quality Checks (stop.sh)
- TypeScript strict mode validation
- ESLint with Next.js rules
- Console.log detection
- TODO/FIXME tracking

### Auto-formatting (post-tool-use.sh)
- Prettier for TS/JS/TSX/JSX
- jq for JSON files
- Maintains code consistency

### Safety (pre-tool-use.sh)
- Prevents accidental deletions
- Protects .env.local from commits
- Warns about force pushes

### Context (user-prompt-submit.sh)
- Suggests MCP token setup
- Recommends agents for tasks
- Points to slash commands

## Debugging Hooks

If a hook is not working:

```bash
# Check if executable
ls -la .claude/hooks/stop.sh

# Make executable if needed
chmod +x .claude/hooks/stop.sh

# Test manually
./.claude/hooks/stop.sh

# Check for syntax errors
bash -n .claude/hooks/stop.sh

# Run with verbose output
bash -x .claude/hooks/stop.sh
```

## Integration with Resume Web App Workflow

```
Write Code → stop.sh (check tests/lint)
     ↓
Format Code → post-tool-use.sh (prettier)
     ↓
Commit → pre-tool-use.sh (validate)
     ↓
Session End → session-end.sh (summary)
     ↓
Next Session → session-start.sh (status)
```

## Environment Variables

Hooks have access to:
- `$PWD` - Current working directory
- `$HOME` - User home directory
- Git environment variables
- npm/node environment

## Common Hook Patterns

### Run command if available
```bash
if command -v npm &> /dev/null; then
    npm run lint
fi
```

### Check file existence
```bash
if [ -f "package.json" ]; then
    # File exists
fi
```

### Detect git changes
```bash
if ! git diff --quiet; then
    # Changes detected
fi
```

### Non-blocking warnings
```bash
npm run lint || echo "⚠️ Linting issues (non-blocking)"
```

## Future Hook Ideas

Consider adding:
- **notification.sh** - Send Slack/Discord alerts
- **pre-compact.sh** - Save transcript snapshots
- **permission-request.sh** - Auto-allow safe operations

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Hook not running | Check if executable (`chmod +x`) |
| Permission denied | Check file permissions |
| Command not found | Check if tool installed (`which <tool>`) |
| Hook taking too long | Optimize or remove blocking operations |
| Silent failures | Add `set -e` and error messages |

---

**Note**: Hooks are executed by Claude Code automatically. You don't need to call them manually - they fire at the appropriate lifecycle events.
