const fs = require("fs");
const letters = fs
  .readFileSync("./day04/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => m.split(""));
let count = 0;
for (let i = 0; i < letters.length; i++) {
  for (let j = 0; j < letters[i].length; j++) {
    const x1 =
      (letters[i - 1]?.[j - 1] ?? "") +
      (letters[i]?.[j] ?? "") +
      (letters[i + 1]?.[j + 1] ?? "");
    const x2 =
      (letters[i + 1]?.[j - 1] ?? "") +
      (letters[i]?.[j] ?? "") +
      (letters[i - 1]?.[j + 1] ?? "");
    count +=
      (x1 === "MAS" || x1 === "SAM") && (x2 === "MAS" || x2 === "SAM") ? 1 : 0;
  }
}
console.log(count);
