const input = Bun.file(`${import.meta.dir}/input.txt`);
const content = await input.text();

const lines = content.split('\n');

const index = lines.indexOf('');

const rules = lines.slice(0, index);
const updates = lines.slice(index + 1);

const rulesMap: Record<number, number[]> = {};

for (const rule of rules) {
  const [a, b] = rule.split('|').map(Number);

  if (rulesMap[a]) rulesMap[a].push(b);
  else rulesMap[a] = [b];
}

let sum = 0;

for (const update of updates) {
  const nums = update.split(',').map(Number);

  let valid = true;
  const visited: Record<number, true> = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const rules = rulesMap[num];

    if (rules.some((rule) => visited[rule])) {
      valid = false;
      break;
    }

    visited[num] = true;
  }

  if (!valid) {
    nums.sort((a, b) => {
      if (rulesMap[a].includes(b)) return -1;
      if (rulesMap[b].includes(a)) return 1;
      return 0;
    });
    const mid = Math.floor(nums.length / 2);
    sum += nums[mid];
  }
}

console.log(sum);
