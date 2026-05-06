# Presenter Script — GHAS Code Scanning & Dependabot Demo

> **Audience:** Engineering leads, security teams, and developers evaluating GitHub Advanced Security.
>
> **Goal:** Show how GHAS finds and fixes vulnerabilities in code and dependencies with minimal developer friction.
>
> **Pre-requisites:** This repo pushed to GitHub with GHAS enabled. Have the Security tab, a PR with vulnerable code, and the org Security Overview open in separate browser tabs.

---

## 🎬 Opening (5 min)

**SAY:**
> "Today I'm going to show you how GitHub Advanced Security helps teams find and fix security vulnerabilities before they reach production. We'll focus on two core capabilities: **Code Scanning** powered by CodeQL, and **Dependabot** for supply chain security."

> "The key theme is *developer experience* — these tools meet developers where they already work: in pull requests, in their IDE, and with AI-powered fix suggestions."

**SHOW:** The repo's Security tab overview page.

---

## 🔍 Part 1: Code Scanning with CodeQL

### Demo 1.1 — CodeQL Default Setup (5 min)

**SAY:**
> "Let's start by enabling code scanning. GitHub now offers a *default setup* that requires zero configuration — no YAML files, no workflow authoring."

**DO:**
1. Go to **Settings** > **Code security and analysis**
2. Find "Code scanning" and click **Set up** > **Default**
3. Show the language auto-detection (JavaScript, Python)
4. Click **Enable CodeQL**

**SAY:**
> "That's it. CodeQL will now run on every push to the default branch and on every pull request. It auto-detects languages and uses the `extended` query suite, which covers the most impactful security queries."

> "For teams that want more control, there's also an advanced setup option — let me show you what that looks like."

### Demo 1.2 — CodeQL Advanced Setup (5 min)

**DO:**
1. Open `.github/workflows/codeql-analysis.yml` in the repo
2. Walk through the workflow file

**SAY:**
> "The advanced setup gives you a GitHub Actions workflow you can customize. Here you can see we're using the `security-extended` query suite, which includes more queries than the default. We've also added a custom configuration that could reference organization-specific query packs."

**HIGHLIGHT:**
- The `languages` matrix
- The `queries: security-extended` setting
- The custom config file reference at `.github/codeql/codeql-config.yml`
- The schedule for periodic full-repo scans

### Demo 1.3 — Reviewing Code Scanning Alerts (5 min)

**DO:**
1. Navigate to **Security** tab > **Code scanning**
2. Open an alert (e.g., the SQL Injection in `src/server.js`)

**SAY:**
> "Here's a SQL injection vulnerability that CodeQL found. Notice the data-flow visualization — it shows exactly how untrusted user input flows from the HTTP request parameter all the way to the database query. This is powered by CodeQL's deep semantic analysis, not just pattern matching."

**HIGHLIGHT:**
- The severity badge and CWE reference
- The data-flow path (source → sink)
- The "Show paths" button
- The affected file and line number

### Demo 1.4 — Copilot Autofix (5 min)

**SAY:**
> "Now here's the feature that really changes the game: **Copilot Autofix**. When code scanning finds a vulnerability, GitHub's AI automatically generates a suggested fix."

**DO:**
1. On the same alert page, scroll to the **Copilot Autofix** suggestion
2. Show the diff with the proposed fix
3. Show the explanation text

**SAY:**
> "Copilot Autofix analyzed the vulnerability, understood the code context, and generated a parameterized query that eliminates the SQL injection. It even explains *why* the fix works. The developer can accept this with one click, edit it, or dismiss it."

> "This is available for all public repos and for organizations with a Code Security license. It supports JavaScript, TypeScript, Python, Java, C#, Go, Ruby, C/C++, Swift, and Rust."

**DO:**
1. Click **Commit suggestion** (or show the button)
2. Show that the alert would be resolved after merge

### Demo 1.5 — PR Integration (5 min)

**DO:**
1. Open the pre-prepared PR (the branch with `src/vulnerable-pr.js`)
2. Show the code scanning check status

**SAY:**
> "When a developer opens a pull request that introduces a new vulnerability, code scanning runs automatically and reports the findings directly in the PR. You can see the check is failing here."

**HIGHLIGHT:**
- The code scanning check in the PR checks list
- The inline annotation on the vulnerable line
- The Copilot Autofix suggestion in the PR conversation
- The ability to configure branch protection rules to require code scanning to pass

**SAY:**
> "This is the shift-left model in action — vulnerabilities are caught *before* they're merged, not after they're in production."

---

## 📦 Part 2: Dependabot

### Demo 2.1 — Dependabot Alerts (5 min)

**DO:**
1. Navigate to **Security** tab > **Dependabot alerts**
2. Show the list of alerts

**SAY:**
> "Dependabot monitors your dependency graph and alerts you when known vulnerabilities are found in your dependencies. Let's look at the alerts for this repo."

**DO:**
1. Open an alert (e.g., the `lodash` prototype pollution vulnerability)
2. Walk through the alert details

**HIGHLIGHT:**
- CVSS score and severity
- Affected version range and patched version
- The advisory description and CVE link
- Which manifest file (`package.json`) references this dependency
- Whether it's a direct or transitive dependency

### Demo 2.2 — Dependabot Security Updates (5 min)

**SAY:**
> "When Dependabot finds a vulnerability with an available fix, it automatically opens a pull request to update the dependency to the minimum safe version."

**DO:**
1. Show a Dependabot security update PR (or show the alert's "Create pull request" button)
2. Walk through the PR

**HIGHLIGHT:**
- The automatically generated PR title and description
- The changelog and release notes included in the PR body
- The compatibility score (percentage of CI runs that passed for this update across the ecosystem)
- The version diff (e.g., `1.4.0` → `1.4.1`)

**SAY:**
> "The compatibility score is especially useful — it's calculated from CI results across other public repos that made the same update. A high score means this update is very unlikely to break anything."

### Demo 2.3 — Version Updates & `dependabot.yml` (5 min)

**DO:**
1. Open `.github/dependabot.yml`
2. Walk through the configuration

**SAY:**
> "Beyond security updates, you can configure Dependabot to keep all your dependencies current with *version updates*. This `dependabot.yml` file controls the schedule, which ecosystems to monitor, and how PRs are organized."

**HIGHLIGHT:**
- Multiple package ecosystems (npm, pip, GitHub Actions)
- The `schedule` configuration
- The `groups` configuration for batching related updates
- The `open-pull-requests-limit` setting
- Reviewer and label assignments

### Demo 2.4 — Grouped Security Updates (5 min)

**SAY:**
> "One of the most requested features was reducing Dependabot PR noise. *Grouped security updates* solve this by batching multiple vulnerability fixes into a single PR."

**DO:**
1. Show the grouped updates configuration in `dependabot.yml`
2. Show an example grouped PR (or explain the grouping behavior)

**HIGHLIGHT:**
- The `groups` key in the config
- How dependencies are grouped by pattern, update type, or dependency type
- The combined changelog in a grouped PR

**SAY:**
> "You can also enable grouped security updates at the org level in Settings > Code security, which requires no YAML configuration at all."

### Demo 2.5 — Auto-Triage Rules & Dependency Review (5 min)

**SAY:**
> "Not all vulnerability alerts are equally important. Auto-triage rules let you automatically dismiss alerts that don't apply to your context."

**DO:**
1. Go to **Settings** > **Code security and analysis** > **Dependabot rules**
2. Show the "Dismiss low impact issues for development-scoped dependencies" preset
3. Show a custom rule example

**SAY:**
> "GitHub provides a built-in preset that auto-dismisses low-impact alerts for dev-only dependencies — things like test framework vulnerabilities that can't be exploited at runtime. You can also create custom rules based on severity, package name, CWE, and more."

**DO:**
1. Open `.github/workflows/dependency-review.yml`

**SAY:**
> "The Dependency Review Action adds another layer of protection. It runs on pull requests and blocks any PR that would introduce a dependency with a known vulnerability. Here's the workflow."

---

## 📊 Part 3: Security Overview & Governance (5 min)

**DO:**
1. Navigate to the **org-level Security tab** (or show screenshots in `docs/`)
2. Show the Security Overview dashboard

**SAY:**
> "At the organization level, the Security Overview dashboard gives security teams visibility across all repositories. You can see the risk view — how many repos have open critical and high alerts — and the coverage view — which repos have code scanning and Dependabot enabled."

**HIGHLIGHT:**
- Risk view: repos sorted by open alert count
- Coverage view: percentage of repos with each feature enabled
- Autofix metrics: how many suggestions were generated and accepted
- Filtering by team, topic, or severity

**SAY:**
> "For large organizations, you can enable GHAS features across all repos at once using *security configurations* — predefined settings that can be applied org-wide."

---

## 🎯 Wrap-Up (5 min)

**SAY:**
> "Let me recap the key takeaways:"
>
> 1. "**Code scanning with CodeQL** finds real vulnerabilities using semantic analysis — not just pattern matching — and it works out of the box with default setup."
> 2. "**Copilot Autofix** generates AI-powered fix suggestions, dramatically reducing time-to-remediation."
> 3. "**Dependabot** keeps your supply chain secure with alerts, automated PRs, and grouped updates."
> 4. "**Auto-triage rules** cut noise so teams focus on what matters."
> 5. "**Security Overview** gives leadership visibility without needing access to every repo."
>
> "Everything you've seen today works in the developer workflow — in PRs, in the IDE, and with AI assistance. The goal is to make security the path of least resistance."

**SHARE:**
- Link to this demo repo
- [GitHub Advanced Security docs](https://docs.github.com/en/code-security)
- [CodeQL documentation](https://codeql.github.com/)
- [Dependabot documentation](https://docs.github.com/en/code-security/dependabot)

---

## Appendix: Pre-Demo Checklist

- [ ] Fork repo to a GitHub org with GHAS license
- [ ] Enable CodeQL default setup (or push the workflow and let it run)
- [ ] Enable Dependabot alerts and security updates
- [ ] Wait for first CodeQL scan to complete (~10–15 min)
- [ ] Verify alerts appear in Security tab
- [ ] Create a PR from the `feature/add-search-endpoint` branch
- [ ] Open browser tabs: Security tab, a code scanning alert with Autofix, a Dependabot PR, org Security Overview
- [ ] Test screen sharing and font sizes
