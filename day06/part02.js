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
  steps: 0,
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
      return new_map[guard.position.x - 1]?.[guard.position.y]?.char ?? null;
    case "down":
      return new_map[guard.position.x + 1]?.[guard.position.y]?.char ?? null;
    case "left":
      return new_map[guard.position.x]?.[guard.position.y - 1]?.char ?? null;
    case "right":
      return new_map[guard.position.x]?.[guard.position.y + 1]?.char ?? null;
  }
};
const changeDirection = () => {
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
  let r = true;
  if (!new_map[guard.position.x][guard.position.y].visited) {
    new_map[guard.position.x][guard.position.y].visited = true;
    new_map[guard.position.x][guard.position.y].direction = guard.direction;
  } else {
    if (
      new_map[guard.position.x][guard.position.y].direction === guard.direction
    ) {
      guard.steps++;
      r = false;
    }
  }

  return r;
};
let new_map = [];
let start_position = findStartPosition();
guard.position = start_position;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "#" || map[i][j] === "^") continue;
    new_map = JSON.parse(JSON.stringify(map));
    new_map[i][j] = {
      char: "#",
      visited: false,
    };
    let cont = true;
    guard.direction = "up";
    guard.position = start_position;
    new_map[guard.position.x][guard.position.y].visited = true;
    new_map[guard.position.x][guard.position.y].direction = "up";
    while (nextPositionValue() && cont) {
      if (nextPositionValue() === "#") guard.direction = changeDirection();
      else cont = step();
    }
  }
}
console.log(guard.steps);
