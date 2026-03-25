const fs = require('fs');
const pdf = require('pdf-parse');

const filename = process.argv[2];
let dataBuffer = fs.readFileSync(filename);

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => console.error(err));
