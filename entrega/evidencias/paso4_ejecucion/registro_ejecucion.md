# Paso 4 — Ejecución de pruebas

## 1. Información general

- **Proyecto:** StockPascual
- **Tester:** Brian Alexis Cadavid Castano
- **Modalidad:** Individual
- **Ambiente:** Local
- **URL:** http://localhost:3080
- **Fecha de ejecución:** 26 de noviembre de 2026
- **Navegador:** Brave Browser (Chromium)
- **Tipo de ejecución:** Pruebas manuales funcionales, negativas, de roles e integridad.

## 2. Objetivo

Ejecutar los casos de prueba prioritarios diseñados en el Paso 3 para verificar el comportamiento funcional del MVP StockPascual, identificar defectos y registrar las observaciones obtenidas durante la exploración.

La ejecución se realizó de forma manual, utilizando los roles administrador y operador.

## 3. Resumen de ejecución

| Resultado | Cantidad |
|---|---:|
| Pruebas ejecutadas y aprobadas | 12 |
| Pruebas ejecutadas y fallidas | 4 |
| Observaciones de seguridad | 1 |
| Pruebas no ejecutadas en esta etapa | Pendientes |
| Bugs confirmados | 4 |

> Las cantidades corresponden a los casos y comprobaciones ejecutados durante esta sesión. Algunas pruebas fueron exploratorias o parciales y se documentan de esa manera.

## 4. Resultados detallados

### TC-F01 — Inicio de sesión válido como administrador

- **Resultado:** PASS
- **Usuario:** admin
- **Descripción:** Se inició sesión con las credenciales de administrador.
- **Resultado observado:** El sistema permitió el acceso y mostró el Dashboard.
- **Observaciones:** Se visualizaron las funcionalidades administrativas, incluyendo productos, movimientos, alertas, exportación CSV y creación de productos.

### TC-F02 — Inicio de sesión válido como operador

- **Resultado:** PASS
- **Usuario:** operador
- **Descripción:** Se inició sesión con las credenciales del operador.
- **Resultado observado:** El sistema permitió el acceso al Dashboard.
- **Observaciones:** Se visualizaron las opciones de navegación disponibles para el operador.

### TC-S01 — Restricciones de productos para el operador

- **Resultado:** PASS PARCIAL
- **Descripción:** Se inspeccionó la interfaz del operador para verificar restricciones sobre la administración de productos.
- **Resultado observado:** No se observaron controles para crear, editar o eliminar productos en la interfaz del operador.
- **Observaciones:** El operador sí tiene acceso a la funcionalidad de registro de movimientos.
- **Limitación:** La autorización a nivel backend no fue verificada.

### TC-F11 — Registro de entrada de inventario (IN)

- **Resultado:** PASS
- **Producto:** Cable USB-C 1 m
- **Stock inicial:** 40
- **Movimiento:** IN
- **Cantidad:** 1
- **Stock final observado:** 41
- **Descripción:** Se registró una entrada de inventario.
- **Resultado observado:** El stock aumentó correctamente de 40 a 41 y el movimiento quedó registrado en el historial.

### TC-F12 — Registro de salida de inventario (OUT)

- **Resultado:** PASS
- **Producto:** Cable USB-C 1 m
- **Stock inicial:** 41
- **Movimiento:** OUT
- **Cantidad:** 1
- **Stock final observado:** 40
- **Descripción:** Se registró una salida de inventario.
- **Resultado observado:** El stock disminuyó correctamente de 41 a 40 y el movimiento quedó registrado.

### TC-N03 — Salida superior al stock disponible

- **Resultado:** FAIL
- **Producto:** Cable USB-C 1 m
- **Stock inicial:** 40
- **Movimiento:** OUT
- **Cantidad ingresada:** 41
- **Stock final observado:** -1
- **Descripción:** Se intentó registrar una salida superior al inventario disponible.
- **Resultado observado:** El sistema permitió registrar el movimiento y dejó el stock en negativo.

**Defecto identificado:** BUG-01 — El sistema permite salidas que generan stock negativo.

### TC-F13 — Ajuste de inventario (ADJUST)

- **Resultado:** FAIL
- **Stock inicial utilizado:** 40
- **Movimiento:** ADJUST
- **Cantidad ingresada:** 10
- **Stock esperado:** 10
- **Stock observado:** 50
- **Descripción:** Se registró un ajuste de inventario para comprobar si el sistema establecía la cantidad física indicada.
- **Resultado observado:** El sistema sumó la cantidad ingresada al stock existente, en lugar de establecer el stock en 10.

**Defecto identificado:** BUG-04 — El movimiento ADJUST suma cantidades en lugar de establecer el stock físico.

### TC-I01 — Consistencia del Dashboard

- **Resultado:** PASS PARCIAL
- **Descripción:** Se verificaron los indicadores del Dashboard después de las pruebas de movimientos y productos.
- **Resultados observados:**
  - Productos activos: 5
  - Stock bajo: 3
  - Productos agotados: 1
  - Valor del inventario: $7.030
  - Movimientos registrados: 8
- **Observaciones:** Los indicadores de productos, stock bajo y agotados coincidieron con los productos observados.
- **Limitación:** El valor total del inventario se encontraba alterado por los movimientos de prueba realizados sobre el Cable USB-C.

### TC-F14 — Alertas de stock

- **Resultado:** PASS
- **Descripción:** Se revisó el módulo de alertas de inventario.
- **Resultado observado:** El sistema mostró los productos con stock bajo y agotado.
- **Productos observados:**
  - Mouse inalámbrico — stock 8, mínimo 15.
  - Monitor 24" IPS — stock 3, mínimo 4.
  - Audífonos Bluetooth — stock 0, mínimo 8.
- **Observaciones:** La información coincidió con los indicadores del Dashboard.

### TC-F15 — Exportación CSV

- **Resultado:** PASS
- **Descripción:** Se realizó una exportación CSV desde el módulo de alertas.
- **Resultado observado:** El archivo se descargó correctamente.
- **Columnas observadas:**
  - sku
  - name
  - category
  - price
  - stock
  - minStock
  - location
- **Observaciones:** La exportación se realizó desde el módulo de alertas, por lo que el archivo contenía los productos filtrados que se mostraban en dicha pantalla.

### TC-N02 — Creación de producto con SKU duplicado

- **Resultado:** FAIL
- **SKU utilizado:** CAB-USB-01
- **Descripción:** Se intentó crear un producto con un SKU que ya existía.
- **Resultado observado:** El sistema permitió guardar el producto duplicado y mostrarlo en el catálogo.
- **Limpieza:** Se eliminó el producto duplicado de prueba y se conservó el producto original.

**Defecto identificado:** BUG-02 — El sistema permite crear productos con SKU duplicados.

### TC-F08 — Creación válida de producto

- **Resultado:** PASS
- **Datos de prueba:**
  - SKU: QA-TEST-001
  - Nombre: Producto Prueba QA
  - Categoría: Pruebas QA
  - Precio: 10.000
  - Stock: 5
  - Stock mínimo: 2
  - Unidad: und
  - Ubicación: Zona QA
- **Resultado observado:** El sistema permitió crear el producto correctamente.
- **Limpieza:** El producto de prueba fue eliminado después de la comprobación.

### TC-F05 — Búsqueda por nombre y SKU

- **Resultado:** PASS
- **Descripción:** Se verificó la búsqueda de productos mediante nombre y SKU.
- **Resultado observado:**
  - La búsqueda por SKU CAB-USB-01 encontró Cable USB-C 1 m.
  - La búsqueda por nombre encontró Mouse inalámbrico.
- **Observaciones:** La búsqueda devolvió los productos esperados.

### TC-F05 — Filtro por categoría

- **Resultado:** PASS
- **Descripción:** Se seleccionó la categoría Audio.
- **Resultado observado:** Se mostró el producto Audífonos Bluetooth.

### TC-F05 — Filtro de stock bajo

- **Resultado:** PASS
- **Descripción:** Se activó el filtro de stock bajo.
- **Resultado observado:** Se mostraron productos con stock bajo y productos agotados.

### TC-F05 — Búsqueda combinada con filtro de stock bajo

- **Resultado:** PASS
- **Descripción:** Se realizó una búsqueda por nombre con el filtro de stock bajo activado.
- **Resultado observado:** La búsqueda de Audífonos Bluetooth devolvió el producto correctamente.

### TC-N01 — Validación de campos obligatorios

- **Resultado:** PASS
- **Descripción:** Se intentó crear un producto dejando los campos vacíos.
- **Resultado observado:** El sistema solicitó completar los campos y no permitió guardar el producto vacío.

### TC-N01 — Validación de valores negativos en producto

- **Resultado:** FAIL
- **Valores probados:**
  - Precio: -100
  - Stock: -5
  - Stock mínimo: -2
- **Resultado observado:** El sistema permitió guardar el producto con los valores negativos.

**Defecto identificado:** BUG-03 — El sistema permite valores negativos en precio, stock y stock mínimo.

### TC-N04 — Validación de cantidad negativa en movimiento

- **Resultado:** PASS
- **Descripción:** Se intentó registrar un movimiento OUT con cantidad -1.
- **Resultado observado:** El sistema rechazó el valor y mostró el mensaje:

> El valor debe ser mayor o igual a 1.

- **Observaciones:** La validación impidió registrar la cantidad negativa.

### TC-S03 — Evaluación de entrada tipo XSS

- **Resultado:** OBSERVACIÓN
- **Entrada probada:**

  `<script>alert('XSS')</script>`

- **Resultado observado:** El sistema permitió guardar la cadena como nombre de producto y el catálogo la mostró como texto literal.
- **Ejecución del script:** No se observó ninguna ventana `alert`.
- **Conclusión:** Se comprobó que el sistema acepta la cadena, pero no se confirmó ejecución de JavaScript. Por lo tanto, no se registra como vulnerabilidad XSS confirmada.

## 5. Bugs confirmados

### BUG-01 — Salida de inventario permite stock negativo

- **Área:** Movimientos de inventario.
- **Severidad provisional:** Alta.
- **Descripción:** El sistema permite registrar una salida superior al stock disponible.
- **Resultado observado:** Stock 40, OUT de 41, stock final -1.
- **Impacto:** La integridad del inventario puede verse comprometida.

### BUG-02 — SKU duplicado permitido

- **Área:** Productos.
- **Severidad provisional:** Alta.
- **Descripción:** El sistema permite crear productos utilizando un SKU que ya existe.
- **Impacto:** Puede generar duplicidad de productos y problemas de identificación y trazabilidad.

### BUG-03 — Valores negativos permitidos en productos

- **Área:** Productos.
- **Severidad provisional:** Alta.
- **Descripción:** El sistema permite guardar productos con precio, stock y stock mínimo negativos.
- **Impacto:** Los datos del inventario pueden quedar inconsistentes y afectar cálculos y alertas.

### BUG-04 — ADJUST suma en lugar de establecer el stock

- **Área:** Movimientos de inventario.
- **Severidad provisional:** Alta.
- **Descripción:** El movimiento ADJUST suma la cantidad ingresada al stock actual, en lugar de establecer el inventario físico indicado.
- **Resultado observado:** Stock inicial 40, ADJUST de 10, stock final 50.
- **Impacto:** Los ajustes físicos de inventario pueden generar cantidades incorrectas.

## 6. Observaciones de seguridad

### OBS-01 — Aceptación de etiquetas script como texto

- **Entrada:** `<script>alert('XSS')</script>`
- **Resultado:** La cadena fue almacenada y mostrada literalmente en el catálogo.
- **Ejecución:** No observada.
- **Conclusión:** No se confirma una vulnerabilidad XSS con la prueba ejecutada. Se recomienda continuar con pruebas de seguridad adicionales.

## 7. Exploración guiada

Durante la ejecución se realizaron comprobaciones exploratorias en las siguientes áreas:

- Inicio de sesión con administrador y operador.
- Navegación por Dashboard, Productos, Movimientos y Alertas.
- Búsqueda por nombre y SKU.
- Filtro por categoría.
- Filtro de stock bajo.
- Combinación de búsqueda y filtro.
- Registro de movimientos IN, OUT y ADJUST.
- Validación de cantidades negativas.
- Creación de productos.
- Validación de SKU duplicado.
- Validación de campos obligatorios.
- Validación de valores negativos en producto.
- Evaluación exploratoria de entrada tipo XSS.
- Exportación CSV.
- Revisión de indicadores del Dashboard.

**Nota sobre el tiempo:** La exploración fue realizada de forma focalizada sobre las funcionalidades prioritarias. No se completó una exploración continua de 25 minutos.

## 8. Limpieza de datos de prueba

Se eliminaron los productos de prueba creados para las comprobaciones de:

- SKU duplicado.
- Creación válida de producto.
- Entrada tipo XSS.
- Producto con valores negativos.

Se conservaron los productos originales del catálogo.

**Nota:** Los movimientos de inventario registrados durante las pruebas permanecen en el historial. El stock del Cable USB-C quedó alterado debido a la prueba de ADJUST, cuyo comportamiento fue identificado como defectuoso. No se realizó una restauración adicional porque el sistema no permitió realizar el ajuste negativo necesario.

## 9. Limitaciones de la ejecución

- La ejecución fue manual.
- No se ejecutaron todos los 27 casos diseñados.
- Algunas pruebas de autorización se verificaron únicamente desde la interfaz.
- No se verificaron autorizaciones backend.
- No se completó una exploración continua de 25 minutos.
- No se confirmó ejecución de JavaScript en la prueba de XSS.
- La automatización E2E se realizará en el Paso 7.
- El inventario fue alterado por las pruebas de movimientos y no se restauró completamente.

## 10. Conclusión

La ejecución manual permitió verificar satisfactoriamente varias funcionalidades principales de StockPascual, incluyendo autenticación, búsqueda, filtros, alertas, exportación CSV y movimientos básicos de entrada y salida.

También se identificaron cuatro defectos confirmados relacionados con la integridad del inventario:

1. Permite salidas que generan stock negativo.
2. Permite SKU duplicados.
3. Permite valores negativos en campos de producto.
4. El movimiento ADJUST suma cantidades en lugar de establecer el stock físico.

Además, se registró una observación de seguridad relacionada con la aceptación de etiquetas script como texto, sin ejecución observada.

Los resultados obtenidos servirán como base para el registro formal de defectos, la evaluación crítica de la IA y la automatización E2E en los siguientes pasos del laboratorio.