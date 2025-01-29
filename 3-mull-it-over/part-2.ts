const input = Bun.file(`${import.meta.dir}/input.txt`);

const content = await input.text();

const regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)|do\(\)|don't\(\)/g;

let result = regex.exec(content);
let sum = 0;
let enabled = true;

while (result) {
  const [s, v1, v2] = result;

  console.log('s =', s);

  // mul instruction
  if (s.startsWith('mul')) {
    if (enabled) {
      sum += Number(v1) * Number(v2);
    }
  }

  // enable/disable instruction
  else {
    if (s.startsWith('don')) enabled = false;
    else enabled = true;
  }

  result = regex.exec(content);
}

console.log(`sum = ${sum}`);
