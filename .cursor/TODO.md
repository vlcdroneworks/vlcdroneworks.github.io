# TODO — Comunicación UAS

Seguimiento de mejoras y tareas pendientes. El objetivo es tener **todo claro y documentado** para cuando se aborde cada punto (o para que otro agente pueda hacerlo con contexto).

---

## Pendientes

### 1. Mejorar la creación de PDFs: PDF único con páginas repetidas
- **Estado:** Pendiente
- **Descripción:** En lugar de generar un PDF por cada (piloto, drone, fecha), generar **un único PDF** por comunicación donde ciertas páginas se repiten. Ejemplo: página 1 = datos operador, página 2 = datos piloto, página 3 = datos de la operación; si la operación se hace en 3 días distintos, el PDF tendría pág. 1, pág. 2, pág. 3 (día 1), pág. 3 (día 2), pág. 3 (día 3). Requiere una plantilla PDF pensada por páginas y lógica para copiar/rellenar la página repetible.
- **Contexto técnico:** Hoy se usa `pdf-lib`, plantilla en `template/20201228-Formato-Solicitud-Comunicacion-V9.0.pdf`, `FIELD_MAP` y `fillPdf()` + `resolveData()` en `app.js`. La plantilla actual es la del Ministerio; para este flujo haría falta una plantilla nueva bien estructurada por páginas, o montar el PDF copiando páginas de la plantilla.
- **Viabilidad en JavaScript:** Sí. Con **pdf-lib** se puede: cargar un PDF, usar `copyPages(docOrigen, [índice, índice, ...])` para copiar páginas (pasando el mismo índice varias veces se obtienen copias independientes), añadirlas al documento resultado y rellenar el formulario en cada copia. Detalle a resolver: cuando la misma página se repite, los nombres de los campos del formulario se repiten; hay que rellenar por página o por instancia de campo (pdf-lib permite trabajar con el formulario; ver cómo expone campos cuando hay varios con el mismo nombre).
- **Por definir:** Definir exactamente qué páginas son fijas (1 operador, 1 piloto…) y cuál es la página “operación” que se repite por fecha. Si la plantilla oficial no está cortada por páginas reutilizables, podría hacerse una plantilla derivada (solo con esas páginas) o montar el PDF desde cero copiando y rellenando.

### 2. Sustituir date/time picker por un componente unificado
- **Estado:** Hecho
- **Completado:** Implementado con Flatpickr (CDN), inputs tipo texto con clases vdw-date, vdw-time, vdw-datetime; initDatePickers() en renderAll(). Contención en móvil con min-width: 0 en grid de cards.

### 3. Combinaciones piloto–drone (evitar PDFs innecesarios)
- **Estado:** Hecho
- **Completado:** Formulario "Combinaciones piloto–drone (opcional)" en Comunicación: Agregar piloto, Agregar todos, filas con piloto + drones + Quitar. Si hay combinaciones con drones, solo se generan esas parejas × fechas; si no, producto cartesiano. Persistencia en localStorage y YAML.
### 4. Extraer la versión de la app fuera de index.html
- **Estado:** Hecho
- **Completado:** `comunicacion/version.txt` como única fuente de la versión base; el workflow lee de ahí e inyecta en index.html. Para subir versión solo se edita version.txt.

---

## Cómo usar este TODO

- Mantener cada ítem con Estado, Descripción, Contexto técnico y (si aplica) Viabilidad, Requisitos, Por definir.
- Al cerrar un ítem: Estado = "Hecho", añadir **Completado:** con fecha o commit.
- Para detalle técnico de la app (state, flujos, archivos), ver `.cursor/CONTEXT.md`.
