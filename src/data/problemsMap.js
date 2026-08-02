export const problemsMap = {
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    difficultyColor: '#34d399',
    tags: ['Array', 'HashMap'],
    description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers</em> such that they add up to <code>target</code>.<br><br>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.<br><br>You can return the answer in any order.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6',     output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6' },
      { input: 'nums = [3,3], target = 6',        output: '[0,1]', explanation: 'nums[0] + nums[1] = 3 + 3 = 6' },
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    // Hardcoded edge cases
    staticTestCases: [
      { input: '4\n2 7 11 15\n9',   expected: '0 1',   label: 'Example 1' },
      { input: '3\n3 2 4\n6',       expected: '1 2',   label: 'Example 2' },
      { input: '2\n3 3\n6',         expected: '0 1',   label: 'Example 3' },
    ],
    // Dynamic generator (runs locally in JS)
    generateRandomInput: () => {
      const n = Math.floor(Math.random() * (100 - 2 + 1)) + 2; // small n for quick execution
      const nums = [];
      const seen = new Set();
      while (nums.length < n) {
        const val = Math.floor(Math.random() * 2000) - 1000;
        if (!seen.has(val)) {
          nums.push(val);
          seen.add(val);
        }
      }
      // Pick exactly two distinct indices for a guaranteed answer
      const i1 = Math.floor(Math.random() * n);
      let i2 = Math.floor(Math.random() * n);
      while (i1 === i2) i2 = Math.floor(Math.random() * n);
      const target = nums[i1] + nums[i2];
      return `${n}\n${nums.join(' ')}\n${target}`;
    },
    // Model Solution (runs locally in JS)
    solve: (input) => {
      const lines = input.trim().split('\\n');
      const nums = lines[1].split(' ').map(Number);
      const target = Number(lines[2]);
      const map = new Map();
      for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) {
          // Output must be exactly formatted like expected stdout
          const res = [map.get(comp), i].sort((a,b)=>a-b);
          return `${res[0]} ${res[1]}`;
        }
        map.set(nums[i], i);
      }
      return '';
    },
    starters: {
      python: `import sys\nfrom typing import List\n\ndef two_sum(nums: List[int], target: int) -> List[int]:\n    # Write your solution here\n    pass\n\n# ── DO NOT MODIFY BELOW ──\nif __name__ == "__main__":\n    n = int(input())\n    nums = list(map(int, input().split()))\n    target = int(input())\n    result = two_sum(nums, target)\n    if result:\n        print(*sorted(result))\n`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Write your solution here\n    return {};\n}\n\n// ── DO NOT MODIFY BELOW ──\nint main() {\n    int n; if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int& x : nums) cin >> x;\n    int target; cin >> target;\n    auto res = twoSum(nums, target);\n    if (res.size() == 2) {\n        if (res[0] > res[1]) swap(res[0], res[1]);\n        cout << res[0] << ' ' << res[1] << '\\n';\n    }\n}\n`,
      c: `#include <stdio.h>\n#include <stdlib.h>\n\n// Write your solution here\nvoid twoSum(int* nums, int n, int target, int* out) {\n    \n}\n\n// ── DO NOT MODIFY BELOW ──\nint main() {\n    int n; if(scanf("%d", &n) != 1) return 0;\n    int* nums = malloc(n * sizeof(int));\n    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);\n    int target; scanf("%d", &target);\n    int out[2] = {-1, -1};\n    twoSum(nums, n, target, out);\n    if (out[0] != -1) {\n        if (out[0] > out[1]) { int t = out[0]; out[0] = out[1]; out[1] = t; }\n        printf("%d %d\\n", out[0], out[1]);\n    }\n    free(nums);\n}\n`,
      java: `import java.util.*;\n\npublic class Main {\n    // Write your solution here\n    public static int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n\n    // ── DO NOT MODIFY BELOW ──\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        int[] res = twoSum(nums, target);\n        if (res.length == 2) {\n            Arrays.sort(res);\n            System.out.println(res[0] + " " + res[1]);\n        }\n    }\n}\n`
    }
  }
};
