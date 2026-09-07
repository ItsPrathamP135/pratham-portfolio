import { CalendarClock } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import CategoryCard from "../../Components/SystemDesign/CategoryCard";
import CircularProgress from "../../Components/SystemDesign/CircularProgress";
import { getOverallProgress, systemDesignData, systemDesignTargetDate } from "../../data/systemDesignData";

const SystemDesignPage = () => {
  const { darkMode } = useTheme();
  const overall = getOverallProgress();

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className={`text-sm font-semibold tracking-wide text-teal-500 mb-2`}>System Design</p>
            <h1 className={`text-3xl sm:text-4xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
              Interview Knowledge Base
            </h1>
            <p className={`mt-3 max-w-xl text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              Build interview-ready HLD and LLD knowledge through fundamentals, distributed systems,
              design patterns, case studies and interview practice.
            </p>
            <div className={`flex items-center gap-1.5 mt-4 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <CalendarClock className="w-4 h-4 text-teal-500" />
              <span>Target: {systemDesignTargetDate}</span>
            </div>
          </div>

          {/* Overall progress snapshot */}
          <div
            className={`flex items-center gap-4 rounded-xl border px-5 py-4 self-start md:self-auto ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <CircularProgress percentage={overall.percentage} size={64} strokeWidth={6} />
            <div>
              <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                {overall.completed} / {overall.total} blocks
              </p>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Overall progress</p>
            </div>
          </div>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {systemDesignData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemDesignPage;
