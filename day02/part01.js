const fs = require("fs");
const lines = fs.readFileSync("./day02/input.txt", "utf-8").split("\r\n");
/* const diffs = [1, 2, 3];
console.log(
  lines
    .map((m) => {
      const numbers = m.split(" ");
      let sign = 0;
      let safe = true;
      for (let i = 0; i < numbers.length - 1; i++) {
        if (sign) {
          if (
            diffs.indexOf(Math.abs(+numbers[i] - +numbers[i + 1])) === -1 ||
            +numbers[i] - +numbers[i + 1] ===
              Math.abs(+numbers[i] - +numbers[i + 1]) * sign
          ) {
            safe = false;
            break;
          }
        } else {
          if (diffs.indexOf(Math.abs(+numbers[i] - +numbers[i + 1])) === -1) {
            safe = false;
            break;
          }
          sign = +numbers[i] - +numbers[i + 1] > 0 ? -1 : 1;
        }
      }
      return safe;
    })
    .filter((f) => f === true).length
);
 */function isReportSafe(report) {
  const levels = report.split(" ").map(Number);

  let increasing = true;
  let decreasing = true;

  for (let i = 1; i < levels.length; i++) {
      const diff = levels[i] - levels[i - 1];

      if (diff < 1 || diff > 3) {
          return false; // Az eltérés nincs a [1, 3] tartományban
      }

      if (diff > 0) {
          decreasing = false; // Nem csökken
      } else if (diff < 0) {
          increasing = false; // Nem növekszik
      }
  }

  return increasing || decreasing; // Csak akkor biztonságos, ha végig növekszik vagy csökken
}

function countSafeReports(data) {
  
  return data.filter(isReportSafe).length;
}
console.log(countSafeReports(lines))