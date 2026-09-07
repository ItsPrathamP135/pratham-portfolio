/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scale } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import type { TradeOffItem } from "../../Type/systemDesignTopic";

const TradeOffs = ({ items }: { items: TradeOffItem[] }) => {
  const { darkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className={`rounded-lg border p-4 ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-teal-500 shrink-0" />
            <h4 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
              {item.label}
            </h4>
          </div>
          <ul className="space-y-1.5">
            {item.points.map((point: any, i: any) => (
              <li
                key={i}
                className={`text-sm leading-relaxed pl-3 relative ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-teal-500" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TradeOffs;
