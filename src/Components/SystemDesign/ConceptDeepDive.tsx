import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import type { DeepConcept } from "../../Type/systemDesignTopic";

const Row = ({ label, value }: { label: string; value: string }) => {
  const { darkMode } = useTheme();
  return (
    <div className="grid grid-cols-[110px_1fr] gap-3 py-1.5">
      <span className={`text-xs font-semibold uppercase tracking-wide pt-0.5 ${darkMode ? "text-teal-400" : "text-teal-600"}`}>
        {label}
      </span>
      <span className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{value}</span>
    </div>
  );
};

const ConceptDeepDive = ({ concepts }: { concepts: DeepConcept[] }) => {
  const { darkMode } = useTheme();
  const [openTerm, setOpenTerm] = useState<string | null>(concepts[0]?.term ?? null);

  return (
    <div className="space-y-2.5">
      {concepts.map((c) => {
        const isOpen = openTerm === c.term;
        return (
          <div
            key={c.term}
            className={`rounded-lg border overflow-hidden ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <button
              onClick={() => setOpenTerm(isOpen ? null : c.term)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
            >
              <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{c.term}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              />
            </button>
            {isOpen && (
              <div className={`px-4 pb-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <Row label="Simple" value={c.simpleDefinition} />
                <Row label="Interview" value={c.interviewDefinition} />
                <Row label="Why it matters" value={c.whyItMatters} />
                <Row label="Example" value={c.example} />
                <Row label="When it matters" value={c.whenItMatters} />
                <Row label="Common mistake" value={c.commonMistake} />
                <div className={`mt-2 rounded-md p-3 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
                  <p className={`text-xs font-semibold mb-1 ${darkMode ? "text-teal-400" : "text-teal-600"}`}>
                    Q: {c.interviewQuestion}
                  </p>
                  <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {c.interviewAnswer}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ConceptDeepDive;
