# Requisitos funcionales — StockPascual MVP
## Institución Universitaria Pascual Bravo

Documento de entrada para el Laboratorio Pruebas Automatizadas II + IA. Simula lo que entregaría Product Owner o TI institucional.

## RF-01 Autenticación
El sistema debe permitir inicio de sesión con usuario y contraseña. Roles: `admin`, `operador`.

## RF-02 Gestión de productos (admin)
El admin puede crear, editar y eliminar productos con: SKU, nombre, categoría, precio, stock inicial (solo en creación), stock mínimo, unidad y ubicación.

## RF-03 Unicidad de SKU
El SKU debe ser único en el sistema.

## RF-04 Movimientos de inventario
Usuarios autenticados pueden registrar:
- IN: suma stock
- OUT: resta stock (no debe permitir quedar bajo 0)
- ADJUST: deja el stock en el valor indicado por conteo físico

## RF-05 Búsqueda y filtros
Se puede buscar por nombre o SKU (sin distinguir mayúsculas) y filtrar por categoría / stock bajo.

## RF-06 Dashboard
Debe mostrar: productos activos, cantidad en stock bajo, agotados, valor total de inventario (Σ stock × precio) y número de movimientos.

## RF-07 Alertas
Listar productos con `stock <= minStock`.

## RF-08 Exportación
Exportar CSV con todos los productos del inventario (campos: sku, name, category, price, stock, minStock, location).

## RF-09 Autorización
El rol operador no puede crear, editar ni eliminar productos.

## RNF-01 Usabilidad
La UI debe ser usable en desktop para operación diaria de almacén institucional.

## RNF-02 Seguridad básica
Los campos de texto no deben ejecutar scripts en la interfaz (XSS almacenado).
