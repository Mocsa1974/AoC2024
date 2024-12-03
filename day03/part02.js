let processing = true;
const fs = require("fs");
console.log(fs.readFileSync("./day03/input.txt", "utf-8")
.match(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g)
.map((m2) => {
    if (m2 === "don't()") {
        processing = false;
        return 0;
    }
    if (m2 === "do()") {
        processing = true;
        return 0;
    }
    if (processing) {
        const numbers = m2.replace(/[mul()]/g, "").split(",");
        return +numbers[0] * +numbers[1];
    
    } else return 0;
  }).reduce((acc, curr) => acc + curr, 0));