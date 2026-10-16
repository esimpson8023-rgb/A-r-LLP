#!/bin/bash
# rtk (Rust Token Killer) global setup for Claude Code cloud environments.
# Paste into: environment settings -> Setup script. Runs for every repo/session.
# Installs rtk, the global `rtk` skill, and the global Bash rewrite hook.
RTK_VERSION=v0.49.0
export PATH="$HOME/.local/bin:$PATH"
if ! command -v rtk >/dev/null 2>&1; then
  curl -fsSL "https://raw.githubusercontent.com/rtk-ai/rtk/refs/tags/${RTK_VERSION}/install.sh" \
    | RTK_VERSION="$RTK_VERSION" sh || echo "[rtk] install failed"
fi
mkdir -p "$HOME/.claude/skills/rtk"
ln -sf "$HOME/.local/bin/rtk" /usr/local/bin/rtk 2>/dev/null || true
command -v rtk >/dev/null 2>&1 && rtk init -g --auto-patch --no-trust-filters </dev/null || true
cat > "$HOME/.claude/skills/rtk/SKILL.md" <<'SKILL'
---
name: rtk
description: Use rtk (Rust Token Killer) to compress shell command output before it reaches the context window, saving 60-90% of tokens on git, ls, grep, find, test runners, logs, docker, kubectl and more. Use when running noisy shell commands, when the user mentions "rtk", "token savings", "compress output", "Rust Token Killer", or asks to install or set up rtk globally for Claude Code.
---

# rtk — Rust Token Killer

rtk is a single Rust binary (https://github.com/rtk-ai/rtk) that runs a command
and returns a condensed version of its output: grouped, deduplicated, truncated,
with noise stripped. Treat rtk output as the complete result.

## 1. Make sure rtk is installed

```bash
command -v rtk || export PATH="$HOME/.local/bin:$PATH"; rtk --version
```

If it is missing, install it (pinned, checksum-verified):

```bash
curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh \
  | RTK_VERSION=v0.49.0 sh
export PATH="$HOME/.local/bin:$PATH"
```

Alternatives: `brew install rtk`, or `cargo install rtk`. The Apache-2.0-only
edition (`RTK_EDITION=oss`) is not published for every release.
If the installer says the latest-version lookup failed, keep `RTK_VERSION` pinned.

## 2. Global setup (all projects, done once on the user's machine)

```bash
rtk init -g            # Claude Code: installs a PreToolUse hook in ~/.claude
rtk init -g --dry-run  # preview what it will change
```

After a restart, every Bash tool call such as `git status` is rewritten to
`rtk git status` automatically. The hook needs `jq`. It only covers Bash calls:
the built-in Read/Grep/Glob tools are not compressed, so call `rtk read`,
`rtk grep` or `rtk find` directly when output size matters.

Only run `rtk init -g` when the user asks for it, since it edits their global
Claude Code settings.

## 3. Using rtk directly (no hook needed)

Prefix the command with `rtk`:

| Instead of | Run |
|---|---|
| `git status` / `git diff` / `git log` | `rtk git status` / `rtk git diff` / `rtk git log` |
| `ls`, `tree` | `rtk ls .`, `rtk tree` |
| `cat file` | `rtk read file` |
| `grep -rn pat .` / `rg pat` | `rtk grep pat .` / `rtk rg pat` |
| `find . -name '*.js'` | `rtk find . -name '*.js'` |
| `npm test`, `pytest`, `cargo test` | `rtk test <cmd>` (failures only) |
| any build / lint | `rtk err <cmd>` (errors and warnings only) |
| log files | `rtk log file.log` (deduplicated) |
| JSON | `rtk json file.json` |
| `docker ps`, `kubectl get pods` | `rtk docker ps`, `rtk kubectl get pods` |
| anything else | `rtk summary <cmd>` |

Run `rtk --help` for the full list (100+ commands).

## 4. When the output is not enough

Truncated results say how to get the rest. Re-run a command as
`rtk proxy <cmd>` (unfiltered) only when the result is unusable: empty when output was
clearly expected, inconsistent with its exit code, or garbled.

## 5. Checking savings

```bash
rtk gain        # tokens saved so far
rtk gain --history
```
SKILL
exit 0
