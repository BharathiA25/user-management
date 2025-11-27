import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button').nth(3).click();
  await page.locator('.MuiDialogContent-root').click();
  await page.locator('.MuiBackdrop-root.MuiBackdrop-invisible').click();
  await page.getByRole('textbox', { name: 'Phone Number' }).fill('1234567894');
});