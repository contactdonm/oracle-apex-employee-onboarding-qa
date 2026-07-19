import { expect, test } from '@playwright/test';
import { login } from '../support/apex';

test.beforeEach(async ({ page }) => login(page, 'STEVE'));

test('@smoke displays the five homepage navigation cards', async ({ page }) => {
  for (const label of [
    'Home',
    'New Employee - Onboarding',
    'Task Pages',
    'Workflow Pages',
    'Administration'
  ]) {
    await expect(page.getByText(label, { exact: true }).last()).toBeVisible();
  }
});

test('@smoke opens the onboarding form from the homepage', async ({ page }) => {
  await page.getByText('New Employee - Onboarding', { exact: true }).last().click();
  await expect(page.getByRole('heading', { name: 'New Employee - Onboarding' }))
    .toBeVisible();
  await expect(page.getByText('Personal Email', { exact: true })).toBeVisible();
  await expect(page.getByText('Employee Type', { exact: true })).toBeVisible();
});

test('@smoke enforces required onboarding fields', async ({ page }) => {
  await page.getByText('New Employee - Onboarding', { exact: true }).last().click();
  await page.getByRole('button', { name: 'Create', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'New Employee - Onboarding' }))
    .toBeVisible();
  await expect(page.locator(':invalid')).not.toHaveCount(0);
});
