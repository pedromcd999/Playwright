import { test, expect } from '@playwright/test';

test('Login Tests', async({page}) => {
    
    page.goto('https://the-internet.herokuapp.com/login');

    //waitForSelector: espera a que el selector dado aparezca en la página. Si el selector no aparece dentro del tiempo de espera predeterminado, se lanzará un error.
    await page.waitForSelector('div[class="example"]');

    const secretUser = 'tomsmith';
    const secretPassword = 'SuperSecretPassword!';

    //fill: rellena el campo con el valor dado, reemplazando cualquier valor existente
    const username = await page.getByRole('textbox', {name: 'username'}).fill(secretUser);
    const password = await page.getByRole('textbox', {name: 'password'}).fill(secretPassword);
    await page.getByRole('button', {name: 'Login'}).click();

    //waitForURL: espera a que la URL de la página actual coincida con la URL dada. Si la URL no coincide dentro del tiempo de espera predeterminado, se lanzará un error.
    await page.waitForURL('https://the-internet.herokuapp.com/secure');

});
