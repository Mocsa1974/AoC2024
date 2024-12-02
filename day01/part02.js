const fs = require("fs");
const lines = fs.readFileSync(".\\input.txt", "utf-8").split("\r\n");
const list1 = [];
const list2 = [];
for (let line of lines) {
  const numbers = line.split("   ");
  list1.push(+numbers[0]);
  list2.push(+numbers[1]);
}
console.log(
  list1
    .map((m) => m * list2.filter((f) => f == m).length)
    .reduce((acc, curr) => acc + curr, 0)
);
