export type Direction = 'U' | 'R' | 'D' | 'L';

export type PathString = `${number},${number},${Direction}`;
export type CoordinatesString = `${number},${number}`;

export type DebugMode = 'off' | 'positives' | 'all';

export function getNextCoordinates(args: {
  i: number;
  j: number;
  dir: Direction;
}) {
  const { i, j, dir } = args;

  if (dir === 'U') return [i - 1, j];
  if (dir === 'D') return [i + 1, j];
  if (dir === 'L') return [i, j - 1];
  return [i, j + 1];
}

export function getNextDirection(dir: Direction) {
  if (dir === 'U') return 'R';
  if (dir === 'R') return 'D';
  if (dir === 'D') return 'L';
  return 'U';
}

export function isOutOfBounds(args: { i: number; j: number; grid: string[] }) {
  const { i, j, grid } = args;

  const rows = grid.length;
  const cols = grid[0].length;

  if (i < 0 || j < 0) return true;
  if (i >= rows) return true;
  if (j >= cols) return true;
  return false;
}

export function printGrid(args: {
  grid: string[];
  position: [number, number, Direction];
  addQuestionMark?: [number, number];
  addObstacle?: [number, number];
}) {
  const grid = args.grid.map((line) => line.replace(/\^/, '.'));
  const [i, j, dir] = args.position;

  const mapDirToSymbol: Record<Direction, string> = {
    U: '^',
    R: '>',
    D: 'v',
    L: '<',
  };
  const symbol = mapDirToSymbol[dir];
  grid[i] = grid[i].substring(0, j) + symbol + grid[i].substring(j + 1);

  if (args.addQuestionMark) {
    const [i, j] = args.addQuestionMark;
    if (!isOutOfBounds({ i, j, grid }) && grid[i][j] !== '#') {
      grid[i] = grid[i].substring(0, j) + '?' + grid[i].substring(j + 1);
    }
  }

  if (args.addObstacle) {
    const [i, j] = args.addObstacle;
    grid[i] = grid[i].substring(0, j) + '#' + grid[i].substring(j + 1);
  }

  console.log(grid.join('\n'));
}

export function shouldPrintDebug(args: {
  debugMode: DebugMode;
  isPositive: boolean;
}): boolean {
  if (args.debugMode === 'off') return false;
  if (args.debugMode === 'all') return true;
  return args.isPositive;
}
