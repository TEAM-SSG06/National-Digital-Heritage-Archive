# AGENTS.md

## Strict Operating Rules

### 1. Browser & Screenshot Ban
- **NEVER** launch Chrome, the browser subagent (`browser_subagent`), or capture browser screenshots.
- Browser automation and DOM/screenshot capture take too much time and are strictly prohibited during normal development tasks.
- **Target Verification Workflow**:
  - Validate code statically and syntactically (e.g. `node -c <file>`, linting, DOM structure checks in code).
  - Serve the application via the local development server (e.g. `python -m http.server 8080`).
  - Allow the user to view, test, and interact with the UI directly in their own browser.
  - Only execute browser automation if the user explicitly and unambiguously requests a browser test or screenshot in their immediate prompt.
