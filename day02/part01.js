const fs = require("fs");
const lines = fs.readFileSync(".\\input.txt", "utf-8").split("\r\n");
const diffs = [1, 2, 3];
console.log(
  lines
    .map((m) => {
      const numbers = m.split(" ");
      let sign = 0;
      let safe = true;
      for (let i = 0; i < numbers.length - 1; i++) {
        if (sign) {
          if (
            diffs.indexOf(Math.abs(+numbers[i] - +numbers[i + 1])) === -1 ||
            +numbers[i] - +numbers[i + 1] ===
              Math.abs(+numbers[i] - +numbers[i + 1]) * sign
          ) {
            safe = false;
            break;
          }
        } else {
          if (diffs.indexOf(Math.abs(+numbers[i] - +numbers[i + 1])) === -1) {
            safe = false;
            break;
          }
          sign = +numbers[i] - +numbers[i + 1] > 0 ? -1 : 1;
        }
      }
      return safe;
    })
    .filter((f) => f === true).length
);
