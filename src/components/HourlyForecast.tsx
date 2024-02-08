"use client";
import Image from "next/image";
import { extractTime } from "@/utils/time";
import { useEffect, useRef } from "react";

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
};

type HourlyForecastProps = {
  hourlyForecastData: Hour[];
  currentTime: string;
};

export default function HourlyForecast({
  hourlyForecastData,
  currentTime,
}: HourlyForecastProps) {
  const isAM = currentTime.includes("AM"); // Determine whether the current time is in AM or PM

  const currentHour = parseInt(currentTime.split(":")[0]); // Extract the hour from the current time

  // Find the Card Index of the active hour in the forecast data
  const activeHourIndex = hourlyForecastData.findIndex((hour) => {
    const hourTime = extractTime(hour.time); // Extract the hour from the forecast data
    const forecastHour = parseInt(hourTime.split(":")[0]); // Extract the hour part from the time string
    const forecastIsAM = hourTime.includes("AM"); // Check if the forecast time is in AM

    // Compare the extracted hour and AM/PM of the forecast data with the current hour and AM/PM
    return currentHour === forecastHour && isAM === forecastIsAM;
  });

  // Ref for the container element
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the active hour on initial load
  useEffect(() => {
    const container = containerRef.current;

    // if the container exists and the active hour index is valid
    if (container && activeHourIndex !== -1) {
      const cardWidth = 184; // Width of only one card
      const containerWidth = container.offsetWidth; // whole width of Container

      // Calculate the scroll position to center the active hour card
      // eg: 6 * 184 - 1280 / 2 + 184 / 2  , 1104 - 640 + 92 , 456 + 92 = 556
      // divide by / 2 bec of we want it in center
      const scrollPosition =
        activeHourIndex * cardWidth - containerWidth / 2 + cardWidth / 2;

      // Scroll to the calculated position with smooth animation
      container.scrollTo({
        left: scrollPosition, // scroll to the left
        behavior: "smooth", // smooth scrolling animation
      });
    }
  }, [activeHourIndex]); // Trigger whenever the active hour index changes

  return (
    <div
      className="mt-4 border-x rounded-md lg:rounded-lg xl:rounded-xl border-gray-300 dark:border-stone-700 w-full h-auto overflow-x-auto whitespace-nowrap pb-2 scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100  dark:scrollbar-thumb-stone-400 dark:scrollbar-track-stone-800  sm:max-w-[640px] sm:mx-auto lg:max-w-[1024px] xl:max-w-[1280px] "
      ref={containerRef} // ref for scrolling to the current hour card
    >
      <div className="inline-flex w-auto gap-2 ">
        {hourlyForecastData.map((hour, index) => {
          const hourTime = extractTime(hour.time);

          return (
            <div
              className={`w-44 h-80 pt-2 px-5 flex flex-col  border rounded-md lg:rounded-lg xl:rounded-xl
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
