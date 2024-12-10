const fs = require("fs");
let disk_map = fs.readFileSync("./day09/input.txt", "utf-8");
let id = 0;
const files = disk_map.split("").reduce((acc, curr, idx, arr) => {
  if (idx % 2 === 0 && idx !== arr.length) {
    acc.push({
      id: id,
      f_length: +curr,
      free: arr[idx + 1] ? +arr[idx + 1] : 0,
    });
    id++;
  }
  return acc;
}, []);

while (true) {
  lastIdx = files.findLastIndex((f) => !f.processed);
  if (lastIdx !== -1) {
    files[lastIdx].processed = true;
  } else break;
  firstIdx = files.findIndex((f) => f.free >= files[lastIdx].f_length);
  if (firstIdx !== -1 && lastIdx>0 && firstIdx<lastIdx) {
    files[lastIdx - 1].free+=files[lastIdx].f_length + files[lastIdx].free;
    let fi = files[firstIdx].free;
    files[firstIdx].free=0;
    const deleted = files.splice(lastIdx, 1);
    if (deleted) {
        deleted[0].free = fi - deleted[0].f_length;
        files.splice(firstIdx + 1, 0, ...deleted);
    
    }
  }
}
files.reduce((acc, curr) => acc + curr, "");
let position = 0;
sum = 0;
for (let file of files) {
  for (let i = 0; i < file.f_length; i++) {
    sum += file.id * position;
    position++;
  }
  if (file.free > 0) position += file.free;
}
console.log(sum);
