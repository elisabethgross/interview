// Definition for singly-linked list.
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

/**
 * You are given two non - empty linked lists representing two non - negative integers.The digits are stored in reverse order, and each of their nodes contains a single digit.Add the two numbers and return the sum as a linked list.
 *
 * You may assume the two numbers do not contain any leading zero, except the number 0 itself.
 *
 * Examples:
 * Input: l1 = [2,4,3], l2 = [5,6,4]
 * Output: [7,0,8]
 * Explanation: 342 + 465 = 807.
 *
 * Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * Output: [8,9,9,9,0,0,0,1]
 * Explanation: 9999999 + 9999 = 10009998
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummyHead = new ListNode(0)
  let current = dummyHead
  let carry = 0

  while (l1 || l2) {
    const x = l1 ? l1.val : 0
    const y = l2 ? l2.val : 0
    const sum = x + y + carry
    carry = Math.floor(sum / 10)
    current.next = new ListNode(sum % 10)
    current = current.next

    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }
  if (carry > 0) {
    current.next = new ListNode(carry)
  }
  return dummyHead.next
}

// const l1 = new ListNode(9)
// const l2 = new ListNode(9)
// const l3 = new ListNode(9)
// const l4 = new ListNode(9)
// const l5 = new ListNode(9)
// const l6 = new ListNode(9)
// const l7 = new ListNode(9)
// l6.next = l7
// l5.next = l6
// l4.next = l5
// l3.next = l4
// l2.next = l3
// l1.next = l2

// const p1 = new ListNode(9)
// const p2 = new ListNode(9)
// const p3 = new ListNode(9)
// const p4 = new ListNode(9)
// p3.next = p4
// p2.next = p3
// p1.next = p2

// console.log(addTwoNumbers(l1, p1))

// Remove nth node from end
// Examples: 1 -> 2 -> 3 -> 4 -> 5 -> 6, 2 => 1 -> 2 -> 3 -> 4 -> 6
var removeNthFromEnd = function (head, n) {
  let fast = head,
    slow = head
  for (let i = 0; i < n; i++) fast = fast.next
  if (!fast) return head.next
  while (fast.next) (fast = fast.next), (slow = slow.next)
  slow.next = slow.next.next
  return head
}

// const q1 = new ListNode(1)
// const q2 = new ListNode(2)
// const q3 = new ListNode(3)
// const q4 = new ListNode(4)
// const q5 = new ListNode(5)
// const q6 = new ListNode(6)

// q5.next = q6
// q4.next = q5
// q3.next = q4
// q2.next = q3
// q1.next = q2

// console.log(JSON.stringify(removeNthFromEnd(q1, 1), null, 2))

// merge two sorted linked lists
var mergeTwoLists = function (list1, list2) {
  if (!list1) {
    return list2
  }
  if (!list2) {
    return list1
  }
  if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  } else {
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
  }
}

// const q1 = new ListNode(2)
// const q2 = new ListNode(3)
// const q3 = new ListNode(4)
// const p1 = new ListNode(1)
// const p2 = new ListNode(1)
// const p3 = new ListNode(1)

// q2.next = q3
// q1.next = q2

// p2.next = p3
// p1.next = p2

// swap pairs in a linked list 1 -> 2 -> 3 -> 4 -> 5 -> 6 ===> 2 -> 1 -> 4 -> 3 -> 6 -> 5
var swapPairs = function (head) {
  if (head == null || head.next == null) {
    return head
  }
  let dummy = new ListNode(0)
  dummy.next = head
  let curr = dummy
  while (curr.next != null && curr.next.next != null) {
    let t1 = curr.next
    let t2 = curr.next.next
    curr.next = t2
    t1.next = t2.next
    t2.next = t1
    curr = curr.next.next
  }
  return dummy.next
}

// const q1 = new ListNode(1)
// const q2 = new ListNode(2)
// const q3 = new ListNode(3)
// const q4 = new ListNode(4)
// const q5 = new ListNode(5)
// const q6 = new ListNode(6)

// q5.next = q6
// q4.next = q5
// q3.next = q4
// q2.next = q3
// q1.next = q2

// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.
// Definition for singly-linked list.
class ListNode {
  constructor(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

// Reverse k number of nodes in a linked list
// Examples:
// 1 -> 2 -> 3 -> 4 -> 5 -> 6, 3 ===> 3 -> 2 -> 1 -> 6 -> 5 -> 4
// 1 -> 2 -> 3 -> 4 -> 5 -> 6, 4 ===> 4 -> 3 -> 2 -> 1 -> 5 -> 6
var reverseKGroup = function (head, k) {
  // Count the number of ListNodes
  let n = 0
  for (let i = head; i != null; n++, i = i.next);

  // Create a dummy LinkedList
  let dummy = new ListNode(0)
  dummy.next = head

  // Loop through the nodes until we no longer have k or more remaining
  for (let prev = dummy, newTail = head; n >= k; n -= k) {
    // Loop through this batch of nodes being reversed
    for (let i = 1; i < k; i++) {
      // Flip the nodes to point in the opposite direction (reverse them)
      let next = newTail.next.next
      newTail.next.next = prev.next
      prev.next = newTail.next
      newTail.next = next
    }

    // Swap the current head for the reversed one
    prev = newTail
    newTail = newTail.next
  }
  return dummy.next
}

const q1 = new ListNode(1)
const q2 = new ListNode(2)
const q3 = new ListNode(3)
const q4 = new ListNode(4)
const q5 = new ListNode(5)
const q6 = new ListNode(6)
const q7 = new ListNode(7)

q6.next = q7
q5.next = q6
q4.next = q5
q3.next = q4
q2.next = q3
q1.next = q2

/**
 * flatten a multilevel linked list
 * Example:
 * 1 -> <- 2 -> <- 3 -> <- 4 -> <- 5 -> <- 6
 *                 ↓
 *                 7 -> <- 8 -> <- 9 -> <- 10
 *                         ↓
 *                         11 -> <- 12
 * ==> 1 -> <- 2 -> <- 3 -> <- 7 -> <- 8 -> <- 11 -> <- 12 -> <-  9 -> <- 10 -> <- 4 -> <- 5 -> <- 6
 */
var flatten = function (head) {
  if (!head) return head
  function helper(head) {
    let curr = head

    while (curr) {
      if (curr.child) {
        const [subHead, subTail] = helper(curr.child)
        let oldNext = curr.next
        curr.next = subHead
        subHead.prev = curr
        subTail.next = oldNext
        if (oldNext) oldNext.prev = subTail
        curr.child = null
      }
      if (curr.next) curr = curr.next
      else break
    }
    return [head, curr]
  }
  helper(head)

  return head
}

// let q1 = new ListNode(1)
// let q2 = new ListNode(2)
// let q3 = new ListNode(3)
// let q4 = new ListNode(4)
// let q5 = new ListNode(5)
// let q6 = new ListNode(6)
// let q7 = new ListNode(7)
// let q8 = new ListNode(8)
// let q9 = new ListNode(9)
// let q10 = new ListNode(10)
// let q11 = new ListNode(11)
// let q12 = new ListNode(12)

// q1.next = q2
// q2.prev = q1
// q2.next = q3
// q3.child = q7
// q3.next = q4
// q3.prev = q2
// q4.prev = q3
// q4.next = q5
// q5.prev = q4
// q5.next = q6
// q6.prev = q5
// q7.next = q8
// q8.prev = q7
// q8.next = q9
// q9.prev = q8
// q9.next = q10
// q10.prev = q9
// q8.child = q11
// q11.next = q12
// q12.prev = q11
