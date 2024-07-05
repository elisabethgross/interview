class QueueNode {
  constructor(val, priority) {
    this.val = val
    this.priority = priority
  }
}

// Priority queue is a min binary heap because priority of 1 takes precedence of priority of 3, therefore lower numbers would be dequeued first
class PriorityQueue {
  constructor() {
    this.values = []
  }
  getParent(idx) {
    let parentIdx = Math.floor((idx - 1) / 2)
    return {
      idx: parentIdx,
      val: this.values[parentIdx],
    }
  }
  getLeftChild(idx) {
    let leftChildIdx = idx * 2 + 1
    return {
      idx: leftChildIdx,
      val: this.values[leftChildIdx],
    }
  }
  getRightChild(idx) {
    let rightChildIdx = idx * 2 + 2
    return {
      idx: rightChildIdx,
      val: this.values[rightChildIdx],
    }
  }
  // O(logn)
  enqueue(val, priority) {
    let newNode = new QueueNode(val, priority)
    this.values.push(newNode)
    this.bubbleUp()
    return this.values
  }
  // O(logn)
  bubbleUp() {
    let idx = this.values.length - 1
    while (idx > 0) {
      let parent = this.getParent(idx)
      let el = this.values[idx]
      if (parent.val.priority < el.priority) break
      this.values[parent.idx] = el
      this.values[idx] = parent.val
      idx = parent.idx
    }
  }
  // O(logn)
  dequeue() {
    let min = this.values[0]
    let end = this.values[this.values.length - 1]
    this.values[0] = end
    this.values.pop()
    this.sinkDown()
    return min
  }
  // O(logn)
  sinkDown() {
    let idx = 0
    while (true) {
      let swap = null
      let el = this.values[idx]
      let leftChild = this.getLeftChild(idx)
      let rightChild = this.getRightChild(idx)

      if (leftChild.val && leftChild.val.priority <= el.priority) {
        swap = leftChild.idx
      }
      if (
        rightChild.val &&
        rightChild.val.priority <= el.priority &&
        rightChild.val.priority < leftChild.val.priority
      ) {
        swap = rightChild.idx
      }
      if (!swap) break
      let temp = this.values[swap]
      this.values[swap] = el
      this.values[idx] = temp
      idx = swap
    }
    return this.values
  }
}

let priorityQueue = new PriorityQueue()
priorityQueue.values = [
  { priority: 1, val: 'broken head' },
  { priority: 2, val: 'broken leg' },
  { priority: 2, val: 'broken arm' },
  { priority: 3, val: 'sprained wrist' },
  { priority: 4, val: 'cut' },
  { priority: 3, val: 'sprained ankle' },
  { priority: 5, val: 'rash' },
]
// console.log(priorityQueue.enqueue('broken shoulder', 2))
priorityQueue.dequeue()
console.log(priorityQueue.values)
