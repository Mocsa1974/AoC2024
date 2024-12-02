const fs = require("fs");
const lines = fs.readFileSync(".\\input.txt", "utf-8").split("\r\n");
const diffs = [1, 2, 3];
const isSafe = (number) => {
  const numbers = number.split(" ");
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
};
console.log(
  lines
    .map((m) => {
      if (isSafe(m)) return true;
      else {
        const numbers = m.split(" ");
        for (let i = 0; i < numbers.length; i++) {
          let n = JSON.parse(JSON.stringify(numbers));
          n.splice(i, 1);
          if (isSafe(n.join(" "))) return true;
        }
      }
    })
    .filter((f) => f === true).length
);
