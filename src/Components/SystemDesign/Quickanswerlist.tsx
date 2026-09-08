import { useTheme } from "../../Context/ThemeContext";

interface QA {
  question: string;
  answer: string;
}

const QuickAnswerList = ({ items }: { items: QA[] }) => {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-2.5">
      {items.map((qa, i) => (
        <div
          key={i}
          className={`rounded-lg border p-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <p className={`text-sm font-semibold mb-1 ${darkMode ? "text-teal-400" : "text-teal-600"}`}>{qa.question}</p>
          <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{qa.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickAnswerList;