# GitHub Advanced Security (GHAS) Demo Repository

This repository demonstrates the key features of **GitHub Advanced Security**, focusing on **Code Scanning** and **Dependabot**.

## What's Inside

| Directory | Purpose |
|-----------|---------|
| `src/` | JavaScript/Node.js app with intentional code scanning vulnerabilities |
| `python/` | Python app with intentional code scanning vulnerabilities |
| `.github/workflows/` | CodeQL and Dependabot workflow configurations |
| `.github/codeql/` | Custom CodeQL configuration |
| `demo-fixes/` | Pre-prepared fix branches for live demo |
| `docs/` | Agenda, presenter script, and supporting materials |

## Features Demonstrated

### Code Scanning
- **CodeQL Default Setup** — one-click enablement for code scanning
- **CodeQL Advanced Setup** — custom workflow with extended query suites
- **Copilot Autofix** — AI-generated fix suggestions for code scanning alerts
- **Custom CodeQL Queries** — organization-specific security policies
- **Security Overview Dashboard** — org-level visibility into findings
- **Pull Request Integration** — blocking merges on new vulnerabilities

### Dependabot
- **Dependabot Alerts** — automatic detection of vulnerable dependencies
- **Dependabot Security Updates** — auto-generated PRs to fix vulnerabilities
- **Dependabot Version Updates** — keeping dependencies current
- **Grouped Security Updates** — batching related updates into single PRs
- **Auto-Triage Rules** — custom rules to prioritize and dismiss alerts
- **Dependency Review Action** — blocking PRs that introduce vulnerable deps

## Quick Start

1. Fork this repository
2. Enable GitHub Advanced Security in Settings > Code security
3. Enable CodeQL default setup
4. Enable Dependabot alerts and security updates
5. Follow the [Presenter Script](docs/presenter-script.md)

## Prerequisites

- GitHub Enterprise Cloud or GitHub Team with Code Security license
- Repository admin access
- GitHub Actions enabled
