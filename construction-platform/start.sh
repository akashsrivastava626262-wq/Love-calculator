#!/usr/bin/env bash
# Start the BuildCraft landing page locally
cd "$(dirname "$0")"
echo ""
echo "  BuildCraft landing page starting..."
echo "  Open in browser: http://localhost:8080"
echo "  Press Ctrl+C to stop"
echo ""
python3 -m http.server 8080
