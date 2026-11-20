# Carpeta `evidencias/`

Instrucciones oficiales: `docs/Laboratorio_Pruebas_Automatizadas_II_IA.md`.

Aquí queda la **bitácora del proceso** (capturas, matrices, notas).  
El paquete final ordenado para revisión va en `entrega/` (Paso 8).  
El **número de carpeta coincide con el número del paso** de la guía.

| Paso | Carpeta | Contenido | Ejemplos |
|------|---------|-----------|----------|
| 1 | `paso1_arranque/` | Setup y recorrido | `01_login_admin.png`, `02_dashboard.png` |
| 2 | `paso2_riesgos/` | Riesgos refinados | `top5_riesgos.xlsx` |
| 3 | `paso3_casos/` | Casos de prueba | `casos_de_prueba_refinados.xlsx` |
| 4 | `paso4_ejecucion/` | Ejecución y exploración | `matriz_ejecucion.xlsx`, `mision_25min.md` |
| 5 | `paso5_bugs/` | Reporte y capturas | `reporte_bugs.xlsx`, `bug01_stock_negativo.png` |
| 6 | `paso6_evaluacion_ia/` | Crítica a la IA | `evaluacion_ia.md` |
| 7 | `paso7_automation/` | Playwright | captura o reporte de ejecución |

El Paso 0 se documenta en la sección **DATOS DEL EQUIPO** de la guía. El Paso 8 es el paquete final en `entrega/`.

## Reglas

1. Capturas propias, no de otros equipos.  
2. Nombres de archivo claros, por ejemplo `bug01_stock_negativo.png`.  
3. Cada bug del reporte debe tener su captura en `paso5_bugs/`.  
4. Hacer `git add`, `commit` y `push` al fork del equipo.  

## Ejemplo de push

```bash
git add evidencias/paso1_arranque
git commit -m "evidencias: paso 1 arranque StockPascual"
git push
```
