function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  function dfs(head) {
    let path = []
    function traverse(node) {
      if (!node) return []
      if (node.left) traverse(node.left)
      else path.push(null)
      if (node.right) traverse(node.right)
      else path.push(null)
      path.push(node.val)
    }
    traverse(head)
    return path
  }
  let pPath = dfs(p)
  let qPath = dfs(q)
  return (
    pPath.every((el, i) => qPath[i] === el) &&
    qPath.every((el, i) => pPath[i] === el)
  )
}

let t2 = new TreeNode(2)
let t3 = new TreeNode(3)
let t1 = new TreeNode(1, t2, t3)

let tb2 = new TreeNode(2)
let tb3 = new TreeNode(3)
let tb1 = new TreeNode(1, tb2, tb3)

let tc2 = new TreeNode(2)
let tc1 = new TreeNode(1, tc2)
console.log(JSON.stringify(tc1, null, 2))
console.log(isSameTree(t1, tb1)) // true
console.log(isSameTree(t1, tc1)) // false
