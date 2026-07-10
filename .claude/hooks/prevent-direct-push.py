#!/usr/bin/env python3
import json
import sys
import subprocess

try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON input: {e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")

# Only validate git push commands
if tool_name != "Bash" or "git push" not in command:
    sys.exit(0)

PROTECTED = {"main", "develop"}
push_cmd = command
is_force_push = "--force" in push_cmd or "-f" in push_cmd

# ------------------------------------------------------------------
# Determine the push destination branch.
#
# Strategy: parse the explicit branch from the push command first.
# Falling back to `git branch --show-current` is unreliable in git
# worktrees because the hook always runs in $CLAUDE_PROJECT_DIR (the
# main repo), which may be on a different branch than the worktree.
# ------------------------------------------------------------------

def extract_explicit_branch(cmd: str) -> str | None:
    """Return the explicit destination branch from a git push command, or None."""
    tokens = cmd.split()
    # Strip git push flags and find positional args after "push"
    try:
        push_idx = next(i for i, t in enumerate(tokens) if t == "push")
    except StopIteration:
        return None

    positional = []
    skip_next = False
    for token in tokens[push_idx + 1:]:
        if skip_next:
            skip_next = False
            continue
        # Flags that consume a following value
        if token in ("-u", "--set-upstream", "--receive-pack", "--repo"):
            skip_next = True
            continue
        if token.startswith("-"):
            continue
        positional.append(token)

    # positional[0] = remote, positional[1] = refspec (branch or src:dst)
    if len(positional) >= 2:
        refspec = positional[1]
        # Handle src:dst — we care about the destination (rhs)
        dst = refspec.split(":")[-1] if ":" in refspec else refspec
        # Strip refs/heads/ prefix if present
        return dst.removeprefix("refs/heads/")

    return None


explicit_branch = extract_explicit_branch(push_cmd)

# Explicit push to a protected branch is always blocked.
if explicit_branch in PROTECTED or "origin main" in push_cmd or "origin develop" in push_cmd:
    is_pushing_to_protected = True
elif explicit_branch is not None:
    # Explicit non-protected branch — allow regardless of what the main
    # repo's HEAD says (handles git worktrees on story/feature branches).
    is_pushing_to_protected = False
else:
    # No explicit branch: will push to the tracking branch.
    # Fall back to reading the current branch from the repo.
    try:
        current_branch = subprocess.check_output(
            ["git", "branch", "--show-current"],
            stderr=subprocess.DEVNULL,
            text=True
        ).strip()
    except Exception:
        current_branch = ""
    is_pushing_to_protected = current_branch in PROTECTED

if is_pushing_to_protected and not is_force_push:
    target = explicit_branch or "main/develop"
    reason = f"""❌ Direct push to main/develop is not allowed!

Protected branches:
  - main (production)
  - develop (integration)

Git Flow workflow:
  1. Create a feature branch:
     git checkout -b feature/<name>

  2. Make your changes and commit

  3. Push feature branch:
     git push origin feature/<name>

  4. Create pull request:
     gh pr create

  5. After approval, merge with:
     /finish

For releases:
  /release <version> → PR → /finish

For hotfixes:
  /hotfix <name> → PR → /finish

Target: {target}

💡 Use feature/release/hotfix branches instead of pushing directly to main/develop."""

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
