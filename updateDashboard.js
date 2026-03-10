const fs = require('fs');
const path = require('path');

const ocrContent = fs.readFileSync('c:/Users/eaguilarher2/Documents/Antigravity/kof-sap-dashboard/ocr.txt', 'utf-8');
const lines = ocrContent.split('\n');

const updates = {};
for (const line of lines) {
    if (!line.trim().startsWith('|') || line.includes('Punto | Tipo')) continue;
    const parts = line.split('|').map(s => s.trim());
    if (parts.length >= 7) { // empty, Punto, Tipo, A cargo, Estatus, Ant, Act, empty
        const puntoCol = parts[1];
        const statusCol = parts[4];
        const prevCol = parts[5];
        const actCol = parts[6];

        const match = puntoCol.match(/^(\d+)\s*-/);
        if (match) {
            const id = match[1];
            updates[id] = {
                status: statusCol,
                prevWeek: prevCol,
                currentWeek: actCol
            };
        }
    }
}

// Update app.js
const appJsPath = 'c:/Users/eaguilarher2/Documents/Antigravity/kof-sap-dashboard/js/app.js';
let appJsContent = fs.readFileSync(appJsPath, 'utf-8');

// The array goes from const dashboardData = [ to ];
// We will replace the values using regex or simple parsing
for (const id in updates) {
    const { status, prevWeek, currentWeek } = updates[id];

    // Simple regex replacement per object (since id is unique in the file)
    // Finding the block for this id:
    const idRegex = new RegExp(`(id:\\s*['"]${id}['"][^}]*?status:\\s*['"])([^'"]*)(['"])`, 'g');
    appJsContent = appJsContent.replace(idRegex, `$1${status.replace(/'/g, "\\'")}$3`);

    const prevRegex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?prevWeek:\\s*['"])([^'"]*)(['"])`, 'g');
    appJsContent = appJsContent.replace(prevRegex, `$1${prevWeek.replace(/'/g, "\\'")}$3`);

    const currRegex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?currentWeek:\\s*['"])([^'"]*)(['"])`, 'g');
    appJsContent = appJsContent.replace(currRegex, `$1${currentWeek.replace(/'/g, "\\'")}$3`);
}

fs.writeFileSync(appJsPath, appJsContent);
console.log('app.js updated');

// Update index.html
const indexHtmlPath = 'c:/Users/eaguilarher2/Documents/Antigravity/kof-sap-dashboard/index.html';
let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
indexHtmlContent = indexHtmlContent.replace('Periodo: 25 feb al 3 mar 2026', 'Periodo: 4 mar al 10 mar 2026');
fs.writeFileSync(indexHtmlPath, indexHtmlContent);
console.log('index.html updated');
