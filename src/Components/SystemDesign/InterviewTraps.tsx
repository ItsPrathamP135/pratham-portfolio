import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import type { InterviewTrap } from "../../Type/systemDesignTopic";

const InterviewTraps = ({ traps }: { traps: InterviewTrap[] }) => {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-3">
      {traps.map((t, i) => (
        <div key={i} className={`rounded-lg border p-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <h4 className={`text-sm font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>{t.trap}</h4>
          <div className="space-y-2">
            <div className="flex gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <span className={darkMode ? "text-rose-400 font-medium" : "text-rose-600 font-medium"}>Wrong: </span>
                {t.wrongApproach} — {t.whyWrong}
              </p>
            </div>
            <div className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
              <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <span className={darkMode ? "text-teal-400 font-medium" : "text-teal-600 font-medium"}>Better: </span>
                {t.betterApproach}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewTraps;
