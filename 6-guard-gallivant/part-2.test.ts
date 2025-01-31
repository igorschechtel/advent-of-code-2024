import { expect, test } from 'bun:test';
import { main as run } from './part-2';

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
  const output = await run(input, 'ALL');
  expect(output.size).toBe(1);
});

test.skip('Output of Bounds', async () => {
  const input = await readFromFile(`${testDir}/out-of-bounds.txt`);
  const output = await run(input);
  expect(output.size).toBe(0);
});

test.skip('Another test', async () => {
  const input = await readFromFile(`${testDir}/another.txt`);
  const output = await run(input);
  expect(output.size).toBe(4);
});

test.skip('Electric boogaloo', async () => {
  const input = await readFromFile(`${testDir}/electric-boogaloo.txt`);
  const output = await run(input);
  expect(output.size).toBe(1);
});

test.skip('The guard strikes back', async () => {
  const input = await readFromFile(`${testDir}/guard-strikes-back.txt`);
  const output = await run(input);
  expect(output.size).toBe(1);
});

test.skip('Return of the guard', async () => {
  const input = await readFromFile(`${testDir}/return-of-the-guard.txt`);
  const output = await run(input);
  expect(output.size).toBe(6);
});

test.skip('Return of the guard 2', async () => {
  const input = await readFromFile(`${testDir}/return-of-the-guard-2.txt`);
  const output = await run(input);
  expect(output.size).toBe(7);
});

test.skip('The 2 guards', async () => {
  const input = await readFromFile(`${testDir}/the-2-guards.txt`);
  const output = await run(input);
  expect(output.size).toBe(4);
});

test.skip('None again', async () => {
  const input = await readFromFile(`${testDir}/none-2.txt`);
  const output = await run(input);
  expect(output.size).toBe(0);
});

test.skip('None again', async () => {
  const input = await readFromFile(`${testDir}/none-3.txt`);
  const output = await run(input);
  expect(output.size).toBe(1);
});

test.skip('Another 2', async () => {
  const input = await readFromFile(`${testDir}/another-2.txt`);
  const output = await run(input);
  expect(output.size).toBe(6);
});

test.skip('Is overestimating?', async () => {
  const input = await readFromFile(`${testDir}/overestimating.txt`);
  const output = await run(input);
  expect(output.size).toBe(4);
});
