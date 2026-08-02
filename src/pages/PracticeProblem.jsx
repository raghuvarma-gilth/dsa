import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, ChevronLeft, CheckCircle2, XCircle, Clock,
  MemoryStick, Terminal, BookOpen, TestTube2, Loader2, RotateCcw
} from 'lucide-react';

// ─── Problem Definition ───────────────────────────────────────────────────────
const PROBLEM = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  difficultyColor: '#34d399',
  tags: ['Array', 'HashMap'],
  description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers</em> such that they add up to <code>target</code>.

You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.

You can return the answer in any order.`,
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
  // Each test case: { input (stdin string), expected (stdout string) }
  testCases: [
    { input: '4\n2 7 11 15\n9',   expected: '0 1',   label: 'Example 1' },
    { input: '3\n3 2 4\n6',       expected: '1 2',   label: 'Example 2' },
    { input: '2\n3 3\n6',         expected: '0 1',   label: 'Example 3' },
    { input: '5\n1 5 3 2 4\n6',   expected: '0 1',   label: 'Hidden #4'  },
    { input: '6\n0 4 3 0 2 5\n0', expected: '0 3',   label: 'Hidden #5'  },
  ],
};

// ─── Starter Code Templates ───────────────────────────────────────────────────
const STARTERS = {
  python: `import sys
from typing import List

def two_sum(nums: List[int], target: int) -> List[int]:
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# ── DO NOT MODIFY BELOW ──────────────────────────────
if __name__ == "__main__":
    n = int(input())
    nums = list(map(int, input().split()))
    target = int(input())
    result = two_sum(nums, target)
    print(*result)
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    unordered_map<int,int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int comp = target - nums[i];
        if (seen.count(comp)) return {seen[comp], i};
        seen[nums[i]] = i;
    }
    return {};
}

// ── DO NOT MODIFY BELOW ──────────────────────────────
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n; cin >> n;
    vector<int> nums(n);
    for (int& x : nums) cin >> x;
    int target; cin >> target;
    auto res = twoSum(nums, target);
    for (int i = 0; i < (int)res.size(); i++) {
        if (i) cout << ' ';
        cout << res[i];
    }
    cout << '\\n';
}
`,
  c: `#include <stdio.h>
#include <stdlib.h>

// Write your solution here
void twoSum(int* nums, int n, int target, int* out) {
    for (int i = 0; i < n; i++)
        for (int j = i+1; j < n; j++)
            if (nums[i] + nums[j] == target) {
                out[0] = i; out[1] = j; return;
            }
}

// ── DO NOT MODIFY BELOW ──────────────────────────────
int main() {
    int n; scanf("%d", &n);
    int* nums = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &nums[i]);
    int target; scanf("%d", &target);
    int out[2];
    twoSum(nums, n, target, out);
    printf("%d %d\\n", out[0], out[1]);
    free(nums);
}
`,
  java: `import java.util.*;

public class Main {

    // Write your solution here
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer,Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (seen.containsKey(comp)) return new int[]{seen.get(comp), i};
            seen.put(nums[i], i);
        }
        return new int[]{};
    }

    // ── DO NOT MODIFY BELOW ──────────────────────────────
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        int target = sc.nextInt();
        int[] res = twoSum(nums, target);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < res.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(res[i]);
        }
        System.out.println(sb);
    }
}
`,
};

// ─── Language → Wandbox compiler name ───────────────────────────────────────────
const LANG_CONFIG = {
  python: { compiler: 'cpython-3.14.0',  compilerOpts: '',         monacoLang: 'python', label: 'Python 3' },
  cpp:    { compiler: 'gcc-head',         compilerOpts: '-std=c++17', monacoLang: 'cpp',    label: 'C++'      },
  c:      { compiler: 'gcc-head-c',       compilerOpts: '',          monacoLang: 'c',      label: 'C'        },
  java:   { compiler: 'openjdk-jdk-22+36',     compilerOpts: '',          monacoLang: 'java',   label: 'Java'     },
};

// ─── Run code via /api/execute (proxies to Wandbox — free, no key) ───────────
async function runCode(lang, code, stdin) {
  const { compiler, compilerOpts } = LANG_CONFIG[lang];

  const res = await fetch('/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      compiler,
      code,
      stdin,
      'compiler-option-raw': compilerOpts,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Execution error ${res.status}: ${text.slice(0, 300)}`);
  }

  const data = await res.json();
  // Wandbox response fields
  const stdout = (data.program_output || '').trim();
  const stderr = (data.program_error || data.compiler_error || '').trim();
  if (data.status && data.status !== '0' && !stdout) {
    throw new Error(stderr || 'Runtime error — check your code');
  }
  return { stdout, stderr };
}

// ─── Normalize output for comparison ─────────────────────────────────────────
function normalize(s) {
  return s.trim().replace(/\s+/g, ' ');
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PracticeProblem({ onBack }) {
  const [lang, setLang] = useState('cpp');
  const [code, setCode] = useState(STARTERS['cpp']);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState(null); // array of per-test results
  const [activeTab, setActiveTab] = useState('problem'); // 'problem' | 'results'

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setCode(STARTERS[newLang]);
    setResults(null);
  };

  const handleRun = useCallback(async () => {
    setRunning(true);
    setResults(null);
    setActiveTab('results');
    const testResults = [];
    for (const tc of PROBLEM.testCases) {
      try {
        const { stdout, stderr } = await runCode(lang, code, tc.input);
        const passed = normalize(stdout) === normalize(tc.expected);
        testResults.push({ ...tc, stdout, stderr, passed });
      } catch (e) {
        testResults.push({ ...tc, stdout: '', stderr: e.message, passed: false });
      }
    }
    setResults(testResults);
    setRunning(false);
  }, [lang, code]);

  const allPassed = results && results.every(r => r.passed);
  const passedCount = results ? results.filter(r => r.passed).length : 0;

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg-primary)',
      display: 'flex', flexDirection: 'column'
    }}>

      {/* ── TOP BAR ── */}
      <div style={{
        height: '52px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: '16px',
        background: 'rgba(17,20,32,0.95)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100, flexShrink: 0
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
            color: '#a78bfa', fontSize: '13px', fontWeight: 600
          }}
        >
          <ChevronLeft size={15} /> Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {PROBLEM.title}
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 700, padding: '2px 10px',
            borderRadius: '20px', background: `${PROBLEM.difficultyColor}15`,
            color: PROBLEM.difficultyColor, border: `1px solid ${PROBLEM.difficultyColor}30`
          }}>
            {PROBLEM.difficulty}
          </span>
          {PROBLEM.tags.map(t => (
            <span key={t} style={{
              fontSize: '10px', padding: '2px 8px', borderRadius: '6px',
              background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>{t}</span>
          ))}
        </div>

        {results && (
          <span style={{
            fontSize: '12px', fontWeight: 700,
            color: allPassed ? '#34d399' : '#fb7185'
          }}>
            {allPassed ? '🎉 All Passed!' : `${passedCount}/${results.length} Passed`}
          </span>
        )}

        {/* Language selector */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {Object.entries(LANG_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => handleLangChange(key)}
              style={{
                padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                background: lang === key ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                color: lang === key ? '#a78bfa' : 'var(--text-muted)',
                border: lang === key ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        {/* Run button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleRun}
          disabled={running}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 20px', borderRadius: '10px', border: 'none',
            background: running ? 'rgba(16,185,129,0.3)' : 'linear-gradient(135deg,#10b981,#06b6d4)',
            color: 'white', fontSize: '14px', fontWeight: 700, cursor: running ? 'wait' : 'pointer',
            boxShadow: '0 4px 16px rgba(16,185,129,0.3)'
          }}
        >
          {running
            ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Running…</>
            : <><Play size={15} /> Run Tests</>}
        </motion.button>
      </div>

      {/* ── MAIN SPLIT LAYOUT ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 52px)' }}>

        {/* LEFT PANEL — Problem + Results */}
        <div style={{
          width: '420px', flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(17,20,32,0.6)'
          }}>
            {[
              { key: 'problem', icon: BookOpen,   label: 'Problem'  },
              { key: 'results', icon: TestTube2,  label: 'Results'  },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  flex: 1, padding: '12px', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 600, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', gap: '6px',
                  borderBottom: activeTab === key ? '2px solid #8b5cf6' : '2px solid transparent',
                  background: 'none',
                  color: activeTab === key ? '#a78bfa' : 'var(--text-muted)',
                  transition: 'all 0.2s'
                }}
              >
                <Icon size={14} />{label}
                {key === 'results' && results && (
                  <span style={{
                    fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '10px',
                    background: allPassed ? 'rgba(52,211,153,0.15)' : 'rgba(251,113,133,0.15)',
                    color: allPassed ? '#34d399' : '#fb7185',
                    border: `1px solid ${allPassed ? 'rgba(52,211,153,0.2)' : 'rgba(251,113,133,0.2)'}`
                  }}>
                    {passedCount}/{results.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <AnimatePresence mode="wait">
              {activeTab === 'problem' && (
                <motion.div key="problem" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Description */}
                  <p style={{
                    fontSize: '14px', lineHeight: 1.75, color: 'var(--text-secondary)',
                    marginBottom: '24px'
                  }} dangerouslySetInnerHTML={{ __html: PROBLEM.description }} />

                  {/* Examples */}
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '0.5px' }}>
                    EXAMPLES
                  </h3>
                  {PROBLEM.examples.map((ex, i) => (
                    <div key={i} style={{
                      borderRadius: '10px', padding: '14px', marginBottom: '10px',
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      <div style={{ fontSize: '12px', fontFamily: "'JetBrains Mono',monospace", marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Input: </span>
                        <span style={{ color: 'rgba(255,255,255,0.8)' }}>{ex.input}</span>
                      </div>
                      <div style={{ fontSize: '12px', fontFamily: "'JetBrains Mono',monospace", marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Output: </span>
                        <span style={{ color: '#34d399' }}>{ex.output}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        {ex.explanation}
                      </div>
                    </div>
                  ))}

                  {/* Constraints */}
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: '20px 0 10px', letterSpacing: '0.5px' }}>
                    CONSTRAINTS
                  </h3>
                  <ul style={{ margin: 0, padding: '0 0 0 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {PROBLEM.constraints.map((c, i) => (
                      <li key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, fontFamily: "'JetBrains Mono',monospace" }}>
                        {c}
                      </li>
                    ))}
                  </ul>

                  {/* Input format note */}
                  <div style={{
                    marginTop: '20px', padding: '12px 14px', borderRadius: '10px',
                    background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)'
                  }}>
                    <p style={{ fontSize: '12px', color: '#c4b5fd', fontWeight: 600, marginBottom: '4px' }}>📥 Input Format (stdin)</p>
                    <pre style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: 0, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>
{`Line 1: n (array size)
Line 2: space-separated nums
Line 3: target`}
                    </pre>
                  </div>
                </motion.div>
              )}

              {activeTab === 'results' && (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {!results && !running && (
                    <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                      <Terminal size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                        Click <strong style={{ color: '#34d399' }}>Run Tests</strong> to see results
                      </p>
                    </div>
                  )}

                  {running && (
                    <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                      <Loader2 size={36} style={{ color: '#a78bfa', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
                      <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Running {PROBLEM.testCases.length} test cases…</p>
                    </div>
                  )}

                  {results && (
                    <>
                      {/* Summary banner */}
                      <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{
                          padding: '16px', borderRadius: '12px', marginBottom: '16px', textAlign: 'center',
                          background: allPassed ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)',
                          border: `1px solid ${allPassed ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`
                        }}
                      >
                        <div style={{ fontSize: '28px', marginBottom: '4px' }}>
                          {allPassed ? '🎉' : '❌'}
                        </div>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: allPassed ? '#34d399' : '#fb7185', marginBottom: '2px' }}>
                          {allPassed ? 'All Test Cases Passed!' : `${passedCount} / ${results.length} Passed`}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {allPassed ? 'Great job! Your solution is correct.' : 'Check the failed cases below.'}
                        </p>
                      </motion.div>

                      {/* Individual results */}
                      {results.map((r, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          style={{
                            borderRadius: '12px', marginBottom: '10px', overflow: 'hidden',
                            border: `1px solid ${r.passed ? 'rgba(52,211,153,0.2)' : 'rgba(251,113,133,0.2)'}`,
                            background: r.passed ? 'rgba(52,211,153,0.04)' : 'rgba(251,113,133,0.04)'
                          }}
                        >
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '10px 14px',
                            borderBottom: `1px solid ${r.passed ? 'rgba(52,211,153,0.1)' : 'rgba(251,113,133,0.1)'}`
                          }}>
                            {r.passed
                              ? <CheckCircle2 size={16} style={{ color: '#34d399', flexShrink: 0 }} />
                              : <XCircle size={16} style={{ color: '#fb7185', flexShrink: 0 }} />}
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>
                              {r.label}
                            </span>
                            <span style={{
                              fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px',
                              background: r.passed ? 'rgba(52,211,153,0.1)' : 'rgba(251,113,133,0.1)',
                              color: r.passed ? '#34d399' : '#fb7185'
                            }}>
                              {r.passed ? 'PASSED' : 'FAILED'}
                            </span>
                          </div>
                          <div style={{ padding: '10px 14px', fontSize: '11px', fontFamily: "'JetBrains Mono',monospace', display: 'flex', flexDirection: 'column', gap: '4px'" }}>
                            <div><span style={{ color: 'var(--text-muted)' }}>Expected: </span><span style={{ color: '#34d399' }}>{r.expected}</span></div>
                            <div><span style={{ color: 'var(--text-muted)' }}>Got:      </span>
                              <span style={{ color: r.passed ? 'rgba(255,255,255,0.8)' : '#fb7185' }}>
                                {r.stdout || '(empty)'}
                              </span>
                            </div>
                            {r.stderr && (
                              <div style={{ marginTop: '6px', padding: '8px', borderRadius: '8px', background: 'rgba(239,68,68,0.08)', color: '#fca5a5', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                {r.stderr.slice(0, 300)}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT PANEL — Monaco Editor */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Editor header */}
          <div style={{
            padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(17,20,32,0.6)'
          }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>
              {lang === 'java' ? 'Solution.java' : lang === 'python' ? 'main.py' : lang === 'cpp' ? 'main.cpp' : 'main.c'}
            </span>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => { setCode(STARTERS[lang]); setResults(null); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px',
                borderRadius: '7px', background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-muted)', cursor: 'pointer', fontSize: '11px', fontWeight: 600
              }}
              title="Reset to starter code"
            >
              <RotateCcw size={11} /> Reset
            </button>
          </div>

          {/* Monaco */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Editor
              height="100%"
              language={LANG_CONFIG[lang].monacoLang}
              value={code}
              onChange={(v) => setCode(v || '')}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                roundedSelection: true,
                padding: { top: 16, bottom: 16 },
                cursorBlinking: 'smooth',
                smoothScrolling: true,
                tabSize: 4,
                wordWrap: 'on',
                renderLineHighlight: 'gutter',
                overviewRulerLanes: 0,
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        code { background: rgba(139,92,246,0.1); padding: 1px 5px; border-radius: 4px; color: #a78bfa; font-family: 'JetBrains Mono', monospace; font-size: 0.9em; }
        strong { color: rgba(255,255,255,0.9); }
        em { color: #c4b5fd; }
      `}</style>
    </div>
  );
}
