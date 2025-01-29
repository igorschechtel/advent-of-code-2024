const input = Bun.file(`${import.meta.dir}/input.txt`);

const content = await input.text();
const reports = content.split('\n');

let count = 0;

for (const report of reports) {
  const levels = report.split(' ').map(Number);

  const isInc = levels[1] > levels[0];

  let countInvalid = 0;
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    // increasing
    if (isInc) {
      if (diff < 1 || diff > 3) {
        countInvalid++;
        if (countInvalid > 1) break;
      }
    }

    // decreasing
    else {
      if (diff > -1 || diff < -3) {
        countInvalid++;
        if (countInvalid > 1) break;
      }
    }
  }

  if (countInvalid <= 1) count++;
}

console.log(`valid reports = ${count}`);
