class MaxBinaryHeap {
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
  insert(val) {
    this.values.push(val)
    this.bubbleUp()
  }
  // O(logn)
  bubbleUp() {
    let idx = this.values.length - 1
    let el = this.values[idx]
    while (idx > 0) {
      let parent = this.getParent(idx)
      if (el <= parent.val) break
      this.values[parent.idx] = el
      this.values[idx] = parent.val
      idx = parent.idx
    }
    return this.values
  }
  // O(logn)
  extractMax() {
    let max = this.values[0]
    let end = this.values[this.values.length - 1]
    this.values[0] = end
    this.values.pop()
    this.sinkDown()
    return max
  }
  // O(logn)
  sinkDown() {
    let parentIdx = 0
    while (true && parentIdx !== this.values.length - 1) {
      let leftChild = this.getLeftChild(parentIdx)
      let rightChild = this.getRightChild(parentIdx)
      let parent = this.values[parentIdx]
      let swap = null
      if (leftChild.val && parent <= leftChild.val) {
        swap = leftChild.idx
      }
      if (
        rightChild.val &&
        parent <= rightChild.val &&
        rightChild.val > leftChild.val
      ) {
        swap = rightChild.idx
      }
      if (!swap) {
        break
      }

      ;[this.values[parentIdx], this.values[swap]] = [
        this.values[swap],
        this.values[parentIdx],
      ]
      parentIdx = swap
    }
  }
  // O(log n)
  extractMaxRecursive = () => {
    var max = this.values[0]
    this.values[0] = this.values[this.values.length - 1]
    this.values.pop()
    this.sinkDownRecursive(0)
    return max
  }
  // O(log n)
  sinkDownRecursive = (i) => {
    var parentIdx = i
    var left = this.getLeftChild(i)
    var right = this.getRightChild(i)

    // if left is in the bounds and its value is greater than the parent, set swap index to be the left child's index
    if (left.val && left.val > this.values[parentIdx]) {
      parentIdx = left.idx
    }
    // if right is in the bounds and its value is greater than the parent, set swap index to be the right child's index
    if (right.val && right.val > this.values[parentIdx]) {
      parentIdx = right.idx
    }

    // if swaps have occurred, swap
    if (i !== parentIdx) {
      var temp = this.values[i]
      this.values[i] = this.values[parentIdx]
      this.values[parentIdx] = temp
      this.sinkDownRecursive(parentIdx)
    }
  }
  // returns true if index is of a node that has no children
  isLeaf(index) {
    return (
      index >= Math.floor(this.values.length / 2) &&
      index <= this.values.length - 1
    )
  }
}

let maxBinaryHeap = new MaxBinaryHeap()
// maxBinaryHeap.values = [55, 39, 41, 18, 27, 12, 33]
// maxBinaryHeap.values = [36, 19, 25, 18, 17, 24, 1]
// maxBinaryHeap.insert(1)
// maxBinaryHeap.insert(2)
// maxBinaryHeap.insert(5)
// maxBinaryHeap.insert(3)
// console.log(maxBinaryHeap.extractMaxRecursive())
maxBinaryHeap.values = [5, 4, 1, 3, 2]
console.log(maxBinaryHeap.extractMax())
console.log(maxBinaryHeap.values)
