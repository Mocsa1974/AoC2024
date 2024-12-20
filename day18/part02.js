const fs = require('fs');
const bytes = fs.readFileSync('./day18/input.txt','utf-8').split('\r\n').map(m=> {
    let [y,x] = m.split(',');
    return {
        x:+x,
        y:+y
    }
})
let height = JSON.parse(JSON.stringify(bytes)).sort((a,b) => b.x-a.x)[0].x +3;
let width = JSON.parse(JSON.stringify(bytes)).sort((a,b) => b.y-a.y)[0].y +3;
let map = new Array(height).fill().map(m=>new Array(width).fill('.'));
const start = {
    x:1,
    y:1
}
const end = {
    x:map.length-2,
    y:map[0].length - 2
}
const get_neighbours = (x,y) => {
    let result = [];
    if (map[x-1][y] !== '#') result.push({
        x:x-1,
        y:y
    });
    if (map[x+1][y] !== '#') result.push({
        x:x+1,
        y:y
    });
    if (map[x][y-1] !== '#') result.push({
        x:x,
        y:y-1
    });
    if (map[x][y+1] !== '#') result.push({
        x:x,
        y:y+1
    });
    return result;

}
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
            return current.path.length;
        }
        const neighbours = get_neighbours(current.x,current.y);
        for (let neighbour of neighbours) {
            if (!visited.has(neighbour.x+'_'+neighbour.y)) {
                queue.push({
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


for (let i=0;i<map.length;i++) {
    for (let j=0;j<map[0].length;j++) {
        if (i===0 || i=== map.length-1 || j===0 || j=== map[0].length-1) map[i][j] = '#';
    }
}
for (let i=0;i<bytes.length;i++) {
    map[bytes[i].x+1][bytes[i].y+1] = '#'
    const result = bfs(start,end);
    if ( result === null) {
        console.log(bytes[i].y+','+bytes[i].x);
        return;
    }
}

