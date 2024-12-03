const fs = require("fs");
console.log(fs
    .readFileSync("./day03/input.txt", "utf-8")
    .split("\r\n")
    .map((m) => {
      const operations = m.match(/mul\(\d{1,3}\,\d{1,3}\)/g);
      return operations
        .map((m2) => {
          const numbers = m2.replace(/[mul()]/g, "").split(",");
          return +numbers[0] * +numbers[1];
        }).reduce((acc, curr) => acc + curr, 0);
    }).reduce((acc, curr) => acc + curr,0));

