const fs = require("fs");
const lines = fs.readFileSync("./day19/input.txt", "utf-8").split("\r\n\r\n");
const patterns = lines[0].split(", ");
let designs = lines[1].split("\r\n");
let dict = new Map();
const is_valid = (design) => {
  if (new Date().getTime() > d+100) return false;
for (let pattern of patterns) {
  if (pattern === design) {
    return true;
  } else {
      if (design.indexOf(pattern)===0 && is_valid(design.substring(pattern.length))) return true;
  }
}
return false;
};

const is_valid2 = (design) => {
  if (dict.has(design)) return dict.get(design);
  let sum = 0;
  for (let pattern of patterns) {
    if (pattern === design) {
      sum++;
    } else {
        sum+=(design.indexOf(pattern)===0 && is_valid2(design.substring(pattern.length))) ;
    }
  }
  dict.set(design,sum)
  return sum;
};

console.log(designs
.map((m) => {
    d = new Date().getTime();

    return is_valid(m) ? m : null;
  })
  .filter(f=>f !== null)
  .map(m2=>{
    return is_valid2(m2);
  }).reduce((acc,curr) => acc+curr,0));


