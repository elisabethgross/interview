// Given a string, find how many instances of it appear in a longer string

function naiveStringSearch(str, targetStr) {
  let counter = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === targetStr[0]) {
      for (let j = 1; j < targetStr.length; j++) {
        if (str[j + i] !== targetStr[j]) {
          break
        }
        if (j === targetStr.length - 1) {
          counter++
        }
      }
    }
  }
  return counter
}

console.log(naiveStringSearch('hellomggoodbyeomgyoloomg', 'omg')) // 3
