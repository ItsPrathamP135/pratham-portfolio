import { useTheme } from "../../Context/ThemeContext";
import type { ComparisonExample } from "../../Type/systemDesignTopic";

const labelColor: Record<string, { light: string; dark: string }> = {
  Functional: { light: "bg-blue-100 text-blue-700", dark: "bg-blue-500/15 text-blue-400" },
  "Non-Functional": { light: "bg-teal-100 text-teal-700", dark: "bg-teal-500/15 text-teal-400" },
  Vague: { light: "bg-rose-100 text-rose-700", dark: "bg-rose-500/15 text-rose-400" },
  Measurable: { light: "bg-teal-100 text-teal-700", dark: "bg-teal-500/15 text-teal-400" },
};

const ComparisonList = ({ items, title }: { items: ComparisonExample[]; title?: string }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`rounded-xl border overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      {title && (
        <div className={`px-4 py-2.5 text-xs font-semibold ${darkMode ? "bg-gray-900/60 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
          {title}
        </div>
      )}
      <div className="divide-y divide-gray-700/20">
        {items.map((item, i) => {
          const colors = labelColor[item.label] ?? { light: "bg-gray-100 text-gray-600", dark: "bg-gray-700 text-gray-300" };
          return (
            <div key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{item.statement}</span>
              <span
                className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded ${
                  darkMode ? colors.dark : colors.light
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparisonList;
