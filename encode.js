const fs = require('fs');
const path = require('path');

const imgDir = 'img';
const jsFile = 'js/image-data.js';

const files = fs.readdirSync(imgDir).filter(f => f.startsWith('ref_') && f.endsWith('.png'));

let data = 'window.DashboardImages = {\n';

files.forEach(file => {
    const filePath = path.join(imgDir, file);
    const base64 = fs.readFileSync(filePath, 'base64');
    const key = file.replace('.png', '');
    data += `    "${key}":  "data:image/png;base64,${base64}",\n`;
});

data += '};\n';
fs.writeFileSync(jsFile, data);
console.log('Successfully embedded ' + files.length + ' images into image-data.js');
