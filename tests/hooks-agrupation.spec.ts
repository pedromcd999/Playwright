import { test, expect } from './fixtures/fixtures';
//import invalidLogins from "./data/invalid-credentials.json";

//test.describe: Agrupa pruebas relacionadas bajo un mismo título. Esto ayuda a organizar las pruebas y a mejorar la legibilidad del código. Las pruebas agrupadas pueden compartir configuraciones comunes, como hooks (beforeAll, beforeEach, afterAll, afterEach) y variables.
test.describe('Login functionality', () => {

  //test.describe.configure({mode: 'serial'});
  
  //test.beforeEach: Es un hook que se ejecuta antes de cada prueba dentro del bloque describe. Se utiliza para configurar el estado necesario para las pruebas, como navegar a una página específica, iniciar sesión, o preparar datos de prueba. Esto asegura que cada prueba comience con un estado limpio y consistente.
  test.beforeEach(async ({ loginPage }) => {

    //instanciamos la clase LoginPage para poder utilizar sus métodos y propiedades en las pruebas
    await loginPage.goto('https://the-internet.herokuapp.com/login');
  });

  test('Right credentials', async ({ loginPage, userData }) => {

    // const username = process.env.VALID_USERNAME!;
    // const password = process.env.VALID_PASSWORD!;
    const { validUser } = userData;

    //waitForSelector: espera a que el selector dado aparezca en la página. Si el selector no aparece dentro del tiempo de espera predeterminado, se lanzará un error.
    //await page.waitForSelector('div[class="example"]');

    await loginPage.login(validUser.username, validUser.password);

    //waitForURL: espera a que la URL de la página actual coincida con la URL dada. Si la URL no coincide dentro del tiempo de espera predeterminado, se lanzará un error.
    //await page.waitForURL('https://the-internet.herokuapp.com/secure');

    await expect(loginPage.successMessage).toBeVisible();
    await expect(loginPage.logoutLink).toBeVisible();

  });

  //foreach: Es una estructura de control que se utiliza para iterar sobre una colección de elementos, como un array. En el contexto de las pruebas, se puede usar para ejecutar la misma prueba con diferentes conjuntos de datos, lo que es especialmente útil para probar casos de borde o validar múltiples escenarios con diferentes entradas.
  //cargando credeniales invalidas desde un archivo JSON
  // invalidLogins.forEach(({ username, password, errorMessage }) => {
  //   test(`Invalid credentials: ${errorMessage}`, async ({ loginPage }) => {
  //     await loginPage.login(username, password);
  //     await expect(loginPage.errorMessage).toContainText(errorMessage);
  //   })
  // });

  //cargando credeniales invalidas desde el fixture
  test('Invalid credentials', async ({ loginPage, userData }) => {
    const { invalidUser } = userData;
    for (let invalid of invalidUser) {
      await loginPage.login(invalid.username, invalid.password)
      expect(loginPage.errorMessage).toContainText(/invalid!/);
      console.log(invalid.error);
    }
  })

  //test.afterEach: Es un hook que se ejecuta después de cada prueba dentro del bloque describe. Se utiliza para limpiar el estado después de una prueba, como cerrar sesiones, eliminar datos de prueba, o tomar capturas de pantalla en caso de fallos. Esto ayuda a garantizar que las pruebas no afecten el estado de otras pruebas y facilita la depuración en caso de errores.
  test.afterEach(async ({ loginPage }) => {
    //Despues de cada prueba se espera 1 segundo para que se pueda observar el resultado de la prueba antes de que se cierre el navegador.
    await loginPage.page.waitForTimeout(1000);
  });
});