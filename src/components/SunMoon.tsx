import Image from "next/image";

// defining the structure of astro object
interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
}

// defining the structure of moon phase images object
interface MoonPhaseImages {
  [key: string]: string;
}

// defining props received by SunMoonTime component
interface SunMoonTimeProps {
  astro: Astro; // Astro object containing sun and moon related data
}

// Object containing moon phase images mapped to their respective phases
const moonPhaseImages: MoonPhaseImages = {
  "New Moon": "new-moon.png",
  "Waxing Crescent": "waxing-crescent-moon.png",
  "First Quarter": "first-quarter-moon.png",
  "Waxing Gibbous": "waxing-gibbous-moon.png",
  "Full Moon": "full-moon.png",
  "Waning Gibbous": "waning-gibbous-moon.png",
  "Third Quarter": "last-quarter-moon.png",
  "Waning Crescent": "waning-crescent-moon.png",
  "Last Quarter": "last-quarter-moon.png",
};

export default function SunMoonTime({ astro }: SunMoonTimeProps) {
  // Function to calculate time difference for sunrise to sunset
  function calculateSunTotalTimeDifference(start: string, end: string): string {
    if (start === "No sunrise" || end === "No sunset") {
      // If no sunrise or sunset data is available, return this
      return "..";
    }

    // Calculate time difference between sunrise and sunset
    const startTime = new Date(`2000-01-01 ${start}`).getTime(); // Get the start time in milliseconds
    const endTime = new Date(`2000-01-01 ${end}`).getTime(); // Get the end time in milliseconds

    const timeDifference = endTime - startTime; // Calculate the time difference in milliseconds
    const hours = Math.floor(timeDifference / 3600000); // Convert milliseconds to hours
    const minutes = Math.floor((timeDifference % 3600000) / 60000); // Convert the remaining milliseconds to minutes

    // Return a formatted string representing the total time difference in hours and minutes
    // The `padStart` method is used to ensure that both hours and minutes are two digits long
    return `${hours.toString().padStart(2, "0")} hr ${minutes
      .toString()
      .padStart(2, "0")} min`;
  }

  // Function to calculate time difference for moonrise to moonset
  function calculateMoonTotalTimeDifference(
    moonrise: string,
    moonset: string
  ): string {
    if (moonrise === "No moonrise" || moonset === "No moonset") {
      return "..";
    }

    const moonriseToday = new Date(`2000-01-01 ${moonrise}`);
    const moonsetToday = new Date(`2000-01-01 ${moonset}`);
    const moonriseTomorrow = new Date(`2000-01-02 ${moonrise}`);
    const moonsetTomorrow = new Date(`2000-01-02 ${moonset}`);

    let totalMoonTime: number;

    // Check if moonset today is before moonrise today
    if (moonsetToday < moonriseToday) {
      // Moonset today is on the next day, calculate total time difference accordingly
      totalMoonTime = moonsetTomorrow.getTime() - moonriseToday.getTime();
    } else {
      // Moonrise and moonset are on the same day, calculate total time difference accordingly
      totalMoonTime = moonsetToday.getTime() - moonriseToday.getTime();
    }

    const totalMoonHours = Math.floor(totalMoonTime / 3600000);
    const totalMoonMinutes = Math.floor((totalMoonTime % 3600000) / 60000);

    return `${totalMoonHours.toString().padStart(2, "0")} hr ${totalMoonMinutes
      .toString()
      .padStart(2, "0")} min`;
  }

  // passing the data to this functions
  const sunriseToSunset = calculateSunTotalTimeDifference(
    astro.sunrise,
    astro.sunset
  );

  const moonriseToMoonset = calculateMoonTotalTimeDifference(
    astro.moonrise,
    astro.moonset
  );

  return (
    <section className="w-full h-fit text-sm lg:text-base p-4 border border-gray-300 dark:border-stone-700 rounded-md lg:h-full lg:p-5 lg:w-[24rem] lg:rounded-lg xl:rounded-xl">
      <p className="text-[15px] font-semibold lg:text-base">Sun/Moon</p>
      <div className=" sm:flex sm:gap-6 sm:items-center lg:block">
        <div className="sm:flex-1 ">
          <div className="flex justify-between mt-9 sm:mt-5 lg:mt-6">
            <div className="w-20 h-24 flex flex-col items-center justify-center">
              <Image
                width={30}
                height={30}
                src="/sunrise.svg"
                alt="sunrise"
                className="w-6 lg:w-7"
              />
              <div className=" opacity-80 mt-2 ">Sunrise</div>
              <div className=" font-medium text-center ">{astro.sunrise}</div>
            </div>
            <div className="flex flex-col items-center justify-end ">
              <div className=" leading-4 opacity-80 mt-2 ">total time</div>
              <div className=" font-medium pb-1">{sunriseToSunset}</div>
            </div>
            <div className="w-20 h-24 flex flex-col items-center justify-center">
              <Image
                width={30}
                height={30}
                src="/sunset.svg"
                alt="sunset"
                className="w-6 lg:w-7"
              />
              <div className=" opacity-80 mt-2 ">Sunset</div>
              <div className=" font-medium text-center ">{astro.sunset}</div>
            </div>
          </div>

          <div className="flex justify-between mt-10 sm:mt-6 sm:mb-12">
            <div className="w-20 h-24 flex flex-col items-center justify-center">
              <Image
                width={30}
                height={30}
                src="/moonset.svg"
                alt="moonrise"
                className="w-6 lg:w-7"
              />
              <div className=" opacity-80 mt-2">Moonset</div>
              <div className=" font-medium text-center ">{astro.moonset}</div>
            </div>
            <div className="flex flex-col items-center justify-end ">
              <div className=" leading-4 opacity-80 mt-2">total time</div>
              <div className=" font-medium text-center ">
                {moonriseToMoonset}
              </div>
            </div>
            <div className="w-20 h-24 flex flex-col items-center justify-center">
              <Image
                width={30}
                height={30}
                src="/moonrise.svg"
                alt="moonrise"
                className="w-6 lg:w-7"
              />
              <div className=" opacity-80 mt-2">Moonrise</div>
              <div className=" font-medium text-center ">{astro.moonrise}</div>
            </div>
          </div>
        </div>

        <div className="mt-[30px] sm:flex-1 sm:mt-0 sm:mb-6">
          <p className="text-[15px] font-semibold sm:pl-4 lg:text-base lg:pl-0">
            Moon phase
          </p>
          <div className="flex items-center mt-3 ">
            <img
              className="ml-1 w-[70px] lg:w-20"
              width={80}
              height={80}
              src={`/moon/${moonPhaseImages[astro.moon_phase]}`}
              alt="moon-icon"
            />
            <div className="ml-5 text-[17px]  opacity-95 lg:text-lg font-medium">
              {astro.moon_phase}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
