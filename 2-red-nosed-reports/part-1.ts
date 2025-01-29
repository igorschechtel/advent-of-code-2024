const input = Bun.file(`${import.meta.dir}/input.txt`);

const content = await input.text();
const reports = content.split('\n');

let count = 0;

for (const report of reports) {
  const levels = report.split(' ').map(Number);

  const isInc = levels[1] > levels[0];

  let isValid = true;
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    // increasing
    if (isInc) {
      if (diff < 1 || diff > 3) {
        isValid = false;
        break;
      }
    }

    // decreasing
    else {
      if (diff > -1 || diff < -3) {
        isValid = false;
        break;
      }
    }
  }

  if (isValid) count++;
}

console.log(`valid reports = ${count}`);
