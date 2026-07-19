import { expect, Page } from '@playwright/test';

export type TestRole = 'STEVE' | 'AMY';

export async function login(page: Page, role: TestRole): Promise<void> {
  const username = process.env[`APEX_${role}_USER`];
  const password = process.env[`APEX_${role}_PASSWORD`];

  if (!username || !password) {
    throw new Error(`Missing APEX_${role}_USER or APEX_${role}_PASSWORD`);
  }

  await page.goto('/home');

  const userInput = page.locator(
    'input[name$="USERNAME"], input[id$="USERNAME"], input[autocomplete="username"]'
  ).first();
  const passwordInput = page.locator(
    'input[name$="PASSWORD"], input[id$="PASSWORD"], input[type="password"]'
  ).first();

  if (await userInput.isVisible().catch(() => false)) {
    await userInput.fill(username);
    await passwordInput.fill(password);
    await page.getByRole('button', { name: /sign in|log in|login/i }).click();
  }

  await expect(page.getByText('Employee Onboarding Application', { exact: true }).first())
    .toBeVisible();
}
