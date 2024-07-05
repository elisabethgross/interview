/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 * An input string is valid if:
 * - Open brackets must be closed by the same type of brackets.
 * - Open brackets must be closed in the correct order.
 * - Every close bracket has a corresponding open bracket of the same type.
 */

function isValid(str) {
  let open = {
    '(': ')',
    '{': '}',
    '[': ']',
  }
  let closed = {
    ')': '(',
    '}': '{',
    ']': '[',
  }

  let stack = []
  for (let i = 0; i < str.length; i++) {
    if (open[str[i]]) {
      stack.push(str[i])
    } else if (str[i] in closed) {
      if (closed[str[i]] === stack[stack.length - 1]) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  if (stack.length === 0) return true
  return false
}

// console.log(isValid('(hello{goodbye }[yo(1[2])])')) // true
// console.log(isValid('(hello{goodbye }}[yo(1[2])])')) // false
// console.log(isValid(''))
// console.log(isValid('()')) // true
// console.log(isValid('(')) // false

/**
 * Given a string path, which is an absolute path(starting with a slash '/') to a file or directory in a Unix - style file system, return the simplified canonical path.
 * In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.
 *
 * Example 1: Input: path = "/home/"
 * Output: "/home"
 * Explanation: Note that there is no trailing slash after the last directory name.
 * Example 2:
 *
 * Input: path = "/../"
 * Output: "/"
 * Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go.
 * Example 3:
 *
 * Input: path = "/home//foo/"
 * Output: "/home/foo"
 * Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one.
 */

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const stack = []
  const directories = path.split('/')
  console.log(directories)
  for (const dir of directories) {
    if (dir === '.' || !dir) {
      continue
    } else if (dir === '..') {
      if (stack.length > 0) {
        stack.pop()
      }
    } else {
      stack.push(dir)
    }
  }
  return '/' + stack.join('/')
}

// console.log(simplifyPath('/home/')) // '/home'
// console.log(simplifyPath('/../')) // '/'
// console.log(simplifyPath('/home//foo/')) // '/home/foo'

/**
 * Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring
 *
 * Example 1:
 * Input: s = "(()"
 * Output: 2
 * Explanation: The longest valid parentheses substring is "()".
 *
 * Example 2:
 * Input: s = ")()())"
 * Output: 4
 * Explanation: The longest valid parentheses substring is "()()".
 *
 * Example 3:
 * Input: s = ""
 * Output: 0
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (S) {
  let stack = [-1],
    ans = 0
  for (let i = 0; i < S.length; i++)
    if (S[i] === '(') stack.push(i)
    else if (stack.length === 1) stack[0] = i
    else stack.pop(), (ans = Math.max(ans, i - stack[stack.length - 1]))
  return ans
}

// console.log(longestValidParentheses('(()')) // 2
// console.log(longestValidParentheses(')()())')) // 4
// console.log(longestValidParentheses('')) // 0
// console.log(longestValidParentheses(')((())))')) // 0

/**
 * You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.
 * You are given a list of strings operations, where operations[i] is the ith operation you must apply to the record and is one of the following
 *
 * An integer x
 * Record a new score of x
 *
 * '+'
 * Record a new score that is the sum of the previous two scores
 *
 * 'D'
 * Record a new score that is the double of the previous score
 *
 * 'C'
 * Invalidate the previous score, removing it from the record
 *
 * Return the sum of all the scores on the record after applying all the operations.
 *
 * Example 1:

 * Input: ops = ["5","2","C","D","+"]
 * Output: 30
 * Explanation:
 * "5" - Add 5 to the record, record is now [5].
 * "2" - Add 2 to the record, record is now [5, 2].
 * "C" - Invalidate and remove the previous score, record is now [5].
 * "D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
 * "+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
 * The total sum is 5 + 10 + 15 = 30.
 */

const calPoints = (ops) => {
  return ops
    .reduce((score, op, idx) => {
      if (op === 'C') score.pop()
      else if (op === 'D') score.push(score[score.length - 1] * 2)
      else if (op === '+')
        score.push(score[score.length - 1] + score[score.length - 2])
      else score.push(+op)
      return score
    }, [])
    .reduce((sum, num) => (sum += num), 0)
}

// console.log(calPoints(['5', '2', 'C', 'D', '+'])) // 30
// console.log(calPoints(['5', '-2', '4', 'C', 'D', '9', '+', '+'])) // 27

/**
 * The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
 *
 * You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.
 *
 * For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.
 *
 * Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.
 *
 * Example 1:
 *
 * Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
 * Output: [-1,3,-1]
 * Explanation: The next greater element for each value of nums1 is as follows:
 * - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
 * - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
 * - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
 * Example 2:
 *
 * Input: nums1 = [2,4], nums2 = [1,2,3,4]
 * Output: [3,-1]
 * Explanation: The next greater element for each value of nums1 is as follows:
 * - 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
 * - 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const map = new Map() // map for next greater element
  const stack = []
  for (let num of nums2) {
    while (stack.length && stack[stack.length - 1] < num) {
      // Pop elements from stack and update map with next greater element
      map.set(stack.pop(), num)
    }
    stack.push(num) // Push current element onto stack
  }
  for (let i = 0; i < nums1.length; i++) {
    // Check if each element in nums1 has a next greater element in map
    nums1[i] = map.has(nums1[i]) ? map.get(nums1[i]) : -1 // Update element in nums1 with next greater element or -1
  }
  return nums1
}

function nextGreaterElementNaive(nums1, nums2) {
  let ret = []
  for (let i = 0; i < nums1.length; i++) {
    let nums2Idx = nums2.findIndex((el) => nums1[i] === el)
    let found = false
    for (let j = nums2Idx + 1; j < nums2.length; j++) {
      if (nums2[j] > nums1[i]) {
        ret.push(nums2[j])
        found = true
        break
      }
    }
    if (!found) ret.push(-1)
  }
  return ret
}

// console.log(nextGreaterElement([4, 1, 2], [1, 3, 4, 2, 5])) // [5, 3, 5]
// console.log(nextGreaterElement([2, 4], [1, 2, 3, 4])) // [3, -1]
// console.log(nextGreaterElementNaive([4, 3, 6, 10], [6, 5, 10, 3, 2, 4, 8])) // [8, 4, 10, -1]

// stack with two queues
class Stack {
  constructor() {
    this.q1 = new Queue()
    this.q2 = new Queue()
  }
  push(val) {
    let node = new Node(val)
    this.q2.enqueue(node)
    let next = this.q1.first
    while (next) {
      this.q2.enqueue(next)
      next = next.next
    }
    let temp = this.q1
    this.q1 = this.q2
    this.q2 = temp
    return this
  }
  pop() {
    let removed = this.q1.dequeue()
  }
}


class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Queue {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }
  enqueue(data) {
    var node = new Node(data)

    if (!this.first) {
      this.first = node
      this.last = node
    } else {
      this.last.next = node
      this.last = node
    }

    return ++this.size
  }

  dequeue() {
    if (!this.first) return null

    var temp = this.first
    if (this.first == this.last) {
      this.last = null
    }
    this.first = this.first.next
    this.size--
    return temp.value
  }
}

// const s = new Stack()
// s.push(10).push(20).push(30)
// s.pop()
