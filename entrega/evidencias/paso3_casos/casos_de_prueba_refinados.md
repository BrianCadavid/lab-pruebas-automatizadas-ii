# Casos de prueba refinados – StockPascual

**Estado:** Diseñados, pendientes de ejecución.  
**Aplicación:** StockPascual MVP.  
**Fuente:** Requisitos oficiales del MVP y análisis de riesgos del Paso 2.

## Convenciones

- P0: crítico.
- P1: alto.
- P2: medio.
- Automatizable: estimación preliminar; se confirmará al implementar Playwright.

## A. Casos funcionales (15)

| ID | Módulo | Título | Precondiciones | Pasos | Datos | Resultado esperado | Prioridad | Automatizable |
|---|---|---|---|---|---|---|---|
| TC-F01 | Login | Login administrador válido | App disponible | Ingresar credenciales admin | admin / Admin123! | Acceso autorizado como admin | P0 | Sí |
| TC-F02 | Login | Login operador válido | App disponible | Ingresar credenciales operador | operador / Oper123! | Acceso autorizado como operador | P0 | Sí |
| TC-F03 | Productos | Consultar catálogo | Sesión iniciada | Abrir Productos | N/A | Catálogo visible | P1 | Sí |
| TC-F04 | Productos | Buscar por nombre | Productos existentes | Buscar producto | Mouse inalámbrico | Se muestran coincidencias | P1 | Sí |
| TC-F05 | Productos | Buscar por SKU | Productos existentes | Buscar SKU | MOU-WL-02 | Se muestra producto correspondiente | P1 | Sí |
| TC-F06 | Productos | Filtrar por categoría | Productos de varias categorías | Seleccionar categoría y buscar | Periféricos | Solo productos de la categoría | P1 | Sí |
| TC-F07 | Productos | Filtrar stock bajo | Productos bajo mínimo | Activar filtro stock bajo | N/A | Se muestran productos con stock bajo | P1 | Sí |
| TC-F08 | Productos | Crear producto | Admin autenticado | Crear producto | SKU único y datos válidos | Producto creado y visible | P0 | Sí |
| TC-F09 | Productos | Editar producto | Producto existente; admin | Modificar datos y guardar | Cambiar nombre/precio | Cambios persistidos | P1 | Sí |
| TC-F10 | Productos | Eliminar producto | Producto elegible; admin | Eliminar producto | Producto de prueba | Producto deja de aparecer según comportamiento definido | P1 | Sí |
| TC-F11 | Movimientos | Registrar IN | Admin/operador autorizado | Registrar entrada | Cantidad positiva | Stock aumenta correctamente | P0 | Sí |
| TC-F12 | Movimientos | Registrar OUT | Stock suficiente | Registrar salida | Cantidad válida | Stock disminuye correctamente | P0 | Sí |
| TC-F13 | Movimientos | Registrar ADJUST | Producto existente | Ajustar stock | Conteo físico | Stock queda en cantidad ajustada | P0 | Sí |
| TC-F14 | Alertas | Consultar alertas | Productos bajo mínimo | Abrir Alertas stock | N/A | Productos que cumplen condición aparecen | P1 | Sí |
| TC-F15 | Exportación | Exportar CSV | Productos existentes | Exportar CSV | N/A | Archivo CSV descargado con campos requeridos | P1 | Sí |

## B. Casos negativos (5)

| ID | Módulo | Título | Precondiciones | Pasos | Datos | Resultado esperado | Prioridad | Automatizable |
|---|---|---|---|---|---|---|---|
| TC-N01 | Login | Credenciales incorrectas | App disponible | Intentar login | Password incorrecta | No permite acceso | P0 | Sí |
| TC-N02 | Productos | SKU duplicado | Producto con SKU existente | Crear producto duplicado | SKU existente | Rechaza duplicado; no crea registro | P0 | Sí |
| TC-N03 | Movimientos | OUT mayor al stock | Stock conocido | Registrar salida excesiva | Cantidad > stock | Rechaza operación; stock no queda negativo | P0 | Sí |
| TC-N04 | Productos | Campos inválidos/incompletos | Admin autenticado | Crear producto sin datos requeridos o inválidos | Datos incompletos | No crea producto inválido | P1 | Sí |
| TC-N05 | Movimientos | Cantidad inválida | Usuario autorizado | Registrar movimiento con cantidad inválida | 0 o valor negativo | Rechaza movimiento inválido | P1 | Sí |

## C. Seguridad y roles (3)

| ID | Módulo | Título | Precondiciones | Pasos | Datos | Resultado esperado | Prioridad | Automatizable |
|---|---|---|---|---|---|---|---|
| TC-S01 | Roles | Operador no puede crear productos | Sesión operador | Intentar acceder a creación de producto | Operador | Operación no autorizada | P0 | Sí |
| TC-S02 | Roles | Operador no puede editar/eliminar productos | Sesión operador | Intentar editar/eliminar producto | Operador | Operaciones no autorizadas | P0 | Sí |
| TC-S03 | Seguridad | Entradas de texto no ejecutan scripts | Campo de texto disponible | Introducir texto de prueba controlado | Texto con caracteres de script | Texto no ejecutado como código | P0 | Sí |

## D. Integridad entre movimientos, stock y Dashboard (2)

| ID | Módulo | Título | Precondiciones | Pasos | Datos | Resultado esperado | Prioridad | Automatizable |
|---|---|---|---|---|---|---|---|
| TC-I01 | Integridad | Movimiento actualiza stock y Dashboard | Producto con stock conocido | Registrar IN/OUT y revisar Dashboard | Stock inicial y cantidad de movimiento | Stock e indicadores reflejan el cambio correctamente | P0 | Sí |
| TC-I02 | Integridad | ADJUST se refleja en catálogo y Dashboard | Producto existente | Ajustar stock y consultar ambas vistas | Conteo físico nuevo | Catálogo y Dashboard muestran valor consistente | P0 | Sí |

## E. E2E de negocio (2)

| ID | Módulo | Título | Precondiciones | Pasos | Datos | Resultado esperado | Prioridad | Automatizable |
|---|---|---|---|---|---|---|---|
| TC-E01 | E2E | Entrada de inventario y actualización de alerta | Producto con stock bajo | Registrar IN; consultar catálogo, Dashboard y alertas | Cantidad suficiente para superar mínimo | Stock actualizado; alerta cambia según regla; Dashboard consistente | P0 | Sí |
| TC-E02 | E2E | Salida de inventario y exportación | Producto con stock suficiente | Registrar OUT; consultar stock; exportar CSV | Salida válida | Stock actualizado y exportación contiene datos consistentes | P0 | Sí |

## Matriz de cobertura

| Cobertura requerida | Casos | Total |
|---|---|---:|
| Funcionales | TC-F01 a TC-F15 | 15 |
| Negativos | TC-N01 a TC-N05 | 5 |
| Seguridad / roles | TC-S01 a TC-S03 | 3 |
| Integridad | TC-I01 a TC-I02 | 2 |
| E2E negocio | TC-E01 a TC-E02 | 2 |
| **Total** | | **27** |

## Observaciones del refinamiento

1. Los casos se derivan de requisitos del MVP; no se afirma que hayan sido ejecutados.
2. Se priorizan operaciones que afectan directamente las existencias y la autorización por roles.
3. Los casos TC-I01, TC-I02 y TC-E01/E02 permiten validar consistencia entre módulos.
4. Los mensajes específicos de error no se definen como criterio, porque no están confirmados en los requisitos.
5. El comportamiento exacto al eliminar productos con movimientos históricos debe verificarse antes de concluir la prueba.
6. Los casos de seguridad se ejecutarán de forma controlada y se documentarán con evidencia.
7. La automatización se considera preliminar y se revisará al implementar Playwright.