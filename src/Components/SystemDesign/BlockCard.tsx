import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTheme } from "../../Context/ThemeContext";
import type { SystemDesignBlock } from "../../Type/systemDesign";
import StatusBadge from "./StatusBadge";

interface BlockCardProps {
  categoryId: string;
  block: SystemDesignBlock;
}

const BlockCard = ({ categoryId, block }: BlockCardProps) => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/system-design/${categoryId}/${block.id}`)}
      className={`group flex items-center justify-between gap-4 cursor-pointer rounded-lg border px-4 py-3.5 transition-all duration-200 ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-teal-500/60"
          : "bg-white border-gray-200 hover:border-teal-500/60 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <span
          className={`shrink-0 text-xs font-semibold px-2 py-1 rounded ${
            darkMode ? "bg-gray-700 text-teal-400" : "bg-gray-100 text-teal-600"
          }`}
        >
          BLK {String(block.blockNumber).padStart(2, "0")}
        </span>
        <span
          className={`font-medium truncate ${darkMode ? "text-white" : "text-gray-800"}`}
        >
          {block.title}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <StatusBadge status={block.status} />
        <ChevronRight
          className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
            darkMode
              ? "text-gray-500 group-hover:text-teal-400"
              : "text-gray-400 group-hover:text-teal-500"
          }`}
        />
      </div>
    </div>
  );
};

export default BlockCard;
