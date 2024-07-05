# Heaps

- Heaps are a subset of trees
- Useful for sorting

## Max Binary Heap:
  - each node has max 2 children
  - all parent nodes are larger than its children (root node will be largest)
  - no guarantees between sibling nodes
  Example:
    ```
            36
        19      25
    18   17   24   1

    24 is less than 25 so it can be a child of 25 even though it is larger than 19 in the level above it
    1 can be to the right of 24 because it still fulfills the constraint of being less than the parent 25

- compact as possible, all children of each node are as full as can be, left node always filled first

## Min Binary Heap:
- same idea as max except every parent node is less than its children


## General Heap Notes
- Commonly used for Priority Queues
- Also used with graph traversals
- Can be represented like a tree with a Tree class and a TreeNode class
- Most commonly represented as an array
  Example:
  ```
          36
      19       25
    18   17  24   1

  [ 36, 19, 25, 18, 17, 24, 1 ]
- formula for finding child nodes of parent, where `i` is index of node -
  - left child = `2i + 1`
  - right child = `2i + 2`

- formula for finding parent of child, where `i` is index of node -
  - from either child = `Math.floor(i - 1) / 2`

### Big O
- Insert: `O(logn)`
- Remove: `O(logn)`
- Search: `O(n)` (because there is no ordering between siblings)
