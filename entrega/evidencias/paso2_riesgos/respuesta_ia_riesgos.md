# Análisis inicial de riesgos – StockPascual

## Contexto

StockPascual es un MVP web para la gestión de inventario de una institución universitaria. Incluye autenticación con roles de administrador y operador, catálogo de productos, movimientos de inventario, dashboard, alertas de stock y exportación CSV.

## Riesgos identificados

### R1. Salida de inventario con cantidad superior al stock disponible

Si el sistema permite registrar movimientos OUT superiores a las existencias, el inventario podría quedar negativo y representar una salida de productos que físicamente no existen.

- Impacto: Alto.
- Probabilidad inicial: Media.
- Área: Movimientos / integridad de inventario.

### R2. Operador con permisos no autorizados para gestionar productos

Un operador podría crear, editar o eliminar productos, modificar precios u otros datos del catálogo si las restricciones de rol no se aplican correctamente.

- Impacto: Alto.
- Probabilidad inicial: Media.
- Área: Seguridad / autorización.

### R3. Movimientos de inventario que no actualizan correctamente las existencias

Los movimientos IN, OUT o ADJUST podrían registrarse sin actualizar el stock correctamente, generar cálculos erróneos o producir inconsistencias entre el historial y las existencias actuales.

- Impacto: Alto.
- Probabilidad inicial: Media.

### R4. Cálculo incorrecto del valor total del inventario

El Dashboard podría mostrar un valor incorrecto si la sumatoria de cantidad de productos por precio no se calcula correctamente, si se omiten productos o si se utilizan datos desactualizados.

- Impacto: Alto.
- Probabilidad inicial: Media.

### R5. Permitir SKU duplicados

El sistema podría permitir registrar dos productos con el mismo SKU, causando confusión durante la identificación, búsqueda y gestión de movimientos.

- Impacto: Alto.
- Probabilidad inicial: Media.

### R6. Eliminación de productos con movimientos históricos

Eliminar un producto que tenga movimientos asociados podría afectar la trazabilidad, los reportes o el historial de inventario.

- Impacto: Alto.
- Probabilidad inicial: Media.

### R7. Alertas incorrectas en el límite del stock mínimo

La lógica de alertas podría no identificar correctamente productos cuyo stock sea igual al mínimo configurado, omitiendo productos que deberían aparecer como stock bajo.

- Impacto: Medio-Alto.
- Probabilidad inicial: Media.

### R8. Exportación CSV incompleta o incorrecta

El archivo CSV podría omitir campos, exportar datos incorrectos, no respetar filtros o presentar problemas de formato que dificulten su uso en procesos administrativos o auditorías.

- Impacto: Medio-Alto.
- Probabilidad inicial: Media.

### R9. Búsqueda de productos con comportamiento inconsistente

La búsqueda por nombre o SKU podría no encontrar productos por diferencias de mayúsculas, minúsculas, espacios o caracteres, afectando la operación diaria.

- Impacto: Medio.
- Probabilidad inicial: Media.

### R10. Vulnerabilidades por ingreso de texto malicioso

Los campos de entrada podrían permitir que texto malicioso sea interpretado como código, generando riesgos de seguridad como XSS.

- Impacto: Alto.
- Probabilidad inicial: Baja-Media.

### R11. Interfaz confusa para operaciones de inventario

Los controles, mensajes o estados de la aplicación podrían no ser suficientemente claros, generando errores de operación, especialmente al registrar entradas, salidas o ajustes.

- Impacto: Medio.
- Probabilidad inicial: Media.

### R12. Información desactualizada o inconsistente en el Dashboard

Los indicadores del Dashboard podrían no reflejar inmediatamente los cambios realizados en productos o movimientos, provocando decisiones basadas en información incorrecta.

- Impacto: Alto.
- Probabilidad inicial: Media.

## Conclusión inicial

Los riesgos de mayor prioridad se relacionan con la integridad de las existencias, la autorización por roles, la correcta ejecución de movimientos, la exactitud de los indicadores y la identificación única de productos.

Estos riesgos deben tratarse como hipótesis iniciales que requieren pruebas para confirmar o descartar comportamientos defectuosos. La identificación de un riesgo no constituye por sí misma evidencia de un bug.