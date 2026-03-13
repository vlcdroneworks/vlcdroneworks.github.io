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

// Nuevo flujo: un PDF por fecha = operador (2 págs) + N × actividad (4 págs cada una)
const PDF_TEMPLATE_OPERADOR_URL = "template/template-operador-form.pdf";
const PDF_TEMPLATE_ACTIVIDAD_URL = "template/template-actividad-form.pdf";
const OPERADOR_PAGES = 2;
const ACTIVIDAD_PAGES = 4;

/** Mapeo datos → campos AcroForm en template-operador-form.pdf (2 páginas). */
const OPERADOR_FIELD_MAP = {
  "comunicacion.fecha": ["fecha_comunicacion_operador", "fecha_comunicacion_representante"],
  "comunicacion.hora": ["hora_comunicacion_operador", "hora_comunicacion_representante"],
  "operador.nombre": ["nombre_operador", "nombre_representante"],
  "operador.documento_identidad": ["dni_operador", "dni_representante"],
  "operador.direccion": ["direccion_operador", "direccion_representante"],
  "operador.codigo_postal": ["cp_operador", "cp_representante"],
  "operador.municipio": ["municipio_operador", "municipio_representante"],
  "operador.provincia": ["provincia_operador", "provincia_representante"],
  "operador.telefono": ["telefono_operador", "telefono_representante"],
  "operador.email": ["email_operador", "email_representante"],
  "operador.numero_registro": "registro_operador",
  "pagina.1": "pagina_operador",
  "pagina.2": "pagina_representante",
};

/** Mapeo datos → campos AcroForm en template-actividad-form.pdf (4 páginas). */
const ACTIVIDAD_FIELD_MAP = {
  "datos_actividad": ["datos_actividad_operacion", "datos_actividad_piloto", "datos_actividad_uas", "datos_actividad_observador"],
  "comunicacion.fecha": ["fecha_comunicacion_operador", "fecha_comunicacion_piloto", "fecha_comunicacion_uas", "fecha_comunicacion_observador"],
  "comunicacion.hora": ["hora_comunicacion_operador", "hora_comunicacion_piloto", "hora_comunicacion_uas", "hora_comunicacion_observador"],
  "operacion.tipo": "tipo_operacion",
  "operacion.fecha_hora_inicio": "fecha_y_hora_inicio_operacion",
  "operacion.fecha_hora_fin": "fecha_y_hora_fin_operacion",
  "operacion.coordenadas_wgs84": "coordenadas",
  "operacion.area_proteccion": "area_proteccion",
  "operacion.zona_recuperacion": "area_recuperacion",
  "operacion.altura_prevista": "altura",
  "operacion.zona_poblacion": "zona_vuelo",
  "operacion.radio_metros": "radio",
  "piloto.nombre": "nombre_piloto",
  "piloto.documento_identidad": "dni_piloto",
  "piloto.direccion": "direccion_piloto",
  "piloto.codigo_postal": "cp_piloto",
  "piloto.municipio": "minicipio_piloto",
  "piloto.provincia": "provincia_piloto",
  "piloto.certificado_competencia": "certificado_competencia_piloto",
  "piloto.acreditacion_formacion": "acreditacion_formacion_autopractica_piloto",
  "piloto.poliza_seguros": "seguro_piloto",
  "uas.clase": "clase_uas",
  "uas.fabricante": "fabricante_uas",
  "uas.tipo_modelo": "tipo_y_modelo_uas",
  "uas.numero_serie": "ns_uas",
  "uas.matricula": "matricula_uas",
  "uas.mtom": "mtom_uas",
  "uas.autonomia": "autonomia_uas",
  "uas.autopiloto": "autopiloto_uas",
  "uas.frecuencias": "bandas_uas",
  "uas.color": "color_uas",
  "uas.luces": "luces_uas",
  "uas.carga_pago": "carta_pago_uas",
  "uas.equipo_vhf": "vhf_uas",
  "uas.respondedor_modo_s": "respondedor_uas",
  "uas.equipo_emergencia": "equipo_emergencia_uas",
  "uas.dispositivo_vision": "camara_uas",
  "observador.nombre": "nombre_observador",
  "observador.documento_identidad": "dni_observador",
  "observador.direccion": ["domicilio_observador", "direccion_observador"],
  "observador.codigo_postal": "cp_observador",
  "observador.municipio": "municipio_observador",
  "observador.provincia": "provincia_observador",
  "pagina.1": "pagina_operacion",
  "pagina.2": "pagina_piloto",
  "pagina.3": "pagina_uas",
  "pagina.4": "pagina_observador",
};

let pdfTemplateOperadorBytes = null;
let pdfTemplateActividadBytes = null;

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
  { key: "clase",              label: "Clase de UAS", group: "Identificación" },
  { key: "fabricante",         label: "Fabricante", group: "Identificación" },
  { key: "tipo_modelo",        label: "Tipo y modelo", group: "Identificación" },
  { key: "numero_serie",       label: "Número de serie", group: "Identificación" },
  { key: "matricula",          label: "Matrícula", group: "Identificación" },
  { key: "mtom",               label: "MTOM", group: "Prestaciones y características" },
  { key: "autonomia",          label: "Autonomía", group: "Prestaciones y características" },
  { key: "autopiloto",         label: "Autopiloto", group: "Prestaciones y características" },
  { key: "frecuencias",        label: "Frecuencias", group: "Prestaciones y características" },
  { key: "color",              label: "Color", group: "Prestaciones y características" },
  { key: "luces",              label: "Luces", group: "Prestaciones y características" },
  { key: "carga_pago",         label: "Carga de pago", group: "Prestaciones y características" },
  { key: "equipo_vhf",         label: "Equipo VHF", group: "Equipos" },
  { key: "respondedor_modo_s", label: "Respondedor Modo S", group: "Equipos" },
  { key: "equipo_emergencia",  label: "Equipo de emergencia", group: "Equipos" },
  { key: "dispositivo_vision", label: "Dispositivo de visión", group: "Equipos" },
];

const OPERACION_FIELDS = [
  { key: "nombre",              label: "Nombre (identificador visible)", group: "Datos generales" },
  { key: "tipo",                label: "Tipo de operación", group: "Datos generales" },
  { key: "lugar",               label: "Lugar (población, provincia, CCAA)", group: "Datos generales" },
  { key: "hora_inicio",         label: "Hora inicio", type: "time", group: "Horario" },
  { key: "hora_fin",            label: "Hora fin", type: "time", group: "Horario" },
  { key: "zona_poblacion",      label: "Zona de población", group: "Zona de vuelo" },
  { key: "coordenadas_wgs84",   label: "Coordenadas WGS-84 con anotación DMS (grados, minutos y segundos)", group: "Zona de vuelo" },
  { key: "radio_metros",        label: "Radio (metros)", group: "Zona de vuelo" },
  { key: "altura_prevista",     label: "Altura prevista", group: "Zona de vuelo" },
  { key: "area_proteccion",     label: "Área de protección", group: "Trayectoria y seguridad" },
  { key: "zona_recuperacion",   label: "Zona de recuperación", group: "Trayectoria y seguridad" },
  { key: "ruta",                label: "Ruta", group: "Trayectoria y seguridad" },
];

// =========================================================================
// Application state
// =========================================================================
const STORAGE_KEY = "comunicacion_uas_state";
/** Valor especial en combinaciones: un PDF por cada drone en la base de datos para ese piloto. */
const DRONE_TODOS = "__todos__";

function getDefaultComunicacion() {
  return {
    fecha_hora: "",
    operador: "",
    observador: "",
    operacion: "",
    notificacion_email: true,
    combinaciones: [],
  };
}

let state = {
  personas: {},
  drones: {},
  operaciones: {},
  comunicacion: {
    fecha_hora: "", operador: "", observador: "",
    operacion: "", notificacion_email: true,
    combinaciones: [], // [{ piloto: "key", drone: "key1", observador: "keyObs" }, ...]
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

  const hi = (opRaw.hora_inicio || "").trim();
  const hf = (opRaw.hora_fin || "").trim();
  result["operacion.fecha_hora_inicio"] = ((opts.fecha_operacion || "") + " " + hi).trim();
  result["operacion.fecha_hora_fin"] = ((opts.fecha_operacion || "") + " " + hf).trim();
  result["operacion.duracion"] = calcDuracion(hi, hf);

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

async function loadTemplateOperador() {
  if (pdfTemplateOperadorBytes) return pdfTemplateOperadorBytes;
  const resp = await fetch(PDF_TEMPLATE_OPERADOR_URL);
  if (!resp.ok) throw new Error("No se pudo cargar la plantilla operador (template-operador-form.pdf)");
  pdfTemplateOperadorBytes = await resp.arrayBuffer();
  return pdfTemplateOperadorBytes;
}

async function loadTemplateActividad() {
  if (pdfTemplateActividadBytes) return pdfTemplateActividadBytes;
  const resp = await fetch(PDF_TEMPLATE_ACTIVIDAD_URL);
  if (!resp.ok) throw new Error("No se pudo cargar la plantilla actividad (template-actividad-form.pdf)");
  pdfTemplateActividadBytes = await resp.arrayBuffer();
  return pdfTemplateActividadBytes;
}

/** Rellena un PDF con un mapeo campo-lógico → nombre AcroForm. data puede incluir pagina.1, pagina.2, datos_actividad, etc. */
async function fillPdfWithMap(templateBytes, fieldMap, data) {
  const pdfDoc = await PDFLib.PDFDocument.load(templateBytes);
  const form = pdfDoc.getForm();
  let fontBold = null;
  if (data.datos_actividad != null && data.datos_actividad !== "") {
    try {
      const boldFontRef = (typeof PDFLib.StandardFonts !== "undefined" && PDFLib.StandardFonts.HelveticaBold) || "Helvetica-Bold";
      fontBold = await pdfDoc.embedStandardFont(boldFontRef);
    } catch { /* fallback: los campos se rellenan sin negrita */ }
  }
  for (const [dataKey, fieldNames] of Object.entries(fieldMap)) {
    const val = data[dataKey];
    if (val === undefined || val === null) continue;
    if (typeof val === "boolean") continue;
    const strVal = String(val);
    if (strVal === "" && !dataKey.startsWith("pagina.")) continue;
    const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
    for (const fieldName of names) {
      try {
        const field = form.getTextField(fieldName);
        field.setText(strVal);
        if (dataKey.startsWith("pagina.")) {
          try { field.setFontSize(9); } catch { /* el campo puede no tener /DA */ }
        }
        if (dataKey === "datos_actividad" && fontBold) {
          try { field.updateAppearances(fontBold); } catch { /* fallback sin negrita */ }
        }
      } catch {
        try {
          const dd = form.getDropdown(fieldName);
          dd.select(strVal);
        } catch { /* skip */ }
      }
    }
  }
  try { form.updateFieldAppearances(); } catch { /* opcional */ }
  return await pdfDoc.save({ updateFieldAppearances: !fontBold });
}

/** Rellena la plantilla operador (2 páginas). totalPages = 2 + 4 * numFilas. */
async function fillOperadorPdf(data, totalPages) {
  const d = { ...data };
  d["pagina.1"] = `1/${totalPages}`;
  d["pagina.2"] = `2/${totalPages}`;
  const templateBytes = await loadTemplateOperador();
  return await fillPdfWithMap(templateBytes, OPERADOR_FIELD_MAP, d);
}

/** Rellena la plantilla actividad (4 páginas) para una fila. pageBase = 2 + 4*indexFila; rowIndex = número de fila (1-based) para "Datos Actividad X". */
async function fillActividadPdf(data, pageBase, totalPages, rowIndex) {
  const d = { ...data };
  d["datos_actividad"] = `Datos de la actividad ${rowIndex}`;
  d["pagina.1"] = `${pageBase + 1}/${totalPages}`;
  d["pagina.2"] = `${pageBase + 2}/${totalPages}`;
  d["pagina.3"] = `${pageBase + 3}/${totalPages}`;
  d["pagina.4"] = `${pageBase + 4}/${totalPages}`;
  const templateBytes = await loadTemplateActividad();
  return await fillPdfWithMap(templateBytes, ACTIVIDAD_FIELD_MAP, d);
}

/** Utilidad: listar nombres de campos de un PDF (ej. en consola: listPdfFields("template/template-operador-form.pdf")). */
async function listPdfFields(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("No se pudo cargar " + url);
  const bytes = await resp.arrayBuffer();
  const doc = await PDFLib.PDFDocument.load(bytes);
  const form = doc.getForm();
  const fields = form.getFields();
  const names = fields.map(f => f.getName());
  console.log(url + " →", names);
  return names;
}

/** Concatena PDF operador (2 págs) + varios PDFs actividad (4 págs cada uno). Devuelve bytes del PDF unido. */
async function mergeOperadorConActividades(operadorBytes, actividadBytesArray) {
  const merged = await PDFLib.PDFDocument.create();
  const opDoc = await PDFLib.PDFDocument.load(operadorBytes);
  const opPages = await merged.copyPages(opDoc, [0, 1]);
  opPages.forEach(p => merged.addPage(p));
  for (const actBytes of actividadBytesArray) {
    const actDoc = await PDFLib.PDFDocument.load(actBytes);
    const actPages = await merged.copyPages(actDoc, [0, 1, 2, 3]);
    actPages.forEach(p => merged.addPage(p));
  }
  return await merged.save();
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
// Unified generation: un PDF por fecha = operador (2 págs) + N × actividad (4 págs)
// =========================================================================
function buildRows() {
  const pairs = getPilotDronePairsFromCombinaciones();
  if (pairs && pairs.length > 0) return pairs;
  const pilotos = getChecked("pilotos-list");
  const drones = getChecked("drones-sel-list");
  const observador = document.getElementById("com-observador").value;
  const rows = [];
  for (const piloto of pilotos) {
    for (const drone of drones) {
      rows.push({ piloto, drone, observador: observador || "" });
    }
  }
  return rows;
}

async function generate() {
  syncStateFromUI();
  const now = new Date();
  const p = n => String(n).padStart(2, "0");
  state.comunicacion.fecha_hora = `${p(now.getDate())}/${p(now.getMonth()+1)}/${now.getFullYear()} ${p(now.getHours())}:${p(now.getMinutes())}`;

  const operador = document.getElementById("com-operador").value;
  const operacion = document.getElementById("com-operacion").value;
  const observador = document.getElementById("com-observador").value;
  const rows = buildRows();

  if (!operacion) { showToast("Selecciona una operación"); return; }
  if (!operador) { showToast("Selecciona un operador"); return; }
  if (!rows.length) {
    showToast("Añade al menos una fila con piloto y dron, o marca pilotos y drones");
    return;
  }

  const opDates = getOperationDates();
  if (opDates.length === 0) {
    showToast("Indica la fecha de operación");
    return;
  }

  const fechasList = opDates.map(isoDate => iso_to_ddmmyyyy(isoDate));
  const totalPages = OPERADOR_PAGES + ACTIVIDAD_PAGES * rows.length;

  function fechaToClean(f) {
    const parts = f.split("/");
    return parts.length === 3 ? `${parts[2]}${parts[1]}${parts[0]}` : f.replace(/\//g, "");
  }

  const fileName = (fecha) => `comunicacion_${operacion}_${fechaToClean(fecha)}.pdf`;

  if (fechasList.length === 1) {
    const fecha = fechasList[0];
    const operadorData = resolveData({ operador, operacion, fecha_operacion: fecha });
    const operadorBytes = await fillOperadorPdf(operadorData, totalPages);
    const actividadBytesList = [];
    for (let i = 0; i < rows.length; i++) {
      const { piloto, drone, observador: obs } = rows[i];
      const actData = resolveData({ operador, piloto, observador: obs !== undefined ? obs : observador, uas: drone, operacion, fecha_operacion: fecha });
      const actBytes = await fillActividadPdf(actData, OPERADOR_PAGES + ACTIVIDAD_PAGES * i, totalPages, i + 1);
      actividadBytesList.push(actBytes);
    }
    const mergedBytes = await mergeOperadorConActividades(operadorBytes, actividadBytesList);
    downloadBlob(mergedBytes, fileName(fecha), "application/pdf");
    saveToLocal();
    showToast("PDF generado correctamente");
    return;
  }

  const zip = new JSZip();
  for (const fecha of fechasList) {
    const operadorData = resolveData({ operador, operacion, fecha_operacion: fecha });
    const operadorBytes = await fillOperadorPdf(operadorData, totalPages);
    const actividadBytesList = [];
    for (let i = 0; i < rows.length; i++) {
      const { piloto, drone, observador: obs } = rows[i];
      const actData = resolveData({ operador, piloto, observador: obs !== undefined ? obs : observador, uas: drone, operacion, fecha_operacion: fecha });
      const actBytes = await fillActividadPdf(actData, OPERADOR_PAGES + ACTIVIDAD_PAGES * i, totalPages, i + 1);
      actividadBytesList.push(actBytes);
    }
    const mergedBytes = await mergeOperadorConActividades(operadorBytes, actividadBytesList);
    zip.file(fileName(fecha), mergedBytes);
  }
  const firstClean = fechaToClean(fechasList[0]);
  const zipSuffix = fechasList.length > 1 ? `${firstClean}-${fechaToClean(fechasList[fechasList.length - 1])}` : firstClean;
  const zipBlob = await zip.generateAsync({ type: "blob" });
  downloadBlob(zipBlob, `comunicaciones_${operacion}_${zipSuffix}.zip`, "application/zip");
  saveToLocal();
  showToast(`${fechasList.length} PDF(s) generados en ZIP`);
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
  Object.keys(state.operaciones).forEach(k => {
    const o = state.operaciones[k];
    if (o) {
      delete o.fecha;
      delete o.duracion;
      if (o.nombre == null || String(o.nombre).trim() === "") o.nombre = k;
    }
  });

  state.comunicacion = getDefaultComunicacion();

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
        const { fecha, duracion, ...rest } = v || {};
        return [k, rest];
      })
    );
    const obj = {
      personas: state.personas,
      drones: state.drones,
      operaciones: operacionesSinFecha,
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
    nombre: "Filmación Albufera"
    tipo: "Filmación aérea"
    lugar: "Albufera, Valencia, Comunidad Valenciana"
    hora_inicio: "09:00"
    hora_fin: "13:00"
    zona_poblacion: "Fuera de aglomeración urbana"
    coordenadas_wgs84: "39.3333, -0.3667"
    radio_metros: "500"
    ruta: "Circular sobre la zona de filmación"
    area_proteccion: "Zona delimitada con señalización"
    zona_recuperacion: "Punto de despegue"
    altura_prevista: "120 m AGL"

  operacion_ejemplo2:
    nombre: "Inspección Puerto Valencia"
    tipo: "Inspección técnica"
    lugar: "Puerto de Valencia, Valencia, Comunidad Valenciana"
    hora_inicio: "07:30"
    hora_fin: "10:00"
    zona_poblacion: "Aglomeración urbana"
    coordenadas_wgs84: "39.4500, -0.3167"
    radio_metros: "200"
    ruta: "Lineal a lo largo de la infraestructura"
    area_proteccion: "Perímetro de seguridad 50 m"
    zona_recuperacion: "Zona de aparcamiento habilitada"
    altura_prevista: "50 m AGL"
`;

// =========================================================================
// localStorage
// =========================================================================
function saveToLocal() {
  try {
    const toSave = {
      ...state,
      comunicacion: getDefaultComunicacion(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {}
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
    Object.keys(state.operaciones).forEach(k => {
      const o = state.operaciones[k];
      if (o) {
        delete o.fecha;
        delete o.duracion;
        if (o.nombre == null || String(o.nombre).trim() === "") o.nombre = k;
      }
    });
    state.comunicacion = getDefaultComunicacion();
  } catch {}
}

/** Normaliza combinaciones al formato { piloto, drone, observador }. Migra formato antiguo con drones[]. */
function normalizeCombinaciones(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const e of arr) {
    if (e.drones && Array.isArray(e.drones)) {
      for (const d of e.drones) {
        out.push({ piloto: e.piloto || "", drone: d, observador: e.observador || "" });
      }
    } else {
      out.push({
        piloto: e.piloto || "",
        drone: e.drone || "",
        observador: e.observador || "",
      });
    }
  }
  return out;
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
      : section === "operaciones" ? (data.nombre || data.lugar || "")
      : `${data.lugar || ""}`;
    const displayTitle = subtitle || "(Sin nombre)";

    const item = document.createElement("div");
    item.className = "acc-item";
    const useGroups = fieldDefs.some(f => f.group);
    const groups = useGroups ? getFieldsByGroup() : [];
    const renderField = (f) => {
      const inputType = f.type || "text";
      const usePicker = inputType === "time" || inputType === "date" || inputType === "datetime-local";
      const typeAttr = usePicker ? "text" : inputType;
      const pickerClass = inputType === "time" ? " vdw-time" : inputType === "date" ? " vdw-date" : inputType === "datetime-local" ? " vdw-datetime" : "";
      let val = data[f.key] || "";
      if (f.type === "date") val = ddmmyyyy_to_iso(val);
      return `
              <div>
                <label class="block text-xs text-white/50 mb-1">${esc(f.label)}</label>
                <input type="${typeAttr}" class="field-input text-sm${pickerClass}" value="${escAttr(val)}"
                       data-section="${section}" data-item-key="${escAttr(key)}" data-field="${f.key}" data-type="${inputType || "text"}"${usePicker ? " readonly" : ""}>
              </div>`;
    };
    const fieldsHtml = useGroups
      ? groups.map(({ name, fields }) => {
          const isOperacionesDatosGenerales = section === "operaciones" && name === "Datos generales";
          if (isOperacionesDatosGenerales && fields.length > 0) {
            const [first, ...rest] = fields;
            return `
        <div>
          <h6 class="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">${esc(name)}</h6>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${renderField(first)}
          </div>
          ${rest.length > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            ${rest.map(renderField).join("")}
          </div>` : ""}
        </div>`;
          }
          return `
        <div>
          <h6 class="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">${esc(name)}</h6>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${fields.map(renderField).join("")}
          </div>
        </div>`;
        }).join("")
      : fieldDefs.map(f => {
          const inputType = f.type || "text";
          const usePicker = inputType === "time" || inputType === "date" || inputType === "datetime-local";
          const typeAttr = usePicker ? "text" : inputType;
          const pickerClass = inputType === "time" ? " vdw-time" : inputType === "date" ? " vdw-date" : inputType === "datetime-local" ? " vdw-datetime" : "";
          let val = data[f.key] || "";
          if (f.type === "date") val = ddmmyyyy_to_iso(val);
          return `
            <div>
              <label class="block text-xs text-white/50 mb-1">${esc(f.label)}</label>
              <input type="${typeAttr}" class="field-input text-sm${pickerClass}" value="${escAttr(val)}"
                     data-section="${section}" data-item-key="${escAttr(key)}" data-field="${f.key}" data-type="${inputType || "text"}"${usePicker ? " readonly" : ""}>
            </div>`;
        }).join("");

    item.innerHTML = `
      <div class="acc-header" data-acc-toggle>
        <div class="flex items-center gap-2 min-w-0">
          <strong class="text-white truncate">${esc(displayTitle)}</strong>
        </div>
        <svg class="acc-chevron w-5 h-5 text-white/40 shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      <div class="acc-content hidden">
        <div class="key-field hidden">
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
      k => state.operaciones[k]?.nombre || state.operaciones[k]?.lugar || state.operaciones[k]?.tipo || k, true);
  }
  if (hasP) {
    fillSelect("com-operador", pKeys, state.comunicacion.operador,
      k => state.personas[k]?.nombre || k, true);
    fillSelect("com-observador", pKeys, state.comunicacion.observador,
      k => state.personas[k]?.nombre || k, true);
    renderCheckboxList("pilotos-list", pKeys, k => state.personas[k]?.nombre || k);
  }
  if (hasD) {
    renderCheckboxList("drones-sel-list", dKeys, k => state.drones[k]?.tipo_modelo || state.drones[k]?.fabricante || k);
  }

  if (!state.comunicacion.combinaciones) state.comunicacion.combinaciones = [];
  renderCombinacionesList();

  document.getElementById("com-fecha-hora").value = datetimeES_to_iso(state.comunicacion.fecha_hora || "");
  const feInicioEl = document.getElementById("com-fecha-inicio");
  const feFinEl = document.getElementById("com-fecha-fin");
  const valInicio = state.comunicacion.fecha_inicio != null ? state.comunicacion.fecha_inicio : "";
  const valFin = state.comunicacion.fecha_fin != null ? state.comunicacion.fecha_fin : "";
  feInicioEl.value = valInicio;
  feFinEl.value = valFin;
  if (feInicioEl._flatpickr) feInicioEl._flatpickr.setDate(valInicio || null, false);
  if (feFinEl._flatpickr) feFinEl._flatpickr.setDate(valFin || null, false);
  document.getElementById("com-periodicidad").value = state.comunicacion.periodicidad || "1";
  document.getElementById("com-notificacion").checked = state.comunicacion.notificacion_email !== false;

  updateFechasPreview();
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
    opt.textContent = "<ninguno>";
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

function renderCombinacionesList() {
  const list = document.getElementById("combinaciones-list");
  if (!list) return;
  const pKeys = Object.keys(state.personas);
  const dKeys = Object.keys(state.drones);
  const combos = state.comunicacion.combinaciones || [];
  list.innerHTML = "";
  combos.forEach((entry, idx) => {
    const row = document.createElement("div");
    row.className = "combinacion-row flex flex-wrap items-center gap-2 mb-3 p-3 rounded-lg bg-white/5 border border-white/10";
    row.setAttribute("data-combinacion-row", "");
    const onChange = () => { syncCombinacionesFromUI(); saveToLocal(); updateSummary(); };

    const pilotoSel = document.createElement("select");
    pilotoSel.className = "field-select field-input text-sm flex-1 min-w-0";
    pilotoSel.setAttribute("data-combo-piloto", "");
    pilotoSel.title = "Piloto";
    const pOpt0 = document.createElement("option");
    pOpt0.value = "";
    pOpt0.textContent = "<ninguno>";
    pilotoSel.appendChild(pOpt0);
    pKeys.forEach(k => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = state.personas[k]?.nombre || k;
      if (k === (entry.piloto || "")) opt.selected = true;
      pilotoSel.appendChild(opt);
    });
    pilotoSel.addEventListener("change", onChange);

    const droneSel = document.createElement("select");
    droneSel.className = "field-select field-input text-sm flex-1 min-w-0";
    droneSel.setAttribute("data-combo-drone", "");
    droneSel.title = "Dron";
    const dOpt0 = document.createElement("option");
    dOpt0.value = "";
    dOpt0.textContent = "<ninguno>";
    droneSel.appendChild(dOpt0);
    const dOptTodos = document.createElement("option");
    dOptTodos.value = DRONE_TODOS;
    dOptTodos.textContent = "Todos";
    if ((entry.drone || "") === DRONE_TODOS) dOptTodos.selected = true;
    droneSel.appendChild(dOptTodos);
    dKeys.forEach(dk => {
      const opt = document.createElement("option");
      opt.value = dk;
      const d = state.drones[dk];
      opt.textContent = d?.tipo_modelo || d?.fabricante || dk;
      if (dk === (entry.drone || "")) opt.selected = true;
      droneSel.appendChild(opt);
    });
    droneSel.addEventListener("change", onChange);

    const observadorSel = document.createElement("select");
    observadorSel.className = "field-select field-input text-sm flex-1 min-w-0";
    observadorSel.setAttribute("data-combo-observador", "");
    observadorSel.title = "Observador";
    const oOpt0 = document.createElement("option");
    oOpt0.value = "";
    oOpt0.textContent = "<ninguno>";
    observadorSel.appendChild(oOpt0);
    pKeys.forEach(k => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = state.personas[k]?.nombre || k;
      if (k === (entry.observador || "")) opt.selected = true;
      observadorSel.appendChild(opt);
    });
    observadorSel.addEventListener("change", onChange);

    const btnRemove = document.createElement("button");
    btnRemove.type = "button";
    btnRemove.className = "text-red-400 hover:text-red-300 text-sm shrink-0";
    btnRemove.textContent = "Quitar";
    btnRemove.setAttribute("data-combo-remove", "");
    btnRemove.dataset.index = String(idx);
    btnRemove.addEventListener("click", () => {
      syncStateFromUI();
      state.comunicacion.combinaciones.splice(idx, 1);
      saveToLocal();
      renderComunicacion();
      updateSummary();
    });

    row.appendChild(pilotoSel);
    row.appendChild(droneSel);
    row.appendChild(observadorSel);
    row.appendChild(btnRemove);
    list.appendChild(row);
  });
}

function syncCombinacionesFromUI() {
  const list = document.getElementById("combinaciones-list");
  if (!list) return;
  const rows = list.querySelectorAll("[data-combinacion-row]");
  state.comunicacion.combinaciones = [];
  rows.forEach(row => {
    const pilotoSel = row.querySelector("select[data-combo-piloto]");
    const droneSel = row.querySelector("select[data-combo-drone]");
    const observadorSel = row.querySelector("select[data-combo-observador]");
    state.comunicacion.combinaciones.push({
      piloto: pilotoSel ? pilotoSel.value : "",
      drone: droneSel ? droneSel.value : "",
      observador: observadorSel ? observadorSel.value : "",
    });
  });
}

/** Devuelve las filas (piloto, drone, observador) desde el formulario de combinaciones, o null si no se usa (fallback a cartesiano). */
function getPilotDronePairsFromCombinaciones() {
  const list = document.getElementById("combinaciones-list");
  if (!list) return null;
  const rows = list.querySelectorAll("[data-combinacion-row]");
  const pairs = [];
  const dKeysAll = Object.keys(state.drones);
  for (const row of rows) {
    const pilotoSel = row.querySelector("select[data-combo-piloto]");
    const droneSel = row.querySelector("select[data-combo-drone]");
    const observadorSel = row.querySelector("select[data-combo-observador]");
    const piloto = pilotoSel ? pilotoSel.value : "";
    const drone = droneSel ? droneSel.value : "";
    const observador = observadorSel ? observadorSel.value : "";
    if (!piloto) continue;
    if (!drone) continue;
    if (drone === DRONE_TODOS) {
      for (const dk of dKeysAll) {
        pairs.push({ piloto, drone: dk, observador });
      }
    } else {
      pairs.push({ piloto, drone, observador });
    }
  }
  return pairs.length > 0 ? pairs : null;
}

function setAllChecked(id, val) {
  document.querySelectorAll(`#${id} input[type=checkbox]`).forEach(cb => {
    cb.checked = val;
    cb.closest("label").classList.toggle("checked", val);
  });
  updateSummary();
}

/** Fecha a YYYY-MM-DD en hora local (evita el desfase de un día por UTC con toISOString). */
function toLocalDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
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
    dates.push(toLocalDateString(d));
    d.setDate(d.getDate() + step);
  }
  return dates;
}

const ANTELACION_MINIMA_DIAS = 5;

function checkAntelacionMinima() {
  const inicio = document.getElementById("com-fecha-inicio")?.value;
  const avisoEl = document.getElementById("fechas-antelacion-aviso");
  if (!avisoEl) return;
  if (!inicio) {
    avisoEl.classList.add("hidden");
    avisoEl.textContent = "";
    return;
  }
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fechaOp = new Date(inicio + "T00:00:00");
  const diffMs = fechaOp - hoy;
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (diffDays < ANTELACION_MINIMA_DIAS) {
    avisoEl.textContent = `La normativa exige comunicar el vuelo con al menos ${ANTELACION_MINIMA_DIAS} días de antelación. Esta aplicación generará el PDF igualmente pero la fecha de operación seleccionada podría no cumplir este requisito.`;
    avisoEl.classList.remove("hidden");
  } else {
    avisoEl.classList.add("hidden");
    avisoEl.textContent = "";
  }
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
  checkAntelacionMinima();
  updateSummary();
}

function updateSummary() {
  const dates = getOperationDates();
  const numDates = Math.max(dates.length, 1);
  const rows = buildRows();
  const numRows = rows.length;
  const pagesPerPdf = OPERADOR_PAGES + ACTIVIDAD_PAGES * numRows;
  const totalPdfs = numDates;
  let label;
  if (numRows === 0) {
    label = "Añade filas (piloto + dron) o marca pilotos y drones";
  } else {
    label = numDates > 1
      ? `${numDates} fecha(s) → ${totalPdfs} PDF(s) (${pagesPerPdf} págs cada uno)`
      : `1 PDF (${pagesPerPdf} págs: 2 operador + ${numRows} × 4 actividad)`;
  }
  const el = document.getElementById("combo-summary");
  el.textContent = label;

  const btn = document.getElementById("btnGenerarMain");
  const btnHeader = document.getElementById("btnGenerar");
  if (totalPdfs <= 1) {
    btn.textContent = "Generar PDF";
    btnHeader.textContent = "Generar PDF";
  } else {
    btn.textContent = `Generar ZIP (${totalPdfs} PDFs)`;
    btnHeader.textContent = `Generar ZIP (${totalPdfs})`;
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
      const key = keyInput ? (keyInput.value.trim() || keyInput.dataset.oldKey) : "";
      if (!key) continue;
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
  const feInicio = document.getElementById("com-fecha-inicio");
  const feFin = document.getElementById("com-fecha-fin");
  const fePeriod = document.getElementById("com-periodicidad");
  state.comunicacion.fecha_inicio = feInicio ? feInicio.value : "";
  state.comunicacion.fecha_fin = feFin ? feFin.value : "";
  state.comunicacion.periodicidad = fePeriod ? fePeriod.value : "1";
  state.comunicacion.notificacion_email = document.getElementById("com-notificacion").checked;
  syncCombinacionesFromUI();
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
  initDatePickers();
}

function initDatePickers() {
  if (typeof flatpickr === "undefined") return;
  document.querySelectorAll(".vdw-date, .vdw-time, .vdw-datetime").forEach(el => {
    if (el._flatpickr) {
      el._flatpickr.destroy();
      el._flatpickr = null;
    }
  });
  flatpickr(".vdw-date", {
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d-m-Y",
    allowInput: false
  });
  flatpickr(".vdw-time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true,
    allowInput: false
  });
  flatpickr(".vdw-datetime", {
    enableTime: true,
    dateFormat: "Y-m-d\\TH:i",
    time_24hr: true,
    allowInput: false
  });
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

function calcDuracion(horaInicio, horaFin) {
  if (!horaInicio || !horaFin) return "";
  const parse = (h) => {
    const m = (h || "").match(/^(\d{1,2}):(\d{2})$/);
    return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : null;
  };
  const start = parse(horaInicio);
  const end = parse(horaFin);
  if (start == null || end == null || end <= start) return "";
  const mins = end - start;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h} hora${h !== 1 ? "s" : ""} ${m} minuto${m !== 1 ? "s" : ""}`;
  if (h) return `${h} hora${h !== 1 ? "s" : ""}`;
  return `${m} minuto${m !== 1 ? "s" : ""}`;
}

// =========================================================================
// Init
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof window !== "undefined") window.listPdfFields = listPdfFields;
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
    state.comunicacion = getDefaultComunicacion();
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
    Object.keys(state.operaciones).forEach(k => {
      const o = state.operaciones[k];
      if (o && (o.nombre == null || String(o.nombre).trim() === "")) o.nombre = k;
    });
    state.comunicacion = getDefaultComunicacion();
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

  document.getElementById("combinaciones-add").addEventListener("click", () => {
    syncStateFromUI();
    if (!state.comunicacion.combinaciones) state.comunicacion.combinaciones = [];
    state.comunicacion.combinaciones.push({ piloto: "", drone: "", observador: "" });
    saveToLocal();
    renderComunicacion();
    updateSummary();
  });

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
