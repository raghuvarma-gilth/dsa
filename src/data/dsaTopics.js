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
        patternGuide: {
          complexity: { time: 'O(n) or O(n log n)', space: 'O(1)' },
          clues: [
            'Array is SORTED (or can be sorted first)',
            'Find a pair / triplet / quadruplet with target sum',
            'Remove duplicates / move elements in-place',
            'Compare characters from both ends (palindrome)',
            'Merge two sorted arrays',
            'Partition array around a pivot',
            'Container with most water (maximize area between two walls)',
          ],
          antiClues: [
            'Array is unsorted and sorting isn\'t allowed → use HashMap',
            'Need indices of original positions after sort → be careful',
            'Contiguous subarray constraint → use Sliding Window instead',
            'Count ways or minimum cost → use Dynamic Programming',
          ],
          examples: [
            {
              problem: 'Two Sum in sorted array — find two numbers that add to target',
              clue: '\'sorted\' + \'pair\' + \'target sum\'',
              why: 'Left pointer starts at 0, right at end. If sum > target → right--; if sum < target → left++.',
              trap: 'Two Sum I (unsorted, return indices) → use HashMap, not Two Pointers',
            },
            {
              problem: '3Sum — find all unique triplets summing to zero',
              clue: '\'triplet\' + \'unique\' → sort first, fix one element, Two Pointers for rest',
              why: 'Loop i, then two pointers [i+1, n-1] for each fixed i. Skip duplicates.',
              trap: 'Don\'t use HashMap — duplicates are hard to handle; sort + TP is cleaner',
            },
            {
              problem: 'Container With Most Water',
              clue: '\'maximize area between two walls\' → squeeze from both ends',
              why: 'Always move the shorter wall inward — greedy insight works here.',
              trap: 'Not Monotonic Stack — we need max area, not next greater element',
            },
            {
              problem: 'Valid Palindrome — compare from both ends',
              clue: '\'compare chars from both ends\' = left pointer from start, right from end',
              why: 'Skip non-alphanumeric with pointer advancement, compare chars.',
              trap: 'Not Sliding Window — no window size or constraint; just comparison',
            },
          ],
          brainSays: 'One pointer at start, one at end. They walk toward each other (or same direction). Sorted array is key.',
        },
        children: [
          { name: 'Opposite ends (left + right)', gfgLink: 'https://www.geeksforgeeks.org/problems/opposite-ends-left-right/1' },
          { name: 'Same direction (fast & slow)', gfgLink: 'https://www.geeksforgeeks.org/problems/same-direction-fast-slow/1' },
          { name: 'Partition / Dutch flag', gfgLink: 'https://www.geeksforgeeks.org/problems/partition-dutch-flag/1' },
          { name: '3-Sum / k-Sum patterns', gfgLink: 'https://www.geeksforgeeks.org/problems/3-sum-k-sum-patterns/1' },
          { name: 'Sort Colors (Dutch National Flag)', gfgLink: 'https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1' },
          { name: 'Container With Most Water', gfgLink: 'https://www.geeksforgeeks.org/problems/container-with-most-water/1' },
          { name: '4Sum', gfgLink: 'https://www.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1' },
          { name: 'Move Zeroes', gfgLink: 'https://www.geeksforgeeks.org/problems/move-all-zeroes-to-end-of-array0751/1' }
        ]
      },
      {
        id: 'prefix-based', title: 'Prefix Based', difficulty: 'easy',
        patternGuide: {
          complexity: { time: 'O(n) build, O(1) query', space: 'O(n)' },
          clues: [
            'Sum from index L to R — range queries',
            'Multiple queries on the same static array',
            'Subarray sum equals K (prefix + HashMap)',
            '2D matrix region sum queries',
            'Prefix XOR for range XOR queries',
            'Count subarrays with a property (frequency map of prefix)',
          ],
          antiClues: [
            'Only one query → just loop, no prefix needed',
            'Window size is bounded dynamically → Sliding Window',
            'Array changes after each query → use Segment Tree / BIT instead',
          ],
          examples: [
            {
              problem: 'Range sum query — many Q queries on same array',
              clue: '\'many queries\' + \'static array\' → Prefix Sum array',
              why: 'Build prefix once in O(n). Each query = prefix[R] - prefix[L-1] in O(1).',
              trap: 'Not Sliding Window — no moving window; independent L..R queries',
            },
            {
              problem: 'Number of subarrays whose sum equals K',
              clue: '\'count subarrays\' + \'sum = K\' → prefix[j] - prefix[i] = K',
              why: 'Store prefix sums in HashMap. For each j, look up (prefix[j] - K). O(n) total.',
              trap: 'Not Sliding Window — array can have negatives; window shrinking rule breaks',
            },
            {
              problem: 'Continuous subarray sum divisible by K',
              clue: '\'divisible by K\' → prefix[j] mod K == prefix[i] mod K',
              why: 'Store (prefix % K) in HashMap. Same remainder = valid subarray.',
              trap: 'Not Binary Search — no monotone predicate on K divisibility',
            },
          ],
          brainSays: 'Precompute prefix. Range answer = prefix[R] - prefix[L-1]. For count problems, add a HashMap.',
        },
        children: [
          { name: 'Prefix Sum', gfgLink: 'https://www.geeksforgeeks.org/problems/prefix-sum/1' },
          { name: 'Prefix XOR', gfgLink: 'https://www.geeksforgeeks.org/problems/prefix-xor/1' },
          { name: '2D Prefix', gfgLink: 'https://www.geeksforgeeks.org/problems/2d-prefix/1' },
          { name: 'Prefix Product', gfgLink: 'https://www.geeksforgeeks.org/problems/prefix-product/1' }
        ]
      },
      {
        id: 'kadane-subarray', title: "Kadane's / Subarray", difficulty: 'medium',
        children: [
          { name: 'Max subarray sum', gfgLink: 'https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1' },
          { name: 'Max product subarray', gfgLink: 'https://www.geeksforgeeks.org/problems/maximum-product-subarray3604/1' },
          { name: 'Subarray with given XOR / sum', gfgLink: 'https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1' }
        ]
      },
      {
        id: 'binary-search', title: 'Binary Search', difficulty: 'medium',
        patternGuide: {
          complexity: { time: 'O(log n) per search', space: 'O(1)' },
          clues: [
            'Find minimum value such that condition holds',
            'Find maximum value such that condition holds',
            'Keywords: capacity, speed, days, minimum allocation',
            'Array is sorted OR answer space is monotonic',
            'If X works, then X+1 also works (monotone predicate)',
            'Rotated sorted array / find peak element',
            'Search in 2D matrix with sorted rows & columns',
          ],
          antiClues: [
            'Completely unsorted, no monotonic property → linear scan',
            'Need ALL elements matching → use linear scan',
            'Answer space is not monotone → cannot Binary Search',
          ],
          examples: [
            {
              problem: 'Koko Eating Bananas — minimum speed to eat all in H hours',
              clue: '\'minimum speed such that all eaten in H hours\' → Binary Search on speed [1..max(piles)]',
              why: 'canFinish(speed) is monotone: if speed K works, K+1 also works. BS on speed.',
              trap: 'We\'re NOT searching IN the array; we\'re searching FOR the answer value',
            },
            {
              problem: 'Ship packages in D days — minimum capacity',
              clue: '\'minimum capacity such that feasible\' → Binary Search on answer space',
              why: 'Check: can we ship all packages with capacity=mid in D days? Greedy check inside BS.',
              trap: 'Not DP — no overlapping subproblems on capacity values',
            },
            {
              problem: 'Search in Rotated Sorted Array',
              clue: '\'rotated\' + \'sorted\' + \'search\' = modified BS with pivot logic',
              why: 'One half is always sorted. Check if target is in the sorted half, else search other.',
              trap: 'Not Two Pointers — no pair/sum constraint; it\'s a search problem',
            },
            {
              problem: 'Split array into K parts minimizing maximum sum',
              clue: '\'minimize the maximum\' → Binary Search on answer (max subarray sum)',
              why: 'Check: can we split with max-sum ≤ mid? Greedy check runs inside each BS step.',
              trap: 'DP works too but O(n²k) vs BS+Greedy O(n log n) — BS is preferred',
            },
          ],
          brainSays: 'I\'m NOT searching IN the array. I\'m searching FOR the answer. Is the predicate monotone? Then Binary Search.',
        },
        children: [
          { name: 'On index', gfgLink: 'https://www.geeksforgeeks.org/problems/binary-search-1587115620/1' },
          { name: 'On answer', gfgLink: 'https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1' },
          { name: 'Rotated sorted array', gfgLink: 'https://www.geeksforgeeks.org/problems/search-in-a-rotated-array4618/1' },
          { name: 'Search in 2D matrix', gfgLink: 'https://www.geeksforgeeks.org/problems/search-in-a-matrix17201720/1' }
        ]
      },
      {
        id: 'matrix-2d', title: 'Matrix / 2D Array', difficulty: 'medium',
        children: [
          { name: 'Spiral traversal', gfgLink: 'https://www.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1' },
          { name: 'Rotate / transpose', gfgLink: 'https://www.geeksforgeeks.org/problems/rotate-by-90-degree-1587115621/1' },
          { name: 'Island / flood fill', gfgLink: 'https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1' },
          { name: 'Set Matrix Zeroes', gfgLink: 'https://www.geeksforgeeks.org/problems/make-zeroes4042/1' }
        ]
      },
      {
        id: 'misc-arrays', title: 'Misc / Standard', difficulty: 'medium',
        children: [
          { name: 'Merge Intervals', gfgLink: 'https://www.geeksforgeeks.org/problems/overlapping-intervals--170633/1' },
          { name: 'Next Permutation', gfgLink: 'https://www.geeksforgeeks.org/problems/next-permutation5226/1' },
          { name: 'Stock Buy & Sell', gfgLink: 'https://www.geeksforgeeks.org/problems/stock-buy-and-sell-1587115621/1' },
          { name: 'Missing Number', gfgLink: 'https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1' },
          { name: 'Majority Element', gfgLink: 'https://www.geeksforgeeks.org/problems/majority-element-1587115620/1' },
          { name: 'Pascals Triangle', gfgLink: 'https://www.geeksforgeeks.org/problems/pascal-triangle0652/1' }
        ]
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
        id: 'string-two-pointers', title: 'Two Pointers', difficulty: 'easy',
        children: [
          { name: 'Palindrome check', gfgLink: 'https://www.geeksforgeeks.org/problems/palindrome-string0817/1' },
          { name: 'Reverse words / characters', gfgLink: 'https://www.geeksforgeeks.org/problems/reverse-words-in-a-given-string5459/1' },
          { name: 'String compression', gfgLink: 'https://www.geeksforgeeks.org/problems/run-length-encoding/1' },
          { name: 'Reverse String', gfgLink: 'https://www.geeksforgeeks.org/problems/reverse-a-string/1' }
        ]
      },
      {
        id: 'pattern-matching', title: 'Pattern Matching', difficulty: 'hard',
        children: [
          { name: 'KMP (failure function)', gfgLink: 'https://www.geeksforgeeks.org/problems/search-pattern0205/1' },
          { name: 'Rabin-Karp (rolling hash)', gfgLink: 'https://www.geeksforgeeks.org/problems/search-pattern-rabin-karp-algorithm--141631/1' },
          { name: 'Z-algorithm', gfgLink: 'https://www.geeksforgeeks.org/problems/search-pattern-z-algorithm--141631/1' },
          { name: 'Boyer-Moore', gfgLink: 'https://www.geeksforgeeks.org/problems/pattern-searching-using-boyer-moore/1' }
        ]
      },
      {
        id: 'string-advanced', title: 'Advanced', difficulty: 'hard',
        children: [
          { name: 'Suffix Array', gfgLink: 'https://www.geeksforgeeks.org/problems/suffix-array/1' },
          { name: 'Manachers algorithm', gfgLink: 'https://www.geeksforgeeks.org/problems/manachers-algorithm/1' },
          { name: 'Aho-Corasick (multi-pattern)', gfgLink: 'https://www.geeksforgeeks.org/problems/aho-corasick/1' }
        ]
      },
      {
        id: 'string-standard', title: 'Standard Problems', difficulty: 'medium',
        children: [
          { name: 'Longest Palindromic Substring', gfgLink: 'https://www.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1' },
          { name: 'Valid Parentheses', gfgLink: 'https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1' },
          { name: 'Group Anagrams', gfgLink: 'https://www.geeksforgeeks.org/problems/print-anagrams-together/1' },
          { name: 'Count & Say', gfgLink: 'https://www.geeksforgeeks.org/problems/decode-the-pattern1138/1' },
          { name: 'Encode/Decode Strings', gfgLink: 'https://www.geeksforgeeks.org/problems/encode-and-decode-strings/1' },
          { name: 'Roman to Integer', gfgLink: 'https://www.geeksforgeeks.org/problems/roman-number-to-integer3201/1' },
          { name: 'Longest Common Prefix', gfgLink: 'https://www.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1' },
          { name: 'Atoi', gfgLink: 'https://www.geeksforgeeks.org/problems/implement-atoi/1' }
        ]
      }
    ]
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    icon: ArrowUpDown,
    color: '#f43f5e',
    subtopics: [
      {
        id: 'sw-fixed', title: 'Fixed Size', difficulty: 'easy',
        patternGuide: {
          complexity: { time: 'O(n)', space: 'O(k)' },
          clues: [
            'Fixed window size K given explicitly',
            'Subarray / substring / contiguous range',
            'Maximum or minimum sum/average over every window of size K',
            'Anagram / permutation match — window size = pattern length',
          ],
          antiClues: [
            'Window size is dynamic/variable → use Variable Sliding Window',
            'Many independent L..R queries → use Prefix Sum instead',
            'Elements don\'t need to be adjacent → not window',
          ],
          examples: [
            {
              problem: 'Maximum sum subarray of size K',
              clue: '\'fixed size K\' + \'contiguous\' = fixed-size window, slide by 1',
              why: 'Add rightmost element, subtract leftmost element as window slides. O(n).',
              trap: 'Not Prefix Sum — window slides, not independent L..R queries',
            },
            {
              problem: 'Find all anagrams of pattern P in string S',
              clue: '\'anagram\' = same chars different order = fixed-size window of |P|',
              why: 'Use frequency map, compare window freq with pattern freq as window slides.',
              trap: 'Not Trie — no prefix search; not Two Pointers — different arrays',
            },
          ],
          brainSays: 'Fixed window: add right element, remove left element. One pass. O(n).',
        },
        children: [
          { name: 'Fixed size', gfgLink: 'https://www.geeksforgeeks.org/problems/fixed-size/1' },
          { name: 'First negative in every window of size K', gfgLink: 'https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1' },
          { name: 'Anagram / permutation in string', gfgLink: 'https://www.geeksforgeeks.org/problems/count-occurences-of-anagrams5839/1' }
        ]
      },
      {
        id: 'sw-variable', title: 'Variable Size', difficulty: 'medium',
        patternGuide: {
          complexity: { time: 'O(n)', space: 'O(k) or O(1)' },
          clues: [
            'Longest / shortest subarray or substring with some constraint',
            'At most K distinct elements in window',
            'Exactly K (convert: atMost(K) - atMost(K-1))',
            'Minimum window containing all characters of pattern',
            'Longest repeating char after at most K replacements',
          ],
          antiClues: [
            'Elements don\'t need to be adjacent → not Sliding Window',
            'Non-contiguous subsequence → not window',
            'Many separate L..R queries → use Prefix Sum instead',
            'Negative numbers in array + sum constraint → use Prefix+HashMap',
          ],
          examples: [
            {
              problem: 'Longest substring with at most 2 distinct characters',
              clue: '\'longest substring\' + \'at most K distinct\' → variable window',
              why: 'Expand right, shrink left when distinct count > 2. Track char freq in map.',
              trap: 'Not Two Pointers — here we need contiguous chars, not a pair',
            },
            {
              problem: 'Minimum window substring containing all chars of T',
              clue: '\'minimum window\' + \'all chars must appear\' = shrink when valid',
              why: 'Expand right to include all chars, shrink left to minimize window size.',
              trap: 'Not BFS — no graph/grid; it\'s a string constraint problem',
            },
            {
              problem: 'Longest repeating character replacement (at most K changes)',
              clue: '\'longest\' + \'contiguous\' + \'at most K modifications\'',
              why: 'Key insight: windowSize - max_freq ≤ K. Shrink left when invalid.',
              trap: 'Not Greedy — must keep window contiguous; can\'t pick chars independently',
            },
          ],
          brainSays: 'This window needs to move. Expand right, shrink left when invalid. One pass through the array.',
        },
        children: [
          { name: 'Variable size – Expand / Shrink', gfgLink: 'https://www.geeksforgeeks.org/problems/variable-size-expand-shrink/1' },
          { name: 'Longest substring without repeat', gfgLink: 'https://www.geeksforgeeks.org/problems/longest-distinct-characters-in-string5848/1' },
          { name: 'Minimum window substring', gfgLink: 'https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1' }
        ]
      },
      {
        id: 'sw-monotonic', title: 'Monotonic Window', difficulty: 'hard',
        children: [
          { name: 'Monotonic Window', gfgLink: 'https://www.geeksforgeeks.org/problems/monotonic-window/1' }
        ]
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
        children: [
          { name: 'Count occurrences', gfgLink: 'https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1' },
          { name: 'Top K frequent', gfgLink: 'https://www.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1' },
          { name: 'Frequency sort', gfgLink: 'https://www.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency-1587115621/1' },
          { name: 'Contains Duplicate', gfgLink: 'https://www.geeksforgeeks.org/problems/contains-duplicate/1' }
        ]
      },
      {
        id: 'lookup-based', title: 'Lookup Based', difficulty: 'easy',
        children: [
          { name: 'Two Sum / complement pattern', gfgLink: 'https://www.geeksforgeeks.org/problems/key-pair5616/1' },
          { name: 'Set based lookup', gfgLink: 'https://www.geeksforgeeks.org/problems/set-based-lookup/1' },
          { name: 'Index mapping', gfgLink: 'https://www.geeksforgeeks.org/problems/index-mapping/1' },
          { name: 'Valid Sudoku', gfgLink: 'https://www.geeksforgeeks.org/problems/is-sudoku-valid4820/1' },
          { name: 'Intersection of Two Arrays', gfgLink: 'https://www.geeksforgeeks.org/problems/intersection-of-two-arrays2404/1' }
        ]
      },
      {
        id: 'grouping-pattern', title: 'Grouping Pattern', difficulty: 'medium',
        children: [
          { name: 'Anagram grouping', gfgLink: 'https://www.geeksforgeeks.org/problems/print-anagrams-together/1' },
          { name: 'Sliding window with map', gfgLink: 'https://www.geeksforgeeks.org/problems/sliding-window-with-map/1' },
          { name: 'Subarray sum equals K', gfgLink: 'https://www.geeksforgeeks.org/problems/subarrays-with-sum-k/1' },
          { name: 'Longest Consecutive Sequence', gfgLink: 'https://www.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/1' },
          { name: '4Sum', gfgLink: 'https://www.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1' }
        ]
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
        patternGuide: {
          complexity: { time: 'O(n) amortized', space: 'O(n)' },
          clues: [
            'Next greater element / next smaller element',
            'Previous greater / previous smaller',
            'Span of stock prices / daily temperatures',
            'Remove K digits to make smallest number',
            'Sliding window maximum (use monotonic deque)',
          ],
          antiClues: [
            'Need ALL greater/smaller, not just nearest → linear scan',
            'Need K-th greatest → Heap instead',
            'Ranges/intervals involved → Interval Merging',
          ],
          examples: [
            {
              problem: 'Daily Temperatures — days until a warmer temperature for each day',
              clue: '\'next greater element\' = Monotonic Decreasing Stack of indices',
              why: 'Push index. When current temp > stack top temp → pop; that day found its answer.',
              trap: 'Not DP — no overlapping subproblems. Not brute force O(n²).',
            },
            {
              problem: 'Online Stock Span — span of consecutive days with price ≤ today',
              clue: '\'span\' = how many consecutive previous days had lower/equal price → Mono Stack',
              why: 'Maintain stack of (price, span). When current ≥ top price, merge spans.',
              trap: 'Not Prefix Sum — spans change dynamically per new price',
            },
            {
              problem: 'Sliding Window Maximum — max in every window of size K',
              clue: '\'max in sliding window\' = Monotonic Decreasing Deque',
              why: 'Deque front = max. Remove from back elements ≤ current (they\'ll never be max).',
              trap: 'Not Heap — heap gives O(n log n); deque gives O(n). Heap can\'t efficiently remove old elements.',
            },
          ],
          brainSays: 'I need NEAREST greater/smaller. Pop from stack when condition breaks. That element just found its answer.',
        },
        children: [
          { name: 'Increasing', gfgLink: 'https://www.geeksforgeeks.org/problems/increasing-stack/1' },
          { name: 'Decreasing', gfgLink: 'https://www.geeksforgeeks.org/problems/decreasing-stack/1' },
          { name: 'Next Greater', gfgLink: 'https://www.geeksforgeeks.org/problems/next-larger-element-1587115620/1' },
          { name: 'Next Smaller', gfgLink: 'https://www.geeksforgeeks.org/problems/fab3281cefac4a40871d871789725fdbbe902af5/1' },
          { name: 'Previous Variants', gfgLink: 'https://www.geeksforgeeks.org/problems/previous-variants/1' },
          { name: 'Daily Temperatures', gfgLink: 'https://www.geeksforgeeks.org/problems/daily-temperatures/1' },
          { name: 'Online Stock Span', gfgLink: 'https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1' }
        ]
      },
      {
        id: 'range-span', title: 'Range / Span', difficulty: 'medium',
        children: [
          { name: 'min / Max Stack', gfgLink: 'https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1' },
          { name: 'Stock span problem', gfgLink: 'https://www.geeksforgeeks.org/problems/stock-span-problem-1587115621/1' },
          { name: 'Expression Handling', gfgLink: 'https://www.geeksforgeeks.org/problems/expression-handling/1' },
          { name: 'Evaluate Reverse Polish Notation', gfgLink: 'https://www.geeksforgeeks.org/problems/evaluate-reverse-polish-notation/1' }
        ]
      },
      {
        id: 'histogram-pattern', title: 'Histogram Pattern', difficulty: 'hard',
        patternGuide: {
          complexity: { time: 'O(n)', space: 'O(n)' },
          clues: [
            'Largest rectangle in histogram',
            'Trapping rain water between bars',
            'Max area of rectangle in a binary matrix',
          ],
          antiClues: [
            'Need K-th area → Heap instead',
            'Pairs/sums across arrays → Two Pointers',
          ],
          examples: [
            {
              problem: 'Largest Rectangle in Histogram',
              clue: '\'for each bar find left/right smaller boundary\' = Monotonic Increasing Stack',
              why: 'Pop when smaller bar found → popped bar\'s width = right boundary - left boundary - 1. Area = h × width.',
              trap: 'Not Two Pointers — boundaries aren\'t symmetric; each bar has its own left/right bounds',
            },
            {
              problem: 'Trapping Rain Water',
              clue: '\'water above bar = min(leftMax, rightMax) - height\' → Mono Stack or Two Pointers',
              why: 'Mono Stack: pop when current > top; water trapped = (min heights) × width gap.',
              trap: 'Brute force O(n²) works but Mono Stack gives O(n)',
            },
          ],
          brainSays: 'For each element, find the nearest smaller on both sides. That defines its boundary. Use an increasing monotonic stack.',
        },
        children: [
          { name: 'Largest rectangle', gfgLink: 'https://www.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1' },
          { name: 'Trapping rain water', gfgLink: 'https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1' },
          { name: 'Max area in histogram', gfgLink: 'https://www.geeksforgeeks.org/problems/maximum-rectangular-area-in-a-histogram-1587115620/1' }
        ]
      },
      {
        id: 'stack-standard', title: 'Standard Stack', difficulty: 'medium',
        children: [
          { name: 'Valid Parentheses', gfgLink: 'https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1' },
          { name: 'Implement Queue using Stack', gfgLink: 'https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1' },
          { name: 'Asteroid Collision', gfgLink: 'https://www.geeksforgeeks.org/problems/asteroid-collision/1' }
        ]
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
        children: [
          { name: 'Level-wise processing', gfgLink: 'https://www.geeksforgeeks.org/problems/level-order-traversal/1' },
          { name: 'Circular Queue Pattern', gfgLink: 'https://www.geeksforgeeks.org/problems/circular-queue-pattern/1' },
          { name: 'Task scheduling', gfgLink: 'https://www.geeksforgeeks.org/problems/task-scheduler/1' },
          { name: 'Implement Stack using Queue', gfgLink: 'https://www.geeksforgeeks.org/problems/stack-using-two-queues/1' },
          { name: 'Rotten Oranges', gfgLink: 'https://www.geeksforgeeks.org/problems/rotten-oranges2536/1' },
          { name: 'First negative in every window of size K', gfgLink: 'https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1' }
        ]
      },
      {
        id: 'deque-based', title: 'Deque Based', difficulty: 'hard',
        children: [
          { name: 'Sliding window max (Deque)', gfgLink: 'https://www.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1' },
          { name: 'Monotonic Queue', gfgLink: 'https://www.geeksforgeeks.org/problems/monotonic-queue/1' },
          { name: 'Priority Queue patterns', gfgLink: 'https://www.geeksforgeeks.org/problems/priority-queue-patterns/1' },
          { name: 'LRU Cache', gfgLink: 'https://www.geeksforgeeks.org/problems/lru-cache/1' }
        ]
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
        children: [
          { name: 'Fast – Slow', gfgLink: 'https://www.geeksforgeeks.org/problems/fast-slow/1' },
          { name: 'Cycle Detection', gfgLink: 'https://www.geeksforgeeks.org/problems/detect-loop-in-linked-list/1' },
          { name: 'Finding Middle', gfgLink: 'https://www.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1' },
          { name: 'Remove Nth Node from End', gfgLink: 'https://www.geeksforgeeks.org/problems/nth-node-from-end-of-linked-list/1' },
          { name: 'Palindrome Linked List', gfgLink: 'https://www.geeksforgeeks.org/problems/check-if-linked-list-is-pallindrome/1' },
          { name: 'Intersection of Two Lists', gfgLink: 'https://www.geeksforgeeks.org/problems/intersection-of-two-linked-list/1' }
        ]
      },
      {
        id: 'reversal', title: 'Reversal', difficulty: 'medium',
        children: [
          { name: 'Full Reverse', gfgLink: 'https://www.geeksforgeeks.org/problems/reverse-a-linked-list/1' },
          { name: 'Partial (k-group)', gfgLink: 'https://www.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1' },
          { name: 'Merge Lists', gfgLink: 'https://www.geeksforgeeks.org/problems/merge-two-sorted-linked-lists/1' },
          { name: 'Rotate List', gfgLink: 'https://www.geeksforgeeks.org/problems/rotate-a-linked-list/1' }
        ]
      },
      {
        id: 'advanced-ll', title: 'Advanced', difficulty: 'hard',
        children: [
          { name: 'Flatten / Sort list', gfgLink: 'https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1' },
          { name: 'Add two numbers', gfgLink: 'https://www.geeksforgeeks.org/problems/add-two-numbers-represented-by-linked-lists/1' },
          { name: 'LRU Cache (List + Map)', gfgLink: 'https://www.geeksforgeeks.org/problems/lru-cache/1' },
          { name: 'Copy List with Random Pointer', gfgLink: 'https://www.geeksforgeeks.org/problems/clone-a-linked-list-with-next-and-random-pointer/1' },
          { name: 'Remove Duplicates from Sorted List', gfgLink: 'https://www.geeksforgeeks.org/problems/remove-duplicate-element-from-sorted-linked-list/1' },
          { name: 'Odd Even Linked List', gfgLink: 'https://www.geeksforgeeks.org/problems/rearrange-a-linked-list/1' }
        ]
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
        children: [
          { name: 'DFS – Pre / In / Post order', gfgLink: 'https://www.geeksforgeeks.org/problems/preorder-traversal/1' },
          { name: 'BFS – Level / Zigzag / Right side view', gfgLink: 'https://www.geeksforgeeks.org/problems/level-order-traversal/1' },
          { name: 'Boundary Traversal', gfgLink: 'https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1' },
          { name: 'Vertical Order Traversal', gfgLink: 'https://www.geeksforgeeks.org/problems/print-a-binary-tree-in-vertical-order/1' },
          { name: 'Morris Traversal', gfgLink: 'https://www.geeksforgeeks.org/problems/inorder-traversal/1' }
        ]
      },
      {
        id: 'recursion-patterns', title: 'Recursion Patterns', difficulty: 'medium',
        children: [
          { name: 'Top Down approach', gfgLink: 'https://www.geeksforgeeks.org/problems/top-down-approach/1' },
          { name: 'Bottom Up approach', gfgLink: 'https://www.geeksforgeeks.org/problems/bottom-up-approach/1' },
          { name: 'Balanced Binary Tree', gfgLink: 'https://www.geeksforgeeks.org/problems/check-for-balanced-tree/1' },
          { name: 'Identical Trees', gfgLink: 'https://www.geeksforgeeks.org/problems/determine-if-two-trees-are-identical/1' },
          { name: 'Sum of Left Leaves', gfgLink: 'https://www.geeksforgeeks.org/problems/sum-of-left-leaves/1' }
        ]
      },
      {
        id: 'path-based', title: 'Path Based', difficulty: 'medium',
        children: [
          { name: 'Max path sum', gfgLink: 'https://www.geeksforgeeks.org/problems/maximum-path-sum-from-any-node/1' },
          { name: 'Diameter / Height / Depth', gfgLink: 'https://www.geeksforgeeks.org/problems/diameter-of-binary-tree/1' },
          { name: 'Root to leaf paths', gfgLink: 'https://www.geeksforgeeks.org/problems/root-to-leaf-paths/1' }
        ]
      },
      {
        id: 'bst', title: 'BST (Binary Search Tree)', difficulty: 'medium',
        children: [
          { name: 'AVL / Red-Black tree concepts', gfgLink: 'https://www.geeksforgeeks.org/problems/avl-tree-insertion/1' },
          { name: 'Lowest Common Ancestor', gfgLink: 'https://www.geeksforgeeks.org/problems/lowest-common-ancestor-in-a-bst/1' },
          { name: 'Serialize / Deserialize', gfgLink: 'https://www.geeksforgeeks.org/problems/serialize-and-deserialize-a-binary-tree/1' },
          { name: 'N-ary Tree', gfgLink: 'https://www.geeksforgeeks.org/problems/n-ary-tree/1' },
          { name: 'Convert Sorted Array to BST', gfgLink: 'https://www.geeksforgeeks.org/problems/array-to-bst4443/1' },
          { name: 'Kth Smallest in BST', gfgLink: 'https://www.geeksforgeeks.org/problems/find-k-th-smallest-element-in-bst/1' },
          { name: 'Flatten Binary Tree to Linked List', gfgLink: 'https://www.geeksforgeeks.org/problems/flatten-binary-tree-to-linked-list/1' }
        ]
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
        patternGuide: {
          complexity: { time: 'O(2ⁿ) or O(n!)', space: 'O(n) stack depth' },
          clues: [
            'Generate ALL combinations / permutations / subsets',
            'Find ANY solution satisfying constraints',
            'Keywords: generate, enumerate, all possible, N-Queens, Sudoku',
            'Word search in a grid',
            'Partition into groups satisfying conditions',
            'Phone number letter combinations',
          ],
          antiClues: [
            'Count ways (not list them) → DP is faster O(n²) vs O(2ⁿ)',
            'Find optimal (min/max) → DP not Backtracking',
            'No need to explore all options → Greedy',
          ],
          examples: [
            {
              problem: 'All subsets of a set (power set)',
              clue: '\'all subsets\' = 2^n choices: include or exclude each element',
              why: 'At each index: add to current subset (recurse), then remove it (backtrack).',
              trap: 'Not DP — we need actual subsets listed, not just their count',
            },
            {
              problem: 'Generate all well-formed parentheses for n pairs',
              clue: '\'generate ALL combinations\' → recurse with open/close counts',
              why: 'Add \'(\' if open < n, add \')\' if close < open. Base case: both = n.',
              trap: 'Not DP — we list solutions, not count them. Not Greedy — can\'t pick one option greedily.',
            },
            {
              problem: 'Combination Sum — find all combos summing to target',
              clue: '\'find all combinations\' + \'sum to target\' = backtracking with pruning',
              why: 'Try each candidate, recurse with remaining target, backtrack when overshot.',
              trap: 'Not DP — we need to LIST combos; DP only counts them',
            },
          ],
          brainSays: 'Try it. Go deep. Hit a dead end? UNDO and try next option. Build the solution incrementally.',
        },
        children: [
          { name: 'Decision Tree', gfgLink: 'https://www.geeksforgeeks.org/problems/decision-tree/1' },
          { name: 'Choose – Explore – Unchoose', gfgLink: 'https://www.geeksforgeeks.org/problems/choose-explore-unchoose/1' },
          { name: 'Subsets (power set)', gfgLink: 'https://www.geeksforgeeks.org/problems/subsets-1613027340/1' },
          { name: 'Permutations / Combinations', gfgLink: 'https://www.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1' },
          { name: 'Word search on grid', gfgLink: 'https://www.geeksforgeeks.org/problems/word-search/1' },
          { name: 'Palindrome partitioning', gfgLink: 'https://www.geeksforgeeks.org/problems/palindromic-patitioning4845/1' },
          { name: 'Letter Combinations of Phone Number', gfgLink: 'https://www.geeksforgeeks.org/problems/possible-words-from-phone-digits-1587115620/1' },
          { name: 'Generate Parentheses', gfgLink: 'https://www.geeksforgeeks.org/problems/generate-all-possible-parentheses/1' },
          { name: 'Combination Sum I and II', gfgLink: 'https://www.geeksforgeeks.org/problems/combination-sum-1587115620/1' },
          { name: 'Subset Sum', gfgLink: 'https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1' }
        ]
      },
      {
        id: 'classic-bt', title: 'Classic Problems', difficulty: 'hard',
        patternGuide: {
          complexity: { time: 'O(n!) for permutations, O(2ⁿ) for subsets', space: 'O(n)' },
          clues: [
            'Place N items with pairwise constraints on a board',
            'Fill a grid satisfying row/col/box rules',
            'Find paths through a maze avoiding obstacles',
          ],
          antiClues: [
            'Only need to COUNT solutions → DP is faster',
            'Need SHORTEST path → BFS instead',
          ],
          examples: [
            {
              problem: 'N-Queens — place N queens, no two attack each other',
              clue: '\'place N pieces with constraints\' = row-by-row backtracking',
              why: 'Try each column in a row. If safe (no conflict), place queen and recurse to next row.',
              trap: 'Not DP — no overlapping subproblems in queen placement; state space is too large',
            },
            {
              problem: 'Sudoku Solver',
              clue: '\'fill grid satisfying constraints\' = try digit 1-9 in each empty cell, backtrack on violation',
              why: 'For each empty cell, try digits 1-9. If valid, recurse. Undo on failure.',
              trap: 'Not Greedy — can\'t pick one digit definitively per cell without exploring future',
            },
          ],
          brainSays: 'Try it. Go deep. Hit dead end? Undo and try next option.',
        },
        children: [
          { name: 'N-Queens', gfgLink: 'https://www.geeksforgeeks.org/problems/n-queen-problem0315/1' },
          { name: 'Sudoku solver', gfgLink: 'https://www.geeksforgeeks.org/problems/solve-the-sudoku-1587115621/1' },
          { name: 'Rat in a maze', gfgLink: 'https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1' }
        ]
      },
      {
        id: 'pruning', title: 'Pruning / State Tracking', difficulty: 'hard',
        children: [
          { name: 'Constraint pruning', gfgLink: 'https://www.geeksforgeeks.org/problems/constraint-pruning/1' },
          { name: 'Visited set', gfgLink: 'https://www.geeksforgeeks.org/problems/visited-set/1' },
          { name: 'Bounding functions', gfgLink: 'https://www.geeksforgeeks.org/problems/bounding-functions/1' }
        ]
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
        children: [
          { name: 'Merge sort pattern', gfgLink: 'https://www.geeksforgeeks.org/problems/merge-sort/1' },
          { name: 'Quick select (k-th largest)', gfgLink: 'https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1' },
          { name: 'Count inversions', gfgLink: 'https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1' },
          { name: 'Closest pair of points', gfgLink: 'https://www.geeksforgeeks.org/problems/closest-pair-of-points/1' },
          { name: 'Strassen matrix multiplication', gfgLink: 'https://www.geeksforgeeks.org/problems/strassen-matrix-multiplication/1' }
        ]
      },
      {
        id: 'core-recursion', title: 'Core Recursion', difficulty: 'easy',
        children: [
          { name: 'Base case design', gfgLink: 'https://www.geeksforgeeks.org/problems/base-case-design/1' },
          { name: 'Head / tail recursion', gfgLink: 'https://www.geeksforgeeks.org/problems/head-tail-recursion/1' },
          { name: 'Tree recursion', gfgLink: 'https://www.geeksforgeeks.org/problems/tree-recursion/1' },
          { name: 'Memoized recursion', gfgLink: 'https://www.geeksforgeeks.org/problems/memoized-recursion/1' },
          { name: 'Tower of Hanoi', gfgLink: 'https://www.geeksforgeeks.org/problems/tower-of-hanoi-1587115621/1' },
          { name: 'Power Set', gfgLink: 'https://www.geeksforgeeks.org/problems/power-set4302/1' },
          { name: 'Sort a Stack', gfgLink: 'https://www.geeksforgeeks.org/problems/sort-a-stack/1' },
          { name: 'Reverse a Stack using Recursion', gfgLink: 'https://www.geeksforgeeks.org/problems/reverse-a-stack/1' },
          { name: 'Fibonacci', gfgLink: 'https://www.geeksforgeeks.org/problems/nth-fibonacci-number1335/1' }
        ]
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
        patternGuide: {
          complexity: { time: 'O(n log k)', space: 'O(k)' },
          clues: [
            'K largest / K smallest / K closest elements',
            'Repeatedly extract minimum or maximum',
            'Always need the NEXT BEST without sorting all',
            'Scheduling: CPU tasks, meeting rooms',
            'Always schedule most frequent task next',
          ],
          antiClues: [
            'Need ALL elements sorted → sort() O(n log n) is simpler',
            'Only one min/max query → single linear scan O(n)',
            'K is very large (≈ N) → full sort may be simpler',
          ],
          examples: [
            {
              problem: 'Find K closest points to origin',
              clue: '\'K closest\' → maintain max-heap of size K by distance',
              why: 'Push all points. When heap size > K, pop the farthest. Heap top = farthest of K closest.',
              trap: 'Don\'t sort all — O(n log n); max-heap of size K is O(n log k)',
            },
            {
              problem: 'Find Kth Largest Element in unsorted array',
              clue: '\'Kth largest\' → min-heap of size K. Top = Kth largest after full scan.',
              why: 'Push element. If heap size > K, pop min. After scan, heap top = Kth largest.',
              trap: 'Not full sort (O(n log n) vs O(n log k)). QuickSelect O(n) avg also works.',
            },
            {
              problem: 'Task Scheduler — min time with n-cooldown between same tasks',
              clue: '\'always schedule most frequent task next\' = max-heap + cooldown queue',
              why: 'Always pick most frequent available task. Use queue for cooldown tracking.',
              trap: 'Not Greedy alone — need heap to always find max-freq task efficiently',
            },
          ],
          brainSays: 'I need the best element again and again. Don\'t sort fully. Use a heap — O(log n) per operation.',
        },
        children: [
          { name: 'Top K / Kth Element / k closest', gfgLink: 'https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1' },
          { name: 'Task Scheduler', gfgLink: 'https://www.geeksforgeeks.org/problems/task-scheduler/1' },
          { name: 'Meeting Rooms', gfgLink: 'https://www.geeksforgeeks.org/problems/attend-all-meetings/1' },
          { name: 'Reorganize String', gfgLink: 'https://www.geeksforgeeks.org/problems/rearrange-characters4649/1' },
          { name: 'Huffman Encoding', gfgLink: 'https://www.geeksforgeeks.org/problems/huffman-encoding3345/1' },
          { name: 'Connect Ropes', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1' },
          { name: 'Minimum Cost to Connect Sticks', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1' }
        ]
      },
      {
        id: 'k-way-merge', title: 'K-way Merge', difficulty: 'hard',
        children: [
          { name: 'Merge K sorted lists', gfgLink: 'https://www.geeksforgeeks.org/problems/merge-k-sorted-linked-lists/1' },
          { name: 'Smallest range covering K lists', gfgLink: 'https://www.geeksforgeeks.org/problems/find-smallest-range-containing-elements-from-k-lists/1' },
          { name: 'Merge K Sorted Arrays', gfgLink: 'https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1' },
          { name: 'Kth Largest Element in Stream', gfgLink: 'https://www.geeksforgeeks.org/problems/kth-largest-element-in-a-stream2220/1' }
        ]
      },
      {
        id: 'two-heaps', title: 'Two Heaps Pattern', difficulty: 'hard',
        patternGuide: {
          complexity: { time: 'O(log n) per insert/query', space: 'O(n)' },
          clues: [
            'Median of a data stream — need median after each insertion',
            'Sliding window median — median changes as window slides',
            'Divide elements into two balanced halves dynamically',
          ],
          antiClues: [
            'Static array median → just sort once',
            'Only one median query → sort + pick middle',
          ],
          examples: [
            {
              problem: 'Find median from a data stream',
              clue: '\'stream\' + \'median at each step\' = max-heap (lower half) + min-heap (upper half)',
              why: 'Max-heap top = largest of lower half. Min-heap top = smallest of upper half. Balance sizes.',
              trap: 'Not sorted array insertion — O(n) per insert vs O(log n) with two heaps',
            },
          ],
          brainSays: 'Two heaps: max-heap for lower half, min-heap for upper half. Median = top of one or average of both tops.',
        },
        children: [
          { name: 'Find median from data stream', gfgLink: 'https://www.geeksforgeeks.org/problems/find-median-in-a-stream-1587115620/1' },
          { name: 'Sliding window median', gfgLink: 'https://www.geeksforgeeks.org/problems/sliding-window-median/1' },
          { name: 'Frequency sort', gfgLink: 'https://www.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency/1' },
          { name: 'Sort K-Sorted Array', gfgLink: 'https://www.geeksforgeeks.org/problems/nearly-sorted-1587115620/1' }
        ]
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
        patternGuide: {
          complexity: { time: 'O(V + E)', space: 'O(V)' },
          clues: [
            'BFS → SHORTEST path / MINIMUM steps in unweighted graph',
            'BFS → level-order traversal, spread from multiple sources simultaneously',
            'BFS → Word Ladder, Rotting Oranges, 01 Matrix',
            'DFS → connected components / islands / regions',
            'DFS → detect cycle, topological sort, all paths',
            'DFS → tree: path sum, max depth, LCA',
          ],
          antiClues: [
            'BFS on weighted graph (different costs) → Dijkstra instead',
            'DFS when shortest path is needed → BFS instead',
            'Groups merging dynamically → Union-Find instead',
          ],
          examples: [
            {
              problem: 'Word Ladder — min transformations from beginWord to endWord',
              clue: '\'minimum transformations\' + \'step count\' = BFS on word graph',
              why: 'Each word = node, differ by 1 char = edge. BFS level = transformation count.',
              trap: 'Not DFS — DFS doesn\'t guarantee shortest. Not Dijkstra — all edges cost 1.',
            },
            {
              problem: 'Rotting Oranges — minimum time for all oranges to rot',
              clue: '\'spread simultaneously from multiple sources\' = Multi-source BFS',
              why: 'Start BFS with ALL rotten oranges in queue. Level = time passed.',
              trap: 'Not single-source BFS — multiple rotting oranges spread at the same time',
            },
            {
              problem: 'Number of Islands — count connected land regions',
              clue: '\'connected components\' + \'grid\' = DFS from each unvisited \'1\'',
              why: 'Mark visited cells. Each DFS call explores one full island.',
              trap: 'BFS works too. Not Union-Find — static grid, traverse once.',
            },
            {
              problem: 'Course Schedule — detect if circular dependency exists',
              clue: '\'directed graph\' + \'cycle detection\' = DFS with 3-color states',
              why: 'WHITE=unvisited, GRAY=in-stack, BLACK=done. Back edge to GRAY = cycle.',
              trap: 'Not Union-Find — directed graphs need DFS states, not DSU',
            },
          ],
          brainSays: 'BFS = queue, level-by-level, shortest in unweighted graph. DFS = stack/recursion, go deep, components & cycles.',
        },
        children: [
          { name: 'BFS', gfgLink: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1' },
          { name: 'DFS', gfgLink: 'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1' },
          { name: 'Multi-source BFS', gfgLink: 'https://www.geeksforgeeks.org/problems/multi-source-bfs/1' },
          { name: 'Number of Islands', gfgLink: 'https://www.geeksforgeeks.org/problems/find-the-number-of-islands/1' },
          { name: 'Word Ladder', gfgLink: 'https://www.geeksforgeeks.org/problems/word-ladder/1' },
          { name: 'Alien Dictionary', gfgLink: 'https://www.geeksforgeeks.org/problems/alien-dictionary/1' },
          { name: 'Clone Graph', gfgLink: 'https://www.geeksforgeeks.org/problems/clone-graph/1' },
          { name: 'Flood Fill', gfgLink: 'https://www.geeksforgeeks.org/problems/flood-fill-algorithm1856/1' },
          { name: 'Surrounded Regions', gfgLink: 'https://www.geeksforgeeks.org/problems/replace-os-with-xs0052/1' }
        ]
      },
      {
        id: 'cycle-detection', title: 'Cycle Detection', difficulty: 'medium',
        children: [
          { name: 'Directed', gfgLink: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1' },
          { name: 'Undirected', gfgLink: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1' },
          { name: 'Coloring method', gfgLink: 'https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1' },
          { name: 'Detect Cycle in Directed/Undirected Graph', gfgLink: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1' }
        ]
      },
      {
        id: 'topological-sort', title: 'Topological Sort', difficulty: 'medium',
        children: [
          { name: "Kahn's algorithm (BFS in-degree)", gfgLink: 'https://www.geeksforgeeks.org/problems/topological-sort/1' },
          { name: 'DFS-based topo sort', gfgLink: 'https://www.geeksforgeeks.org/problems/topological-sort/1' },
          { name: 'Course schedule', gfgLink: 'https://www.geeksforgeeks.org/problems/course-schedule/1' }
        ]
      },
      {
        id: 'shortest-path', title: 'Shortest Path', difficulty: 'hard',
        children: [
          { name: 'Dijkstra', gfgLink: 'https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1' },
          { name: 'Bellman-Ford', gfgLink: 'https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1' },
          { name: 'Floyd-Warshall (all pairs)', gfgLink: 'https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1' },
          { name: 'A* search', gfgLink: 'https://www.geeksforgeeks.org/problems/a-star-search/1' },
          { name: 'SPFA', gfgLink: 'https://www.geeksforgeeks.org/problems/spfa/1' }
        ]
      },
      {
        id: 'spanning-tree', title: 'Spanning Tree', difficulty: 'hard',
        children: [
          { name: 'Kruskal', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1' },
          { name: "Prim's", gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1' }
        ]
      },
      {
        id: 'union-find', title: 'Union-Find (DSU)', difficulty: 'medium',
        patternGuide: {
          complexity: { time: 'O(α(n)) ≈ O(1) per operation', space: 'O(n)' },
          clues: [
            'Dynamic connectivity — groups merging over time',
            'Detect cycle in UNDIRECTED graph (edges arrive one by one)',
            'Number of connected components (especially online queries)',
            'Kruskal\'s Minimum Spanning Tree',
            'Are two nodes in the same group?',
            'Accounts / emails belonging to the same person',
          ],
          antiClues: [
            'Static graph, traverse once → BFS/DFS is simpler',
            'DIRECTED graph cycle → DFS with visited states instead',
            'Need actual path between nodes → BFS/DFS',
          ],
          examples: [
            {
              problem: 'Redundant Connection — find extra edge forming a cycle',
              clue: '\'edges arriving one by one\' + \'detect cycle\' = Union-Find',
              why: 'Add edges one by one. When both endpoints already in same component → cycle found.',
              trap: 'Not DFS on final graph — we need the LAST edge that creates the cycle',
            },
            {
              problem: 'Accounts Merge — same email = same person',
              clue: '\'merge accounts sharing emails\' + \'group by identity\' = DSU',
              why: 'Union accounts that share any email. Find all emails per root after all unions.',
              trap: 'Not BFS/DFS alone — DSU more elegant for online merging of identity groups',
            },
            {
              problem: 'Number of Provinces (friend circles)',
              clue: '\'merge directly connected people, count groups\' = DSU',
              why: 'Union all direct connections. Count distinct roots at end = number of provinces.',
              trap: 'BFS/DFS works for static graph but DSU is O(α(n)) per query for dynamic additions',
            },
          ],
          brainSays: 'Groups merging? Check connectivity online? Union-Find with path compression + union by rank.',
        },
        children: [
          { name: 'Detect cycle in undirected', gfgLink: 'https://www.geeksforgeeks.org/problems/detect-cycle-using-dsu/1' },
          { name: 'Connected components', gfgLink: 'https://www.geeksforgeeks.org/problems/connected-components-in-an-undirected-graph/1' },
          { name: 'Path compression', gfgLink: 'https://www.geeksforgeeks.org/problems/path-compression/1' },
          { name: 'Number of Provinces', gfgLink: 'https://www.geeksforgeeks.org/problems/number-of-provinces/1' }
        ]
      },
      {
        id: 'advanced-graphs', title: 'Advanced', difficulty: 'hard',
        children: [
          { name: 'Bipartite / 0-1 BFS', gfgLink: 'https://www.geeksforgeeks.org/problems/bipartite-graph/1' },
          { name: 'Bridges & Articulation points', gfgLink: 'https://www.geeksforgeeks.org/problems/articulation-point-1/1' },
          { name: 'SCC (Strongly Connected Components)', gfgLink: 'https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1' },
          { name: 'Eulerian path / circuit', gfgLink: 'https://www.geeksforgeeks.org/problems/euler-circuit-and-path/1' },
          { name: 'Network flow (max flow)', gfgLink: 'https://www.geeksforgeeks.org/problems/find-the-maximum-flow2126/1' }
        ]
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
        patternGuide: {
          complexity: { time: 'O(m) per query (m = word length)', space: 'O(n·m)' },
          clues: [
            'Prefix matching / autocomplete / starts-with query',
            'Search many words efficiently in large dataset',
            'Word search in a board (combine with DFS)',
            'Replace words with their shortest root',
            'Count words with given prefix',
          ],
          antiClues: [
            'Only a few words, simple search → HashMap is fine',
            'No prefix requirement → HashSet lookup is simpler',
          ],
          examples: [
            {
              problem: 'Implement Trie with insert / search / startsWith',
              clue: '\'prefix search\' + \'multiple words\' = classic Trie — each node = one character',
              why: 'Insert char by char. Search traverses nodes. startsWith stops at prefix end.',
              trap: 'Not HashMap — HashMap can\'t do prefix queries efficiently',
            },
            {
              problem: 'Word Search II — find all words in 2D board',
              clue: '\'find ALL words from list in board\' → Trie + DFS on board',
              why: 'Build Trie of word list. DFS on each cell navigating Trie simultaneously.',
              trap: 'Not separate DFS per word — that\'s O(words × cells) which TLEs. Trie shares prefix traversal.',
            },
          ],
          brainSays: 'Prefix? Multiple words? Build a Trie. O(m) per query regardless of dictionary size.',
        },
        children: [
          { name: 'Insert / Search', gfgLink: 'https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1' },
          { name: 'Prefix Match', gfgLink: 'https://www.geeksforgeeks.org/problems/trie-insert-and-search0651/1' },
          { name: 'Auto-complete', gfgLink: 'https://www.geeksforgeeks.org/problems/auto-complete/1' },
          { name: 'Word dictionary', gfgLink: 'https://www.geeksforgeeks.org/problems/word-dictionary/1' },
          { name: 'Longest Common Prefix using Trie', gfgLink: 'https://www.geeksforgeeks.org/problems/longest-common-prefix-in-an-array5129/1' },
          { name: 'Word Break', gfgLink: 'https://www.geeksforgeeks.org/problems/word-break1352/1' },
          { name: 'Count Distinct Substrings', gfgLink: 'https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1' },
          { name: 'Implement Phone Directory', gfgLink: 'https://www.geeksforgeeks.org/problems/phone-directory4628/1' }
        ]
      },
      {
        id: 'bitwise-trie', title: 'Bitwise Trie', difficulty: 'hard',
        patternGuide: {
          complexity: { time: 'O(32·n) = O(n)', space: 'O(32·n)' },
          clues: [
            'Find pair with maximum XOR in an array',
            'Problems involving XOR on bit-by-bit decisions',
            'Greedy bit-by-bit complement search',
          ],
          antiClues: [
            'Simple XOR cancellation → just XOR all elements',
            'String prefix search → use regular character Trie',
          ],
          examples: [
            {
              problem: 'Maximum XOR of two numbers in an array',
              clue: '\'maximum XOR\' = binary Trie (0/1 per bit), greedy complement search',
              why: 'For each number, traverse Trie greedily choosing the opposite bit to maximize XOR.',
              trap: 'Not brute force O(n²). Trie gives O(32n) = O(n)',
            },
          ],
          brainSays: 'Binary Trie: each bit is a node (0 or 1). For max XOR, greedily pick the opposite bit at each level.',
        },
        children: [
          { name: 'Max XOR pair in array', gfgLink: 'https://www.geeksforgeeks.org/problems/maximum-xor-of-two-numbers-in-an-array/1' },
          { name: 'Compressed Trie (Patricia)', gfgLink: 'https://www.geeksforgeeks.org/problems/compressed-trie/1' }
        ]
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
        patternGuide: {
          complexity: { time: 'O(n²) or O(n·k)', space: 'O(n) to O(n²)' },
          clues: [
            'Count the number of ways to do X',
            'Minimum / maximum cost / profit / length',
            'Can you achieve X? (decision DP)',
            'Choices at each step affect future steps',
            'Recursion tree has REPEATED subproblems',
            'Optimal substructure: optimal answer uses optimal sub-answers',
            'Keywords: knapsack, partition, longest subsequence, edit distance',
          ],
          antiClues: [
            'Only one path through data → just simulate',
            'Greedy works (local = global) → use Greedy instead',
            'Need to LIST all solutions → use Backtracking',
            'No overlapping subproblems → Divide and Conquer',
          ],
          examples: [
            {
              problem: 'Coin Change — minimum coins to make amount',
              clue: '\'minimum\' + \'unlimited use items\' + \'make target\' = unbounded knapsack DP',
              why: 'dp[i] = min(dp[i], dp[i-coin]+1). Subproblems repeat: dp[5] uses dp[2], dp[3] etc.',
              trap: 'Not Greedy — fails for coins [1,3,4] with target 6 → greedy picks 4,1,1=3 coins vs 3,3=2 coins',
            },
            {
              problem: 'Climbing Stairs — how many ways to reach step n',
              clue: '\'count ways\' + \'choices (1 or 2 steps) at each stair\' = 1D DP (Fibonacci pattern)',
              why: 'dp[i] = dp[i-1] + dp[i-2]. Each step can be reached from one below or two below.',
              trap: 'Not Backtracking — we need COUNT, not listing all paths',
            },
            {
              problem: 'Minimum Path Sum in grid — move right or down only',
              clue: '\'minimum path\' + \'grid\' + \'restricted movement\' = 2D DP grid',
              why: 'dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]',
              trap: 'Not BFS — BFS counts hops; DP accumulates weighted cost',
            },
          ],
          brainSays: 'I\'m solving the same sub-problem repeatedly. Cache it in a table. Build bottom-up or memoize top-down.',
        },
        children: [
          { name: '1D DP', gfgLink: 'https://www.geeksforgeeks.org/problems/1d-dp/1' },
          { name: '2D DP', gfgLink: 'https://www.geeksforgeeks.org/problems/2d-dp/1' },
          { name: 'House Robber', gfgLink: 'https://www.geeksforgeeks.org/problems/stickler-theif-1587115621/1' },
          { name: 'Coin Change', gfgLink: 'https://www.geeksforgeeks.org/problems/coin-change2448/1' },
          { name: 'Climbing Stairs', gfgLink: 'https://www.geeksforgeeks.org/problems/count-ways-to-reach-the-nth-stair-1587115620/1' },
          { name: 'Unique Paths', gfgLink: 'https://www.geeksforgeeks.org/problems/number-of-unique-paths5339/1' },
          { name: 'Minimum Path Sum', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-cost-path3833/1' },
          { name: 'Decode Ways', gfgLink: 'https://www.geeksforgeeks.org/problems/total-decoding-messages1235/1' },
          { name: 'Rod Cutting', gfgLink: 'https://www.geeksforgeeks.org/problems/rod-cutting0840/1' }
        ]
      },
      {
        id: 'dp-transition', title: 'Transition Type', difficulty: 'medium',
        children: [
          { name: 'Linear DP', gfgLink: 'https://www.geeksforgeeks.org/problems/linear-dp/1' },
          { name: 'Grid DP', gfgLink: 'https://www.geeksforgeeks.org/problems/grid-dp/1' },
          { name: 'Decision DP', gfgLink: 'https://www.geeksforgeeks.org/problems/decision-dp/1' },
          { name: 'Interval DP', gfgLink: 'https://www.geeksforgeeks.org/problems/interval-dp/1' }
        ]
      },
      {
        id: 'dp-patterns', title: 'Pattern Types', difficulty: 'hard',
        children: [
          { name: 'Knapsack (0/1, Unbounded, Fractional)', gfgLink: 'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1' },
          { name: 'Sequence DP (LIS, LCS, Edit Distance)', gfgLink: 'https://www.geeksforgeeks.org/problems/longest-increasing-subsequence-1587115620/1' },
          { name: 'Partition DP', gfgLink: 'https://www.geeksforgeeks.org/problems/partition-problem-1587115620/1' },
          { name: 'String DP', gfgLink: 'https://www.geeksforgeeks.org/problems/string-dp/1' },
          { name: 'Buy & Sell Stocks', gfgLink: 'https://www.geeksforgeeks.org/problems/buy-and-sell-a-share-at-most-twice/1' },
          { name: 'Matrix chain multiplication', gfgLink: 'https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1' },
          { name: 'Longest Palindromic Subsequence', gfgLink: 'https://www.geeksforgeeks.org/problems/longest-palindromic-subsequence-1612327878/1' },
          { name: 'Word Break', gfgLink: 'https://www.geeksforgeeks.org/problems/word-break1352/1' },
          { name: 'Palindrome Partitioning', gfgLink: 'https://www.geeksforgeeks.org/problems/palindromic-patitioning4845/1' },
          { name: 'Egg Dropping', gfgLink: 'https://www.geeksforgeeks.org/problems/egg-dropping-puzzle-1587115620/1' },
          { name: 'Wildcard Matching', gfgLink: 'https://www.geeksforgeeks.org/problems/wildcard-pattern-matching/1' },
          { name: 'Longest Common Substring', gfgLink: 'https://www.geeksforgeeks.org/problems/longest-common-substring1452/1' }
        ]
      },
      {
        id: 'dp-advanced', title: 'Advanced', difficulty: 'hard',
        children: [
          { name: 'Bitmask DP', gfgLink: 'https://www.geeksforgeeks.org/problems/bitmask-dp/1' },
          { name: 'Digit DP', gfgLink: 'https://www.geeksforgeeks.org/problems/digit-dp/1' },
          { name: 'DP on Trees', gfgLink: 'https://www.geeksforgeeks.org/problems/dp-on-trees/1' },
          { name: 'DP on Graphs', gfgLink: 'https://www.geeksforgeeks.org/problems/dp-on-graphs/1' },
          { name: 'Broken profile DP', gfgLink: 'https://www.geeksforgeeks.org/problems/broken-profile-dp/1' }
        ]
      },
      {
        id: 'dp-optimization', title: 'Optimization', difficulty: 'medium',
        children: [
          { name: 'Memoization', gfgLink: 'https://www.geeksforgeeks.org/problems/memoization/1' },
          { name: 'Tabulation', gfgLink: 'https://www.geeksforgeeks.org/problems/tabulation/1' },
          { name: 'Space optimization', gfgLink: 'https://www.geeksforgeeks.org/problems/space-optimization/1' },
          { name: 'Convex hull trick', gfgLink: 'https://www.geeksforgeeks.org/problems/convex-hull-trick/1' }
        ]
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
        patternGuide: {
          complexity: { time: 'O(n log n) sort + O(n)', space: 'O(1) or O(n)' },
          clues: [
            'Merge overlapping intervals',
            'Insert a new interval into sorted list',
            'Count minimum meeting rooms / platforms needed',
            'Find employee free time',
            'Remove minimum intervals to make rest non-overlapping',
            'Car pooling / capacity check over a timeline',
            'Maximum non-overlapping activities/meetings',
          ],
          antiClues: [
            'Intervals are already non-overlapping → just process in order',
            'Single interval query → simple comparison',
            'Need count of ways to schedule → DP instead',
          ],
          examples: [
            {
              problem: 'Activity Selection — maximum non-overlapping meetings',
              clue: '\'max non-overlapping\' + \'intervals\' → sort by END time, pick greedily',
              why: 'Earliest finish leaves max room for future activities. This is provably optimal.',
              trap: 'Not DP — DP works too but O(n²) vs Greedy O(n log n)',
            },
            {
              problem: 'Merge Intervals — collapse overlapping ranges',
              clue: '\'merge overlapping intervals\' → sort by start, merge if next.start ≤ current.end',
              why: 'After sorting, only need to check adjacent intervals. Merge by extending end.',
              trap: 'Don\'t forget to sort by START time first — merging only works on sorted input',
            },
            {
              problem: 'Meeting Rooms II — minimum conference rooms needed',
              clue: '\'minimum rooms\' + \'concurrent meetings\' = sort by start, min-heap of end times',
              why: 'Heap top = earliest ending meeting. If new meeting starts before it ends → new room.',
              trap: 'Not simple merge — we COUNT simultaneous overlaps, not collapse them',
            },
            {
              problem: 'Minimum arrows to burst all balloons',
              clue: '\'minimum arrows\' + \'overlapping ranges\' → sort by END, one arrow per non-overlap group',
              why: 'Sort by right end. Arrow at balloon.end bursts all overlapping ones.',
              trap: 'Not Interval Merge — we count arrows, not merge intervals',
            },
          ],
          brainSays: 'Sort by start time first. Then decide: merge if next.start ≤ current.end, else start new group.',
        },
        children: [
          { name: 'Activity Selection', gfgLink: 'https://www.geeksforgeeks.org/problems/activity-selection-1587115620/1' },
          { name: 'Non-overlapping Intervals', gfgLink: 'https://www.geeksforgeeks.org/problems/non-overlapping-intervals/1' },
          { name: 'Minimum Removals', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-removals/1' }
        ]
      },
      {
        id: 'scheduling-greedy', title: 'Scheduling Greedy', difficulty: 'medium',
        children: [
          { name: 'Deadline Based Scheduling', gfgLink: 'https://www.geeksforgeeks.org/problems/deadline-based-scheduling/1' },
          { name: 'Profit Based Selection', gfgLink: 'https://www.geeksforgeeks.org/problems/profit-based-selection/1' },
          { name: 'Resource Allocation', gfgLink: 'https://www.geeksforgeeks.org/problems/resource-allocation/1' },
          { name: 'Minimum Platforms / Rooms', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1' },
          { name: 'Meeting Rooms', gfgLink: 'https://www.geeksforgeeks.org/problems/attend-all-meetings/1' },
          { name: 'Job Sequencing Problem', gfgLink: 'https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1' },
          { name: 'N meetings in one room', gfgLink: 'https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1' },
          { name: 'Minimum number of platforms', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1' }
        ]
      },
      {
        id: 'jump-game', title: 'Jump Game Pattern', difficulty: 'medium',
        children: [
          { name: 'Jump Game I', gfgLink: 'https://www.geeksforgeeks.org/problems/jump-game/1' },
          { name: 'Jump Game II', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1' },
          { name: 'Min jumps', gfgLink: 'https://www.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1' },
          { name: 'Assign Cookies', gfgLink: 'https://www.geeksforgeeks.org/problems/assign-cookies/1' }
        ]
      },
      {
        id: 'other-greedy', title: 'Other Greedy', difficulty: 'hard',
        children: [
          { name: 'Huffman / Merge Cost', gfgLink: 'https://www.geeksforgeeks.org/problems/huffman-encoding3345/1' },
          { name: 'Gas station / Circular greedy', gfgLink: 'https://www.geeksforgeeks.org/problems/circular-tour-1587115620/1' },
          { name: 'Candy / Monotone greedy', gfgLink: 'https://www.geeksforgeeks.org/problems/candy/1' },
          { name: 'Fractional knapsack', gfgLink: 'https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1' },
          { name: 'Minimum Number of Coins', gfgLink: 'https://www.geeksforgeeks.org/problems/number-of-coins1824/1' }
        ]
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
        patternGuide: {
          complexity: { time: 'O(1) to O(n)', space: 'O(1)' },
          clues: [
            'Find the SINGLE non-duplicate in array of pairs (XOR)',
            'Find MISSING number in range 1..N',
            'Count number of 1-bits (Hamming weight)',
            'Check / enumerate all SUBSETS of a set (bitmask)',
            'Detect if number is power of 2',
            'Swap without temp, toggle flags',
            'Maximum XOR pair in array',
          ],
          antiClues: [
            'Problem has nothing to do with binary structure → don\'t force bits',
            'Need to LIST subsets → Backtracking is clearer',
          ],
          examples: [
            {
              problem: 'Single Number — one element appears once, rest appear twice',
              clue: '\'appears twice except one\' → XOR all elements',
              why: 'a XOR a = 0. All pairs cancel out. The single number survives.',
              trap: 'Not HashMap — O(n) space not needed; XOR gives O(1) space, O(n) time',
            },
            {
              problem: 'Missing Number in range 0..N',
              clue: '\'missing one number in range\' → XOR 0..N with all array elements',
              why: 'Every number appears twice except missing one. XOR leaves only missing number.',
              trap: 'Not sorting — O(n log n) vs XOR O(n). Not sum formula — can overflow for large N.',
            },
            {
              problem: 'Count Set Bits (Hamming Weight)',
              clue: '\'count 1-bits\' = n &= (n-1) removes lowest set bit each iteration',
              why: 'n & (n-1) clears the rightmost set bit. Count iterations until n=0.',
              trap: 'Not string conversion — bit trick is O(set bits count), not O(32)',
            },
            {
              problem: 'Power of Two check',
              clue: '\'exactly one bit set\' → n > 0 && (n & (n-1)) == 0',
              why: 'Power of 2 has exactly one 1-bit. n-1 flips all lower bits. AND = 0 if power of 2.',
              trap: 'Not loop counting bits — one line bit trick suffices',
            },
          ],
          brainSays: 'XOR cancels duplicates. AND/OR manipulate bits. Bit shift = multiply/divide by 2. Think in binary.',
        },
        children: [
          { name: 'XOR Pattern', gfgLink: 'https://www.geeksforgeeks.org/problems/xor-pattern/1' },
          { name: 'Bit Masking', gfgLink: 'https://www.geeksforgeeks.org/problems/bit-masking/1' },
          { name: 'AND / OR tricks', gfgLink: 'https://www.geeksforgeeks.org/problems/and-or-tricks/1' },
          { name: 'Left / Right shift', gfgLink: 'https://www.geeksforgeeks.org/problems/left-right-shift/1' },
          { name: 'Single Number', gfgLink: 'https://www.geeksforgeeks.org/problems/single-number1014/1' },
          { name: 'Reverse Bits', gfgLink: 'https://www.geeksforgeeks.org/problems/reverse-bits3556/1' },
          { name: 'Missing Number using XOR', gfgLink: 'https://www.geeksforgeeks.org/problems/missing-number-in-array1416/1' },
          { name: 'Number of 1 Bits', gfgLink: 'https://www.geeksforgeeks.org/problems/set-bits0143/1' },
          { name: 'Divide two integers without operators', gfgLink: 'https://www.geeksforgeeks.org/problems/division-without-using-multiplication-division-and-mod-operator/1' }
        ]
      },
      {
        id: 'bit-usage', title: 'Usage', difficulty: 'medium',
        children: [
          { name: 'Subset via Bits', gfgLink: 'https://www.geeksforgeeks.org/problems/subset-via-bits/1' },
          { name: 'Bit Checks', gfgLink: 'https://www.geeksforgeeks.org/problems/bit-checks/1' },
          { name: 'Prefix XOR', gfgLink: 'https://www.geeksforgeeks.org/problems/prefix-xor/1' },
          { name: 'Count set bits', gfgLink: 'https://www.geeksforgeeks.org/problems/set-bits0143/1' },
          { name: 'Power of 2 check', gfgLink: 'https://www.geeksforgeeks.org/problems/power-of-2-1587115620/1' },
          { name: "Brian Kernighan's algo", gfgLink: 'https://www.geeksforgeeks.org/problems/set-bits0143/1' }
        ]
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
        children: [
          { name: 'Bubble Sort – O(n²)', gfgLink: 'https://www.geeksforgeeks.org/problems/bubble-sort/1' },
          { name: 'Selection Sort – O(n²)', gfgLink: 'https://www.geeksforgeeks.org/problems/selection-sort/1' },
          { name: 'Insertion Sort – O(n²)', gfgLink: 'https://www.geeksforgeeks.org/problems/insertion-sort/1' },
          { name: 'Merge Sort – O(n log n)', gfgLink: 'https://www.geeksforgeeks.org/problems/merge-sort/1' },
          { name: 'Quick Sort – O(n log n) avg', gfgLink: 'https://www.geeksforgeeks.org/problems/quick-sort/1' },
          { name: 'Heap Sort – O(n log n)', gfgLink: 'https://www.geeksforgeeks.org/problems/heap-sort/1' },
          { name: 'Shell Sort', gfgLink: 'https://www.geeksforgeeks.org/problems/shell-sort/1' },
          { name: 'Sort Characters by Frequency', gfgLink: 'https://www.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency-1587115621/1' }
        ]
      },
      {
        id: 'non-comparison', title: 'Non-Comparison Based', difficulty: 'medium',
        children: [
          { name: 'Counting Sort – O(n + k)', gfgLink: 'https://www.geeksforgeeks.org/problems/counting-sort/1' },
          { name: 'Radix Sort – O(nk)', gfgLink: 'https://www.geeksforgeeks.org/problems/radix-sort/1' },
          { name: 'Bucket Sort', gfgLink: 'https://www.geeksforgeeks.org/problems/bucket-sort/1' }
        ]
      },
      {
        id: 'custom-sorting', title: 'Custom / Partial', difficulty: 'medium',
        children: [
          { name: 'Partial sort (nth element)', gfgLink: 'https://www.geeksforgeeks.org/problems/partial-sort/1' },
          { name: 'External sort', gfgLink: 'https://www.geeksforgeeks.org/problems/external-sort/1' },
          { name: 'Stable vs Unstable', gfgLink: 'https://www.geeksforgeeks.org/problems/stable-vs-unstable/1' },
          { name: 'Sort an array of 0s 1s 2s', gfgLink: 'https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1' },
          { name: 'Merge Without Extra Space', gfgLink: 'https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1' },
          { name: 'Kth Smallest Element', gfgLink: 'https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1' }
        ]
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
        children: [
          { name: 'Range Query', gfgLink: 'https://www.geeksforgeeks.org/problems/range-query/1' },
          { name: 'Lazy Propagation', gfgLink: 'https://www.geeksforgeeks.org/problems/lazy-propagation/1' },
          { name: 'Point update', gfgLink: 'https://www.geeksforgeeks.org/problems/point-update/1' },
          { name: 'Range update', gfgLink: 'https://www.geeksforgeeks.org/problems/range-update/1' },
          { name: 'Persistent Segment Tree', gfgLink: 'https://www.geeksforgeeks.org/problems/persistent-segment-tree/1' }
        ]
      },
      {
        id: 'fenwick-tree', title: 'Fenwick Tree (BIT)', difficulty: 'hard',
        children: [
          { name: 'Prefix Query', gfgLink: 'https://www.geeksforgeeks.org/problems/prefix-query/1' },
          { name: 'Point update', gfgLink: 'https://www.geeksforgeeks.org/problems/point-update-bit/1' },
          { name: '2D BIT', gfgLink: 'https://www.geeksforgeeks.org/problems/2d-bit/1' }
        ]
      },
      {
        id: 'other-range', title: 'Other Range Structures', difficulty: 'hard',
        children: [
          { name: 'Sparse Table (RMQ / O(1) query)', gfgLink: 'https://www.geeksforgeeks.org/problems/sparse-table/1' },
          { name: 'Square root decomposition', gfgLink: 'https://www.geeksforgeeks.org/problems/square-root-decomposition/1' },
          { name: 'Wavelet Tree', gfgLink: 'https://www.geeksforgeeks.org/problems/wavelet-tree/1' }
        ]
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
        children: [
          { name: 'GCD / LCM (Euclidean)', gfgLink: 'https://www.geeksforgeeks.org/problems/lcm-and-gcd4516/1' },
          { name: 'Sieve of Eratosthenes', gfgLink: 'https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes5242/1' },
          { name: 'Prime factorization', gfgLink: 'https://www.geeksforgeeks.org/problems/prime-factors5052/1' },
          { name: 'Divisors & multiples', gfgLink: 'https://www.geeksforgeeks.org/problems/divisors-and-multiples/1' },
          { name: 'Count Primes', gfgLink: 'https://www.geeksforgeeks.org/problems/count-primes/1' },
          { name: 'Power(x,n)', gfgLink: 'https://www.geeksforgeeks.org/problems/power-of-numbers-1587115620/1' },
          { name: 'Excel Sheet Column Number', gfgLink: 'https://www.geeksforgeeks.org/problems/excel-sheet5448/1' },
          { name: 'Happy Number', gfgLink: 'https://www.geeksforgeeks.org/problems/happy-number/1' },
          { name: 'Trailing Zeroes in Factorial', gfgLink: 'https://www.geeksforgeeks.org/problems/trailing-zeroes-in-factorial5134/1' },
          { name: 'Reverse Integer', gfgLink: 'https://www.geeksforgeeks.org/problems/reverse-digit0316/1' }
        ]
      },
      {
        id: 'modular-arithmetic', title: 'Modular Arithmetic', difficulty: 'hard',
        children: [
          { name: 'Modular exponentiation', gfgLink: 'https://www.geeksforgeeks.org/problems/modular-exponentiation-for-large-numbers5537/1' },
          { name: 'Modular inverse (Fermat)', gfgLink: 'https://www.geeksforgeeks.org/problems/modular-multiplicative-inverse-1587115620/1' },
          { name: 'Chinese Remainder Theorem', gfgLink: 'https://www.geeksforgeeks.org/problems/chinese-remainder-theorem/1' }
        ]
      },
      {
        id: 'combinatorics', title: 'Combinatorics', difficulty: 'hard',
        children: [
          { name: "nCr / nPr (Pascal's triangle)", gfgLink: 'https://www.geeksforgeeks.org/problems/ncr1019/1' },
          { name: 'Inclusion-Exclusion', gfgLink: 'https://www.geeksforgeeks.org/problems/inclusion-exclusion/1' },
          { name: 'Catalan numbers', gfgLink: 'https://www.geeksforgeeks.org/problems/nth-catalan-number0817/1' },
          { name: 'Pigeonhole principle', gfgLink: 'https://www.geeksforgeeks.org/problems/pigeonhole-principle/1' }
        ]
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
        children: [
          { name: 'Convex Hull (Graham scan)', gfgLink: 'https://www.geeksforgeeks.org/problems/convex-hull/1' },
          { name: 'Point in polygon', gfgLink: 'https://www.geeksforgeeks.org/problems/point-in-polygon/1' },
          { name: 'Line intersection', gfgLink: 'https://www.geeksforgeeks.org/problems/intersecting-lines/1' },
          { name: 'Closest pair of points', gfgLink: 'https://www.geeksforgeeks.org/problems/closest-pair-of-points/1' },
          { name: 'Sweep line algorithm', gfgLink: 'https://www.geeksforgeeks.org/problems/sweep-line/1' },
          { name: 'Area of shapes', gfgLink: 'https://www.geeksforgeeks.org/problems/area-of-shapes/1' },
          { name: 'Line Sweep', gfgLink: 'https://www.geeksforgeeks.org/problems/line-sweep/1' },
          { name: 'Rotating Calipers', gfgLink: 'https://www.geeksforgeeks.org/problems/rotating-calipers/1' }
        ]
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
        children: [
          { name: 'Binary Lifting', gfgLink: 'https://www.geeksforgeeks.org/problems/binary-lifting/1' },
          { name: 'Heavy Light Decomposition', gfgLink: 'https://www.geeksforgeeks.org/problems/heavy-light-decomposition/1' },
          { name: 'Euler Tour', gfgLink: 'https://www.geeksforgeeks.org/problems/euler-tour/1' },
          { name: 'Centroid Decomposition', gfgLink: 'https://www.geeksforgeeks.org/problems/centroid-decomposition/1' }
        ]
      },
      {
        id: 'query-advanced', title: 'Query Techniques', difficulty: 'hard',
        children: [
          { name: "Mo's Algorithm", gfgLink: 'https://www.geeksforgeeks.org/problems/mos-algorithm/1' },
          { name: 'Coordinate Compression', gfgLink: 'https://www.geeksforgeeks.org/problems/coordinate-compression/1' },
          { name: 'Offline query processing', gfgLink: 'https://www.geeksforgeeks.org/problems/offline-query/1' }
        ]
      },
      {
        id: 'math-advanced', title: 'Math / Algebra', difficulty: 'hard',
        children: [
          { name: 'FFT (Fast Fourier Transform)', gfgLink: 'https://www.geeksforgeeks.org/problems/fast-fourier-transform/1' },
          { name: 'Matrix Exponentiation', gfgLink: 'https://www.geeksforgeeks.org/problems/matrix-exponentiation/1' },
          { name: 'NTT', gfgLink: 'https://www.geeksforgeeks.org/problems/ntt/1' }
        ]
      },
      {
        id: 'ds-advanced', title: 'Data Structures', difficulty: 'hard',
        children: [
          { name: 'Treap', gfgLink: 'https://www.geeksforgeeks.org/problems/treap/1' },
          { name: 'Suffix Automaton', gfgLink: 'https://www.geeksforgeeks.org/problems/suffix-automaton/1' },
          { name: 'Link-Cut Tree', gfgLink: 'https://www.geeksforgeeks.org/problems/link-cut-tree/1' },
          { name: 'String Hashing', gfgLink: 'https://www.geeksforgeeks.org/problems/string-hashing/1' },
          { name: 'Persistent Data Structures', gfgLink: 'https://www.geeksforgeeks.org/problems/persistent-data-structures/1' }
        ]
      },
      {
        id: 'paradigm-advanced', title: 'Paradigms', difficulty: 'hard',
        children: [
          { name: 'Meet in the Middle', gfgLink: 'https://www.geeksforgeeks.org/problems/meet-in-the-middle/1' },
          { name: 'Sqrt Decomposition', gfgLink: 'https://www.geeksforgeeks.org/problems/sqrt-decomposition/1' },
          { name: 'CDQ Divide & Conquer', gfgLink: 'https://www.geeksforgeeks.org/problems/cdq-divide-conquer/1' }
        ]
      }
    ]
  }
];

export default dsaTopics;
