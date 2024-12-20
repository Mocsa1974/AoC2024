const fs = require("fs");
const lines = fs.readFileSync("./day17/input.txt", "utf-8").split("\r\n\r\n");
const m = lines[0].match(/(\d+)?(\d+)?(\d+)?/g);
const numbers = m.filter((f) => f !== "").map(Number);
let regA = numbers[0];
let regB = numbers[1];
let regC = numbers[2];
let inst_p = 0;
const m2 = lines[1].match(/(\d+)?(\d+)?(\d+)?/g);
const program = m2.filter((f) => f !== "").map(Number);
const output = [];
let move_pointer = true;
const instruction = (inst, operand) => {
    move_pointer = true;

  switch (inst) {
    case 0:
        if (operand > 3) {
            if (operand === 4) operand = regA;
            else if (operand === 5) operand = regB;
            else if (operand === 6) operand = regC;
          }
        
      regA = Math.floor(regA / Math.pow(2,operand));
      break;
    case 1:
      regB = regB ^ operand;
      break;
    case 2:
        if (operand > 3) {
            if (operand === 4) operand = regA;
            else if (operand === 5) operand = regB;
            else if (operand === 6) operand = regC;
          }
        
      regB = operand % 8;
      break;
    case 3:
      if (regA !== 0) {
        inst_p = operand;
        move_pointer = false;
      }
      break;
    case 4:
      regB = regB ^ regC;
      break;
    case 5:
        if (operand > 3) {
            if (operand === 4) operand = regA;
            else if (operand === 5) operand = regB;
            else if (operand === 6) operand = regC;
          }
        
      output.push(operand % 8);
      break;
    case 6:
        if (operand > 3) {
            if (operand === 4) operand = regA;
            else if (operand === 5) operand = regB;
            else if (operand === 6) operand = regC;
          }
        
      regB = Math.floor(regA / Math.pow(2,operand));
      break;
    case 7:
        if (operand > 3) {
            if (operand === 4) operand = regA;
            else if (operand === 5) operand = regB;
            else if (operand === 6) operand = regC;
          }
        
      regC = Math.floor(regA / Math.pow(2,operand));
      break;
  }
};
while (inst_p !== program.length) {
    instruction(program[inst_p],program[inst_p+1]);
    if (move_pointer) inst_p+=2;
}
console.log(output.join(','))