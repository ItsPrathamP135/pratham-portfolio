import { useTheme } from "../../Context/ThemeContext";

interface CircularProgressProps {
  percentage: number; // 0-100
  size?: number; // px
  strokeWidth?: number;
}

const CircularProgress = ({
  percentage,
  size = 56,
  strokeWidth = 5,
}: CircularProgressProps) => {
  const { darkMode } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={darkMode ? "stroke-gray-700" : "stroke-gray-200"}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-teal-500 transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span
        className={`absolute text-xs font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}
      >
        {clamped}%
      </span>
    </div>
  );
};

export default CircularProgress;
