import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import type { SystemDesignBlock, SystemDesignCategory } from "../../Type/systemDesign";

interface TopicNavigationProps {
  category: SystemDesignCategory;
  prev?: SystemDesignBlock;
  next?: SystemDesignBlock;
}

const TopicNavigation = ({ category, prev, next }: TopicNavigationProps) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const baseBtn = `flex-1 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors ${
    darkMode
      ? "bg-gray-800 border-gray-700 hover:border-teal-500/60"
      : "bg-white border-gray-200 hover:border-teal-500/60"
  }`;

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-10">
      {prev ? (
        <button onClick={() => navigate(`/system-design/${category.id}/${prev.id}`)} className={baseBtn}>
          <ArrowLeft className="w-4 h-4 text-teal-500 shrink-0" />
          <span className="text-left min-w-0">
            <span className={`block text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Previous</span>
            <span className={`block truncate font-medium ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
              {prev.title}
            </span>
          </span>
        </button>
      ) : (
        <div className="flex-1" />
      )}

      <button
        onClick={() => navigate(`/system-design/${category.id}`)}
        className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-200 hover:border-teal-500/60"
            : "bg-white border-gray-200 text-gray-700 hover:border-teal-500/60"
        }`}
      >
        <LayoutGrid className="w-4 h-4 text-teal-500" />
        Back to {category.name}
      </button>

      {next ? (
        <button onClick={() => navigate(`/system-design/${category.id}/${next.id}`)} className={baseBtn}>
          <span className="text-right min-w-0 flex-1">
            <span className={`block text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Next</span>
            <span className={`block truncate font-medium ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
              {next.title}
            </span>
          </span>
          <ArrowRight className="w-4 h-4 text-teal-500 shrink-0" />
        </button>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

export default TopicNavigation;
