import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CalendarClock, Sparkles, Zap } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import Breadcrumbs from "../../Components/SystemDesign/Breadcrumbs";
import StatusBadge from "../../Components/SystemDesign/StatusBadge";
import Visualization from "../../Components/SystemDesign/Visualization";
import TradeOffs from "../../Components/SystemDesign/TradeOffs";
import InterviewQuestions from "../../Components/SystemDesign/InterviewQuestions";
import TopicNavigation from "../../Components/SystemDesign/TopicNavigation";
import ConceptDeepDive from "../../Components/SystemDesign/ConceptDeepDive";
import ComparisonList from "../../Components/SystemDesign/ComparisonList";
import { SystemBreakdownGrid, QuantitativeReference } from "../../Components/SystemDesign/SystemBreakdownGrid";
import InterviewTraps from "../../Components/SystemDesign/InterviewTraps";
import { getAdjacentBlocks, getBlockById } from "../../data/systemDesignData";
import { getTopicContent } from "../../data/systemDesignTopics";
import { getTopicVisualization } from "../../data/systemDesignVisuals";

const SectionTitle = ({ children }: { children: string }) => {
  const { darkMode } = useTheme();
  return (
    <h3 className={`text-base font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
      {children}
    </h3>
  );
};

const TopicPage = () => {
  const { categoryId, blockId } = useParams<{ categoryId: string; blockId: string }>();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [quickRevision, setQuickRevision] = useState(false);

  const found = categoryId && blockId ? getBlockById(categoryId, blockId) : undefined;

  if (!found || !categoryId) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center">
          <p className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Topic not found
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

  const { category, block } = found;
  const content = getTopicContent(block.id);
  const visualization = getTopicVisualization(block.id);
  const { prev, next } = getAdjacentBlocks(categoryId, block.id);
  const targetDate = block.targetDate ?? category.targetDate;

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: "System Design", path: "/system-design" },
            { label: category.name, path: `/system-design/${category.id}` },
            { label: `BLK ${String(block.blockNumber).padStart(2, "0")}` },
          ]}
        />

        {/* Topic header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <p className={`text-xs font-semibold tracking-wide mb-1 ${darkMode ? "text-teal-400" : "text-teal-600"}`}>
              BLK {String(block.blockNumber).padStart(2, "0")}
            </p>
            <h1 className={`text-2xl sm:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
              {block.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <StatusBadge status={block.status} />
              <span className={`flex items-center gap-1.5 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <CalendarClock className="w-3.5 h-3.5" />
                Target: {targetDate}
              </span>
            </div>
          </div>

          {content && (
            <button
              onClick={() => setQuickRevision((v) => !v)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                quickRevision
                  ? "bg-teal-500 text-white"
                  : darkMode
                    ? "bg-gray-800 border border-gray-700 text-gray-300 hover:border-teal-500/60"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-teal-500/60"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              {quickRevision ? "Quick Revision: ON" : "Quick Revision"}
            </button>
          )}
        </div>

        {!content ? (
          <div
            className={`rounded-xl border border-dashed p-8 text-center ${
              darkMode ? "border-gray-700 text-gray-400" : "border-gray-300 text-gray-500"
            }`}
          >
            <p className="font-medium mb-1">Content not written yet</p>
            <p className="text-sm">
              Add an entry for <code className="px-1 py-0.5 rounded bg-black/10">{block.id}</code> in{" "}
              <code className="px-1 py-0.5 rounded bg-black/10">systemDesignTopics.ts</code> (and optionally{" "}
              <code className="px-1 py-0.5 rounded bg-black/10">systemDesignVisuals.ts</code>) — this page will
              pick it up automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* 1. Visualization — always shown, including in Quick Revision */}
            {visualization && (
              <section>
                <SectionTitle>Visualization</SectionTitle>
                <Visualization visualization={visualization} />
              </section>
            )}

            {quickRevision ? (
              <>
                {/* Quick Revision: Key Points instead of What/Why/How/When */}
                <section>
                  <SectionTitle>Key Points</SectionTitle>
                  <ul
                    className={`rounded-xl border p-5 space-y-2.5 ${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                  >
                    {content.keyTakeaways.map((point, i) => (
                      <li
                        key={i}
                        className={`text-sm leading-relaxed pl-3 relative ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-teal-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            ) : (
              <>
                {/* 2. WHAT */}
                <section>
                  <SectionTitle>What?</SectionTitle>
                  <div
                    className={`rounded-xl border p-5 space-y-3 text-sm leading-relaxed ${
                      darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"
                    }`}
                  >
                    {content.what.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {content.deepConcepts && (
                    <div className="mt-4">
                      <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        Concept-by-Concept
                      </p>
                      <ConceptDeepDive concepts={content.deepConcepts} />
                    </div>
                  )}

                  {content.frNfrExamples && (
                    <div className="mt-4">
                      <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        FR vs NFR — Examples
                      </p>
                      <ComparisonList items={content.frNfrExamples} />
                    </div>
                  )}

                  {content.quantitativeReference && (
                    <div className="mt-4">
                      <QuantitativeReference
                        title={content.quantitativeReference.title}
                        rows={content.quantitativeReference.rows}
                      />
                    </div>
                  )}

                  {content.systemBreakdowns && (
                    <div className="mt-4">
                      <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        Real System Examples
                      </p>
                      <SystemBreakdownGrid systems={content.systemBreakdowns} />
                    </div>
                  )}
                </section>

                {/* 3. WHY */}
                <section>
                  <SectionTitle>Why?</SectionTitle>
                  <div
                    className={`rounded-xl border p-5 space-y-3 text-sm leading-relaxed ${
                      darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-700"
                    }`}
                  >
                    {content.why.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>

                {/* 4. HOW */}
                <section>
                  <SectionTitle>How?</SectionTitle>
                  <div
                    className={`rounded-xl border p-5 ${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                  >
                    <ol className="space-y-3">
                      {content.how.map((step, i) => (
                        <li key={step.step} className="flex gap-3">
                          <span
                            className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                              darkMode ? "bg-teal-500/15 text-teal-400" : "bg-teal-100 text-teal-700"
                            }`}
                          >
                            {i + 1}
                          </span>
                          <div>
                            <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                              {step.step}
                            </span>
                            <p className={`text-sm leading-relaxed mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                              {step.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {content.interviewTraps && (
                    <div className="mt-4">
                      <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        Common Interview Traps
                      </p>
                      <InterviewTraps traps={content.interviewTraps} />
                    </div>
                  )}
                </section>

                {/* 5. WHEN */}
                <section>
                  <SectionTitle>When?</SectionTitle>
                  <div
                    className={`rounded-xl border p-5 ${
                      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                    }`}
                  >
                    <ul className="space-y-2">
                      {content.when.map((point, i) => (
                        <li
                          key={i}
                          className={`text-sm leading-relaxed pl-3 relative ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                        >
                          <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-teal-500" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </>
            )}

            {/* 6. TRADE-OFFS — shown in both modes */}
            <section>
              <SectionTitle>Trade-offs</SectionTitle>
              <TradeOffs items={content.tradeOffs} />
            </section>

            {/* 30-Second Interview Answer — highlighted */}
            <section
              className={`rounded-xl border-l-4 border-teal-500 p-5 ${
                darkMode ? "bg-teal-500/5" : "bg-teal-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-teal-500" />
                <h4 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                  30-Second Interview Answer
                </h4>
              </div>
              <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {content.thirtySecondAnswer}
              </p>
            </section>

            {content.secondaryAnswer && (
              <section
                className={`rounded-xl border-l-4 border-teal-500 p-5 ${
                  darkMode ? "bg-teal-500/5" : "bg-teal-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-teal-500" />
                  <h4 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {content.secondaryAnswer.question}
                  </h4>
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {content.secondaryAnswer.answer}
                </p>
              </section>
            )}

            {/* Key Takeaways — shown here in normal mode too (Quick Revision already showed it above as Key Points) */}
            {!quickRevision && (
              <section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <ul
                  className={`rounded-xl border p-5 space-y-2.5 ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  {content.keyTakeaways.map((point, i) => (
                    <li
                      key={i}
                      className={`text-sm leading-relaxed pl-3 relative ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-teal-500" />
                      {point}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 7. INTERVIEW QUESTIONS */}
            <section>
              <InterviewQuestions groups={content.interviewQuestions} />
            </section>
          </div>
        )}

        <TopicNavigation category={category} prev={prev} next={next} />
      </div>
    </div>
  );
};

export default TopicPage;
