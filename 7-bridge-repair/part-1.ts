function generatePermutations(
  operators: string[],
  N: number,
  current: string = '',
  result: string[] = []
) {
  if (current.length === N) {
    result.push(current); // Base case: When the current string reaches the desired length
    return [];
  }

  for (const op of operators) {
    generatePermutations(operators, N, current + op, result); // Recursive step
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

    const permutations = generatePermutations(['+', '*'], numOperations);

    let isValid = false;
    for (const permutation of permutations) {
      let result = numbers[0];

      for (let i = 0; i < numOperations; i++) {
        const operator = permutation[i];
        const number = numbers[i + 1];
        if (operator === '+') {
          result += number;
        } else {
          result *= number;
        }
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
