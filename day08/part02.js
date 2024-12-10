const fs = require("fs");
const city = fs
  .readFileSync("./day08/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => m.split(""));
let antennas = [];
let antinodes = [];
for (let row = 0; row < city.length; row++) {
  for (let col = 0; col < city[row].length; col++) {
    city[row][col].match(/[A-Za-z0-9]/g)?.length
      ? antennas.push({
          row: row,
          col: col,
          frequency: city[row][col],
        })
      : null;
  }
}
for (let i = 0; i < antennas.length - 1; i++) {
  for (let j = i + 1; j < antennas.length; j++) {
    if (antennas[i].frequency === antennas[j].frequency) {
      diff_row = antennas[j].row - antennas[i].row;
      diff_col = antennas[j].col - antennas[i].col;
      antinodes.push({
        row: antennas[i].row,
        col: antennas[i].col,
      });
      antinodes.push({
        row: antennas[j].row,
        col: antennas[j].col,
      });

      if (diff_col < 0) {
        let k = 1;
        new_row = antennas[i].row - (diff_row * k);
        new_col = antennas[i].col - (diff_col * k);
        while ((new_col >= 0 && new_col<city[0].length && new_row >= 0 && new_row<city.length)) {
          if (!antinodes.find((f) => f.row === new_row && f.col === new_col))
            antinodes.push({
              row: new_row ,
              col: new_col,
            });
          k++;
          new_row = antennas[i].row - (diff_row * k);
          new_col = antennas[i].col - (diff_col * k);
        }
        k = 1;
        new_row = antennas[j].row + (diff_row * k);
        new_col = antennas[j].col + (diff_col * k);
        while ((new_col >= 0 && new_col<city[0].length && new_row >= 0 && new_row<city.length)) {
            if (!antinodes.find((f) => f.row === new_row && f.col === new_col))
            antinodes.push({
              row: new_row,
              col: new_col,
            });
          k++;
          new_row = antennas[j].row + (diff_row * k);
          new_col = antennas[j].col + (diff_col * k);
        }

      } else {
        let k = 1;
        new_row = antennas[i].row - (diff_row * k);
        new_col = antennas[i].col - (diff_col * k);
        while ((new_col >= 0 && new_col<city[0].length && new_row >= 0 && new_row<city.length)) {
            if (!antinodes.find((f) => f.row === new_row && f.col === new_col))
            antinodes.push({
              row: new_row,
              col: new_col,
            });
          k++;
          new_row = antennas[i].row - (diff_row * k);
          new_col = antennas[i].col - (diff_col * k);
        }
        k = 1;
        new_row = antennas[j].row + (diff_row * k);
        new_col = antennas[j].col + (diff_col * k);
        while ((new_col >= 0 && new_col<city[0].length && new_row >= 0 && new_row<city.length)) {
            if (!antinodes.find((f) => f.row === new_row && f.col === new_col))
            antinodes.push({
              row: new_row,
              col: new_col,
            });
          k++;
          new_row = antennas[j].row + (diff_row * k);
          new_col = antennas[j].col + (diff_col * k);
        }

      }
    }
  }
}
console.log(Array.from(new Set(antinodes.map(m=>JSON.stringify(m)))).map(m=>JSON.parse(m)).length);
