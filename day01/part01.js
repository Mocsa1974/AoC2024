const fs = require("fs");
const lines = fs.readFileSync(".\\input.txt", "utf-8").split("\r\n");
const list1 = [];
const list2 = [];
for (let line of lines) {
  const numbers = line.split("   ");
  list1.push(+numbers[0]);
  list2.push(+numbers[1]);
}
list1.sort();
list2.sort();
console.log(
  list1
    .map((m, i) => Math.abs(m - list2[i]))
    .reduce((acc, curr) => acc + curr, 0)
);
