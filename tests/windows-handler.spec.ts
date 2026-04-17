import { test, expect } from '@playwright/test';


test.describe('Manejo de pestannas, ventanas y iframes', () => {

    const baseUrl: string = 'https://the-internet.herokuapp.com';

    test('Manejo de ventanas', async ({ page, context }) => {

        await page.goto(baseUrl + '/windows');

        //context.waitForEvent('page'): Este método se utiliza para esperar a que se abra una nueva pestaña o ventana en el navegador. Devuelve una promesa que se resuelve con la nueva página cuando se detecta el evento 'page'. Esto es útil para manejar situaciones donde una acción en la página actual (como hacer clic en un enlace) provoca la apertura de una nueva pestaña o ventana, y necesitas interactuar con esa nueva página.
        const pagePromise = context.waitForEvent('page');
        await page.click('text=Click Here');

        const newPage = await pagePromise;
        await newPage.waitForLoadState();

        await expect(newPage.locator('h3')).toHaveText('New Window');

        await newPage.close();

        await expect(page.locator('h3')).toHaveText('Opening a new window');

    });

    test('Manejo de iframes', async ({ page }) => {

        await page.goto(baseUrl + '/iframe');
        await page.waitForLoadState();

        //frameLocator: Este método se utiliza para localizar un iframe dentro de la página. Devuelve un objeto FrameLocator que se puede usar para interactuar con el contenido del iframe. Es útil para manejar situaciones donde necesitas acceder a elementos dentro de un iframe, ya que los iframes son documentos independientes dentro de la página principal y requieren un enfoque diferente para interactuar con ellos.
        const frame = await page.frameLocator('#mce_0_ifr');
        await frame.locator('#tinymce').fill('Hola mundo desde el iframe');
        await expect(frame.locator('#tinymce')).toHaveText('Hola mundo desde el iframe');

    });

    test('Manejo de alerts', async ({ page }) => {

        await page.goto(baseUrl + '/javascript_alerts');
        page.on('dialog', async dialog => {
            await expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        })
        await page.click('button[onclick="jsAlert()"]');
        await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    });


})