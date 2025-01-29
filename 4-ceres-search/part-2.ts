const input = Bun.file(`${import.meta.dir}/input.txt`);
const content = await input.text();
const lines = content.split('\n');
const numRows = lines.length;
const numCols = lines[0].length;

function hasPattern(i: number, j: number): boolean {
  if (i < 0) return false;
  if (j < 0) return false;
  if (i > numRows - 3) return false;
  if (j > numCols - 3) return false;
  if (lines[i + 1][j + 1] !== 'A') return false;
  const diagonal1 = lines[i][j] + lines[i + 2][j + 2];
  const diagonal2 = lines[i + 2][j] + lines[i][j + 2];

  if ([diagonal1, diagonal2].every((str) => str === 'MS' || str === 'SM')) {
    return true;
  }

  return false;
}

let sum = 0;
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    if (hasPattern(i, j)) sum++;
  }
}

console.log(sum);
