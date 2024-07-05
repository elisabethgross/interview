# Loops

## Breaking out of loops:

    ### for / while / for.. of loops
    - `return` in a loop ends the iteration, ends the function
    - `break` in a loop breaks the iteration, continues after loop

    THIS DOES NOT WORK FOR forEach

## for.. of / for.. in

- for.. of - use on iterables (objects are not iterables)
- for.. in - use to get all enumerable properties of an object
- **ONLY USE FOR..IN TO GET KEYS IN OBJECT**
- **FOR EVERYTHING ELSE, USE FOR..OF**
- `for (let [key, value] of Object.entries(obj))`

# Arrays

- `.splice`: mutates the array, used to add things / delete things (start, deleteCount, itemToInsert)
- `.slice`: creates new array, used to get a subset of an array (start, end)

# Big O

- logs - log2(8) --> 2 to what power gives you 8?
- **Big O(logn)** --> 2 to what power gives us n?
  - Example: binary search is `O(logn)` so if array is length 8, you must raise 2 to the power of 3. This compares to `O(n)` which would be 8 in our example. 3 is much less than 8 so `O(logn)` is significantly faster
  - Anytime you split something, and then split it again and then split that again, this is `O(logn)` (think recursion tree where the function divides the problem into smaller subproblems and solves each subproblem with a recursive call)

# Sorting Algorithms

- JS `.sort()` uses unicode code points so it works for strings (sorts alphabetically ascending) but NOT integers. You have to pass a sort callback for integers
- The sort callback looks at 2 elements, `a` and `b`, and if it gets a negative number `a` comes before `b` and if it gets a positive number, `b` comes before `a`
  - `(a, b) => return a - b ---> ascending`
  - `(a, b) => return b - a ---> descending`

# Binary Search Tree Traversals

- **Breadth First Search** - Visit all a level's nodes before going to the next level

  - ```
        10
      6    15
    3  8     20
    -> [10, 6, 15, 3, 8, 20]
    ```

- **Depth First Search: PreOrder** - Visit the current node first and then go all the way down the left subtree. After covering every node of the left subtree, move toward the right subtree and visit in a similar fashion
  - ```
        10
      6    15
    3  8     20
    -> [10, 6, 3, 8, 15, 20]
    ```
- **Depth First Search: PostOrder** - Traverse down the left subtree and visit the final node. Traverse back up the left and right subtrees until you reach the root node.
  - ```
        10
      6    15
    3  8     20
    -> [3, 8, 6, 20, 15, 10]
    ```
- **Depth First Search: InOrder** - Traverse down the left subtree and visit the final node. Traverse back up the tree and visit its right node. Repeat. The result of this list will be the numbers in ascending order.
  - ```
        10
      6    15
    3  8     20
    -> [3, 6, 8, 10, 15, 10]
    ```
- Best cases for dfs vs bfs:
  - If a tree has little depth and lots of breadth (every node has max amount of children), dfs will use less space
  - If a tree has a lot of depth and less breadth (every node doesn't have max amount of children), the queue will be small at any given time and bfs will use less space

# Random

- all permutations of a string n! where n is length of string
- DOM is a tree
- Deterministic - given the same output, you will always get the same output
- recursive fibonacci Big O is O(2^n^)
- **Greedy Algorithm** - take the first best option available (see `minCoinChange`)

# Big O of common library methods

- **.sort()**
  - Space Complexity O(log(N))
  - Time Complexity O(N \* log(N))
