#!/bin/bash
# Stop Hook - Runs when Claude finishes responding
# Use case: Check tests, run linters, validate changes

set -e

echo "🔍 Running post-response checks..."

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    echo "⚠️  Not in project root, skipping checks"
    exit 0
fi

# Check if there are any uncommitted changes
if ! git diff --quiet 2>/dev/null; then
    echo "📝 Uncommitted changes detected"

    # Run TypeScript type checking
    if command -v npm &> /dev/null; then
        echo "🔎 Running TypeScript type check..."
        if npm run type-check 2>/dev/null || npx tsc --noEmit 2>/dev/null; then
            echo "✅ TypeScript: No type errors"
        else
            echo "⚠️  TypeScript: Type errors found (non-blocking)"
        fi
    fi

    # Run ESLint
    echo "🔍 Running ESLint..."
    if npm run lint 2>/dev/null; then
        echo "✅ ESLint: No issues"
    else
        echo "⚠️  ESLint: Issues found (non-blocking)"
    fi

    # Check for common issues
    echo "🔍 Checking for common issues..."

    # Check for console.log statements (warning only)
    if git diff --cached | grep -E "^\+.*console\.(log|debug|info)" > /dev/null 2>&1; then
        echo "⚠️  Warning: console.log statements found in staged changes"
    fi

    # Check for debugger statements (warning only)
    if git diff --cached | grep -E "^\+.*debugger" > /dev/null 2>&1; then
        echo "⚠️  Warning: debugger statements found in staged changes"
    fi

    # Check for TODO/FIXME comments (info only)
    TODO_COUNT=$(git diff --cached | grep -E "^\+.*(TODO|FIXME)" | wc -l | tr -d ' ')
    if [ "$TODO_COUNT" -gt 0 ]; then
        echo "ℹ️  Info: $TODO_COUNT TODO/FIXME comments added"
    fi

else
    echo "✅ No uncommitted changes"
fi

# Summary
echo ""
echo "✅ Post-response checks complete"
exit 0
