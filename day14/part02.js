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
let steps = 4400;
const width = robots.sort((a,b) => b.pos_y-a.pos_y)[0].pos_y + 1;
const height = robots.sort((a,b) => b.pos_x-a.pos_x)[0].pos_x + 1;
while (true) {
  let final_pos = robots.map(m=>{
    return {
        y:(m.pos_y + (m.vel_y + width)*steps) % width,
        x:(m.pos_x + (m.vel_x + height) * steps) % height
    }
  })
  let tree='';
  for (let i=0;i<height;i++) {
    tree='';
    for (let j=0;j<width;j++) {
      const isrobot = final_pos.filter(f=>f.x === i && f.y ===j).length !==0;
      if (isrobot) tree+='#';else tree+='.';
    }
    if (tree.indexOf('########')!==-1) {
      console.log(steps);
      return;    }
  }
  steps++;
}

