import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import type { TopicVisualization } from "../../Type/systemDesignVisual";

const Visualization = ({ visualization }: { visualization: TopicVisualization }) => {
  const { darkMode } = useTheme();
  const [activeStage, setActiveStage] = useState(0);
  const stage = visualization.stages[activeStage];

  return (
    <div
      className={`rounded-xl border p-5 sm:p-6 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <p className={`text-sm mb-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        {visualization.summary}
      </p>

      {/* Stage tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {visualization.stages.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActiveStage(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              i === activeStage
                ? "bg-teal-500 text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Stage {i + 1}
          </button>
        ))}
      </div>

      {/* Active stage diagram */}
      <div className="flex flex-col items-center">
        <h4 className={`text-sm font-semibold mb-1 text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
          {stage.title}
        </h4>
        {stage.caption && (
          <p className={`text-xs mb-6 text-center max-w-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {stage.caption}
          </p>
        )}

        <div className="w-full overflow-x-auto">
          <div className="flex flex-col items-center gap-1 min-w-fit mx-auto py-2">
            {stage.layers.map((layer, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="flex flex-wrap justify-center gap-2">
                  {layer.boxes.map((box) => (
                    <div
                      key={box}
                      className={`px-4 py-2.5 rounded-lg border text-xs sm:text-sm font-medium text-center whitespace-nowrap ${
                        darkMode
                          ? "bg-gray-900 border-teal-500/40 text-white"
                          : "bg-teal-50 border-teal-200 text-gray-800"
                      }`}
                    >
                      {box}
                    </div>
                  ))}
                </div>
                {i < stage.layers.length - 1 && (
                  <ChevronDown className={`w-4 h-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
