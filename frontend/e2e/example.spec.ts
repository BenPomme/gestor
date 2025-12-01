import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the app name', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Gestoría Copilot/);
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    // Basic accessibility check - page should have main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });
});
