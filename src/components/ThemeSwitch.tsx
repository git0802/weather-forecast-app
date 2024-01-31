"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-4"></div>;

  if (resolvedTheme === "dark") {
    return (
      <FiSun
        className="mx-3 h-4 sm:h-5 lg:w-7"
        onClick={() => setTheme("light")}
      />
    );
  }

  if (resolvedTheme === "light") {
    return (
      <FiMoon
        className="mx-3 h-4 sm:h-5 lg:w-7"
        onClick={() => setTheme("dark")}
      />
    );
  }
}
