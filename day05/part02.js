const fs = require("fs");
const parts = fs.readFileSync("./day05/input.txt", "utf-8").split("\r\n\r\n");
const rules = parts[0].split("\r\n");
const pages = parts[1].split("\r\n");
const isValid = (str) => {
  while (true) {
    let page_list = str.split(",");
    let changed = false;
    for (let i = 0; i < page_list.length - 1; i++) {
      for (let j = i + 1; j < page_list.length; j++) {
        const pair = page_list[i] + "|" + page_list[j];
        if (rules.indexOf(pair) === -1) {
          const tmp = page_list[i];
          page_list[i] = page_list[j];
          page_list[j] = tmp;
          changed = true;
          continue;
        }
      }
    }
    return {
      changed: changed,
      page_list: page_list,
    };
  }
};
console.log(
  pages
    .map((m) => {
      res = isValid(m);
      return res.changed
        ? +res.page_list[Math.floor(res.page_list.length / 2)]
        : 0;
    })
    .reduce((acc, curr) => acc + curr, 0)
);
