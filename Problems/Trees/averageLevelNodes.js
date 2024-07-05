/**
 * Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
  let queue = [root]
  let queue2 = []
  let avgs = []
  while (true) {
    if (queue.length) {
      let total = queue.reduce((sum, node) => {
        return sum + node.val
      }, 0)
      avgs.push(total / queue.length)
      while (queue.length) {
        let node = queue.shift()
        if (node.left) queue2.push(node.left)
        if (node.right) queue2.push(node.right)
      }
    }
    queue = queue2
    queue2 = []
    if (queue.length === 0 && queue2.length === 0) break
  }
  return avgs
}

let t5 = new TreeNode(15)
let t4 = new TreeNode(7)
let t3 = new TreeNode(20, t5, t4)
let t2 = new TreeNode(9)
let t1 = new TreeNode(3, t2, t3)

console.log(averageOfLevels(t1)) // [3,14,11]
