// Given a string s which represents an expression, evaluate this expression and return its value.
// Round down

/**
 * @param {string} s
 * @return {number}
 */
const calculate = (str) => {
  str = str.replace(/\s+/g, '')
  console.log(str)
  let output = []
  let n = 0
  let sign = '+'
  for (let i = 0; i < str.length; i++) {
    const char = str[i]

    // number
    if (/\d/.test(char)) {
      n = n * 10 + Number(char) // e.g. '14' -> 1 * 10 + 4
    }

    // sign or last number
    if (/\D/.test(char) || i === str.length - 1) {
      if (sign === '-') output.push(-n)
      else if (sign === '+') output.push(n)
      else if (sign === '*') output.push(output.pop() * n)
      else if (sign === '/') output.push(~~(output.pop() / n))

      sign = char
      n = 0
    }
  }
  return output.reduce((a, b) => a + b)
}

// console.log(calculate('30+10*2*2+1')) // 71
console.log(calculate(' 3/2 ')) // 1
// console.log(calculate('3+5/2')) // 5
