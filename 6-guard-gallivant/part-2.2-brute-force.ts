import {
  type PathString,
  type CoordinatesString,
  type Direction,
  type DebugMode,
  getNextCoordinates,
  getNextDirection,
  printGrid,
  shouldPrintDebug,
} from './utils';

export async function run(
  input: string,
  options?: {
    debugMode?: DebugMode;
  }
): Promise<number> {
  const { debugMode = 'off' } = options || {};

  const grid = input.split('\n');
  const rows = grid.length;
  const cols = grid[0].length;

  function isOutOfBounds(i: number, j: number) {
    if (i < 0 || j < 0) return true;
    if (i >= rows) return true;
    if (j >= cols) return true;
    return false;
  }

  const startI = grid.findIndex((line) => line.includes('^'));
  const startJ = grid[startI].indexOf('^');
  let dir: Direction = 'U';

  const possibleObstacles = new Set<CoordinatesString>();

  let [i, j] = [startI, startJ];
  while (true) {
    possibleObstacles.add(`${i},${j}`);
    const [nextI, nextJ] = getNextCoordinates({ i, j, dir });
    if (isOutOfBounds(nextI, nextJ)) break;
    if (grid[nextI][nextJ] === '#') {
      dir = getNextDirection(dir);
    } else {
      [i, j] = [nextI, nextJ];
    }
  }
  possibleObstacles.delete(`${startI},${startJ}`);

  let count = 0;

  for (const possibleObstacle of Array.from(possibleObstacles)) {
    const [obstacleI, obstacleJ] = possibleObstacle.split(',').map(Number);

    const gridCopy = grid.map((line, i) => {
      if (i !== obstacleI) return line;
      return line.substring(0, obstacleJ) + '#' + line.substring(obstacleJ + 1);
    });

    let [i, j] = [startI, startJ];
    let dir: Direction = 'U';

    // console.log('\n');
    // printGrid({ grid: gridCopy, position: [i, j, dir] });
    // console.log('\n');

    const visited = new Set<PathString>();
    let obstacleLeadsToLoop = false;
    while (true) {
      const path: PathString = `${i},${j},${dir}`;
      if (visited.has(path)) {
        obstacleLeadsToLoop = true;
        break;
      }
      visited.add(path);

      const [nextI, nextJ] = getNextCoordinates({ i, j, dir });
      if (isOutOfBounds(nextI, nextJ)) break;
      if (gridCopy[nextI][nextJ] === '#') {
        dir = getNextDirection(dir);
      } else {
        [i, j] = [nextI, nextJ];
      }
    }

    if (
      shouldPrintDebug({
        debugMode,
        isPositive: obstacleLeadsToLoop,
      })
    ) {
      console.log('\n');
      printGrid({
        grid: grid,
        position: [startI, startJ, 'U'],
        addObstacle: [obstacleI, obstacleJ],
      });
      console.log(
        '\n',
        obstacleLeadsToLoop ? '✅' : '❌',
        `${obstacleI},${obstacleJ}\n`
      );
    }

    if (obstacleLeadsToLoop) count++;
  }

  return count;
}

async function runMainCase() {
  const file = Bun.file(`${import.meta.dir}/input.txt`);
  const input = await file.text();
  const output = await run(input);

  console.log('Final result:', output);
}

// runMainCase();
