import { expect, test } from 'bun:test';
import { run as original } from './part-2.1-original';
import { run as bruteForce } from './part-2.2-brute-force';

const testDir = `${import.meta.dir}/test-cases`;

async function readFromFile(path: string) {
  const file = Bun.file(path);
  const content = await file.text();
  return content;
}

const mapFileNameToResult: Record<string, number> = {
  'default.txt': 6,
  'straight-loop.txt': 1,
  'none.txt': 0,
  'false-positive.txt': 1,
  'out-of-bounds.txt': 0,
  'another.txt': 4,
  'electric-boogaloo.txt': 1,
  'guard-strikes-back.txt': 1,
  'return-of-the-guard.txt': 6,
  'return-of-the-guard-2.txt': 7,
  'the-2-guards.txt': 4,
  'none-2.txt': 0,
  'none-3.txt': 1,
  'another-2.txt': 6,
  'overestimating.txt': 4,
  'reddit-1.txt': 6,
  'reddit-2.txt': 7,
  'reddit-3.txt': 4,
  'reddit-4.txt': 3,
};

test('Original solution', async () => {
  for (const [fileName, result] of Object.entries(mapFileNameToResult)) {
    const input = await readFromFile(`${testDir}/${fileName}`);
    const output = await original(input);
    expect(output).toEqual(result);
  }
});

test('Brute force solution', async () => {
  for (const [fileName, result] of Object.entries(mapFileNameToResult)) {
    const input = await readFromFile(`${testDir}/${fileName}`);
    const output = await bruteForce(input);
    expect(output).toEqual(result);
  }
});

test('Original solution vs Brute force solution', async () => {
  const expectedResult = 1789;

  const input = await readFromFile('./input.txt');
  console.time('Original solution');
  const originalOutput = await original(input);
  console.timeEnd('Original solution');

  console.time('Brute force solution');
  const bruteForceOutput = await bruteForce(input);
  console.timeEnd('Brute force solution');

  expect(originalOutput).toEqual(expectedResult);
  expect(bruteForceOutput).toEqual(expectedResult);
});
