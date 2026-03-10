const fs = require('fs');

const data = {
    "1": { "prev": "3/3 - SAP ECC'S - Carga de Datos en tabla ZARIX (propuesta de mantener un mes en linea).", "act": "10/3 - SAP ECC'S - Carga de Datos en tabla ZARIX (propuesta de mantener un mes en linea)." },
    "2": { "status": "Con Incidentes", "prev": "3/3 - Sin incidentes en el ambiente productivo y ambientes no productivos.", "act": "10/3 - Lunes 09 de marzo. Se presentó la caída del ambiente Java BCP. Se tiene un mensaje a SAP 109190/2026 activo para conocer la causa raíz." },
    "3": { "prev": "3/3 - Sin incidentes en el ambiente productivo y ambientes no productivos.", "act": "10/3 - Sin incidentes en el ambiente productivo y ambientes no productivos." },
    "4": { "prev": "3/3 - RFC relevantes por realizar. ON PREMISE: RAP Reorganización Semanal de objetos de BD en horarios discontinuos. NUBE AZURE: Monthly OS patching to fix vulnerability and remove ERM client package... (ver archivo anterior)", "act": "10/3 - RFC relevantes por realizar ON PREMISE: Aud updt de SO y cierre de vulnerabilidades encl hcvspn20 VSP 805, SBX-RVR, Vcopy RAP | Update de SO y cierre de vulnerabilidades server RVP | AUD Update de SO y cierre de vulnerabilidades en Nodo Adoptivo RAP haerppn3 ERPNX PRD / Enclosure 51-52 (Apps RVP, RAT y RAZ) / nodo adoptivo de CRM-MEX y BCP-BC4 | Instalación de parches de seguridad Windows en DS PRD | RAP Reorganización Semanal de objetos de BD en horarios discontinuos | Actualización support packages SPAM - ST-PI - ST-API - SAP CAS UCD y UCP. NUBE AZURE: Monthly Patching to fix vulnerability and remove ERM client package on Prod - CPR Servers / Pre-Prod S/4 Servers / Prod - MDG Servers / Prod - IAC Servers | Instalación de parches de seguridad Windows en MII Mexico, Colombia, Centroamerica, Brasil y JDV | Ajuste de parámetros para remediación de vulnerabilidad HTTP Security Header is not detected en MII Colombia, Centroamérica, Brasil y JDV | Instalación Add On GRC Access Control 12 TAR / T4P RFC relevantes realizados en la semana anterior ON PREMISE: RAP Reorganización Semanal de objetos de BD en horarios discontinuos. NUBE AZURE: Monthly OS patching to fix vulnerability and remove ERM client package on Pre-Prod GRC y SLT Servers | Pre-Prod - CPR | SCM-SMR & EWM-EMR Servers | DR - S/4 Servers | QA- S/4." },
    "5": { "prev": "3/3 - 01. RCA PRB0129150 Reinicio de DS PRD PKS por saturación de unidad T / en servidor de BD 26feb26. Se libera la versión final. 02. RCA Informativo - Incidente en PI Productivo 22feb26. En proceso de elaboración.", "act": "10/3 - 01. Incidente IN0129998 Incidente en PI Productivo 22feb26. En espera de comentarios por parte del Coordinador. 02.RCA PRB0130244 Failover SAP SAP Hana 05mar26. En documentación. 03.RCA problema de acceso Portal BW 09mar26. En documentación." },
    "6": { "prev": "3/3 - Servicios: Servicio de salvaguarda migración SO aplicativo BAP - Servicio en preparación, inicia Domingo 08 de Marzo 10:00 - Viridiana Cortizo...", "act": "10/3 - Servicios: Servicio de salvaguarda migración SO Aplicativo RAP - Servicio cancelado - Viridiana Cortizo. Servicio de QA para la estrategia de migraciones Tech Refresh - Requerimiento en revisión por parte de SAP - Viridiana Cortizo Revisión Plan de servicios SAP MaxAttention 2026 KOF IT - Miércoles 11 Marzo - Eduardo Perez En proceso: Juntas de seguimiento a recomendaciones servicios MaxAttention - SAP MaxAttention & TQS, última reunión 6 de Marzo, próxima reunión 20 de Marzo." },
    "7": { "prev": "3/3 - Sin incidentes en respaldos productivos.", "act": "10/3 - Sin incidentes en respaldos productivos." },
    "8": { "prev": "3/3 - La siguiente semana se compartirá documento al cierre de febrero.", "act": "10/3 - En esta semana se compartirá documento al cierre de febrero." },
    "9": { "status": "Con Incidentes", "prev": "3/3 - RLP, sin incidentes en ambientes productivos y no productivos. RAP, sin incidentes ambientes productivos y no productivos, se procede con la exclusión del sistema RVP de la ruta de transportes del ECC. S4P, sin incidentes en ambientes productivos y no productivos.", "act": "10/3 - RLP, sin incidentes en ambientes productivos y no productivos. RAP, sin incidentes ambientes productivos y no productivos. S4P, El miércoles 04 de marzo se tuvo incidente con HANA de S4P." },
    "10": { "status": "Sin Incidentes", "prev": "3/3 - Sin incidentes en ambientes productivos y no productivos. 3/3 - El día 3 de Marzo se reportó interrupción del servicio y lentitud, 1 de Marzo Se brindó apoyo para reinicio de servers node y aplicación/BD para MII por problemas en varios fluxes de producción, fue un error de fechas a nivel funcional. Continúa el apoyo para revisión de servers node en AWS.", "act": "10/3 - Sin incidentes en ambientes productivos y no productivos." },
    "11": { "prev": "3/3 - Sin incidentes en ambientes productivos y no productivos.", "act": "10/3 - Sin incidentes en ambientes productivos y no productivos." },
    "12": { "status": "Sin Incidentes", "prev": "3/3 - Sin incidentes en ambientes productivos y no productivos.", "act": "10/3 - Sin incidentes en ambientes productivos y no productivos." },
    "13": { "prev": "3/3 - Sin incidentes en ambientes productivos y no productivos.", "act": "10/3 - Sin incidentes en ambientes productivos y no productivos." },
    "14": { "prev": "3/3 - Sin incidentes en ambientes productivos y no productivos.", "act": "10/3 - Sin incidentes en ambientes productivos y no productivos." },
    "15": { "prev": "3/3 - Sin incidentes en ambientes productivos y no productivos.", "act": "10/3 - Sin incidentes en ambientes productivos y no productivos." },
    "16": { "prev": "3/3 - Sin incidentes en ambientes productivos y no productivos.", "act": "10/3 - Sin incidentes en ambientes productivos y no productivos." },
    "17": { "prev": "3/3 - Servicios de TPO para seguimiento en la implementación de recomendaciones: SAP SHP/SOL (Solution Manager) RAG 18/01/2026 SAP ECC/TR (CPP) TPO 02/07/2026 SAP ECC/TR CC (CTQ, FIN y RVP) TPO 21/01/2026 SAP ECC CRM (CPP y CEP) TPO 26/02/2026", "act": "10/3 - Servicios de TPO para seguimiento en la implementación de recomendaciones: SAP SHP/SOL (Solution Manager) RAG 06/03/2026 SAP TR (TPO) RAG 80% 06/03/2026 SAP CRM CC (HUK, TR y RVP) TPG 21/01/2026 SAP ECC CRM (CPP y CEP) TPO 26/02/2026" },
    "18": { "prev": "3/3 - Vulnerabilidades Qualys 1) - Sem. Qualys - semana del 02/03/2026 al 09/03/2026 2) - Dentro y Fuera de SLA Semana 09", "act": "10/3 - Vulnerabilidades Qualys 1) - Sem. Qualys - Semana del 02/03/2026 al 09/03/2026 2) - Dentro y Fuera de SLA Semana 10" },
    "19": { "prev": "3/3 - Se revisó el reporte del mes de enero el 26 de febrero. Se libera el reporte el 27 de febrero.", "act": "10/3 - Generando el reporte del mes de febrero, se libera el 13 de marzo." },
    "20": { "prev": "3/3 - Depuración Zs en RAP y RLP. En espera de más tablas depuradas por parte de los países.", "act": "10/3 - Depuración Zs en RAP y RLP. En espera de más tablas depuradas por parte de los países." },
    "21": { "prev": "3/3 - Sin incidentes reportados en el monitoreo de esta semana.", "act": "10/3 - Sin incidentes reportados en el monitoreo de esta semana." },
    "22": { "prev": "3/3 - RAP - Datos. Asignado 3.43 TB. Límite 2.54 TB. Usado 2.94 TB. Uso Localizado en base a cantidad de registros: 2.44 TB. RLP - Datos. Asignado 2.12 TB. Límite 1.70 TB. Usado 2.50 TB. Uso Localizado en base a cantidad de registros: 1.76 TB.", "act": "10/3 - RAP - Datos. Asignado 3.43 TB. Límite 2.54 TB. Usado 2.94 TB. Uso Localizado en base a cantidad de registros: 2.44 TB. RLP - Datos. Asignado 2.12 TB. Límite 1.70 TB. Usado 2.50 TB. Uso Localizado en base a cantidad de registros: 1.83 TB" },
    "23": { "prev": "3/3 - En seguimiento de proceso del Q1 de 2026. Se envió la información mensual.", "act": "10/3 - En seguimiento de proceso del Q1 de 2026. En revisión de la información mensual previo a entrega." },
    "24": { "prev": "3/3 - En seguimiento del proceso de actualización del inventario de certificados de SAP Renovados o nuevos.", "act": "10/3 - En seguimiento del proceso de actualización del inventario de certificados de SAP Renovados o nuevos." },
    "25": { "prev": "3/3 - En proceso entrega para los indicadores correspondientes a diciembre y enero. Se está trabajando en el nuevo template KOF para los siguientes indicadores. Se comparte el avance de carga de los indicadores en SharePoint SAP Tecnología. Se adjunta resumen de avance a la fecha:", "act": "10/3 - En proceso entrega para los indicadores correspondientes enero y febrero. Se está trabajando en el nuevo template KOF para los siguientes indicadores. Se comparte el avance de carga de los indicadores en SharePoint SAP Tecnología. Se adjunta resumen de avance a la fecha:" },
    "26": { "prev": "3/3 - Se compartió la información de los servidores para las cuentas privilegiadas PAM por SIA.", "act": "10/3 - Se compartió la información de los servidores para las cuentas privilegiadas PAM por SIA." },
    "27": { "prev": "3/3 - Dynatrace = Sin incidentes por el momento. CPRQC = Sin incidentes por el momento. Cloud Connector = Continuamos con la recepción de la documentación para el CLC Linux DEV. Mulesoft = Sin incidentes por el momento. BTP PaPM = Sin incidentes por el momento. Data Staging = Continuamos en proceso de entrega de la documentación a operaciones. Data Provisioning = Sin incidentes por el momento. Data Lake = Continuamos con la recepción de la documentación. Missión Crítica Azure = Sin incidentes por el momento. SCM & EWM = Sin incidentes por el momento. SOLMAN AZURE = Sin incidentes por el momento.", "act": "10/3 - Dynatrace = Sin incidentes por el momento. CPRQC = Sin incidentes por el momento. Cloud Connector = Continuamos con la recepción de la documentación para el CLC Linux DEV. Mulesoft = Sin incidentes por el momento. BTP PaPM = Sin incidentes por el momento. Data Staging = Continuamos en proceso de entrega de la documentación a operaciones. Data Provisioning = Sin incidentes por el momento. Data Lake = Continuamos con la recepción de la documentación. Missión Crítica Azure = Sin incidentes por el momento. SCM & EWM = Sin incidentes por el momento. SOLMAN AZURE = Sin incidentes por el momento." },
    "28": { "prev": "3/3 - Se generó la información del entregable mensual.", "act": "10/3 - Se generó la información del entregable mensual." },
    "29": { "prev": "3/3 - Se emitieron 4 recomendaciones para RAP.", "act": "10/3 - Se emitió la recomendación RLP-1350-04032 para la DB de RLP. Se emitió la recomendación RAP-1870-04033 para la DB de RAP." },
    "30": { "prev": "3/3 - Adjunto estatus del 16 al 22 de Febrero: Se realizan sesiones de seguimiento con el team para dar seguimiento.", "act": "10/3 - Adjunto estatus del 02 al 08 de marzo:" },
    "31": { "prev": "3/3 - Se comparte el avance de los temas relevantes en mandantes 000.", "act": "10/3 - Se comparte el avance de los temas relevantes en mandantes 000." },
    "32": { "prev": "3/3 - En seguimiento observaciones de CMDB KOF contra ESL DXC.", "act": "10/3 - En seguimiento observaciones de CMDB KOF contra ESL DXC." },
    "33": { "prev": "3/3 - Se generaron los mensajes 224537/2026 y 234995/2026 para SLT y MDG. En espera de retroalimentación.", "act": "10/3 - En seguimiento a la recomendación del mensaje a SAP 234995/2026 para MDG, se encapsuló la configuración del TimeZone del mandante 110 y se importó al mandante 000 del MDG. Se confirma que esta recomendación funcionó y se espera aplicar en el resto del landscape y replicar en SLT." },
    "34": { "prev": "3/3 - Generando presentación de las actividades para cambio de dominio kof.com.mx a kof.com.", "act": "10/3 - Pendiente presentación de las actividades para cambio de dominio kof.com.mx a kof.com." },
    "35": { "prev": "3/3 - En seguimiento para la terminación de configuración en todos los sistemas OnPremise el usuario DDIC como SYSTEM.", "act": "10/3 - Se completó la configuración del usuario DDIC a tipo System en los ambientes OnPremise. Confirmar si es posible cerrar este punto." },
    "36": { "prev": "3/3 - Se espera confirmación de Estrella Melendez para evitar afectación con el desaprovisionamiento. Una vez confirmado, se procederá desde Operaciones.", "act": "10/3 - Se espera confirmación de Estrella Melendez para evitar afectación con el desaprovisionamiento. Una vez confirmado, se procederá desde Operaciones." },
    "37": { "prev": "3/3 - Se dará seguimiento que los ambientes Productivos OnPremise y Azure cumplan con la Normativa de Contraseñas KOF. Se remedió la desviación del ambiente CAS LCP con el parámetro login/password_history_size a 15. Puntos adicionales", "act": "10/3 - Se dará seguimiento que los ambientes Productivos y No productivos, OnPremise y Azure para que cumplan con la Normativa de Contraseñas KOF. Se remedió la desviación del ambiente BW Com BCP con el parámetro login/no_automatic_user_sap* a 1." }
};

let appJsContent = fs.readFileSync('c:/Users/eaguilarher2/Documents/Antigravity/kof-sap-dashboard/js/app.js', 'utf-8');

// Find the dashboardData block safely using regular expressions matching full object array
const regex = /(const dashboardData = )(\[\s*\{[\s\S]*?\}\s*\]);/;
const match = appJsContent.match(regex);
if (match) {
    let dataArray = eval(match[2]);
    dataArray.forEach(item => {
        const d = data[item.id.toString()];
        if (d) {
            item.prevWeek = d.prev;
            item.currentWeek = d.act;
            if (d.status) item.status = d.status;
        }
    });

    let newArrJSON = '[\n';
    dataArray.forEach((item, index) => {
        newArrJSON += '    {\n';
        newArrJSON += `        id: "${item.id}", system: "${item.system}",\n`;
        newArrJSON += `        owner: "${item.owner}", status: "${item.status}", sla: "${item.sla}",\n`;

        const actClean = item.currentWeek.replace(/"/g, '\\"').replace(/\n/g, ' ');
        const prevClean = item.prevWeek.replace(/"/g, '\\"').replace(/\n/g, ' ');

        newArrJSON += `        currentWeek: "${actClean}",\n`;
        newArrJSON += `        prevWeek: "${prevClean}",\n`;
        newArrJSON += `        actionItem: "${item.actionItem}", actionOwner: "${item.actionOwner}", commitDate: "${item.commitDate}",\n`;
        newArrJSON += `        referenceInfo: "${item.referenceInfo.replace(/"/g, '\\"')}",\n`;
        newArrJSON += `        customComment: "${item.customComment.replace(/"/g, '\\"')}"\n`;
        newArrJSON += '    }' + (index < dataArray.length - 1 ? ',' : '') + '\n';
    });
    newArrJSON += ']';

    appJsContent = appJsContent.replace(regex, `$1${newArrJSON};`);

    // Also update dates
    appJsContent = appJsContent.replace(/Periodo: 4 al 10 mar 2026/g, 'Periodo: 11 al 17 mar 2026');
    fs.writeFileSync('c:/Users/eaguilarher2/Documents/Antigravity/kof-sap-dashboard/js/app.js', appJsContent);
}

let idx = fs.readFileSync('c:/Users/eaguilarher2/Documents/Antigravity/kof-sap-dashboard/index.html', 'utf-8');
idx = idx.replace(/Periodo: 4 al 10 mar 2026/g, 'Periodo: 11 al 17 mar 2026');
fs.writeFileSync('c:/Users/eaguilarher2/Documents/Antigravity/kof-sap-dashboard/index.html', idx);

console.log('Update Complete.');
