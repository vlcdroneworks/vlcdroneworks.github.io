/* global PDFLib, jsyaml, JSZip */

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
  { key: "nombre",                  label: "Nombre (apellido1, apellido2, nombre)", group: "Datos personales" },
  { key: "documento_identidad",     label: "DNI/NIF/NIE/CIF", group: "Datos personales" },
  { key: "direccion",               label: "Dirección", group: "Dirección" },
  { key: "codigo_postal",           label: "Código postal", group: "Dirección" },
  { key: "municipio",              label: "Municipio", group: "Dirección" },
  { key: "provincia",              label: "Provincia", group: "Dirección" },
  { key: "telefono",               label: "Teléfono", group: "Contacto" },
  { key: "email",                  label: "Email", group: "Contacto" },
  { key: "numero_registro",        label: "Número de registro de operador", group: "Registro y formación" },
  { key: "certificado_competencia", label: "Certificado de competencia", group: "Registro y formación" },
  { key: "acreditacion_formacion",  label: "Acreditación de formación", group: "Registro y formación" },
  { key: "poliza_seguros",         label: "Póliza de seguros", group: "Registro y formación" },
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
  { key: "lugar",               label: "Lugar (población, provincia, CCAA)" },
  { key: "hora_inicio",         label: "Hora inicio", type: "time" },
  { key: "hora_fin",            label: "Hora fin", type: "time" },
  { key: "duracion",            label: "Duración total" },
  { key: "zona_poblacion",      label: "Zona de población" },
  { key: "coordenadas_wgs84",   label: "Coordenadas WGS-84 con anotación DMS (grados, minutos y segundos)" },
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

  if (opts.fecha_operacion) result["operacion.fecha"] = opts.fecha_operacion;

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
  const now = new Date();
  const p = n => String(n).padStart(2, "0");
  state.comunicacion.fecha_hora = `${p(now.getDate())}/${p(now.getMonth()+1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}`;

  const operador = document.getElementById("com-operador").value;
  const operacion = document.getElementById("com-operacion").value;
  const observador = document.getElementById("com-observador").value;
  const pilotos = getChecked("pilotos-list");
  const drones = getChecked("drones-sel-list");

  if (!operacion) { showToast("Selecciona una operación"); return; }
  if (!operador) { showToast("Selecciona un operador"); return; }
  if (!pilotos.length) { showToast("Selecciona al menos un piloto"); return; }
  if (!drones.length) { showToast("Selecciona al menos un drone"); return; }

  const opDates = getOperationDates();
  if (opDates.length === 0) {
    showToast("Indica la fecha de operación");
    return;
  }

  const fechasList = opDates.map(isoDate => iso_to_ddmmyyyy(isoDate));

  const total = pilotos.length * drones.length * fechasList.length;

  function fechaToClean(f) {
    const parts = f.split("/");
    return parts.length === 3 ? `${parts[2]}${parts[1]}${parts[0]}` : f.replace(/\//g, "");
  }

  const makeName = (piloto, drone, fecha) =>
    `comunicacion_${operacion}_${fechaToClean(fecha)}_${piloto}_${drone}.pdf`;

  if (total === 1) {
    const data = resolveData({ operador, piloto: pilotos[0], observador, uas: drones[0], operacion, fecha_operacion: fechasList[0] });
    const pdfBytes = await fillPdf(data);
    downloadBlob(pdfBytes, makeName(pilotos[0], drones[0], fechasList[0]), "application/pdf");
    saveToLocal();
    showToast("PDF generado correctamente");
    return;
  }

  const zip = new JSZip();
  for (const fecha of fechasList) {
    for (const piloto of pilotos) {
      for (const drone of drones) {
        const data = resolveData({ operador, piloto, observador, uas: drone, operacion, fecha_operacion: fecha });
        const pdfBytes = await fillPdf(data);
        zip.file(makeName(piloto, drone, fecha), pdfBytes);
      }
    }
  }

  const firstClean = fechaToClean(fechasList[0]);
  const zipSuffix = fechasList.length > 1 ? `${firstClean}-${fechaToClean(fechasList[fechasList.length-1])}` : firstClean;
  const zipBlob = await zip.generateAsync({ type: "blob" });
  downloadBlob(zipBlob, `comunicaciones_${operacion}_${zipSuffix}.zip`, "application/zip");
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
  Object.keys(state.operaciones).forEach(k => { delete state.operaciones[k].fecha; });

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
  const hasData = Object.keys(state.personas).length > 0
    || Object.keys(state.drones).length > 0
    || Object.keys(state.operaciones).length > 0;

  if (hasData) {
    const operacionesSinFecha = Object.fromEntries(
      Object.entries(state.operaciones).map(([k, v]) => {
        const { fecha, ...rest } = v || {};
        return [k, rest];
      })
    );
    const obj = {
      personas: state.personas,
      drones: state.drones,
      operaciones: operacionesSinFecha,
      comunicacion: state.comunicacion,
    };
    const text = jsyaml.dump(obj, { lineWidth: -1, quotingType: '"', forceQuotes: true });
    const d = new Date();
    const ds = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`;
    downloadBlob(new TextEncoder().encode(text), `datos-${ds}.yaml`, "text/yaml");
    saveToLocal();
    showToast("YAML exportado");
  } else {
    downloadBlob(new TextEncoder().encode(EXAMPLE_YAML), "datos.yaml", "text/yaml");
    showToast("YAML de ejemplo exportado");
  }
}

const EXAMPLE_YAML = `# ============================================================
# Ejemplo de fichero YAML para Comunicación UAS
# ============================================================
#
# Este fichero contiene datos de ejemplo. Modifica los valores
# con tus datos reales y cárgalo en la aplicación con
# "Datos > Cargar YAML".
#
# Estructura:
#   - personas: pilotos, operadores y observadores
#   - drones: aeronaves UAS con datos técnicos
#   - operaciones: vuelos planificados
#   - comunicacion: configuración general (normalmente no es
#     necesario modificarla, se rellena desde la aplicación)
#
# ============================================================

personas:
  persona_piloto1:
    nombre: "García López, Juan"
    documento_identidad: "12345678A"
    direccion: "Calle Mayor 10, 3ºA"
    codigo_postal: "46001"
    municipio: "Valencia"
    provincia: "Valencia"
    telefono: "600111222"
    email: "juan.garcia@ejemplo.com"
    numero_registro: "OP-ESP-001"
    certificado_competencia: "A1/A3 - STS"
    acreditacion_formacion: "Piloto A1/A3 - AESA"
    poliza_seguros: "POL-2025-00001"

  persona_piloto2:
    nombre: "Martínez Ruiz, Ana"
    documento_identidad: "87654321B"
    direccion: "Avda. de la Constitución 25"
    codigo_postal: "46002"
    municipio: "Valencia"
    provincia: "Valencia"
    telefono: "600333444"
    email: "ana.martinez@ejemplo.com"
    numero_registro: "OP-ESP-002"
    certificado_competencia: "A1/A3 - STS"
    acreditacion_formacion: "Piloto A1/A3 - AESA"
    poliza_seguros: "POL-2025-00002"

drones:
  dron_mavic3:
    clase: "C1"
    fabricante: "DJI"
    tipo_modelo: "Mavic 3 Pro"
    numero_serie: "1ZNBJ1234567890"
    matricula: "UAS-ESP-00001"
    mtom: "958 g"
    autonomia: "43 min"
    autopiloto: "Sí"
    frecuencias: "2.4 GHz / 5.8 GHz"
    color: "Gris"
    luces: "Sí (posición y anticolisión)"
    carga_pago: "Cámara Hasselblad 4/3 CMOS"
    equipo_vhf: "No"
    respondedor_modo_s: "No"
    equipo_emergencia: "No"
    dispositivo_vision: "No"

  dron_mini4:
    clase: "C0"
    fabricante: "DJI"
    tipo_modelo: "Mini 4 Pro"
    numero_serie: "1YNBJ9876543210"
    matricula: "UAS-ESP-00002"
    mtom: "249 g"
    autonomia: "34 min"
    autopiloto: "Sí"
    frecuencias: "2.4 GHz / 5.8 GHz"
    color: "Gris claro"
    luces: "No"
    carga_pago: "Cámara 1/1.3 CMOS 48MP"
    equipo_vhf: "No"
    respondedor_modo_s: "No"
    equipo_emergencia: "No"
    dispositivo_vision: "No"

  dron_inspire3:
    clase: "C2"
    fabricante: "DJI"
    tipo_modelo: "Inspire 3"
    numero_serie: "3ZNBJ5555666677"
    matricula: "UAS-ESP-00003"
    mtom: "3995 g"
    autonomia: "28 min"
    autopiloto: "Sí"
    frecuencias: "2.4 GHz / 5.8 GHz"
    color: "Negro"
    luces: "Sí (posición y anticolisión)"
    carga_pago: "Zenmuse X9-8K Air"
    equipo_vhf: "No"
    respondedor_modo_s: "No"
    equipo_emergencia: "No"
    dispositivo_vision: "No"

operaciones:
  operacion_ejemplo1:
    tipo: "Filmación aérea"
    lugar: "Albufera, Valencia, Comunidad Valenciana"
    hora_inicio: "09:00"
    hora_fin: "13:00"
    duracion: "4 horas"
    zona_poblacion: "Fuera de aglomeración urbana"
    coordenadas_wgs84: "39.3333, -0.3667"
    radio_metros: "500"
    ruta: "Circular sobre la zona de filmación"
    area_proteccion: "Zona delimitada con señalización"
    zona_recuperacion: "Punto de despegue"
    altura_prevista: "120 m AGL"

  operacion_ejemplo2:
    tipo: "Inspección técnica"
    lugar: "Puerto de Valencia, Valencia, Comunidad Valenciana"
    hora_inicio: "07:30"
    hora_fin: "10:00"
    duracion: "2 horas 30 minutos"
    zona_poblacion: "Aglomeración urbana"
    coordenadas_wgs84: "39.4500, -0.3167"
    radio_metros: "200"
    ruta: "Lineal a lo largo de la infraestructura"
    area_proteccion: "Perímetro de seguridad 50 m"
    zona_recuperacion: "Zona de aparcamiento habilitada"
    altura_prevista: "50 m AGL"

comunicacion:
  notificacion_email: true
`;

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
    Object.keys(state.operaciones).forEach(k => { delete state.operaciones[k].fecha; });
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
  document.querySelectorAll(".app-section").forEach(s => s.classList.add("hidden"));
  document.getElementById("empty-state").classList.add("hidden");
  const target = document.getElementById(`section-${name}`);
  if (target) {
    target.classList.remove("hidden");
    target.classList.remove("section-enter");
    void target.offsetWidth;
    target.classList.add("section-enter");
  }
  if (name === "comunicacion") updateEmptyState();

  document.querySelectorAll("[data-nav]").forEach(a => {
    a.classList.toggle("active", a.dataset.nav === name);
  });
  const datosToggle = document.getElementById("datos-toggle");
  if (datosToggle) {
    datosToggle.classList.toggle("active", ["personas", "drones", "operaciones"].includes(name));
  }
  const menu = document.getElementById("datos-menu");
  if (menu) menu.classList.add("hidden");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) mobileMenu.classList.add("hidden");
}

// =========================================================================
// UI: Accordion lists (Personas, Drones, Operaciones)
// =========================================================================
function renderAccordionList(containerId, catalog, fieldDefs, section) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const getFieldsByGroup = () => {
    const map = {};
    for (const f of fieldDefs) {
      const g = f.group || "";
      if (!map[g]) map[g] = [];
      map[g].push(f);
    }
    return Object.entries(map).filter(([name]) => name !== "").map(([name, fields]) => ({ name, fields }));
  };

  for (const [key, data] of Object.entries(catalog)) {
    const subtitle = section === "personas" ? (data.nombre || "")
      : section === "drones" ? `${data.fabricante || ""} ${data.tipo_modelo || ""} (${data.mtom || ""})`
      : `${data.lugar || ""}`;

    const item = document.createElement("div");
    item.className = "acc-item";
    const useGroups = section === "personas" && fieldDefs.some(f => f.group);
    const groups = useGroups ? getFieldsByGroup() : [];
    const fieldsHtml = useGroups
      ? groups.map(({ name, fields }, idx) => `
        <div>
          <h6 class="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">${esc(name)}</h6>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${fields.map(f => {
              const inputType = f.type || "text";
              let val = data[f.key] || "";
              if (f.type === "date") val = ddmmyyyy_to_iso(val);
              return `
              <div>
                <label class="block text-xs text-white/50 mb-1">${esc(f.label)}</label>
                <input type="${inputType}" class="field-input text-sm" value="${escAttr(val)}"
                       data-section="${section}" data-item-key="${escAttr(key)}" data-field="${f.key}" data-type="${inputType || "text"}">
              </div>`;
            }).join("")}
          </div>
        </div>`).join("")
      : fieldDefs.map(f => {
          const inputType = f.type || "text";
          let val = data[f.key] || "";
          if (f.type === "date") val = ddmmyyyy_to_iso(val);
          return `
            <div>
              <label class="block text-xs text-white/50 mb-1">${esc(f.label)}</label>
              <input type="${inputType}" class="field-input text-sm" value="${escAttr(val)}"
                     data-section="${section}" data-item-key="${escAttr(key)}" data-field="${f.key}" data-type="${inputType || "text"}">
            </div>`;
        }).join("");

    item.innerHTML = `
      <div class="acc-header" data-acc-toggle>
        <div class="flex items-center gap-2 min-w-0">
          <strong class="text-white truncate">${esc(key)}</strong>
          <span class="text-white/40 text-sm truncate hidden sm:inline">${esc(subtitle)}</span>
        </div>
        <svg class="acc-chevron w-5 h-5 text-white/40 shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      <div class="acc-content hidden">
        <div class="key-field">
          <label class="text-xs font-semibold text-white/50 whitespace-nowrap">Clave:</label>
          <input type="text" class="field-input text-sm" value="${escAttr(key)}"
                 data-section="${section}" data-role="key" data-old-key="${escAttr(key)}">
        </div>
        <div class="${useGroups ? "flex flex-col space-y-5" : "grid grid-cols-1 md:grid-cols-2 gap-3"}">
          ${fieldsHtml}
        </div>
        <div class="flex gap-2 mt-4 pt-3 border-t border-white/10">
          <button class="text-red-400 hover:text-red-300 text-sm font-medium transition-colors" data-action="delete"
                  data-section="${section}" data-item-key="${escAttr(key)}">Eliminar</button>
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

  const hasP = pKeys.length > 0;
  const hasD = dKeys.length > 0;
  const hasO = oKeys.length > 0;

  toggleFieldsOrAlert("operacion", hasO);
  toggleFieldsOrAlert("operador", hasP);
  toggleFieldsOrAlert("pilotos", hasP);
  toggleFieldsOrAlert("drones", hasD);
  toggleFieldsOrAlert("observador", hasP);

  if (hasO) {
    fillSelect("com-operacion", oKeys, state.comunicacion.operacion,
      k => `${k} (${state.operaciones[k]?.lugar || ""})`, true);
  }
  if (hasP) {
    fillSelect("com-operador", pKeys, state.comunicacion.operador,
      k => `${k} (${state.personas[k]?.nombre || ""})`, true);
    fillSelect("com-observador", pKeys, state.comunicacion.observador,
      k => `${k} (${state.personas[k]?.nombre || ""})`, true);
    renderCheckboxList("pilotos-list", pKeys, k => `${k} — ${state.personas[k]?.nombre || ""}`);
  }
  if (hasD) {
    renderCheckboxList("drones-sel-list", dKeys, k => `${k} — ${state.drones[k]?.tipo_modelo || ""}`);
  }

  document.getElementById("com-fecha-hora").value = datetimeES_to_iso(state.comunicacion.fecha_hora || "");
  document.getElementById("com-fecha-inicio").value = "";
  document.getElementById("com-fecha-fin").value = "";
  document.getElementById("com-periodicidad").value = "1";
  document.getElementById("com-notificacion").checked = state.comunicacion.notificacion_email !== false;

  updateSummary();
}

function toggleFieldsOrAlert(name, hasData) {
  const fields = document.getElementById(`${name}-fields`);
  const empty = document.getElementById(`${name}-empty`);
  if (!fields || !empty) return;
  fields.classList.toggle("hidden", !hasData);
  empty.classList.toggle("hidden", hasData);
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
    lbl.className = "cb-item";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = k;
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

function getOperationDates() {
  const inicio = document.getElementById("com-fecha-inicio").value;
  const fin = document.getElementById("com-fecha-fin").value;
  const step = parseInt(document.getElementById("com-periodicidad").value) || 1;

  if (!inicio) return [];
  if (!fin || fin <= inicio) return [inicio];

  const dates = [];
  const d = new Date(inicio + "T00:00:00");
  const end = new Date(fin + "T00:00:00");
  while (d <= end) {
    dates.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + step);
  }
  return dates;
}

function updateFechasPreview() {
  const dates = getOperationDates();
  const el = document.getElementById("fechas-preview");
  if (dates.length <= 1) {
    el.textContent = "";
  } else {
    const formatted = dates.map(d => iso_to_ddmmyyyy(d)).join(", ");
    el.textContent = `${dates.length} operaciones a comunicar: ${formatted}`;
  }
  updateSummary();
}

function updateSummary() {
  const p = getChecked("pilotos-list").length;
  const d = getChecked("drones-sel-list").length;
  const dates = getOperationDates();
  const numDates = Math.max(dates.length, 1);
  const total = p * d * numDates;
  const el = document.getElementById("combo-summary");
  if (numDates > 1) {
    el.textContent = `${p} piloto(s) × ${d} drone(s) × ${numDates} fecha(s) = ${total} PDF(s)`;
  } else {
    el.textContent = `${p} piloto(s) × ${d} drone(s) = ${total} PDF(s)`;
  }

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
    const items = document.querySelectorAll(`#${section}-list .acc-item`);
    for (const item of items) {
      const keyInput = item.querySelector('[data-role="key"]');
      const key = keyInput.value.trim() || keyInput.dataset.oldKey;
      const obj = {};
      item.querySelectorAll("[data-field]").forEach(f => {
        let val = f.value;
        if (f.dataset.type === "date") val = iso_to_ddmmyyyy(val);
        obj[f.dataset.field] = val;
      });
      cat[key] = obj;
    }
    state[section] = cat;
  }

  state.comunicacion.operacion = document.getElementById("com-operacion").value;
  state.comunicacion.operador = document.getElementById("com-operador").value;
  state.comunicacion.observador = document.getElementById("com-observador").value;
  state.comunicacion.fecha_hora = iso_to_datetimeES(document.getElementById("com-fecha-hora").value);
  state.comunicacion.notificacion_email = document.getElementById("com-notificacion").checked;
}

// =========================================================================
// UI: Add / Delete
// =========================================================================
function addItem(section, fieldDefs) {
  syncStateFromUI();
  const prefix = section === "personas" ? "persona" : section === "drones" ? "dron" : "operacion";
  const key = `${prefix}_${Date.now().toString(36)}`;
  const obj = {};
  for (const f of fieldDefs) obj[f.key] = "";
  state[section][key] = obj;
  renderAll();
  saveToLocal();

  const container = document.getElementById(`${section}-list`);
  const allItems = container.querySelectorAll(".acc-item");
  const last = allItems[allItems.length - 1];
  if (last) {
    container.querySelectorAll(".acc-content").forEach(c => c.classList.add("hidden"));
    container.querySelectorAll(".acc-header").forEach(h => h.classList.remove("open"));
    const content = last.querySelector(".acc-content");
    const header = last.querySelector(".acc-header");
    if (content) content.classList.remove("hidden");
    if (header) header.classList.add("open");
  }
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
  updateNavCounts();
  updateEmptyState();
  updateListEmptyStates();
}

function updateListEmptyStates() {
  for (const section of ["personas", "drones", "operaciones"]) {
    const empty = Object.keys(state[section]).length === 0;
    const el = document.getElementById(`${section}-list-empty`);
    if (el) el.classList.toggle("hidden", !empty);
  }
}

function updateEmptyState() {
  const hasData = Object.keys(state.personas).length > 0
    || Object.keys(state.drones).length > 0
    || Object.keys(state.operaciones).length > 0;
  const emptyEl = document.getElementById("empty-state");
  const comEl = document.getElementById("section-comunicacion");
  if (!emptyEl) return;
  if (hasData) {
    emptyEl.classList.add("hidden");
    if (!comEl.classList.contains("hidden")) comEl.classList.remove("hidden");
  } else {
    const anyVisible = document.querySelector(".app-section:not(.hidden)");
    if (anyVisible && anyVisible.id === "section-comunicacion") {
      comEl.classList.add("hidden");
      emptyEl.classList.remove("hidden");
    } else {
      emptyEl.classList.add("hidden");
    }
  }
}

function updateNavCounts() {
  const counts = {
    personas: Object.keys(state.personas).length,
    drones: Object.keys(state.drones).length,
    operaciones: Object.keys(state.operaciones).length,
  };
  for (const [key, count] of Object.entries(counts)) {
    for (const suffix of ["", "-m"]) {
      const el = document.getElementById(`count-${key}${suffix}`);
      if (el) el.textContent = count ? `(${count})` : "";
    }
  }
}

// =========================================================================
// Helpers
// =========================================================================
function showToast(msg) {
  const el = document.getElementById("toast");
  document.getElementById("toast-body").textContent = msg;
  el.classList.add("show");
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => el.classList.remove("show"), 2500);
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

function ddmmyyyy_to_iso(s) {
  if (!s) return "";
  const parts = s.split("/");
  if (parts.length !== 3) return s;
  return `${parts[2]}-${parts[1].padStart(2,"0")}-${parts[0].padStart(2,"0")}`;
}
function iso_to_ddmmyyyy(s) {
  if (!s) return "";
  const parts = s.split("-");
  if (parts.length !== 3) return s;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}
function datetimeES_to_iso(s) {
  if (!s) return "";
  const [datePart, timePart] = s.split(" ");
  if (!datePart || !timePart) return s;
  return `${ddmmyyyy_to_iso(datePart)}T${timePart}`;
}
function iso_to_datetimeES(s) {
  if (!s) return "";
  const [datePart, timePart] = s.split("T");
  if (!datePart || !timePart) return s;
  return `${iso_to_ddmmyyyy(datePart)} ${timePart}`;
}

// =========================================================================
// Init
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadFromLocal();

  state.comunicacion.operacion = "";
  state.comunicacion.operador = "";
  state.comunicacion.observador = "";
  const now = new Date();
  const p = n => String(n).padStart(2, "0");
  state.comunicacion.fecha_hora = `${p(now.getDate())}/${p(now.getMonth()+1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}`;

  renderAll();

  const gotoSection = sessionStorage.getItem("goto_section");
  if (gotoSection) {
    sessionStorage.removeItem("goto_section");
    showSection(gotoSection);
  }

  // Section navigation (all [data-nav] links)
  document.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showSection(link.dataset.nav);
    });
  });

  // Dropdown toggle
  document.getElementById("datos-toggle").addEventListener("click", e => {
    e.stopPropagation();
    document.getElementById("datos-menu").classList.toggle("hidden");
  });

  // Close dropdown on outside click
  document.addEventListener("click", e => {
    if (!e.target.closest("#datos-dropdown-wrapper")) {
      document.getElementById("datos-menu").classList.add("hidden");
    }
  });

  // Mobile menu toggle
  document.getElementById("mobile-toggle").addEventListener("click", () => {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  });

  // YAML file handler (shared between desktop and mobile)
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try { loadYamlText(ev.target.result); }
      catch (err) { showToast("Error al leer YAML: " + err.message); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  document.getElementById("fileInput").addEventListener("change", handleFileChange);
  document.querySelectorAll(".mobile-file-input").forEach(el => el.addEventListener("change", handleFileChange));

  // Empty state: file input
  document.querySelectorAll(".empty-file-input").forEach(el => el.addEventListener("change", handleFileChange));
  document.getElementById("btnDownloadExample").addEventListener("click", () => {
    downloadBlob(new TextEncoder().encode(EXAMPLE_YAML), "datos.yaml", "text/yaml");
    showToast("YAML de ejemplo descargado");
  });
  document.getElementById("btnLoadExampleEmpty").addEventListener("click", () => loadExampleData());

  // Export YAML
  document.getElementById("btnExportYaml").addEventListener("click", () => exportYaml());
  document.querySelectorAll(".mobile-export-btn").forEach(el => el.addEventListener("click", () => exportYaml()));

  // Clear data
  function clearAllData() {
    if (!confirm("¿Estás seguro de que quieres borrar todos los datos?\n\nRecuerda que puedes exportarlos a YAML antes de borrarlos.\n\nEsta acción no se puede deshacer.")) return;
    state.personas = {};
    state.drones = {};
    state.operaciones = {};
    state.comunicacion = { notificacion_email: true };
    localStorage.removeItem("comunicacion_state");
    renderAll();
    showSection("inicio");
    showToast("Datos borrados correctamente");
  }
  document.getElementById("btnClearData").addEventListener("click", e => { e.preventDefault(); clearAllData(); });
  document.querySelectorAll(".mobile-clear-btn").forEach(el => el.addEventListener("click", clearAllData));

  function loadExampleData() {
    const parsed = jsyaml.load(EXAMPLE_YAML);
    state.personas = parsed.personas || {};
    state.drones = parsed.drones || {};
    state.operaciones = parsed.operaciones || {};
    state.comunicacion = parsed.comunicacion || { notificacion_email: true };
    saveToLocal();
    sessionStorage.setItem("goto_section", "comunicacion");
    location.reload();
  }
  document.getElementById("btnLoadExample").addEventListener("click", e => { e.preventDefault(); loadExampleData(); });
  document.querySelectorAll(".mobile-load-example-btn").forEach(el => el.addEventListener("click", loadExampleData));

  // Generate with loading overlay
  const onGenerate = async () => {
    const overlay = document.getElementById("loading-overlay");
    overlay.style.display = "flex";
    try { await generate(); }
    catch (err) { showToast("Error: " + err.message); console.error(err); }
    finally { overlay.style.display = "none"; }
  };
  document.getElementById("btnGenerar").addEventListener("click", onGenerate);
  document.getElementById("btnGenerarMain").addEventListener("click", onGenerate);
  document.querySelectorAll(".mobile-generate-btn").forEach(el => el.addEventListener("click", onGenerate));

  // Add item buttons
  document.getElementById("btnAddPersona").addEventListener("click", () => addItem("personas", PERSONA_FIELDS));
  document.getElementById("btnAddDrone").addEventListener("click", () => addItem("drones", DRONE_FIELDS));
  document.getElementById("btnAddOperacion").addEventListener("click", () => addItem("operaciones", OPERACION_FIELDS));

  // Date range preview
  ["com-fecha-inicio", "com-fecha-fin", "com-periodicidad"].forEach(id => {
    document.getElementById(id).addEventListener("change", updateFechasPreview);
    document.getElementById(id).addEventListener("input", updateFechasPreview);
  });

  // Checkbox select all/none
  document.getElementById("pilotos-all").addEventListener("click", () => setAllChecked("pilotos-list", true));
  document.getElementById("pilotos-none").addEventListener("click", () => setAllChecked("pilotos-list", false));
  document.getElementById("drones-sel-all").addEventListener("click", () => setAllChecked("drones-sel-list", true));
  document.getElementById("drones-sel-none").addEventListener("click", () => setAllChecked("drones-sel-list", false));

  // Accordion toggle (delegated)
  document.addEventListener("click", e => {
    const header = e.target.closest("[data-acc-toggle]");
    if (!header) return;
    const content = header.nextElementSibling;
    const container = header.closest(".accordion-container");
    const isOpen = !content.classList.contains("hidden");

    container.querySelectorAll(".acc-content").forEach(c => c.classList.add("hidden"));
    container.querySelectorAll(".acc-header").forEach(h => h.classList.remove("open"));

    if (!isOpen) {
      content.classList.remove("hidden");
      header.classList.add("open");
    }
  });

  // Delegated delete handler
  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-action=delete]");
    if (!btn) return;
    if (confirm(`Eliminar "${btn.dataset.itemKey}"?`)) {
      deleteItem(btn.dataset.section, btn.dataset.itemKey);
    }
  });

  // Auto-save on field change (delegated)
  document.addEventListener("change", e => {
    if (e.target.closest(".acc-item") || e.target.closest("#section-comunicacion")) {
      syncStateFromUI();
      saveToLocal();
    }
  });

  // Toast close button
  document.getElementById("toast-close").addEventListener("click", () => {
    document.getElementById("toast").classList.remove("show");
  });
});
