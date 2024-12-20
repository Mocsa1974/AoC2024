const find_first_empty_up = () => {
    let x = robot.x-1;
    while (map[x]?.[robot.y] && map[x][robot.y] !== '.' && map[x][robot.y] !== '#') {
        x--;
    }
    return map[x]?.[robot.y] === '.' ? x : null;
}
const find_first_empty_down = () => {
    let x = robot.x + 1;
    while (map[x]?.[robot.y] && map[x][robot.y] !== '.' && map[x][robot.y] !== '#') {
        x++;
    }
    return map[x]?.[robot.y] === '.' ? x : null;
}
const find_first_empty_left = () => {
    let y = robot.y-1;
    while (map[robot.x]?.[y] && map[robot.x][y] !== '.' && map[robot.x][y] !== '#') {
        y--;
    }
    return map[robot.x]?.[y] === '.'? y : null;
}
const find_first_empty_right = () => {
    let y = robot.y + 1;
    while (map[robot.x]?.[y] && map[robot.x][y] !== '.'  && map[robot.x][y] !== '#') {
        y++;
    }
    return map[robot.x]?.[y] === '.' ? y : null;
}

const fs = require('fs');
const lines = fs.readFileSync('./day15/example3.txt','utf-8').split('\r\n\r\n');
let map = lines[0].split('\r\n').map((m,x)=> {
    return m.split('')
});
let robot = {
    x:0,
    y:0
};
let offset =0;
let new_map = JSON.parse(JSON.stringify(map));
for (let i=0;i<map.length;i++) {
    offset = 0;
    for (let j=0;j<map[0].length;j++) {
        if (new_map[i][j+offset] === '#') new_map[i].splice(j+1+offset,0,'#');
        if (new_map[i][j+offset] === '.') new_map[i].splice(j+1+offset,0,'.');
        if (new_map[i][j+offset] === '@') new_map[i].splice(j+1+offset,0,'.');
        if (new_map[i][j+offset] === 'O') {
            new_map[i][j+offset] = '[';
            new_map[i].splice(j+1+offset,0,']');
        }
        offset++;

    }
}
map = JSON.parse(JSON.stringify(new_map));
for (let i=0;i<map.length;i++) {
    for (let j=0;j<map[0].length;j++) {
        if (map[i][j] ==='@') {
            robot.x = i;
            robot.y = j;
            break;
            
        }
    }
}
map[robot.x][robot.y] = '.';
const moves = lines[1].split('\r\n').join('');
for (let i=0;i<moves.length;i++) {
    switch (moves[i]) {
        case '^':
            if (map[robot.x-1][robot.y] === '.') {
                robot.x--;
                map[robot.x][robot.y] = '.';
            } else {
                if (map[robot.x-1][robot.y] === ']') {
                    next_pos = find_first_empty_up();
                    if (next_pos !== null) {
                        map[next_pos][robot.y] = 'O'
                        robot.x--;
                        map[robot.x][robot.y] = '.';
    
                    }
                }
            }
            break;
        case '>':
            if (map[robot.x][robot.y+1] === '.') {
                robot.y++;
                map[robot.x][robot.y] = '.';
            } else {
                if (map[robot.x][robot.y+1] === '[') {
                    next_pos = find_first_empty_right();
                    if (next_pos != null) {
                        for (let k=0;k<next_pos-robot.y+1;k++) {
                            map[robot.x][next_pos-k] = map[robot.x][next_pos-k-1]
                        }
                        robot.y++;
                        map[robot.x][robot.y] = '.';
    
                    }
                }
            }
            break;
        case 'v':
            if (map[robot.x+1][robot.y] === '.') {
                robot.x++;
                map[robot.x][robot.y] = '.';
            } else {
                if (map[robot.x+1][robot.y] === 'O') {
                    next_pos = find_first_empty_down();
                    if (next_pos != null) {
                    map[next_pos][robot.y] = 'O'
                    robot.x++;
                    map[robot.x][robot.y] = '.';
                    }
                }
            }
            break;
        case '<':
            if (map[robot.x][robot.y-1] === '.') {
                robot.y--;
                map[robot.x][robot.y] = '.';
            } else {
                if (map[robot.x][robot.y-1] === ']') {
                    next_pos = find_first_empty_left();
                    if (next_pos != null) {
                        for (let k=0;k<robot.y-next_pos-1;k++) {
                            map[robot.x][k+next_pos] = map[robot.x][k+next_pos+1]
                        }
                        robot.y--;
                        map[robot.x][robot.y] = '.';
   
                    }
                }
            }
            break;
        }
}
let result = [];
for (let i=0;i<map.length;i++) {
    for (let j=0;j<map[0].length;j++) {
        if (map[i][j] === 'O') {
            result.push(i*100 + j);
        }
    }
}
console.log(result.reduce((acc,curr) => acc+curr,0));