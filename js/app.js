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
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0(Sun) - 6(Sat)

    // We want the period to be Wed (3) to Tue (2)
    // If today is Wed, Thu, Fri, Sat, Sun, Mon, Tue -> what to do?
    // Let's define the "current period start" as the most recent Wednesday
    const daysSinceWednesday = (dayOfWeek >= 3) ? (dayOfWeek - 3) : (dayOfWeek + 4);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - daysSinceWednesday);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Tuesday is 6 days after Wednesday

    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const startMonth = months[startDate.getMonth()].toLowerCase();
    const endMonth = months[endDate.getMonth()].toLowerCase();
    const year = endDate.getFullYear();

    if (startMonth === endMonth) {
        return `Periodo: ${startDay} al ${endDay} de ${endMonth.charAt(0).toUpperCase() + endMonth.slice(1)} ${year}`;
    } else {
        return `Periodo: ${startDay} ${startMonth} al ${endDay} ${endMonth} ${year}`;
    }
};

const dynamicPeriodText = getDynamicPeriod();

let dashboardData = [];

// Reference images dictionary (ID: Number of images)
const imageCounts = {
    "1": 2,
    "18": 8,
    "22": 2,
    "25": 2,
    "30": 5,
    "31": 2
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

const formatBullets = (text) => {
    if (!text) return '';
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return '';
    const listItems = lines.map(line => {
        const cleanedLine = line.replace(/^[•\-\*]\s*/, '');
        return `<li style="margin-bottom: 4px;">${cleanedLine}</li>`;
    });
    return `<ul style="margin: 0; padding-left: 18px; list-style-type: disc;">${listItems.join('')}</ul>`;
};

let currentData = [];
let allExpanded = false;
let isPrevWeekVisible = false; // Estado para la columna de Semana Previa
let additionalPointsArray = [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Inject Computed Target Period
    const elPeriod = document.getElementById('period-text');
    if (elPeriod) {
        elPeriod.innerText = dynamicPeriodText;
    }

    fetch('dashboard_data.json?t=' + new Date().getTime())
        .then(res => res.json())
        .then(data => {
            dashboardData = data.value || data;
            currentData = [...dashboardData];
            renderDashboard(currentData);
        })
        .catch(err => {
            console.error("Error loading dashboard data:", err);
            document.getElementById('table-body').innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 20px;">Error cargando datos del dashboard. Refresca la página.</td></tr>';
        });

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

    // Toggle Prev Week logic
    const toggleBtn = document.getElementById('btn-toggle-prev-week');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isPrevWeekVisible = !isPrevWeekVisible;
            const table = document.getElementById('sap-table');
            if (isPrevWeekVisible) {
                table.classList.add('show-prev-week');
                toggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ocultar semana previa';
            } else {
                table.classList.remove('show-prev-week');
                toggleBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Mostrar semana previa';
            }
        });
    }

    // PDF Export function
    document.getElementById('btn-export-pdf')?.addEventListener('click', generatePDF);
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
        let rowImageCount = row.imageCount !== undefined ? parseInt(row.imageCount) : (imageCounts[row.id] || 0);
        if (rowImageCount > 0) {
            let galleryHTML = '<div class="ref-gallery">';
            for (let i = 1; i <= rowImageCount; i++) {
                const timestamp = new Date().getTime(); // Cache busting
                const imgSrc = (window.DashboardImages && window.DashboardImages[`ref_${row.id}_${i}`]) ? window.DashboardImages[`ref_${row.id}_${i}`] : `img/ref_${row.id}_${i}.png?v=${timestamp}`;
                galleryHTML += `<img src="${imgSrc}" class="ref-thumbnail" onclick="openLightboxGallery('${row.id}', ${i - 1})" title="Clic para ampliar" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
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


        const prevWeekSafe = row.prevWeek ? row.prevWeek.replace(/"/g, '&quot;') : '';
        const currentWeekSafe = row.currentWeek ? row.currentWeek.replace(/"/g, '&quot;') : '';

        // Main Row (No SLA column, Prior/Current week swapped, no truncate class)
        const trMain = document.createElement('tr');
        trMain.className = 'main-row';
        trMain.innerHTML = `
            <td class="col-id" data-label="Punto">${row.id}</td>
            <td class="col-system" data-label="Sistema / Proyecto">${row.system}</td>
            <td class="col-owner" data-label="Responsables"><i class="fa-regular fa-user" style="margin-right:4px;"></i>${row.owner}</td>
            <td data-label="Estatus Semanal">${getStatusBadge(row.status)}</td>
            <td class="col-prev-week" title="${prevWeekSafe}" data-label="Semana Previa">${formatBullets(row.prevWeek)}</td>
            <td title="${currentWeekSafe}" data-label="Evolución en la Semana Actual">${formatBullets(row.currentWeek)}</td>
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

// Lightbox logic & Gallery state
window.currentGalleryImages = [];
window.currentGalleryIndex = 0;

window.openLightboxGallery = (itemId, index) => {
    window.currentGalleryImages = [];
    for (let i = 1; i <= imageCounts[itemId]; i++) {
        const timestamp = new Date().getTime();
        const imgSrc = (window.DashboardImages && window.DashboardImages[`ref_${itemId}_${i}`])
            ? window.DashboardImages[`ref_${itemId}_${i}`]
            : `img/ref_${itemId}_${i}.png?v=${timestamp}`;
        window.currentGalleryImages.push(imgSrc);
    }
    window.currentGalleryIndex = index || 0;
    updateLightboxView();
    document.getElementById('image-lightbox').classList.add('active');
};

window.openLightbox = (src) => {
    window.currentGalleryImages = [src];
    window.currentGalleryIndex = 0;
    updateLightboxView();
    document.getElementById('image-lightbox').classList.add('active');
};

window.updateLightboxView = () => {
    if (window.currentGalleryImages.length === 0) return;
    document.getElementById('lightbox-img').src = window.currentGalleryImages[window.currentGalleryIndex];

    // Toggle navigation arrows if there's more than 1 image
    const showNav = window.currentGalleryImages.length > 1;
    document.querySelector('.lightbox-prev').style.display = showNav ? 'block' : 'none';
    document.querySelector('.lightbox-next').style.display = showNav ? 'block' : 'none';
};

window.changeLightboxImage = (direction, event) => {
    if (event) event.stopPropagation();
    if (window.currentGalleryImages.length === 0) return;

    window.currentGalleryIndex += direction;
    // Loop around logic
    if (window.currentGalleryIndex >= window.currentGalleryImages.length) {
        window.currentGalleryIndex = 0;
    }
    if (window.currentGalleryIndex < 0) {
        window.currentGalleryIndex = window.currentGalleryImages.length - 1;
    }
    updateLightboxView();
};

window.closeLightbox = (event) => {
    if (event && event.target.id !== 'image-lightbox' && !event.target.classList.contains('lightbox-close')) {
        // Prevents closing when clicking on inner elements unless it's the exact background or X
        return;
    }
    document.getElementById('image-lightbox').classList.remove('active');
};

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('image-lightbox');
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            window.changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            window.changeLightboxImage(1);
        } else if (e.key === 'Escape') {
            window.closeLightbox();
        }
    }
});

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
        bodyContentHTML += `
            <div class="pdf-no-break" style="page-break-inside: avoid; padding-top: 8px; padding-bottom: 8px; width: 100%;">
                <h4 style="border-bottom: 2px solid #10b981; padding-bottom: 4px; margin-top: 0; margin-bottom: 5px;">Estatus de Puntos (Formato Detallado)</h4>
            </div>`;

        // Only export currently visible filtered items
        const currentItems = Array.from(document.querySelectorAll('#sap-table tbody .main-row'))
            .map(row => row.querySelector('.col-id').textContent);

        const itemsToExport = dashboardData.filter(item => currentItems.includes(item.id));

        itemsToExport.forEach(item => {
            let imgHtml = '';
            let stackedImages = '';
            let itemImageCount = item.imageCount !== undefined ? parseInt(item.imageCount) : (imageCounts[item.id] || 0);
            let hasImages = (itemImageCount > 0);
            const isItem25 = (item.id === "25" || item.id === 25);
            const boxMarginBottom = isItem25 ? '15px' : '5px';

            let commentHtml = '';
            if (item.customComment && item.customComment !== '') {
                commentHtml = `
                    <div class="pdf-no-break" style="page-break-inside: avoid; padding-top: 10px; padding-bottom: 6px;">
                        <div style="background-color:#fef3c7; color:#b45309; padding:8px 12px; font-weight:600; border-radius:4px; font-size:11px; border-left: 3px solid #f59e0b;">Comentario a la minuta: ${item.customComment}</div>
                    </div>`;
            }

            let textContentHtml = `
                    <div class="pdf-no-break" style="page-break-inside: avoid; padding-top: 6px; padding-bottom: 6px; width: 100%;">
                        <div style="border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; display: block; box-shadow: 0 1px 2px rgba(0,0,0,0.05); background-color: #ffffff;">
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
                                ${isPrevWeekVisible ? `
                                <div style="flex: 1; min-width: 0;">
                                    <strong style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 2px; display: inline-block; margin-bottom: 4px; font-size: 11px; text-transform: uppercase;">Semana Previa</strong>
                                    <div style="color: #334155; line-height: 1.6; font-size: 11.5px; word-wrap: break-word;">${formatBullets(item.prevWeek)}</div>
                                </div>` : ''}
                                <div style="flex: 1; min-width: 0;">
                                    <strong style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 2px; display: inline-block; margin-bottom: 4px; font-size: 11px; text-transform: uppercase;">Semana Actual</strong>
                                    <div style="color: #334155; line-height: 1.6; font-size: 11.5px; font-weight: 500; word-wrap: break-word;">${formatBullets(item.currentWeek)}</div>
                                </div>
                            </div>
                            ${commentHtml}
                        </div>
                    </div>
                </div>
                `;

            if (isItem25) {
                let tdItems = '';
                const tdWidth = 100 / itemImageCount;
                for (let i = 1; i <= itemImageCount; i++) {
                    const timestamp = new Date().getTime(); // Cache busting
                    const imgSrc = (window.DashboardImages && window.DashboardImages[`ref_${item.id}_${i}`]) ? window.DashboardImages[`ref_${item.id}_${i}`] : `img/ref_${item.id}_${i}.png?v=${timestamp}`;
                    tdItems += `
                            <td style="width: ${tdWidth}%; padding: 0 4px; text-align: center; vertical-align: top;">
                                <img src="${imgSrc}" style="width: 100%; max-height: 500px; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 4px; background-color: white;">
                            </td>
                        `;
                }

                // Layout for item 25: Text first, then a forced page break before the side-by-side images
                bodyContentHTML += `
                        <div style="padding-bottom: ${boxMarginBottom}; width: 100%;">
                            <div style="padding-bottom: 10px;">
                                ${textContentHtml}
                            </div>
                            <!-- Protective padding wrapper to ensure borders aren't sliced by the PDF break -->
                            <div class="pdf-no-break" style="page-break-inside: avoid; width: 100%; padding-top: 8px; padding-bottom: 8px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        ${tdItems}
                                    </tr>
                                </table>
                            </div>
                        </div>
                    `;
            } else {
                if (hasImages) {
                    for (let i = 1; i <= itemImageCount; i++) {
                        const timestamp = new Date().getTime(); // Cache busting
                        const imgSrc = (window.DashboardImages && window.DashboardImages[`ref_${item.id}_${i}`]) ? window.DashboardImages[`ref_${item.id}_${i}`] : `img/ref_${item.id}_${i}.png?v=${timestamp}`;

                        stackedImages += `
                                <div class="pdf-no-break" style="page-break-inside: avoid; display: block; padding-bottom: 15px; padding-top: 6px;">
                                    <div style="padding: 0 10px;">
                                        <img src="${imgSrc}" style="max-width: 100%; width: auto; max-height: 600px; height: auto; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 4px; display: block; margin: 0 auto; background-color: white;">
                                    </div>
                                </div>
                            `;
                    }

                    imgHtml = `
                            <div style="padding-top: 10px; text-align: center; display: block;">
                                ${stackedImages}
                            </div>
                        `;
                }

                bodyContentHTML += `
                        <div style="padding-bottom: ${boxMarginBottom}; width: 100%;">
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
                <div class="pdf-no-break" style="page-break-inside: avoid; padding-top: 10px; padding-bottom: 8px;">
                    <div style="border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                        <div style="background-color: #f1f5f9; padding: 8px 15px; border-bottom: 1px solid #cbd5e1; display: flex; align-items: center;">
                        <h3 style="margin: 0; font-size: 13px; color: #0f172a; font-weight: 700;">Puntos Adicionales / Acuerdos</h3>
                    </div>
                    <div style="padding: 15px; font-size: 11px;">
                        ${pointsHTML}
                    </div>
                    </div>
                </div>
            `;
        }

        bodyContentHTML += '</div>';

        const pdfContent = `
            <div style="font-family: 'Inter', sans-serif; padding: 10px; background: white;">
                <div class="pdf-no-break" style="page-break-inside: avoid; padding-top: 8px; padding-bottom: 8px; width: 100%;">
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
                </div>

                <div class="pdf-no-break" style="page-break-inside: avoid; padding-top: 8px; padding-bottom: 8px; width: 100%;">
                    <div style="margin-bottom: 20px;">
                        <h4 style="border-bottom: 2px solid #e31837; padding-bottom: 4px; margin-bottom: 8px; font-size: 13px;">Lista de Asistentes</h4>
                        <div style="display: flex; gap: 20px; font-size: 10px; color: #333;">
                            <ul style="flex:1; padding-left: 20px; margin: 0;">${col1}</ul>
                            <ul style="flex:1; padding-left: 20px; margin: 0;">${col2}</ul>
                        </div>
                    </div>
                </div>

                ${bodyContentHTML}

                <div class="pdf-no-break" style="page-break-inside: avoid; padding-top: 8px; padding-bottom: 8px; width: 100%;">
                    <div style="text-align: center; margin-top: 25px; font-size: 9px; color: #94a3b8;">
                        Generado automáticamente el ${new Date().toLocaleDateString()}
                    </div>
                </div>
            </div>
        `;

        // Render configuration directly in memory without injecting it
        const element = document.createElement('div');
        element.innerHTML = pdfContent;

        // Give images a small tick to load safely in memory before painting
        setTimeout(() => {
            // Generate dynamic filename with Tuesday's date
            const today = new Date();
            const dayOfWeek = today.getDay();
            const daysSinceWednesday = (dayOfWeek >= 3) ? (dayOfWeek - 3) : (dayOfWeek + 4);
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - daysSinceWednesday);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // Weekly Tuesday

            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            const endDay = endDate.getDate();
            const endMonth = months[endDate.getMonth()];
            const year = endDate.getFullYear();

            // Generate timestamp for versioning (HHMM) to act as vX if downloaded multiple times
            const hours = String(today.getHours()).padStart(2, '0');
            const minutes = String(today.getMinutes()).padStart(2, '0');

            const dynamicFilename = `Minuta Reunion Semanal Operaciones KOF ${endDay} de ${endMonth} de ${year} v1.pdf`;

            // Invoke Html2Pdf Options
            const opt = {
                margin: [0.45, 0.3, 0.45, 0.3], // Margin top & bottom at 0.45in to prevent cutoff
                filename: dynamicFilename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, allowTaint: true, letterRendering: true, logging: false },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                pagebreak: { mode: ['css', 'legacy'], avoid: ['.pdf-no-break'] }
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













