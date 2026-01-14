#!/bin/bash
# UserPromptSubmit Hook - Runs when user submits prompts
# Use case: Validate prompts, inject context, log user requests

set -e

USER_PROMPT="$1"

# Log user prompts for analytics (optional)
# echo "[$(date)] User prompt: $USER_PROMPT" >> .claude/prompt-log.txt

# Inject project context for certain keywords
if echo "$USER_PROMPT" | grep -qiE "test|spec|playwright"; then
    echo "ℹ️  Hint: Use /frontend-tester agent for comprehensive testing"
fi

if echo "$USER_PROMPT" | grep -qiE "commit|push|pr|pull request"; then
    echo "ℹ️  Hint: Use /update-docs-and-commit to update docs before committing"
fi

if echo "$USER_PROMPT" | grep -qiE "issue|github issue|bug report|feature request"; then
    echo "ℹ️  Hint: Use /create-issues to generate structured GitHub issues"
fi

if echo "$USER_PROMPT" | grep -qiE "improve|learn|retro|retrospective"; then
    echo "ℹ️  Hint: Use retro-agent for continuous improvement insights"
fi

# Check if user is asking about deployment
if echo "$USER_PROMPT" | grep -qiE "deploy|vercel|production"; then
    echo "ℹ️  Remember: Set VERCEL_MCP_TOKEN for MCP integration"
fi

exit 0
