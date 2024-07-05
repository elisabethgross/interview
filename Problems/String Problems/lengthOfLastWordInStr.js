// find length of last word in str

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let p = s.length - 1
  let count = 0
  let foundWord = false
  while (true) {
    if (s[p] === ' ') p--
    else {
      foundWord = true
      count++
      p--
    }
    if (foundWord && (s[p] === ' ' || p === -1)) break
  }
  return count
}

console.log(lengthOfLastWord('Hello world')) // 5
console.log(lengthOfLastWord('Hello you  ')) // 3
console.log(lengthOfLastWord('a')) // 1
