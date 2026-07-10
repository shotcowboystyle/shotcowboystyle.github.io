#!/usr/bin/env python3
import json
import sys
import re

try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")

# Only validate git commit commands
if tool_name != "Bash" or "git commit" not in command:
    sys.exit(0)

# Extract commit message from -m flag.
# IMPORTANT: try heredoc first — the inline-quote regex below will otherwise
# greedily match `-m "$(cat <<` and capture `$(cat <<` as the "message",
# because [^"\']+ stops at the single-quote in 'EOF'.
heredoc_match = re.search(
    r'git commit.*?-m\s+"?\$\(cat\s+<<["\']?EOF["\']?\s*\n(.+?)\nEOF',
    command,
    re.DOTALL,
)
# Also support `git commit -F <file>` (message-from-file).
file_match = re.search(r'git commit.*?-F\s+(\S+)', command)

if heredoc_match:
    commit_msg = heredoc_match.group(1).strip()
elif file_match:
    # Can't read the file contents at hook time without I/O side effects;
    # trust the caller and allow it. The repo-side hook (if any) will still gate.
    sys.exit(0)
else:
    inline_match = re.search(r'git commit.*?-m\s+["\']([^"\']+)["\']', command)
    if not inline_match:
        sys.exit(0)  # Can't extract message, allow it
    commit_msg = inline_match.group(1)

# Only validate the first line (the subject) against Conventional Commits.
commit_msg = commit_msg.splitlines()[0] if commit_msg else commit_msg

# Check if message follows Conventional Commits format
# Format: type(scope)?: description
# Types: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert
conventional_pattern = r'^(feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert)(\(.+\))?:\s.+'

if not re.match(conventional_pattern, commit_msg):
    reason = f"""❌ Invalid commit message format

Your message: {commit_msg}

Commit messages must follow Conventional Commits:
  type(scope): description

Types:
  feat:     New feature
  fix:      Bug fix
  docs:     Documentation changes
  style:    Code style changes (formatting)
  refactor: Code refactoring
  perf:     Performance improvements
  test:     Adding or updating tests
  chore:    Maintenance tasks
  ci:       CI/CD changes
  build:    Build system changes
  revert:   Revert previous commit

Examples:
  ✅ feat: add user authentication
  ✅ feat(auth): implement JWT tokens
  ✅ fix: resolve memory leak in parser
  ✅ fix(api): handle null responses
  ✅ docs: update API documentation

Invalid:
  ❌ Added new feature (no type)
  ❌ feat:add feature (missing space after colon)
  ❌ feature: add login (wrong type, use 'feat')

💡 Tip: Start your message with one of the types above followed by a colon and space."""

    output = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason
        }
    }
    print(json.dumps(output))
    sys.exit(0)

# Allow the command
sys.exit(0)
