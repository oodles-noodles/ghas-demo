# GHAS Demo — Feature Highlights Reference

Quick-reference card for the presenter on key features and their value propositions.

---

## Code Scanning Features

### CodeQL Default Setup
- **What:** One-click enablement — no YAML required
- **Value:** Zero-friction adoption, auto-detects languages, uses extended query suite
- **Where:** Settings > Code security and analysis > Code scanning

### CodeQL Advanced Setup
- **What:** Full GitHub Actions workflow for custom scanning
- **Value:** Custom query suites, scheduled scans, multi-language matrix, custom config
- **Where:** `.github/workflows/codeql-analysis.yml`

### Copilot Autofix
- **What:** AI-generated fix suggestions for code scanning alerts
- **Value:** Reduces mean-time-to-remediate, lowers barrier for developers unfamiliar with security patterns
- **Supported:** C#, C/C++, Go, Java/Kotlin, JavaScript/TypeScript, Python, Ruby, Swift, Rust
- **Where:** Alert detail page and PR checks

### Security-Extended Query Suite
- **What:** Broader set of CodeQL queries beyond default
- **Value:** Catches more vulnerability types including quality issues with security impact
- **Where:** Configured in workflow or CodeQL config YAML

---

## Dependabot Features

### Dependabot Alerts
- **What:** Automatic notifications for vulnerable dependencies
- **Value:** Continuous monitoring of dependency graph against GitHub Advisory Database
- **Where:** Security tab > Dependabot alerts

### Dependabot Security Updates
- **What:** Auto-generated PRs to bump vulnerable dependencies to patched versions
- **Value:** One-click fix with compatibility scores, changelogs, and version diffs
- **Where:** Dependabot PRs, or "Create PR" button on alert

### Dependabot Version Updates
- **What:** Scheduled PRs to keep all dependencies current
- **Value:** Prevents dependency drift, reduces future upgrade pain
- **Where:** Configured in `.github/dependabot.yml`

### Grouped Security Updates
- **What:** Batch multiple vulnerability fixes into a single PR
- **Value:** Reduces PR noise — instead of 10 separate PRs, get 1 grouped PR
- **Config:** `groups:` key in `dependabot.yml` or org-level toggle

### Auto-Triage Rules
- **What:** Automatically dismiss or snooze alerts based on criteria
- **Value:** Focus on high-impact alerts, ignore dev-only/low-risk findings
- **Types:** GitHub presets (dismiss low-impact dev deps) and custom rules (by severity, CWE, package)
- **Where:** Settings > Code security > Dependabot rules

### Dependency Review Action
- **What:** GitHub Action that blocks PRs introducing vulnerable dependencies
- **Value:** Prevents new vulnerabilities from entering the codebase via PRs
- **Where:** `.github/workflows/dependency-review.yml`

---

## Security Overview (Org Level)

### Risk View
- See all repos sorted by number of open critical/high alerts
- Filter by team, topic, or severity

### Coverage View
- See which repos have code scanning, Dependabot, and secret scanning enabled
- Track adoption percentage across the organization

### Autofix Metrics
- Track how many Copilot Autofix suggestions were generated and accepted
- Measure the impact of AI-assisted remediation

---

## Demo Vulnerabilities Reference

### JavaScript (`src/server.js`)
| Vulnerability | CWE | CodeQL Query |
|--------------|-----|-------------|
| SQL Injection | CWE-89 | `js/sql-injection` |
| Reflected XSS | CWE-79 | `js/reflected-xss` |
| Path Traversal | CWE-22 | `js/path-injection` |
| Hardcoded Credentials | CWE-798 | `js/hardcoded-credentials` |
| Open Redirect | CWE-601 | `js/server-side-unvalidated-url-redirection` |
| Log Injection | CWE-117 | `js/log-injection` |

### JavaScript (`src/vulnerable-pr.js`) — PR Demo
| Vulnerability | CWE | CodeQL Query |
|--------------|-----|-------------|
| Command Injection | CWE-78 | `js/command-line-injection` |
| SSRF | CWE-918 | `js/request-forgery` |
| Prototype Pollution | CWE-1321 | `js/prototype-polluting-assignment` |
| ReDoS | CWE-1333 | `js/redos` |

### Python (`python/app.py`)
| Vulnerability | CWE | CodeQL Query |
|--------------|-----|-------------|
| SQL Injection | CWE-89 | `py/sql-injection` |
| Command Injection | CWE-78 | `py/command-line-injection` |
| Template Injection | CWE-1336 | `py/template-injection` |
| Insecure Deserialization | CWE-502 | `py/unsafe-deserialization` |
| Path Traversal | CWE-22 | `py/path-injection` |
| Weak Hashing | CWE-328 | `py/weak-crypto` |
| Open Redirect | CWE-601 | `py/url-redirection` |

### Vulnerable Dependencies
| Package | Ecosystem | Known CVEs |
|---------|-----------|-----------|
| lodash 4.17.20 | npm | CVE-2021-23337 (Command Injection) |
| axios 0.21.1 | npm | CVE-2021-3749 (ReDoS) |
| node-fetch 2.6.1 | npm | CVE-2022-0235 (Info Exposure) |
| minimist 1.2.5 | npm | CVE-2021-44906 (Prototype Pollution) |
| jsonwebtoken 8.5.1 | npm | CVE-2022-23529 |
| Pillow 8.3.1 | pip | Multiple CVEs |
| urllib3 1.26.5 | pip | CVE-2021-33503 |
| cryptography 3.4.6 | pip | Multiple CVEs |
| Jinja2 3.0.1 | pip | CVE-2024-22195 |
| setuptools 57.0.0 | pip | CVE-2022-40897 |
