"use client";
import Image from "next/image";
import { extractTime } from "@/utils/time";
import { useEffect, useRef, useState } from "react";

type Hour = {
  time: string;
  condition: {
    icon: string;
    text: string;
  };
  temp_c: number;
  temp_f: number;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  wind_degree: number;
  // ... other properties
};

type HourlyForecastProps = {
  hourlyForecastData: Hour[];
  currentTime: string;
};

export default function HourlyForecast({
  hourlyForecastData,
  currentTime,
}: HourlyForecastProps) {
  const isAM = currentTime.includes("AM");
  const currentHour = parseInt(currentTime.split(":")[0]);

  // Find the index of the active hour
  const activeHourIndex = hourlyForecastData.findIndex((hour) => {
    const hourTime = extractTime(hour.time);
    const forecastHour = parseInt(hourTime.split(":")[0]);
    const forecastIsAM = hourTime.includes("AM");
    return currentHour === forecastHour && isAM === forecastIsAM;
  });

  // Ref for the container element
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the active hour on initial load
    const container = containerRef.current;

    if (container && activeHourIndex !== -1) {
      const cardWidth = 184; // Adjust this based on the actual width of your cards including gap
      const containerWidth = container.offsetWidth;
      const scrollPosition =
        activeHourIndex * cardWidth - containerWidth / 2 + cardWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth", // Add smooth scrolling animation
      });
    }
  }, [activeHourIndex]);

  return (
    <div
      className="mt-4 w-full h-auto overflow-x-auto whitespace-nowrap pb-2 scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100  dark:scrollbar-thumb-stone-400 dark:scrollbar-track-stone-800"
      ref={containerRef}
    >
      <div className="inline-flex w-auto gap-2 ">
        {hourlyForecastData.map((hour, index) => {
          const hourTime = extractTime(hour.time);

          return (
            <div
              className={`w-44 h-80 pt-2 px-5 flex flex-col  border rounded-md 
              ${
                index === activeHourIndex
                  ? "border-gray-500 dark:border-stone-300"
                  : " border-gray-300 dark:border-stone-700"
              } `}
              key={index}
            >
              <Image
                width={80}
                height={80}
                src={`https:${hour.condition.icon}`}
                alt="condition icon"
              />

              <div className="flex gap-2 mt-2 text-base font-semibold">
                <p>
                  <span>{hour.temp_c}</span>
                  <span className="text-xs font-medium">&deg;C</span>
                </p>
                <div className="border border-gray-300 dark:border-stone-700 rounded-md "></div>
                <p>
                  <span>{hour.temp_f}</span>

                  <span className="text-xs font-light">&deg;F</span>
                </p>
              </div>
              <div
                className={`mt-2 text-base  ${
                  index === activeHourIndex
                    ? "font-medium opacity-100"
                    : "opacity-90"
                } `}
              >
                {hour.condition.text}
              </div>

              <div className="text-sm flex items-center gap-1 mt-12">
                <Image
                  width={16}
                  height={16}
                  src="/drop.png"
                  alt="drop icon"
                  className="w-4 h-4 invert-[0.25] dark:invert-0"
                />

                <p> {hour.humidity}&#37;</p>
              </div>
              <div className="flex items-center gap-2 mt-3 text-xs ">
                <div>
                  <p>
                    {hour.wind_kph} <span>km/h</span>
                  </p>
                  <p>
                    {hour.wind_mph} <span>miles/h</span>
                  </p>
                </div>

                <Image
                  width={26}
                  height={26}
                  src="/wind-direction.png"
                  alt="dir arrow"
                  className="w-6 h-6 invert-[0.25] dark:invert-0"
                  style={{ transform: `rotate(${hour.wind_degree}deg)` }}
                />
              </div>
              <div
                className={`mt-5 h-full flex items-center justify-center border-t  ${
                  index === activeHourIndex
                    ? "border-gray-500 dark:border-stone-300"
                    : " border-gray-300 dark:border-stone-700"
                } `}
              >
                <p
                  className={`text-base  ${
                    index === activeHourIndex
                      ? "font-medium opacity-100"
                      : "opacity-90"
                  } `}
                >
                  {hourTime}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
