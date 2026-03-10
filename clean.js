const fs = require('fs');
let data = fs.readFileSync('js/image-data.js', 'utf8');
data = data.replace(/"ref_18_\d+"\s*:\s*"[^"]+",?\r?\n?/g, '');
fs.writeFileSync('js/image-data.js', data);
