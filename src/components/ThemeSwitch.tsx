"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return <div className="min-h-4 mr-2 sm:mr-3 sm:h-5 lg:w-7"></div>;

  if (resolvedTheme === "dark") {
    return (
      <FiSun
        className=" min-h-4 mr-2 sm:mr-3 sm:h-5 lg:w-7"
        onClick={() => setTheme("light")}
      />
    );
  }

  if (resolvedTheme === "light") {
    return (
      <FiMoon
        className="  min-h-4 mr-2 sm:mr-3 sm:h-5 lg:w-7"
        onClick={() => setTheme("dark")}
      />
    );
  }
}
