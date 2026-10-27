Actúa como un Senior QA Automation Engineer especialista en TypeScript, Playwright y Frameworks de Automatización Escalables.

Tu objetivo es diseñar y generar el código completo para un proyecto de automatización de pruebas E2E desde cero utilizando Playwright y TypeScript para la aplicación web pública SauceDemo (https://www.saucedemo.com/).

---

### REGLAS DE ARQUITECTURA Y CÓDIGO (ESTRICTAS):

1. **Patrón de Diseño:** Page Object Model (POM) estricto. Separa completamente la localización de elementos y acciones del código de los tests.
2. **Gestión de Datos y Cero Hardcodeo:**
   - **Datos Estáticos:** Credenciales de usuarios y mensajes de error esperados deben residir en `data/login.json`.
   - **Datos Dinámicos:** La información del formulario de checkout (nombre, apellido, código postal) debe generarse dinámicamente durante la ejecución utilizando `@faker-js/faker`.
   - **Variables de Entorno:** La URL base (`BASE_URL`) debe gestionarse mediante un archivo `.env` cargado con `dotenv`.
3. **Esperas Inteligentes y Auto-Waiting:**
   - Usa únicamente el mecanismo de auto-waiting de Playwright y assertions web first (`await expect(locator)...`).
   - Queda **estrictamente prohibido** utilizar `page.waitForTimeout()` o esperas fijas.
4. **Mantenibilidad y Selectores:** Usa selectores robustos adaptados al DOM de SauceDemo. Utiliza atributos explícitos `[data-test="..."]` (ejemplo: `page.locator('[data-test="username"]')`) en lugar de `getByTestId` genéricos.
5. **Captura de Evidencias Paso a Paso en Allure:**
   - Integra capturas de pantalla automáticas en el reporte Allure para **cada paso/acción clave** (paso a paso) utilizando `allure.step` y `test.info().attach()` o helper de screenshot dentro de `utils/actions.ts` / `utils/assertions.ts`.
   - Además, asegura la captura automática de pantalla y video en fallos y casos exitosos en la configuración del runner.
6. **Fixtures Personalizados:** Extiende el objeto `test` de Playwright creando fixtures para instanciar automáticamente las clases del Page Object Model (`loginPage`, `inventoryPage`, `cartPage`, `checkoutPage`).
7. **Alias de Rutas (Path Aliases):** Configura y utiliza alias de TypeScript (`@pages/*`, `@data/*`, `@utils/*`, `@fixtures/*`).
8. **Reportes:** Integra y configura Allure Report (`allure-playwright`).
9. **Completitud del Código:** Genera el código fuente **100% completo y funcional** para cada archivo, sin resúmenes, omisiones ni comentarios `// TODO`.

---

### CASOS DE PRUEBA A AUTOMATIZAR:

1. **TC01 - Login Exitoso:** Ingresar con `standard_user`, validar la redirección a `/inventory.html` y la visibilidad del título "Products".
2. **TC02 - Login con Error:** Ingresar con `locked_out_user` y validar que se muestre el mensaje de error: `"Epic sadface: Sorry, this user has been locked out"`.
3. **TC03 - Flujo Principal de Compra (E2E):**
   - Realizar login exitoso con `standard_user`.
   - Agregar 2 productos al carrito desde la página de inventario.
   - Navegar al carrito y proceder al checkout.
   - Llenar el formulario de envío utilizando datos aleatorios generados con `@faker-js/faker`.
   - Finalizar la compra y validar la presencia del mensaje de confirmación `"Thank you for your order!"`.
4. **TC04 - Ordenamiento por Precio:** Aplicar el filtro "Price (low to high)" y validar programáticamente que los precios de la lista de productos estén en orden ascendente.

---

### ENTREGABLES ESPERADOS (Estructura de archivos completa):

Por favor, entrega el código fuente organizado archivo por archivo indicando su ruta exacta:

1. `package.json` (incluyendo dependencias `@playwright/test`, `allure-playwright`, `allure-js-commons`, `@faker-js/faker`, `dotenv`, `typescript` y scripts de ejecucion `test` y `report:allure`).
2. `tsconfig.json` (configurado con alias `@pages/*`, `@data/*`, `@utils/*`, `@fixtures/*`).
3. `.env` (declaración de `BASE_URL`).
4. `playwright.config.ts` (configurado para ejecutar solo en Chrome/Chromium en modo headed, integración con Allure y captura de evidencias en fallos y en casos exitosos con `screenshot: 'on'`).
5. `data/login.json` (credenciales y mensajes de validación).
6. `utils/actions.ts` (clase helper para encapsular interacciones como clics, llenado de inputs y selección de dropdowns, incluyendo captura de pantalla para Allure paso a paso).
7. `utils/assertions.ts` (clase helper para centralizar validaciones como visibilidad, texto y estados, incluyendo captura de evidencia en Allure).
8. `pages/login/LoginPage.ts` (Page Object con localizadores y métodos de login).
9. `pages/checkout/InventoryPage.ts` (Page Object con catálogo, agregados al carrito y ordenamiento por precio).
10. `pages/checkout/CartPage.ts` (Page Object de la vista de carrito).
11. `pages/checkout/CheckoutPage.ts` (Page Object del proceso de pago).
12. `fixtures/testFixtures.ts` (definición de fixtures para la inyección de las páginas).
13. `tests/saucedemo.spec.ts` (los 4 casos de prueba estructurados en un `test.describe`).
14. `README.md` (documentación clara del proyecto, prerrequisitos y comandos de uso).

---

### SECCIONES ADICIONALES (Al final del código):
- **INSTRUCCIONES DE EJECUCIÓN:** Comandos CLI en orden secuencial para instalar dependencias, ejecutar la suite de pruebas y generar/abrir el reporte Allure.
- **ANÁLISIS DE RESULTADOS SIMULADO:** Un resumen estructurado mostrando cómo la IA analiza la ejecución tanto en un escenario exitoso (100% Pass) como en un escenario de fallo (identificación de causa raíz, log de error y evidencia adjunta).