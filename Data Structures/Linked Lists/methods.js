class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

/**
 * insertion at head or tail O(1)
 * insertion in the middle O(n)
 * removal at head O(1)
 * removal at tail or middle O(n)
 * searching is O(n)
 * access is O(n)
 */
class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  // add node to the end of linked list
  push(val) {
    const node = new Node(val)
    if (!this.head) {
      this.head = node
      this.tail = this.head
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.length++
    return this
  }
  // remove last node
  pop() {
    if (this.length === 0) return undefined
    let current = this.head
    let newTail = current
    while (current.next) {
      newTail = current
      current = current.next
    }
    this.tail = newTail
    this.tail.next = null
    this.length--
    if (this.length === 0) {
      this.head = null
      this.tail = null
    }
    return current
  }
  // remove first node
  shift() {
    if (this.length === 0) return undefined
    const oldHead = this.head
    const newHead = oldHead.next
    oldHead.next = null
    this.head = newHead
    this.length--
    if (this.length === 0) {
      this.tail = null
    }
    return oldHead
  }
  // add node to beginning of linked list
  unshift(val) {
    const newHead = new Node(val)
    if (!this.head) {
      this.head = newHead
      this.tail = newHead
    } else {
      newHead.next = this.head
      this.head = newHead
    }
    this.length++
    return this
  }
  // get a node
  get(idx) {
    if (idx > this.length - 1 || idx < 0) return undefined
    let counter = 0
    let currentNode = this.head
    while (counter !== idx) {
      counter++
      currentNode = currentNode.next
    }
    return currentNode
  }
  // update node value at idx
  set(val, idx) {
    const node = this.get(idx)
    if (node) {
      node.value = val
      return true
    }
    return false
  }
  // insert node at idx
  insert(val, idx) {
    if (idx < 0 || idx > this.length) return false
    if (idx === 0) return !!this.unshift(val)
    if (idx === this.length) return !!this.push(val)
    const newNode = new Node(val)
    let oldPrevNode = this.get(idx - 1)
    const oldNode = oldPrevNode.next

    oldPrevNode.next = newNode
    newNode.next = oldNode
    this.length++
    return true
  }
  // remove a node at idx
  remove(idx) {
    if (idx < 0 || idx >= this.length) return undefined
    if (idx === 0) return this.shift()
    if (idx === this.length - 1) return this.pop()

    const prev = this.get(idx - 1)
    const removed = prev.next
    prev.next = removed.next
    this.length--
    return removed
  }
  // reverse linked list in place
  reverse() {
    let node = this.head
    this.head = this.tail
    this.tail = node
    let next = null
    let prev = null

    for (let i = 0; i < this.length; i++) {
      next = node.next
      node.next = prev
      prev = node
      node = next
    }
    return this
  }
  // 1 -> 2 -> 3 -> 4 -> 5 rotate(2) ==> 3 -> 4 -> 5 -> 1 -> 2
  // 1 -> 2 -> 3 -> 4 -> 5 rotate(-2) ==> 4 -> 5 -> 1 -> 2 -> 3
  rotate(num) {
    let counter = 0
    if (num > -1) {
      let curr = this.head
      while (counter < num) {
        this.head = curr.next
        this.tail.next = curr
        this.tail = curr
        curr = curr.next
        this.tail.next = null

        counter++
      }
    } else {
      while (counter < Math.abs(num)) {
        let prev = null
        let curr = this.head
        while (curr.next) {
          prev = curr
          curr = curr.next
        }
        this.tail = prev
        this.tail.next = null
        curr.next = this.head
        this.head = curr
        counter++
      }
    }

    return this
  }
}

const linkedList = new LinkedList()
linkedList.push(1)
linkedList.push(2)
linkedList.push(3)
linkedList.push(4)
linkedList.push(5)

console.log(linkedList.reverse())
console.log(JSON.stringify(linkedList, null, 2))
