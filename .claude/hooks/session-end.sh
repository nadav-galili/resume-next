#!/bin/bash
# SessionEnd Hook - Runs when a session ends
# Use case: Logging, cleanup, session summary

set -e

echo ""
echo "👋 Session Ending - Resume Web App"
echo ""

# Show session summary
if command -v git &> /dev/null; then
    # Count commits in this session (last hour)
    COMMITS=$(git log --since="1 hour ago" --oneline 2>/dev/null | wc -l | tr -d ' ')
    if [ "$COMMITS" -gt 0 ]; then
        echo "📊 Session Summary:"
        echo "  Commits: $COMMITS"
        git log --since="1 hour ago" --pretty=format:"    - %s" 2>/dev/null || true
        echo ""
    fi

    # Show uncommitted changes
    CHANGED=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
    if [ "$CHANGED" -gt 0 ]; then
        echo ""
        echo "⚠️  Reminder: You have $CHANGED uncommitted files"
        echo "   Consider committing or stashing before ending session"
    fi
fi

# Suggest next session focus
echo ""
echo "💡 Suggestions for next session:"

# Check project status from docs
if [ -f "docs/project_status.md" ]; then
    # Find first incomplete task (simple grep)
    NEXT_TASK=$(grep -E "^- ⬜" "docs/project_status.md" 2>/dev/null | head -n 1 | sed 's/- ⬜ //' || echo "Review project_status.md")
    if [ -n "$NEXT_TASK" ]; then
        echo "  📋 Next task: $NEXT_TASK"
    fi
fi

# Suggest running retro-agent
LAST_COMMIT_TIME=$(git log -1 --format=%ct 2>/dev/null || echo "0")
CURRENT_TIME=$(date +%s)
TIME_DIFF=$((CURRENT_TIME - LAST_COMMIT_TIME))

# If it's been more than an hour since last commit and there were commits
if [ "$TIME_DIFF" -gt 3600 ] && [ "${COMMITS:-0}" -gt 0 ]; then
    echo "  🔄 Consider running retro-agent for continuous improvement"
fi

echo ""
echo "✅ Session ended. See you next time!"
echo ""

exit 0
