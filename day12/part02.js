const fs = require("fs");
const garden = fs
  .readFileSync("./day12/input.txt", "utf-8")
  .split("\r\n")
  .map((m, row) => {
    return m.split("").map((m2, col) => {
      return {
        plant: m2,
        row: row,
        col: col,
        visited: false,
      };
    });
  });
let path = [];
const get_neighbours = (row, col) => {
  let result = [];
  garden[row - 1]?.[col]
    ? result.push({
        row: row - 1,
        col: col,
        plant: garden[row - 1][col],
        visited: garden[row - 1][col].visited,
      })
    : null;
  garden[row + 1]?.[col]
    ? result.push({
        row: row + 1,
        col: col,
        plant: garden[row + 1][col],
        visited: garden[row + 1][col].visited,
      })
    : null;
  garden[row]?.[col - 1]
    ? result.push({
        row: row,
        col: col - 1,
        plant: garden[row][col - 1],
        visited: garden[row][col - 1].visited,
      })
    : null;
  garden[row]?.[col + 1]
    ? result.push({
        row: row,
        col: col + 1,
        plant: garden[row][col + 1],
        visited: garden[row][col + 1].visited,
      })
    : null;
  return result;
};

let areas = [];
for (let i = 0; i < garden.length; i++) {
  for (let j = 0; j < garden[i].length; j++) {
    let plant = garden[i][j].plant;
    let tmp = [];
    path = [
      {
        row: i,
        col: j,
        plant: garden[i][j].plant,
        visited: true,
      },
    ];
    if (!garden[i][j].visited) {
      tmp.push({
        row: i,
        col: j,
      });
    }
    while (path.length > 0) {
      let current = path.pop();
      garden[current.row][current.col].visited = true;
      let neighbours = get_neighbours(current.row, current.col);
      for (let neighbour of neighbours) {
        if (neighbour.plant.plant === plant && !neighbour.visited) {
          if (
            tmp.filter((f) => f.row === neighbour.row && f.col == neighbour.col)
              .length === 0
          )
            tmp.push({
              row: neighbour.row,
              col: neighbour.col,
            });
          path.push({
            row: neighbour.row,
            col: neighbour.col,
            plant: plant,
          });
        }
      }
    }
    areas.push({
      plant: plant,
      values: tmp,
    });
  }
}
const b = areas
  .filter((f) => f.values.length !== 0).sort((a,b)=> a.row === b.row ? b.col - a.col : a.row - b.row)
  .map((m) => {
    let borders = [];
    m.values.map((m2) => {
      if (m.values.filter((f) => f.row === m2.row - 1 && f.col === m2.col).length === 0)
        borders.push({
          row: m2.row - 1,
          col: m2.col,
          type: "top",
        });
      if (m.values.filter((f) => f.row === m2.row + 1 && f.col === m2.col).length === 0)
        borders.push({
          row: m2.row + 1,
          col: m2.col,
          type: "bottom",
        });
      if (m.values.filter((f) => f.row === m2.row && f.col === m2.col - 1).length === 0)
        borders.push({
          row: m2.row,
          col: m2.col - 1,
          type: "left",
        });
      if (m.values.filter((f) => f.row === m2.row && f.col === m2.col + 1).length === 0)
        borders.push({
          row: m2.row,
          col: m2.col + 1,
          type: "right",
        });
        return borders;
    });
    return {
        borders:borders,
        plant:m.plant,
        count:m.values.length
    }
  });
count = 1;
let tmp = [];
let tmp2 = [];
let result = [];
for (let elem of b) {
    tmp = [];
    tmp2 = [];
    for (let border of elem.borders.sort((a,b)=>a.row === b.row ? a.col -b.col : a.row - b.row)) {
        if (tmp2.filter(f=>f.type === border.type).length === 0) {
            tmp2.push(border);
            tmp.push(border);
            continue;
        }
        switch (border.type) {
            case 'top':
                if (tmp.filter(f=>f.row === border.row && (f.col + 1 === border.col || f.col - 1 === border) && f.type === border.type).length === 0) tmp2.push(border);
                break;
            case 'bottom':
                if (tmp.filter(f=>f.row === border.row && (f.col +1 === border.col || f.col - 1 === border.col) && f.type === border.type).length === 0) tmp2.push(border);
                break;
            case 'left':
                if (tmp.filter(f=>f.col === border.col && (f.row + 1=== border.row || f.row + 1 === border.row) && f.type === border.type).length === 0) tmp2.push(border);
                break;
            case 'right':
                if (tmp.filter(f=>f.col === border.col && (f.row + 1 === border.row || f.row + 1 === border.row) && f.type === border.type).length === 0) tmp2.push(border);
                break;

        }
        tmp.push(border);
   
    }
    result.push({
        count:elem.count,
        borders:tmp2
    })

}
console.log(result.reduce((acc,curr)=>acc+(curr.count * curr.borders.length),0));