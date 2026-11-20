# Prompt 04 — Automatización E2E con Playwright (asistida por IA)

## Cómo usarlo (paso a paso)

1. Asegurar que StockPascual esté en http://localhost:3080. En `app/` ejecutar `npm install` y `npm start`.
2. En otra terminal: `cd automation` → `npm install` → `npx playwright install chromium` (detalle en la guía, Paso 7).
3. Pegar el bloque **Prompt** en la IA y pedir el test en TypeScript.
4. Crear o ajustar un archivo en `automation/tests/` con ese código.
5. Ejecutar: `npm run test:headed`.
6. Si falla, usar el **Prompt de depuración** con el error pegado.

La IA puede inventar selectores; corregirlos mirando la UI real.

---

## Prompt

```
Eres automatizador de pruebas. Genera una prueba E2E en Playwright, TypeScript, para StockPascual.

Base URL: http://localhost:3080
Login admin: admin / Admin123!

Flujo a automatizar:
1) Login
2) Crear producto con SKU único (usa timestamp)
3) Registrar movimiento IN de N unidades
4) Registrar movimiento OUT de M unidades (M < stock resultante)
5) Verificar que el stock mostrado en Productos sea el esperado
6) Si el stock queda <= mínimo, verificar que aparece en Alertas

Requisitos técnicos:
- selectors preferiblemente getByRole / getByLabel
- expect con aserciones claras
- datos no hardcodeados frágiles (SKU dinámico)
- comentarios breves en español
- no uses waitForTimeout fijo salvo justificación

Además:
- Lista 3 flakiness risks de esta app
- Indica qué aserciones NO debería inventar la IA sin evidencia del DOM
```

## Prompt de depuración

```
La prueba falla en este punto:
[pega error + snippet]
La UI real tiene estos textos/roles:
[pega lo que ves]
Corrige el test sin cambiar el objetivo de negocio.
```
