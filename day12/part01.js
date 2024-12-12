const fs = require("fs");
const garden = fs
  .readFileSync("./day12/example1.txt", "utf-8")
  .split("\r\n")
  .map((m,row) => {
    return m.split('').map((m2,col) => {
        return {
            plant:m2,
            row:row,
            col:col,
            visited:false
        }
    })
  });
let path = [];
const get_neighbours = (row, col) => {
  let result = [];
  garden[row - 1]?.[col]
    ? result.push({
        row: row - 1,
        col: col,
        plant: garden[row - 1][col],
        visited:garden[row - 1][col].visited
      })
    : null;
  garden[row + 1]?.[col]
    ? result.push({
        row: row + 1,
        col: col,
        plant: garden[row + 1][col],
        visited:garden[row + 1][col].visited
      })
    : null;
  garden[row]?.[col - 1]
    ? result.push({
        row: row,
        col: col - 1,
        plant: garden[row][col - 1],
        visited:garden[row][col -1].visited
      })
    : null;
  garden[row]?.[col + 1]
    ? result.push({
        row: row,
        col: col + 1,
        plant: garden[row][col + 1],
        visited:garden[row][col+1].visited
      })
    : null;
  return result;
};

let areas = [];
for (let i=0;i<garden.length;i++) {
    for (let j=0;j<garden[i].length;j++) {
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
              if (tmp.filter(f=>f.row === neighbour.row && f.col == neighbour.col).length === 0)
              tmp.push({
                  row:neighbour.row,
                  col:neighbour.col
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
          plant:plant,
          values: tmp}
      );
    }
}
console.log(areas.filter(f=>f.values.length !==0));
console.log(areas.filter(f=>f.values.length !==0).map(m=> {
    return m.values.length * (m.values.map(m2 => {
        return 4 - (m.values.filter(f=>(f.row === m2.row - 1 && f.col === m2.col) || (f.row === m2.row + 1 && f.col === m2.col) || (f.row === m2.row && f.col === m2.col - 1) || (f.row === m2.row && f.col === m2.col + 1)).length);
    })).reduce((acc,curr) => acc+curr,0);
}).reduce((acc,curr)=>acc+curr,0));
