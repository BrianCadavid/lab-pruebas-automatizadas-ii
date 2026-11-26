# Reporte de Defectos — StockPascual

## Información general

- **Proyecto:** StockPascual
- **Tester:** Brian Alexis Cadavid Castano
- **Modalidad:** Individual
- **Ambiente:** Local
- **URL:** http://localhost:3080
- **Fecha:** 26 de noviembre de 2026
- **Estado del reporte:** Defectos reproducidos manualmente

---

# BUG-01 — El sistema permite salidas de inventario que generan stock negativo

## Información del defecto

- **ID:** BUG-01
- **Título:** El sistema permite registrar salidas superiores al stock disponible.
- **Módulo:** Movimientos de inventario
- **Tipo:** Funcional / Integridad de datos
- **Severidad:** Alta
- **Prioridad sugerida:** Alta
- **Estado:** Confirmado
- **Caso relacionado:** TC-N03

## Descripción

El sistema permite registrar un movimiento de salida (OUT) cuya cantidad supera el inventario disponible del producto, generando un stock negativo.

## Precondiciones

- Tener sesión iniciada.
- Existir un producto con stock disponible.
- Tener acceso al módulo de movimientos.

## Pasos para reproducir

1. Iniciar sesión en el sistema.
2. Seleccionar el producto Cable USB-C 1 m.
3. Verificar que el stock inicial sea 40 unidades.
4. Registrar un movimiento de tipo OUT.
5. Ingresar una cantidad de 41 unidades.
6. Registrar el movimiento.
7. Consultar nuevamente el stock del producto.

## Resultado esperado

El sistema debe rechazar la salida cuando la cantidad solicitada sea superior al stock disponible y mostrar un mensaje de validación.

## Resultado actual

El sistema permite registrar la salida de 41 unidades cuando solamente existen 40 disponibles. El stock resultante queda en -1.

## Impacto

Puede generar inconsistencias en el inventario, permitir salidas de productos inexistentes y afectar la confiabilidad de los datos operativos.

## Evidencia

- Captura sugerida: `BUG-01_stock_negativo.png`

---

# BUG-02 — El sistema permite crear productos con SKU duplicado

## Información del defecto

- **ID:** BUG-02
- **Título:** El sistema permite registrar productos con un SKU que ya existe.
- **Módulo:** Productos
- **Tipo:** Funcional / Integridad de datos
- **Severidad:** Alta
- **Prioridad sugerida:** Alta
- **Estado:** Confirmado
- **Caso relacionado:** TC-N02

## Descripción

El sistema permite crear un producto utilizando un SKU que ya está registrado en el catálogo.

## Precondiciones

- Tener sesión iniciada como administrador.
- Existir previamente un producto con SKU CAB-USB-01.

## Pasos para reproducir

1. Iniciar sesión como administrador.
2. Ingresar al módulo Productos.
3. Seleccionar la opción para crear un producto.
4. Ingresar el SKU CAB-USB-01, que ya existe.
5. Completar los demás campos con valores válidos.
6. Guardar el producto.
7. Consultar el catálogo.

## Resultado esperado

El sistema debe impedir la creación del producto y mostrar un mensaje indicando que el SKU ya existe.

## Resultado actual

El sistema permitió crear y mostrar en el catálogo un segundo producto con el mismo SKU.

## Impacto

La duplicidad de SKU puede provocar confusión en la identificación de productos, inconsistencias en el inventario y errores durante la gestión de movimientos.

## Limpieza realizada

Se eliminó el producto duplicado de prueba y se conservó el producto original.

## Evidencia

- Captura sugerida: `BUG-02_sku_duplicado.png`

---

# BUG-03 — El sistema permite valores negativos en los campos del producto

## Información del defecto

- **ID:** BUG-03
- **Título:** El sistema permite registrar productos con precio, stock y stock mínimo negativos.
- **Módulo:** Productos
- **Tipo:** Validación / Integridad de datos
- **Severidad:** Alta
- **Prioridad sugerida:** Alta
- **Estado:** Confirmado
- **Caso relacionado:** TC-N01

## Descripción

El formulario de creación de productos permite guardar valores negativos en campos numéricos que deberían tener restricciones de validación.

## Precondiciones

- Tener sesión iniciada como administrador.
- Acceder al formulario de creación de productos.

## Pasos para reproducir

1. Iniciar sesión como administrador.
2. Ingresar al módulo Productos.
3. Seleccionar la opción para crear un producto.
4. Completar los campos de texto con datos válidos.
5. Ingresar los siguientes valores:
   - Precio: -100
   - Stock: -5
   - Stock mínimo: -2
6. Guardar el producto.
7. Consultar el catálogo.

## Resultado esperado

El sistema debe rechazar los valores negativos y mostrar mensajes de validación indicando que los campos numéricos deben contener valores válidos.

## Resultado actual

El sistema permitió guardar el producto con precio, stock y stock mínimo negativos.

## Impacto

Los valores negativos pueden afectar la integridad del inventario, los cálculos del valor total, las alertas de stock y los reportes.

## Limpieza realizada

El producto de prueba fue eliminado posteriormente del catálogo.

## Evidencia

- Captura sugerida: `BUG-03_valores_negativos.png`

---

# BUG-04 — El movimiento ADJUST suma en lugar de establecer el stock físico

## Información del defecto

- **ID:** BUG-04
- **Título:** El movimiento ADJUST suma la cantidad ingresada al stock existente.
- **Módulo:** Movimientos de inventario
- **Tipo:** Funcional / Integridad de inventario
- **Severidad:** Alta
- **Prioridad sugerida:** Alta
- **Estado:** Confirmado
- **Caso relacionado:** TC-F13

# BUG-05 — La exportación CSV del catálogo completo omite productos

## Información del defecto

- **ID:** BUG-05
- **Título:** La exportación CSV desde Productos omite registros del catálogo.
- **Módulo:** Productos / Exportación CSV
- **Tipo:** Funcional / Integridad de datos
- **Severidad:** Alta
- **Prioridad sugerida:** Alta
- **Estado:** Confirmado

## Descripción

Al exportar el catálogo completo desde el módulo Productos, sin filtros de búsqueda, categoría ni stock bajo activos, el archivo CSV contiene únicamente 3 registros, a pesar de que el catálogo cuenta con 5 productos originales.

## Precondiciones

- Iniciar sesión como administrador.
- Acceder al módulo Productos.
- Tener 5 productos originales registrados.
- No tener filtros ni búsquedas activos.

## Pasos para reproducir

1. Iniciar sesión como administrador.
2. Ingresar al módulo Productos.
3. Verificar que el campo de búsqueda esté vacío.
4. Seleccionar Todas las categorías.
5. Desactivar Solo stock bajo.
6. Pulsar Exportar CSV.
7. Descargar y abrir el archivo CSV.
8. Verificar la cantidad de registros exportados.

## Resultado esperado

El CSV debe contener los 5 productos del catálogo completo, incluyendo todos los registros visibles en el módulo Productos.

## Resultado actual

El archivo CSV contiene solamente 3 productos:

- CAB-USB-01 — Cable USB-C 1m
- MOU-WL-02 — Mouse inalámbrico
- TEC-MEC-03 — Teclado mecánico

No se exportaron:

- MON-24-04 — Monitor 24" IPS
- AUD-BT-05 — Audífonos Bluetooth

## Impacto

La exportación incompleta puede provocar pérdida de información, reportes incorrectos y decisiones operativas basadas en un catálogo parcial.

## Evidencia

- Archivo CSV descargado.
- Captura sugerida: BUG-05_exportacion_incompleta.png

## Descripción

El movimiento ADJUST debería establecer la cantidad física actual del producto. Sin embargo, durante la prueba se observó que el sistema suma la cantidad ingresada al stock existente.

## Precondiciones

- Tener sesión iniciada.
- Existir un producto con stock conocido.
- Tener acceso al registro de movimientos.

## Pasos para reproducir

1. Iniciar sesión en el sistema.
2. Seleccionar el producto Cable USB-C 1 m.
3. Verificar que el stock inicial sea 40 unidades.
4. Registrar un movimiento de tipo ADJUST.
5. Ingresar una cantidad de 10 unidades.
6. Registrar el movimiento.
7. Consultar nuevamente el stock.

## Resultado esperado

El sistema debe establecer el stock del producto en 10 unidades, correspondiente al conteo físico ingresado.

## Resultado actual

El sistema sumó la cantidad ingresada al stock existente:

- Stock inicial: 40
- Cantidad ingresada en ADJUST: 10
- Stock final observado: 50

## Impacto

Los ajustes físicos pueden generar cantidades incorrectas, afectando la confiabilidad de los inventarios y la toma de decisiones operativas.

## Observaciones

Durante la prueba se intentó corregir el stock mediante un ajuste negativo, pero el sistema no permitió ingresar valores negativos. El stock de prueba quedó alterado como consecuencia de la ejecución.

## Evidencia

- Captura sugerida: `BUG-04_adjust_suma.png`

---

# Resumen de defectos

| ID | Defecto | Severidad | Estado |
|---|---|---|---|
| BUG-01 | OUT permite stock negativo | Alta | Confirmado |
| BUG-02 | SKU duplicado permitido | Alta | Confirmado |
| BUG-03 | Valores negativos en producto permitidos | Alta | Confirmado |
| BUG-04 | ADJUST suma en lugar de establecer stock | Alta | Confirmado |

---

# Conclusión

La ejecución manual permitió identificar cuatro defectos confirmados relacionados principalmente con la integridad de los datos y la lógica de inventario.

Los defectos más críticos se relacionan con el manejo de stock negativo, la duplicidad de SKU, la aceptación de valores negativos en productos y el comportamiento incorrecto del movimiento ADJUST.

Estos hallazgos deben ser atendidos antes de considerar confiable la gestión de inventario del sistema StockPascual.