const fs = require("fs");
const map = fs
  .readFileSync("./day10/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => m.split(""));
let path = [];
const get_neighbours = (row, col) => {
  let result = [];
  map[row - 1]?.[col]
    ? result.push({
        row: row - 1,
        col: col,
        number: +map[row - 1][col],
      })
    : null;
  map[row + 1]?.[col]
    ? result.push({
        row: row + 1,
        col: col,
        number: +map[row + 1][col],
      })
    : null;
  map[row]?.[col - 1]
    ? result.push({
        row: row,
        col: col - 1,
        number: +map[row][col - 1],
      })
    : null;
  map[row]?.[col + 1]
    ? result.push({
        row: row,
        col: col + 1,
        number: +map[row][col + 1],
      })
    : null;
  return result;
};
let zero_list = [];
for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    if (map[row][col] === "0") {
      zero_list.push({
        row: row,
        col: col,
      });
    }
  }
}
let sums = [];
for (p of zero_list) {
  path = [
    {
      row: p.row,
      col: p.col,
      number: 0,
    },
  ];
  founds = [];
  while (path.length > 0) {
    let current = path.pop();
    if (current.number === 9 && !founds.find(f=>f.row === current.row && f.col === current.col)) {
      founds.push({
        row:current.row,
        col:current.col
      });
    } 
      let neighbours = get_neighbours(current.row, current.col);
      for (let neighbour of neighbours) {
        if (neighbour.number === current.number + 1)
          path.push({
            row: neighbour.row,
            col: neighbour.col,
            number: neighbour.number,
          });
      }
  }
  sums.push(founds.length);
}
console.log(sums.reduce((acc,curr)=> acc+curr,0));

