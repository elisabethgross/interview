class WeightedGraph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
    return this
  }
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({ vertex: v2, weight })
    this.adjacencyList[v2].push({ vertex: v1, weight })
    return this
  }
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      (edge) => edge.vertex !== v2
    )
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(
      (edge) => edge.vertex !== v1
    )
    return this
  }
  removeVertex(v) {
    while (this.adjacencyList[v].length) {
      let edge = this.adjacencyList[v].pop()
      this.removeEdge(v, edge)
    }
    delete this.adjacencyList[v]
    return this
  }
  Dijkstra(start, end) {
    let queue = new PriorityQueue()
    let distances = {}
    let previous = {}
    for (let v in this.adjacencyList) {
      if (v === start) {
        distances[v] = 0
        queue.enqueue(v, 0)
      } else {
        distances[v] = Infinity
        // queue.enqueue(v, Infinity)
      }
      previous[v] = null
    }
    let path = []
    while (queue.values.length) {
      let smallest = queue.dequeue().val
      if (smallest === end) {
        path.unshift(end)
        let next = previous[end]
        while (next) {
          path.unshift(next)
          next = previous[next]
        }
        break
      } else {
        this.adjacencyList[smallest].forEach(({ vertex, weight }) => {
          let totalDistance = weight + distances[smallest]
          if (totalDistance < distances[vertex]) {
            previous[vertex] = smallest
            distances[vertex] = totalDistance
            queue.enqueue(vertex, totalDistance)
          }
        })
      }
    }
    return path
  }
}

class PriorityQueue {
  constructor() {
    this.values = []
  }
  enqueue(val, priority) {
    this.values.push({ val, priority })
    this.sort()
  }
  dequeue() {
    return this.values.shift()
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority)
  }
}

// var g = new WeightedGraph()

// g.addVertex('A')
// g.addVertex('Z')
// g.addVertex('C')
// g.addVertex('D')
// g.addVertex('E')
// g.addVertex('H')
// g.addVertex('Q')
// g.addVertex('G')

// g.addEdge('A', 'Z', 7)
// g.addEdge('A', 'C', 8)

// g.addEdge('Z', 'Q', 2)

// g.addEdge('C', 'G', 4)

// g.addEdge('D', 'Q', 8)

// g.addEdge('E', 'H', 1)

// g.addEdge('H', 'Q', 3)

// g.addEdge('Q', 'C', 6)

// g.addEdge('G', 'Q', 9)

// console.log(g.Dijkstra('A', 'E')) // ["A", "Z", "Q", "H", "E"]
// g.Dijkstra('A','Q') // ["A", "Z", "Q"]
// g.Dijkstra('A','G') // ["A", "C", "G"]
// g.Dijkstra('A','D') // ["A", "Z", "Q", "D"]

// remove nth node from the end of linked list
function removeNode(head, n) {
  let stack = []
  let curr = head
  while (curr) {
    stack.push(curr)
    curr = curr.next
  }
  let i = n
  let removed = null
  while (i > 0) {
    let node = stack.pop()
    removed = node
    i--
  }

  let beforeRemoval = null
  if (stack.length) {
    beforeRemoval = stack.pop()
    beforeRemoval.next = removed.next
  }
  if (!beforeRemoval) {
    let newHead = removed.next || []
    removed.next = null
    return newHead
  }
  return head
}

function removeNodeOptimized(head, n) {
  let dummy = new LinkedListNode()
  dummy.next = head
  let fast = dummy
  let slow = dummy

  while (n && fast) {
    n--
    fast = fast.next
  }
  fast = fast.next

  while (fast) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return dummy.next
}

class LinkedListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

let head1 = new LinkedListNode(1)
head1.next = new LinkedListNode(2)
head1.next.next = new LinkedListNode(3)
head1.next.next.next = new LinkedListNode(4)
head1.next.next.next.next = new LinkedListNode(5)

let head2 = new LinkedListNode(1)
head2.next = new LinkedListNode(2)

let head3 = new LinkedListNode(1)

let head4 = new LinkedListNode(1)
head4.next = new LinkedListNode(2)
head4.next.next = new LinkedListNode(3)
head4.next.next.next = new LinkedListNode(4)
head4.next.next.next.next = new LinkedListNode(5)

// console.log(JSON.stringify(removeNodeOptimized(head1, 2))) // [1, 2, 3, 5]
// console.log(JSON.stringify(removeNodeOptimized(head2, 1))) // [1]
// console.log(JSON.stringify(removeNodeOptimized(head3, 1))) // []
// console.log(JSON.stringify(removeNodeOptimized(head4, 5))) // [2, 3, 4, 5]

/**
 * Given a grid of robot positions, indicate if it is a valid time series for the number of robots specified if robots can only travel up to 1 index further than then their positions the step before.
 *
 * Example:
 *
 * [[1, 0, 0, 1], [0, 1, 1, 0]] --> valid
 *
 * [[1, 0, 0, 0, 1], [1, 0, 1, 0, 0]] --> invalid
 */

function robots(numRobots, grid) {
  for (let row = 1; row < grid.length; row++) {
    let rowRobots = 0
    let lastUsedIdx = -1
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1) {
        rowRobots++

        // if this el is a 1
        // look at the spot before this one (skipped if we are looking at the first el)
        // if lastUsedIdx is 2 positions before the one we're looking at
        // and the col we're looking at is not the first el
        // and the el before this el was originally a 1
        if (lastUsedIdx < col - 1 && col > 0 && grid[row - 1][col - 1] === 1) {
          // set lastUsedIdx to col - 1 (the robot moved from the spot before it 1 position to the right)
          lastUsedIdx = col - 1
          // if this el is a 1
          // look at the same spot in the grid
          // and lastUsedIdx is one position before the el we're looking at
          // and this el was originally a 1
        } else if (lastUsedIdx < col && grid[row - 1][col] === 1) {
          // set lastUsedIdx to col (the robot stayed in the same place)
          lastUsedIdx = col
          // if this el is a 1
          // look at the spot after el
          // and lastUsedIdx is less than one position after this el
          // and the element is not the last element
          // and the el 1 position to the right was originally a 1
        } else if (
          lastUsedIdx < col + 1 &&
          col < grid[0].length - 1 &&
          grid[row - 1][col + 1] === 1
        ) {
          // set lastUsedIdx to be one after this el
          // the el 1 position to the right of this el was originally a 1
          lastUsedIdx = col + 1
        } else {
          return false
        }
      }
    }
    if (rowRobots !== numRobots) return false
  }
  return true
}

// console.log(
//   robots(2, [
//     [1, 0, 0, 1],
//     [0, 1, 1, 0],
//   ])
// ) // true

// console.log(
//   robots(2, [
//     [1, 0, 0, 0, 1],
//     [1, 0, 1, 0, 0],
//   ])
// ) // false

// console.log(
//   robots(2, [
//     [0, 0, 1, 0, 1, 0, 0],
//     [0, 0, 0, 1, 0, 0, 0],
//   ])
// ) // false

// console.log(
//   robots(2, [
//     [0, 0, 1, 0, 1, 0, 0],
//     [0, 1, 0, 0, 0, 1, 0],
//   ])
// ) // true

/**
 * Run-length encoding is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "aabccc" we replace "aa" by "a2" and replace "ccc" by "c3". Thus the compressed string becomes "a2bc3".
 *
 * Notice that in this problem, we are not adding '1' after single characters.
 *
 * Given a string s and an integer k. You need to delete at most k characters from s such that the run-length encoded version of s has minimum length.
 * Find the minimum length of the run-length encoded version of s after deleting at most k characters.
 *
 * Example:
 * Input: s = "aaabcccd", k = 2
 * Output: 4
 * Explanation: Compressing s without deleting anything will give us "a3bc3d" of length 6. Deleting any of the characters 'a' or 'c' would at most decrease the length of the compressed string to 5, for instance delete 2 'a' then we will have s = "abcccd" which compressed is abc3d. Therefore, the optimal way is to delete 'b' and 'd', then the compressed version of s will be "a3c3" of length 4.
 *
 * https://www.youtube.com/watch?v=ISIG3o-Xofg
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLengthOfOptimalCompression = function (s, k) {
  const n = s.length
  const dp = Array.from({ length: s.length + 1 }, () =>
    Array(k + 1).fill(Infinity)
  )
  dp[0][0] = 0

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= k; j++) {
      let cnt = 0,
        del = 0
      for (let l = i; l >= 1; l--) {
        if (s.charAt(l - 1) === s.charAt(i - 1)) cnt++
        else del++

        if (j - del >= 0) {
          dp[i][j] = Math.min(
            dp[i][j],
            dp[l - 1][j - del] +
              1 +
              (cnt >= 100 ? 3 : cnt >= 10 ? 2 : cnt >= 2 ? 1 : 0)
          )
        }
      }
      if (j > 0) dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - 1])
    }
  }
  return dp[n][k]
}

// getLengthOfOptimalCompression('aaabcccd', 2)

// Given a string s, find the length of the longest substring without repeating characters.

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let max = 0
  let startIdx = 0
  let endIdx = 0
  let i = 0
  let seen = {}
  while (i < s.length) {
    endIdx = i
    if (seen[s[i]] > -1 && seen[s[i]] >= startIdx) {
      startIdx = seen[s[i]] + 1
    }
    seen[s[i]] = i
    i++
    max = Math.max(max, endIdx - startIdx + 1)
  }

  return max
}

// console.log(lengthOfLongestSubstring('abcabcbb')) // 3
// console.log(lengthOfLongestSubstring('bbbbb')) // 1
// console.log(lengthOfLongestSubstring('pwwkew')) // 3
// console.log(lengthOfLongestSubstring(' ')) // 1
// console.log(lengthOfLongestSubstring('au')) // 2
// console.log(lengthOfLongestSubstring('aab')) // 2
// console.log(lengthOfLongestSubstring('davdf')) // 4
// console.log(lengthOfLongestSubstring('abba')) // 2

// Given a string s, return the longest palindromic substring in s.

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let matrix = []
  for (let i = 0; i < s.length; i++) {
    matrix.push([])
    for (let j = 0; j < s.length; j++) {
      if (i === j) {
        matrix[i].push(1)
      } else {
        matrix[i].push(0)
      }
    }
  }
  let i = 0
  let j = 1
  while (j < s.length) {
    if (s[i] === s[j]) {
      matrix[i][j] = 1
    }
    i++
    j++
  }
  for (let i = 0; i < s.length; i++) {
    let start = 0
    let end = i + 2
    while (end < s.length) {
      if (s[start] === s[end]) {
        matrix[start][end] = matrix[start + 1][end - 1]
      }
      start++
      end++
    }
  }
  let maxLength = 0
  let longestPalindrome
  matrix.forEach((row) => {
    let earliest = 0
    let last = 0
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 1) {
        earliest = i
        break
      }
    }
    for (let j = row.length - 1; j > -1; j--) {
      if (row[j] === 1) {
        last = j
        break
      }
    }
    if (last - earliest + 1 > maxLength) {
      longestPalindrome = s.slice(earliest, last + 1)
    }
    maxLength = Math.max(maxLength, last - earliest + 1)
  })
  return longestPalindrome
}
// console.log(longestPalindrome('cbbd')) // bb
// console.log(longestPalindrome('xhannah')) // hannah
// console.log(longestPalindrome('yuababapp')) // ababa

/**
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * And then read line by line: "PAHNAPLSIIGYIR"
 *
 * Write the code that will take a string and make this conversion given a number of rows:
 */

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, rows) {
  let cycleLen = 2 * rows - 2
  let ret = ''
  for (let r = 0; r < rows; r++) {
    let increment = (rows - 1) * 2
    // first and last row
    for (let i = r; i < s.length; i += increment) {
      ret = ret.concat(s[i])
      let inBetweenCharIdx = i + increment - 2 * r
      // if we are not on first or last row and the in between char idx is in bounds
      if (r > 0 && r < rows - 1 && inBetweenCharIdx < s.length) {
        // console.log('r', r)
        // console.log('i', i)
        // console.log('i + increment - (2 * r)', i + increment - 2 * r)
        ret = ret.concat(s[i + increment - 2 * r])
      }
    }
  }
  return ret
}

// console.log(convert('PAYPALISHIRING', 4)) // PINALSIGYAHRPI
// console.log(convert('PAYPALISHIRING', 3)) // PAHNAPLSIIGYIR

// Write a function to reverse an integer
/**
 * @param {number} x
 * @return {number}
 */

var reverse = function (x) {
  let rev = 0
  let sign = x < 0 ? -1 : 1
  x = Math.abs(x)
  while (x !== 0) {
    let digit = x % 10
    rev = rev * 10 + digit
    x = Math.floor(x / 10)
  }
  return rev * sign
}

// console.log(reverse(-241)) // -142
// console.log(reverse(312)) // 213

// Is num a palindrome?

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0 || (x !== 0 && x % 10 === 0)) {
    return false
  }
  var half = 0
  while (x > half) {
    half = half * 10 + (x % 10)
    x = Math.floor(x / 10)
  }
  return x === half || x === Math.floor(half / 10)
}

// console.log(isPalindrome(121)) // true
// console.log(isPalindrome(12)) // false
// console.log(isPalindrome(1221)) // true
// console.log(isPalindrome(3172213)) // false
// console.log(isPalindrome(3127213)) // true

// Convert int to roman
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  let ret = ''
  let roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let sorted = Object.keys(roman).sort((a, b) => roman[b] - roman[a])
  let i = 0
  while (num > 4) {
    if (num < )
    while (num % roman[sorted[i]] === num) {
      i++
    }
    ret = ret.concat(sorted[i])
    num -= roman[sorted[i]]
  }
  for (let i = 0; i < num; i++) {
    ret = ret.concat(sorted[sorted.length - 1])
  }
  return ret
}

console.log(intToRoman(1994)) // MCMXCIV
