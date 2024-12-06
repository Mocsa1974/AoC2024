const fs = require("fs");
const map = fs
  .readFileSync("./day06/input.txt", "utf-8")
  .split("\r\n")
  .map((m) =>
    m.split("").map((m2) => {
      return {
        char: m2,
        visited: false,
      };
    })
  );

let guard = {
  position: {
    x: 0,
    y: 0,
  },
  direction: "up",
  steps: 1,
};
const findStartPosition = () => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j].char === "^")
        return {
          x: i,
          y: j,
        };
    }
  }
};
const nextPositionValue = () => {
  switch (guard.direction) {
    case "up":
      return map[guard.position.x - 1]?.[guard.position.y]?.char ?? null;
    case "down":
      return map[guard.position.x + 1]?.[guard.position.y]?.char ?? null;
    case "left":
      return map[guard.position.x]?.[guard.position.y - 1]?.char ?? null;
    case "right":
      return map[guard.position.x]?.[guard.position.y + 1]?.char ?? null;
  }
};
const changePostion = () => {
  switch (guard.direction) {
    case "up":
      return "right";
    case "down":
      return "left";
    case "left":
      return "up";
    case "right":
      return "down";
  }
};
const step = () => {
  switch (guard.direction) {
    case "up":
      guard.position = { x: guard.position.x - 1, y: guard.position.y };
      break;
    case "down":
      guard.position = { x: guard.position.x + 1, y: guard.position.y };
      break;
    case "left":
      guard.position = { x: guard.position.x, y: guard.position.y - 1 };
      break;
    case "right":
      guard.position = { x: guard.position.x, y: guard.position.y + 1 };
      break;
  }
  if (!map[guard.position.x][guard.position.y].visited) {
    map[guard.position.x][guard.position.y].visited = true;
    guard.steps++;
  }
};
guard.position = findStartPosition();
map[guard.position.x][guard.position.y].char = ".";
map[guard.position.x][guard.position.y].visited = true;
while (nextPositionValue()) {
  if (nextPositionValue() === "#") guard.direction = changePostion();
  else step();
}

console.log(guard.steps);
