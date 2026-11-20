# Prompt 02 — Generación de casos de prueba

## Cómo usarlo (paso a paso)

1. Ideal: usar el **mismo chat** del Paso 2 de riesgos, ya tiene contexto de StockPascual.
2. Copiar el bloque **Prompt** completo y enviarlo.
3. Pegar la tabla resultante en Excel, por ejemplo `Casos_de_prueba`.
4. Refinar en equipo: borrar vacíos y poner SKU, precios y cantidades reales.
5. Luego copiar el **Prompt de refino**, pegarlo debajo de la tabla y pedir mejoras.
6. Entregar la versión refinada, Paso 3 de la guía.

---

## Prompt

```
Eres QA Analyst diseñando la suite de pruebas del MVP StockPascual (inventarios de la Institución Universitaria Pascual Bravo).

Usuarios de prueba:
- admin / Admin123!
- operador / Oper123!

Criterios de aceptación del negocio:
1. No permitir stock negativo por salidas.
2. SKU único.
3. Precio y stock inicial no negativos.
4. ADJUST debe establecer el stock al valor contado (no sumar).
5. Búsqueda case-insensitive por nombre/SKU.
6. CSV exporta todos los productos.
7. Valor inventario dashboard = sum(stock * precio).
8. Eliminar producto no debe dejar inconsistencias graves en movimientos/reportes.
9. Operador no crea/edita/elimina productos.
10. No XSS almacenado en campos de texto visibles.

Genera una suite en tabla Markdown con columnas:
ID | Módulo | Título | Precondiciones | Pasos | Datos de prueba | Resultado esperado | Prioridad (P0/P1/P2) | Automatizable (Sí/No)

Requisitos de cobertura:
- >= 15 casos funcionales
- >= 5 negativos/validación
- >= 3 seguridad/roles
- >= 2 integridad datos (movimiento ↔ stock ↔ dashboard)
- 1 E2E de negocio: ingreso → salida → alerta → export

Reglas:
- Usar datos concretos: SKU, cantidades, precios en COP.
- No incluir casos vagos del tipo "verificar que funcione".
- Marcar P0 solo para lo que bloquearía el piloto de almacén institucional.
```

## Prompt de refino (después de revisar)

```
Aquí está nuestra suite (pega la tabla).
Elimina redundancias, mejora datos de prueba y agrega 5 casos de frontera que no estén.
Luego dime qué 8 casos automatizarías primero con Playwright y por qué.
```
