const input = Bun.file(`${import.meta.dir}/input.txt`);
const content = await input.text();
const lines = content.split('\n');
const numRows = lines.length;
const numCols = lines[0].length;

let sum = 0;

function addOccurrences(str: string) {
  const o1 = str.match(/XMAS/g)?.length || 0;
  const o2 = str.match(/SAMX/g)?.length || 0;
  sum += o1 + o2;
}

// horizontal search
for (const line of lines) {
  addOccurrences(line);
}

// vertical search
for (let j = 0; j < numCols; j++) {
  let col = '';
  for (let i = 0; i < numRows; i++) {
    col += lines[i][j];
  }
  addOccurrences(col);
}

// decreasing diagonals ↘️
let diagonalStartingPoints: [number, number][] = [];
for (let j = 0; j < numCols; j++) {
  diagonalStartingPoints.push([0, j]);
}
for (let i = 1; i < numRows; i++) {
  diagonalStartingPoints.push([i, 0]);
}

for (const [x, y] of diagonalStartingPoints) {
  let diagonal = '';
  let i = x,
    j = y;
  while (i < numRows && j < numCols) {
    diagonal += lines[i][j];
    i++;
    j++;
  }
  addOccurrences(diagonal);
}

// increasing diagonals ↗️
diagonalStartingPoints = [];
for (let j = 0; j < numCols; j++) {
  diagonalStartingPoints.push([numRows - 1, j]);
}
for (let i = 0; i < numRows - 1; i++) {
  diagonalStartingPoints.push([i, 0]);
}

for (const [x, y] of diagonalStartingPoints) {
  let diagonal = '';
  let i = x,
    j = y;
  while (i >= 0 && j < numCols) {
    diagonal += lines[i][j];
    i--;
    j++;
  }
  addOccurrences(diagonal);
}

console.log(sum);
