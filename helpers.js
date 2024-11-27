const fs = require('fs');
exports.readLines = (file) => {
    return fs.readFileSync(file,'utf-8').split('\n\r')
}
exports.splitLine = (line,separator) => {
    return line.split(separator);
}
exports.readints = (line,separator) => {
    return splitLine(line,separator).map(m=>+m);
}