# Playwright Automation and Quality Gate

This suite turns the manual QA case study into executable browser checks for the live Oracle APEX application.

## Coverage in this first gate

- STEVE authentication
- Five homepage navigation cards
- Onboarding-form navigation
- Required-field validation
- BUG-001 regression: IT **Create Email** action must open without `ERR-1002`
- Desktop Chrome and mobile Chrome viewports

The BUG-001 check is skipped when no open IT Setup task exists. This is intentional because the live lab does not provide isolated test-data reset through an API.

## Run locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env` and enter test-account values.
3. Export those variables in your terminal (Playwright does not load `.env` automatically).
4. Run:

```bash
npm ci
npx playwright install chromium
npm test
```

Never commit `.env`, passwords, or an APEX URL containing `session=`.

## GitHub Actions secrets

In **Repository Settings → Secrets and variables → Actions**, add:

- `APEX_BASE_URL`
- `APEX_STEVE_USER`
- `APEX_STEVE_PASSWORD`
- `APEX_AMY_USER`
- `APEX_AMY_PASSWORD`

The workflow runs smoke and regression checks on pull requests, pushes to `main`, and manual dispatch. Failed runs retain the HTML report, screenshots, video, and traces as evidence.

## Quality-gate progression

1. **Foundation (this PR):** smoke, form validation, responsive coverage, BUG-001 regression.
2. **Data setup:** add a safe method to create and remove uniquely named test employees.
3. **Multi-role E2E:** STEVE creates employee → AMY completes IT → MONICA completes training → workflow completes.
4. **API/accessibility:** add REST checks and `axe-core` scans when stable API endpoints and accessibility scope are defined.
