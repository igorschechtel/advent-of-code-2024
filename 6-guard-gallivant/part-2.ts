const input = Bun.file(`${import.meta.dir}/input.txt`);
const content = await input.text();

const lines = content.split('\n');

const rows = lines.length;
const cols = lines[0].length;

let i = lines.findIndex((line) => line.includes('^'));
let j = lines[i].indexOf('^');

const set = new Set<string>();

function isOutOfBounds(i: number, j: number) {
  if (i < 0 || j < 0) return true;
  if (i >= rows) return true;
  if (j >= cols) return true;
  return false;
}

function getNextCoordinates(i: number, j: number, dir: Direction) {
  if (dir === 'up') return [i - 1, j];
  if (dir === 'down') return [i + 1, j];
  if (dir === 'left') return [i, j - 1];
  return [i, j + 1];
}

function getNextDirection(dir: Direction) {
  if (dir === 'up') return 'right';
  if (dir === 'down') return 'left';
  if (dir === 'left') return 'up';
  return 'down';
}

function isLineVisited(i: number, j: number, dir: Direction) {
  while (true) {
    if (set.has(`${i},${j},${dir}`)) return true;
    const [nextI, nextJ] = getNextCoordinates(i, j, dir);
    if (isOutOfBounds(nextI, nextJ) || lines[nextI][nextJ] === '#')
      return false;
    i = nextI;
    j = nextJ;
  }
}

type Direction = 'up' | 'right' | 'down' | 'left';
let dir: Direction = 'up';

let count = 0;

while (true) {
  set.add(`${i},${j},${dir}`);
  const [nextI, nextJ] = getNextCoordinates(i, j, dir);
  if (isOutOfBounds(nextI, nextJ)) break;
  const isObstacle = lines[nextI][nextJ] === '#';

  const nextDir = getNextDirection(dir);
  if (isObstacle) {
    dir = nextDir;
  } else {
    if (isLineVisited(i, j, nextDir)) count++;
    i = nextI;
    j = nextJ;
  }
}

console.log(count);
