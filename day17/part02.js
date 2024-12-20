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
let output = [];
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

      regA = Math.floor(regA / Math.pow(2, operand));
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
      if (output.join('') !== program.join('').substring(0,output.length)) return false;
      break;
    case 6:
      if (operand > 3) {
        if (operand === 4) operand = regA;
        else if (operand === 5) operand = regB;
        else if (operand === 6) operand = regC;
      }

      regB = Math.floor(regA / Math.pow(2, operand));
      break;
    case 7:
      if (operand > 3) {
        if (operand === 4) operand = regA;
        else if (operand === 5) operand = regB;
        else if (operand === 6) operand = regC;
      }

      regC = Math.floor(regA / Math.pow(2, operand));
      break;
  }
  return true;
};
let steps = 0;
regA_start = 35_184_372_088_832;
let regA_init = regA_start;
while (true) {
  inst_p = 0;
  output = [];
  regA = (regA_init + (steps * 8));//+ steps);
  while (inst_p <= program.length) {
    const res = instruction(program[inst_p], program[inst_p + 1]);
    if (!res) {
      break;
    }
    if (output.length > program.length) break;
    if (move_pointer) inst_p += 2;
  }
  if (output.join(',') === program.join(',')) {
    console.log((regA_init + steps),regA,steps);
    return;
  }
  steps++;
 
}
