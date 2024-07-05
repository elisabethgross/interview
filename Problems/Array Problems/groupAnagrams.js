/**
 * Given an array of strings, group the anagrams together
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let result = []
  let tracker = {}
  for (let str of strs) {
    let sorted = str.split('').sort().join('')
    tracker[sorted] = tracker[sorted] || []
    tracker[sorted].push(str)
  }
  for (let [key, value] of Object.entries(tracker)) {
    result.push(value)
  }
  return result
}

console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])) // [["bat"],["nat","tan"],["ate","eat","tea"]]
