# Data Structures and Algorithms — Pattern Recognition Practice

> The hardest part of a new problem is not the code. It is picking the right pattern in the first few minutes. This file trains that skill. It lists every solved problem in this subject, gives you a cheat sheet from "signal in the problem" to "pattern", and then gives you 40 new problems where your only job is to name the pattern and the key idea before you open the answer.

**Before this:** work through at least a few of the [pattern documents](README.md), and read [Problem solving and complexity](../11-coding-interviews/02-problem-solving-and-complexity.md). · **Interview questions:** [jump to the practice problems](#which-pattern)

## Table of contents

1. [All problems at a glance](#all-problems-at-a-glance)
2. [Pattern cheat sheet](#pattern-cheat-sheet)
3. [Which pattern?](#which-pattern)
4. [Interview strategy](#interview-strategy)
5. [Summary](#summary)

**How to use this file:**

- Use the first list to revise. Pick a problem, say the approach out loud, then open the link and check.
- Use the cheat sheet when you are stuck: read the problem again and look for the signal words.
- In the practice section, give yourself **2 minutes** per problem. Write down the pattern, the key idea and the target complexity. Then open "Answer".

---

## All problems at a glance

Every solved problem in this subject, in study order. Each link jumps straight to the problem.

### [01. Arrays and Hashing](01-arrays-and-hashing.md)

- [P1. Contains duplicate (Easy)](01-arrays-and-hashing.md#p1-contains-duplicate-easy)
- [P2. Valid anagram (Easy)](01-arrays-and-hashing.md#p2-valid-anagram-easy)
- [P3. Two sum (Easy)](01-arrays-and-hashing.md#p3-two-sum-easy)
- [P4. Majority element (Easy)](01-arrays-and-hashing.md#p4-majority-element-easy)
- [P5. Group anagrams (Medium)](01-arrays-and-hashing.md#p5-group-anagrams-medium)
- [P6. Top k frequent elements (Medium)](01-arrays-and-hashing.md#p6-top-k-frequent-elements-medium)
- [P7. Product of array except self (Medium)](01-arrays-and-hashing.md#p7-product-of-array-except-self-medium)
- [P8. Longest consecutive sequence (Medium)](01-arrays-and-hashing.md#p8-longest-consecutive-sequence-medium)
- [P9. Encode and decode strings (Medium)](01-arrays-and-hashing.md#p9-encode-and-decode-strings-medium)
- [P10. Valid sudoku (Medium)](01-arrays-and-hashing.md#p10-valid-sudoku-medium)
- [P11. Subarray sum equals k (Medium)](01-arrays-and-hashing.md#p11-subarray-sum-equals-k-medium)
- [P12. First missing positive (Hard)](01-arrays-and-hashing.md#p12-first-missing-positive-hard)

### [02. Two Pointers](02-two-pointers.md)

- [P1. Valid palindrome (Easy)](02-two-pointers.md#p1-valid-palindrome-easy)
- [P2. Squares of a sorted array (Easy)](02-two-pointers.md#p2-squares-of-a-sorted-array-easy)
- [P3. Remove duplicates from sorted array (Easy)](02-two-pointers.md#p3-remove-duplicates-from-sorted-array-easy)
- [P4. Move zeroes (Easy)](02-two-pointers.md#p4-move-zeroes-easy)
- [P5. Is subsequence (Easy)](02-two-pointers.md#p5-is-subsequence-easy)
- [P6. Merge sorted array (Easy)](02-two-pointers.md#p6-merge-sorted-array-easy)
- [P7. Two sum II on a sorted array (Medium)](02-two-pointers.md#p7-two-sum-ii-on-a-sorted-array-medium)
- [P8. 3Sum (Medium)](02-two-pointers.md#p8-3sum-medium)
- [P9. Container with most water (Medium)](02-two-pointers.md#p9-container-with-most-water-medium)
- [P10. Sort colors (Medium)](02-two-pointers.md#p10-sort-colors-medium)
- [P11. 4Sum (Medium)](02-two-pointers.md#p11-4sum-medium)
- [P12. Trapping rain water (Hard)](02-two-pointers.md#p12-trapping-rain-water-hard)

### [03. Sliding Window](03-sliding-window.md)

- [P1. Maximum sum subarray of size k (Easy)](03-sliding-window.md#p1-maximum-sum-subarray-of-size-k-easy)
- [P2. Contains duplicate within k (Easy)](03-sliding-window.md#p2-contains-duplicate-within-k-easy)
- [P3. Best time to buy and sell stock (Easy)](03-sliding-window.md#p3-best-time-to-buy-and-sell-stock-easy)
- [P4. Longest substring without repeating characters (Medium)](03-sliding-window.md#p4-longest-substring-without-repeating-characters-medium)
- [P5. Longest repeating character replacement (Medium)](03-sliding-window.md#p5-longest-repeating-character-replacement-medium)
- [P6. Permutation in string (Medium)](03-sliding-window.md#p6-permutation-in-string-medium)
- [P7. Minimum size subarray sum (Medium)](03-sliding-window.md#p7-minimum-size-subarray-sum-medium)
- [P8. Max consecutive ones III (Medium)](03-sliding-window.md#p8-max-consecutive-ones-iii-medium)
- [P9. Fruit into baskets (Medium)](03-sliding-window.md#p9-fruit-into-baskets-medium)
- [P10. Minimum window substring (Hard)](03-sliding-window.md#p10-minimum-window-substring-hard)
- [P11. Sliding window maximum (Hard)](03-sliding-window.md#p11-sliding-window-maximum-hard)
- [P12. Subarrays with exactly k distinct values (Hard)](03-sliding-window.md#p12-subarrays-with-exactly-k-distinct-values-hard)

### [04. Prefix Sums and Intervals](04-prefix-sums-and-intervals.md)

- [P1. Range sum query (Easy)](04-prefix-sums-and-intervals.md#p1-range-sum-query-easy)
- [P2. Find pivot index (Easy)](04-prefix-sums-and-intervals.md#p2-find-pivot-index-easy)
- [P3. Meeting rooms (Easy)](04-prefix-sums-and-intervals.md#p3-meeting-rooms-easy)
- [P4. Range sum query 2D (Medium)](04-prefix-sums-and-intervals.md#p4-range-sum-query-2d-medium)
- [P5. Subarray sum equals k (Medium)](04-prefix-sums-and-intervals.md#p5-subarray-sum-equals-k-medium)
- [P6. Contiguous array (Medium)](04-prefix-sums-and-intervals.md#p6-contiguous-array-medium)
- [P7. Range addition and car pooling (Medium)](04-prefix-sums-and-intervals.md#p7-range-addition-and-car-pooling-medium)
- [P8. Merge intervals (Medium)](04-prefix-sums-and-intervals.md#p8-merge-intervals-medium)
- [P9. Insert interval (Medium)](04-prefix-sums-and-intervals.md#p9-insert-interval-medium)
- [P10. Non-overlapping intervals (Medium)](04-prefix-sums-and-intervals.md#p10-non-overlapping-intervals-medium)
- [P11. Meeting rooms II (Medium)](04-prefix-sums-and-intervals.md#p11-meeting-rooms-ii-medium)
- [P12. Interval list intersections (Medium)](04-prefix-sums-and-intervals.md#p12-interval-list-intersections-medium)
- [P13. Number of submatrices that sum to target (Hard)](04-prefix-sums-and-intervals.md#p13-number-of-submatrices-that-sum-to-target-hard)

### [05. Stacks and Monotonic Stack](05-stacks-and-monotonic-stack.md)

- [P1. Valid Parentheses (Easy)](05-stacks-and-monotonic-stack.md#p1-valid-parentheses-easy)
- [P2. Implement Queue Using Stacks (Easy)](05-stacks-and-monotonic-stack.md#p2-implement-queue-using-stacks-easy)
- [P3. Next Greater Element (Easy)](05-stacks-and-monotonic-stack.md#p3-next-greater-element-easy)
- [P4. Min Stack (Medium)](05-stacks-and-monotonic-stack.md#p4-min-stack-medium)
- [P5. Evaluate Reverse Polish Notation (Medium)](05-stacks-and-monotonic-stack.md#p5-evaluate-reverse-polish-notation-medium)
- [P6. Daily Temperatures (Medium)](05-stacks-and-monotonic-stack.md#p6-daily-temperatures-medium)
- [P7. Simplify Path (Medium)](05-stacks-and-monotonic-stack.md#p7-simplify-path-medium)
- [P8. Decode String (Medium)](05-stacks-and-monotonic-stack.md#p8-decode-string-medium)
- [P9. Asteroid Collision (Medium)](05-stacks-and-monotonic-stack.md#p9-asteroid-collision-medium)
- [P10. Car Fleet (Medium)](05-stacks-and-monotonic-stack.md#p10-car-fleet-medium)
- [P11. Largest Rectangle in Histogram (Hard)](05-stacks-and-monotonic-stack.md#p11-largest-rectangle-in-histogram-hard)
- [P12. Basic Calculator (Hard)](05-stacks-and-monotonic-stack.md#p12-basic-calculator-hard)

### [06. Binary Search](06-binary-search.md)

- [P1. Binary Search (Easy)](06-binary-search.md#p1-binary-search-easy)
- [P2. First Bad Version (Easy)](06-binary-search.md#p2-first-bad-version-easy)
- [P3. Search Insert Position (Easy)](06-binary-search.md#p3-search-insert-position-easy)
- [P4. Square Root (Easy)](06-binary-search.md#p4-square-root-easy)
- [P5. Find First and Last Position of an Element (Medium)](06-binary-search.md#p5-find-first-and-last-position-of-an-element-medium)
- [P6. Search a 2D Matrix (Medium)](06-binary-search.md#p6-search-a-2d-matrix-medium)
- [P7. Find Minimum in Rotated Sorted Array (Medium)](06-binary-search.md#p7-find-minimum-in-rotated-sorted-array-medium)
- [P8. Search in Rotated Sorted Array (Medium)](06-binary-search.md#p8-search-in-rotated-sorted-array-medium)
- [P9. Find Peak Element (Medium)](06-binary-search.md#p9-find-peak-element-medium)
- [P10. Koko Eating Bananas (Medium)](06-binary-search.md#p10-koko-eating-bananas-medium)
- [P11. Capacity to Ship Packages Within D Days (Medium)](06-binary-search.md#p11-capacity-to-ship-packages-within-d-days-medium)
- [P12. Time Based Key-Value Store (Medium)](06-binary-search.md#p12-time-based-key-value-store-medium)
- [P13. Median of Two Sorted Arrays (Hard)](06-binary-search.md#p13-median-of-two-sorted-arrays-hard)

### [07. Linked Lists](07-linked-lists.md)

- [P1. Reverse Linked List (Easy)](07-linked-lists.md#p1-reverse-linked-list-easy)
- [P2. Merge Two Sorted Lists (Easy)](07-linked-lists.md#p2-merge-two-sorted-lists-easy)
- [P3. Linked List Cycle (Easy)](07-linked-lists.md#p3-linked-list-cycle-easy)
- [P4. Middle of the Linked List (Easy)](07-linked-lists.md#p4-middle-of-the-linked-list-easy)
- [P5. Palindrome Linked List (Easy)](07-linked-lists.md#p5-palindrome-linked-list-easy)
- [P6. Linked List Cycle II: Find Where the Cycle Starts (Medium)](07-linked-lists.md#p6-linked-list-cycle-ii-find-where-the-cycle-starts-medium)
- [P7. Remove Nth Node From End of List (Medium)](07-linked-lists.md#p7-remove-nth-node-from-end-of-list-medium)
- [P8. Reorder List (Medium)](07-linked-lists.md#p8-reorder-list-medium)
- [P9. Add Two Numbers (Medium)](07-linked-lists.md#p9-add-two-numbers-medium)
- [P10. Copy List with Random Pointer (Medium)](07-linked-lists.md#p10-copy-list-with-random-pointer-medium)
- [P11. LRU Cache (Medium)](07-linked-lists.md#p11-lru-cache-medium)
- [P12. Merge k Sorted Lists (Hard)](07-linked-lists.md#p12-merge-k-sorted-lists-hard)
- [P13. Reverse Nodes in k-Group (Hard)](07-linked-lists.md#p13-reverse-nodes-in-k-group-hard)

### [08. Trees and Binary Search Trees](08-trees-and-binary-search-trees.md)

- [P1. Maximum Depth of Binary Tree (Easy)](08-trees-and-binary-search-trees.md#p1-maximum-depth-of-binary-tree-easy)
- [P2. Invert Binary Tree (Easy)](08-trees-and-binary-search-trees.md#p2-invert-binary-tree-easy)
- [P3. Same Tree (Easy)](08-trees-and-binary-search-trees.md#p3-same-tree-easy)
- [P4. Subtree of Another Tree (Easy)](08-trees-and-binary-search-trees.md#p4-subtree-of-another-tree-easy)
- [P5. Diameter of Binary Tree (Easy)](08-trees-and-binary-search-trees.md#p5-diameter-of-binary-tree-easy)
- [P6. Balanced Binary Tree (Easy)](08-trees-and-binary-search-trees.md#p6-balanced-binary-tree-easy)
- [P7. Lowest Common Ancestor of a Binary Search Tree (Medium)](08-trees-and-binary-search-trees.md#p7-lowest-common-ancestor-of-a-binary-search-tree-medium)
- [P8. Binary Tree Level Order Traversal (Medium)](08-trees-and-binary-search-trees.md#p8-binary-tree-level-order-traversal-medium)
- [P9. Binary Tree Right Side View (Medium)](08-trees-and-binary-search-trees.md#p9-binary-tree-right-side-view-medium)
- [P10. Validate Binary Search Tree (Medium)](08-trees-and-binary-search-trees.md#p10-validate-binary-search-tree-medium)
- [P11. Kth Smallest Element in a BST (Medium)](08-trees-and-binary-search-trees.md#p11-kth-smallest-element-in-a-bst-medium)
- [P12. Lowest Common Ancestor of a Binary Tree (Medium)](08-trees-and-binary-search-trees.md#p12-lowest-common-ancestor-of-a-binary-tree-medium)
- [P13. Construct Binary Tree from Preorder and Inorder Traversal (Medium)](08-trees-and-binary-search-trees.md#p13-construct-binary-tree-from-preorder-and-inorder-traversal-medium)
- [P14. Path Sum II (Medium)](08-trees-and-binary-search-trees.md#p14-path-sum-ii-medium)
- [P15. Binary Tree Maximum Path Sum (Hard)](08-trees-and-binary-search-trees.md#p15-binary-tree-maximum-path-sum-hard)
- [P16. Serialize and Deserialize Binary Tree (Hard)](08-trees-and-binary-search-trees.md#p16-serialize-and-deserialize-binary-tree-hard)

### [09. Heaps and Top-K](09-heaps-and-top-k.md)

- [P1. Last Stone Weight (Easy)](09-heaps-and-top-k.md#p1-last-stone-weight-easy)
- [P2. Kth Largest Element in a Stream (Easy)](09-heaps-and-top-k.md#p2-kth-largest-element-in-a-stream-easy)
- [P3. Kth Largest Element in an Array (Medium)](09-heaps-and-top-k.md#p3-kth-largest-element-in-an-array-medium)
- [P4. K Closest Points to Origin (Medium)](09-heaps-and-top-k.md#p4-k-closest-points-to-origin-medium)
- [P5. Top K Frequent Elements and Top K Frequent Words (Medium)](09-heaps-and-top-k.md#p5-top-k-frequent-elements-and-top-k-frequent-words-medium)
- [P6. Minimum Cost to Connect Sticks (Medium)](09-heaps-and-top-k.md#p6-minimum-cost-to-connect-sticks-medium)
- [P7. Task Scheduler (Medium)](09-heaps-and-top-k.md#p7-task-scheduler-medium)
- [P8. Reorganize String (Medium)](09-heaps-and-top-k.md#p8-reorganize-string-medium)
- [P9. Meeting Rooms II (Medium)](09-heaps-and-top-k.md#p9-meeting-rooms-ii-medium)
- [P10. Merge K Sorted Lists (Hard)](09-heaps-and-top-k.md#p10-merge-k-sorted-lists-hard)
- [P11. Find Median from Data Stream (Hard)](09-heaps-and-top-k.md#p11-find-median-from-data-stream-hard)
- [P12. IPO (Hard)](09-heaps-and-top-k.md#p12-ipo-hard)

### [10. Graphs: BFS, DFS and Topological Sort](10-graphs-bfs-dfs-and-topological-sort.md)

- [P1. Flood Fill (Easy)](10-graphs-bfs-dfs-and-topological-sort.md#p1-flood-fill-easy)
- [P2. Number of Islands (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p2-number-of-islands-medium)
- [P3. Clone Graph (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p3-clone-graph-medium)
- [P4. Rotting Oranges (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p4-rotting-oranges-medium)
- [P5. Pacific Atlantic Water Flow (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p5-pacific-atlantic-water-flow-medium)
- [P6. Course Schedule (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p6-course-schedule-medium)
- [P7. Course Schedule II (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p7-course-schedule-ii-medium)
- [P8. Number of Connected Components in an Undirected Graph (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p8-number-of-connected-components-in-an-undirected-graph-medium)
- [P9. Redundant Connection (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p9-redundant-connection-medium)
- [P10. Network Delay Time (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p10-network-delay-time-medium)
- [P11. Cheapest Flights Within K Stops (Medium)](10-graphs-bfs-dfs-and-topological-sort.md#p11-cheapest-flights-within-k-stops-medium)
- [P12. Word Ladder (Hard)](10-graphs-bfs-dfs-and-topological-sort.md#p12-word-ladder-hard)
- [P13. Alien Dictionary (Hard)](10-graphs-bfs-dfs-and-topological-sort.md#p13-alien-dictionary-hard)

### [11. Backtracking](11-backtracking.md)

- [P1. Subsets (Medium)](11-backtracking.md#p1-subsets-medium)
- [P2. Combinations (Medium)](11-backtracking.md#p2-combinations-medium)
- [P3. Permutations (Medium)](11-backtracking.md#p3-permutations-medium)
- [P4. Letter Combinations of a Phone Number (Medium)](11-backtracking.md#p4-letter-combinations-of-a-phone-number-medium)
- [P5. Generate Parentheses (Medium)](11-backtracking.md#p5-generate-parentheses-medium)
- [P6. Combination Sum (Medium)](11-backtracking.md#p6-combination-sum-medium)
- [P7. Word Search (Medium)](11-backtracking.md#p7-word-search-medium)
- [P8. Subsets II (Medium)](11-backtracking.md#p8-subsets-ii-medium)
- [P9. Permutations II (Medium)](11-backtracking.md#p9-permutations-ii-medium)
- [P10. Combination Sum II (Medium)](11-backtracking.md#p10-combination-sum-ii-medium)
- [P11. Palindrome Partitioning (Medium)](11-backtracking.md#p11-palindrome-partitioning-medium)
- [P12. N-Queens (Hard)](11-backtracking.md#p12-n-queens-hard)
- [P13. Sudoku Solver (Hard)](11-backtracking.md#p13-sudoku-solver-hard)

### [12. Dynamic Programming](12-dynamic-programming.md)

- [P1. Climbing Stairs (Easy)](12-dynamic-programming.md#p1-climbing-stairs-easy)
- [P2. House Robber (Medium)](12-dynamic-programming.md#p2-house-robber-medium)
- [P3. House Robber II (Medium)](12-dynamic-programming.md#p3-house-robber-ii-medium)
- [P4. Coin Change (Medium)](12-dynamic-programming.md#p4-coin-change-medium)
- [P5. Longest Increasing Subsequence (Medium)](12-dynamic-programming.md#p5-longest-increasing-subsequence-medium)
- [P6. Word Break (Medium)](12-dynamic-programming.md#p6-word-break-medium)
- [P7. Decode Ways (Medium)](12-dynamic-programming.md#p7-decode-ways-medium)
- [P8. Maximum Product Subarray (Medium)](12-dynamic-programming.md#p8-maximum-product-subarray-medium)
- [P9. Unique Paths (Medium)](12-dynamic-programming.md#p9-unique-paths-medium)
- [P10. Longest Common Subsequence (Medium)](12-dynamic-programming.md#p10-longest-common-subsequence-medium)
- [P11. Edit Distance (Medium)](12-dynamic-programming.md#p11-edit-distance-medium)
- [P12. 0/1 Knapsack and Partition Equal Subset Sum (Medium)](12-dynamic-programming.md#p12-01-knapsack-and-partition-equal-subset-sum-medium)
- [P13. Longest Palindromic Substring (Medium)](12-dynamic-programming.md#p13-longest-palindromic-substring-medium)
- [P14. Best Time to Buy and Sell Stock with Cooldown (Medium)](12-dynamic-programming.md#p14-best-time-to-buy-and-sell-stock-with-cooldown-medium)
- [P15. Burst Balloons (Hard)](12-dynamic-programming.md#p15-burst-balloons-hard)

### [13. Greedy Algorithms](13-greedy-algorithms.md)

- [P1. Assign Cookies (Easy)](13-greedy-algorithms.md#p1-assign-cookies-easy)
- [P2. Lemonade Change (Easy)](13-greedy-algorithms.md#p2-lemonade-change-easy)
- [P3. Best Time to Buy and Sell Stock II (Medium)](13-greedy-algorithms.md#p3-best-time-to-buy-and-sell-stock-ii-medium)
- [P4. Maximum Subarray (Medium)](13-greedy-algorithms.md#p4-maximum-subarray-medium)
- [P5. Jump Game (Medium)](13-greedy-algorithms.md#p5-jump-game-medium)
- [P6. Jump Game II (Medium)](13-greedy-algorithms.md#p6-jump-game-ii-medium)
- [P7. Gas Station (Medium)](13-greedy-algorithms.md#p7-gas-station-medium)
- [P8. Hand of Straights (Medium)](13-greedy-algorithms.md#p8-hand-of-straights-medium)
- [P9. Merge Triplets to Form Target Triplet (Medium)](13-greedy-algorithms.md#p9-merge-triplets-to-form-target-triplet-medium)
- [P10. Partition Labels (Medium)](13-greedy-algorithms.md#p10-partition-labels-medium)
- [P11. Valid Parenthesis String (Medium)](13-greedy-algorithms.md#p11-valid-parenthesis-string-medium)
- [P12. Minimum Number of Arrows to Burst Balloons (Medium)](13-greedy-algorithms.md#p12-minimum-number-of-arrows-to-burst-balloons-medium)
- [P13. Boats to Save People (Medium)](13-greedy-algorithms.md#p13-boats-to-save-people-medium)
- [P14. Candy (Hard)](13-greedy-algorithms.md#p14-candy-hard)

### [14. Tries, Bit Manipulation and Math](14-tries-bit-manipulation-and-math.md)

- [P1. Single Number (Easy)](14-tries-bit-manipulation-and-math.md#p1-single-number-easy)
- [P2. Number of 1 Bits (Easy)](14-tries-bit-manipulation-and-math.md#p2-number-of-1-bits-easy)
- [P3. Counting Bits (Easy)](14-tries-bit-manipulation-and-math.md#p3-counting-bits-easy)
- [P4. Reverse Bits (Easy)](14-tries-bit-manipulation-and-math.md#p4-reverse-bits-easy)
- [P5. Missing Number (Easy)](14-tries-bit-manipulation-and-math.md#p5-missing-number-easy)
- [P6. Power of Two (Easy)](14-tries-bit-manipulation-and-math.md#p6-power-of-two-easy)
- [P7. GCD and LCM (Easy)](14-tries-bit-manipulation-and-math.md#p7-gcd-and-lcm-easy)
- [P8. Happy Number (Easy)](14-tries-bit-manipulation-and-math.md#p8-happy-number-easy)
- [P9. Sum of Two Integers (Medium)](14-tries-bit-manipulation-and-math.md#p9-sum-of-two-integers-medium)
- [P10. Count Primes with the Sieve of Eratosthenes (Medium)](14-tries-bit-manipulation-and-math.md#p10-count-primes-with-the-sieve-of-eratosthenes-medium)
- [P11. Pow(x, n) with Fast Power (Medium)](14-tries-bit-manipulation-and-math.md#p11-powx-n-with-fast-power-medium)
- [P12. Reverse Integer with 32-bit Bounds (Medium)](14-tries-bit-manipulation-and-math.md#p12-reverse-integer-with-32-bit-bounds-medium)
- [P13. Rotate Image (Medium)](14-tries-bit-manipulation-and-math.md#p13-rotate-image-medium)
- [P14. Spiral Matrix (Medium)](14-tries-bit-manipulation-and-math.md#p14-spiral-matrix-medium)
- [P15. Set Matrix Zeroes (Medium)](14-tries-bit-manipulation-and-math.md#p15-set-matrix-zeroes-medium)
- [P16. Implement a Trie (Medium)](14-tries-bit-manipulation-and-math.md#p16-implement-a-trie-medium)
- [P17. Design Add and Search Words with Wildcards (Medium)](14-tries-bit-manipulation-and-math.md#p17-design-add-and-search-words-with-wildcards-medium)
- [P18. Autocomplete: Top-k Suggestions for a Prefix (Medium)](14-tries-bit-manipulation-and-math.md#p18-autocomplete-top-k-suggestions-for-a-prefix-medium)
- [P19. Word Search II (Hard)](14-tries-bit-manipulation-and-math.md#p19-word-search-ii-hard)


---

## Pattern cheat sheet

Read the problem and look for these signals. One problem can show two signals; then you usually combine two patterns.

| Signal in the problem | Pattern | Template |
| --- | --- | --- |
| "Have I seen this before?", duplicates, count things, group by a key | Hash map or set | [Arrays and hashing](01-arrays-and-hashing.md#the-pattern) |
| Sorted array, find a pair or triple with a target sum | Two pointers from both ends | [Two pointers](02-two-pointers.md#the-pattern) |
| Change the array in place, remove or move items | Two pointers, same direction (read and write) | [Two pointers](02-two-pointers.md#the-pattern) |
| "Longest / shortest **contiguous** subarray or substring" with a rule that stays true when you shrink | Sliding window | [Sliding window](03-sliding-window.md#the-pattern) |
| Subarray sums with **negative numbers**, "count subarrays with sum k" | Prefix sums + hash map | [Prefix sums and intervals](04-prefix-sums-and-intervals.md#part-1-prefix-sums) |
| Many range-sum queries, or many range updates | Prefix sum array or difference array | [Prefix sums and intervals](04-prefix-sums-and-intervals.md#part-1-prefix-sums) |
| Intervals, meetings, overlaps, "minimum rooms" | Sort by start (or by end), then sweep | [Prefix sums and intervals](04-prefix-sums-and-intervals.md#part-2-intervals) |
| Matching brackets, undo, nested structure, evaluate an expression | Stack | [Stacks](05-stacks-and-monotonic-stack.md#the-pattern) |
| "Next greater / smaller element", "how far until", histogram areas | Monotonic stack | [Stacks](05-stacks-and-monotonic-stack.md#the-pattern) |
| Max or min of every window of size k | Monotonic deque | [Sliding window P11](03-sliding-window.md#p11-sliding-window-maximum-hard) |
| Sorted input, O(log n) required, or "minimum value that still works" | Binary search (on the index or on the answer) | [Binary search](06-binary-search.md#the-pattern) |
| Linked list: cycle, middle, k-th from end, reverse a part | Fast and slow pointers, dummy head | [Linked lists](07-linked-lists.md#the-pattern) |
| Tree: depth, path, "for every node", compare subtrees | DFS that returns a value from each child | [Trees](08-trees-and-binary-search-trees.md#the-pattern) |
| Tree: "level by level", "closest to the root" | BFS with a queue | [Trees](08-trees-and-binary-search-trees.md#the-pattern) |
| "k largest / smallest / most frequent", merge k sorted things, running median | Heap | [Heaps and top-k](09-heaps-and-top-k.md#the-pattern) |
| Grid or graph, "fewest steps", unweighted edges | BFS | [Graphs](10-graphs-bfs-dfs-and-topological-sort.md#the-pattern) |
| Dependencies, prerequisites, build order | Topological sort | [Graphs](10-graphs-bfs-dfs-and-topological-sort.md#the-pattern) |
| "Are these connected?", groups that merge over time | Union-find | [Graphs](10-graphs-bfs-dfs-and-topological-sort.md#the-pattern) |
| Weighted edges, cheapest path, non-negative weights | Dijkstra (BFS with a heap) | [Graphs P10](10-graphs-bfs-dfs-and-topological-sort.md#p10-network-delay-time-medium) |
| "Return **all** combinations / subsets / arrangements", n ≤ about 20 | Backtracking | [Backtracking](11-backtracking.md#the-pattern) |
| "Number of ways", "minimum cost", "is it possible", choices that overlap | Dynamic programming | [Dynamic programming](12-dynamic-programming.md#the-pattern) |
| A local best choice that you can prove never hurts | Greedy (often after sorting) | [Greedy](13-greedy-algorithms.md#the-pattern) |
| Prefixes of many words, autocomplete, word lists on a grid | Trie | [Tries](14-tries-bit-manipulation-and-math.md#part-a-tries) |
| "Appears once", XOR, powers of two, O(1) space on integers | Bit manipulation | [Bits](14-tries-bit-manipulation-and-math.md#part-b-bit-manipulation-in-javascript) |

**Use the input size as a hint** (see [Using input size to guess the target complexity](../11-coding-interviews/02-problem-solving-and-complexity.md#using-input-size-to-guess-the-target-complexity)):

| n is about | You can afford | Likely patterns |
| --- | --- | --- |
| ≤ 20 | O(2ⁿ) or O(n!) | Backtracking, bitmask DP |
| ≤ 500 | O(n³) | Interval DP, triple loops |
| ≤ 5,000 | O(n²) | 2D DP, all pairs |
| ≤ 10⁶ | O(n log n) or O(n) | Sorting, heap, binary search, one pass with a map |
| ≥ 10⁹ (a value, not a length) | O(log n) | Binary search on the answer, math |

---

## Which pattern?

For each problem: read it, decide the pattern, the key idea and the target complexity, **then** open the answer. The titles do not name the pattern on purpose. Some problems combine two patterns, and some are **traps** that look like one pattern but need another.

### Q1. First word that appears once (Easy)

You get an array of words. Return the first word (from the left) that appears exactly once, or `""` if there is none. Example: `["go", "js", "go", "ts", "js"]` → `"ts"`.

<details>
<summary>Answer</summary>

**Pattern:** hash map counting, two passes.

**Key insight:** the first pass counts every word in a `Map`. The second pass walks the array in its original order and returns the first word with count 1. A Map is safer than a plain object, because a word like `"constructor"` would clash with object properties.

**Target:** O(n) time, O(n) space.

**Closest solved problem:** [Arrays and hashing, P2 Valid anagram](01-arrays-and-hashing.md#p2-valid-anagram-easy)

</details>

### Q2. Pairs below a budget (Easy)

You get a **sorted** array of prices and a budget. Count the pairs `i < j` with `prices[i] + prices[j] < budget`. Example: `[1, 2, 3, 4, 5]`, budget 6 → 4 (`1+2, 1+3, 1+4, 2+3`).

<details>
<summary>Answer</summary>

**Pattern:** two pointers from both ends.

**Key insight:** put `left` at the start and `right` at the end. If `prices[left] + prices[right] < budget`, then `left` pairs with **every** index from `left + 1` to `right`, so add `right - left` and move `left` up. Otherwise the sum is too big, so move `right` down.

**Target:** O(n) time, O(1) space (O(n log n) if you must sort first).

**Closest solved problem:** [Two pointers, P7 Two sum II](02-two-pointers.md#p7-two-sum-ii-on-a-sorted-array-medium)

</details>

### Q3. More wins than losses (Medium, trap)

You get an array of 0s and 1s (1 = a day you met your goal). Return the length of the longest contiguous stretch where there are **strictly more** 1s than 0s. Example: `[0, 1, 1, 0, 0, 1, 1]` → 7 (four 1s, three 0s).

<details>
<summary>Answer</summary>

**Pattern:** prefix sums + map of first positions. **Trap:** it looks like a sliding window, but it is not one.

**Key insight:** turn each 0 into −1. Now you want the longest subarray with a sum greater than 0. A window is not monotonic here: a bad window can become good when it grows. With prefix sums, if the current prefix is positive, the whole prefix works. Otherwise look up the first index where the prefix was `current − 1`; because the prefix moves by ±1, that is the earliest smaller prefix.

**Target:** O(n) time, O(n) space.

**Closest solved problem:** [Prefix sums and intervals, P6 Contiguous array](04-prefix-sums-and-intervals.md#p6-contiguous-array-medium)

</details>

### Q4. Smallest batch divisor (Medium)

You get an array of positive job sizes and a limit `t`. You choose a positive integer `d`. Each job costs `Math.ceil(size / d)`. Find the smallest `d` such that the total cost is at most `t`. Example: sizes `[1, 2, 5, 9]`, t = 6 → 5.

<details>
<summary>Answer</summary>

**Pattern:** binary search on the answer.

**Key insight:** a bigger `d` never makes the total bigger, so "does `d` work?" is false, false, ..., true, true. Binary search `d` between 1 and the largest size, and check each guess with one O(n) pass.

**Target:** O(n log(max size)) time, O(1) space.

**Closest solved problem:** [Binary search, P10 Koko eating bananas](06-binary-search.md#p10-koko-eating-bananas-medium)

</details>

### Q5. Shallowest leaf (Easy, trap)

Return the number of nodes on the shortest path from the root of a binary tree down to any **leaf** (a node with no children). Example: root 1 with only a right child 2, which has a right child 3 → 3.

<details>
<summary>Answer</summary>

**Pattern:** BFS level by level (DFS also works, with care). **Trap:** copying "max depth" and changing `max` to `min`.

**Key insight:** with `1 + Math.min(left, right)`, a node with one missing child returns 1, but that node is not a leaf. In the example this gives 1 instead of 3. BFS avoids the problem: go level by level and return at the first leaf you meet, often long before you visit the whole tree.

**Target:** O(n) time worst case, O(width) space.

**Closest solved problem:** [Trees, P8 Level order traversal](08-trees-and-binary-search-trees.md#p8-binary-tree-level-order-traversal-medium)

</details>

### Q6. Fewest stamps (Medium, trap)

Stamps come in values `[1, 3, 4]`. What is the fewest number of stamps whose values add up to exactly 6? Write the general solution for any stamp values and any amount.

<details>
<summary>Answer</summary>

**Pattern:** dynamic programming (unbounded coin change). **Trap:** greedy.

**Key insight:** greedy takes the biggest stamp first: 4 + 1 + 1 = 3 stamps. The best answer is 3 + 3 = 2 stamps. Greedy only works for special value sets (like real coins). Use `best[x] = 1 + min(best[x − stamp])` for every stamp.

**Target:** O(amount × stamp types) time, O(amount) space.

**Closest solved problem:** [Dynamic programming, P4 Coin change](12-dynamic-programming.md#p4-coin-change-medium)

</details>

### Q7. The two loners (Medium)

In an array, every number appears exactly twice, except **two** numbers that appear once. Find those two in O(n) time and O(1) extra space. Example: `[1, 2, 1, 3, 2, 5]` → `[3, 5]`.

<details>
<summary>Answer</summary>

**Pattern:** bit manipulation (XOR).

**Key insight:** XOR of everything gives `a ^ b`, because pairs cancel out. That value is not 0, so `a` and `b` differ in at least one bit. Take the lowest set bit with `x & -x`, split all numbers into two groups by that bit, and XOR each group: each group holds exactly one loner.

**Target:** O(n) time, O(1) space.

**Closest solved problem:** [Tries, bits and math, P1 Single number](14-tries-bit-manipulation-and-math.md#p1-single-number-easy)

</details>

### Q8. Cheap baskets (Medium)

You get an array of **positive** prices and a number `k`. Count the contiguous subarrays whose product is **less than** `k`. Example: `[10, 5, 2, 6]`, k = 100 → 8.

<details>
<summary>Answer</summary>

**Pattern:** variable sliding window, counting version.

**Key insight:** all values are positive, so a bigger window has a bigger product: the rule is monotonic. Grow `right`, and while the product is `>= k`, divide by `nums[left]` and move `left`. Every window ending at `right` and starting between `left` and `right` is valid, so add `right − left + 1`. If `k <= 1`, the answer is 0.

**Target:** O(n) time, O(1) space.

**Closest solved problem:** [Sliding window, P7 Minimum size subarray sum](03-sliding-window.md#p7-minimum-size-subarray-sum-medium)

</details>

### Q9. Smallest number after deleting digits (Medium)

You get a string of digits and a number `k`. Remove exactly `k` digits so the remaining number is as small as possible. Return it without leading zeros (`"0"` if empty). Example: `"1432219"`, k = 3 → `"1219"`.

<details>
<summary>Answer</summary>

**Pattern:** monotonic stack + greedy (two patterns).

**Key insight:** a digit that is bigger than the digit after it should go, because the left digits matter most. Push digits onto a stack; while `k > 0` and the top is bigger than the new digit, pop it and decrease `k`. If `k` is still positive at the end, remove digits from the end. Then strip leading zeros.

**Target:** O(n) time, O(n) space.

**Closest solved problem:** [Stacks, P3 Next greater element](05-stacks-and-monotonic-stack.md#p3-next-greater-element-easy)

</details>

### Q10. Where two lists join (Easy)

Two singly linked lists may merge into one shared tail (Y shape). Return the first shared node, or `null`. Use O(1) extra memory. The lists can have different lengths.

<details>
<summary>Answer</summary>

**Pattern:** two pointers on linked lists.

**Key insight:** walk pointer `a` through list A and then list B, and pointer `b` through list B and then list A. Both walk the same total distance (`lenA + lenB`), so they arrive at the shared node at the same time, or both reach `null` together. Compare nodes by reference, not by value.

**Target:** O(m + n) time, O(1) space.

**Closest solved problem:** [Linked lists, P6 Cycle start](07-linked-lists.md#p6-linked-list-cycle-ii-find-where-the-cycle-starts-medium)

</details>

### Q11. Fewest semesters (Medium)

There are `n` courses and a list of `[before, after]` prerequisite pairs. You can take any number of courses in one semester if their prerequisites are done. Return the minimum number of semesters, or −1 if it is impossible.

<details>
<summary>Answer</summary>

**Pattern:** topological sort (Kahn's algorithm) processed **level by level**.

**Key insight:** all courses with in-degree 0 form semester 1. Removing them lowers the in-degree of the next courses; the new zeros form semester 2, and so on. The answer is the number of levels. If fewer than `n` courses were taken, there is a cycle, so return −1.

**Target:** O(V + E) time and space.

**Closest solved problem:** [Graphs, P7 Course schedule II](10-graphs-bfs-dfs-and-topological-sort.md#p7-course-schedule-ii-medium)

</details>

### Q12. Distance to the nearest exit (Medium)

A grid has walls `#`, exits `E` and open cells `.`. For every open cell, write the number of steps (up, down, left, right) to the **nearest** exit, or −1 if no exit can be reached.

<details>
<summary>Answer</summary>

**Pattern:** multi-source BFS.

**Key insight:** do not run one BFS per cell (that is O((R·C)²)). Put **all exits** in the queue at distance 0 and run one BFS. The first time BFS reaches a cell, it came from the nearest exit. Use an index into the queue array instead of `shift()`.

**Target:** O(R × C) time and space.

**Closest solved problem:** [Graphs, P4 Rotting oranges](10-graphs-bfs-dfs-and-topological-sort.md#p4-rotting-oranges-medium)

</details>

### Q13. Median of every window (Hard)

You get an array and a window size `k`. Return the median of each window of size `k` as it slides from left to right. Example: `[1, 3, -1, -3, 5, 3, 6, 7]`, k = 3 → `[1, -1, -1, 3, 5, 6]`.

<details>
<summary>Answer</summary>

**Pattern:** two heaps + fixed sliding window (two patterns).

**Key insight:** a max-heap holds the smaller half and a min-heap holds the larger half, as in the running median. When a value leaves the window, you cannot remove it from the middle of a heap, so use **lazy deletion**: record it in a "to delete" map, and drop it when it reaches a heap top. Keep the two heaps balanced by counting only valid items.

**Target:** O(n log k) time, O(k) space. (A sorted array with binary-search insertion is O(n·k) and is a fine first answer.)

**Closest solved problem:** [Heaps, P11 Find median from data stream](09-heaps-and-top-k.md#p11-find-median-from-data-stream-hard)

</details>

### Q14. Distinct digits that add up (Medium)

Return all sets of exactly `k` **different** digits from 1 to 9 that add up to `n`. Example: k = 3, n = 9 → `[1,2,6], [1,3,5], [2,3,4]`.

<details>
<summary>Answer</summary>

**Pattern:** backtracking with a start index and pruning.

**Key insight:** choose digits in increasing order (start index), so each set appears once. Stop a branch when the sum is already bigger than `n` or the set already has `k` digits. Record when the set has `k` digits and the sum is exactly `n`.

**Target:** at most C(9, k) sets, so tiny and bounded. O(k) recursion depth.

**Closest solved problem:** [Backtracking, P2 Combinations](11-backtracking.md#p2-combinations-medium)

</details>

### Q15. Can it become a palindrome? (Easy)

Can the letters of a string be rearranged to form a palindrome? Example: `"carrace"` → true (`"racecar"`), `"code"` → false.

<details>
<summary>Answer</summary>

**Pattern:** frequency counting.

**Key insight:** in a palindrome, every letter appears an even number of times, except at most one (the middle). Count letters and check that at most one count is odd. A `Set` that adds a letter on odd counts and deletes it on even counts does the same in one pass.

**Target:** O(n) time, O(alphabet) space.

**Closest solved problem:** [Arrays and hashing, P2 Valid anagram](01-arrays-and-hashing.md#p2-valid-anagram-easy)

</details>

### Q16. Nodes that see the sky (Medium)

In a binary tree, a node is "visible" if no node on the path from the root to it has a **bigger** value. Count the visible nodes. The root is always visible.

<details>
<summary>Answer</summary>

**Pattern:** tree DFS that passes a value **down**.

**Key insight:** pass the largest value seen so far on the path into each recursive call. A node is visible when `node.val >= maxSoFar`. Then recurse into both children with `Math.max(maxSoFar, node.val)`. For very deep trees, use an explicit stack to avoid the recursion limit.

**Target:** O(n) time, O(h) space.

**Closest solved problem:** [Trees, P10 Validate BST](08-trees-and-binary-search-trees.md#p10-validate-binary-search-tree-medium)

</details>

### Q17. Fewest square tiles (Medium)

What is the fewest number of perfect squares (1, 4, 9, 16, ...) that add up to `n`? Example: 12 → 3 (4 + 4 + 4), 13 → 2 (4 + 9).

<details>
<summary>Answer</summary>

**Pattern:** dynamic programming (unbounded, like coin change). BFS over the remainders also works.

**Key insight:** `best[x] = 1 + min(best[x − s])` over every square `s <= x`, with `best[0] = 0`. Greedy fails here too: for 12 it takes 9 + 1 + 1 + 1 = 4 squares.

**Target:** O(n √n) time, O(n) space.

**Closest solved problem:** [Dynamic programming, P4 Coin change](12-dynamic-programming.md#p4-coin-change-medium)

</details>

### Q18. k-th smallest in a sorted grid (Medium)

Every row and every column of an `n × n` matrix is sorted in increasing order. Return the k-th smallest value. Example: `[[1,5,9],[10,11,13],[12,13,15]]`, k = 8 → 13.

<details>
<summary>Answer</summary>

**Pattern:** either a heap (k-way merge of the rows) or binary search on the value (two possible patterns).

**Key insight:** heap version: push the first item of each row, pop k times, and after each pop push the next item of the same row. Binary search version: guess a value `v` and count items `<= v` with a staircase walk from the bottom-left corner in O(n); find the smallest `v` with count `>= k`.

**Target:** heap O(k log n); binary search O(n log(max − min)), O(1) space.

**Closest solved problem:** [Heaps, P10 Merge k sorted lists](09-heaps-and-top-k.md#p10-merge-k-sorted-lists-hard) and [Binary search, P6 Search a 2D matrix](06-binary-search.md#p6-search-a-2d-matrix-medium)

</details>

### Q19. Easiest hiking route (Medium)

A grid holds heights. You walk from the top-left to the bottom-right (four directions). The **effort** of a route is the biggest height difference between two neighbouring cells on it. Return the smallest possible effort.

<details>
<summary>Answer</summary>

**Pattern:** Dijkstra with a changed cost rule (or binary search on the answer + BFS).

**Key insight:** a route's cost is the **maximum** step, not the sum. Dijkstra still works, because the cost never goes down along a path: the new cost is `Math.max(cost, |h1 − h2|)`. Pop the cheapest cell from a min-heap; the first time you pop the target, you have the answer.

**Target:** O(R·C · log(R·C)) time, O(R·C) space.

**Closest solved problem:** [Graphs, P10 Network delay time](10-graphs-bfs-dfs-and-topological-sort.md#p10-network-delay-time-medium)

</details>

### Q20. Swap the vowels (Easy)

Reverse only the vowels of a string and keep every other character in place. Example: `"hello"` → `"holle"`.

<details>
<summary>Answer</summary>

**Pattern:** two pointers from both ends.

**Key insight:** move `left` forward until it is on a vowel, and `right` backward until it is on a vowel, then swap and move both. Strings are immutable in JavaScript, so work on an array of characters and `join("")` at the end.

**Target:** O(n) time, O(n) space for the character array.

**Closest solved problem:** [Two pointers, P1 Valid palindrome](02-two-pointers.md#p1-valid-palindrome-easy)

</details>

### Q21. Sum of all subarray minimums (Medium)

Return the sum of `min(subarray)` over **every** contiguous subarray. Example: `[3, 1, 2, 4]` → 17.

<details>
<summary>Answer</summary>

**Pattern:** monotonic stack, "contribution" technique.

**Key insight:** do not list the subarrays (that is O(n²) of them). Ask instead: in how many subarrays is `arr[i]` the minimum? With a monotonic stack, find the distance to the previous smaller value (`left`) and to the next smaller-or-equal value (`right`). Then `arr[i]` adds `arr[i] × left × right`. Use strict on one side and non-strict on the other, so equal values are not counted twice.

**Target:** O(n) time, O(n) space.

**Closest solved problem:** [Stacks, P11 Largest rectangle in histogram](05-stacks-and-monotonic-stack.md#p11-largest-rectangle-in-histogram-hard)

</details>

### Q22. Turn the list (Medium)

Rotate a singly linked list to the right by `k` places. `k` can be bigger than the length. Example: `1→2→3→4→5`, k = 2 → `4→5→1→2→3`.

<details>
<summary>Answer</summary>

**Pattern:** linked list pointer work (length + cut).

**Key insight:** find the length `n` and the tail in one pass. Set `k = k % n`; if it is 0, return the head. Connect the tail to the head to make a ring, walk `n − k − 1` steps to the new tail, and cut after it.

**Target:** O(n) time, O(1) space.

**Closest solved problem:** [Linked lists, P7 Remove nth node from end](07-linked-lists.md#p7-remove-nth-node-from-end-of-list-medium)

</details>

### Q23. One from each list (Hard)

You get `k` sorted lists of numbers. Find the smallest range `[a, b]` that contains at least one number from **each** list. Example: `[[4,10,15,24],[0,9,12,20],[5,18,22,30]]` → `[20, 24]`.

<details>
<summary>Answer</summary>

**Pattern:** min-heap over k sorted lists + tracking the current maximum.

**Key insight:** keep one pointer per list. The heap gives the smallest current value; also track the largest current value. The range `[heap top, max]` covers every list. To try a smaller range, the only useful move is to advance the list that holds the minimum. Stop when that list runs out.

**Target:** O(N log k) time for N total numbers, O(k) space.

**Closest solved problem:** [Heaps, P10 Merge k sorted lists](09-heaps-and-top-k.md#p10-merge-k-sorted-lists-hard)

</details>

### Q24. Two teams (Medium)

You get `n` people and a list of "dislike" pairs. Can you split everyone into two teams so that no pair of people who dislike each other is on the same team?

<details>
<summary>Answer</summary>

**Pattern:** graph BFS or DFS with two colors (bipartite check).

**Key insight:** build an undirected adjacency list. Color an uncolored person 0, and give every neighbour the opposite color. If you ever find a neighbour with the **same** color, the answer is false. Start a new search from every uncolored person, because the graph can have several parts.

**Target:** O(V + E) time and space.

**Closest solved problem:** [Graphs, P8 Connected components](10-graphs-bfs-dfs-and-topological-sort.md#p8-number-of-connected-components-in-an-undirected-graph-medium)

</details>

### Q25. Rebuild the IP address (Medium)

You get a string of digits. Return every valid IPv4 address you can make by inserting three dots. Each part must be 0–255 and must not have a leading zero (except `"0"` itself). Example: `"25525511135"` → `["255.255.11.135", "255.255.111.35"]`.

<details>
<summary>Answer</summary>

**Pattern:** backtracking with pruning.

**Key insight:** at each step, take the next 1, 2 or 3 digits as a part, if it is valid. Prune when the remaining digits are too few or too many for the parts that are left (each part needs 1 to 3 digits). Record when you have 4 parts and no digits left.

**Target:** at most 3⁴ = 81 branches, so O(1) for a bounded input length.

**Closest solved problem:** [Backtracking, P11 Palindrome partitioning](11-backtracking.md#p11-palindrome-partitioning-medium)

</details>

### Q26. Paths around rocks (Medium)

A robot moves only right or down on a grid from the top-left to the bottom-right. Some cells have rocks (1) that it cannot enter. Count the different paths.

<details>
<summary>Answer</summary>

**Pattern:** 2D dynamic programming on a grid.

**Key insight:** `ways[r][c] = ways[r − 1][c] + ways[r][c − 1]`, and `ways = 0` on a rock. You only need the previous row, so one array of length C is enough: `row[c] += row[c − 1]`. If the start or the end is a rock, the answer is 0.

**Target:** O(R × C) time, O(C) space.

**Closest solved problem:** [Dynamic programming, P9 Unique paths](12-dynamic-programming.md#p9-unique-paths-medium)

</details>

### Q27. Biggest number from pieces (Medium)

Arrange a list of non-negative integers so that, written one after another, they form the largest possible number. Return it as a string. Example: `[3, 30, 34, 5, 9]` → `"9534330"`.

<details>
<summary>Answer</summary>

**Pattern:** greedy sort with a custom comparator.

**Key insight:** for two pieces `a` and `b`, put `a` first when the string `a + b` is bigger than `b + a`. This rule is consistent (it defines a valid order), so sorting with it gives the answer. Compare strings, not numbers, and handle the all-zeros case: return `"0"`, not `"000"`.

**Target:** O(n log n) comparisons, each O(length of the digits).

**Closest solved problem:** [Greedy, P10 Partition labels](13-greedy-algorithms.md#p10-partition-labels-medium) (greedy order), and see the [Greedy pattern](13-greedy-algorithms.md#the-pattern) for how to argue the choice is safe

</details>

### Q28. The most different pair (Medium)

You get an array of non-negative integers below 2³¹. Return the largest value of `a XOR b` for any two of them. Example: `[3, 10, 5, 25, 2, 8]` → 28 (5 XOR 25).

<details>
<summary>Answer</summary>

**Pattern:** trie over bits + greedy (two patterns).

**Key insight:** insert every number into a binary trie, from bit 30 down to bit 0. For each number, walk the trie and at each bit try to go to the **opposite** bit, because a 1 in a high bit is worth more than all lower bits together. Use `(x >>> bit) & 1`, since JavaScript bit operators work on 32-bit integers.

**Target:** O(31 · n) time and space.

**Closest solved problem:** [Tries, bits and math, P16 Implement a trie](14-tries-bit-manipulation-and-math.md#p16-implement-a-trie-medium)

</details>

### Q29. Robbing a tree of houses (Medium)

Houses form a binary tree. Each node holds money. You cannot rob two houses that are directly connected (parent and child). What is the most money you can rob?

<details>
<summary>Answer</summary>

**Pattern:** tree DFS + dynamic programming (two patterns).

**Key insight:** each node returns **two** numbers: the best total if you rob it, and the best total if you skip it. `rob = val + left.skip + right.skip`, `skip = max(left) + max(right)`. A plain recursion without this pair recomputes the grandchildren many times.

**Target:** O(n) time, O(h) space.

**Closest solved problem:** [Dynamic programming, P2 House robber](12-dynamic-programming.md#p2-house-robber-medium) and [Trees, P15 Maximum path sum](08-trees-and-binary-search-trees.md#p15-binary-tree-maximum-path-sum-hard)

</details>

### Q30. Same person, many accounts (Medium)

You get a list of accounts. Each account is a name and some email addresses. Two accounts belong to the same person if they share **any** email. Merge them and return each person's sorted email list.

<details>
<summary>Answer</summary>

**Pattern:** union-find (or DFS on a graph of emails).

**Key insight:** inside each account, union every email with the first email of that account. Then group all emails by their root and sort each group. Union-find is natural here because the groups only ever **merge**.

**Target:** about O(E log E) for E emails, because of the sorting; the unions are almost O(1) each.

**Closest solved problem:** [Graphs, P9 Redundant connection](10-graphs-bfs-dfs-and-topological-sort.md#p9-redundant-connection-medium)

</details>

### Q31. Most common letters first (Medium)

Sort the characters of a string so the most frequent characters come first. Example: `"tree"` → `"eert"` (or `"eetr"`).

<details>
<summary>Answer</summary>

**Pattern:** counting + bucket sort (or sort the counts).

**Key insight:** count characters with a Map. A count is at most n, so put characters in buckets by count and walk the buckets from high to low. Build the result in an array and `join` it, because adding to a string in a loop creates many new strings.

**Target:** O(n) time with buckets, O(n) space.

**Closest solved problem:** [Arrays and hashing, P6 Top k frequent elements](01-arrays-and-hashing.md#p6-top-k-frequent-elements-medium)

</details>

### Q32. k-th value in a times table (Hard)

In an `m × n` multiplication table (cell `(i, j)` holds `i × j`, starting from 1), return the k-th smallest value. m and n can be up to 30,000, so you cannot build the table.

<details>
<summary>Answer</summary>

**Pattern:** binary search on the answer, with a counting check.

**Key insight:** for a guess `x`, row `i` has `Math.min(Math.floor(x / i), n)` values `<= x`. Summing over the rows counts all values `<= x` in O(m). Find the smallest `x` whose count is `>= k`; that `x` is always a real value in the table.

**Target:** O(m · log(m·n)) time, O(1) space.

**Closest solved problem:** [Binary search, P11 Capacity to ship packages](06-binary-search.md#p11-capacity-to-ship-packages-within-d-days-medium)

</details>

### Q33. The first 1 in an endless stream (Medium)

You can call `get(i)` on a sorted sequence of 0s followed by 1s, but you do not know its length (assume it is very long and ends with 1s). Find the index of the first 1 with as few calls as possible.

<details>
<summary>Answer</summary>

**Pattern:** exponential search, then binary search.

**Key insight:** you cannot binary search without an upper bound, so find one: check index 1, 2, 4, 8, ... until `get(hi)` is 1. The first 1 is between `hi / 2` and `hi`. Binary search that range for the first 1 (lower bound).

**Target:** O(log p) calls, where p is the position of the first 1.

**Closest solved problem:** [Binary search, P5 First and last position](06-binary-search.md#p5-find-first-and-last-position-of-an-element-medium)

</details>

### Q34. Fair split into k groups (Medium, small input)

Can you split an array of at most 16 positive numbers into `k` groups with equal sums? Example: `[4, 3, 2, 3, 5, 2, 1]`, k = 4 → true (`5`, `1+4`, `2+3`, `2+3`).

<details>
<summary>Answer</summary>

**Pattern:** backtracking with strong pruning, or bitmask DP. The tiny n (≤ 16) is the hint.

**Key insight:** if the total is not divisible by k, return false. Sort the numbers from big to small, and fill one group at a time up to `target = total / k`. Prune: skip a number that would overflow the group, and if putting a number into an **empty** group fails, stop, because every empty group is the same. Bitmask DP over the `2ⁿ` sets of used numbers is the safer worst case.

**Target:** bitmask DP O(n · 2ⁿ) time and O(2ⁿ) space; backtracking is exponential but fast with pruning.

**Closest solved problem:** [Dynamic programming, P12 0/1 knapsack and partition equal subset sum](12-dynamic-programming.md#p12-01-knapsack-and-partition-equal-subset-sum-medium) and [Backtracking, P6 Combination sum](11-backtracking.md#p6-combination-sum-medium)

</details>

### Q35. Numbers along the branches (Medium)

Each node of a binary tree holds one digit. Each root-to-leaf path spells a number (root 1 → 2 → 3 spells 123). Return the sum of all these numbers. Example: root 1 with children 2 and 3 → 12 + 13 = 25.

<details>
<summary>Answer</summary>

**Pattern:** tree DFS that passes a value down.

**Key insight:** pass `current = current * 10 + node.val` into each call. At a **leaf**, add `current` to the total. Only count leaves, not nodes with one missing child.

**Target:** O(n) time, O(h) space.

**Closest solved problem:** [Trees, P14 Path sum II](08-trees-and-binary-search-trees.md#p14-path-sum-ii-medium)

</details>

### Q36. Longest mirror hidden in a word (Medium)

Return the length of the longest **subsequence** (not substring: letters can be skipped) of a string that reads the same forwards and backwards. Example: `"bbbab"` → 4 (`"bbbb"`).

<details>
<summary>Answer</summary>

**Pattern:** 2D (interval) dynamic programming.

**Key insight:** let `dp[i][j]` be the answer for `s[i..j]`. If `s[i] === s[j]`, then `dp[i][j] = dp[i + 1][j − 1] + 2`; otherwise `max(dp[i + 1][j], dp[i][j − 1])`. Fill by increasing length, or loop `i` from the end. Another view: it is the LCS of the string and its reverse.

**Target:** O(n²) time, O(n²) space (O(n) with two rows).

**Closest solved problem:** [Dynamic programming, P10 Longest common subsequence](12-dynamic-programming.md#p10-longest-common-subsequence-medium) and [P13 Longest palindromic substring](12-dynamic-programming.md#p13-longest-palindromic-substring-medium)

</details>

### Q37. Rebuild the line (Medium)

People stand in a line. Each person is `[height, k]`, where `k` is the number of people **in front** of them who are at least as tall. The list is shuffled. Rebuild the line. Example: `[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]` → `[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]`.

<details>
<summary>Answer</summary>

**Pattern:** greedy after sorting.

**Key insight:** sort by height from tall to short, and by `k` from small to large for equal heights. Then insert each person at index `k` of the result. Shorter people inserted later do not change the count for taller people already placed, so each insertion is safe.

**Target:** O(n²) time because of the array inserts, O(n) space.

**Closest solved problem:** [Greedy, P8 Hand of straights](13-greedy-algorithms.md#p8-hand-of-straights-medium) (sort, then place greedily)

</details>

### Q38. Cheapest way to cut a rod (Hard)

A rod of length `n` must be cut at given positions. Each cut costs the current length of the piece you cut. You choose the order of cuts. Return the minimum total cost. Example: n = 7, cuts `[1, 3, 4, 5]` → 16.

<details>
<summary>Answer</summary>

**Pattern:** interval dynamic programming.

**Key insight:** add 0 and n to the cut list and sort it. Let `dp[i][j]` be the cheapest cost to make all cuts strictly between positions `cuts[i]` and `cuts[j]`. Try each cut `m` in between as the **first** cut there: `dp[i][j] = min(dp[i][m] + dp[m][j]) + (cuts[j] − cuts[i])`. It has the same shape as burst balloons, where you choose which item to handle last (or first) inside a range.

**Target:** O(c³) time for c cuts, O(c²) space.

**Closest solved problem:** [Dynamic programming, P15 Burst balloons](12-dynamic-programming.md#p15-burst-balloons-hard)

</details>

### Q39. Shortest path if you may break walls (Hard)

A grid has open cells (0) and walls (1). You may break at most `k` walls. Return the fewest steps from the top-left to the bottom-right, or −1.

<details>
<summary>Answer</summary>

**Pattern:** BFS on an extended state `(row, col, walls left)`.

**Key insight:** the same cell is a different situation depending on how many breaks you still have, so the visited set must include that number. Every move costs 1, so plain BFS gives the shortest path. A useful shortcut: if `k >= rows + cols − 2`, the answer is simply `rows + cols − 2`.

**Target:** O(R × C × k) time and space.

**Closest solved problem:** [Graphs, P11 Cheapest flights within k stops](10-graphs-bfs-dfs-and-topological-sort.md#p11-cheapest-flights-within-k-stops-medium) (state includes a counter) and [P4 Rotting oranges](10-graphs-bfs-dfs-and-topological-sort.md#p4-rotting-oranges-medium) (grid BFS)

</details>

### Q40. Delete a value everywhere (Easy)

Remove every node with value `v` from a singly linked list and return the new head. The head itself may need to go. Example: `6→1→6→2→6`, v = 6 → `1→2`.

<details>
<summary>Answer</summary>

**Pattern:** linked list with a dummy head.

**Key insight:** put a dummy node before the head, so removing the head is not a special case. Walk with `prev`: if `prev.next.val === v`, skip it with `prev.next = prev.next.next` and do **not** move `prev`; otherwise move `prev` forward. Return `dummy.next`.

**Target:** O(n) time, O(1) space.

**Closest solved problem:** [Linked lists, P7 Remove nth node from end](07-linked-lists.md#p7-remove-nth-node-from-end-of-list-medium)

</details>


---

## Interview strategy

When you see a new problem and your mind is blank, do not wait for an idea. Follow steps that produce one.

1. **Restate the problem and ask about the input.** Sorted? Negative numbers? Duplicates? How big is n? These answers often pick the pattern for you. The full method is in [The eight-step method](../11-coding-interviews/02-problem-solving-and-complexity.md#the-eight-step-method).
2. **Do two small examples by hand.** Watch what you do with your own hands. If you scan left to right and keep "the best so far", that is one pass with a variable. If you keep going back to "the last unmatched thing", that is a stack.
3. **Say the brute force out loud, with its complexity.** "Try every pair: O(n²)." Now you have a working answer, and the interviewer knows you are not stuck.
4. **Ask "what work is repeated?"** Repeated lookups → hash map. Repeated sums → prefix sums. Repeated "find the minimum" → heap. Repeated sub-problems → DP. Repeated scanning of a sorted range → binary search or two pointers.
5. **Check the cheat sheet signals** above, and the input size table. Name the pattern out loud: "This looks like a sliding window, because the answer is a contiguous substring and the rule stays true when I shrink it."
6. **Test the pattern on a counterexample before you code.** For a sliding window: does a negative number break it? For greedy: can you find a small input where the greedy choice is wrong? This one step catches most traps.
7. **If you are still stuck, ask a focused question.** "Is it okay if I sort the input?" or "Can I use O(n) extra memory?" is a good question. "Can you give me a hint?" is fine too, after you show your brute force.

How to talk while you do this — short sentences, think aloud, check in with the interviewer — is in [How to explain technical answers](../11-coding-interviews/01-how-to-explain-technical-answers.md#the-core-answer-framework). For the full round (time budget, testing, analysis), see [Problem solving and complexity](../11-coding-interviews/02-problem-solving-and-complexity.md#time-budget-for-a-45-minute-round).

**What to say in the first two minutes (example):**
> "Let me restate it: I need the length of the longest subarray where the 1s outnumber the 0s. The brute force checks every subarray with a running count, which is O(n squared). A sliding window looks tempting, but the rule is not monotonic, because a window can be bad and then become good again as it grows. So I will turn 0 into minus 1 and use prefix sums: I need the earliest prefix that is smaller than the current one. That gives O(n) with a map of first positions."

---

## Summary

- The first job in a coding round is to **name the pattern**. Read for signals: sorted, contiguous, all combinations, fewest steps, k largest, number of ways, dependencies.
- Use the **input size** to guess the target complexity, then pick a pattern that fits it.
- **Traps to check every time:** negative numbers break sliding windows; a greedy choice needs a proof or a counterexample check; a DFS minimum on a tree must handle a missing child; JavaScript `sort()` needs a numeric comparator.
- Many hard problems are **two patterns together**: heap + sliding window, binary search + BFS, tree + DP, trie + backtracking, prefix sums + hash map.
- When stuck: restate, do examples by hand, say the brute force, ask "what work is repeated?", then match a signal.
- Revise with the [All problems at a glance](#all-problems-at-a-glance) list: for each problem, say the pattern and the complexity before you open it.

**Back to:** [Data Structures and Algorithms](README.md)
