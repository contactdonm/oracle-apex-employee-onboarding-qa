import { expect, test } from '@playwright/test';
import { login } from '../support/apex';

test('@regression BUG-001 IT action opens without ERR-1002', async ({ page }) => {
  test.skip(
    !process.env.APEX_AMY_USER || !process.env.APEX_AMY_PASSWORD,
    'AMY credentials are required for the IT-task regression test'
  );

  await login(page, 'AMY');
  await page.getByText('My Tasks', { exact: true }).first().click();

  const itTask = page.getByText(/IT Setup Tasks for/i).first();
  test.skip(!(await itTask.isVisible().catch(() => false)), 'No open IT Setup task is available');
  await itTask.click();

  await page.getByRole('button', { name: 'Create Email', exact: true }).click();
  await expect(page.getByText(/ERR-1002|Unable to find item ID/i)).toHaveCount(0);
  await expect(page.getByText('New Email ID', { exact: true })).toBeVisible();
});
