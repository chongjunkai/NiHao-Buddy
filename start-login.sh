#!/bin/zsh

PROJECT_DIR="/Users/tta-python/Documents/Codex/2026-05-31/connect-to-github/work/NiHao-Buddy"
LOG_FILE="/Users/tta-python/Library/Logs/nihao-buddy.log"

cd "$PROJECT_DIR" || exit 1

if lsof -nP -iTCP:5000 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "$(date): NiHao Buddy is already running on port 5000." >> "$LOG_FILE"
  exit 0
fi

echo "$(date): Starting NiHao Buddy." >> "$LOG_FILE"
NIHAO_BUDDY_AUTO_START=1 ./venv/bin/python backend/app.py >> "$LOG_FILE" 2>&1
