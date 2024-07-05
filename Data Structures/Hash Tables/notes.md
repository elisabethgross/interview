# Hash Tables

## How To Deal With Collisions
- **Separate Chaining** - Store multiple keys at the same index in a nested data structure like an array or a linked list
- **Linear Probing** - If something is already at that index, look for the next available slot in the hash and store it there

## General Hash Table Notes
- Using a prime number length array, makes a HUGE difference in reducing the number of collisions

## Big O
 - insert: O(1)
 - delete: O(1)
 - access: O(1)


