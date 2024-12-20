const fs = require('fs');
const robots = fs.readFileSync('./day14/input.txt','utf-8').split('\r\n').map(m=>{
    line = m.match(/\-{0,1}\d+/g);
    return {
        pos_x:+line[1],
        pos_y:+line[0],
        vel_x:+line[3],
        vel_y:+line[2]
    }
});
const steps = 100;
const width = robots.sort((a,b) => b.pos_y-a.pos_y)[0].pos_y + 1;
const height = robots.sort((a,b) => b.pos_x-a.pos_x)[0].pos_x + 1;
const final_pos = robots.map(m=>{
    return {
        y:(m.pos_y + (m.vel_y + width)*steps) % width,
        x:(m.pos_x + (m.vel_x + height) * steps) % height
    }
})
let q1 = final_pos.filter(f=>f.x < Math.floor(height /2) && f.y < Math.floor(width /2))
let q2 = final_pos.filter(f=>f.x > Math.floor(height /2) && f.y < Math.floor(width /2))
let q3 = final_pos.filter(f=>f.x < Math.floor(height /2) && f.y > Math.floor(width /2))
let q4 = final_pos.filter(f=>f.x > Math.floor(height/2) && f.y > Math.floor(width /2))
console.log(q1.length*q2.length*q3.length*q4.length);
