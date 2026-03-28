import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../Context/ThemeContext';
import './BubbleSort.css';

interface Step {
  array: number[];
  comparing: number[];
  swapped: boolean;
  sorted: number[];
  passComplete: boolean;
  description: string;
  passNumber?: number;
}

const BubbleSort = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  const [inputArray, setInputArray] = useState<string>('64,32,1,91,8,7,99,27,5,25,14');
  const [array, setArray] = useState<number[]>([64, 32, 1, 91, 8, 7, 99, 27, 5, 25, 14]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showCode, setShowCode] = useState<boolean>(false);

  const generateSteps = (arr: number[], ascending: boolean = true) => {
    const steps: Step[] = [];
    const workArray = [...arr];
    const sorted: number[] = [];
    
    // Initial state
    steps.push({
      array: [...workArray],
      comparing: [],
      swapped: false,
      sorted: [...sorted],
      passComplete: false,
      description: `Initial array: [${workArray.join(', ')}]`,
    });

    let passNumber = 1;
    for (let i = 0; i < workArray.length - 1; i++) {
      let isSwap = false;
      
      steps.push({
        array: [...workArray],
        comparing: [],
        swapped: false,
        sorted: [...sorted],
        passComplete: false,
        description: `Pass ${passNumber} - Starting comparison`,
        passNumber: passNumber,
      });
      
      for (let j = 0; j < workArray.length - 1 - i; j++) {
        // Show comparison
        steps.push({
          array: [...workArray],
          comparing: [j, j + 1],
          swapped: false,
          sorted: [...sorted],
          passComplete: false,
          description: `Comparing ${workArray[j]} and ${workArray[j + 1]}`,
          passNumber: passNumber,
        });

        const shouldSwap = ascending 
          ? workArray[j] > workArray[j + 1]
          : workArray[j] < workArray[j + 1];

        if (shouldSwap) {
          isSwap = true;
          const temp = workArray[j];
          workArray[j] = workArray[j + 1];
          workArray[j + 1] = temp;
          
          // Show swap
          steps.push({
            array: [...workArray],
            comparing: [j, j + 1],
            swapped: true,
            sorted: [...sorted],
            passComplete: false,
            description: `Swapped! ${workArray[j + 1]} > ${workArray[j]}, now: [${workArray.join(', ')}]`,
            passNumber: passNumber,
          });
        } else {
          steps.push({
            array: [...workArray],
            comparing: [j, j + 1],
            swapped: false,
            sorted: [...sorted],
            passComplete: false,
            description: `No swap needed - ${workArray[j]} ≤ ${workArray[j + 1]}`,
            passNumber: passNumber,
          });
        }
      }

      // Mark element as sorted
      sorted.push(workArray.length - 1 - i);
      steps.push({
        array: [...workArray],
        comparing: [],
        swapped: false,
        sorted: [...sorted],
        passComplete: true,
        description: `Pass ${passNumber} complete - Element ${workArray[workArray.length - 1 - i]} is now in correct position`,
        passNumber: passNumber,
      });

      passNumber++;

      // Early termination optimization
      if (!isSwap) {
        steps.push({
          array: [...workArray],
          comparing: [],
          swapped: false,
          sorted: Array.from({ length: workArray.length }, (_, idx) => idx),
          passComplete: false,
          description: `No swaps in this pass - Array is sorted!`,
        });
        break;
      }
    }

    // Mark all as sorted
    if (sorted.length < workArray.length) {
      steps.push({
        array: [...workArray],
        comparing: [],
        swapped: false,
        sorted: Array.from({ length: workArray.length }, (_, i) => i),
        passComplete: false,
        description: `Sorting complete! Final array: [${workArray.join(', ')}]`,
      });
    }

    setSteps(steps);
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
    comparing: [],
    swapped: false,
    sorted: [],
    passComplete: false,
    description: 'Click "Generate Steps" to start',
  };

  const getBoxClass = (index: number) => {
    const isComparing = currentStepData.comparing.includes(index);
    const isSorted = currentStepData.sorted.includes(index);
    
    if (isSorted) return 'box-sorted';
    if (isComparing && currentStepData.swapped) return 'box-swapping';
    if (isComparing) return 'box-comparing';
    return 'box-default';
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      {/* Header */}
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Sorting
        </button>
        <h1 className="page-title">🫧 Bubble Sort Visualizer</h1>
      </div>

      {/* Theory Section */}
      <div className="theory-section">
        <h2 className="section-title">📚 What is Bubble Sort?</h2>
        <p className="description">
          Bubble Sort is a simple comparison-based algorithm that repeatedly compares adjacent 
          elements and swaps them if they are in the wrong order. After each full pass, the 
          largest unsorted element "bubbles up" to its correct position.
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
            <p>Relative order of equal elements is preserved</p>
          </div>
          
          <div className="card">
            <h3>🎯 Use Cases</h3>
            <p>Mainly for learning purposes</p>
            <p>Not suitable for large datasets</p>
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

      {/* Step-by-Step Visualization */}
      <div className="visualization-section">
        <h2 className="section-title">📊 Step-by-Step Visualization</h2>
        
        {/* Box Visualization */}
        <div className="box-visualization">
          <div className="array-display">
            {currentStepData.array.map((value, index) => (
              <div key={index} className="box-container">
                <div className={`array-box ${getBoxClass(index)}`}>
                  <span className="box-value">{value}</span>
                </div>
                {currentStepData.comparing.includes(index) && 
                 currentStepData.comparing.includes(index + 1) && (
                  <div className="comparison-arrow">↔️</div>
                )}
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
            <span className="legend-box box-comparing"></span>
            <span>Comparing</span>
          </div>
          <div className="legend-item">
            <span className="legend-box box-swapping"></span>
            <span>Swapping</span>
          </div>
          <div className="legend-item">
            <span className="legend-box box-sorted"></span>
            <span>Sorted</span>
          </div>
        </div>

        {/* All Steps History */}
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
                    {step.array.map((value, index) => {
                      const isComparing = step.comparing.includes(index);
                      const isSorted = step.sorted.includes(index);
                      let boxClass = 'history-box';
                      if (isSorted) boxClass += ' history-sorted';
                      else if (isComparing && step.swapped) boxClass += ' history-swapping';
                      else if (isComparing) boxClass += ' history-comparing';
                      
                      return (
                        <div key={index} className={boxClass}>
                          {value}
                        </div>
                      );
                    })}
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
              <h3>Bubble Sort - Ascending Order</h3>
              <pre>
                <code>{`public class BubbleSort {
    public static void bubbleSortAscending(int[] arr) {
        int temp = 0;
        for (int i = 0; i < arr.length - 1; i++) {
            boolean isSwap = false;
            
            for (int j = 0; j < arr.length - 1 - i; j++) {
                // Compare adjacent elements
                if (arr[j] > arr[j + 1]) {
                    isSwap = true;
                    
                    // Swap elements
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
            
            // Early termination optimization
            if (!isSwap) {
                if (i == 0) {
                    System.out.println("Array is already sorted");
                    return;
                } else {
                    System.out.println("Sorted in pass " + (i + 1));
                    return;
                }
            }
        }
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`}</code>
              </pre>
            </div>

            <div className="code-block">
              <h3>Bubble Sort - Descending Order</h3>
              <pre>
                <code>{`public static void bubbleSortDescending(int[] arr) {
    int temp = 0;
    for (int i = 0; i < arr.length - 1; i++) {
        boolean isSwap = false;
        
        for (int j = 0; j < arr.length - 1 - i; j++) {
            // Compare for descending order
            if (arr[j] < arr[j + 1]) {
                isSwap = true;
                
                // Swap elements
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        
        // Early termination
        if (!isSwap) {
            if (i == 0) {
                System.out.println("Array is already sorted");
                return;
            } else {
                System.out.println("Sorted in pass " + (i + 1));
                return;
            }
        }
    }
    System.out.println("Sorted array: " + Arrays.toString(arr));
}`}</code>
              </pre>
            </div>

            <div className="code-block">
              <h3>Complete Example with Main Method</h3>
              <pre>
                <code>{`public class BubbleSort {
    public static void main(String[] args) {
        int[] arr1 = {64, 32, 1, 91, 8, 7, 99, 27, 5, 25, 14};
        int[] arr2 = {1, 5, 7, 8, 14, 25, 27, 32, 64, 91, 99};
        int[] arr3 = {99, 91, 64, 32, 27, 25, 14, 8, 7, 5, 1};
        
        System.out.println("=== Ascending Sort ===");
        bubbleSortAscending(arr1);
        bubbleSortAscending(arr2);
        bubbleSortAscending(arr3);
        
        System.out.println("\\n=== Descending Sort ===");
        int[] arr4 = {64, 32, 1, 91, 8, 7, 99, 27, 5, 25, 14};
        int[] arr5 = {1, 5, 7, 8, 14, 25, 27, 32, 64, 91, 99};
        int[] arr6 = {99, 91, 64, 32, 27, 25, 14, 8, 7, 5, 1};
        
        bubbleSortDescending(arr4);
        bubbleSortDescending(arr5);
        bubbleSortDescending(arr6);
    }
    
    // Include bubbleSortAscending() and bubbleSortDescending() methods here
}`}</code>
              </pre>
            </div>

            <div className="code-block output-block">
              <h3>📤 Sample Output</h3>
              <pre>
                <code>{`=== Ascending Sort ===
Sorted in pass 10
Array is already sorted
Sorted array: [1, 5, 7, 8, 14, 25, 27, 32, 64, 91, 99]

=== Descending Sort ===
Sorted in pass 10
Sorted array: [99, 91, 64, 32, 27, 25, 14, 8, 7, 5, 1]
Array is already sorted descending`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="how-it-works-section">
        <h2 className="section-title">🔍 How Bubble Sort Works</h2>
        <div className="steps-explanation">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Compare Adjacent Elements</h3>
              <p>Start from the beginning and compare each pair of adjacent elements (arr[j] and arr[j+1])</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Swap If Needed</h3>
              <p>If arr[j] arr[j+1] (for ascending), swap them using a temporary variable</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Bubble Up Largest</h3>
              <p>After each pass, the largest unsorted element "bubbles" to its correct position at the end</p>
            </div>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Repeat & Optimize</h3>
              <p>Continue passes until no swaps occur. Use isSwap flag for early termination</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSort;