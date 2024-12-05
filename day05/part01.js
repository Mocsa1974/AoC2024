const fs = require("fs");
const parts = fs.readFileSync("./day05/input.txt", "utf-8").split("\r\n\r\n");
const rules = parts[0].split("\r\n");
const pages = parts[1].split("\r\n");
console.log(
  pages
    .map((m) => {
      let valid = true;
      const page_list = m.split(",");
      for (let i = 0; i < page_list.length - 1; i++) {
        for (let j = i + 1; j < page_list.length; j++) {
          const pair = page_list[i] + "|" + page_list[j];
          valid = valid && rules.indexOf(pair) !== -1;
        }
      }
      return valid ? +page_list[Math.floor(page_list.length / 2)] : 0;
    })
    .reduce((acc, curr) => acc + curr, 0)
);
