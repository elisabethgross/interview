/**
 * Given the stock prices of n months, the net price change for the ith month is defined as the absolute difference between the average of stock prices for the first i months and for the remaining (n - i) months. Note that these averages are rounded down to an integer. Return the index of the month where the net price change is the least.
 *
 * Example:
 * [1, 3, 2, 5, 4] --> 2
 *
 * 1 / 1 = 1, (3 + 2 + 5 + 4) / 4 = 3 --> abs(1 - 3) = 2
 * (1 + 3) / 2 = 2, (2 + 5 + 4) / 3 = 3 --> abs(2 - 3) = 1
 * (1 + 3 + 2) / 3 = 2, (5 + 4) / 2 = 4 --> abs(3 - 4) = 1
 * (1 + 3 + 2 + 5) / 4 = 2, 4 / 1 = 4 --> abs(2 - 4) = 2
 *
 * ==> the first month whose before net price change is less than its after is at the index 2
 *
 */

function maxAverage(stockPrices) {
  let n = stockPrices.length
  let sums = []
  let sum = 0
  for (let i = n - 1; i >= 0; i--) {
    sums[i] = sum
    sum += stockPrices[i]
  }
  console.log('sums', sums)
  let min = Infinity
  let minMonth
  sum = 0
  for (let i = 0; i < n; i++) {
    sum += stockPrices[i]
    let beforeAverage = sum / (i + 1)
    let afterAverage = sums[i] === 0 ? sums[i] : sums[i] / (n - 1 - i)
    if (Math.abs(Math.floor(beforeAverage) - Math.floor(afterAverage)) < min) {
      minMonth = i + 1
    }
    min = Math.min(
      min,
      Math.abs(Math.floor(beforeAverage) - Math.floor(afterAverage))
    )
  }
  return minMonth
}

// console.log(maxAverage([1, 3, 2, 5, 4])) // 2

/**
 * Given a review and a list of prohibited words, return the longest contiguous substring that doesn't contain the prohibited words
 *
 * Example:
 *
 * 'thiwasscraphate', ['crap', 'his'] --> 'iwasscra'
 * 'thiswastheworstbuyever', ['worth', 'worst', 'ever'] --> 'thiswasthewors'
 */

function longestReview(review, prohibitedWords) {
  let firstLetters = {}
  prohibitedWords.forEach((word) => {
    firstLetters[word[0]] = firstLetters[word[0]] || []
    firstLetters[word[0]].push(word)
  })
  let i = 0
  let startIdx = 0
  let endIdx = 0
  let max = -Infinity
  while (i < review.length) {
    endIdx = i
    let reviewLetter = review[i]
    // if the letter in the review has the same first letter as one of the prohibited words
    if (Object.keys(firstLetters).includes(reviewLetter)) {
      // init window to look ahead to see if the word is the full prohibited word
      let startOfProhibited = i
      let endOfProhibited = startOfProhibited
      let relevantProhibitedWords = firstLetters[reviewLetter]
      // loop through the prohibited words that match the first letter
      for (
        let prohibitedWordIdx = 0;
        prohibitedWordIdx < relevantProhibitedWords.length;
        prohibitedWordIdx++
      ) {
        let found = true
        let prohibitedWord = relevantProhibitedWords[prohibitedWordIdx]
        // loop through the letters of the prohibited word
        for (
          let letterIdx = 0;
          letterIdx < prohibitedWord.length;
          letterIdx++
        ) {
          let endOfWindow = review[endOfProhibited]
          let prohibitedLetter = prohibitedWord[letterIdx]
          // if the prohibited word contains the letters in the window thus far
          if (endOfWindow === prohibitedLetter) {
            // extend window
            endOfProhibited++
          } else {
            found = false
            break
          }
        }
        if (found) {
          let lenSubStr = endOfProhibited - 1 - startIdx
          startIdx = startOfProhibited + 1
          max = Math.max(lenSubStr, max)
          break
        } else {
          max = Math.max(endOfProhibited - startIdx, max)
        }
        i = endOfProhibited - 1
      }
    } else {
      max = Math.max(endIdx - startIdx + 1, max)
    }
    i++
  }
  return max
}

// console.log(longestReview('tyoyohiswashighscraphate', ['crap', 'his'])) // 13 iswashighscra
// console.log(longestReview('tyoyohiswashighscraphatepoiunmy', ['crap', 'his'])) // 14 raphatepoiunmy
// console.log(
//   longestReview('tyoyoepoiunmyehhiswashighscraphate', ['crap', 'his'])
// ) // 17 tyoyoepoiunmyehhi

/**
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 *
 * Example:
 * Input: strs = ["flower","flow","flight"]
 * Output: "fl"
 *
 * Input: strs = ["dog","racecar","car"]
 * Output: ""
 */

var longestCommonPrefix = function (strs) {
  if (strs.length === 0) {
    return ''
  }
  let ans = strs[0]
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(ans) !== 0) {
      ans = ans.substring(0, ans.length - 1)
      if (ans === '') {
        return ''
      }
    }
  }
  return ans
}

// console.log(longestCommonPrefix(['flo', 'flower', 'flow'])) // 'flo
// console.log(longestCommonPrefix(['flower', 'flow', 'flight'])) // 'fl'
// console.log(longestCommonPrefix(['dog', 'racecar', 'car'])) // ''
// console.log(longestCommonPrefix(['', 'b'])) // ''

/**
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 * Notice that the solution set must not contain duplicate triplets.
 *
 * Example:
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let triplets = []
  if (nums.length < 3) return triplets
  if (nums[0] > 0) return triplets
  let map = {}
  for (let i = 0; i < nums.length; i++) {
    map[nums[i]] = i
  }
  let i = 0
  while (i < nums.length - 2) {
    if (nums[i] > 0) break
    let j = i + 1
    while (j < nums.length - 1) {
      let required = 0 - (nums[i] + nums[j])
      if (map[required] !== undefined && map[required] > j) {
        triplets.push([nums[i], nums[j], required])
      }
      j = map[nums[j]]
      j++
    }
    i = map[nums[i]]
    i++
  }
  return triplets
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSumFaster = function (nums) {
  nums.sort((a, b) => a - b)
  let answer = []
  if (nums.length < 3) {
    return answer
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      break
    }
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    let low = i + 1
    let high = nums.length - 1
    while (low < high) {
      const sum = nums[i] + nums[low] + nums[high]
      if (sum > 0) {
        high--
      } else if (sum < 0) {
        low++
      } else {
        answer.push([nums[i], nums[low], nums[high]])
        let lastLowOccurrence = nums[low]
        let lastHighOccurrence = nums[high]
        while (low < high && nums[low] === lastLowOccurrence) {
          low++
        }
        while (low < high && nums[high] === lastHighOccurrence) {
          high--
        }
      }
    }
  }
  return answer
}

// console.log(threeSum([-1, 0, 1, 2, -1, -4])) // [[-1, -1, 2], [-1, 0, -1]]

/**
 * Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
 * Return the sum of the three integers.
 * You may assume that each input would have exactly one solution.
 *
 * Example:
 * Input: nums = [-1,2,1,-4], target = 1
 * Output: 2
 * Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)
  // [-4, -1, 1, 2]
  let closestSum = nums[0] + nums[1] + nums[2]
  for (let i = 0; i < nums.length - 2; i++) {
    let low = i + 1
    let high = nums.length - 1
    let currSum
    while (low < high) {
      currSum = nums[i] + nums[low] + nums[high]
      if (currSum === target) return target
      if (currSum < target) {
        low++
      } else {
        high--
      }
      if (Math.abs(target - currSum) < Math.abs(target - closestSum)) {
        closestSum = currSum
      }
    }
  }
  return closestSum
}

// console.log(threeSumClosest([-1, 2, 1, -4], 1)) // 2
// console.log(threeSumClosest([0, 0, 0], 1)) // 0

/**
 * Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
 * - a, b, c, d are distinct
 * - nums[a] + nums[b] + nums[c] + nums[d] = target
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b)
  let idxsHighest = {}
  for (let i = 0; i < nums.length; i++) {
    idxsHighest[nums[i]] = i
  }

  let idxsLowest = {}
  for (let i = nums.length - 1; i > -1; i--) {
    idxsLowest[nums[i]] = i
  }

  let quadruplets = []
  for (let i = 0; i < nums.length - 3; i++) {
    for (let j = i + 1; j < nums.length - 2; j++) {
      let low = j + 1
      let high = nums.length - 1
      while (low < high) {
        let requiredSum = target - (nums[i] + nums[j])
        let currSum = nums[low] + nums[high]
        if (currSum === requiredSum) {
          quadruplets.push([nums[i], nums[j], nums[low], nums[high]])
          low = idxsHighest[nums[low]]
          low++
          high = idxsLowest[nums[high]]
          high--
        } else if (currSum < requiredSum) {
          low++
        } else {
          high--
        }
      }
      j = idxsHighest[nums[j]]
    }
    i = idxsHighest[nums[i]]
  }
  return quadruplets
}

// console.log(fourSum([1, 0, -1, 0, -2, 2], 0)) // [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
// console.log(fourSum([2, 2, 2, 2, 2], 8)) // [[2, 2, 2, 2]]
// console.log(fourSum([-3, -2, -1, 0, 0, 1, 2, 3], 0)) // [[-3, -2, 2, 3], [-3, -1, 1, 3], [-3, 0, 0, 3], [-3, 0, 1, 2], [-2, -1, 0, 3], [-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]

/**
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.
 *
 * Input: digits = "23"
 * Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
// O(4^n) (worst case there are 4 options for each number)
var getPermutations = function (digits, idx = 0) {
  if (idx === digits.length) return new Set([''])
  let map = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }

  let permutations = getPermutations(digits, idx + 1)
  let set = new Set([''])
  let letters = map[digits[idx]]
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i]
    permutations.forEach((subPerm) => {
      set.add(`${letter}${subPerm}`)
    })
    // break
  }
  return set
}

function letterCombinations(digits) {
  if (digits.length === 0) return []
  let perms = getPermutations(digits)
  return [...perms].reduce((acc, el) => {
    if (el.length === digits.length) {
      acc.push(el)
    }
    return acc
  }, [])
}

// console.log(letterCombinations('23')) // ["ad","ae","af","bd","be","bf","cd","ce","cf"]

/**
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 *
 * Example 1:
 * Input: n = 3
 * Output: ["((()))","(()())","(())()","()(())","()()()"]
 *
 * Example 2:
 * Input: n = 1
 * Output: ["()"]
 */

/**
 * Algorithm -
 * - You always must have n open parens and n closed parens to have a valid combination
 * - You cannot add more closed parens than open parens
 *    n = 3
 *    [')'] -> invalid because there are 0 open and 1 closed
 *    ['(', ')'] -> valid because we have 1 open and 1 closed
 *    ['(', ')', '('] -> valid because we have 2 open and 1 closed (more open than closed)
 */
/**
 * @param {number} n
 * @return {string[]}
 */
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let stack = []
  let output = []

  function backtrack(leftCount, rightCount) {
    // Base case where count of left and right braces is
    // "n"
    if (leftCount === n && rightCount === n) {
      // Join the array elements into a string without any
      // separators.
      let outputStr = stack.join('')
      output.push(outputStr)
    }

    // Case where we can still append left braces
    if (leftCount < n) {
      stack.push('(')
      backtrack(leftCount + 1, rightCount)
      stack.pop()
    }

    // Case where we append right braces if the current
    // count of right braces is less than the count of
    // left braces
    if (rightCount < leftCount) {
      stack.push(')')
      backtrack(leftCount, rightCount + 1)
      stack.pop()
    }
  }

  backtrack(0, 0)

  return output
}

// console.log(generateParenthesis(3)) // ["((()))","(()())","(())()","()(())","()()()"]
// console.log(generateParenthesis(1)) // ["()""]

// Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0]) {
      let pointer = 0
      let found = false
      while (pointer < needle.length) {
        if (haystack[pointer + i] === needle[pointer]) {
          if (pointer === needle.length - 1) found = true
        } else {
          break
        }
        pointer++
      }
      if (found === true) return i
    }
  }
  return -1
}

// console.log(strStr('hello', 'll')) // 2

/**
 *  Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring
 *
 * Example:
 * Example 1:
 * Input: s = "(()"
 * Output: 2
 * Explanation: The longest valid parentheses substring is "()"
 *
 * Example 2:
 * Input: s = ")()())"
 * Output: 4
 * Explanation: The longest valid parentheses substring is "()()"
 *
 * Example 3:
 * Input: s = """
 * Output: 0
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  let open = 0,
    close = 0,
    maxLen = 0

  for (let char of s) {
    if (char === '(') open++
    else close++
    if (open === close) maxLen = Math.max(maxLen, close * 2)
    else if (close > open) open = close = 0
  }

  open = close = 0

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')') close++
    else open++
    if (open === close) maxLen = Math.max(maxLen, open * 2)
    else if (open > close) open = close = 0
  }
  return maxLen
}

// console.log(longestValidParentheses('(()')) // 2
// console.log(longestValidParentheses(')()())')) // 4
// console.log(longestValidParentheses('')) // 0
// console.log(longestValidParentheses('()(()')) // 2

/**
 * Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
 * You must write an algorithm with O(log n) runtime complexity.
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findPivot = function (arr) {
  let low = 0
  let high = arr.length - 1
  let pivotIdx
  if (arr[low] < arr[high]) return 0
  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (low === high) {
      pivotIdx = low
      break
    }
    if (
      (arr[mid] <= arr[mid + 1] && arr[mid] < arr[mid - 1]) ||
      (arr[mid] < arr[mid + 1] && arr[mid] <= arr[mid - 1])
    ) {
      pivotIdx = mid
      break
    }
    if (arr[mid] < arr[high]) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }
  return pivotIdx
}
var search = function (nums, target) {
  let pivotIdx = findPivot(nums)

  let left, right
  if (target === nums[pivotIdx]) {
    return pivotIdx
  } else if (target <= nums[nums.length - 1]) {
    left = pivotIdx
    right = nums.length - 1
  } else if (target >= nums[0]) {
    left = 0
    right = pivotIdx
  }

  while (left <= right) {
    // if (left === right) return left
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

// console.log(search([4, 5, 6, 7, 0, 1, 2], 3)) // -1
console.log('mine', search([3, 1], 1)) // 1
// console.log(search([4, 5, 6, 7, 0, 1, 2], 0)) // 4
// console.log(search([1], 0)) // -1
// console.log(search([3, 5, 8, 1, 2], 2)) // 4
// console.log(search([3, 1], 3)) // 0
// console.log(search([1], 0)) // -1
// console.log(search([1, 3], 1)) // 0

/**
 * Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1].
 * You must write an algorithm with O(log n) runtime complexity.
 */

var searchRange = function (nums, target) {
  const binarySearch = (nums, target, isSearchingLeft) => {
    let left = 0
    let right = nums.length - 1
    let idx = -1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      if (nums[mid] > target) {
        right = mid - 1
      } else if (nums[mid] < target) {
        left = mid + 1
      } else {
        idx = mid
        if (isSearchingLeft) {
          right = mid - 1
        } else {
          left = mid + 1
        }
      }
    }

    return idx
  }

  const left = binarySearch(nums, target, true)
  const right = binarySearch(nums, target, false)

  return [left, right]
}

// console.log(searchRange([5, 7, 7, 8, 8, 8, 8, 10], 8)) // [3, 6]
// console.log(searchRange([5, 7, 7, 8, 8, 10], 6)) // [-1. -1]
// console.log(searchRange([1], 1)) // [0. 0]

/**
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
 * Each element nums[i] represents the maximum length of a forward jump from index i.
 * i + j < n
 * Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
 */

var jump = function (nums) {
  let res = 0
  let left = 0
  let right = 0
  while (right < nums.length - 1) {
    let farthest = 0
    for (let i = left; i < right + 1; i++) {
      farthest = Math.max(farthest, i + nums[i])
    }
    left = right + 1
    right = farthest
    res++
  }
  return res
}

console.log(jump([2, 3, 1, 1, 4])) // 2
console.log(jump([2, 3, 0, 1, 4])) // 2
console.log(jump([2, 2, 1, 4, 3, 1, 2, 1, 8])) // 4
