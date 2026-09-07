import { useState } from "react";
import { ChevronDown, Mic } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import type { InterviewQuestionGroup } from "../../Type/systemDesignTopic";

const levelStyles: Record<string, { light: string; dark: string }> = {
  Basic: { light: "bg-teal-100 text-teal-700", dark: "bg-teal-500/15 text-teal-400" },
  Intermediate: { light: "bg-blue-100 text-blue-700", dark: "bg-blue-500/15 text-blue-400" },
  Advanced: { light: "bg-purple-100 text-purple-700", dark: "bg-purple-500/15 text-purple-400" },
  Scenario: { light: "bg-orange-100 text-orange-700", dark: "bg-orange-500/15 text-orange-400" },
  "Follow-up": { light: "bg-amber-100 text-amber-700", dark: "bg-amber-500/15 text-amber-400" },
};
const fallbackStyle = { light: "bg-gray-100 text-gray-600", dark: "bg-gray-700 text-gray-300" };

const InterviewQuestions = ({ groups }: { groups: InterviewQuestionGroup[] }) => {
  const { darkMode } = useTheme();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      <div className={`flex items-center gap-2 mb-5`}>
        <Mic className="w-4 h-4 text-teal-500" />
        <h3 className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
          Interview Questions
        </h3>
      </div>

      <div className="space-y-6">
        {groups.map((group) => {
          const badge = levelStyles[group.level] ?? fallbackStyle;
          return (
            <div key={group.level}>
              <span
                className={`inline-block px-2.5 py-0.5 rounded text-xs font-semibold tracking-wide mb-3 ${
                  darkMode ? badge.dark : badge.light
                }`}
              >
                {group.level.toUpperCase()}
              </span>
              <div className="space-y-2">
                {group.questions.map((q) => {
                  const isOpen = openId === q.id;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-lg border overflow-hidden ${
                        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => setOpenId(isOpen ? null : q.id)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                      >
                        <span className={`text-sm font-medium ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                          {q.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          } ${darkMode ? "text-gray-500" : "text-gray-400"}`}
                        />
                      </button>
                      {isOpen && (
                        <div
                          className={`px-4 pb-3.5 text-sm leading-relaxed ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {q.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewQuestions;