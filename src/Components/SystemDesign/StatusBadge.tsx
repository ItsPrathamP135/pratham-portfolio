import type { BlockStatus } from "../../Type/systemDesign";
import { useTheme } from "../../Context/ThemeContext";

const StatusBadge = ({ status }: { status: BlockStatus }) => {
  const { darkMode } = useTheme();

  const styles: Record<
    BlockStatus,
    { light: string; dark: string; label: string }
  > = {
    PENDING: {
      label: "PENDING",
      light: "bg-gray-100 text-gray-500",
      dark: "bg-gray-700 text-gray-300",
    },
    IN_PROGRESS: {
      label: "IN PROGRESS",
      light: "bg-amber-100 text-amber-700",
      dark: "bg-amber-500/15 text-amber-400",
    },
    COMPLETED: {
      label: "COMPLETED",
      light: "bg-teal-100 text-teal-700",
      dark: "bg-teal-500/15 text-teal-400",
    },
  };

  const s = styles[status];

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide ${
        darkMode ? s.dark : s.light
      }`}
    >
      {s.label}
    </span>
  );
};

export default StatusBadge;
