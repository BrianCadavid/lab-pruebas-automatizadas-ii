# Prompt 03 — Misión de pruebas exploratorias

## Cómo usarlo (paso a paso)

1. Con StockPascual ya abierto en el navegador, abrir el chat de IA.
2. Pegar el bloque **Prompt** y enviarlo.
3. Elegir **una sola** misión de los 3 que proponga la IA.
4. Poner temporizador de **25 minutos**.
5. Durante la exploración, anotar ideas probadas, resultados y bugs candidatos.
6. Si hay bloqueo, usar el prompt corto de “Durante la sesión” y describir lo observado.

Esto no reemplaza la matriz de ejecución del Top 10; es un complemento.

---

## Prompt

```
Actúa como coach de pruebas exploratorias por sesión.

Sistema: StockPascual, inventarios web de la IU Pascual Bravo, roles admin y operador.

Diseña 3 misiones de exploración de 25 minutos cada una, enfocadas en:
A) Integridad de stock
B) Credibilidad del dashboard y del CSV
C) Abuso de permisos / seguridad básica de UI

Para cada misión entrega:
- Objetivo en 1 frase
- Áreas a atacar
- Ideas de datos o ataques, lista corta
- Cómo saber si falló
- Notas de riesgo de quedarse explorando sin foco
- Plantilla breve de notas de sesión: tiempo, bugs, preguntas, ideas

No asumas bugs específicos; ayuda a descubrirlos.
```

## Durante la sesión — prompt corto

```
Estoy explorando StockPascual. Acabo de observar esto:
[describe lo que viste]
Dame 5 siguientes experimentos concretos: paso, dato y qué observar, priorizados.
```
