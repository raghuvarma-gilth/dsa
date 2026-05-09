import {
  Brackets, Type, Hash, Layers, ListOrdered, Link2, TreePine,
  RotateCcw, Repeat, Triangle, Network, LetterText, Grid3X3,
  Star, Zap, ArrowUpDown, BarChart3, Pi, Diamond, Cpu
} from 'lucide-react';

const dsaTopics = [
  {
    id: 'arrays',
    title: 'Arrays',
    icon: Brackets,
    color: '#8b5cf6',
    subtopics: [
      {
        id: 'two-pointer', title: 'Two Pointer', difficulty: 'easy',
        children: ['Opposite ends (left + right)', 'Same direction (fast & slow)', 'Partition / Dutch flag', '3-Sum / k-Sum patterns']
      },
      {
        id: 'sliding-window', title: 'Sliding Window', difficulty: 'medium',
        children: ['Fixed size', 'Variable size – Expand / Shrink', 'Monotonic Window']
      },
      {
        id: 'prefix-based', title: 'Prefix Based', difficulty: 'easy',
        children: ['Prefix Sum', 'Prefix XOR', '2D Prefix', 'Prefix Product']
      },
      {
        id: 'kadane-subarray', title: "Kadane's / Subarray", difficulty: 'medium',
        children: ['Max subarray sum', 'Max product subarray', 'Subarray with given XOR / sum']
      },
      {
        id: 'binary-search', title: 'Binary Search', difficulty: 'medium',
        children: ['On index', 'On answer', 'Rotated sorted array', 'Search in 2D matrix']
      },
      {
        id: 'matrix-2d', title: 'Matrix / 2D Array', difficulty: 'medium',
        children: ['Spiral traversal', 'Rotate / transpose', 'Island / flood fill']
      }
    ]
  },
  {
    id: 'strings',
    title: 'Strings',
    icon: Type,
    color: '#3b82f6',
    subtopics: [
      {
        id: 'string-sliding-window', title: 'Sliding Window', difficulty: 'medium',
        children: ['Longest substring without repeat', 'Minimum window substring', 'Anagram / permutation in string']
      },
      {
        id: 'string-two-pointers', title: 'Two Pointers', difficulty: 'easy',
        children: ['Palindrome check', 'Reverse words / characters', 'String compression']
      },
      {
        id: 'pattern-matching', title: 'Pattern Matching', difficulty: 'hard',
        children: ['KMP (failure function)', 'Rabin-Karp (rolling hash)', 'Z-algorithm', 'Boyer-Moore']
      },
      {
        id: 'string-advanced', title: 'Advanced', difficulty: 'hard',
        children: ['Suffix Array', "Manacher's algorithm", 'Aho-Corasick (multi-pattern)']
      }
    ]
  },
  {
    id: 'hashmap',
    title: 'HashMap',
    icon: Hash,
    color: '#06b6d4',
    subtopics: [
      {
        id: 'frequency-based', title: 'Frequency Based', difficulty: 'easy',
        children: ['Count occurrences', 'Top K frequent', 'Frequency sort']
      },
      {
        id: 'lookup-based', title: 'Lookup Based', difficulty: 'easy',
        children: ['Two Sum / complement pattern', 'Set based lookup', 'Index mapping']
      },
      {
        id: 'grouping-pattern', title: 'Grouping Pattern', difficulty: 'medium',
        children: ['Anagram grouping', 'Sliding window with map', 'Subarray sum equals K']
      }
    ]
  },
  {
    id: 'stack',
    title: 'Stack',
    icon: Layers,
    color: '#f59e0b',
    subtopics: [
      {
        id: 'monotonic-stack', title: 'Monotonic Stack', difficulty: 'medium',
        children: ['Increasing', 'Decreasing', 'Next Greater', 'Next Smaller', 'Previous Variants']
      },
      {
        id: 'range-span', title: 'Range / Span', difficulty: 'medium',
        children: ['min / Max Stack', 'Stock span problem', 'Expression Handling']
      },
      {
        id: 'histogram-pattern', title: 'Histogram Pattern', difficulty: 'hard',
        children: ['Largest rectangle', 'Trapping rain water', 'Max area in histogram']
      }
    ]
  },
  {
    id: 'queue',
    title: 'Queue / Deque',
    icon: ListOrdered,
    color: '#ec4899',
    subtopics: [
      {
        id: 'fifo-processing', title: 'FIFO Processing', difficulty: 'easy',
        children: ['Level-wise processing', 'Circular Queue Pattern', 'Task scheduling']
      },
      {
        id: 'deque-based', title: 'Deque Based', difficulty: 'hard',
        children: ['Sliding window max (Deque)', 'Monotonic Queue', 'Priority Queue patterns']
      }
    ]
  },
  {
    id: 'linked-list',
    title: 'Linked List',
    icon: Link2,
    color: '#10b981',
    subtopics: [
      {
        id: 'pointer-techniques', title: 'Pointer Techniques', difficulty: 'medium',
        children: ['Fast – Slow', 'Cycle Detection', 'Finding Middle']
      },
      {
        id: 'reversal', title: 'Reversal', difficulty: 'medium',
        children: ['Full Reverse', 'Partial (k-group)', 'Merge Lists']
      },
      {
        id: 'advanced-ll', title: 'Advanced', difficulty: 'hard',
        children: ['Flatten / Sort list', 'Add two numbers', 'LRU Cache (List + Map)']
      }
    ]
  },
  {
    id: 'trees',
    title: 'Trees',
    icon: TreePine,
    color: '#22c55e',
    subtopics: [
      {
        id: 'tree-traversal', title: 'Traversal', difficulty: 'easy',
        children: ['DFS – Pre / In / Post order', 'BFS – Level / Zigzag / Right side view']
      },
      {
        id: 'recursion-patterns', title: 'Recursion Patterns', difficulty: 'medium',
        children: ['Top Down approach', 'Bottom Up approach']
      },
      {
        id: 'path-based', title: 'Path Based', difficulty: 'medium',
        children: ['Max path sum', 'Diameter / Height / Depth', 'Root to leaf paths']
      },
      {
        id: 'bst', title: 'BST (Binary Search Tree)', difficulty: 'medium',
        children: ['AVL / Red-Black tree concepts', 'Lowest Common Ancestor', 'Serialize / Deserialize', 'N-ary Tree']
      }
    ]
  },
  {
    id: 'backtracking',
    title: 'Backtracking',
    icon: RotateCcw,
    color: '#a855f7',
    subtopics: [
      {
        id: 'exploration', title: 'Exploration', difficulty: 'medium',
        children: ['Decision Tree', 'Choose – Explore – Unchoose', 'Subsets (power set)', 'Permutations / Combinations', 'Word search on grid', 'Palindrome partitioning']
      },
      {
        id: 'classic-bt', title: 'Classic Problems', difficulty: 'hard',
        children: ['N-Queens', 'Sudoku solver', 'Rat in a maze']
      },
      {
        id: 'pruning', title: 'Pruning / State Tracking', difficulty: 'hard',
        children: ['Constraint pruning', 'Visited set', 'Bounding functions']
      }
    ]
  },
  {
    id: 'recursion',
    title: 'Recursion',
    icon: Repeat,
    color: '#14b8a6',
    subtopics: [
      {
        id: 'divide-conquer', title: 'Divide & Conquer', difficulty: 'medium',
        children: ['Merge sort pattern', 'Quick select (k-th largest)', 'Count inversions', 'Closest pair of points', 'Strassen matrix multiplication']
      },
      {
        id: 'core-recursion', title: 'Core Recursion', difficulty: 'easy',
        children: ['Base case design', 'Head / tail recursion', 'Tree recursion', 'Memoized recursion']
      }
    ]
  },
  {
    id: 'heap',
    title: 'Heap',
    icon: Triangle,
    color: '#f97316',
    subtopics: [
      {
        id: 'greedy-heap', title: 'Greedy Heap (Top K)', difficulty: 'medium',
        children: ['Top K / Kth Element / k closest', 'Task Scheduler', 'Meeting Rooms', 'Reorganize String', 'Huffman Encoding']
      },
      {
        id: 'k-way-merge', title: 'K-way Merge', difficulty: 'hard',
        children: ['Merge K sorted lists', 'Smallest range covering K lists']
      },
      {
        id: 'two-heaps', title: 'Two Heaps Pattern', difficulty: 'hard',
        children: ['Find median from data stream', 'Sliding window median', 'Frequency sort']
      }
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs',
    icon: Network,
    color: '#6366f1',
    subtopics: [
      {
        id: 'graph-traversal', title: 'Traversal', difficulty: 'easy',
        children: ['BFS', 'DFS', 'Multi-source BFS']
      },
      {
        id: 'cycle-detection', title: 'Cycle Detection', difficulty: 'medium',
        children: ['Directed', 'Undirected', 'Coloring method']
      },
      {
        id: 'topological-sort', title: 'Topological Sort', difficulty: 'medium',
        children: ["Kahn's algorithm (BFS in-degree)", 'DFS-based topo sort', 'Course schedule']
      },
      {
        id: 'shortest-path', title: 'Shortest Path', difficulty: 'hard',
        children: ['Dijkstra', 'Bellman-Ford', 'Floyd-Warshall (all pairs)', 'A* search', 'SPFA']
      },
      {
        id: 'spanning-tree', title: 'Spanning Tree', difficulty: 'hard',
        children: ['Kruskal', "Prim's"]
      },
      {
        id: 'union-find', title: 'Union-Find (DSU)', difficulty: 'medium',
        children: ['Detect cycle in undirected', 'Connected components', 'Path compression']
      },
      {
        id: 'advanced-graphs', title: 'Advanced', difficulty: 'hard',
        children: ['Bipartite / 0-1 BFS', 'Bridges & Articulation points', 'SCC (Strongly Connected Components)', 'Eulerian path / circuit', 'Network flow (max flow)']
      }
    ]
  },
  {
    id: 'trie',
    title: 'Trie',
    icon: LetterText,
    color: '#0ea5e9',
    subtopics: [
      {
        id: 'prefix-based-trie', title: 'Prefix Based', difficulty: 'medium',
        children: ['Insert / Search', 'Prefix Match', 'Auto-complete', 'Word dictionary']
      },
      {
        id: 'bitwise-trie', title: 'Bitwise Trie', difficulty: 'hard',
        children: ['Max XOR pair in array', 'Compressed Trie (Patricia)']
      }
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    icon: Grid3X3,
    color: '#8b5cf6',
    subtopics: [
      {
        id: 'dp-core', title: 'Core', difficulty: 'medium',
        children: ['1D DP', '2D DP']
      },
      {
        id: 'dp-transition', title: 'Transition Type', difficulty: 'medium',
        children: ['Linear DP', 'Grid DP', 'Decision DP', 'Interval DP']
      },
      {
        id: 'dp-patterns', title: 'Pattern Types', difficulty: 'hard',
        children: ['Knapsack (0/1, Unbounded, Fractional)', 'Sequence DP (LIS, LCS, Edit Distance)', 'Partition DP', 'String DP', 'Buy & Sell Stocks', 'Matrix chain multiplication']
      },
      {
        id: 'dp-advanced', title: 'Advanced', difficulty: 'hard',
        children: ['Bitmask DP', 'Digit DP', 'DP on Trees', 'DP on Graphs', 'Broken profile DP']
      },
      {
        id: 'dp-optimization', title: 'Optimization', difficulty: 'medium',
        children: ['Memoization', 'Tabulation', 'Space optimization', 'Convex hull trick']
      }
    ]
  },
  {
    id: 'greedy',
    title: 'Greedy',
    icon: Star,
    color: '#eab308',
    subtopics: [
      {
        id: 'interval-greedy', title: 'Interval Greedy', difficulty: 'medium',
        children: ['Activity Selection', 'Non-overlapping Intervals', 'Minimum Removals']
      },
      {
        id: 'scheduling-greedy', title: 'Scheduling Greedy', difficulty: 'medium',
        children: ['Deadline Based Scheduling', 'Profit Based Selection', 'Resource Allocation', 'Minimum Platforms / Rooms', 'Meeting Rooms']
      },
      {
        id: 'jump-game', title: 'Jump Game Pattern', difficulty: 'medium',
        children: ['Jump Game I', 'Jump Game II', 'Min jumps']
      },
      {
        id: 'other-greedy', title: 'Other Greedy', difficulty: 'hard',
        children: ['Huffman / Merge Cost', 'Gas station / Circular greedy', 'Candy / Monotone greedy', 'Fractional knapsack']
      }
    ]
  },
  {
    id: 'bit-manipulation',
    title: 'Bit Manipulation',
    icon: Zap,
    color: '#f43f5e',
    subtopics: [
      {
        id: 'core-bits', title: 'Core', difficulty: 'medium',
        children: ['XOR Pattern', 'Bit Masking', 'AND / OR tricks', 'Left / Right shift']
      },
      {
        id: 'bit-usage', title: 'Usage', difficulty: 'medium',
        children: ['Subset via Bits', 'Bit Checks', 'Prefix XOR', 'Count set bits', 'Power of 2 check', "Brian Kernighan's algo"]
      }
    ]
  },
  {
    id: 'sorting',
    title: 'Sorting',
    icon: ArrowUpDown,
    color: '#64748b',
    subtopics: [
      {
        id: 'comparison-sorts', title: 'Comparison-Based', difficulty: 'easy',
        children: ['Bubble Sort – O(n²)', 'Selection Sort – O(n²)', 'Insertion Sort – O(n²)', 'Merge Sort – O(n log n)', 'Quick Sort – O(n log n) avg', 'Heap Sort – O(n log n)', 'Shell Sort']
      },
      {
        id: 'non-comparison', title: 'Non-Comparison Based', difficulty: 'medium',
        children: ['Counting Sort – O(n + k)', 'Radix Sort – O(nk)', 'Bucket Sort']
      },
      {
        id: 'custom-sorting', title: 'Custom / Partial', difficulty: 'medium',
        children: ['Partial sort (nth element)', 'External sort', 'Stable vs Unstable']
      }
    ]
  },
  {
    id: 'range-structures',
    title: 'Range Structures',
    icon: BarChart3,
    color: '#0d9488',
    subtopics: [
      {
        id: 'segment-tree', title: 'Segment Tree', difficulty: 'hard',
        children: ['Range Query', 'Lazy Propagation', 'Point update', 'Range update', 'Persistent Segment Tree']
      },
      {
        id: 'fenwick-tree', title: 'Fenwick Tree (BIT)', difficulty: 'hard',
        children: ['Prefix Query', 'Point update', '2D BIT']
      },
      {
        id: 'other-range', title: 'Other Range Structures', difficulty: 'hard',
        children: ['Sparse Table (RMQ / O(1) query)', 'Square root decomposition', 'Wavelet Tree']
      }
    ]
  },
  {
    id: 'math',
    title: 'Math / Number Theory',
    icon: Pi,
    color: '#7c3aed',
    subtopics: [
      {
        id: 'math-fundamentals', title: 'Fundamentals', difficulty: 'easy',
        children: ['GCD / LCM (Euclidean)', 'Sieve of Eratosthenes', 'Prime factorization', 'Divisors & multiples']
      },
      {
        id: 'modular-arithmetic', title: 'Modular Arithmetic', difficulty: 'hard',
        children: ['Modular exponentiation', 'Modular inverse (Fermat)', 'Chinese Remainder Theorem']
      },
      {
        id: 'combinatorics', title: 'Combinatorics', difficulty: 'hard',
        children: ["nCr / nPr (Pascal's triangle)", 'Inclusion-Exclusion', 'Catalan numbers', 'Pigeonhole principle']
      }
    ]
  },
  {
    id: 'geometry',
    title: 'Geometry',
    icon: Diamond,
    color: '#e11d48',
    subtopics: [
      {
        id: 'computational-geo', title: 'Computational Geometry', difficulty: 'hard',
        children: ['Convex Hull (Graham scan)', 'Point in polygon', 'Line intersection', 'Closest pair of points', 'Sweep line algorithm', 'Area of shapes']
      }
    ]
  },
  {
    id: 'advanced-topics',
    title: 'Advanced Topics',
    icon: Cpu,
    color: '#dc2626',
    subtopics: [
      {
        id: 'tree-advanced', title: 'Tree Techniques', difficulty: 'hard',
        children: ['Binary Lifting', 'Heavy Light Decomposition', 'Euler Tour', 'Centroid Decomposition']
      },
      {
        id: 'query-advanced', title: 'Query Techniques', difficulty: 'hard',
        children: ["Mo's Algorithm", 'Coordinate Compression', 'Offline query processing']
      },
      {
        id: 'math-advanced', title: 'Math / Algebra', difficulty: 'hard',
        children: ['FFT (Fast Fourier Transform)', 'Matrix Exponentiation', 'NTT']
      },
      {
        id: 'ds-advanced', title: 'Data Structures', difficulty: 'hard',
        children: ['Treap', 'Suffix Automaton', 'Link-Cut Tree']
      },
      {
        id: 'paradigm-advanced', title: 'Paradigms', difficulty: 'hard',
        children: ['Meet in the Middle', 'Sqrt Decomposition', 'CDQ Divide & Conquer']
      }
    ]
  }
];

export default dsaTopics;
