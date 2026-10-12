#!/usr/bin/env bash
# Skrip Pelancar Pantas: Detektif Siber Matematik Tahun 6
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$DIR"

export PATH="$PATH:/opt/homebrew/bin:/usr/local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin"

echo "=========================================================="
echo "🕵️‍♂️ DETEKTIF SIBER MATEMATIK TAHUN 6 (KSSR SEMAKAN)"
echo "   Agensi Risikan Matematik Siber (ARMS) - WebApp"
echo "=========================================================="
echo "Memulakan pelayan tempatan..."

npm run dev
