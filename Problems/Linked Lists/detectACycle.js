/**
 * Given head, the head of a linked list, determine if the linked list has a cycle in it.
 * There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
 * Return true if there is a cycle in the linked list. Otherwise, return false.
 */

function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (head === null) return false
  let walker = head
  let runner = head
  while (runner.next !== null && runner.next.next !== null) {
    walker = walker.next
    runner = runner.next.next
    if (walker === runner) return true
  }
  return false
}

let anode3 = new ListNode(3)
let anode2 = new ListNode(2)
anode3.next = anode2
anode3.next.next = new ListNode(0)
anode3.next.next.next = new ListNode(-4)
anode3.next.next.next.next = anode2
console.log(hasCycle(anode3)) // true

let bnode1 = new ListNode(1)
let bnode2 = new ListNode(2)
bnode1.next = bnode2
bnode2.next = bnode1
console.log(hasCycle(bnode1)) // true

let cnode1 = new ListNode(1)
console.log(hasCycle(cnode1)) // false
