import { test, expect } from '@playwright/test';


test.describe('Mokeando peticiones http', () => {

    test('Mokear respuesta de un POST', async ({ page }) => {

        await page.route('**/posts/1', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: 999,
                    title: 'Titulo mokeado',
                    body: 'Body mokeado',
                    userID: 123
                })
            })
        });

        await page.goto('https://jsonplaceholder.typicode.com/posts/1');
        const body = await page.locator('body').textContent();
        expect(body).toContain('Titulo mokeado');
        expect(body).toContain('Body mokeado');
    });

    test('Simular error 500 del servidor', async ({ page }) => {

        await page.route('**/posts/1', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify('internal server error')
            })
        });

        await page.goto('https://jsonplaceholder.typicode.com/posts/1');
        const body = await page.locator('body').textContent();
        expect(body).toContain('internal server error');
    });

    test('Simular red caida', async ({ page }) => {

        await page.route('**/*', async (route) => {
            await route.abort('failed')
        });

        await page.goto('https://jsonplaceholder.typicode.com/posts/1');
        const body = await page.locator('body').textContent();
        expect(body).toContain('ERR_FAILED');
    });

    test('Modificar parcialmente la respuesta real', async ({ page }) => {

        await page.route('**/posts/1', async (route) => {
            const response = await route.fetch();
            const content = await response.json();

            content.title = 'Titulo moqueado';
            content.body = 'Body moqueado';

            await route.fulfill({
                status: response.status(),
                contentType: response.headers()['content-type'],
                body: JSON.stringify(content)
            })
        });

        await page.goto('https://jsonplaceholder.typicode.com/posts/1');
        const body = await page.locator('body').textContent();
        console.log(await body);
    });
})