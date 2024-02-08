"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState<number>(0); // to track the progress of the progress bar

  useEffect(() => {
    //  update progress until it reaches 100 %
    if (progress < 100) {
      // Set interval to increment progress every 60 milliseconds
      const interval = setInterval(() => {
        // Update progress state, ensuring it does not exceed 100%
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        );
      }, 60);

      // Clean up interval when component unmounts or progress reaches 100%
      return () => {
        clearInterval(interval);
      };
    }
  }, [progress]); // Re-run effect whenever progress state changes

  return (
    <div className="absolute top-12 left-0 w-full h-[3px] sm:h-1 ">
      <div
        className="h-full bg-black dark:bg-white transition-all duration-100 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
