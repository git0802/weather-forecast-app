"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center text-notion-default_color"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <FiSun className="min-h-4 mr-2 sm:mr-3 sm:h-5 lg:w-7 dark:hidden" />
      <FiMoon className="hidden min-h-4 mr-2 sm:mr-3 sm:h-5 lg:w-7 dark:block" />
    </button>
  );
}
