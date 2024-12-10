const fs = require('fs');
let disk_map = fs.readFileSync('./day09/input.txt','utf-8');
let id = 0,is_file = true;
let block = disk_map.split('').reduce((acc,curr) => {
    if (is_file) {
        for (let i of "".padStart(+curr,id).split('')) {
            acc= acc.concat({
                number:+i,
                id:id
            })
        }
        id++;
    } else {
        for (let i of "".padStart(+curr,'.').split('')) {
            acc=acc.concat({
                number:'.',
                id:-1
            })
        }
    }
    is_file = !is_file;
    return acc;
},[]);
while (true) {
    let idx1=block.findIndex(f=>f.number ==='.');
    let idx2=block.findLastIndex(f=>!isNaN(+f.number));
    if (idx1>=idx2) break;
    block[idx1] = {number:block[idx2].number,id:block[idx2].id};
    block[idx2] = {number:'.',id:-1};
}
console.log(block.filter(f=>f.number !== '.').reduce((acc,curr,idx)=>acc+(idx*+curr.id),0));
