import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../Context/ThemeContext";

interface Algorithm {
  id: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  complexity: string;
}

const SortingPage = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const algorithms: Algorithm[] = [
    {
      id: "bubble-sort",
      name: "Bubble Sort",
      difficulty: "Easy",
      complexity: "O(n²)",
    },
    {
      id: "quick-sort",
      name: "Quick Sort",
      difficulty: "Medium",
      complexity: "O(n log n)",
    },
    {
      id: "merge-sort",
      name: "Merge Sort",
      difficulty: "Medium",
      complexity: "O(n log n)",
    },
    {
      id: "heap-sort",
      name: "Heap Sort",
      difficulty: "Hard",
      complexity: "O(n log n)",
    },
    {
      id: "insertion-sort",
      name: "Insertion Sort",
      difficulty: "Easy",
      complexity: "O(n²)",
    },
    {
      id: "selection-sort",
      name: "Selection Sort",
      difficulty: "Easy",
      complexity: "O(n²)",
    },
  ];

  const getDifficultyStyle = (difficulty: Algorithm["difficulty"]): string => {
    if (difficulty === "Easy") {
      return darkMode
        ? "bg-green-900 text-green-300"
        : "bg-green-100 text-green-700";
    } else if (difficulty === "Medium") {
      return darkMode
        ? "bg-yellow-900 text-yellow-300"
        : "bg-yellow-100 text-yellow-700";
    } else {
      return darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <button
        onClick={() => navigate("/dsa")}
        className={`mb-6 px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-x-1 ${
          darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        ← Back to DSA
      </button>

      <h2
        className={`text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}
      >
        🔢 Sorting Algorithms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo) => (
          <div
            key={algo.id}
            onClick={() => navigate(`/dsa/sorting/${algo.id}`)}
            className={`${
              darkMode ? "bg-gray-800 border-gray-700 hover:border-teal-500" : "bg-white border-gray-200 hover:border-teal-400"
            } border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105`}
          >
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-teal-400" : "text-teal-600"}`}>
              {algo.name}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Difficulty:
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyStyle(algo.difficulty)}`}>
                  {algo.difficulty}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Complexity:
                </span>
                <code className={`text-xs font-mono ${darkMode ? "text-purple-400" : "text-purple-600"}`}>
                  {algo.complexity}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingPage;