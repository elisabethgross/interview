class Node {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

/**
 * insertion at head or tail O(1)
 * insertion in the middle O(n)
 * removal at head or tail O(1)
 * removal at middle O(n)
 * searching is O(n)
 * access is O(n)
 */
class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  // add node to end of list
  push(val) {
    const node = new Node(val)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.length++
    return this
  }
  // remove last item
  pop() {
    if (!this.head) return undefined
    const popped = this.tail
    if (this.length === 1) {
      this.head = null
      this.tail = null
      return popped
    } else {
      const newTail = popped.prev
      newTail.next = null
      this.tail = newTail
      popped.prev = null
    }
    this.length--
    return popped
  }
  // remove first item from list
  shift() {
    if (this.length === 0) return undefined
    const popped = this.head
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = popped.next
      this.head.prev = null
      popped.next = null
    }
    this.length--
    return popped
  }
  // add node to beginning of list
  unshift(val) {
    const newNode = new Node(val)
    if (!this.head) {
      this.push(newNode)
      return this
    }
    const oldHead = this.head
    this.head = newNode
    newNode.next = oldHead
    oldHead.prev = newNode
    this.length++
    return this
  }
  // return node at given index
  get(idx) {
    if (idx < 0 || idx >= this.length) return undefined

    let counter, node
    if (idx < this.length / 2) {
      counter = 0
      node = this.head
      while (counter !== idx) {
        node = node.next
        counter++
      }
    } else {
      counter = this.length - 1
      node = this.tail
      while (counter !== idx) {
        node = node.prev
        counter--
      }
    }
    return node
  }
  // set val at idx
  set(idx, val) {
    let node = this.get(idx)
    if (!node) return false
    node.value = val
    return true
  }
  // insert node at idx
  insert(idx, val) {
    if (idx < 0 || idx > this.length) return false
    if (idx === 0) return !!this.unshift(val)
    if (idx === this.length) return !!this.push(val)

    const newNode = new Node(val)
    const beforeNode = this.get(idx - 1)
    const afterNode = beforeNode.next
    beforeNode.next = newNode
    newNode.prev = beforeNode
    afterNode.prev = newNode
    newNode.next = afterNode
    this.length++
    return true
  }
  // remove a node at a given idx
  remove(idx) {
    if (idx < 0 || idx >= this.length) return undefined
    if (idx === 0) return !!this.shift()
    if (idx === this.length - 1) return !!this.pop()

    const removedNode = this.get(idx)
    const beforeNode = removedNode.prev
    const afterNode = removedNode.next
    beforeNode.next = afterNode
    afterNode.prev = beforeNode
    removedNode.prev = null
    removedNode.next = null
    this.length--
    return removedNode
  }
  reverse() {
    let temp = null
    var current = this.head
    const newTail = this.head
    const newHead = this.tail
    this.tail = newTail
    this.head = newHead

    while (current != null) {
      temp = current.prev
      current.prev = current.next
      current.next = temp
      current = current.prev
    }
    return this
  }
}

const doublyLinkedList = new DoublyLinkedList()

doublyLinkedList.push(1)
doublyLinkedList.push(2)
doublyLinkedList.push(3)

console.log(doublyLinkedList.set(3, 'hello'))
console.log(doublyLinkedList.get(2))
