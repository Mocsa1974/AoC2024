const fs = require("fs");
let initial_list = fs
  .readFileSync("./day11/input.txt", "utf-8")
  .split(" ")
  .map(Number);
const is_even = (number) => {
  return number.toString().length % 2 === 0;
};
let stones = new Map();
for (let stone of initial_list) stones.set(stone, 1);
for (let i = 0; i < 75; i++) {
  tmp = new Map();
  for (const [key,value] of stones.entries()) {
    if (key === 0) tmp.get(1) ? tmp.set(1, tmp.get(1) + value) : tmp.set(1, value);
    else if (is_even(key)) {
      const str = key.toString();
      const first = +str.substring(0, str.length / 2);
      const last = +str.substring(str.length / 2);
      tmp.get(first)
        ? tmp.set(first, tmp.get(first) + value)
        : tmp.set(first, value);
      tmp.get(last) ? tmp.set(last, tmp.get(last) + value) : tmp.set(last, value);
    } else
      tmp.get(key * 2024)
        ? tmp.set(key * 2024, tmp.get(key * 2024) + value)
        : tmp.set(key * 2024, value);
  }
  stones.clear();
  for (const [key, value] of tmp.entries()) {
    stones.set(key, value);
  }
}
console.log(Array.from(stones.values()).reduce((acc, curr) => acc + curr, 0));
