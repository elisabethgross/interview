class StackItem {
  constructor(val) {
    this.val = val || null
  }
}

class Stack {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }
  push(val) {
    const newItem = new StackItem(val)
    if (this.size === 0) {
      this.first = newItem
      this.last = newItem
    } else {
      let next = this.first
      this.first = newItem
      newItem.next = next
    }
    return ++this.size
  }
  pop() {
    if (this.size === 0) return null
    let item = null
    if (this.size === 1) {
      item = this.first
      this.first = null
      this.last = null
    } else {
      item = this.first
      this.first = item.next
      item.next = null
    }
    this.size--
    return item
  }
}
