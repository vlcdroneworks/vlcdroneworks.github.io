# TODO — Comunicación UAS

Seguimiento de mejoras y tareas pendientes. El objetivo es tener **todo claro y documentado** para cuando se aborde cada punto (o para que otro agente pueda hacerlo con contexto).

---

## Hecho (referencia)

### 1. Mejorar la creación de PDFs: PDF único con páginas repetidas
- **Estado:** Hecho
- **Completado:** Un PDF por fecha = operador (2 págs) + N×actividad (4 págs). Plantillas template-operador-form.pdf y template-actividad-form.pdf; OPERADOR_FIELD_MAP, ACTIVIDAD_FIELD_MAP; números de hoja PAGINA/TOTAL.

### 2. Sustituir date/time picker por un componente unificado
- **Estado:** Hecho
- **Completado:** Flatpickr (CDN), clases vdw-date, vdw-time, vdw-datetime; initDatePickers() en renderAll().

### 3. Combinaciones piloto–drone
- **Estado:** Hecho
- **Completado:** Formulario con filas piloto + dron + observador; opción "Todos" en selector de drones (genera una comunicación por cada drone). Persistencia en localStorage y YAML.

### 4. Extraer la versión de la app fuera de index.html
- **Estado:** Hecho
- **Completado:** `comunicacion/version.txt` como fuente; workflow inyecta en index.html.

### 5. Rango de fechas correcto (UTC vs local)
- **Estado:** Hecho
- **Completado:** `getOperationDates()` usa `toLocalDateString()` en lugar de `toISOString().slice(0,10)` para evitar desfase de un día en zonas UTC+1. Fechas de inicio/fin se parsean con `"T00:00:00"` para interpretarlas como medianoche local.

### 6. Desplegables solo con nombre (sin clave)
- **Estado:** Hecho
- **Completado:** Operación, operador, observador, piloto y dron muestran solo nombre/descripción en la UI; el `value` sigue siendo la clave interna.

### 7. Campo nombre en operaciones
- **Estado:** Hecho
- **Completado:** Añadido campo "nombre" en OPERACION_FIELDS (Datos generales). En importación YAML/localStorage/ejemplo se rellena con la clave si falta. Layout: nombre en una línea, tipo y lugar debajo.

### 8. Ocultar campo clave en formularios de datos
- **Estado:** Hecho
- **Completado:** El campo "Clave" en personas, drones y operaciones tiene clase `hidden`; el input sigue en el DOM para syncStateFromUI. El encabezado del acordeón muestra título descriptivo (nombre / fabricante+modelo / nombre|lugar).

### 9. Aviso 5 días de antelación
- **Estado:** Hecho
- **Completado:** Si la fecha de operación es en menos de 5 días respecto a hoy, se muestra aviso en ámbar bajo las fechas (`#fechas-antelacion-aviso`) y se llama a `checkAntelacionMinima()` desde `updateFechasPreview()` y `renderComunicacion()`.

### 10. Botón "Agregar fila" con estilo primary
- **Estado:** Hecho
- **Completado:** Misma apariencia que "Añadir persona" (btn-primary) con tamaño compacto (text-xs, px-2.5 py-1).

### 11. Ocultar recuento de páginas en Comunicación
- **Estado:** Hecho
- **Completado:** El resumen muestra solo "1 PDF" o "N fecha(s) → N PDF(s)"; eliminado el texto con páginas por PDF.

### 12. Clase de aeronave (UAS) restringida a tres valores
- **Estado:** Hecho
- **Completado:** Valores permitidos: "Ala fija", "Hibrido", "Rotor" (`CLASE_UAS_VALIDOS`). Campo `clase` en drones es un desplegable (select) en lugar de texto. YAML de ejemplo actualizado. Al cargar YAML o localStorage, valores no válidos se normalizan a "Ala fija" y se muestra toast si se corrigieron.

### 13. Compatibilidad PDF con Adobe Acrobat Reader (flatten)
- **Estado:** Hecho
- **Completado:** `fillPdfWithMap` aplana los campos del formulario (`form.flatten()`) después de rellenarlos y generar sus apariencias. Esto convierte los campos AcroForm en contenido estático de página, eliminando los nombres de campo duplicados que provocaban que Acrobat Reader no renderizase las páginas a partir de la segunda actividad. También corregido el orden de `updateAppearances(fontBold)` para `datos_actividad` (se aplica después de `form.updateFieldAppearances()` para que la negrita no sea sobreescrita).

### 14. Campos de representante vacíos en la plantilla operador
- **Estado:** Hecho
- **Completado:** `OPERADOR_FIELD_MAP` ya no mapea datos del operador a campos del representante. Solo se rellenan los campos `_operador`; los campos `_representante` quedan vacíos en el PDF generado.

---

## Pendientes

- **Nada pendiente** de la lista histórica. Cualquier nueva mejora se puede añadir aquí debajo.

---

## Cómo usar este TODO

- Mantener cada ítem con Estado y Completado cuando corresponda.
- Para detalle técnico de la app (state, flujos, archivos), ver `.cursor/CONTEXT.md`.
