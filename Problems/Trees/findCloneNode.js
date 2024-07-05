/**
 * Given two binary trees original and cloned and given a reference to a node target in the original tree.
 * The cloned tree is a copy of the original tree.
 * Return a reference to the same node in the cloned tree.
 * Note that you are not allowed to change any of the two trees or the target node and the answer must be a reference to a node in the cloned tree.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */

var getTargetCopy = function (original, cloned, target) {
  function dfs(root) {
    let branchPath = []
    function traverse(node) {
      branchPath.push(node)
      if (node === target) {
        return false
      }
      if (node.left) {
        let keepTraversing = traverse(node.left)
        if (!keepTraversing) return false
      }
      if (node.right) {
        let keepTraversing = traverse(node.right)
        if (!keepTraversing) return false
      }
      branchPath.pop()
      return true
    }
    traverse(root)
    return branchPath
  }
  let pathToTarget = dfs(original)

  let curr = cloned
  pathToTarget.shift()
  while (pathToTarget.length) {
    let node = pathToTarget.shift()
    if (curr.left?.val === node.val) {
      curr = curr.left
    } else if (curr.right?.val === node.val) {
      curr = curr.right
    } else {
      return false
    }
  }
  return curr
}

let t5 = new TreeNode(19)
let t4 = new TreeNode(6)
let t3 = new TreeNode(3, t4, t5)
let t2 = new TreeNode(4)
let t1 = new TreeNode(7, t2, t3)

let clone = { ...t1 }
console.log(getTargetCopy(t1, clone, t5)) // t3 in clone
