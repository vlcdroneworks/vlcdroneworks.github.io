# Contexto de la aplicación — Comunicación UAS

Este documento describe la aplicación para que cualquier agente o desarrollador pueda trabajar sobre ella con criterio. Vive en `.cursor/` para no mezclarse con el contenido desplegado de la web.

---

## Qué es la aplicación

Herramienta web para **generar los PDFs de comunicación previa de operaciones con drones (UAS) al Ministerio del Interior** (España). El usuario introduce operadores, pilotos, drones, operaciones y fechas; la app rellena el formulario oficial PDF y permite descargar uno o varios PDF (o un ZIP con múltiples comunicaciones).

- **Publicación:** Se sube a GitHub y se publica vía GitHub Pages (repositorio tipo `*.github.io`).
- **Idioma:** Interfaz y mensajes en español.

---

## Estructura del proyecto

```
comunicacion/          # App desplegada (HTML, JS, CSS, assets)
  index.html
  app.js
  style.css
  logo-2.png
  version.txt           # Versión base (p. ej. "3.0.0")
  template/             # Plantilla PDF oficial
.github/workflows/      # p. ej. inject-version.yml
.cursor/                # Documentación para desarrollo/agentes (no se despliega)
  TODO.md
  CONTEXT.md            # Este fichero
```

La versión base de la app se define en `comunicacion/version.txt`. Un workflow de GitHub Actions (`.github/workflows/inject-version.yml`) lee ese fichero y lo inyecta junto con el commit SHA en `comunicacion/index.html` en cada push a `main`.

---

## Stack técnico

- **Frontend:** HTML + CSS + JavaScript vanilla. Sin framework (React/Vue/etc.).
- **Estilos:** Tailwind vía CDN (`cdn.tailwindcss.com`) + `comunicacion/style.css` propio. Clases Tailwind en `index.html` y en cadenas generadas en `app.js` (acordeones, grids).
- **PDF:** `pdf-lib` (fill form + flatten). Flujo actual: plantillas `template-operador-form.pdf` (2 págs) y `template-actividad-form.pdf` (4 págs). Un PDF por fecha = operador + N copias de actividad; números de hoja PAGINA/TOTAL. Los campos AcroForm se aplanan (`form.flatten()`) antes de mergear para evitar nombres duplicados y garantizar compatibilidad con todos los visores (incluido Adobe Acrobat Reader). Los campos de representante en la plantilla operador quedan vacíos (solo se rellena la sección del operador). Plantilla antigua `20201228-Formato-Solicitud-Comunicacion-V9.0.pdf` y `FIELD_MAP` siguen en código pero ya no se usan en la generación.
- **YAML:** `js-yaml` para importar/exportar datos.
- **ZIP:** `JSZip` para empaquetar varios PDFs.
- **Persistencia:** `localStorage` bajo la clave `comunicacion_uas_state`.

No hay build step: los archivos se sirven tal cual. El script de la app se carga con `document.write` para mantener orden síncrono y que `DOMContentLoaded` dispare correctamente (menú y resto de listeners).

---

## Modelo de datos (state)

En `app.js`, el estado global es:

```js
state = {
  personas: {},   // clave -> { nombre, documento_identidad, direccion, ... }
  drones: {},     // clave -> { clase, fabricante, tipo_modelo, ... }
  operaciones: {}, // clave -> { tipo, lugar, hora_inicio, hora_fin, ... }
  comunicacion: {
    fecha_hora: "",
    operador: "",   // clave en personas
    observador: "", // clave en personas
    operacion: "",  // clave en operaciones
    notificacion_email: true,
  },
}
```

- **Personas:** Se usan como operador, piloto u observador. Campos definidos en `PERSONA_FIELDS` (agrupados en Datos personales, Dirección, Contacto, Registro y formación).
- **Drones:** UAS. Campos en `DRONE_FIELDS` (Identificación, Prestaciones, Equipos).
- **Operaciones:** Tipo, lugar, horario, zona de vuelo, etc. Campos en `OPERACION_FIELDS`. No hay campo `fecha` en el modelo; la fecha de operación se elige en la sección Comunicación. La duración se calcula en el PDF a partir de `hora_inicio` y `hora_fin` (`calcDuracion`), no se guarda en operaciones.

Las claves son strings elegidos por el usuario (p. ej. "OP-1", "Juan García", "DJI-Mavic").

---

## Flujo de generación de PDFs

1. **UI → state:** `syncStateFromUI()` lee formularios y actualiza `state`.
2. **Selección:** En Comunicación: operación, operador, observador, filas (piloto + dron + observador) o pilotos/drones por defecto, y fechas de operación.
3. **Filas:** `buildRows()` devuelve la lista de (piloto, drone, observador); si hay combinaciones en el formulario las usa, si no hace producto cartesiano pilotos × drones.
4. **Un PDF por fecha:** Para cada fecha se genera un único PDF: se rellena la plantilla operador (2 págs) con `fillOperadorPdf(data, totalPages)`, se rellena una copia de la plantilla actividad (4 págs) por cada fila con `fillActividadPdf(data, pageBase, totalPages)`, y se concatenan con `mergeOperadorConActividades(operadorBytes, actividadBytesArray)`. Total páginas = 2 + 4×N (N = número de filas). Números de hoja en formato PAGINA/TOTAL.
5. **Datos:** `resolveData({ operador, piloto, observador, uas, operacion, fecha_operacion })` devuelve el objeto plano; `OPERADOR_FIELD_MAP` y `ACTIVIDAD_FIELD_MAP` mapean a los nombres de campo de cada plantilla.
6. **Salida:** Una fecha → un PDF `comunicacion_<operacion>_<YYYYMMDD>.pdf`. Varias fechas → ZIP con un PDF por fecha.

En `comunicacion/app.js`: `generate()`, `buildRows()`, `fillOperadorPdf()`, `fillActividadPdf()`, `mergeOperadorConActividades()`, `resolveData()`, `OPERADOR_FIELD_MAP`, `ACTIVIDAD_FIELD_MAP`. Utilidad en consola: `listPdfFields(url)` para listar nombres de campos de un PDF.

---

## UI principal

- **Secciones (single-page):** Inicio, Comunicación, Personas, Drones, Operaciones. Cambio por `data-nav` y clase `app-section`; solo una visible.
- **Navbar:** Desktop (tabs + dropdown "Datos") y móvil (menú colapsable). Botón "Generar" según sección.
- **Acordeones:** En Personas, Drones y Operaciones los ítems se renderizan con `renderAccordionList()`. Si los campos tienen `group`, se agrupan con títulos (p. ej. "Datos personales", "Horario") y layout en bloques (`flex flex-col space-y-5` y grid por grupo). Los inputs se enlazan a `state` por `data-section`, `data-item-key`, `data-field`.
- **Comunicación:** Selectores de operación, operador, observador; listas de pilotos y drones (checkboxes); selector de fechas de operación; botón Generar.
- **Versión:** Se muestra solo en Inicio, debajo del subtítulo "Herramienta de generación de comunicaciones al Ministerio del Interior" (elemento `#app-version-placeholder`).

Eventos (navegación, dropdown, acordeón, botones, inputs) se registran en `DOMContentLoaded` en `app.js`.

---

## YAML

- **Exportar:** Convierte `state.personas`, `state.drones`, `state.operaciones` a YAML (sin `fecha` ni `duracion` en operaciones). No se exporta `state.comunicacion`.
- **Importar:** Sobrescribe personas, drones y operaciones; limpia `fecha` y `duracion` de cada operación.
- **Ejemplo:** `EXAMPLE_YAML` en `app.js` tiene datos de ejemplo que se cargan con "Datos de ejemplo".

---

## Detalles útiles para cambios

- **Añadir un campo:** Incluirlo en el array de fields correspondiente (`PERSONA_FIELDS`, `DRONE_FIELDS`, `OPERACION_FIELDS`) con `key`, `label` y opcionalmente `type` (p. ej. `"time"`, `"date"`) y `group`. Si existe en el PDF, añadir la entrada en `FIELD_MAP` y, si hace falta, en `resolveData()`.
- **Formato fecha en PDF:** Se usa DD/MM/YYYY; la fecha de operación llega como tal desde la UI. Para el formulario de comunicación se usa `fecha_hora` (fecha + hora actual al generar).
- **Cache:** El script se carga con `app.js?v=<VERSION>` para cache-busting; la versión puede incluir commit SHA vía GitHub Actions.
- **Inputs time/date:** Flatpickr (CDN) con clases `vdw-date`, `vdw-time`, `vdw-datetime`; se inicializan con `initDatePickers()` en `renderAll()`. Apariencia unificada en todos los navegadores.

---

## Referencias rápidas en código

| Buscar en app.js        | Qué es |
|-------------------------|--------|
| `FIELD_MAP`             | Mapeo data key → nombre campo AcroForm PDF |
| `resolveData()`          | Construye objeto plano para un PDF |
| `generate()`             | Bucle pilotos×drones×fechas, fillPdf, descarga/ZIP |
| `renderAccordionList()`  | Pinta acordeones de personas/drones/operaciones |
| `syncStateFromUI()`      | Lee UI y escribe en `state` |
| `STORAGE_KEY`            | Clave localStorage |
| `getOperationDates()`    | Fechas de operación seleccionadas en la UI |

Con esto se puede mantener la app, implementar los TODOs (ver `.cursor/TODO.md`) y extender funcionalidad (p. ej. relaciones piloto–drone) sin perder el hilo.
