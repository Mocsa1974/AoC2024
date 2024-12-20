const fs = require("fs");
const lines = fs.readFileSync("./day19/input.txt", "utf-8").split("\r\n\r\n");
const patterns = lines[0].split(", ");
const designs = lines[1].split("\r\n");
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
console.log(
  designs.map((m) => {
    d = new Date().getTime();
    console.log(m);
    return is_valid(m);
  }).filter(f=>f === true)
);
