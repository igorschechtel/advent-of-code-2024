type Location = [number, number];
type LocationString = `${number},${number}`;

async function main() {
  const file = Bun.file('./input.txt');
  const input = await file.text();
  const lines = input.split('\n');

  const rows = lines.length;
  const cols = lines[0].length;

  const map: Record<string, Location[]> = {};

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const char = lines[i][j];
      if (char === '.') continue;

      if (!map[char]) map[char] = [[i, j]];
      else map[char].push([i, j]);
    }
  }

  const uniqueLocations = new Set<LocationString>();

  function isOutOfBound(x: number, y: number) {
    return x < 0 || x >= rows || y < 0 || y >= cols;
  }

  Object.values(map).forEach((antennas) => {
    for (let i = 0; i < antennas.length; i++) {
      for (let j = i + 1; j < antennas.length; j++) {
        const [x1, y1] = antennas[i];
        const [x2, y2] = antennas[j];

        const l1: Location = [x2 + (x2 - x1), y2 + (y2 - y1)];
        const l2: Location = [x1 + (x1 - x2), y1 + (y1 - y2)];

        if (!isOutOfBound(l1[0], l1[1])) {
          uniqueLocations.add(`${l1[0]},${l1[1]}`);
        }

        if (!isOutOfBound(l2[0], l2[1])) {
          uniqueLocations.add(`${l2[0]},${l2[1]}`);
        }
      }
    }
  });

  console.log(uniqueLocations.size);
}

main();
