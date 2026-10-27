# SauceDemo E2E Automation Framework

Framework de automatización de pruebas E2E para SauceDemo utilizando Playwright, TypeScript, Page Object Model (POM), y Allure Report.

## Características

- **Playwright** con TypeScript para automatización E2E
- **Page Object Model (POM)** para mantenimiento escalable
- **Allure Report** para reportes detallados con evidencias
- **@faker-js/faker** para generación de datos dinámicos
- **Auto-waiting** de Playwright (sin esperas fijas)
- **Capturas de pantalla** automáticas en cada paso clave
- **Fixtures personalizados** para inyección de Page Objects
- **Path aliases** de TypeScript para imports limpios

## Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

## Estructura del Proyecto

```
poc-playwright-ai/
├── data/
│   └── login.json              # Datos estáticos de test
├── fixtures/
│   └── testFixtures.ts         # Fixtures personalizados de Playwright
├── pages/
│   ├── login/
│   │   └── LoginPage.ts        # Page Object de login
│   └── checkout/
│       ├── InventoryPage.ts    # Page Object de inventario
│       ├── CartPage.ts         # Page Object de carrito
│       └── CheckoutPage.ts     # Page Object de checkout
├── tests/
│   └── saucedemo.spec.ts       # Suite de pruebas
├── utils/
│   ├── actions.ts              # Helper de acciones con evidencias
│   └── assertions.ts           # Helper de aserciones con evidencias
├── .env                        # Variables de entorno
├── package.json                # Dependencias y scripts
├── playwright.config.ts        # Configuración de Playwright
├── tsconfig.json               # Configuración de TypeScript
└── README.md                   # Documentación
```

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Instalar navegadores de Playwright:
```bash
npm run install:browsers
```

## Configuración

El archivo `.env` contiene la URL base de la aplicación:
```
BASE_URL=https://www.saucedemo.com
```

## Casos de Prueba

### TC01 - Login Exitoso
- Ingresa con `standard_user`
- Valida redirección a `/inventory.html`
- Verifica visibilidad del título "Products"

### TC02 - Login con Error
- Ingresa con `locked_out_user`
- Valida mensaje de error: "Epic sadface: Sorry, this user has been locked out"

### TC03 - Flujo Principal de Compra (E2E)
- Login exitoso con `standard_user`
- Agrega 2 productos al carrito
- Navega al carrito y procede al checkout
- Llena formulario con datos aleatorios (faker)
- Finaliza compra y valida mensaje de confirmación

### TC04 - Ordenamiento por Precio
- Aplica filtro "Price (low to high)"
- Valida orden ascendente de precios programáticamente

## Ejecución de Pruebas

### Ejecutar todas las pruebas (modo headed):
```bash
npm test
```

### Ejecutar pruebas en modo headless:
```bash
npx playwright test
```

### Ejecutar un test específico:
```bash
npx playwright test --grep "TC01"
```

## Generación de Reportes Allure

### Generar reporte:
```bash
npm run report:allure
```

### Abrir reporte en navegador:
```bash
npm run report:allure:open
```

El reporte incluye:
- Capturas de pantalla paso a paso
- Videos de ejecución (en fallos)
- Trace detallado de acciones
- Timeline de ejecución

## Tecnologías Utilizadas

- **Playwright**: Framework de automatización E2E
- **TypeScript**: Tipado estático para JavaScript
- **Allure Report**: Framework de reportes
- **@faker-js/faker**: Generación de datos falsos
- **dotenv**: Gestión de variables de entorno

## Patrones y Buenas Prácticas

- **Page Object Model**: Separación de localizadores y lógica de negocio
- **Zero Hardcoding**: Datos en archivos JSON y variables de entorno
- **Auto-waiting**: Uso exclusivo de esperas inteligentes de Playwright
- **Selectores robustos**: Uso de atributos `[data-test="..."]`
- **Evidencias paso a paso**: Capturas automáticas en Allure
- **Fixtures personalizados**: Inyección de dependencias para Page Objects
