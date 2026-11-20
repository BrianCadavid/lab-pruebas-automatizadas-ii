# Automatización Playwright — StockPascual

Paso obligatorio del laboratorio. Instrucciones en  
`docs/Laboratorio_Pruebas_Automatizadas_II_IA.md`, Paso 7 — peso 0,75 sobre 5,0.

## Requisitos

- Node.js 18+
- StockPascual corriendo en `http://localhost:3080`

## Setup

```bash
cd automation
npm install
npx playwright install chromium
```

## Ejecutar

```bash
npm test
npm run test:headed
npm run report
```

El archivo `tests/stockpascual-smoke.spec.ts` es un punto de partida.  
Completar el flujo E2E con ayuda de IA (`../prompts/04_automatizacion.md`) y criterio propio.
