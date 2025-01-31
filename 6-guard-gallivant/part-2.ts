type Direction = 'U' | 'R' | 'D' | 'L';

type PathString = `${number},${number},${Direction}`;
type CoordinatesString = `${number},${number}`;

type DebugMode = 'OFF' | 'POSITIVES' | 'ALL';

function shouldPrintDebug(args: { debugMode: DebugMode; result: boolean }) {
  if (args.debugMode === 'OFF') return false;
  if (args.debugMode === 'ALL') return true;
  return args.result;
}

export async function main(
  content: string,
  debugMode: DebugMode = 'OFF'
): Promise<Set<string>> {
  const lines = content.split('\n');

  const rows = lines.length;
  const cols = lines[0].length;

  let i = lines.findIndex((line) => line.includes('^'));
  let j = lines[i].indexOf('^');

  const visited = new Set<PathString>();
  const pathsLeadsToLoop = new Set<PathString>();
  const possibleObstacles = new Set<CoordinatesString>();

  function isOutOfBounds(i: number, j: number) {
    if (i < 0 || j < 0) return true;
    if (i >= rows) return true;
    if (j >= cols) return true;
    return false;
  }

  function getNextCoordinates(i: number, j: number, dir: Direction) {
    if (dir === 'U') return [i - 1, j];
    if (dir === 'D') return [i + 1, j];
    if (dir === 'L') return [i, j - 1];
    return [i, j + 1];
  }

  function getNextDirection(dir: Direction) {
    if (dir === 'U') return 'R';
    if (dir === 'D') return 'L';
    if (dir === 'L') return 'U';
    return 'D';
  }

  function checkIfLeadsToLoop(i: number, j: number, dir: Direction) {
    const pathVisited = new Set<string>(visited);
    while (true) {
      if (pathVisited.has(`${i},${j},${dir}`)) {
        pathsLeadsToLoop.add(`${i},${j},${dir}`);
        return true;
      }
      if (pathsLeadsToLoop.has(`${i},${j},${dir}`)) return true;

      const [nextI, nextJ] = getNextCoordinates(i, j, dir);

      if (isOutOfBounds(nextI, nextJ)) {
        return false;
      }

      pathVisited.add(`${i},${j},${dir}`);

      if (lines[nextI][nextJ] === '#') {
        dir = getNextDirection(dir);
      } else {
        i = nextI;
        j = nextJ;
      }
    }
  }

  function printGrid(args: {
    grid: string[];
    position: [number, number, Direction];
  }) {
    const grid = args.grid.map((line) => line.replace(/\^/, '.'));
    const [i, j, dir] = args.position;
    const symbol =
      dir === 'U' ? '^' : dir === 'D' ? 'v' : dir === 'L' ? '<' : '>';
    grid[i] = grid[i].substring(0, j) + symbol + grid[i].substring(j + 1);

    const [nextI, nextJ] = getNextCoordinates(i, j, dir);

    if (!isOutOfBounds(nextI, nextJ)) {
      grid[nextI] =
        grid[nextI].substring(0, nextJ) +
        '?' +
        grid[nextI].substring(nextJ + 1);
    }

    console.log(grid.join('\n'));
  }

  let dir: Direction = 'U';

  while (true) {
    visited.add(`${i},${j},${dir}`);
    const [nextI, nextJ] = getNextCoordinates(i, j, dir);
    if (isOutOfBounds(nextI, nextJ)) break;
    const isObstacle = lines[nextI][nextJ] === '#';

    const nextDir = getNextDirection(dir);
    if (isObstacle) {
      dir = nextDir;
    } else {
      const check = checkIfLeadsToLoop(i, j, nextDir);

      // check if the guard has passed this point before
      const isPossibleObstacle =
        check &&
        !visited.has(`${nextI},${nextJ},R`) &&
        !visited.has(`${nextI},${nextJ},L`) &&
        !visited.has(`${nextI},${nextJ},U`) &&
        !visited.has(`${nextI},${nextJ},D`);

      if (isPossibleObstacle) possibleObstacles.add(`${nextI},${nextJ}`);

      if (shouldPrintDebug({ debugMode, result: isPossibleObstacle })) {
        printGrid({ grid: lines, position: [i, j, dir] });
        console.log(
          '\n',
          isPossibleObstacle ? '✅' : '❌',
          `${nextI},${nextJ}\n\n`
        );
      }

      i = nextI;
      j = nextJ;
    }
  }

  return possibleObstacles;
}

async function run() {
  const input = Bun.file(`${import.meta.dir}/input.txt`);
  const content = await input.text();
  const result = await main(content);

  console.log('Final result:', result.size);
}
