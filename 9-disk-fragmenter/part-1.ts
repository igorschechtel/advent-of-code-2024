function getHighestId(input: string) {
  let id = 0;
  for (let i = 1; i < input.length; i += 2) {
    if (input[i - 1] !== '0') id++;
  }
  return id;
}

async function main() {
  const file = Bun.file('./input.txt');
  const input = await file.text();

  let result: number[] = [];

  let lowId = 0;
  let highId = getHighestId(input);

  let highPointer = input.length - 1;
  let highCount =
    highPointer % 1 === 0
      ? Number(input[highPointer])
      : Number(input[highPointer - 1]);

  for (let lowPointer = 0; lowId < highId; lowPointer++) {
    let num = parseInt(input[lowPointer]);
    if (lowPointer % 2 === 0) {
      const arr = Array(num).fill(lowId) as number[];
      result.push(...arr);
      lowId++;
    } else {
      while (num > 0) {
        while (highCount === 0) {
          highPointer -= 2;
          highCount = Number(input[highPointer]);
          highId--;
        }
        result.push(highId);
        num--;
        highCount--;
      }
    }
  }

  while (highCount > 0) {
    result.push(highId);
    highCount--;
  }

  let sum = 0;
  for (let i = 0; i < result.length; i++) {
    sum += result[i] * i;
  }

  console.log({ sum, len: result.length });
}

main();
