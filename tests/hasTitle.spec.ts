import { test, expect } from '@playwright/test';

test('Comprobar titulo', async({page}) => {

    page.goto('https://the-internet.herokuapp.com');

    //toHaveTitle: Es una función de Playwright que se utiliza para verificar que el título de la página actual coincida con un valor esperado. Esta función es parte de las aserciones de Playwright y se utiliza comúnmente en pruebas automatizadas para validar que la página se ha cargado correctamente y que el título es el esperado.
    await expect(page).toHaveTitle('The Internet');
})