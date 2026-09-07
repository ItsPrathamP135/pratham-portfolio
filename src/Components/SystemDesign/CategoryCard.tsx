import { useNavigate } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Activity } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import type { SystemDesignCategory } from "../../Type/systemDesign";
import { getCategoryProgress } from "../../data/systemDesignData";
import CircularProgress from "./CircularProgress";

const CategoryCard = ({ category }: { category: SystemDesignCategory }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { completed, total, percentage, last7DaysCompleted } =
    getCategoryProgress(category);

  return (
    <div
      onClick={() => navigate(`/system-design/${category.id}`)}
      className={`group cursor-pointer rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-teal-500/60"
          : "bg-white border-gray-200 hover:border-teal-500/60 hover:shadow-md"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className={`text-lg font-semibold truncate ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            {category.name}
          </h3>
          <p
            className={`text-sm mt-1 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            {category.description}
          </p>
        </div>
        <ArrowUpRight
          className={`w-5 h-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
            darkMode
              ? "text-gray-500 group-hover:text-teal-400"
              : "text-gray-400 group-hover:text-teal-500"
          }`}
        />
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="space-y-2">
          <div
            className={`flex items-center gap-1.5 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Target: {category.targetDate}</span>
          </div>
          <div
            className={`flex items-center gap-1.5 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{last7DaysCompleted} completed in last 7 days</span>
          </div>
          <div
            className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}
          >
            {completed} / {total} blocks
          </div>
        </div>
        <CircularProgress percentage={percentage} />
      </div>

      {/* Linear progress bar */}
      <div
        className={`mt-4 h-1.5 w-full rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
