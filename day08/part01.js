const fs = require('fs');
const city = fs.readFileSync('./day08/input.txt','utf-8').split('\r\n').map(m=>m.split(''));
let antennas = [];
let antinodes = [];
for (let row=0;row<city.length;row++) {
    for (let col=0;col<city[row].length;col++) {
        city[row][col].match(/[A-Za-z0-9]/g)?.length ? antennas.push({
            row:row,
            col:col,
            frequency:city[row][col]
        }) : null;

    }
}
for (let i=0;i<antennas.length-1;i++) {
    for (let j=i+1;j<antennas.length;j++) {
        if (antennas[i].frequency === antennas[j].frequency) {
            diff_row = antennas[j].row - antennas[i].row;
            diff_col = antennas[i].col - antennas[j].col;
            if (diff_col<0) {
                if (!antinodes.find(f=>f.row === antennas[i].row-diff_row && f.col === antennas[i].col+diff_col))
                antinodes.push({
                    row:city[antennas[i].row-diff_row] ? antennas[i].row-diff_row : -1,
                    col:city[antennas[i].col+diff_col] ? antennas[i].col+diff_col : -1,
                    frequency:antennas[i].frequency
                });
                if (!antinodes.find(f=>f.row === antennas[j].row + diff_row && f.col === antennas[j].col - diff_col))
                    antinodes.push({
                    row:city[antennas[j].row+diff_row] ? antennas[j].row + diff_row : -1,
                    col:city[antennas[j].col - diff_col] ? antennas[j].col - diff_col : -1,
                    frequency:antennas[i].frequency
                })
            } else {
                if (!antinodes.find(f=>f.row === antennas[i].row - diff_row && f.col === antennas[i].col + diff_col))
                    antinodes.push({
                    row:city[antennas[i].row - diff_row] ? antennas[i].row - diff_row : -1,
                    col:city[antennas[i].col + diff_col] ? antennas[i].col + diff_col : -1,
                    frequency:antennas[i].frequency

                })
                if (!antinodes.find(f=>f.row === antennas[j].row + diff_row && f.col === antennas[j].col - diff_col))
                    antinodes.push({
                    row:city[antennas[j].row+diff_row] ? antennas[j].row + diff_row : -1,
                    col:city[antennas[j].col - diff_col] ? antennas[j].col - diff_col : -1,
                    frequency:antennas[i].frequency

                })
    
            }
    
        }
    }
}
console.log(antinodes.filter(f=>f.row !==-1 && f.col!==-1).length);

