#!/bin/bash
# SessionStart Hook - Runs when a session begins/resumes
# Use case: Set env vars, check setup, show project status

set -e

echo "🚀 Resume Web App - Development Session Starting"
echo ""

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "📦 Node.js: $NODE_VERSION"
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "⚠️  Warning: node_modules not found. Run 'npm install'"
else
    echo "✅ Dependencies installed"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found. Copy from .env.example"
else
    echo "✅ Environment variables configured"
fi

# Show current git branch
if command -v git &> /dev/null; then
    BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
    echo "🌿 Current branch: $BRANCH"

    # Show uncommitted changes count
    CHANGED=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
    if [ "$CHANGED" -gt 0 ]; then
        echo "📝 Uncommitted changes: $CHANGED files"
    fi
fi

# Show available custom commands
echo ""
echo "📚 Available commands:"
echo "  /update-docs-and-commit - Update docs and commit"
echo "  /create-issues - Create GitHub issues from specs"
echo ""
echo "🤖 Available agents:"
echo "  changelog-updater - Maintain version history"
echo "  frontend-tester - Run Playwright tests"
echo "  retro-agent - Continuous improvement"
echo ""

# Check if dev server is running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "🌐 Dev server running at http://localhost:3000"
else
    echo "ℹ️  Start dev server: npm run dev"
fi

echo ""
echo "✨ Ready to build your App Store-style resume!"
echo ""

exit 0
