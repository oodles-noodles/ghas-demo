#!/bin/bash
# Setup script for GHAS demo repository
# Run this after pushing to GitHub to prepare the demo branches

set -e

echo "=== GHAS Demo Setup ==="
echo ""

# Ensure we're in the repo root
if [ ! -f "package.json" ]; then
  echo "ERROR: Run this script from the ghas-demo repository root."
  exit 1
fi

echo "1. Initializing git repository..."
git init 2>/dev/null || true
git add -A
git commit -m "Initial commit: GHAS demo with intentional vulnerabilities" 2>/dev/null || echo "   (already committed)"

echo ""
echo "2. Creating feature branch for PR demo..."
git checkout -b feature/add-search-endpoint 2>/dev/null || git checkout feature/add-search-endpoint
# The vulnerable-pr.js file is already in src/, but on the feature branch
# we'll ensure it's the version that introduces new vulns
git add src/vulnerable-pr.js
git commit -m "feat: add search and config endpoints" 2>/dev/null || echo "   (already committed)"
git checkout main

echo ""
echo "3. Creating fix branch for demo..."
git checkout -b fix/resolve-sql-injection 2>/dev/null || git checkout fix/resolve-sql-injection
cp demo-fixes/fixed-server.js src/server.js
git add src/server.js
git commit -m "fix: resolve SQL injection and XSS vulnerabilities

- Use parameterized queries for database operations
- Encode HTML entities in search output
- Validate file paths to prevent directory traversal
- Restrict redirect targets to allowed hosts" 2>/dev/null || echo "   (already committed)"
git checkout main

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "  1. Create a GitHub repository and push:"
echo "     git remote add origin https://github.com/YOUR-ORG/ghas-demo.git"
echo "     git push -u origin main"
echo "     git push origin feature/add-search-endpoint"
echo "     git push origin fix/resolve-sql-injection"
echo ""
echo "  2. In GitHub Settings > Code security and analysis:"
echo "     - Enable Dependabot alerts"
echo "     - Enable Dependabot security updates"
echo "     - Enable Code scanning (default setup or push workflow)"
echo ""
echo "  3. Wait ~10-15 minutes for the first CodeQL scan to complete"
echo ""
echo "  4. Create a PR from feature/add-search-endpoint -> main"
echo "     (This will trigger code scanning on the PR)"
echo ""
echo "  5. Open the presenter script: docs/presenter-script.md"
