import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('navigation', { name: 'pagination navigation' }).click();
  await page.getByRole('button', { name: 'Go to page 3' }).click();
  await page.getByRole('button', { name: 'Go to previous page' }).click();
  await page.getByRole('button', { name: 'Go to previous page' }).click();
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.getByRole('button', { name: 'Go to next page' }).click();
});