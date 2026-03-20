const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // Added for image compression

(async () => {
    // Extract arguments passed from the GitHub Action Payload
    const payloadString = process.env.PAYLOAD;
    if (!payloadString) {
        console.error("No payload found!");
        process.exit(1);
    }

    let payload;
    try {
        payload = JSON.parse(payloadString);
    } catch (e) {
        console.error("Error parsing JSON payload:", e);
        process.exit(1);
    }
    console.log("Receiving Payload:", payload);

    // Read dashboard data
    const dataPath = path.join(__dirname, '../dashboard_data.json');

    // --- 1. Create Backup ---
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }
    const dateStrBackup = new Date().toISOString().split('T')[0];
    const backupPath = path.join(backupDir, `dashboard_data_backup_${dateStrBackup}_TIME_${Date.now()}.json`);
    try {
        if (fs.existsSync(dataPath)) {
            fs.copyFileSync(dataPath, backupPath);
            console.log(`Backup created at ${backupPath}`);
        }
    } catch (err) {
        console.warn("Could not create backup:", err);
    }

    let rawData;
    try {
        rawData = fs.readFileSync(dataPath, 'utf8');
        if (rawData.charCodeAt(0) === 0xFEFF) {
            rawData = rawData.slice(1);
        }
    } catch (e) {
        console.error("Could not read dashboard_data.json:", e);
        process.exit(1);
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

    // Shift currentWeek down to prevWeek
    if (point.currentWeek && point.currentWeek.trim() !== "") {
        point.prevWeek = point.currentWeek;
    }

    // Format today's date for the new update (e.g. "19/3 - ")
    const today = new Date();
    const formattedDateStr = `${today.getDate()}/${today.getMonth() + 1} - `;

    // Set the new currentWeek
    const newCurrentWeek = payload.currentWeek ? payload.currentWeek.trim() : "Actualización provista sin detalles adicionales.";
    point.currentWeek = formattedDateStr + newCurrentWeek;

    // Update the other dynamic fields if they exist in the payload
    if (payload.status) point.status = payload.status;
    if (payload.actionItem) point.actionItem = payload.actionItem;
    if (payload.actionOwner) point.actionOwner = payload.actionOwner;
    if (payload.commitDate) point.commitDate = payload.commitDate;
    
    // --- 3. Process Images ---
    if (payload.imageCount !== undefined) {
        point.imageCount = parseInt(payload.imageCount);
        const imgFolder = path.join(__dirname, '../img');
        for (let i = 1; i <= point.imageCount; i++) {
            const rawName = path.join(imgFolder, `ref_${payload.id_string}_${i}.png`);
            const cleanName = path.join(imgFolder, `ref_${pointId}_${i}.png`);
            
            if (fs.existsSync(rawName)) {
                try {
                    await sharp(rawName)
                        .resize({ width: 1024, withoutEnlargement: true })
                        .png({ quality: 80, compressionLevel: 8 })
                        .toFile(cleanName);
                    
                    fs.unlinkSync(rawName); // Remove the original raw image
                    console.log(`Successfully processed and compressed image to ${path.basename(cleanName)}`);
                } catch (err) {
                    console.error(`Error compressing image ${rawName}, falling back to rename:`, err);
                    // Fallback rename if sharp fails
                    if (fs.existsSync(cleanName)) fs.unlinkSync(cleanName);
                    fs.renameSync(rawName, cleanName);
                }
            } else if (!fs.existsSync(cleanName)) {
                console.warn(`Expected image missing: ${rawName}`);
            }
        }
    }

    // Save back to file cleanly
    fs.writeFileSync(dataPath, JSON.stringify(dashboardData, null, 4), 'utf8');
    console.log(`Successfully updated point ID ${pointId} data in dashboard_data.json!`);

})();
