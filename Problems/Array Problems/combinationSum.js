/**
 * Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target
 * You may return the combinations in any order.
 * The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.
 */

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
  var buffer = []
  var result = []
  search(0, target)
  return result

  function search(startIdx, target) {
    if (target === 0) return result.push(buffer.slice())
    if (target < 0) return
    if (startIdx === candidates.length) return
    buffer.push(candidates[startIdx])
    search(startIdx, target - candidates[startIdx])
    buffer.pop()
    search(startIdx + 1, target)
  }
}

console.log(combinationSum([2, 3, 6, 7], 7)) // [[2, 2, 3], [7]]
console.log(combinationSum([2, 3, 5], 8)) // [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
