#!/bin/bash
# SubagentStop Hook - Runs when subagent finishes
# Use case: Same as stop, but for agents - validate agent work, run checks

set -e

AGENT_NAME="$1"
AGENT_STATUS="$2"

echo "🤖 Subagent completed: $AGENT_NAME (status: $AGENT_STATUS)"

# Agent-specific post-processing
case "$AGENT_NAME" in
    changelog-updater)
        echo "📝 Changelog updated - verify entries in docs/changelog.md"
        ;;
    frontend-tester)
        echo "🎭 Tests completed - check test results"
        if [ "$AGENT_STATUS" = "success" ]; then
            echo "✅ All tests passed"
        else
            echo "⚠️  Some tests may have failed - review output"
        fi
        ;;
    retro-agent)
        echo "🔄 Retrospective complete - review improvement suggestions"
        echo "   Check for updated CLAUDE.md sections"
        ;;
    *)
        echo "ℹ️  Agent work complete"
        ;;
esac

# If agent modified files, show what changed
if ! git diff --quiet 2>/dev/null; then
    echo ""
    echo "📊 Files modified by agent:"
    git status --short 2>/dev/null || true
fi

exit 0
