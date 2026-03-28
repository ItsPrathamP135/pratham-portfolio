import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import './InsertionSort.css';

interface Step {
  array: number[];
  sorted: number[];
  keyIndex: number;
  keyValue: number;
  shiftingIndex: number;
  insertIndex: number;
  description: string;
  passNumber?: number;
  passComplete: boolean;
}

const InsertionSort = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [inputArray, setInputArray] = useState<string>('64,32,1,91,8,7,99,27,5,25,14,0');
  const [array, setArray] = useState<number[]>([64, 32, 1, 91, 8, 7, 99, 27, 5, 25, 14, 0]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showCode, setShowCode] = useState<boolean>(false);

  const generateSteps = (arr: number[], ascending: boolean = true) => {
    const allSteps: Step[] = [];
    const workArray = [...arr];

    // Initial state
    allSteps.push({
      array: [...workArray],
      sorted: [0],
      keyIndex: -1,
      keyValue: -1,
      shiftingIndex: -1,
      insertIndex: -1,
      description: `Initial array: [${workArray.join(', ')}]. First element is considered sorted.`,
      passComplete: false,
    });

    for (let i = 1; i < workArray.length; i++) {
      const key = workArray[i];
      let prev = i - 1;

      // Pick key element
      allSteps.push({
        array: [...workArray],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        keyIndex: i,
        keyValue: key,
        shiftingIndex: -1,
        insertIndex: -1,
        description: `Pass ${i} - Picked key element: ${key} at index ${i}`,
        passNumber: i,
        passComplete: false,
      });

      // Compare and shift
      let inserted = false;
      while (prev >= 0) {
        const shouldShift = ascending
          ? workArray[prev] > key
          : workArray[prev] < key;

        if (shouldShift) {
          // Show shifting
          allSteps.push({
            array: [...workArray],
            sorted: Array.from({ length: i }, (_, idx) => idx),
            keyIndex: -1,
            keyValue: key,
            shiftingIndex: prev,
            insertIndex: -1,
            description: `Comparing ${key} with ${workArray[prev]} — ${workArray[prev]} is ${ascending ? 'greater' : 'smaller'}, shifting ${workArray[prev]} to the right`,
            passNumber: i,
            passComplete: false,
          });

          workArray[prev + 1] = workArray[prev];
          prev--;
        } else {
          // No shift needed, show comparison
          allSteps.push({
            array: [...workArray],
            sorted: Array.from({ length: i }, (_, idx) => idx),
            keyIndex: -1,
            keyValue: key,
            shiftingIndex: -1,
            insertIndex: prev + 1,
            description: `Comparing ${key} with ${workArray[prev]} — ${workArray[prev]} is ${ascending ? 'smaller or equal' : 'greater or equal'}, correct position found`,
            passNumber: i,
            passComplete: false,
          });
          inserted = true;
          break;
        }
      }

      // Place key at correct position
      workArray[prev + 1] = key;

      if (!inserted) {
        // Key goes to the very beginning
        allSteps.push({
          array: [...workArray],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          keyIndex: -1,
          keyValue: key,
          shiftingIndex: -1,
          insertIndex: 0,
          description: `${key} is smallest — inserting at index 0`,
          passNumber: i,
          passComplete: false,
        });
      }

      // Pass complete
      allSteps.push({
        array: [...workArray],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        keyIndex: -1,
        keyValue: -1,
        shiftingIndex: -1,
        insertIndex: -1,
        description: `Pass ${i} complete - ${key} inserted at index ${prev + 1}. Array: [${workArray.join(', ')}]`,
        passNumber: i,
        passComplete: true,
      });
    }

    // Final sorted
    allSteps.push({
      array: [...workArray],
      sorted: Array.from({ length: workArray.length }, (_, idx) => idx),
      keyIndex: -1,
      keyValue: -1,
      shiftingIndex: -1,
      insertIndex: -1,
      description: `Sorting complete! Final array: [${workArray.join(', ')}]`,
      passComplete: false,
    });

    setSteps(allSteps);
    setCurrentStep(0);
  };

  const handleArrayInput = (value: string) => {
    setInputArray(value);
    const nums = value
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n));
    if (nums.length > 0) {
      setArray(nums);
    }
  };

  const handleSort = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    generateSteps(array, sortOrder === 'asc');
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSteps([]);
  };

  const handleRandomize = () => {
    const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(randomArray);
    setInputArray(randomArray.join(','));
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  const currentStepData = steps[currentStep] || {
    array: array,
    sorted: [],
    keyIndex: -1,
    keyValue: -1,
    shiftingIndex: -1,
    insertIndex: -1,
    description: 'Click "Generate Steps" to start',
    passComplete: false,
  };

  const getBoxClass = (index: number) => {
    if (currentStepData.keyIndex === index) return 'box-key';
    if (currentStepData.shiftingIndex === index) return 'box-shifting';
    if (currentStepData.insertIndex === index) return 'box-insert';
    if (currentStepData.sorted.includes(index)) return 'box-sorted';
    return 'box-default';
  };

  const getHistoryBoxClass = (step: Step, index: number) => {
    let boxClass = 'history-box';
    if (step.keyIndex === index) boxClass += ' history-key';
    else if (step.shiftingIndex === index) boxClass += ' history-shifting';
    else if (step.insertIndex === index) boxClass += ' history-insert';
    else if (step.sorted.includes(index)) boxClass += ' history-sorted';
    return boxClass;
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Sorting
        </button>
        <h1 className="page-title">🃏 Insertion Sort Visualizer</h1>
      </div>

      {/* Theory Section */}
      <div className="theory-section">
        <h2 className="section-title">📚 What is Insertion Sort?</h2>
        <p className="description">
          Insertion Sort builds the sorted array one element at a time. It works similarly to
          arranging playing cards in your hand — pick one card, compare it with the already
          sorted cards, shift cards to the right, and insert it at the correct position.
        </p>

        <div className="characteristics-grid">
          <div className="card">
            <h3>⏱️ Time Complexity</h3>
            <ul>
              <li><strong>Best:</strong> O(n) - Already sorted</li>
              <li><strong>Average:</strong> O(n²)</li>
              <li><strong>Worst:</strong> O(n²) - Reverse sorted</li>
            </ul>
          </div>

          <div className="card">
            <h3>💾 Space Complexity</h3>
            <p><strong>O(1)</strong> - In-place algorithm</p>
            <p>No extra memory required</p>
          </div>

          <div className="card">
            <h3>✅ Stability</h3>
            <p><strong>Yes, Stable</strong></p>
            <p>Shifts elements instead of swapping, preserving relative order</p>
          </div>

          <div className="card">
            <h3>🎯 When Preferred?</h3>
            <p>Small or nearly sorted datasets</p>
            <p>Used internally in hybrid algorithms like TimSort</p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="input-group">
          <label>Array Input (comma-separated):</label>
          <input
            type="text"
            value={inputArray}
            onChange={(e) => handleArrayInput(e.target.value)}
            placeholder="e.g., 64,32,1,91,8"
            className="text-input"
          />
        </div>

        <div className="button-group">
          <button onClick={handleRandomize} className="btn-secondary">
            🎲 Randomize
          </button>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="select-input"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button onClick={handleSort} className="btn-primary">
            🚀 Generate Steps
          </button>
        </div>

        {steps.length > 0 && (
          <>
            <div className="playback-controls">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="btn-control"
              >
                ⏮️ Prev
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="btn-control"
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>

              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="btn-control"
              >
                ⏭️ Next
              </button>

              <button onClick={handleReset} className="btn-control">
                🔄 Reset
              </button>
            </div>

            <div className="speed-control">
              <label>Speed: {speed}ms</label>
              <input
                type="range"
                min="300"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="slider"
              />
            </div>

            <div className="step-info">
              <div className="step-counter">
                Step {currentStep + 1} of {steps.length}
                {currentStepData.passNumber && (
                  <span className="badge-pass">Pass {currentStepData.passNumber}</span>
                )}
              </div>
              <div className="step-description">
                {currentStepData.description}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Visualization */}
      <div className="visualization-section">
        <h2 className="section-title">📊 Step-by-Step Visualization</h2>

        <div className="box-visualization">
          <div className="array-display">
            {currentStepData.array.map((value, index) => (
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
          <div className="legend-item">
            <span className="legend-box box-default"></span>
            <span>Unsorted</span>
          </div>
          <div className="legend-item">
            <span className="legend-box box-sorted"></span>
            <span>Sorted</span>
          </div>
          <div className="legend-item">
            <span className="legend-box box-key"></span>
            <span>Key Element</span>
          </div>
          <div className="legend-item">
            <span className="legend-box box-shifting"></span>
            <span>Shifting Right</span>
          </div>
          <div className="legend-item">
            <span className="legend-box box-insert"></span>
            <span>Insert Position</span>
          </div>
        </div>

        {/* Steps History */}
        {steps.length > 0 && (
          <div className="steps-history">
            <h3 className="history-title">Complete Sorting History</h3>
            <div className="history-container">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`history-step ${idx === currentStep ? 'active-history' : ''} ${step.passComplete ? 'pass-complete' : ''}`}
                  onClick={() => setCurrentStep(idx)}
                >
                  <div className="history-step-number">Step {idx + 1}</div>
                  <div className="history-array-display">
                    {step.array.map((value, index) => (
                      <div key={index} className={getHistoryBoxClass(step, index)}>
                        {value}
                      </div>
                    ))}
                  </div>
                  <div className="history-description">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code Section */}
      <div className="code-section">
        <div className="code-section-header">
          <h2 className="section-title">💻 Java Implementation</h2>
          <button
            onClick={() => setShowCode(!showCode)}
            className="btn-secondary"
          >
            {showCode ? '▼ Hide Code' : '▶ Show Code'}
          </button>
        </div>

        {showCode && (
          <div className="code-blocks">
            <div className="code-block">
              <h3>Insertion Sort - Ascending Order</h3>
              <pre>
                <code>{`public class InsertionSort {
    public static void insertionSortAscending(int[] arr) {
        int temp = 0;
        
        for (int i = 0; i < arr.length - 1; i++) {
            int prev = i;
            
            // Shift elements to the right while they are greater
            while (prev >= 0 && arr[prev] > arr[prev + 1]) {
                temp = arr[prev];
                arr[prev] = arr[prev + 1];
                arr[prev + 1] = temp;
                prev--;
            }
        }
        System.out.println("The ascending sorted array is " + Arrays.toString(arr));
    }
}`}</code>
              </pre>
            </div>

            <div className="code-block">
              <h3>Insertion Sort - Descending Order</h3>
              <pre>
                <code>{`public static void insertionSortDescending(int[] arr) {
    int temp = 0;
    
    for (int i = 0; i < arr.length - 1; i++) {
        int prev = i;
        
        // Shift elements to the right while they are smaller
        while (prev >= 0 && arr[prev] < arr[prev + 1]) {
            temp = arr[prev];
            arr[prev] = arr[prev + 1];
            arr[prev + 1] = temp;
            prev--;
        }
    }
    System.out.println("The descending sorted array is " + Arrays.toString(arr));
}`}</code>
              </pre>
            </div>

            <div className="code-block">
              <h3>Complete Example with Main Method</h3>
              <pre>
                <code>{`public class InsertionSort {
    public static void main(String[] args) {
        int[] arr1 = {64, 32, 1, 91, 8, 7, 99, 27, 5, 25, 14, 0};
        insertionSortAscending(arr1);
        System.out.println("");

        int[] arr2 = {64, 32, 1, 91, 8, 0, 7, 99, 27, 5, 25, 14};
        insertionSortDescending(arr2);
    }

    // Include insertionSortAscending() and insertionSortDescending() methods here
}`}</code>
              </pre>
            </div>

            <div className="code-block output-block">
              <h3>📤 Sample Output</h3>
              <pre>
                <code>{`The ascending sorted array is [0, 1, 5, 7, 8, 14, 25, 27, 32, 64, 91, 99]

The descending sorted array is [99, 91, 64, 32, 27, 25, 14, 8, 7, 5, 1, 0]`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="how-it-works-section">
        <h2 className="section-title">🔍 How Insertion Sort Works</h2>
        <div className="steps-explanation">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Pick the Key Element</h3>
              <p>Take the next element from the unsorted portion as the key to insert</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Compare with Sorted Part</h3>
              <p>Compare the key with elements in the sorted portion from right to left</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Shift Elements Right</h3>
              <p>Shift all greater (or smaller) elements one position to the right to make room</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Insert at Correct Position</h3>
              <p>Place the key at its correct sorted position. Sorted portion grows by one</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertionSort;