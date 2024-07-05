/**
 * Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.
 *
 * A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {number}
 */

// recursive with memoization
// time O(n*m)
// space O(n*m)
var longestCommonSubsequenceRecur = function (str1, str2) {
  function helper(s1, s2, memo = {}) {
    let solved = memo[`${s1}:${s2}`]
    if (memo[`${s1}:${s2}`]) return solved
    if (s1.length === 0 || s2.length === 0) solved = 0
    else if (s1[0] === s2[0]) {
      solved = helper(s1.slice(1), s2.slice(1), memo) + 1
    } else {
      solved = Math.max(
        helper(s1.slice(1), s2, memo),
        helper(s1, s2.slice(1), memo)
      )
    }
    memo[`${s1}:${s2}`] = solved
    return solved

  }
  return helper(str1, str2)
}

console.log(longestCommonSubsequenceRecur('abcde', 'ace')) // 3
console.log(longestCommonSubsequenceRecur('abc', 'abc')) // 3
console.log(longestCommonSubsequenceRecur('abcde', 'xyz')) // 0
console.log(longestCommonSubsequenceRecur('bl', 'yby')) // 1
console.log(
  longestCommonSubsequenceRecur('pmjghexybyrgzczy', 'hafcdqbgncrcbihkd')
) // 4

var longestCommonSubsequenceDP = function (str1, str2) {}

console.log(longestCommonSubsequenceDP('abcde', 'ace')) // 3
console.log(longestCommonSubsequenceDP('abc', 'abc')) // 3
console.log(longestCommonSubsequenceDP('abcde', 'xyz')) // 0
console.log(longestCommonSubsequenceDP('bl', 'yby')) // 1
console.log(longestCommonSubsequenceDP('pmjghexybyrgzczy', 'hafcdqbgncrcbihkd')) // 4
