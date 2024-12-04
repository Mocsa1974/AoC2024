const fs = require("fs");
const letters = fs
  .readFileSync("./day04/input.txt", "utf-8")
  .split("\r\n")
  .map((m) => m.split(""));
const xmas = [];
for (let i = 0; i < letters.length; i++) {
  for (let j = 0; j < letters[i].length; j++) {
    if (letters[i][j] === "X") {
      xmas.push(
        "X" +
          (letters[i - 1]?.[j] ?? "") +
          (letters[i - 2]?.[j] ?? "") +
          (letters[i - 3]?.[j] ?? "")
      );
      xmas.push(
        "X" +
          (letters[i + 1]?.[j] ?? "") +
          (letters[i + 2]?.[j] ?? "") +
          (letters[i + 3]?.[j] ?? "")
      );
      xmas.push(
        "X" +
          (letters[i]?.[j + 1] ?? "") +
          (letters[i]?.[j + 2] ?? "") +
          (letters[i]?.[j + 3] ?? "")
      );
      xmas.push(
        "X" +
          (letters[i]?.[j - 1] ?? "") +
          (letters[i]?.[j - 2] ?? "") +
          (letters[i]?.[j - 3] ?? "")
      );

      xmas.push(
        "X" +
          (letters[i - 1]?.[j - 1] ?? "") +
          (letters[i - 2]?.[j - 2] ?? "") +
          (letters[i - 3]?.[j - 3] ?? "")
      );
      xmas.push(
        "X" +
          (letters[i + 1]?.[j + 1] ?? "") +
          (letters[i + 2]?.[j + 2] ?? "") +
          (letters[i + 3]?.[j + 3] ?? "")
      );
      xmas.push(
        "X" +
          (letters[i - 1]?.[j + 1] ?? "") +
          (letters[i - 2]?.[j + 2] ?? "") +
          (letters[i - 3]?.[j + 3] ?? "")
      );
      xmas.push(
        "X" +
          (letters[i + 1]?.[j - 1] ?? "") +
          (letters[i + 2]?.[j - 2] ?? "") +
          (letters[i + 3]?.[j - 3] ?? "")
      );
    }
  }
}
console.log(xmas.filter((f) => f === "XMAS").length);
