import { test, expect, Page } from '@playwright/test';

test.describe('Pruebas de solicitudes HTTP', () => {

    test.describe.configure({ mode: 'serial' }); 

    // Definiendo la URL base de la API a partir de una variable de entorno
    const baseUrl = process.env.API_BASE_URL;

    test('Get - Obtener usuarios', async ({ request }) => {

        const response = await request.get(`${baseUrl}/2`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body).toHaveProperty('id', 2);
        expect(body).toHaveProperty('name');

    });

    test('Post - Crear usuarios', async ({ request }) => {

        const newUser = { name: 'Pedro', username: "Zegion", email: "email@gmail.com" }
        const response = await request.post(`${baseUrl}`, {
            data: newUser,
        });
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.id).toBeDefined();

    });

    test('Patch - Editar usuarios', async ({ request }) => {

        //Obteniendo el usuario a editar y comprobando que tenga la propopiedad username
        const userToPatch = await request.get(`${baseUrl}/2`);
        const body = await userToPatch.json();
        expect(body).toHaveProperty('username');
        console.log(body.username);

        //Editando el usuario y comprobando que se haya editado correctamente
        const response = await request.patch(`${baseUrl}/2`, {
            data: { username: 'Zegion' },
        });
        expect(response.status()).toBe(200);
        const newBody = await response.json();
        console.log(newBody.username)

    });

    test('Delete - Eliminar usuarios', async ({ request }) => {

        //Eliminando el usuario y comprobando que se haya eliminado correctamente
        const response = await request.delete(`${baseUrl}/2`);
        const body = await response.json();
        expect(body).toEqual({});

    });
})