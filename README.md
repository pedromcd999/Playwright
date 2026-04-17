# Configuración e instalación del proyecto

Este documento describe todo lo necesario para preparar el proyecto después de descargarlo desde GitHub.

## Requisitos previos

1. Node.js instalado.
   - Recomendado: Node 18 o superior.
   - Comprueba la versión con:
     ```bash
     node --version
     ```
2. npm instalado (viene con Node.js).
   - Comprueba con:
     ```bash
     npm --version
     ```
3. Conexión a internet para descargar dependencias y navegadores de Playwright.

## Pasos para instalar

1. Abre una terminal y sitúate en la carpeta del proyecto:
   ```bash
   cd /ruta/al/proyecto
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Instala los navegadores que utiliza Playwright:
   ```bash
   npx playwright install
   ```

## Configuración adicional

- El proyecto usa `dotenv` para cargar variables de entorno desde un archivo `.env`.
- El archivo de configuración principal es `playwright.config.ts`.
- Si necesitas variables de entorno, crea un archivo `.env` en la raíz del proyecto con las variables necesarias. Por ejemplo:
  ```env
  # Ejemplo de variables
  # BASE_URL=http://localhost:3000
  # CI=true
  ```

## Estructura importante

- `package.json`: lista de dependencias del proyecto.
- `playwright.config.ts`: configuración de Playwright y de los proyectos de navegador.
- `tests/`: carpeta donde están los archivos de prueba.
- `playwright-report/`: carpeta que puede contener el reporte HTML generado por Playwright.
- `snapshots/`: carpeta para los snapshots de las pruebas de regresión visual.

## Cómo ejecutar las pruebas

Desde la raíz del proyecto, ejecuta:

```bash
npx playwright test
```

Si quieres generar o ver reportes HTML después de ejecutar pruebas, abre el archivo generado en `playwright-report/index.html`.

## Notas importantes

- El proyecto está configurado para usar `headless: false` en `playwright.config.ts`, es decir, las pruebas se ejecutan con navegador visible.
- Playwright carga dispositivos móviles configurados en `projects`, como `Pixel 5`, `iPhone 12` y `Galaxy S9`.
- Si quieres ejecutar un navegador específico, usa:
  ```bash
  npx playwright test --project=chromium
  ```

## Problemas comunes

- Si falta algún navegador, vuelve a ejecutar:
  ```bash
  npx playwright install
  ```
- Si falta `.env` y tu proyecto lo necesita, crea el archivo con las variables requeridas.
