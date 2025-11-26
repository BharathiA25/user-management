import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'Search students...' }).click();
  await page.getByRole('textbox', { name: 'Search students...' }).fill('bharathi');
});