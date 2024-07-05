/**
 * Add n new processors where the ith processor provides computer power of power[i]
 * Not all processors can be used to evaluate a process
 * If processor of power[i] is used, you cannot use processor with power power[i] + 1 or power[i] - 1
 * A processor can only be used once
 *
 * Find max sum of computing power of chosen processors
 *
 * Example:
 * [3, 3, 3, 4, 4, 1, 8]
 * => 18 (3 + 3 + 3 + 1 + 8) (because 3 is used, you cannot include 4)
 *
 */

/**
 * Given two strings, str1 and str2, find the maximum common subsequence length between the strings.
 * You are allowed to make k modifications to str1 by changing a letter to its previous letter or subsequent letter in the alphabet
 * Note: subsequence is NOT contiguous
 *
 * Example:
 * str1 = fpelqanxyk
 * str2 = hackerrank
 * k = 6
 *
 * => longest common subsequence is 'hckrank' of length 7
 *
 * 1) str1[0] change f -> g
 * 2) str1[0] change g -> h
 * 3) str1[2] change e -> d
 * 4) str1[2] change d -> c
 * 5) str1[3] change l -> k
 * 6) str1[4] change q -> r
 *
 * -> hpckranxyk
 * => hckrank
 */

// O(n*m)
function longestCommonSubsequenceRecursive(str1, str2) {
  if (str1 === '' || str2 === '') return 0
  let char1 = str1[str1.length - 1]
  let char2 = str2[str2.length - 1]
  if (char1 === char2) {
    return (
      1 +
      longestCommonSubsequenceRecursive(
        str1.slice(0, str1.length - 1),
        str2.slice(0, str2.length - 1)
      )
    )
  } else {
    return Math.max(
      longestCommonSubsequenceRecursive(str1.slice(0, str1.length - 1), str2),
      longestCommonSubsequenceRecursive(str1, str2.slice(0, str2.length - 1))
    )
  }
}

// console.log(longestCommonSubsequenceRecursive('aabcdefg', 'azbfcqdpp')) // 4

// O(n*m)
function longestCommonSubsequenceDynamic(str1, str2) {
  let n = str1.length
  let m = str2.length

  let matrix = new Array(n + 1).fill(new Array(m + 1).fill(0))
  console.log(matrix)
  for (let i = 1; i <= m; i++) {
    let char2 = str2[i - 1]
    for (let j = 1; j <= n; j++) {
      let char1 = str1[j - 1]
      if (char1 === char2) {
        matrix[j][i] = matrix[j - 1][i - 1] + 1
      } else {
        matrix[j][i] = Math.max(matrix[j - 1][i], matrix[j][i - 1])
      }
    }
  }
  return matrix[m][n]
}

// console.log(longestCommonSubsequenceDynamic('aab', 'acbd')) // 2

function longestCommonSubsequenceWithChanges(str1, str2) {
  let str1Len = str1.length
  let str2Len = str2.length

  // let matrix = new Array(str1Len + 1).fill(
  //   new Array(str2Len + 1).fill(new Array(2).fill(0))
  // )
  let matrix = []
  for (let i = 0; i <= str2Len; i++) {
    matrix[i] = []
    for (let j = 0; j <= str1Len; j++) {
      matrix[i][j] = []
      for (let k = 0; k < 3; k++) {
        matrix[i][j][k] = 0
      }
    }
  }

  for (let str2Row = 1; str2Row <= str2Len; str2Row++) {
    let char2 = str2[str2Row - 1]
    for (let str1Col = 1; str1Col <= str1Len; str1Col++) {
      console.log('running')
      let char1 = str1[str1Col - 1]
      let possibilities = [
        char1,
        String.fromCharCode(char1.charCodeAt(0) - 1),
        String.fromCharCode(char1.charCodeAt(0) + 1),
      ]
      for (let p = 0; p < possibilities.length; p++) {
        let possibility = possibilities[p]
        console.log('str2Row', str2Row)
        console.log('str1Col', str1Col)
        console.log('p', p)
        console.log('char2', char2)
        console.log('char1', char1)
        console.log('possibility', possibility)
        let maxPossibility
        if (possibility === char2) {
          maxPossibility = Math.max(...matrix[str2Row - 1][str1Col - 1])
          console.log('maxPossibility match', maxPossibility)
          console.log(
            'matrix[str2Row][str1Col][p]',
            matrix[str2Row][str1Col][p]
          )
          matrix[str2Row][str1Col][p] = 1 + maxPossibility
        } else {
          let maxPossibility2 = Math.max(...matrix[str2Row - 1][str1Col])
          let maxPossibility1 = Math.max(...matrix[str2Row][str1Col - 1])
          maxPossibility = Math.max(maxPossibility2, maxPossibility1)
          console.log('maxPossibilityNoMatch', maxPossibility)
          matrix[str2Row][str1Col][p] = maxPossibility
        }
        console.log(matrix)
      }
    }
  }
  return Math.max(...matrix[str2Len][str1Len])
}

// console.log(longestCommonSubsequenceWithChanges('rbcc', 'badd'))

function longestCommonSubsequenceWithMaxChanges(str1, str2, k) {
  let str1Len = str1.length
  let str2Len = str2.length

  // let matrix = new Array(str1Len + 1).fill(
  //   new Array(str2Len + 1).fill(new Array(2).fill(0))
  // )
  let matrix = []
  for (let i = 0; i <= str2Len; i++) {
    matrix[i] = []
    for (let j = 0; j <= str1Len; j++) {
      matrix[i][j] = []
      for (let l = 0; l < k; l++) {
        matrix[i][j][l] = 0
      }
    }
  }

  for (let str2Row = 1; str2Row <= str2Len; str2Row++) {
    let char2 = str2[str2Row - 1]
    for (let str1Col = 1; str1Col <= str1Len; str1Col++) {
      console.log('running')
      let char1 = str1[str1Col - 1]
      let possibilities = [
        char1,
        String.fromCharCode(char1.charCodeAt(0) - 1),
        String.fromCharCode(char1.charCodeAt(0) + 1),
      ]
      for (let p = 0; p < possibilities.length; p++) {
        let possibility = possibilities[p]
        console.log('str2Row', str2Row)
        console.log('str1Col', str1Col)
        console.log('p', p)
        console.log('char2', char2)
        console.log('char1', char1)
        console.log('possibility', possibility)
        let maxPossibility
        if (possibility === char2) {
          maxPossibility = Math.max(...matrix[str2Row - 1][str1Col - 1])
          console.log('maxPossibility match', maxPossibility)
          console.log(
            'matrix[str2Row][str1Col][p]',
            matrix[str2Row][str1Col][p]
          )
          matrix[str2Row][str1Col][p] = 1 + maxPossibility
        } else {
          let maxPossibility2 = Math.max(...matrix[str2Row - 1][str1Col])
          let maxPossibility1 = Math.max(...matrix[str2Row][str1Col - 1])
          maxPossibility = Math.max(maxPossibility2, maxPossibility1)
          console.log('maxPossibilityNoMatch', maxPossibility)
          matrix[str2Row][str1Col][p] = maxPossibility
        }
        console.log(matrix)
      }
    }
  }
  return Math.max(...matrix[str2Len][str1Len])
}
