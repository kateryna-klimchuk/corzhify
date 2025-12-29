import { Icon } from "~/components/Icon/Icon";
import { useTheme } from "~/contexts/ThemeContext";

export const ThemeToggle: React.FunctionComponent = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-orange-200/80 dark:hover:bg-gray-700 transition-all"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Icon.Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Icon.Moon className="h-5 w-5 text-slate-600" />
      )}
    </button>
  );
};
