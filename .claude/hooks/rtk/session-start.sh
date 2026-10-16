#!/usr/bin/env bash
# SessionStart hook: make sure the rtk binary is available.
# Installs a pinned rtk release into ~/.local/bin in Claude Code cloud sessions;
# on local machines it only prints a hint, so it never installs anything unasked.
set -u

RTK_PIN="${RTK_VERSION:-v0.49.0}"
BIN_DIR="$HOME/.local/bin"
export PATH="$BIN_DIR:$PATH"

# Expose ~/.local/bin to later Bash tool calls (rewritten commands call `rtk`).
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$CLAUDE_ENV_FILE"
fi

if command -v rtk >/dev/null 2>&1; then
  exit 0
fi

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  echo "[rtk] rtk is not installed; Bash output will not be compressed. Install: https://github.com/rtk-ai/rtk#installation" >&2
  exit 0
fi

RTK_VERSION="$RTK_PIN" sh "$(dirname "$0")/install.sh" >&2 \
  || echo "[rtk] install failed; continuing without rtk" >&2
exit 0
