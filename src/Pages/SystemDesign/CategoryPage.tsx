import { useParams, useNavigate } from "react-router-dom";
import { CalendarClock, ArrowLeft } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import Breadcrumbs from "../../Components/SystemDesign/Breadcrumbs";
import BlockCard from "../../Components/SystemDesign/BlockCard";
import CircularProgress from "../../Components/SystemDesign/CircularProgress";
import { getCategoryById, getCategoryProgress } from "../../data/systemDesignData";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const category = categoryId ? getCategoryById(categoryId) : undefined;

  if (!category) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center">
          <p className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Category not found
          </p>
          <a
            onClick={() => navigate("/system-design")}
            className="cursor-pointer text-teal-500 hover:text-teal-400 font-medium"
          >
            ← Back to System Design
          </a>
        </div>
      </div>
    );
  }

  const { completed, total, percentage } = getCategoryProgress(category);

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: "System Design", path: "/system-design" },
            { label: category.name },
          ]}
        />

        <a
          onClick={() => navigate("/system-design")}
          className={`inline-flex items-center gap-1.5 text-sm mb-6 cursor-pointer transition-colors ${
            darkMode ? "text-gray-400 hover:text-teal-400" : "text-gray-500 hover:text-teal-500"
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All categories
        </a>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
              {category.name}
            </h1>
            <p className={`mt-2 max-w-xl text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {category.description}
            </p>
            <div className={`flex items-center gap-1.5 mt-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <CalendarClock className="w-4 h-4 text-teal-500" />
              <span>Target: {category.targetDate}</span>
            </div>
          </div>

          <div
            className={`flex items-center gap-4 rounded-xl border px-5 py-4 self-start ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <CircularProgress percentage={percentage} />
            <div>
              <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                {completed} / {total}
              </p>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>blocks done</p>
            </div>
          </div>
        </div>

        {/* Block list */}
        <div className="space-y-3">
          {category.blocks.map((b) => (
            <BlockCard key={b.id} categoryId={category.id} block={b} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
