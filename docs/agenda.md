# GHAS Demo — Agenda

## GitHub Advanced Security: Code Scanning & Dependabot

**Duration:** ~60 minutes (adjust per audience)

---

### Opening (5 min)
- What is GitHub Advanced Security?
- Why shift-left security matters
- Overview of GHAS pillars: Code Scanning, Secret Scanning, Dependabot, Security Overview

---

### Part 1: Code Scanning with CodeQL (25 min)

| Time | Topic | Demo |
|------|-------|------|
| 5 min | **CodeQL Default Setup** | Enable code scanning with one click in repo settings. Show the zero-config experience. |
| 5 min | **CodeQL Advanced Setup** | Walk through the custom workflow file. Show the `security-extended` query suite and custom config. |
| 5 min | **Reviewing Alerts** | Navigate the Security tab. Show alert details, data-flow paths, severity, and CWE references. |
| 5 min | **Copilot Autofix** | Open a code scanning alert. Show the AI-generated fix suggestion. Accept and commit the fix. |
| 5 min | **PR Integration & Blocking** | Open a PR with vulnerable code. Show the code scanning check failing. Show inline annotations. |

---

### Part 2: Dependabot (25 min)

| Time | Topic | Demo |
|------|-------|------|
| 5 min | **Dependabot Alerts** | Navigate to the Security tab > Dependabot alerts. Show severity, CVSS scores, affected versions, and remediation paths. |
| 5 min | **Security Updates** | Show an auto-generated Dependabot PR. Walk through the changelog, compatibility score, and version diff. |
| 5 min | **Version Updates** | Walk through `dependabot.yml` config. Show scheduled version update PRs and grouping strategies. |
| 5 min | **Grouped Security Updates** | Show how multiple vulnerability fixes are batched into a single PR. Explain the configuration. |
| 5 min | **Auto-Triage Rules** | Demonstrate custom auto-triage rules — auto-dismiss dev-only low-severity alerts. Show the Dependency Review Action blocking a PR that adds a vulnerable package. |

---

### Part 3: Security Overview & Governance (5 min)

| Time | Topic | Demo |
|------|-------|------|
| 3 min | **Security Overview Dashboard** | Show the org-level dashboard: risk view, coverage view, Autofix metrics. |
| 2 min | **Enablement at Scale** | Show org-level settings for enabling GHAS across all repos. Discuss security configurations. |

---

### Q&A / Wrap-Up (5 min)
- Recap key takeaways
- Links to documentation and resources
- Next steps for adoption

---

## Key Talking Points

1. **Copilot Autofix** is the biggest recent addition — it reduces mean-time-to-remediate by generating AI-powered fix suggestions directly in the alert and PR views
2. **Grouped Dependabot updates** reduce PR noise by batching related security fixes
3. **Auto-triage rules** let teams focus on what matters by automatically dismissing low-impact dev-only alerts
4. **Default setup** makes it possible to enable CodeQL in seconds — no YAML required
5. **Dependency Review Action** prevents new vulnerabilities from entering via PRs
6. **Security Overview** gives org-level visibility without requiring access to individual repos
