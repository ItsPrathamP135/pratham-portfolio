import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";
import "./SelectionSort.css";

interface Step {
  array: number[];
  currentIndex: number;
  minIndex: number;
  comparing: number;
  swapping: number[];
  sorted: number[];
  passComplete: boolean;
  description: string;
  passNumber?: number;
}

const SelectionSort = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [inputArray, setInputArray] = useState<string>(
    "64,32,1,91,8,7,99,27,5,25,14,0",
  );
  const [array, setArray] = useState<number[]>([
    64, 32, 1, 91, 8, 7, 99, 27, 5, 25, 14, 0,
  ]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showCode, setShowCode] = useState<boolean>(false);

  const generateSteps = (arr: number[], ascending: boolean = true) => {
    const steps: Step[] = [];
    const workArray = [...arr];
    const sorted: number[] = [];

    // Initial state
    steps.push({
      array: [...workArray],
      currentIndex: -1,
      minIndex: -1,
      comparing: -1,
      swapping: [],
      sorted: [...sorted],
      passComplete: false,
      description: `Initial array: [${workArray.join(", ")}]`,
    });

    let passNumber = 1;

    for (let i = 0; i < workArray.length - 1; i++) {
      let selectedIndex = i;

      // Starting new pass
      steps.push({
        array: [...workArray],
        currentIndex: i,
        minIndex: selectedIndex,
        comparing: -1,
        swapping: [],
        sorted: [...sorted],
        passComplete: false,
        description: `Pass ${passNumber} - Finding ${ascending ? "minimum" : "maximum"} from index ${i}`,
        passNumber: passNumber,
      });

      // Find min/max in unsorted portion
      for (let j = i + 1; j < workArray.length; j++) {
        // Show comparison
        steps.push({
          array: [...workArray],
          currentIndex: i,
          minIndex: selectedIndex,
          comparing: j,
          swapping: [],
          sorted: [...sorted],
          passComplete: false,
          description: `Comparing ${workArray[j]} with current ${ascending ? "minimum" : "maximum"} ${workArray[selectedIndex]}`,
          passNumber: passNumber,
        });

        const shouldUpdate = ascending
          ? workArray[j] < workArray[selectedIndex]
          : workArray[j] > workArray[selectedIndex];

        if (shouldUpdate) {
          selectedIndex = j;
          // Show new min/max found
          steps.push({
            array: [...workArray],
            currentIndex: i,
            minIndex: selectedIndex,
            comparing: j,
            swapping: [],
            sorted: [...sorted],
            passComplete: false,
            description: `New ${ascending ? "minimum" : "maximum"} found: ${workArray[selectedIndex]} at index ${selectedIndex}`,
            passNumber: passNumber,
          });
        }
      }

      // Swap if needed
      if (selectedIndex !== i) {
        steps.push({
          array: [...workArray],
          currentIndex: i,
          minIndex: selectedIndex,
          comparing: -1,
          swapping: [i, selectedIndex],
          sorted: [...sorted],
          passComplete: false,
          description: `Swapping ${workArray[i]} with ${workArray[selectedIndex]}`,
          passNumber: passNumber,
        });

        const temp = workArray[i];
        workArray[i] = workArray[selectedIndex];
        workArray[selectedIndex] = temp;

        steps.push({
          array: [...workArray],
          currentIndex: i,
          minIndex: -1,
          comparing: -1,
          swapping: [i, selectedIndex],
          sorted: [...sorted],
          passComplete: false,
          description: `Swapped! Array is now: [${workArray.join(", ")}]`,
          passNumber: passNumber,
        });
      } else {
        steps.push({
          array: [...workArray],
          currentIndex: i,
          minIndex: selectedIndex,
          comparing: -1,
          swapping: [],
          sorted: [...sorted],
          passComplete: false,
          description: `Element ${workArray[i]} is already in correct position`,
          passNumber: passNumber,
        });
      }

      // Mark element as sorted
      sorted.push(i);
      steps.push({
        array: [...workArray],
        currentIndex: -1,
        minIndex: -1,
        comparing: -1,
        swapping: [],
        sorted: [...sorted],
        passComplete: true,
        description: `Pass ${passNumber} complete - Element ${workArray[i]} is now in sorted position`,
        passNumber: passNumber,
      });

      passNumber++;
    }

    // Mark all as sorted
    sorted.push(workArray.length - 1);
    steps.push({
      array: [...workArray],
      currentIndex: -1,
      minIndex: -1,
      comparing: -1,
      swapping: [],
      sorted: [...sorted],
      passComplete: false,
      description: `Sorting complete! Final array: [${workArray.join(", ")}]`,
    });

    setSteps(steps);
    setCurrentStep(0);
  };

  const handleArrayInput = (value: string) => {
    setInputArray(value);
    const nums = value
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));
    if (nums.length > 0) {
      setArray(nums);
    }
  };

  const handleSort = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    generateSteps(array, sortOrder === "asc");
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSteps([]);
  };

  const handleRandomize = () => {
    const randomArray = Array.from(
      { length: 8 },
      () => Math.floor(Math.random() * 100) + 1,
    );
    setArray(randomArray);
    setInputArray(randomArray.join(","));
    setSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  const currentStepData = steps[currentStep] || {
    array: array,
    currentIndex: -1,
    minIndex: -1,
    comparing: -1,
    swapping: [],
    sorted: [],
    passComplete: false,
    description: 'Click "Generate Steps" to start',
  };

  const getBoxClass = (index: number) => {
    const isSorted = currentStepData.sorted.includes(index);
    const isSwapping = currentStepData.swapping.includes(index);
    const isMinIndex = currentStepData.minIndex === index;
    const isComparing = currentStepData.comparing === index;
    const isCurrentIndex = currentStepData.currentIndex === index;

    if (isSorted) return "box-sorted";
    if (isSwapping) return "box-swapping";
    if (isMinIndex) return "box-minimum";
    if (isComparing) return "box-comparing";
    if (isCurrentIndex) return "box-current";
    return "box-default";
  };

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      {/* Header */}
      <div className="header">
        <button
          onClick={() => navigate("/dsa/sorting")}
          className="back-button"
        >
          ← Back to Sorting
        </button>
        <h1 className="page-title">🎯 Selection Sort Visualizer</h1>
      </div>

      {/* Theory Section */}
      <div className="theory-section">
        <h2 className="section-title">📚 What is Selection Sort?</h2>
        <p className="description">
          Selection Sort works by dividing the array into sorted and unsorted
          parts. In each iteration, it finds the minimum (or maximum) element
          from the unsorted portion and swaps it with the first element of the
          unsorted portion, expanding the sorted portion by one element.
        </p>

        <div className="characteristics-grid">
          <div className="card">
            <h3>⏱️ Time Complexity</h3>
            <ul>
              <li>
                <strong>Best:</strong> O(n²)
              </li>
              <li>
                <strong>Average:</strong> O(n²)
              </li>
              <li>
                <strong>Worst:</strong> O(n²)
              </li>
            </ul>
          </div>

          <div className="card">
            <h3>💾 Space Complexity</h3>
            <p>
              <strong>O(1)</strong> - In-place algorithm
            </p>
            <p>No extra memory required</p>
          </div>

          <div className="card">
            <h3>❌ Stability</h3>
            <p>
              <strong>Not Stable</strong>
            </p>
            <p>Can change relative order of equal elements</p>
          </div>

          <div className="card">
            <h3>🎯 Key Advantage</h3>
            <p>Minimum number of swaps</p>
            <p>Compared to other simple sorting algorithms</p>
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
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
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
                {isPlaying ? "⏸️ Pause" : "▶️ Play"}
              </button>

              <button
                onClick={() =>
                  setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
                }
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
                  <span className="badge-pass">
                    Pass {currentStepData.passNumber}
                  </span>
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
            <span className="legend-box box-current"></span>
            <span>Current Position</span>
          </div>
          <div className="legend-item">
            <span className="legend-box box-comparing"></span>
            <span>Comparing</span>
          </div>
          <div className="legend-item">
            <span className="legend-box box-minimum"></span>
            <span>Min/Max Found</span>
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
                  className={`history-step ${idx === currentStep ? "active-history" : ""} ${step.passComplete ? "pass-complete" : ""}`}
                  onClick={() => setCurrentStep(idx)}
                >
                  <div className="history-step-number">Step {idx + 1}</div>
                  <div className="history-array-display">
                    {step.array.map((value, index) => {
                      const isSorted = step.sorted.includes(index);
                      const isSwapping = step.swapping.includes(index);
                      const isMinIndex = step.minIndex === index;
                      const isComparing = step.comparing === index;
                      const isCurrentIndex = step.currentIndex === index;

                      let boxClass = "history-box";
                      if (isSorted) boxClass += " history-sorted";
                      else if (isSwapping) boxClass += " history-swapping";
                      else if (isMinIndex) boxClass += " history-minimum";
                      else if (isComparing) boxClass += " history-comparing";
                      else if (isCurrentIndex) boxClass += " history-current";

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
            {showCode ? "▼ Hide Code" : "▶ Show Code"}
          </button>
        </div>

        {showCode && (
          <div className="code-blocks">
            <div className="code-block">
              <h3>Selection Sort - Ascending Order</h3>
              <pre>
                <code>{`public class SelectionSort {
    public static void selectionSortAscending(int[] arr) {
        int temp = 0;
        
        for (int i = 0; i < arr.length - 1; i++) {
            int sI = i;  // sI = selected index (minimum)
            
            // Find minimum in unsorted portion
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[sI]) {
                    sI = j;
                }
            }
            
            // Swap minimum with first unsorted element
            temp = arr[i];
            arr[i] = arr[sI];
            arr[sI] = temp;
        }
        
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`}</code>
              </pre>
            </div>

            <div className="code-block">
              <h3>Selection Sort - Descending Order</h3>
              <pre>
                <code>{`public static void selectionSortDescending(int[] arr) {
    int temp = 0;
    
    for (int i = 0; i < arr.length - 1; i++) {
        int sI = i;  // sI = selected index (maximum)
        
        // Find maximum in unsorted portion
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] > arr[sI]) {
                sI = j;
            }
        }
        
        // Swap maximum with first unsorted element
        temp = arr[i];
        arr[i] = arr[sI];
        arr[sI] = temp;
    }
    
    System.out.println("Sorted array: " + Arrays.toString(arr));
}`}</code>
              </pre>
            </div>

            <div className="code-block">
              <h3>Complete Example with Main Method</h3>
              <pre>
                <code>{`public class SelectionSort {
    public static void main(String[] args) {
        int[] arr1 = {64, 32, 1, 91, 8, 7, 99, 27, 5, 25, 14, 0};
        selectionSortAscending(arr1);
        System.out.println("");
        
        int[] arr2 = {64, 32, 1, 91, 8, 0, 7, 99, 27, 5, 25, 14};
        selectionSortDescending(arr2);
    }
    
    // Include selectionSortAscending() and selectionSortDescending() methods here
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
        <h2 className="section-title">🔍 How Selection Sort Works</h2>
        <div className="steps-explanation">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Find Minimum/Maximum</h3>
              <p>
                Scan through the unsorted portion to find the minimum (or
                maximum for descending) element
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Swap with First Unsorted</h3>
              <p>
                Swap the found minimum/maximum with the first element of the
                unsorted portion
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Expand Sorted Portion</h3>
              <p>The sorted portion grows by one element after each pass</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Repeat Until Done</h3>
              <p>
                Continue until all elements are in the sorted portion (n-1
                passes)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionSort;
