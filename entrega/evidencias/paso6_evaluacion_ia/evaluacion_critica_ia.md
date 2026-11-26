# Paso 6 — Evaluación crítica de la IA

## 1. Objetivo

Evaluar críticamente la utilidad de la inteligencia artificial durante el análisis de riesgos y diseño de pruebas para StockPascual, comparando los riesgos inicialmente identificados con los defectos encontrados durante la ejecución real.

La evaluación se basa en los riesgos identificados inicialmente y en los cinco defectos confirmados durante el laboratorio. Las respuestas de IA se utilizaron como apoyo para el análisis y fueron contrastadas con los resultados observados. No se consideran evidencia de ejecución ni sustituyen las pruebas realizadas.

---

## 2. Prompt 1 — Comparación entre riesgos iniciales y defectos encontrados

### Prompt utilizado

Actúa como Senior QA y analista de riesgos de software.

Estoy evaluando un MVP web de inventario llamado StockPascual. Durante el análisis inicial se identificaron riesgos relacionados con:

1. Salidas de inventario que podrían permitir stock negativo.
2. Restricciones de permisos entre administrador y operador.
3. Movimientos de inventario que podrían actualizar incorrectamente las cantidades.
4. Inconsistencias en los indicadores del dashboard.
5. Permitir SKU duplicados.

Durante la ejecución de pruebas encontré los siguientes defectos confirmados:

- BUG-01: Una salida de inventario permite que el stock quede negativo.
- BUG-02: El sistema permite registrar productos con SKU duplicado.
- BUG-03: El sistema permite valores negativos en precio, stock y stock mínimo.
- BUG-04: El movimiento ADJUST suma la cantidad en lugar de establecer el inventario físico.
- BUG-05: La exportación CSV del catálogo completo genera solamente 3 registros de los 5 productos existentes, incluso sin filtros activos.

Analiza críticamente la calidad del análisis inicial de riesgos. Indica qué riesgos fueron correctamente anticipados, qué defectos no fueron anticipados, qué riesgos eran generales o se solapaban, qué aspectos debieron tener mayor prioridad y cómo mejorarías el análisis futuro.

No inventes defectos ni afirmes que algo fue probado si no aparece en la información proporcionada. Separa los hechos de tus recomendaciones.

### Resultado del análisis asistido por IA

El análisis inicial fue útil porque anticipó correctamente riesgos relacionados con el control del inventario y la integridad de los datos. El riesgo de stock negativo se confirmó mediante BUG-01, mientras que los riesgos relacionados con movimientos incorrectos y ajustes físicos se relacionaron directamente con BUG-04.

También se anticipó el riesgo de SKU duplicado, confirmado mediante BUG-02.

Sin embargo, el análisis inicial no identificó explícitamente la validación de valores negativos en los campos de precio, stock y stock mínimo, ni la posible pérdida de registros durante la exportación CSV.

Los riesgos relacionados con movimientos incorrectos y ajustes físicos presentaban cierto solapamiento, por lo que sería conveniente definir escenarios específicos para cada tipo de movimiento y su resultado esperado.

La IA recomienda ampliar el análisis futuro con validaciones de datos, integridad de exportaciones, reglas de negocio específicas y pruebas de autorización tanto desde la interfaz como desde el backend.

---

## 3. Prompt 2 — Análisis de cobertura y riesgos omitidos

### Prompt utilizado

Actúa como QA Senior especializado en Risk-Based Testing.

Para el sistema StockPascual se realizaron pruebas funcionales, negativas, de roles, integridad de datos y exportación. Durante las pruebas se confirmaron cinco defectos:

BUG-01: OUT permite dejar el stock negativo.

BUG-02: Se permite SKU duplicado.

BUG-03: Se permiten valores negativos en precio, stock y stock mínimo.

BUG-04: ADJUST suma la cantidad en lugar de establecer el stock físico.

BUG-05: La exportación CSV del catálogo completo exporta solamente 3 de los 5 productos.

Analiza qué áreas de prueba deberían tener mayor cobertura en una futura versión del sistema. Propón pruebas adicionales de forma priorizada, considerando impacto en negocio, integridad de inventario, datos, seguridad y confiabilidad. No inventes resultados ni declares que las pruebas propuestas ya fueron ejecutadas.

### Resultado del análisis asistido por IA

La cobertura futura debería priorizar las reglas que afectan directamente la integridad del inventario.

Se recomienda ampliar las pruebas de movimientos IN, OUT y ADJUST mediante escenarios con cantidades límite, stock cero, cantidades superiores al stock disponible y diferencias entre el stock registrado y el físico.

También se recomienda probar validaciones de campos numéricos, incluyendo valores negativos, cero, límites máximos y formatos inválidos.

Para SKU, se deben considerar duplicados exactos y posibles variaciones de formato, como espacios o diferencias entre mayúsculas y minúsculas, según las reglas de normalización del sistema.

En la exportación CSV se recomienda validar el número total de registros, la correspondencia entre los datos mostrados y los exportados, y la consistencia de los filtros.

Las pruebas de roles deberían complementarse con validaciones de backend, ya que la ausencia de controles visuales no demuestra por sí sola que las operaciones estén protegidas.

---

## 4. Prompt 3 — Priorización de corrección de defectos

### Prompt utilizado

Actúa como QA Lead y asesor de priorización de defectos.

En StockPascual se confirmaron estos defectos:

- BUG-01: OUT permite stock negativo.
- BUG-02: SKU duplicado permitido.
- BUG-03: Valores negativos permitidos en precio, stock y stock mínimo.
- BUG-04: ADJUST suma en lugar de establecer el stock físico.
- BUG-05: Exportación CSV incompleta.

Prioriza los defectos para su corrección antes de una posible entrega del MVP. Explica el impacto de negocio, la prioridad sugerida y qué validación debería realizarse después de corregir cada defecto.

No inventes información sobre usuarios afectados, frecuencia de ocurrencia ni pérdidas económicas. Diferencia la prioridad sugerida de cualquier severidad oficialmente establecida.

### Resultado del análisis asistido por IA

La prioridad de corrección debería enfocarse inicialmente en los defectos que afectan directamente la exactitud del inventario.

BUG-01 y BUG-04 deberían recibir prioridad alta porque pueden producir cantidades de inventario incorrectas y afectar las decisiones de entrega o reposición.

BUG-03 también debería priorizarse debido a que permite registrar valores numéricos inválidos que pueden afectar los cálculos y la confiabilidad del sistema.

BUG-02 debería corregirse para garantizar la identificación única de los productos y evitar ambigüedad en los registros.

BUG-05 debería corregirse porque la exportación incompleta afecta la confiabilidad de la información utilizada fuera del sistema.

La recomendación es corregir los defectos, ejecutar nuevamente los casos que los detectaron y realizar pruebas de regresión sobre los módulos relacionados.

---

## 5. Reflexión crítica personal

La inteligencia artificial fue útil para organizar el análisis de riesgos y proponer escenarios de prueba.
El análisis inicial anticipó varios defectos que posteriormente fueron confirmados durante la ejecución.
Los riesgos de stock negativo, movimientos incorrectos y SKU duplicados fueron correctamente identificados.
Sin embargo, la IA no anticipó explícitamente todos los defectos encontrados.
La validación de valores negativos en campos de producto fue una omisión importante.
También se descubrió un defecto en la exportación CSV que no estaba contemplado inicialmente.
Algunos riesgos planteados eran generales y podían generar escenarios de prueba similares.
Por esto, fue necesario convertir los riesgos en casos de prueba concretos y verificables.
La ejecución manual permitió encontrar defectos que no podían confirmarse solamente mediante análisis teórico.
Los resultados reales fueron más importantes que las predicciones generadas por la IA.
La IA también ayudó a proponer nuevas pruebas y organizar prioridades de corrección.
No obstante, sus recomendaciones debían verificarse con los requisitos y el comportamiento real del sistema.
Concluyo que la IA es una herramienta de apoyo para QA, pero no reemplaza el criterio crítico, la ejecución ni la evidencia del tester.

---

## 6. Conclusión

La evaluación permitió comprobar que la IA puede aportar valor al análisis de riesgos, diseño de pruebas y priorización de defectos. Sin embargo, sus resultados pueden omitir escenarios importantes o presentar riesgos demasiado generales.

Los cinco defectos confirmados durante la ejecución demostraron la importancia de validar las hipótesis mediante pruebas reales. La IA debe utilizarse como apoyo, contrastando sus recomendaciones con los requisitos, la evidencia y el comportamiento observado del sistema.
