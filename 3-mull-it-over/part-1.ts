const input = Bun.file(`${import.meta.dir}/input.txt`);

const content = await input.text();

const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;

let result = regex.exec(content);
let sum = 0;

while (result) {
  const [s, v1, v2] = result;
  console.log(s);
  sum += Number(v1) * Number(v2);
  result = regex.exec(content);
}

console.log(`sum = ${sum}`);
