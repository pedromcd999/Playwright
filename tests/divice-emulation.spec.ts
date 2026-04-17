import { test, expect, devices } from "@playwright/test";


test.describe('Emulando test en dispositivos', () => {

    test('emular pixel 5 en el test', async ({ browser }) => {

        const context = await browser.newContext({
            ...devices['Pixel 5'],
            locale: 'en-EN',
            permissions: ['geolocation']
        });

        const page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/login');
        await expect(page.locator('h2')).toHaveText('Login Page');
        await context.close();
    });

    test('cambiar resolucion de la ventana', async ({ page }) => {

        await page.setViewportSize({ width: 600, height: 400 });
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.setViewportSize({ width: 800, height: 600 });
    })

    test('emular ubicacion', async ({ browser }) => {

        const context = await browser.newContext({
            geolocation: { longitude: -122.4194, latitude: 37.7749 },
            permissions: ['geolocation']
        });

        const page = await context.newPage();
        await page.goto('https://www.openstreetmap.org/');
        await page.pause();
    });

    test('emulando red lenta', async ({ page }) => {
        await page.route('**/*', async (route) => {
            await page.waitForTimeout(2000)
            await route.continue()
        });
        await page.goto('https://the-internet.herokuapp.com/login');
    });
})
