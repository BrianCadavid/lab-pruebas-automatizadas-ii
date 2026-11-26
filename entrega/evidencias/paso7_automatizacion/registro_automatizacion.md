# Paso 7 — Automatización E2E con Playwright

## Configuración

- Framework: Playwright Test
- Aplicación: StockPascual
- URL base: http://localhost:3080
- Navegador: Chromium administrado por Playwright
- Timeout: 60 segundos
- Capturas: únicamente en caso de fallo
- Reporte: List y HTML

## Pruebas automatizadas

### E2E-01 — Login administrador y Dashboard
**Resultado: PASS**

Se verificó:
- Acceso a la aplicación.
- Inicio de sesión con credenciales de administrador.
- Visualización del encabezado Dashboard.
- Visualización del usuario Ana Admin.

### E2E-02 — Restricción visual del operador
**Resultado: PASS**

Se verificó:
- Acceso a la aplicación.
- Inicio de sesión con credenciales de operador.
- Visualización del Dashboard.
- Ausencia del botón + Producto para el operador.

## Resultado de ejecución

- Total de pruebas: 2
- Aprobadas: 2
- Fallidas: 0
- Tiempo total reportado: 5.5 segundos

## Conclusión

La automatización Smoke E2E ejecutada con Playwright fue exitosa. Ambas pruebas finalizaron correctamente, validando el inicio de sesión para los roles administrador y operador, así como una restricción visual asociada al rol operador.

Esta automatización constituye una validación básica de los flujos de acceso y no reemplaza las pruebas funcionales, de integridad, seguridad ni la validación de los bugs identificados durante la ejecución manual.