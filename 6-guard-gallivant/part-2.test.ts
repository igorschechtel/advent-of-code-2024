import { expect, test } from 'bun:test';
import { original as run } from './part-2';

const testDir = `${import.meta.dir}/test-cases`;

async function readFromFile(path: string) {
  const file = Bun.file(path);
  const content = await file.text();
  return content;
}

test('Default test case', async () => {
  const input = await readFromFile(`${testDir}/default.txt`);
  const output = await run(input);
  expect(output.size).toBe(6);
});

test('Straight loop', async () => {
  const input = await readFromFile(`${testDir}/straight-loop.txt`);
  const output = await run(input);
  expect(output.size).toBe(1);
});

test('None', async () => {
  const input = await readFromFile(`${testDir}/none.txt`);
  const output = await run(input);
  expect(output.size).toBe(0);
});

test('False Positive!', async () => {
  const input = await readFromFile(`${testDir}/false-positive.txt`);
  const output = await run(input);
  expect(output.size).toBe(1);
});

test('Out of Bounds', async () => {
  const input = await readFromFile(`${testDir}/out-of-bounds.txt`);
  const output = await run(input);
  expect(output.size).toBe(0);
});

test('Another test', async () => {
  const input = await readFromFile(`${testDir}/another.txt`);
  const output = await run(input);
  expect(output.size).toBe(4);
});

test('Electric boogaloo', async () => {
  const input = await readFromFile(`${testDir}/electric-boogaloo.txt`);
  const output = await run(input);
  expect(output.size).toBe(1);
});

test('The guard strikes back', async () => {
  const input = await readFromFile(`${testDir}/guard-strikes-back.txt`);
  const output = await run(input);
  expect(output.size).toBe(1);
});

test('Return of the guard', async () => {
  const input = await readFromFile(`${testDir}/return-of-the-guard.txt`);
  const output = await run(input);
  expect(output.size).toBe(6);
});

test('Return of the guard 2', async () => {
  const input = await readFromFile(`${testDir}/return-of-the-guard-2.txt`);
  const output = await run(input);
  expect(output.size).toBe(7);
});

test('The 2 guards', async () => {
  const input = await readFromFile(`${testDir}/the-2-guards.txt`);
  const output = await run(input);
  expect(output.size).toBe(4);
});

test('None again', async () => {
  const input = await readFromFile(`${testDir}/none-2.txt`);
  const output = await run(input);
  expect(output.size).toBe(0);
});

test('None again', async () => {
  const input = await readFromFile(`${testDir}/none-3.txt`);
  const output = await run(input);
  expect(output.size).toBe(1);
});

test('Another 2', async () => {
  const input = await readFromFile(`${testDir}/another-2.txt`);
  const output = await run(input);
  expect(output.size).toBe(6);
});

test('Is overestimating?', async () => {
  const input = await readFromFile(`${testDir}/overestimating.txt`);
  const output = await run(input);
  expect(output.size).toBe(4);
});

test('Reddit 1', async () => {
  const input = await readFromFile(`${testDir}/reddit-1.txt`);
  const output = await run(input);
  expect(output.size).toBe(6);
});

test('Reddit 2', async () => {
  const input = await readFromFile(`${testDir}/reddit-2.txt`);
  const output = await run(input);
  expect(output.size).toBe(7);
});

test('Reddit 3', async () => {
  const input = await readFromFile(`${testDir}/reddit-3.txt`);
  const output = await run(input);
  expect(output.size).toBe(4);
});

test('Reddit 4', async () => {
  const input = await readFromFile(`${testDir}/reddit-4.txt`);
  const output = await run(input);
  expect(output.size).toBe(3);
});
