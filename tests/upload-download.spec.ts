import { test, expect } from '@playwright/test';
import path from 'path';
import fs from "node:fs";

test.describe('Subida y Descarga de archivos', () => {

    const baseUrl: string = 'https://the-internet.herokuapp.com';

    test('Subida de archivos', async ({ page }) => {

        await page.goto(baseUrl + '/upload');

        //path.join() se utiliza para construir una ruta de archivo de manera segura, independientemente del sistema operativo. En este caso, se está construyendo la ruta al archivo 'file-to-upload.txt' que se encuentra en la carpeta 'data' dentro del mismo directorio que el script de prueba.
        const filePath = path.join(__dirname, 'data/file-to-upload.txt');

        // El método setInputFiles() de Playwright se utiliza para simular la acción de seleccionar un archivo en un campo de entrada de tipo "file". En este caso, se está seleccionando el archivo especificado por filePath para subirlo a través del formulario de carga.
        await page.setInputFiles('#file-upload', filePath);
        await page.click('#file-submit');

        await expect(page.locator('h3')).toHaveText('File Uploaded!');
        await expect(page.locator('#uploaded-files')).toHaveText('file-to-upload.txt');

    });

    test('Descarga de archivos', async ({ page }) => {

        await page.goto(baseUrl + '/download');

        await page.click('a[href*=".txt"]');
        const download = await page.waitForEvent('download');

        const suggestedName = download.suggestedFilename();
        console.log(`Descargando: ${suggestedName}`);

        const downloadPath = path.join(__dirname, 'data/', suggestedName);

        await download.saveAs(downloadPath);

        expect(fs.existsSync(downloadPath)).toBeTruthy();
        const stats = fs.statSync(downloadPath);
        expect(stats.size).toBeGreaterThan(0);

    });
});