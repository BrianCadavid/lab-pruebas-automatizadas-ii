# Laboratorio Pruebas Automatizadas II + IA

**Curso:** Pruebas de Software — Institución Universitaria Pascual Bravo  
**App bajo prueba:** StockPascual, Node.js y Express

## Instrucciones oficiales

Seguir **únicamente** esta guía:

➡️ [`docs/Laboratorio_Pruebas_Automatizadas_II_IA.md`](docs/Laboratorio_Pruebas_Automatizadas_II_IA.md)

Ahí está el enunciado, el paso a paso de fork, arranque, IA, pruebas, bugs, entrega y entregables.

## Arranque rápido de la app — detalle en la guía

```bash
cd app
npm install
npm start
```

http://localhost:3080 — `admin` / `Admin123!` · `operador` / `Oper123!`

## Estructura del proyecto

```text
├── README.md
├── app/                 ← código de StockPascual con Express. Aquí: npm install / npm start
│   ├── package.json
│   ├── server.js
│   └── public/          ← frontend: index.html, styles.css, app.js
├── docs/
│   ├── Laboratorio_Pruebas_Automatizadas_II_IA.md   ← guía oficial del laboratorio
│   └── Requisitos_StockPascual_MVP.md
├── prompts/             ← prompts para pegar en la herramienta de IA
├── plantillas/          ← bugs, matriz de ejecución, evaluación de IA
├── automation/          ← Playwright ya configurado (obligatorio)
├── evidencias/          ← bitácora del proceso por paso
└── entrega/             ← paquete final para revisión
```
