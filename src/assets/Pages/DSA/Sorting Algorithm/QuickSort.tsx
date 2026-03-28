import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import './QuickSort.css';

interface Step {
  array: number[];
  pivotIndex: number;
  left: number[];
  right: number[];
  comparing: number;
  swapping: number[];
  sorted: number[];
  rangeStart: number;
  rangeEnd: number;
  description: string;
  passNumber?: number;
  passComplete: boolean;
}

const QuickSort = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [inputArray, setInputArray] = useState<string>('9,27,10,5,64,18,25,82,0,76,14');
  const [array, setArray] = useState<number[]>([9, 27, 10, 5, 64, 18, 25, 82, 0, 76, 14]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showCode, setShowCode] = useState<boolean>(false);

  const makeStep = (arr: number[], sorted: number[], start: number, end: number, overrides: Partial<Step> = {}, desc = '', passNum?: number): Step => ({
    array: [...arr],
    pivotIndex: -1,
    left: [],
    right: [],
    comparing: -1,
    swapping: [],
    sorted: [...sorted],
    rangeStart: start,
    rangeEnd: end,
    description: desc,
    passNumber: passNum,
    passComplete: false,
    ...overrides,
  });

  const generateSteps = (arr: number[], ascending: boolean) => {
    const allSteps: Step[] = [];
    const w = [...arr];
    const sorted: number[] = [];
    let passCount = 0;

    allSteps.push(makeStep(w, sorted, 0, w.length - 1, {}, `Initial array: [${w.join(', ')}]`));

    const partition = (start: number, end: number) => {
      if (start >= end) {
        if (start === end && !sorted.includes(start)) {
          sorted.push(start);
          allSteps.push(makeStep(w, sorted, start, end, {}, `Single element ${w[start]} — already in position`));
        }
        return;
      }

      passCount++;
      const pass = passCount;

      if (ascending) {
        // ── Lomuto — pivot = last ──
        const pivotIdx = end;
        const pivot = w[pivotIdx];

        allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: pivotIdx }, `Pass ${pass} — Pivot selected: ${pivot} (index ${pivotIdx})`, pass));

        let i = start;
        for (let j = start; j < end; j++) {
          // compare
          allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: end, comparing: j }, `Comparing ${w[j]} with pivot ${pivot}`, pass));

          if (w[j] < pivot) {
            if (i !== j) {
              allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: end, swapping: [i, j] }, `${w[j]} < ${pivot} → Swap ${w[j]} & ${w[i]}`, pass));
              [w[i], w[j]] = [w[j], w[i]];
            } else {
              allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: end, left: [j] }, `${w[j]} < ${pivot} → already on left`, pass));
            }
            i++;
          } else {
            allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: end, right: [j] }, `${w[j]} >= ${pivot} → stays on right`, pass));
          }
        }

        // place pivot
        allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: end, swapping: [i, end] }, `Placing pivot ${pivot} at index ${i}`, pass));
        [w[i], w[end]] = [w[end], w[i]];
        sorted.push(i);

        const L = Array.from({ length: i - start }, (_, k) => start + k);
        const R = Array.from({ length: end - i }, (_, k) => i + 1 + k);

        allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: i, left: L, right: R, passComplete: true }, `Pass ${pass} done — Pivot ${pivot} fixed at ${i}. Left:[${L.map(x => w[x])}] Right:[${R.map(x => w[x])}]`, pass));

        partition(start, i - 1);
        partition(i + 1, end);

      } else {
        // ── Descending — pivot = first ──
        const pivotIdx = start;
        const pivot = w[pivotIdx];

        allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: pivotIdx }, `Pass ${pass} — Pivot selected: ${pivot} (index ${pivotIdx})`, pass));

        let i = end;
        for (let j = end; j > start; j--) {
          allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: start, comparing: j }, `Comparing ${w[j]} with pivot ${pivot}`, pass));

          if (w[j] < pivot) {
            if (i !== j) {
              allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: start, swapping: [i, j] }, `${w[j]} < ${pivot} → Swap ${w[j]} & ${w[i]}`, pass));
              [w[i], w[j]] = [w[j], w[i]];
            } else {
              allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: start, right: [j] }, `${w[j]} < ${pivot} → already on right`, pass));
            }
            i--;
          } else {
            allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: start, left: [j] }, `${w[j]} >= ${pivot} → stays on left`, pass));
          }
        }

        allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: start, swapping: [start, i] }, `Placing pivot ${pivot} at index ${i}`, pass));
        [w[i], w[start]] = [w[start], w[i]];
        sorted.push(i);

        const L = Array.from({ length: i - start }, (_, k) => start + k);
        const R = Array.from({ length: end - i }, (_, k) => i + 1 + k);

        allSteps.push(makeStep(w, sorted, start, end, { pivotIndex: i, left: L, right: R, passComplete: true }, `Pass ${pass} done — Pivot ${pivot} fixed at ${i}. Left:[${L.map(x => w[x])}] Right:[${R.map(x => w[x])}]`, pass));

        partition(start, i - 1);
        partition(i + 1, end);
      }
    };

    partition(0, w.length - 1);
    allSteps.push(makeStep(w, Array.from({ length: w.length }, (_, i) => i), 0, w.length - 1, {}, `Sorting complete! Final array: [${w.join(', ')}]`));

    setSteps(allSteps);
    setCurrentStep(0);
  };

  const handleArrayInput = (value: string) => {
    setInputArray(value);
    const nums = value.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    if (nums.length > 0) setArray(nums);
  };

  const handleSort = () => { setIsPlaying(false); setCurrentStep(0); generateSteps(array, sortOrder === 'asc'); };
  const handleReset = () => { setIsPlaying(false); setCurrentStep(0); setSteps([]); };

  const handleRandomize = () => {
    const r = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(r); setInputArray(r.join(',')); setSteps([]); setCurrentStep(0); setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const t = setTimeout(() => setCurrentStep(p => p + 1), speed);
      return () => clearTimeout(t);
    } else if (currentStep >= steps.length - 1) setIsPlaying(false);
  }, [isPlaying, currentStep, steps.length, speed]);

  const s = steps[currentStep] || {
    array, pivotIndex: -1, left: [], right: [], comparing: -1,
    swapping: [], sorted: [], rangeStart: 0, rangeEnd: array.length - 1,
    description: 'Click "Generate Steps" to start', passComplete: false,
  };

  const getBoxClass = (index: number) => {
    if (s.swapping.includes(index)) return 'box-swapping';
    if (s.pivotIndex === index)      return 'box-pivot';
    if (s.comparing === index)       return 'box-comparing';
    if (s.sorted.includes(index))    return 'box-sorted';
    if (s.left.includes(index))      return 'box-left';
    if (s.right.includes(index))     return 'box-right';
    if (index >= s.rangeStart && index <= s.rangeEnd) return 'box-default';
    return 'box-inactive';
  };

  const getHistoryBoxClass = (step: Step, index: number) => {
    let c = 'history-box';
    if (step.swapping.includes(index))  c += ' history-swapping';
    else if (step.pivotIndex === index) c += ' history-pivot';
    else if (step.comparing === index)  c += ' history-comparing';
    else if (step.sorted.includes(index)) c += ' history-sorted';
    else if (step.left.includes(index))  c += ' history-left';
    else if (step.right.includes(index)) c += ' history-right';
    else if (index < step.rangeStart || index > step.rangeEnd) c += ' history-inactive';
    return c;
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="header">
        <button onClick={() => navigate('/dsa/sorting')} className="back-button">← Back to Sorting</button>
        <h1 className="page-title">⚡ Quick Sort Visualizer</h1>
      </div>

      {/* Theory */}
      <div className="theory-section">
        <h2 className="section-title">📚 What is Quick Sort?</h2>
        <p className="description">
          Quick Sort is a divide-and-conquer algorithm. It picks a pivot, partitions the array so
          smaller elements go left and larger go right, fixes the pivot in its final sorted position,
          then recursively repeats on both sides.
        </p>
        <div className="characteristics-grid">
          <div className="card">
            <h3>⏱️ Time Complexity</h3>
            <ul>
              <li><strong>Best:</strong> O(n log n)</li>
              <li><strong>Average:</strong> O(n log n)</li>
              <li><strong>Worst:</strong> O(n²) — bad pivot</li>
            </ul>
          </div>
          <div className="card">
            <h3>💾 Space Complexity</h3>
            <p><strong>O(log n)</strong> — average (call stack)</p>
            <p><strong>O(n)</strong> — worst (deep recursion)</p>
            <p>In-place but stack memory counts</p>
          </div>
          <div className="card">
            <h3>❌ Stability</h3>
            <p><strong>Not Stable</strong></p>
            <p>Swapping across array changes relative order of equal elements</p>
          </div>
          <div className="card">
            <h3>🎯 When Preferred?</h3>
            <p>Large datasets, competitive programming</p>
            <p>Excellent cache performance</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="control-panel">
        <div className="input-group">
          <label>Array Input (comma-separated):</label>
          <input type="text" value={inputArray} onChange={(e) => handleArrayInput(e.target.value)} placeholder="e.g., 9,27,10,5,64" className="text-input" />
        </div>
        <div className="button-group">
          <button onClick={handleRandomize} className="btn-secondary">🎲 Randomize</button>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} className="select-input">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button onClick={handleSort} className="btn-primary">🚀 Generate Steps</button>
        </div>

        {steps.length > 0 && (
          <>
            <div className="playback-controls">
              <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="btn-control">⏮️ Prev</button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="btn-control">{isPlaying ? '⏸️ Pause' : '▶️ Play'}</button>
              <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1} className="btn-control">⏭️ Next</button>
              <button onClick={handleReset} className="btn-control">🔄 Reset</button>
            </div>
            <div className="speed-control">
              <label>Speed: {speed}ms</label>
              <input type="range" min="300" max="2000" step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="slider" />
            </div>
            <div className="step-info">
              <div className="step-counter">
                Step {currentStep + 1} of {steps.length}
                {s.passNumber && <span className="badge-pass">Pass {s.passNumber}</span>}
              </div>
              <div className="step-description">{s.description}</div>
            </div>
          </>
        )}
      </div>

      {/* Visualization */}
      <div className="visualization-section">
        <h2 className="section-title">📊 Step-by-Step Visualization</h2>
        <div className="box-visualization">
          <div className="array-display">
            {s.array.map((value, index) => (
              <div key={index} className="box-container">
                <div className={`array-box ${getBoxClass(index)}`}>
                  <span className="box-value">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <div className="legend-item"><span className="legend-box box-inactive"></span><span>Other Partition</span></div>
          <div className="legend-item"><span className="legend-box box-default"></span><span>Active Range</span></div>
          <div className="legend-item"><span className="legend-box box-pivot"></span><span>Pivot</span></div>
          <div className="legend-item"><span className="legend-box box-comparing"></span><span>Comparing</span></div>
          <div className="legend-item"><span className="legend-box box-left"></span><span>Left (smaller)</span></div>
          <div className="legend-item"><span className="legend-box box-right"></span><span>Right (greater)</span></div>
          <div className="legend-item"><span className="legend-box box-swapping"></span><span>Swapping</span></div>
          <div className="legend-item"><span className="legend-box box-sorted"></span><span>Sorted</span></div>
        </div>

        {/* History */}
        {steps.length > 0 && (
          <div className="steps-history">
            <h3 className="history-title">Complete Sorting History</h3>
            <div className="history-container">
              {steps.map((step, idx) => (
                <div key={idx} className={`history-step ${idx === currentStep ? 'active-history' : ''} ${step.passComplete ? 'pass-complete' : ''}`} onClick={() => setCurrentStep(idx)}>
                  <div className="history-step-number">Step {idx + 1}</div>
                  <div className="history-array-display">
                    {step.array.map((value, index) => (
                      <div key={index} className={getHistoryBoxClass(step, index)}>{value}</div>
                    ))}
                  </div>
                  <div className="history-description">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code */}
      <div className="code-section">
        <div className="code-section-header">
          <h2 className="section-title">💻 Java Implementation</h2>
          <button onClick={() => setShowCode(!showCode)} className="btn-secondary">{showCode ? '▼ Hide Code' : '▶ Show Code'}</button>
        </div>
        {showCode && (
          <div className="code-blocks">
            <div className="code-block">
              <h3>Quick Sort - Ascending Order</h3>
              <pre><code>{`public class QuickSort {
    public static void quickSortAscending(int[] arr, int start, int end) {
        int temp;
        if (end > start) {
            int pivot = arr[end], i = start;

            for (int j = start; j < end; j++) {
                // (pivot < arr[j]) -- For Descending
                if (pivot > arr[j]) {
                    temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                    i++;
                }
            }

            temp = arr[end];
            arr[end] = arr[i];
            arr[i] = temp;

            quickSortAscending(arr, start, i - 1);
            quickSortAscending(arr, i + 1, end);
        }
    }
}`}</code></pre>
            </div>

            <div className="code-block">
              <h3>Quick Sort - Descending Order</h3>
              <pre><code>{`public static void quickSortDescending(int[] arr, int start, int end) {
    int temp = 0;
    if (start < end) {
        int i = end, pivot = arr[start];

        for (int j = end; j > start; j--) {
            // (pivot < arr[j]) -- For Ascending
            if (pivot > arr[j]) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                i--;
            }
        }

        temp = arr[i];
        arr[i] = arr[start];
        arr[start] = temp;

        quickSortDescending(arr, start, i - 1);
        quickSortDescending(arr, i + 1, end);
    }
}`}</code></pre>
            </div>

            <div className="code-block">
              <h3>Complete Example with Main Method</h3>
              <pre><code>{`public class QuickSort {
    public static void main(String[] args) {
        int[] arr1 = {9, 27, 10, 5, 64, 18, 25, 82, 0, 76, 14, 25, 5};
        int[] arr2 = {9, 27, 10, 5, 64, 18, 25, 82, 0, 76, 14, 25, 5};

        quickSortAscending(arr1, 0, arr1.length - 1);
        System.out.println("Sorted array in ascending order :- " + Arrays.toString(arr1));

        System.out.println(" ");

        quickSortDescending(arr2, 0, arr2.length - 1);
        System.out.println("Sorted array in descending order :- " + Arrays.toString(arr2));
    }

    // Include quickSortAscending() and quickSortDescending() here
}`}</code></pre>
            </div>

            <div className="code-block output-block">
              <h3>📤 Sample Output</h3>
              <pre><code>{`Sorted array in ascending order  :- [0, 5, 5, 9, 10, 14, 18, 25, 25, 27, 64, 76, 82]

Sorted array in descending order :- [82, 76, 64, 27, 25, 25, 18, 14, 10, 9, 5, 5, 0]`}</code></pre>
            </div>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="how-it-works-section">
        <h2 className="section-title">🔍 How Quick Sort Works</h2>
        <div className="steps-explanation">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Choose a Pivot</h3>
              <p>Pick a pivot element. Last element for ascending, first element for descending</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Partition the Array</h3>
              <p>Compare each element with pivot. Smaller elements move left, larger stay right</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Place Pivot</h3>
              <p>Swap pivot into its correct sorted position. It never moves again after this</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Recurse Left & Right</h3>
              <p>Repeat the same process on both subarrays until every element is sorted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSort;