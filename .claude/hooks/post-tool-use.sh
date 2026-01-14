#!/bin/bash
# PostToolUse Hook - Runs after tool completes successfully
# Use case: Run linters, format code, auto-fix issues

set -e

TOOL_NAME="$1"
TOOL_STATUS="$2"

# Only run on successful tool execution
if [ "$TOOL_STATUS" != "success" ]; then
    exit 0
fi

# Run formatters/linters after Write or Edit operations
if [ "$TOOL_NAME" = "Write" ] || [ "$TOOL_NAME" = "Edit" ]; then
    FILE_PATH="$3"

    # Check if file exists
    if [ ! -f "$FILE_PATH" ]; then
        exit 0
    fi

    # Get file extension
    EXT="${FILE_PATH##*.}"

    case "$EXT" in
        ts|tsx|js|jsx)
            echo "🎨 Auto-formatting TypeScript/JavaScript file..."
            # Run Prettier if available
            if command -v npx &> /dev/null; then
                npx prettier --write "$FILE_PATH" 2>/dev/null || true
            fi
            ;;
        json)
            echo "🎨 Auto-formatting JSON file..."
            if command -v jq &> /dev/null; then
                # Format JSON with jq
                TMP=$(mktemp)
                jq '.' "$FILE_PATH" > "$TMP" && mv "$TMP" "$FILE_PATH" 2>/dev/null || true
            fi
            ;;
        md)
            echo "📝 Checking markdown file..."
            # Could add markdown linting here
            ;;
    esac
fi

# After git operations, show status
if [ "$TOOL_NAME" = "Bash" ] && echo "$3" | grep -q "^git"; then
    echo "📊 Git status:"
    git status --short 2>/dev/null || true
fi

exit 0
