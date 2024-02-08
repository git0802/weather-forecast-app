"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false); // State variable to track if the component has mounted
  const { setTheme, resolvedTheme } = useTheme(); // Using useTheme hook to get current theme and set theme

  useEffect(() => setMounted(true), []); // Using useEffect to set mounted state to true when component mounts

  if (!mounted)
    // If the component is not yet mounted, return an div to prevent layout shift
    return <div className="min-h-4 mr-2 sm:mr-3 sm:h-5 lg:w-7"></div>;

  if (resolvedTheme === "light") {
    // If the theme is light, then show the Sun icon
    return (
      <FiSun
        className=" min-h-4 mr-2 sm:mr-3 sm:h-5 lg:w-7 cursor-pointer"
        onClick={() => setTheme("dark")} // onClick handler to switch to dark theme when clicked
      />
    );
  }

  if (resolvedTheme === "dark") {
    // If the theme is dark, then show the Moon icon
    return (
      <FiMoon
        className="  min-h-4 mr-2 sm:mr-3 sm:h-5 lg:w-7 cursor-pointer"
        onClick={() => setTheme("light")} // onClick handler to switch to light theme when clicked
      />
    );
  }
}
