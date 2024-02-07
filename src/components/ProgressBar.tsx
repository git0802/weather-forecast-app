"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        );
      }, 60);
      return () => {
        clearInterval(interval);
      };
    }
  }, [progress]);

  return (
    <div className="fixed top-12 left-0 w-full h-[3px] sm:h-1 ">
      <div
        className="h-full bg-black dark:bg-white transition-all duration-100 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
