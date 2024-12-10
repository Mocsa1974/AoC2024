const fs = require("fs");
const list = fs
  .readFileSync("./day07/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => {
    const parts = m.split(": ");
    const operands = parts[1].split(" ");
    return {
      value: +parts[0],
      operands: operands.map(Number),
    };
  });
const generateExpressions = (numbers) => {
  let results = [];

  const helper = (index, currentExpression) => {
    if (index === numbers.length) {
      results.push(currentExpression);
      return;
    }
    helper(index + 1, currentExpression + "+" + numbers[index]);
    helper(index + 1, currentExpression + "*" + numbers[index]);
  };
  helper(1, numbers[0].toString());
  return results;
};
const sum = [];
for (let line of list) {
  const s = generateExpressions(line.operands);
  for (let eval of s) {
    numbers = eval.match(/\d+/g);
    ops = eval.match(/(\+|\*)/g);
    let res = +numbers[0];
    for (let i=0;i<numbers.length-1;i++) {
        if (ops[i] === '+') res+=+numbers[i+1];
        if (ops[i] === '*') res*=+numbers[i+1];
    }
    if (res === line.value) {
        sum.push(line.value);
        break;
    }
  }
}
console.log(sum.reduce((acc,curr) =>acc+curr,0));