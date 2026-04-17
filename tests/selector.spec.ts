import { test, expect } from '@playwright/test';

test('Selectores básicos y aserciones', async({page}) => {

    page.goto('https://the-internet.herokuapp.com');

    //cssLocator: Busca un elemento utilizando un selector CSS
    const link = await page.locator("a[href='/context_menu']");
    //toHaveRole: Verifica que el elemento tenga el rol especificado
    await expect(link).toHaveRole('link')

    //getByText: Busca un elemento que contenga el texto especificado
    const listItem = await page.getByText('Form Authentication');
    //toBeVisible: Verifica que el elemento sea visible en la página
    await expect(listItem).toBeVisible();
})