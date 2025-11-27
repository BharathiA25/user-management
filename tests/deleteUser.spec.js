import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button').nth(4).click();
  await page.getByRole('button', { name: 'Delete' }).click();
});