const fs = require('fs');
const map = fs.readFileSync('./day16/input.txt','utf-8').split('\r\n').slice(0,1024).map(m=> m.split(''));
let height = map.length;
let width = map[0].length;
let start = {}
let end = {}
    for (let i=0;i<height;i++) {
        for (let j=0;j<width;j++) {
            if (map[i][j] === 'S') {
                start.x = i;
                start.y = j;
            }
            if (map[i][j] === 'E') {
                end.x = i;
                end.y = j;
            }
        }
    }
    console.log(start,end);
const get_neighbours = (x,y) => {
    let result = [];
    if (map[x-1][y] !== '#' && map[x-1][y] !== 'E') result.push({
        x:x-1,
        y:y
    });
    if (map[x+1][y] !== '#' && map[x-1][y] !== 'E') result.push({
        x:x+1,
        y:y
    });
    if (map[x][y-1] !== '#' && map[x-1][y] !== 'E') result.push({
        x:x,
        y:y-1
    });
    if (map[x][y+1] !== '#' && map[x-1][y] !== 'E') result.push({
        x:x,
        y:y+1
    });
    return result;

}
let found_path = [];
const bfs = (start, end) =>{
    const queue = [{
        x:start.x,
        y:start.y,
        path: []
        }];
    const visited = new Set();
    visited.add(start.x+'_'+start.y);

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.x === end.x && current.y === end.y) {
            found_path.push(current.path);
            continue;
        }
        const neighbours = get_neighbours(current.x,current.y);
        for (let neighbour of neighbours) {
            if (!visited.has(neighbour.x+'_'+neighbour.y)) {
                queue.unshift({
                    x:neighbour.x,
                    y:neighbour.y,
                    path:[...current.path,{x:neighbour.x,y:neighbour.y}]
                });
                    visited.add(neighbour.x+'_'+neighbour.y);
            }
        }
    }
   return null;
}
bfs(start,end);
console.log(found_path);