#!/bin/bash
# PreToolUse Hook - Runs before any tool is executed
# Use case: Block dangerous commands, validate tool usage

set -e

TOOL_NAME="$1"
TOOL_ARGS="$2"

# Block dangerous rm commands without explicit permission
if [ "$TOOL_NAME" = "Bash" ]; then
    if echo "$TOOL_ARGS" | grep -qE "rm -rf /|rm -rf \*|rm -rf ~"; then
        echo "🚨 BLOCKED: Dangerous rm command detected"
        echo "   This command could delete critical files"
        exit 1
    fi

    # Warn about force pushes to main
    if echo "$TOOL_ARGS" | grep -qE "git push.*--force.*main|git push.*--force.*master"; then
        echo "⚠️  WARNING: Force push to main/master detected"
        echo "   This is generally not recommended"
        # Don't block, just warn
    fi

    # Warn about npm/yarn install of specific packages without audit
    if echo "$TOOL_ARGS" | grep -qE "npm install|yarn add"; then
        echo "ℹ️  Installing dependencies..."
        # Could add npm audit check here
    fi
fi

# Validate file paths for Write/Edit
if [ "$TOOL_NAME" = "Write" ] || [ "$TOOL_NAME" = "Edit" ]; then
    FILE_PATH="$TOOL_ARGS"

    # Block editing sensitive files
    if echo "$FILE_PATH" | grep -qE "\.env\.local$|\.ssh/|\.aws/credentials"; then
        echo "⚠️  WARNING: Editing sensitive file: $FILE_PATH"
        echo "   Make sure not to commit this file"
    fi

    # Warn if editing config files
    if echo "$FILE_PATH" | grep -qE "\.config\.(ts|js)$|tsconfig\.json$"; then
        echo "ℹ️  Editing configuration file: $FILE_PATH"
    fi
fi

exit 0
