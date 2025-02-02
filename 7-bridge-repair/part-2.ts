function generatePermutations(operators: string[], N: number) {
  const result: string[] = [];
  const indices = Array(N).fill(0); // Track the current "loop" indices

  while (true) {
    // Build the current permutation
    const current = indices.map((index) => operators[index]).join('');
    result.push(current);

    // Increment the indices from right to left
    let i = N - 1;
    while (i >= 0 && indices[i] === operators.length - 1) {
      indices[i] = 0; // Reset this position
      i--; // Move to the left
    }

    if (i < 0) break; // All combinations are done
    indices[i]++; // Increment the current position
  }

  return result;
}

async function main() {
  const file = Bun.file('./input.txt');
  const input = await file.text();
  const lines = input.split('\n');

  let sum = 0;

  for (const line of lines) {
    const [val, nums] = line.split(': ');

    const value = Number(val);
    const numbers = nums.split(' ').map(Number);

    const numOperations = numbers.length - 1;

    const permutations = generatePermutations(['+', '*', '|'], numOperations);

    let isValid = false;
    for (const permutation of permutations) {
      let result = numbers[0];

      for (let i = 0; i < numOperations; i++) {
        const operator = permutation[i];
        const number = numbers[i + 1];
        if (operator === '+') {
          result += number;
        } else if (operator === '*') {
          result *= number;
        } else {
          const strResult = result.toString() + number.toString();
          result = parseInt(strResult);
        }

        if (result > value) break;
      }

      if (result === value) {
        isValid = true;
        break;
      }
    }

    if (isValid) {
      sum += value;
    }
  }

  console.log(sum);

  return sum;
}

main();
