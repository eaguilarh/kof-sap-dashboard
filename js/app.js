// Dark Mode Toggle
window.toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('dark-mode-toggle');
    if (document.body.classList.contains('dark-mode')) {
        btn.innerHTML = '<i class="fa-solid fa-sun" style="font-size: 16px;"></i>';
        btn.style.backgroundColor = '#f1f5f9';
        btn.style.color = '#0f172a';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-moon" style="font-size: 16px;"></i>';
        btn.style.backgroundColor = '#1e293b';
        btn.style.color = 'white';
    }
};

// Helper to format Spanish dates dynamically (Miércoles a Martes)
const getDynamicPeriod = () => {
    return 'Periodo: 11 al 17 mar 2026';
};

const dynamicPeriodText = getDynamicPeriod();

const dashboardData = [
    {
        id: "1", system: "Archiving",
        owner: "Juan Miguel Boza / Jordan Cocoletzi", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - SAP ECC\'S - Carga de Datos en tabla ZARIX (propuesta de mantener un mes en linea).'S - Carga de Datos en tabla ZARIX (propuesta de mantener un mes en línea).",
        prevWeek: "3/3 - SAP ECC\'S - Carga de Datos en tabla ZARIX (propuesta de mantener un mes en linea).'S - Carga de Datos en tabla ZARIX (propuesta de mantener un mes en línea).",
        actionItem: "Monitorear el volumen de tabla ZARIX.", actionOwner: "Jordan Cocoletzi", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: "" // User-added comment
    },
    {
        id: "2", system: "Seguimiento de HANA Comercial BCP",
        owner: "Carlos Castillo / Daniel Ponce", status: "Con Incidentes", sla: "Minor",
        currentWeek: "10/3 - Lunes 09 de marzo. Se presentó la caída del ambiente Java BCP. Se tiene un mensaje a SAP 109190/2026 activo para conocer la causa raíz.",
        prevWeek: "3/3 - Sin incidentes en el ambiente productivo y ambientes no productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción. | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "3", system: "Seguimiento de HANA Financiero BCP",
        owner: "Carlos Castillo / Talía Rosas", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes en el ambiente productivo y ambientes no productivos.",
        prevWeek: "3/3 - Sin incidentes en el ambiente productivo y ambientes no productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción. | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "4", system: "Plan de Mantenimiento",
        owner: "TQS's", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - RFC relevantes por realizar ON PREMISE: Aud updt de SO y cierre de vulnerabilidades encl hcvspn20 VSP 805, SBX-RVR, Vcopy RAP | Update de SO y cierre de vulnerabilidades server RVP | AUD Update de SO y cierre de vulnerabilidades en Nodo Adoptivo RAP haerppn3 ERPNX PRD / Enclosure 51-52 (Apps RVP, RAT y RAZ) / nodo adoptivo de CRM-MEX y BCP-BC4 | Instalación de parches de seguridad Windows en DS PRD | RAP Reorganización Semanal de objetos de BD en horarios discontinuos | Actualización support packages SPAM - ST-PI - ST-API - SAP CAS UCD y UCP. NUBE AZURE: Monthly Patching to fix vulnerability and remove ERM client package on Prod - CPR Servers / Pre-Prod S/4 Servers / Prod - MDG Servers / Prod - IAC Servers | Instalación de parches de seguridad Windows en MII Mexico, Colombia, Centroamerica, Brasil y JDV | Ajuste de parámetros para remediación de vulnerabilidad HTTP Security Header is not detected en MII Colombia, Centroamérica, Brasil y JDV | Instalación Add On GRC Access Control 12 TAR / T4P. RFC relevantes realizados en la semana anterior ON PREMISE: RAP Reorganización Semanal de objetos de BD en horarios discontinuos. NUBE AZURE: Monthly OS patching to fix vulnerability and remove ERM client package on Pre-Prod GRC y SLT Servers | Pre-Prod - CPR | SCM-SMR & EWM-EMR Servers | DR - S/4 Servers | QA- S/4.",
        prevWeek: "3/3 - RFC relevantes por realizar. ON PREMISE: RAP Reorganización Semanal de objetos de BD en horarios discontinuos. NUBE AZURE: Monthly OS patching to fix vulnerability and remove ERM client package on Pre-Prod GRC y SLT Servers | Pre-Prod - CPR | SCM-SMR & EWM-EMR Servers | DR - S/4 Servers | QA- S/4. RFC relevantes realizados en la semana anterior. ON PREMISE: Actualización support packages SPAM - ST-PI - ST-A/PI - SAP BW Comercial y Financiero | Updt de SO y cierre de vulnerabilidades BCD y BCD, Enclosure 11 | Update SLES + CSUR + Drivers EPM QA TRIARA QUERETARO . NUBE AZURE: Monthly OS patching to fix vulnerability and remove ERM client package on MDG (QAS, DR), Zscaler (DR), CyberArk (Windows y Linux), GRC (QAS), CPI (QAS), SCM & EWM (QAS), BRIM (DR), SLT (SR), SLD (PRD), ADS (PRD) | Closure of Vulnerability (Medium) (QID 338371) : Updating Oracle Java to the latest version ibz411 on SolMan | Actualizar de SAP Host Agent a SP09 en MII MSC.",
        actionItem: "Actualizar SAP Host Agent a SP09 en MII MSC.", actionOwner: "TQS", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "5", system: "RCA's Pendientes",
        owner: "Luis Muñoz / TQS's", status: "En Proceso", sla: "Critical",
        currentWeek: "10/3 - 01. Incidente IN0129998 Incidente en PI Productivo 22feb26. En espera de comentarios por parte del Coordinador. 02.RCA PRB0130244 Failover SAP SAP Hana 05mar26. En documentación. 03.RCA problema de acceso Portal BW 09mar26. En documentación.",
        prevWeek: "3/3 - 01. RCA PRB0129150 Reinicio de DS PRD PKS por saturación de unidad T / en servidor de BD 26feb26. Se libera la versión final. 02. RCA Informativo - Incidente en PI Productivo 22feb26. En proceso de elaboración.",
        actionItem: "En espera de comentarios del Coordinador y elaboración de RCA PI.", actionOwner: "TQS's", commitDate: "2026-03-05",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: P1 - Crítica",
        customComment: ""
    },
    {
        id: "6", system: "Servicios y Pendientes de SAP Max Attention",
        owner: "SAP Max Attention", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Servicios: Servicio de salvaguarda migración SO Aplicativo RAP - Servicio cancelado - Viridiana Cortizo. Servicio de QA para la estrategia de migraciones Tech Refresh - Requerimiento en revisión por parte de SAP - Viridiana Cortizo. Revisión Plan de servicios SAP MaxAttention 2026 KOF IT - Miércoles 11 Marzo - Eduardo Perez. En proceso: Juntas de seguimiento a recomendaciones servicios MaxAttention - SAP MaxAttention & TQS, última reunión 6 de Marzo, próxima reunión 20 de Marzo.",
        prevWeek: "3/3 - Servicios: Servicio de salvaguarda migración SO aplicativo BAP - Servicio en preparación. Junta Domingo 08 de Marzo 10:00. - Viridiana Cortizo. Servicio de Migración SO Oracle ECC Dry Run Fase 2 - Se llevó a cabo el cierre del servicio el viernes 27 de Febrero - Se envió Reporte Final - Viridiana Cortizo. HyperCare SAP bundle patch ECC - Se entregó servicio de HyperCare para la instalación 21 y 22 de Febrero - Se envió reporte final - Talía Rosas. En proceso juntas de seguimiento a recomendaciones servicios MaxAttention - SAP MaxAttention & TQS, última reunión 21 de Febrero, próxima reunión 6 de Marzo. VM solicita un servicio de QA para la estrategia de migraciones (Todas las fases).",
        actionItem: "Juntas de seguimiento en proceso.", actionOwner: "SAP Max Attention", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "7", system: "Problemas de Respaldos",
        owner: "Luis Muñoz / Teresa López", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes en respaldos productivos.",
        prevWeek: "3/3 - Sin incidentes en respaldos productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "8", system: "Mapear Aplicativos / Actualización Inventarios",
        owner: "Iván Jesús", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - En esta semana se compartirá documento al cierre de febrero.",
        prevWeek: "3/3 - La siguiente semana se compartirá documento al cierre de febrero.",
        actionItem: "Seguimiento confirmación", actionOwner: "Iván Jesús", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "9", system: "ECC - S4",
        owner: "Héctor Medina / Viridiana Cortizo", status: "Con Incidentes", sla: "Minor",
        currentWeek: "10/3 - RLP, sin incidentes en ambientes productivos y no productivos. RAP, sin incidentes ambientes productivos y no productivos. S4P, El miércoles 04 de marzo se tuvo incidente con HANA de S4P.",
        prevWeek: "3/3 - RLP, sin incidentes en ambientes productivos y no productivos. RAP, sin incidentes ambientes productivos y no productivos, se procede con la exclusión del sistema RVP de la ruta de transportes del ECC. S4P, sin incidentes en ambientes productivos y no productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "10", system: "Problemas en BODS",
        owner: "Guadalupe Argüelles / Germán Bravo", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes en ambientes productivos y no productivos.",
        prevWeek: "3/3 - Sin incidentes en ambientes productivos y no productivos. 3/3 - El día 3 de Marzo se reportó interrupción del servicio y lentitud, 1 de Marzo Se brindó apoyo para reinicio de servers node y aplicación/BD para MII por problemas en varios fluxes de producción, fue un error de fechas a nivel funcional. Continúa el apoyo para revisión de servers node en AWS.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "11", system: "MII",
        owner: "Guadalupe Argüelles / Germán Bravo", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes en ambientes productivos y no productivos.",
        prevWeek: "3/3 - Sin incidentes en ambientes productivos y no productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "12", system: "PI",
        owner: "Guadalupe Argüelles / Talía Rosas", status: "Sin Incidentes", sla: "Critical",
        currentWeek: "10/3 - Sin incidentes en ambientes productivos y no productivos.",
        prevWeek: "3/3 - Sin incidentes en ambientes productivos y no productivos.",
        actionItem: "Restablecer comunicación y analizar Logs Red.", actionOwner: "Talía Rosas", commitDate: "2026-02-28",
        referenceInfo: "Tipo: Operativo | Justificación SLA: PI: afectación por comunicación con RLP | Prioridad: P1 - Crítica",
        customComment: ""
    },
    {
        id: "13", system: "CRM",
        owner: "Iván Jesús / Ulises Gutiérrez", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes en ambientes productivos y no productivos.",
        prevWeek: "3/3 - Sin incidentes en ambientes productivos y no productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "14", system: "GRC KOF / JDV",
        owner: "Iván Jesús / Daniel Ponce", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes en ambientes productivos y no productivos.",
        prevWeek: "3/3 - Sin incidentes en ambientes productivos y no productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "15", system: "SLT Azure",
        owner: "Iván Jesús / Talía Rosas", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes en ambientes productivos y no productivos.",
        prevWeek: "3/3 - Sin incidentes en ambientes productivos y no productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "16", system: "PCM FIM",
        owner: "Iván Jesús / Ulises Gutiérrez", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes en ambientes productivos y no productivos.",
        prevWeek: "3/3 - Sin incidentes en ambientes productivos y no productivos.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "17", system: "Implementación rec. TPO",
        owner: "TQS / Coordinadores", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Servicios de TPO para seguimiento en la implementación de recomendaciones: SAP SHP/SOL (Solution Manager) RAG 06/03/2026 SAP TR (TPO) RAG 80% 06/03/2026 SAP CRM CC (HUK, TR y RVP) TPG 21/01/2026 SAP ECC CRM (CPP y CEP) TPO 26/02/2026",
        prevWeek: "3/3 - Servicios de TPO para seguimiento en la implementación de recomendaciones: SAP SHP/SOL (Solution Manager) RAG 18/01/2026 SAP ECC/TR (CPP) TPO 02/07/2026 SAP ECC/TR CC (CTQ, FIN y RVP) TPO 21/01/2026 SAP ECC CRM (CPP y CEP) TPO 26/02/2026",
        actionItem: "Continuar con recomendacioens TPO", actionOwner: "TQS", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "18", system: "Seguimiento a Vulnerabilidades",
        owner: "Abraham Mora / Seguridad DXC", status: "En Revisión", sla: "Minor",
        currentWeek: "10/3 - Vulnerabilidades Qualys 1) - Sem. Qualys - Semana del 02/03/2026 al 09/03/2026 2) - Dentro y Fuera de SLA Semana 10",
        prevWeek: "3/3 - Vulnerabilidades Qualys 1) - Sem. Qualys - semana del 24/02/2026 al 02/03/2026 2) - Dentro y Fuera de SLA Semana 09",
        actionItem: "Revisar tablas y gráficos para remediación.", actionOwner: "Abraham Mora", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "19", system: "Seguimiento KPI respaldos / parches",
        owner: "Luis Muñoz / Teresa López", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Generando el reporte del mes de febrero, se libera el 13 de marzo.",
        prevWeek: "3/3 - Se revisó el reporte del mes de enero el 26 de febrero. Se libera el reporte el 27 de febrero.",
        actionItem: "Alineamiento y cierre de mes.", actionOwner: "Teresa López", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "20", system: "Depuración tablas Z en RAP y RLP",
        owner: "Héctor Medina / Viridiana C.", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Depuración Zs en RAP y RLP. En espera de más tablas depuradas por parte de los países.",
        prevWeek: "3/3 - Depuración Zs en RAP y RLP. En espera de más tablas depuradas por parte de los países.",
        actionItem: "Seguimiento con países para liberación.", actionOwner: "Héctor Medina", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "21", system: "Checklist vivo - muerto",
        owner: "Luis Muñoz / Teresa López", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Sin incidentes reportados en el monitoreo de esta semana.",
        prevWeek: "3/3 - Sin incidentes reportados en el monitoreo de esta semana.",
        actionItem: "Ninguno", actionOwner: "-", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "22", system: "CFIN - Demanda de espacio en disco RAP-RLP",
        owner: "Héctor Medina / Iván Jesús", status: "En Proceso", sla: "Critical",
        currentWeek: "10/3 - RAP - Datos. Asignado 3.43 TB. Límite 2.54 TB. Usado 2.94 TB. Uso Localizado en base a cantidad de registros: 2.44 TB. RLP - Datos. Asignado 2.12 TB. Límite 1.70 TB. Usado 2.50 TB. Uso Localizado en base a cantidad de registros: 1.83 TB",
        prevWeek: "3/3 - RAP - Datos. Asignado 3.43 TB. Límite 2.54 TB. Usado 2.94 TB. Uso Localizado en base a cantidad de registros: 1.47 TB. RLP - Datos. Asignado 2.12 TB. Límite 1.70 TB. Usado 2.50 TB. Uso Localizado en base a cantidad de registros: 1.76 TB.",
        actionItem: "Liberar espacio, excediendo límite.", actionOwner: "Héctor Medina", commitDate: "2026-03-02",
        referenceInfo: "Tipo: Operativo | Justificación SLA: CFIN: uso de disco supera el límite (Usado > Limite). | Prioridad: P1 - Crítica",
        customComment: ""
    },
    {
        id: "23", system: "Certificación Trim. de cuentas Unix",
        owner: "Luis Muñoz / Teresa López", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - En seguimiento de proceso del Q1 de 2026. En revisión de la información mensual previo a entrega.",
        prevWeek: "3/3 - En seguimiento de proceso del Q1 de 2026. Se envió la información mensual.",
        actionItem: "Completar certificación trimestral", actionOwner: "Luis Muñoz", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "24", system: "Inventarios de Certificados",
        owner: "Luis Muñoz / Teresa López", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - En seguimiento del proceso de actualización del inventario de certificados de SAP Renovados o nuevos.",
        prevWeek: "3/3 - En seguimiento del proceso de actualización del inventario de certificados de SAP Renovados o nuevos.",
        actionItem: "Actualizar inventarios", actionOwner: "Luis Muñoz", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "25", system: "Indicadores - Métricas de sistemas",
        owner: "TQS - Carlos Castillo", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - En proceso entrega para los indicadores correspondientes enero y febrero. Se está trabajando en el nuevo template KOF para los siguientes indicadores. Se comparte el avance de carga de los indicadores en SharePoint SAP Tecnología. Se adjunta resumen de avance a la fecha:",
        prevWeek: "3/3 - En proceso entrega para los indicadores correspondientes a diciembre y enero. Se está trabajando en el nuevo template KOF para los siguientes indicadores. Se comparte el avance de carga de los indicadores en SharePoint SAP Tecnología. Se adjunta resumen de avance a la fecha:",
        actionItem: "Entregar indicadores", actionOwner: "Carlos Castillo", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "26", system: "Clasificación cuentas privilegiadas",
        owner: "Luis Muñoz / Teresa López", status: "En Revisión", sla: "Critical",
        currentWeek: "10/3 - Se compartió la información de los servidores para las cuentas privilegiadas PAM por SIA.",
        prevWeek: "3/3 - Se compartió la información de los servidores para las cuentas privilegiadas PAM por SIA.",
        actionItem: "Seguimiento de ticket PAM (Teams).", actionOwner: "Teresa López", commitDate: "2026-02-28",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado según descripción. | Prioridad: P1 - Crítica",
        customComment: ""
    },
    {
        id: "27", system: "Toma por operaciones Nuevos Sistemas Azure",
        owner: "Antonio López / TQS", status: "Sin Incidentes", sla: "Minor",
        currentWeek: "10/3 - Dynatrace = Sin incidentes por el momento. CPRQC = Sin incidentes por el momento. Cloud Connector = Continuamos con la recepción de la documentación para el CLC Linux DEV. Mulesoft = Sin incidentes por el momento. BTP PaPM = Sin incidentes por el momento. Data Staging = Continuamos en proceso de entrega de la documentación a operaciones. Data Provisioning = Sin incidentes por el momento. Data Lake = Continuamos con la recepción de la documentación. Missión Crítica Azure = Sin incidentes por el momento. SCM & EWM = Sin incidentes por el momento. SOLMAN AZURE = Sin incidentes por el momento.",
        prevWeek: "3/3 - Dynatrace = Sin incidentes por el momento. CPRQC = Sin incidentes por el momento. Cloud Connector = Continuamos con la recepción de la documentación para el CLC Linux DEV. Mulesoft = Sin incidentes por el momento. BTP PaPM = Sin incidentes por el momento. Data Staging = Continuamos en proceso de entrega de la documentación a operaciones. Data Provisioning = Sin incidentes por el momento. Data Lake = Continuamos con la recepción de la documentación. Missión Crítica Azure = Sin incidentes por el momento. SCM & EWM = Sin incidentes por el momento. SOLMAN AZURE = Sin incidentes por el momento.",
        actionItem: "Revisar doc entregada e incorporar métricas.", actionOwner: "Antonio López", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "28", system: "Certificación de todos los usuarios de DB BOX",
        owner: "Luis Muñoz / Teresa López", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Se generó la información del entregable mensual.",
        prevWeek: "3/3 - Se generó la información del entregable mensual.",
        actionItem: "Revisar entregable", actionOwner: "Teresa López", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "29", system: "Performance / ABAP",
        owner: "Alejandro Alvarado / Team ABAP", status: "En Revisión", sla: "Minor",
        currentWeek: "10/3 - Se emitió la recomendación RLP-1350-04032 para la DB de RLP. Se emitió la recomendación RAP-1870-04033 para la DB de RAP.",
        prevWeek: "3/3 - Se emitieron 4 recomendaciones para RAP.",
        actionItem: "Evaluar recomendaciones", actionOwner: "Alejandro Alvarado", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "30", system: "Seguimiento a EWAs",
        owner: "TQS / DXC", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Adjunto estatus del 02 al 08 de marzo:",
        prevWeek: "3/3 - Adjunto estatus del 16 al 22 de Febrero: Se realizan sesiones de seguimiento con el team para dar seguimiento.",
        actionItem: "Analizar estatus", actionOwner: "TQS", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "31", system: "Revisión de usuarios BASIS en mandante 000",
        owner: "TQS / DXC", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Se comparte el avance de los temas relevantes en mandantes 000.",
        prevWeek: "3/3 - Se comparte el avance de los temas relevantes en mandantes 000.",
        actionItem: "Revisar mandantes", actionOwner: "TQS", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "32", system: "Información CMDB DXC a CMDB KOF",
        owner: "Luis Muñoz / Teresa López", status: "En Revisión", sla: "Minor",
        currentWeek: "10/3 - En seguimiento observaciones de CMDB KOF contra ESL DXC.",
        prevWeek: "3/3 - En seguimiento observaciones de CMDB KOF contra ESL DXC.",
        actionItem: "Resolver discrepancias CMDB", actionOwner: "Luis Muñoz", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "33", system: "Validación de horarios sistemas en operación",
        owner: "Luis Muñoz / Teresa López", status: "En Revisión", sla: "Minor",
        currentWeek: "10/3 - En seguimiento a la recomendación del mensaje a SAP 234995/2026 para MDG, se encapsuló la configuración del TimeZone del mandante 110 y se importó al mandante 000 del MDG. Se confirma que esta recomendación funcionó y se espera aplicar en el resto del landscape y replicar en SLT.",
        prevWeek: "3/3 - Se generaron los mensajes 224537/2026 y 234995/2026 para SLT y MDG. En espera de retroalimentación.",
        actionItem: "Espera de respuesta SAP", actionOwner: "Luis Muñoz", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "34", system: "Validación de URLs WD OnPremise",
        owner: "Luis Muñoz / Teresa López", status: "En Revisión", sla: "Minor",
        currentWeek: "10/3 - Pendiente presentación de las actividades para cambio de dominio kof.com.mx a kof.com.",
        prevWeek: "3/3 - Generando presentación de las actividades para cambio de dominio kof.com.mx a kof.com.",
        actionItem: "Completar presentación de URLs", actionOwner: "Luis Muñoz", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "35", system: "Recalendarización del Job de transportes",
        owner: "Luis Muñoz / Teresa López", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Se completó la configuración del usuario DDIC a tipo System en los ambientes OnPremise. Confirmar si es posible cerrar este punto.",
        prevWeek: "3/3 - En seguimiento para la terminación de configuración en todos los sistemas OnPremise el usuario DDIC como SYSTEM.",
        actionItem: "Terminar configuración DDIC", actionOwner: "Luis Muñoz", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    },
    {
        id: "36", system: "Desaprovisionamiento de Sentinel",
        owner: "Luis Muñoz / Teresa López", status: "En Revisión", sla: "Major",
        currentWeek: "10/3 - Se espera confirmación de Estrella Melendez para evitar afectación con el desaprovisionamiento. Una vez confirmado, se procederá desde Operaciones.",
        prevWeek: "3/3 - Se espera confirmación de Estrella Melendez para evitar afectación con el desaprovisionamiento. Una vez confirmado, se procederá desde Operaciones.",
        actionItem: "Confirmar con Estrella Melendez el impacto.", actionOwner: "Luis Muñoz", commitDate: "2026-03-03",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Evento reportado; impacto acotado | Prioridad: P3 - Media",
        customComment: ""
    },
    {
        id: "37", system: "Revisión Norma Corporativa Contraseñas",
        owner: "Teresa López / TQS", status: "En Proceso", sla: "Minor",
        currentWeek: "10/3 - Se dará seguimiento que los ambientes Productivos y No productivos, OnPremise y Azure para que cumplan con la Normativa de Contraseñas KOF. Se remedió la desviación del ambiente BW Com BCP con el parámetro login/no_automatic_user_sap* a 1.",
        prevWeek: "3/3 - Se dará seguimiento que los ambientes Productivos OnPremise y Azure cumplan con la Normativa de Contraseñas KOF. Se remedió la desviación del ambiente CAS LCP con el parámetro login/password_history_size a 15. Puntos adicionales",
        actionItem: "Alineamiento a la norma KOF", actionOwner: "Teresa López", commitDate: "-",
        referenceInfo: "Tipo: Operativo | Justificación SLA: Actividad operativa en curso | Prioridad: Baja",
        customComment: ""
    }
];

// Reference images dictionary (ID: Number of images)
const imageCounts = {
    "1": 2,
    "18": 8,
    "22": 2,
    "25": 2,
    "30": 5,
    "31": 2,
    "35": 1
};

// Attendees for Minuta
const attendeesList = [
    "José Eduardo Pérez Alemán", "Viridiana Cortizo", "Talía Rosas", "Germán Bravo",
    "Daniel Ponce", "Ulises Gutiérrez", "Rolando Sánchez", "Fernando Florez",
    "Arturo de la Rosa", "Mónica Cienfuegos", "Francisco Vázquez", "Luis Muñoz",
    "Teresa López", "Guadalupe Arguelles", "Héctor Medina", "Mario Reyes",
    "Enrique Aguilar", "Antonio López", "Iván Jesús", "Juan Boza", "Alejandro Alvarado",
    "Carlos Castillo", "Arturo Rogel", "Iván Vázquez", "Guillermo Peña", "Francisco Gómez",
    "Giovanni Montes", "Silvia Recoba", "Adriana Vasconcelos", "Roberto Velázquez",
    "Abraham Mora", "Eduardo Acosta", "Ernesto Corona"
];


// Helper Functions
const getStatusBadge = (status) => {
    switch (status) {
        case 'Con Incidentes': return '<span class="badge badge-danger">Con Incidentes</span>';
        case 'En Proceso': return '<span class="badge badge-warning">En Proceso</span>';
        case 'En Revisión': return '<span class="badge badge-review">En Revisión</span>';
        case 'Sin Incidentes': return '<span class="badge badge-success">Sin Incidentes</span>';
        default: return '<span class="badge badge-secondary">' + status + '</span>';
    }
};

const getSLABadge = (sla) => {
    switch (sla) {
        case 'Critical': return '<span class="badge badge-sla critical"><i class="fa-solid fa-circle-xmark"></i> Critical</span>';
        case 'Major': return '<span class="badge badge-sla major"><i class="fa-solid fa-circle-exclamation"></i> Major</span>';
        case 'Minor': return '<span class="badge badge-sla minor"><i class="fa-solid fa-circle-check"></i> Minor</span>';
        default: return sla;
    }
};

let currentData = [...dashboardData];
let allExpanded = false;
let additionalPointsArray = [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Inject Computed Target Period
    const elPeriod = document.getElementById('period-text');
    if (elPeriod) {
        elPeriod.innerText = dynamicPeriodText;
    }

    renderDashboard(currentData);

    // Toggle all button logic
    document.getElementById('btn-expand-all').addEventListener('click', (e) => {
        allExpanded = !allExpanded;
        const details = document.querySelectorAll('.sub-row');
        const icons = document.querySelectorAll('.btn-icon');

        details.forEach(row => {
            if (allExpanded) row.classList.add('open');
            else row.classList.remove('open');
        });

        icons.forEach(icon => {
            if (allExpanded) icon.classList.add('active');
            else icon.classList.remove('active');
        });

        e.currentTarget.innerHTML = allExpanded ?
            '<i class="fa-solid fa-compress"></i> Contraer Info' :
            '<i class="fa-solid fa-expand"></i> Expandir Info';
    });

    // PDF Export function
    document.getElementById('btn-export-pdf').addEventListener('click', generatePDF);
});

// Calculate total KPI numbers based on FULL data (so it never resets to 0 when filtered)
function updateKPIs() {
    let incidentCount = 0;
    let procCount = 0;
    let revCount = 0;
    let okCount = 0;

    dashboardData.forEach(item => {
        if (item.status === 'Con Incidentes') incidentCount++;
        if (item.status === 'En Proceso') procCount++;
        if (item.status === 'En Revisión') revCount++;
        if (item.status === 'Sin Incidentes') okCount++;
    });

    document.getElementById('kpi-incidentes').innerText = incidentCount;
    document.getElementById('kpi-proceso').innerText = procCount;
    document.getElementById('kpi-revision').innerText = revCount;
    document.getElementById('kpi-sin-incidentes').innerText = okCount;
    document.getElementById('kpi-total').innerText = dashboardData.length;
}

// Render the entire list
function renderDashboard(dataArray) {
    // 1. Sort the data Array numerically by ID
    const sortedData = dataArray.sort((a, b) => {
        return parseInt(a.id) - parseInt(b.id);
    });

    updateKPIs(); // 2. Update stats

    // 3. Render HTML table
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = ''; // Clear

    sortedData.forEach((row) => {
        // Build image gallery code if applicable
        let imgRefHTML = '';
        if (imageCounts[row.id] && imageCounts[row.id] > 0) {
            let galleryHTML = '<div class="ref-gallery">';
            for (let i = 1; i <= imageCounts[row.id]; i++) {
                const imgSrc = (window.DashboardImages && window.DashboardImages[`ref_${row.id}_${i}`]) ? window.DashboardImages[`ref_${row.id}_${i}`] : `img/ref_${row.id}_${i}.png`;
                galleryHTML += `<img src="${imgSrc}" class="ref-thumbnail" onclick="openLightbox(this.src)" title="Clic para ampliar" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                <span class="fallback-text" style="display:none; color: var(--text-muted); font-size: 11px;">(Falta img/ref_${row.id}_${i}.png)</span>`;
            }
            galleryHTML += '</div>';

            imgRefHTML = `<div style="margin-top:15px; border-top:1px dashed #cbd5e1; padding-top:10px;">
                          <strong>Imágenes de Referencia:</strong><br>
                          ${galleryHTML}
                          </div>`;
        }

        // Added comments rendering logic if present
        const customCommentsHTML = row.customComment !== '' ?
            `<div class="info-desc" style="background:#fef3c7; border-left: 3px solid #f59e0b; margin-top: 12px; margin-bottom: 12px;">
                                 <strong>Comentario Guardado:</strong> ${row.customComment}</div>` : '';


        // Main Row (No SLA column, Prior/Current week swapped, no truncate class)
        const trMain = document.createElement('tr');
        trMain.className = 'main-row';
        trMain.innerHTML = `
            <td class="col-id" data-label="Punto">${row.id}</td>
            <td class="col-system" data-label="Sistema / Proyecto">${row.system}</td>
            <td class="col-owner" data-label="Responsables"><i class="fa-regular fa-user" style="margin-right:4px;"></i>${row.owner}</td>
            <td data-label="Estatus Semanal">${getStatusBadge(row.status)}</td>
            <td title="${row.prevWeek}" data-label="Semana Previa">${row.prevWeek}</td>
            <td title="${row.currentWeek}" data-label="Evolución en la Semana Actual">${row.currentWeek}</td>
            <td data-label="Detalles">
                <button class="btn-icon" onclick="toggleDetails(${row.id}, this)">
                    <i class="fa-solid fa-chevron-down chevron-icon"></i>
                </button>
            </td>
        `;

        // Sub Row for details
        const trSub = document.createElement('tr');
        trSub.className = 'sub-row';
        trSub.id = `details-${row.id}`;
        trSub.innerHTML = `
            <td colspan="7" style="padding: 0;">
                <div class="sub-content-container">
                    
                    <!-- Action Items Focus (Now with Comment Input inside) -->
                    <div class="info-box action-box">
                        <h4><i class="fa-solid fa-clipboard-list"></i> Action Items & Compromisos</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Responsable</label>
                                <span>${row.actionOwner}</span>
                            </div>
                            <div class="info-item">
                                <label>Fecha Compromiso</label>
                                <span>${row.commitDate}</span>
                            </div>
                            <div class="info-item">
                                <label>Status</label>
                                <span>${row.actionItem === 'Ninguno' ? 'Completado' : 'Pendiente'}</span>
                            </div>
                        </div>
                        <div class="info-desc">
                            <strong>Detalle:</strong> ${row.actionItem}
                        </div>
                        
                        <!-- Show saved comments -->
                        ${customCommentsHTML}
                        
                        <!-- Create comment form -->
                        <div class="comment-input-group">
                            <input type="text" id="comment-input-${row.id}" placeholder="Escribe un comentario adicional para este punto..." onkeydown="if(event.key === 'Enter') saveComment('${row.id}')">
                            <button class="btn-save" onclick="saveComment('${row.id}')" title="Guardar Comentario">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Referenced Information -->
                    <div class="info-box ref-box">
                        <h4>
                            <span><i class="fa-solid fa-circle-info"></i> Información Complementaria</span>
                        </h4>
                        <div class="info-desc">
                            ${row.referenceInfo}
                        </div>
                        ${imgRefHTML}
                    </div>
                </div>
            </td>
        `;

        tbody.appendChild(trMain);
        tbody.appendChild(trSub);
    });
}

// Save comment function
window.saveComment = (id) => {
    const input = document.getElementById(`comment-input-${id}`);
    const commentText = input.value.trim();
    if (commentText) {
        // Find in array and update
        const item = dashboardData.find(d => d.id === id);
        if (item) {
            // Append if previous exist
            item.customComment = item.customComment ? item.customComment + " | " + commentText : commentText;
            renderDashboard(currentData);

            // Re-open details
            setTimeout(() => {
                const detailRow = document.getElementById(`details-${id}`);
                const icon = detailRow.previousElementSibling.querySelector('.btn-icon');
                if (!detailRow.classList.contains('open')) {
                    detailRow.classList.add('open');
                    icon.classList.add('active');
                }
            }, 50);
        }
    }
};

// Filter logic function
window.filterData = (statusFilter) => {
    if (statusFilter === 'All') {
        currentData = [...dashboardData];
    } else {
        currentData = dashboardData.filter(item => item.status === statusFilter);
    }
    renderDashboard(currentData);
};

window.toggleDetails = (id, btnElement) => {
    const detailRow = document.getElementById(`details-${id}`);
    btnElement.classList.toggle('active');
    detailRow.classList.toggle('open');
};

// Lightbox logic
window.openLightbox = (src) => {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('image-lightbox').classList.add('active');
};
window.closeLightbox = () => {
    document.getElementById('image-lightbox').classList.remove('active');
};

// Additional Points Logic
window.saveAdditionalPoint = () => {
    const inputEl = document.getElementById('additional-points-input');
    const val = inputEl.value.trim();
    if (val) {
        additionalPointsArray.push(val);
        inputEl.value = '';
        window.renderAdditionalPoints();

        // Return focus to input for quick typing
        inputEl.focus();
    }
};

window.renderAdditionalPoints = () => {
    const container = document.getElementById('additional-comments-container');
    container.innerHTML = '';

    additionalPointsArray.forEach((pt, index) => {
        const formattedValue = pt.replace(/\n/g, '<br>');
        container.innerHTML += `
             <div class="info-desc" style="background:#fef3c7; border-left: 3px solid #f59e0b; margin-bottom: 15px; position: relative; padding-right: 40px;">
                 <strong style="color: #b45309;">Punto Adicional ${index + 1}:</strong><br/> 
                 <div style="line-height: 1.5; margin-top: 5px; color: #334155;">${formattedValue}</div>
                 <button onclick="removeAdditionalPoint(${index})" style="position: absolute; top: 12px; right: 12px; background: none; border: none; color: #ef4444; cursor: pointer; font-size: 14px; padding: 4px; border-radius: 4px;" title="Eliminar" onmouseover="this.style.backgroundColor='#fecaca'" onmouseout="this.style.backgroundColor='transparent'">
                     <i class="fa-solid fa-trash"></i>
                 </button>
             </div>
         `;
    });
};

window.removeAdditionalPoint = (index) => {
    additionalPointsArray.splice(index, 1);
    window.renderAdditionalPoints();
};

// PDF Minuta Generator
window.generatePDF = () => {
    try {
        // Notify user it's loading
        const exportBtn = document.getElementById('btn-export-portrait');
        if (exportBtn) exportBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generando...';

        // Retrieve active filters safely
        const statusFilter = document.getElementById('filter-estatus')?.value || 'All';
        const searchFilter = document.getElementById('search-bar')?.value?.toLowerCase() || '';

        // Get attendees format html
        const half = Math.ceil(attendeesList.length / 2);
        const col1 = attendeesList.slice(0, half).map(a => `<li style="margin-bottom: 2px;">${a}</li>`).join('');
        const col2 = attendeesList.slice(half).map(a => `<li style="margin-bottom: 2px;">${a}</li>`).join('');

        let bodyContentHTML = '<div style="display: flex; flex-direction: column; gap: 12px; font-family: \'Inter\', sans-serif;">';
        bodyContentHTML += '<h4 style="border-bottom: 2px solid #10b981; padding-bottom: 4px; margin-top: 0; margin-bottom: 5px;">Estatus de Puntos (Formato Detallado)</h4>';

        // Only export currently visible filtered items
        const currentItems = Array.from(document.querySelectorAll('#sap-table tbody .main-row'))
            .map(row => row.querySelector('.col-id').textContent);

        const itemsToExport = dashboardData.filter(item => currentItems.includes(item.id));

        itemsToExport.forEach(item => {
            let imgHtml = '';
            let stackedImages = '';
            let hasImages = (imageCounts[item.id] && imageCounts[item.id] > 0);
            const isItem25 = (item.id === "25" || item.id === 25);
            const boxMarginBottom = isItem25 ? '15px' : '5px';

            let commentHtml = '';
            if (item.customComment && item.customComment !== '') {
                commentHtml = `<div style="margin-top:10px; background-color:#fef3c7; color:#b45309; padding:8px 12px; font-weight:600; border-radius:4px; font-size:11px; border-left: 3px solid #f59e0b; page-break-inside: avoid;">Comentario a la minuta: ${item.customComment}</div>`;
            }

            let textContentHtml = `
                    <div style="page-break-inside: avoid; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; display: block; box-shadow: 0 1px 2px rgba(0,0,0,0.05); background-color: #ffffff;">
                        <div style="background-color: #f8fafc; padding: 6px 15px; border-bottom: 1px solid #cbd5e1;">
                            <div style="float: right; font-size: 11px;">${getStatusBadge(item.status)}</div>
                            <h3 style="margin: 0; font-size: 13px; color: #0f172a; font-weight: 700;">#${item.id} - ${item.system}</h3>
                            <div style="clear: both;"></div>
                        </div>
                        <div style="padding: 8px 15px 4px 15px; font-size: 11px;">
                            <div style="margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dashed #e2e8f0; font-size: 11px;">
                                <strong>A cargo de:</strong> <span style="color: #475569;">${item.owner}</span>
                            </div>
                            <div style="display: flex; gap: 15px;">
                                <div style="flex: 1; min-width: 0;">
                                    <strong style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 2px; display: inline-block; margin-bottom: 4px; font-size: 11px; text-transform: uppercase;">Semana Previa</strong>
                                    <div style="color: #334155; line-height: 1.3; word-wrap: break-word;">${item.prevWeek}</div>
                                </div>
                                <div style="flex: 1; min-width: 0;">
                                    <strong style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 2px; display: inline-block; margin-bottom: 4px; font-size: 11px; text-transform: uppercase;">Semana Actual</strong>
                                    <div style="color: #334155; line-height: 1.3; font-weight: 500; word-wrap: break-word;">${item.currentWeek}</div>
                                </div>
                            </div>
                            ${commentHtml}
                        </div>
                    </div>
                `;

            if (isItem25) {
                let tdItems = '';
                const tdWidth = 100 / imageCounts[item.id];
                for (let i = 1; i <= imageCounts[item.id]; i++) {
                    const imgSrc = (window.DashboardImages && window.DashboardImages[`ref_${item.id}_${i}`]) ? window.DashboardImages[`ref_${item.id}_${i}`] : `img/ref_${item.id}_${i}.png`;
                    tdItems += `
                            <td style="width: ${tdWidth}%; padding: 0 4px; text-align: center; vertical-align: top;">
                                <img src="${imgSrc}" style="width: 100%; max-height: 650px; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 4px; background-color: white;">
                            </td>
                        `;
                }

                // Unified Table layout for item 25 to lock text and images together side-by-side but allow page breaks between text and images
                bodyContentHTML += `
                        <div style="margin-bottom: ${boxMarginBottom}; width: 100%;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td colspan="2" style="padding-bottom: 10px;">
                                        ${textContentHtml}
                                    </td>
                                </tr>
                                <tr>
                                    ${tdItems}
                                </tr>
                            </table>
                        </div>
                    `;
            } else {
                if (hasImages) {
                    for (let i = 1; i <= imageCounts[item.id]; i++) {
                        const imgSrc = (window.DashboardImages && window.DashboardImages[`ref_${item.id}_${i}`]) ? window.DashboardImages[`ref_${item.id}_${i}`] : `img/ref_${item.id}_${i}.png`;

                        stackedImages += `
                                <div style="page-break-inside: avoid; break-inside: avoid; display: block; margin-bottom: 12px; padding: 0 10px;">
                                    <img src="${imgSrc}" style="max-width: 100%; width: auto; max-height: 600px; height: auto; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 4px; display: block; margin: 0 auto; background-color: white;">
                                </div>
                            `;
                    }

                    imgHtml = `
                            <div style="margin-top: 10px; text-align: center; display: block;">
                                ${stackedImages}
                            </div>
                        `;
                }

                bodyContentHTML += `
                        <div style="margin-bottom: ${boxMarginBottom}; width: 100%;">
                            ${textContentHtml}
                            ${imgHtml}
                        </div>
                `;
            }
        });

        // Add "Additional Points" section if there are points inside array
        if (additionalPointsArray.length > 0) {
            let pointsHTML = '';
            additionalPointsArray.forEach((pt, index) => {
                const formattedText = pt.replace(/\n/g, '<br>');
                pointsHTML += `
                    <div style="margin-bottom: 15px;">
                        <strong style="color: #b45309; font-size: 11px;">Punto Adicional ${index + 1}:</strong>
                        <div style="color: #334155; line-height: 1.5; margin-top: 4px;">${formattedText}</div>
                    </div>
                `;
            });

            bodyContentHTML += `
                <div style="page-break-inside: avoid; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; margin-top: 10px; margin-bottom: 5px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    <div style="background-color: #f1f5f9; padding: 8px 15px; border-bottom: 1px solid #cbd5e1; display: flex; align-items: center;">
                        <h3 style="margin: 0; font-size: 13px; color: #0f172a; font-weight: 700;">Puntos Adicionales / Acuerdos</h3>
                    </div>
                    <div style="padding: 15px; font-size: 11px;">
                        ${pointsHTML}
                    </div>
                </div>
            `;
        }

        bodyContentHTML += '</div>';

        const pdfContent = `
            <div style="font-family: 'Inter', sans-serif; padding: 10px; background: white;">
                <table style="width: 100%; border-bottom: 2px solid #e31837; padding-bottom: 10px; margin-bottom: 15px; border-collapse: collapse;">
                    <tr>
                        <td style="width: 25%; text-align: left; vertical-align: middle;">
                            <img src="${window.DashboardImages && window.DashboardImages['kof_logo'] ? window.DashboardImages['kof_logo'] : 'img/kof-logo.png'}" width="140" height="35" style="display: inline-block; vertical-align: middle;" alt="KOF Logo">
                        </td>
                        <td style="width: 50%; text-align: center; vertical-align: middle;">
                            <h1 style="color: #0f172a; margin: 0; font-size: 16px; text-transform: uppercase;">KOF SAP Operaciones</h1>
                            <h3 style="color: #64748b; margin: 4px 0 0 0; font-size: 12px; font-weight: 500;">Minuta - Reunión Semanal de Seguimiento</h3>
                            <p style="color: #94a3b8; font-size: 10px; margin: 4px 0 0 0;">${dynamicPeriodText}</p>
                        </td>
                        <td style="width: 25%; text-align: right; vertical-align: middle;">
                            <img src="${window.DashboardImages && window.DashboardImages['dxc_logo'] ? window.DashboardImages['dxc_logo'] : 'img/dxc-logo.png'}" width="110" height="30" style="display: inline-block; vertical-align: middle;" alt="DXC Logo">
                        </td>
                    </tr>
                </table>

                <div style="margin-bottom: 20px;">
                    <h4 style="border-bottom: 2px solid #e31837; padding-bottom: 4px; margin-bottom: 8px; font-size: 13px;">Lista de Asistentes</h4>
                    <div style="display: flex; gap: 20px; font-size: 10px; color: #333;">
                        <ul style="flex:1; padding-left: 20px; margin: 0;">${col1}</ul>
                        <ul style="flex:1; padding-left: 20px; margin: 0;">${col2}</ul>
                    </div>
                </div>

                ${bodyContentHTML}

                <div style="text-align: center; margin-top: 25px; font-size: 9px; color: #94a3b8;">
                    Generado automáticamente el ${new Date().toLocaleDateString()}
                </div>
            </div>
        `;

        // Render configuration directly in memory without injecting it
        const element = document.createElement('div');
        element.innerHTML = pdfContent;

        // Give images a small tick to load safely in memory before painting
        setTimeout(() => {
            // Generate dynamic filename with timestamp
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;
            const dynamicFilename = `KOF_Minuta_${timestamp}.pdf`;

            // Invoke Html2Pdf Options
            const opt = {
                margin: 0.3, // Reduced PDF page margin
                filename: dynamicFilename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, allowTaint: true, letterRendering: true, logging: false },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'] }
            };

            html2pdf().set(opt).from(element).save().then(() => {
                const finishedBtn = document.getElementById('btn-export-portrait');
                if (finishedBtn) finishedBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Exportar a Minuta';
            }).catch(err => {
                console.error("PDF Export Error: ", err);

                // Fallback attempt without images if CORS strict blocks us completely locally
                if (err.message && err.message.includes('Tainted')) {
                    console.warn("CORS Local detectado. Intentando exportación segura sin algunas imágenes problemáticas...");
                    opt.html2canvas.ignoreElements = (node) => node.tagName && node.tagName.toLowerCase() === 'img' && !node.src.startsWith('data:');
                    html2pdf().set(opt).from(element).save().then(() => {
                        const finishedBtn = document.getElementById('btn-export-portrait');
                        if (finishedBtn) finishedBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Exportar a Minuta';
                    });
                } else {
                    console.error("Hubo un error local al generar el PDF.", err);
                    const finishedBtn = document.getElementById('btn-export-portrait');
                    if (finishedBtn) finishedBtn.innerHTML = '<i class="fa-solid fa-file-pdf"></i> Exportar a Minuta';
                }
            });
        }, 1500); // Increased timeout to let images load fully.
    } catch (criticalError) {
        alert("CRITICAL JS ERROR: " + criticalError.message + "\nLine: " + criticalError.lineNumber);
        const failBtn = document.getElementById('btn-export-portrait');
        if (failBtn) failBtn.innerHTML = 'Error en Exportación';
    }
};













