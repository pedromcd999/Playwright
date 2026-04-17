import { test, expect } from '@playwright/test';


test('login page visual snapshot', async ({ page }) => { 

    await page.goto('https://the-internet.herokuapp.com/login');

    // Take a screenshot and compare it with the baseline image
    await expect(page).toHaveScreenshot('login-page.png');
})