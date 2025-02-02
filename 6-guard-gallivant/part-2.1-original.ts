import {
  type PathString,
  type CoordinatesString,
  type Direction,
  type DebugMode,
  getNextCoordinates,
  getNextDirection,
  printGrid,
  isOutOfBounds,
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

  let i = grid.findIndex((line) => line.includes('^'));
  let j = grid[i].indexOf('^');

  const visited = new Set<PathString>();
  const possibleObstacles = new Set<CoordinatesString>();

  function checkObstacleLeadsToLoop(i: number, j: number, dir: Direction) {
    const pathVisited = new Set<string>(visited);

    const [nextI, nextJ] = getNextCoordinates({ i, j, dir });
    if (isOutOfBounds({ i: nextI, j: nextJ, grid })) return false;

    // adds the obstacle to the path
    const pathLines = grid.map((line, i) =>
      i === nextI
        ? `${line.substring(0, nextJ)}#${line.substring(nextJ + 1)}`
        : line
    );

    dir = getNextDirection(dir);

    while (true) {
      if (pathVisited.has(`${i},${j},${dir}`)) return true;

      const [nextI, nextJ] = getNextCoordinates({ i, j, dir });

      if (isOutOfBounds({ i: nextI, j: nextJ, grid })) return false;

      pathVisited.add(`${i},${j},${dir}`);

      if (pathLines[nextI][nextJ] === '#') {
        dir = getNextDirection(dir);
      } else {
        i = nextI;
        j = nextJ;
      }
    }
  }

  let dir: Direction = 'U';

  while (true) {
    visited.add(`${i},${j},${dir}`);
    const [nextI, nextJ] = getNextCoordinates({ i, j, dir });
    if (isOutOfBounds({ i: nextI, j: nextJ, grid })) break;
    const isObstacle = grid[nextI][nextJ] === '#';

    if (isObstacle) {
      dir = getNextDirection(dir);
    } else {
      const check = checkObstacleLeadsToLoop(i, j, dir);

      // check if the guard has passed this point before
      const isPossibleObstacle =
        check &&
        !visited.has(`${nextI},${nextJ},R`) &&
        !visited.has(`${nextI},${nextJ},L`) &&
        !visited.has(`${nextI},${nextJ},U`) &&
        !visited.has(`${nextI},${nextJ},D`);

      if (isPossibleObstacle) possibleObstacles.add(`${nextI},${nextJ}`);

      if (shouldPrintDebug({ debugMode, isPositive: isPossibleObstacle })) {
        console.log('\n');
        printGrid({ grid, position: [i, j, dir] });
        console.log(
          '\n',
          isPossibleObstacle ? '✅' : '❌',
          `${nextI},${nextJ}\n`
        );
      }

      i = nextI;
      j = nextJ;
    }
  }

  return possibleObstacles.size;
}

async function runMainCase() {
  const file = Bun.file(`${import.meta.dir}/input.txt`);
  const input = await file.text();
  const output = await run(input);

  console.log('Final result:', output);
}

// runMainCase();
