/* global PDFLib, jsyaml, JSZip, bootstrap */

// =========================================================================
// PDF field mappings (data key -> AcroForm field name)
// =========================================================================
const FIELD_MAP = {
  "comunicacion.fecha": [
    "topmostSubform[0].Page1[0].#field[16]",
    "topmostSubform[0].Page2[0].#field[14]",
    "topmostSubform[0].Page3[0].#field[17]",
    "topmostSubform[0].Page4[0].#field[14]",
  ],
  "comunicacion.hora": [
    "topmostSubform[0].Page1[0].CampoFechaHora1[0]",
    "topmostSubform[0].Page2[0].CampoFechaHora1[0]",
    "topmostSubform[0].Page3[0].CampoFechaHora1[0]",
    "topmostSubform[0].Page4[0].CampoFechaHora1[0]",
  ],

  "operador.nombre":              "topmostSubform[0].Page1[0].Nombre_o_razón_social_primer_apellido__segundo_apellido__nombre___Row_1[0]",
  "operador.documento_identidad": "topmostSubform[0].Page1[0].DNI__NIF__NIE__CIF___Row_1[0]",
  "operador.direccion":           "topmostSubform[0].Page1[0].Tipo_Víadenominación[0]",
  "operador.codigo_postal":       "topmostSubform[0].Page1[0].Código_Postal[0]",
  "operador.municipio":           "topmostSubform[0].Page1[0].Municipio[0]",
  "operador.provincia":           "topmostSubform[0].Page1[0].ListaDesplegable1[0]",
  "operador.telefono":            "topmostSubform[0].Page1[0].Correo_electrónico[1]",
  "operador.email":               "topmostSubform[0].Page1[0].Correo_electrónico[0]",
  "operador.numero_registro":     "topmostSubform[0].Page1[0].Número_de_registro_de_operador[0]",

  "piloto.nombre":                  "topmostSubform[0].Page2[0].Nombre_o_razón_social_primer_apellido__segundo_apellido__nombre___Row_1_2[0]",
  "piloto.documento_identidad":     "topmostSubform[0].Page2[0].DNI__NIF__NIE__CIF___Row_1_3[0]",
  "piloto.direccion":               "topmostSubform[0].Page2[0].Tipo_Víadenominación_2[0]",
  "piloto.codigo_postal":           "topmostSubform[0].Page2[0].Código_Postal_3[0]",
  "piloto.municipio":               "topmostSubform[0].Page2[0].Municipio_3[0]",
  "piloto.provincia":               "topmostSubform[0].Page2[0].ListaDesplegable1[0]",
  "piloto.certificado_competencia": "topmostSubform[0].Page2[0].Certificado_de_competencia_de_piloto_a_distancia____Row_1[0]",
  "piloto.acreditacion_formacion":  "topmostSubform[0].Page2[0].Acreditación_de_formación_autopráctica_en_la_clase_de_UAS_a_utilizar___Row_1[0]",
  "piloto.poliza_seguros":          "topmostSubform[0].Page2[0].Acreditación_de_formación_autopráctica_en_la_clase_de_UAS_a_utilizar___Row_1[1]",

  "operacion.tipo":        "topmostSubform[0].Page2[0].Tipo_de_operación_concretar_la_actividad_a_desarrollar__informativa__grabación_de_imágenes__grabación_de_sonido__telemetría__observación__vigilancia__etc[0]",
  "operacion.fecha":       "topmostSubform[0].Page2[0].Fecha_de_la_operación_día__mes_y_año[0]",
  "operacion.lugar":       "topmostSubform[0].Page2[0].Lugar_de_la_operación_población__provincia_y_CCAA[0]",
  "operacion.hora_inicio": "topmostSubform[0].Page2[0].Hora_prevista_de_inicio_de_la_operación_en_hora_local[0]",
  "operacion.hora_fin":    "topmostSubform[0].Page2[0].Hora_prevista_de_finalización_de_la_operación_en_hora_local[0]",
  "operacion.duracion":    "topmostSubform[0].Page2[0].Duración_total_prevista_de_la_operación[0]",

  "operacion.zona_poblacion":    "topmostSubform[0].Page3[0].Zona_de_población[0]",
  "operacion.coordenadas_wgs84": "topmostSubform[0].Page3[0].WGS-84[0]",
  "operacion.radio_metros":      "topmostSubform[0].Page3[0].Radio_en_metros[0]",
  "operacion.ruta":              "topmostSubform[0].Page3[0].Ruta_a_seguir_en_caso_de_que_haya_desplazamiento_concretar_calles_y_números__velocidad_y_altura_prevista___Row_1[0]",
  "operacion.area_proteccion":   "topmostSubform[0].Page3[0].Ubicación_del_área_de_protección_zona_de_despegue_y_aterrizajes_normales___Row_1[0]",
  "operacion.zona_recuperacion": "topmostSubform[0].Page3[0].Ubicación_de_la_zona_de_recuperación_zona_de_aterrizajes_de_emergencias___Row_1[0]",
  "operacion.altura_prevista":   "topmostSubform[0].Page3[0].Altura_prevista_de_la_operación___Row_1[0]",

  "uas.clase":             "topmostSubform[0].Page3[0].Clase_de_UAS[0]",
  "uas.fabricante":        "topmostSubform[0].Page3[0].Nombre_del_fabricante[0]",
  "uas.tipo_modelo":       "topmostSubform[0].Page3[0].Tipo_y_modelo[0]",
  "uas.numero_serie":      "topmostSubform[0].Page3[0].Número_de_serie[0]",
  "uas.matricula":         "topmostSubform[0].Page3[0].Matrícula_en_su_caso[0]",
  "uas.mtom":              "topmostSubform[0].Page3[0].MTOM[0]",
  "uas.autonomia":         "topmostSubform[0].Page3[0].Autonomía[0]",
  "uas.autopiloto":        "topmostSubform[0].Page3[0].Autopiloto_tipo_de_autopiloto_y_sistema_de_navegación_inercial_si_lo_tiene[0]",
  "uas.frecuencias":       "topmostSubform[0].Page3[0].Banda_y_frecuencias_de_funcionamiento_de_control_del_UAS[0]",
  "uas.color":             "topmostSubform[0].Page3[0].Color[0]",

  "uas.luces":              "topmostSubform[0].Page4[0].Luces_pintura_de_alta_visibilidad__etc[0]",
  "uas.carga_pago":         "topmostSubform[0].Page4[0].Carga_de_pago_cámara__micrófono__antena__infrarrojos__objetos__dispositivos__etc____Row_1[0]",
  "uas.equipo_vhf":         "topmostSubform[0].Page4[0].Equipo_de_comunicaciones_VHF[0]",
  "uas.respondedor_modo_s": "topmostSubform[0].Page4[0].Respondedor_Modo_S_solamente_obligatorio_para_espacio_aéreo_controlado[0]",
  "uas.equipo_emergencia":  "topmostSubform[0].Page4[0].Equipo_de_Emergencia_sistema_de_terminación_del_vuelo_seguro[0]",
  "uas.dispositivo_vision": "topmostSubform[0].Page4[0].Dispositivo_de_visión_hacia_delante[0]",

  "observador.nombre":              "topmostSubform[0].Page4[0].Nombre_o_razón_social_primer_apellido__segundo_apellido__nombre___Row_1_3[0]",
  "observador.documento_identidad": "topmostSubform[0].Page4[0].DNI__NIF__NIE__CIF___Row_1_4[0]",
  "observador.direccion":           "topmostSubform[0].Page4[0].Tipo_Víadenominación_3[0]",
  "observador.codigo_postal":       "topmostSubform[0].Page4[0].Código_Postal_4[0]",
  "observador.municipio":           "topmostSubform[0].Page4[0].Municipio_4[0]",
  "observador.provincia":           "topmostSubform[0].Page4[0].ListaDesplegable1[0]",

  "declaracion.lugar_fecha":        "topmostSubform[0].Page4[0].Lugar_y_Fecha__Row_1[0]",
  "declaracion.nombre_declarante":  "topmostSubform[0].Page4[0].Nombre__apellidos_y_cargo_-declarante__Row_1[0]",
};

const CHECKBOX_FIELD = "topmostSubform[0].Page1[0].Correo_electrónico_2[0]";
const PDF_TEMPLATE_URL = "template/20201228-Formato-Solicitud-Comunicacion-V9.0.pdf";

// =========================================================================
// UI field definitions
// =========================================================================
const PERSONA_FIELDS = [
  { key: "nombre",                  label: "Nombre (apellido1, apellido2, nombre)" },
  { key: "documento_identidad",     label: "DNI/NIF/NIE/CIF" },
  { key: "direccion",               label: "Dirección" },
  { key: "codigo_postal",           label: "Código postal" },
  { key: "municipio",               label: "Municipio" },
  { key: "provincia",               label: "Provincia" },
  { key: "telefono",                label: "Teléfono" },
  { key: "email",                   label: "Email" },
  { key: "numero_registro",         label: "Número de registro de operador" },
  { key: "certificado_competencia", label: "Certificado de competencia" },
  { key: "acreditacion_formacion",  label: "Acreditación de formación" },
  { key: "poliza_seguros",          label: "Póliza de seguros" },
];

const DRONE_FIELDS = [
  { key: "clase",              label: "Clase de UAS" },
  { key: "fabricante",         label: "Fabricante" },
  { key: "tipo_modelo",        label: "Tipo y modelo" },
  { key: "numero_serie",       label: "Número de serie" },
  { key: "matricula",          label: "Matrícula" },
  { key: "mtom",               label: "MTOM" },
  { key: "autonomia",          label: "Autonomía" },
  { key: "autopiloto",         label: "Autopiloto" },
  { key: "frecuencias",        label: "Frecuencias" },
  { key: "color",              label: "Color" },
  { key: "luces",              label: "Luces" },
  { key: "carga_pago",         label: "Carga de pago" },
  { key: "equipo_vhf",         label: "Equipo VHF" },
  { key: "respondedor_modo_s", label: "Respondedor Modo S" },
  { key: "equipo_emergencia",  label: "Equipo de emergencia" },
  { key: "dispositivo_vision", label: "Dispositivo de visión" },
];

const OPERACION_FIELDS = [
  { key: "tipo",                label: "Tipo de operación" },
  { key: "fecha",               label: "Fecha (día/mes/año)" },
  { key: "lugar",               label: "Lugar (población, provincia, CCAA)" },
  { key: "hora_inicio",         label: "Hora inicio" },
  { key: "hora_fin",            label: "Hora fin" },
  { key: "duracion",            label: "Duración total" },
  { key: "zona_poblacion",      label: "Zona de población" },
  { key: "coordenadas_wgs84",   label: "Coordenadas WGS-84" },
  { key: "radio_metros",        label: "Radio (metros)" },
  { key: "ruta",                label: "Ruta" },
  { key: "area_proteccion",     label: "Área de protección" },
  { key: "zona_recuperacion",   label: "Zona de recuperación" },
  { key: "altura_prevista",     label: "Altura prevista" },
];

// =========================================================================
// Application state
// =========================================================================
const STORAGE_KEY = "comunicacion_uas_state";

let state = {
  personas: {},
  drones: {},
  operaciones: {},
  comunicacion: {
    fecha_hora: "", operador: "", observador: "",
    operacion: "", notificacion_email: true,
  },
};

let pdfTemplateBytes = null;

// =========================================================================
// Data resolution: state + overrides -> flat data for PDF fields
// =========================================================================
function resolveData(opts = {}) {
  const personas = state.personas;
  const dronesCat = state.drones;
  const opsCat = state.operaciones;
  const com = state.comunicacion;

  const operadorKey = opts.operador || com.operador || "";
  const pilotoKey = opts.piloto || "";
  const observadorKey = opts.observador || com.observador || "";
  const uasKey = opts.uas || "";
  const operacionKey = opts.operacion || com.operacion || "";

  const result = {};

  const opData = personas[operadorKey] || {};
  for (const k of ["nombre", "documento_identidad", "direccion", "codigo_postal",
                    "municipio", "provincia", "telefono", "email", "numero_registro"]) {
    result[`operador.${k}`] = opData[k] || "";
  }

  const piData = personas[pilotoKey] || {};
  for (const k of ["nombre", "documento_identidad", "direccion", "codigo_postal", "municipio", "provincia",
                    "certificado_competencia", "acreditacion_formacion", "poliza_seguros"]) {
    result[`piloto.${k}`] = piData[k] || "";
  }

  const obData = observadorKey ? (personas[observadorKey] || {}) : {};
  for (const k of ["nombre", "documento_identidad", "direccion", "codigo_postal", "municipio", "provincia"]) {
    result[`observador.${k}`] = obData[k] || "";
  }

  const droneData = dronesCat[uasKey] || {};
  for (const f of DRONE_FIELDS) {
    result[`uas.${f.key}`] = droneData[f.key] || "";
  }

  const opRaw = opsCat[operacionKey] || {};
  for (const f of OPERACION_FIELDS) {
    result[`operacion.${f.key}`] = opRaw[f.key] || "";
  }

  const fechaOpOverride = opts.fecha_operacion || document.getElementById("com-fecha-operacion").value.trim();
  if (fechaOpOverride) result["operacion.fecha"] = fechaOpOverride;

  const fechaCom = opts.fecha_comunicacion || com.fecha_hora || "";
  let lugarFecha = fechaCom;
  try {
    const parts = fechaCom.split(" ")[0].split("/");
    if (parts.length === 3) lugarFecha = `${parts[0]}/${parts[1]}/${parts[2]}`;
  } catch { /* keep as is */ }

  const partesCom = fechaCom.split(" ");
  result["comunicacion.fecha"] = partesCom[0] || "";
  result["comunicacion.hora"] = partesCom[1] || "";
  result["declaracion.lugar_fecha"] = lugarFecha;
  const nombreOp = result["operador.nombre"];
  result["declaracion.nombre_declarante"] = nombreOp ? `${nombreOp} - Operador` : "";
  result._notificacion_email = com.notificacion_email !== false;

  return result;
}

// =========================================================================
// PDF generation
// =========================================================================
async function loadTemplate() {
  if (pdfTemplateBytes) return pdfTemplateBytes;
  const resp = await fetch(PDF_TEMPLATE_URL);
  if (!resp.ok) throw new Error("No se pudo cargar la plantilla PDF");
  pdfTemplateBytes = await resp.arrayBuffer();
  return pdfTemplateBytes;
}

async function fillPdf(data) {
  const templateBytes = await loadTemplate();
  const pdfDoc = await PDFLib.PDFDocument.load(templateBytes);
  const form = pdfDoc.getForm();

  for (const [dataKey, fieldNames] of Object.entries(FIELD_MAP)) {
    const val = data[dataKey];
    if (val === undefined || val === null || val === "" || typeof val === "boolean") continue;
    const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    for (const fieldName of names) {
      try {
        const field = form.getTextField(fieldName);
        field.setText(String(val));
      } catch {
        try {
          const dd = form.getDropdown(fieldName);
          dd.select(String(val));
        } catch { /* skip */ }
      }
    }
  }

  try {
    const cb = form.getCheckBox(CHECKBOX_FIELD);
    if (data._notificacion_email) cb.check(); else cb.uncheck();
  } catch { /* skip */ }

  return await pdfDoc.save();
}

// =========================================================================
// Unified generation: 1 combo -> PDF, N combos -> ZIP
// =========================================================================
async function generate() {
  syncStateFromUI();

  const operador = document.getElementById("com-operador").value;
  const operacion = document.getElementById("com-operacion").value;
  const observador = document.getElementById("com-observador").value;
  const pilotos = getChecked("pilotos-list");
  const drones = getChecked("drones-sel-list");

  if (!operacion) { showToast("Selecciona una operación"); return; }
  if (!operador) { showToast("Selecciona un operador"); return; }
  if (!pilotos.length) { showToast("Selecciona al menos un piloto"); return; }
  if (!drones.length) { showToast("Selecciona al menos un drone"); return; }

  const ts = timestamp();
  const total = pilotos.length * drones.length;

  if (total === 1) {
    const data = resolveData({ operador, piloto: pilotos[0], observador, uas: drones[0], operacion });
    const pdfBytes = await fillPdf(data);
    downloadBlob(pdfBytes, `comunicacion_${ts}.pdf`, "application/pdf");
    saveToLocal();
    showToast("PDF generado correctamente");
    return;
  }

  const zip = new JSZip();
  for (const piloto of pilotos) {
    for (const drone of drones) {
      const data = resolveData({ operador, piloto, observador, uas: drone, operacion });
      const pdfBytes = await fillPdf(data);
      zip.file(`comunicacion_${piloto}_${drone}_${ts}.pdf`, pdfBytes);
    }
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  downloadBlob(zipBlob, `comunicaciones_${ts}.zip`, "application/zip");
  saveToLocal();
  showToast(`${total} PDFs generados en ZIP`);
}

// =========================================================================
// YAML import / export
// =========================================================================
function loadYamlText(text) {
  const raw = jsyaml.load(text);
  if (!raw || typeof raw !== "object") throw new Error("YAML inválido");

  state.personas = raw.personas || {};
  state.drones = raw.drones || {};
  state.operaciones = raw.operaciones || {};

  const com = raw.comunicacion || {};
  state.comunicacion = {
    fecha_hora: com.fecha_hora || "",
    operador: com.operador || "",
    observador: com.observador || "",
    operacion: com.operacion || "",
    notificacion_email: com.notificacion_email !== false,
  };

  renderAll();
  saveToLocal();
  showToast("YAML cargado correctamente");
}

function exportYaml() {
  syncStateFromUI();
  const obj = {
    personas: state.personas,
    drones: state.drones,
    operaciones: state.operaciones,
    comunicacion: state.comunicacion,
  };
  const text = jsyaml.dump(obj, { lineWidth: -1, quotingType: '"', forceQuotes: true });
  downloadBlob(new TextEncoder().encode(text), "datos.yaml", "text/yaml");
  saveToLocal();
  showToast("YAML exportado");
}

// =========================================================================
// localStorage
// =========================================================================
function saveToLocal() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function loadFromLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return;
    state.personas = saved.personas || {};
    state.drones = saved.drones || {};
    state.operaciones = saved.operaciones || {};
    const com = saved.comunicacion || {};
    state.comunicacion = {
      fecha_hora: com.fecha_hora || "",
      operador: com.operador || "",
      observador: com.observador || "",
      operacion: com.operacion || "",
      notificacion_email: com.notificacion_email !== false,
    };
  } catch {}
}

// =========================================================================
// UI: Section navigation (driven by navbar links)
// =========================================================================
function showSection(name) {
  document.querySelectorAll(".app-section").forEach(s => s.classList.add("d-none"));
  const target = document.getElementById(`section-${name}`);
  if (target) target.classList.remove("d-none");

  document.querySelectorAll("[data-nav]").forEach(a => {
    a.classList.toggle("active", a.dataset.nav === name);
  });
  const datosDropdown = document.querySelector(".nav-item.dropdown");
  const anyDropdownActive = datosDropdown.querySelector("[data-nav].active");
  datosDropdown.querySelector(".nav-link").classList.toggle("active", !!anyDropdownActive);
}

// =========================================================================
// UI: Accordion lists (Personas, Drones, Operaciones)
// =========================================================================
function renderAccordionList(containerId, catalog, fieldDefs, section) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const parentId = containerId;

  for (const [key, data] of Object.entries(catalog)) {
    const itemId = `${section}-${key.replace(/\W/g, "_")}`;

    const subtitle = section === "personas" ? (data.nombre || "")
      : section === "drones" ? `${data.fabricante || ""} ${data.tipo_modelo || ""} (${data.mtom || ""})`
      : `${data.fecha || ""} — ${data.lugar || ""}`;

    const item = document.createElement("div");
    item.className = "accordion-item";
    item.innerHTML = `
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse" data-bs-target="#collapse-${itemId}">
          <strong>${esc(key)}</strong>
          <span class="accordion-subtitle">${esc(subtitle)}</span>
        </button>
      </h2>
      <div id="collapse-${itemId}" class="accordion-collapse collapse" data-bs-parent="#${parentId}">
        <div class="accordion-body">
          <div class="key-field">
            <label>Clave:</label>
            <input type="text" class="form-control form-control-sm" value="${escAttr(key)}"
                   data-section="${section}" data-role="key" data-old-key="${escAttr(key)}">
          </div>
          <div class="row g-2">
            ${fieldDefs.map(f => `
              <div class="col-md-6">
                <label class="form-label small text-secondary">${esc(f.label)}</label>
                <input type="text" class="form-control form-control-sm" value="${escAttr(data[f.key] || "")}"
                       data-section="${section}" data-item-key="${escAttr(key)}" data-field="${f.key}">
              </div>
            `).join("")}
          </div>
          <div class="d-flex gap-2 mt-3 pt-2 border-top">
            <button class="btn btn-danger btn-sm" data-action="delete"
                    data-section="${section}" data-item-key="${escAttr(key)}">Eliminar</button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(item);
  }
}

// =========================================================================
// UI: Comunicacion selectors + checkbox lists
// =========================================================================
function renderComunicacion() {
  const pKeys = Object.keys(state.personas);
  const dKeys = Object.keys(state.drones);
  const oKeys = Object.keys(state.operaciones);

  fillSelect("com-operacion", oKeys, state.comunicacion.operacion,
    k => `${k} (${state.operaciones[k]?.fecha || ""} — ${state.operaciones[k]?.lugar || ""})`);
  fillSelect("com-operador", pKeys, state.comunicacion.operador,
    k => `${k} (${state.personas[k]?.nombre || ""})`);
  fillSelect("com-observador", pKeys, state.comunicacion.observador,
    k => `${k} (${state.personas[k]?.nombre || ""})`, true);

  document.getElementById("com-fecha-hora").value = state.comunicacion.fecha_hora || "";
  document.getElementById("com-notificacion").checked = state.comunicacion.notificacion_email !== false;

  renderCheckboxList("pilotos-list", pKeys, k => `${k} — ${state.personas[k]?.nombre || ""}`);
  renderCheckboxList("drones-sel-list", dKeys, k => `${k} — ${state.drones[k]?.tipo_modelo || ""}`);

  updateSummary();
}

function fillSelect(id, keys, selected, labelFn, allowEmpty) {
  const sel = document.getElementById(id);
  sel.innerHTML = "";
  if (allowEmpty) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "(ninguno)";
    sel.appendChild(opt);
  }
  for (const k of keys) {
    const opt = document.createElement("option");
    opt.value = k;
    opt.textContent = labelFn(k);
    if (k === selected) opt.selected = true;
    sel.appendChild(opt);
  }
}

function renderCheckboxList(containerId, keys, labelFn) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  for (const k of keys) {
    const lbl = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = k;
    cb.className = "form-check-input me-2";
    cb.addEventListener("change", () => {
      lbl.classList.toggle("checked", cb.checked);
      updateSummary();
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(labelFn(k)));
    container.appendChild(lbl);
  }
}

function getChecked(id) {
  return Array.from(document.querySelectorAll(`#${id} input[type=checkbox]:checked`)).map(c => c.value);
}

function setAllChecked(id, val) {
  document.querySelectorAll(`#${id} input[type=checkbox]`).forEach(cb => {
    cb.checked = val;
    cb.closest("label").classList.toggle("checked", val);
  });
  updateSummary();
}

function updateSummary() {
  const p = getChecked("pilotos-list").length;
  const d = getChecked("drones-sel-list").length;
  const total = p * d;
  const el = document.getElementById("combo-summary");
  el.textContent = `${p} piloto(s) × ${d} drone(s) = ${total} PDF(s)`;

  const btn = document.getElementById("btnGenerarMain");
  const btnHeader = document.getElementById("btnGenerar");
  if (total <= 1) {
    btn.textContent = "Generar PDF";
    btnHeader.textContent = "Generar PDF";
  } else {
    btn.textContent = `Generar ZIP (${total} PDFs)`;
    btnHeader.textContent = `Generar ZIP (${total})`;
  }
}

// =========================================================================
// UI: Sync state from DOM
// =========================================================================
function syncStateFromUI() {
  for (const section of ["personas", "drones", "operaciones"]) {
    const cat = {};
    const items = document.querySelectorAll(`#${section}-list .accordion-item`);
    for (const item of items) {
      const keyInput = item.querySelector('[data-role="key"]');
      const key = keyInput.value.trim() || keyInput.dataset.oldKey;
      const obj = {};
      item.querySelectorAll("[data-field]").forEach(f => { obj[f.dataset.field] = f.value; });
      cat[key] = obj;
    }
    state[section] = cat;
  }

  state.comunicacion.operacion = document.getElementById("com-operacion").value;
  state.comunicacion.operador = document.getElementById("com-operador").value;
  state.comunicacion.observador = document.getElementById("com-observador").value;
  state.comunicacion.fecha_hora = document.getElementById("com-fecha-hora").value;
  state.comunicacion.notificacion_email = document.getElementById("com-notificacion").checked;
}

// =========================================================================
// UI: Add / Delete
// =========================================================================
function addItem(section, fieldDefs) {
  syncStateFromUI();
  const key = `nuevo_${Date.now().toString(36)}`;
  const obj = {};
  for (const f of fieldDefs) obj[f.key] = "";
  state[section][key] = obj;
  renderAll();
  saveToLocal();

  const last = document.querySelector(`#${section}-list .accordion-item:last-child .accordion-collapse`);
  if (last) new bootstrap.Collapse(last, { toggle: true });
}

function deleteItem(section, key) {
  syncStateFromUI();
  delete state[section][key];
  renderAll();
  saveToLocal();
}

// =========================================================================
// UI: Render all
// =========================================================================
function renderAll() {
  renderAccordionList("personas-list", state.personas, PERSONA_FIELDS, "personas");
  renderAccordionList("drones-list", state.drones, DRONE_FIELDS, "drones");
  renderAccordionList("operaciones-list", state.operaciones, OPERACION_FIELDS, "operaciones");
  renderComunicacion();
}

// =========================================================================
// Helpers
// =========================================================================
function showToast(msg) {
  const el = document.getElementById("toast");
  document.getElementById("toast-body").textContent = msg;
  const bsToast = bootstrap.Toast.getOrCreateInstance(el, { delay: 2500 });
  bsToast.show();
}

function timestamp() {
  const d = new Date();
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function downloadBlob(data, filename, mime) {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escAttr(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;"); }

// =========================================================================
// Init
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocal();

  const now = new Date();
  const p = n => String(n).padStart(2, "0");
  state.comunicacion.fecha_hora = `${p(now.getDate())}/${p(now.getMonth()+1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}`;

  renderAll();

  // Navbar section navigation
  document.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showSection(link.dataset.nav);
      // Collapse mobile navbar after click
      const navCollapse = document.getElementById("mainNav");
      if (navCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navCollapse).hide();
      }
    });
  });

  // File input (YAML import)
  document.getElementById("fileInput").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try { loadYamlText(ev.target.result); }
      catch (err) { showToast("Error al leer YAML: " + err.message); }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  document.getElementById("btnExportYaml").addEventListener("click", () => exportYaml());

  // Generate buttons
  const onGenerate = async () => {
    try { await generate(); }
    catch (err) { showToast("Error: " + err.message); console.error(err); }
  };
  document.getElementById("btnGenerar").addEventListener("click", onGenerate);
  document.getElementById("btnGenerarMain").addEventListener("click", onGenerate);

  // Add item buttons
  document.getElementById("btnAddPersona").addEventListener("click", () => addItem("personas", PERSONA_FIELDS));
  document.getElementById("btnAddDrone").addEventListener("click", () => addItem("drones", DRONE_FIELDS));
  document.getElementById("btnAddOperacion").addEventListener("click", () => addItem("operaciones", OPERACION_FIELDS));

  // Checkbox select all/none
  document.getElementById("pilotos-all").addEventListener("click", () => setAllChecked("pilotos-list", true));
  document.getElementById("pilotos-none").addEventListener("click", () => setAllChecked("pilotos-list", false));
  document.getElementById("drones-sel-all").addEventListener("click", () => setAllChecked("drones-sel-list", true));
  document.getElementById("drones-sel-none").addEventListener("click", () => setAllChecked("drones-sel-list", false));

  // Delegated delete handler
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-action=delete]");
    if (!btn) return;
    if (confirm(`Eliminar "${btn.dataset.itemKey}"?`)) {
      deleteItem(btn.dataset.section, btn.dataset.itemKey);
    }
  });
});
