const fs = require('fs');
const initial_list = fs.readFileSync('./day11/input.txt','utf-8').split(' ').map(Number);
const is_even = (number) => {
    return number.toString().length % 2 ===0;
}
let stones = [];
let tmp = [];
stones = [...initial_list];
for (let i=0;i<25;i++) {
    tmp = [];
    for (let j=0;j<stones.length;j++) {
        if (stones[j] === 0) tmp.push(1);
        else if (is_even(stones[j])) {
            const str = stones[j].toString();
            tmp.push(+(str.substring(0,str.length / 2)));
            tmp.push(+(str.substring(str.length / 2)));
        } else  tmp.push(stones[j]*2024);
    }
    stones = [...tmp];
}
console.log(stones.length);