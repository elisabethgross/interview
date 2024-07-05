class QueueItem {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

class Queue {
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }
  enqueue(val) {
    const item = new QueueItem(val)
    if (this.size === 0) {
      this.first = item
      this.last = item
    } else {
      this.last.next = item
      this.last = item
    }
    return ++this.size
  }
  dequeue() {
    let item = null
    if (this.size === 0) return null
    else if (this.size === 1) {
      item = this.first
      this.first = null
      this.last = null
    } else {
      item = this.first
      this.first = this.first.next
      item.next = null
    }
    this.size--
    return item
  }
}
