import { useTheme } from "../../Context/ThemeContext";
import type { QuantitativeRow, SystemBreakdown } from "../../Type/systemDesignTopic";

export const SystemBreakdownGrid = ({ systems }: { systems: SystemBreakdown[] }) => {
  const { darkMode } = useTheme();

  const Col = ({ title, items }: { title: string; items: string[] }) => (
    <div>
      <p className={`text-[11px] font-semibold uppercase tracking-wide mb-1.5 ${darkMode ? "text-teal-400" : "text-teal-600"}`}>
        {title}
      </p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className={`text-xs leading-relaxed pl-2.5 relative ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-teal-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {systems.map((s) => (
        <div key={s.system} className={`rounded-lg border p-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <h4 className={`text-sm font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>{s.system}</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Col title="Functional" items={s.functional} />
            <Col title="Non-Functional" items={s.nonFunctional} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Col title="Constraints" items={s.constraints} />
            <Col title="Priorities" items={s.priorities} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const QuantitativeReference = ({ title, rows }: { title: string; rows: QuantitativeRow[] }) => {
  const { darkMode } = useTheme();
  return (
    <div className={`rounded-lg border overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
      <div className={`px-4 py-2.5 text-xs font-semibold ${darkMode ? "bg-gray-900/60 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
        {title}
      </div>
      <div className="divide-y divide-gray-700/20">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3 px-4 py-2">
            <span className={`text-sm font-semibold ${darkMode ? "text-teal-400" : "text-teal-600"}`}>{r.label}</span>
            <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{r.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
