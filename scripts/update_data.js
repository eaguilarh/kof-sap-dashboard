const fs = require('fs');
const path = require('path');

// Extract arguments passed from the GitHub Action Payload
const payloadString = process.env.PAYLOAD;
if (!payloadString) {
    console.error("No payload found!");
    process.exit(1);
}

const payload = JSON.parse(payloadString);
console.log("Receiving Payload:", payload);

// Read dashboard data
const dataPath = path.join(__dirname, '../dashboard_data.json');
let rawData = fs.readFileSync(dataPath, 'utf8');
if (rawData.charCodeAt(0) === 0xFEFF) {
    rawData = rawData.slice(1);
}
const dashboardData = JSON.parse(rawData);

// The payload id string from Forms might be "1. Archiving" or just "1"
const rawId = payload.id_string || "";
const matchId = rawId.match(/^(\d+)/);
if (!matchId) {
    console.error("Could not extract numerical ID from the input string:", rawId);
    process.exit(1);
}
const pointId = matchId[1];

// Find the corresponding point in the data array
const pointsArray = Array.isArray(dashboardData) ? dashboardData : (dashboardData.value || []);
const point = pointsArray.find(p => p.id == pointId || p.id === parseInt(pointId));
if (!point) {
    console.error("Point ID not found in dashboard_data.json:", pointId);
    process.exit(1);
}

// --- Perform automated updates ---

// 1. Shift currentWeek down to prevWeek
if (point.currentWeek && point.currentWeek.trim() !== "") {
    point.prevWeek = point.currentWeek;
}

// 2. Format today's date for the new update (e.g. "19/3 - ")
const today = new Date();
const dateStr = `${today.getDate()}/${today.getMonth() + 1} - `;

// 3. Set the new currentWeek
const newCurrentWeek = payload.currentWeek ? payload.currentWeek.trim() : "Actualización provista sin detalles adicionales.";
point.currentWeek = dateStr + newCurrentWeek;

// 4. Update the other dynamic fields if they exist in the payload
if (payload.status) point.status = payload.status;
if (payload.actionItem) point.actionItem = payload.actionItem;
if (payload.actionOwner) point.actionOwner = payload.actionOwner;
if (payload.commitDate) point.commitDate = payload.commitDate;
if (payload.imageCount !== undefined) {
    point.imageCount = parseInt(payload.imageCount);
    const imgFolder = path.join(__dirname, '../img');
    for (let i = 1; i <= point.imageCount; i++) {
        const rawName = path.join(imgFolder, `ref_${payload.id_string}_${i}.png`);
        const cleanName = path.join(imgFolder, `ref_${pointId}_${i}.png`);
        if (fs.existsSync(rawName)) {
            fs.renameSync(rawName, cleanName);
            console.log(`Renamed raw image to ref_${pointId}_${i}.png`);
        }
    }
}

// Save back to file cleanly
fs.writeFileSync(dataPath, JSON.stringify(dashboardData, null, 4), 'utf8');
console.log(`Successfully updated point ID ${pointId} data in dashboard_data.json!`);
