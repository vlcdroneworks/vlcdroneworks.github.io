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
- **Estado:** Pendiente
- **Descripción:** Los `<input type="date">` y `<input type="time">` son controles nativos: se ven y se comportan distinto en cada navegador; en móvil los de hora pueden desbordar el margen. Objetivo: un componente JS (propio o librería) con la misma UI en todos los dispositivos.
- **Contexto técnico:** Campos afectados: fecha/hora en Comunicación, y en operaciones `hora_inicio` / `hora_fin`. Definiciones en `PERSONA_FIELDS`, `OPERACION_FIELDS` y en el formulario de comunicación en `index.html`.
- **Requisitos:** Mantener el mismo valor que consume la app (hora "HH:MM", formato de fecha actual) para no romper `syncStateFromUI`, `resolveData` ni el PDF. Encajar en el flujo actual (data-field, data-section, etc.).

### 3. Combinaciones piloto–drone (evitar PDFs innecesarios)
- **Estado:** Pendiente
- **Descripción:** Hoy la generación hace producto cartesiano: todos los pilotos marcados × todos los drones marcados × fechas, lo que genera muchos PDFs que a menudo no se necesitan. Objetivo: que el usuario defina **qué piloto vuela qué drone(s)** en esta operación, y solo generar PDFs para esas combinaciones (× fechas). Dos formas de lograrlo (complementarias o alternativas):
  - **Preferencia / enlace:** Reflejar la preferencia "piloto A ↔ drone A" de forma que, al marcar en la operación que el piloto A va a cargo, se marque automáticamente el drone A (y al revés: al marcar el drone A, poder marcar directamente el piloto A). Ahorra clics y evita combinaciones que no interesan.
  - **Formulario por combinaciones:** En lugar de una sola lista de pilotos (checkboxes) y una de drones (checkboxes), tener un formulario de **combinaciones**: botón "Agregar piloto" que añade una ficha con (1) selector de **un solo piloto** y (2) checkboxes de **drones** que pilotará ese piloto. Se pueden añadir varias fichas (otro piloto, sus drones, etc.). Opcional: botón "Agregar todos" que añade una ficha por cada piloto de la base de datos para solo tildar qué drones vuela cada uno. Al generar, solo se crean PDFs para los (piloto, drone) que aparecen en esas fichas × cada fecha.
- **Contexto técnico:** Lógica actual en `generate()` en `app.js`: bucles sobre `pilotos`, `drones` y `fechasList`. Habría que sustituir o complementar el origen de las parejas (piloto, drone): o bien leer de una estructura tipo "combinaciones" en el estado (p. ej. lista de { piloto, drones[] }), o bien seguir con checkboxes pero aplicando preferencias/linking para auto-marcar. Si se persisten preferencias piloto↔drone, incluir en export/import YAML.
- **Por definir:** Si se implementan preferencias, dónde se guardan (ficha piloto, ficha drone, o solo en la sesión de Comunicación). Si el formulario pasa a "combinaciones", decidir si se mantiene la vista actual como alternativa o se reemplaza por completo.

### 4. Extraer la versión de la app fuera de index.html
- **Estado:** Pendiente
- **Descripción:** Hoy la versión de la app (p. ej. `2.0.0`) está definida dentro de `comunicacion/index.html` en el script que carga `app.js`. Para subir versión hay que editar ese fichero. Objetivo: tener la versión en **un único fichero aparte** (p. ej. `version.txt`, `version.json` o similar dentro de `comunicacion/`) y que `index.html` y el workflow de GitHub Actions la tomen de ahí, para no tocar `index.html` al hacer un bump de versión.
- **Contexto técnico:** En `index.html` hay un bloque con `var V = 'X.Y.Z';`, `document.write('<script src="app.js?v=' + ... + '">')` y el badge en `#app-version-placeholder`. El workflow `.github/workflows/inject-version.yml` lee la versión base con `sed` sobre `comunicacion/index.html` y escribe la versión con commit SHA en el mismo fichero. Al extraer la versión: el workflow debería leer del nuevo fichero; `index.html` podría cargar ese fichero (p. ej. fetch de `version.txt` antes del script de la app, o inyectar la versión en build/deploy), o incluirla por script desde un JSON/JS externo. Sin build step actual, la opción más simple es un fichero estático (p. ej. `version.txt` con una línea) que el script en `index.html` cargue de forma síncrona si es posible, o que el workflow siga siendo quien inyecte en `index.html` pero leyendo la base desde el fichero externo.
- **Por definir:** Dónde vive el fichero (repo root vs `comunicacion/`) y formato (una línea, JSON, etc.). Si la versión la lee el navegador en runtime (fetch), tener en cuenta cache; si la inyecta el workflow en el HTML, no hay que tocar `index.html` a mano para el valor base.

---

## Cómo usar este TODO

- Mantener cada ítem con Estado, Descripción, Contexto técnico y (si aplica) Viabilidad, Requisitos, Por definir.
- Al cerrar un ítem: Estado = "Hecho", añadir **Completado:** con fecha o commit.
- Para detalle técnico de la app (state, flujos, archivos), ver `.cursor/CONTEXT.md`.
