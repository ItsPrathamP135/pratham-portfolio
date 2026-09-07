import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  path?: string; // omit on the last (current) crumb
}

const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <nav
      className="flex items-center flex-wrap gap-1 text-sm mb-4"
      aria-label="Breadcrumb"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1">
            {item.path && !isLast ? (
              <a
                onClick={() => navigate(item.path as string)}
                className={`cursor-pointer transition-colors ${
                  darkMode
                    ? "text-gray-400 hover:text-teal-400"
                    : "text-gray-500 hover:text-teal-500"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <span
                className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                {item.label}
              </span>
            )}
            {!isLast && (
              <ChevronRight
                className={`w-3.5 h-3.5 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
              />
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
