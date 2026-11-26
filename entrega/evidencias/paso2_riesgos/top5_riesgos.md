# Top 5 riesgos refinados – StockPascual

**Contexto:** MVP de inventario institucional.  
**Criterio:** priorización cualitativa por impacto y probabilidad inicial estimada. Estas estimaciones no provienen de datos estadísticos ni de defectos confirmados.

| Prioridad | Riesgo | Impacto | Probabilidad | Justificación |
|---|---|---|---|---|
| 1 | Registrar una salida (OUT) superior al stock disponible y permitir existencias negativas | Alto | Media | Puede generar registros de entrega de elementos que no existen y afectar la confiabilidad del inventario. |
| 2 | Permitir al operador realizar operaciones no autorizadas sobre productos | Alto | Media | Puede comprometer el catálogo, precios y datos administrados por el rol administrador. |
| 3 | Registrar movimientos IN, OUT o ADJUST sin actualizar correctamente el stock | Alto | Media | Afecta directamente la cantidad real y la trazabilidad de las existencias. |
| 4 | Calcular incorrectamente el valor total del inventario en el Dashboard | Alto | Media | Puede ocasionar decisiones administrativas o financieras basadas en información incorrecta. |
| 5 | Permitir SKU duplicados | Alto | Media | Puede causar confusión en la identificación de productos y afectar búsquedas y movimientos. |

## Criterio de priorización

Se priorizaron riesgos que pueden comprometer la integridad del inventario, la seguridad por roles o la confiabilidad de la información utilizada para tomar decisiones.

La probabilidad se considera una estimación inicial y deberá actualizarse con los resultados de las pruebas.