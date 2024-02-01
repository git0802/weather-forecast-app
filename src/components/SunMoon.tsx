import Image from "next/image";

interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
}

interface MoonPhaseImages {
  [key: string]: string;
}

interface SunMoonTimeProps {
  astro: Astro;
}

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
  // Function to calculate time difference , for sun
  function calculateSunTotalTimeDifference(start: string, end: string): string {
    if (start === "No sunrise" || end === "No sunset") {
      return "..                 ";
    }

    const startTime = new Date(`2000-01-01 ${start}`).getTime();
    const endTime = new Date(`2000-01-01 ${end}`).getTime();

    const timeDifference = endTime - startTime;
    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);

    return `${hours.toString().padStart(2, "0")} hr ${minutes
      .toString()
      .padStart(2, "0")} min`;
  }

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
      // Moonset today is on the next day
      totalMoonTime = moonsetTomorrow.getTime() - moonriseToday.getTime();
    } else {
      // Moonrise and moonset are on the same day
      totalMoonTime = moonsetToday.getTime() - moonriseToday.getTime();
    }

    const totalMoonHours = Math.floor(totalMoonTime / 3600000);
    const totalMoonMinutes = Math.floor((totalMoonTime % 3600000) / 60000);

    return `${totalMoonHours.toString().padStart(2, "0")} hr ${totalMoonMinutes
      .toString()
      .padStart(2, "0")} min`;
  }

  const sunriseToSunset = calculateSunTotalTimeDifference(
    astro.sunrise,
    astro.sunset
  );

  const moonriseToMoonset = calculateMoonTotalTimeDifference(
    astro.moonrise,
    astro.moonset
  );

  return (
    <section className="w-full h-fit p-4 border border-gray-300 dark:border-stone-700 rounded-md">
      <p className="text-[15px] font-semibold">Sun/Moon</p>
      <div className="">
        <div className="">
          <div className="flex justify-between mt-9">
            <div className="w-20 h-24 flex flex-col items-center justify-center">
              <Image width={25} height={25} src="/sunrise.svg" alt="sunrise" />
              <div className="text-sm opacity-80 mt-2">Sunrise</div>
              <div className="text-sm font-medium text-center">
                {astro.sunrise}
              </div>
            </div>
            <div className="flex flex-col items-center justify-end ">
              <div className="text-sm leading-4 opacity-80 mt-2">
                total time
              </div>
              <div className="text-sm font-medium pb-1">{sunriseToSunset}</div>
            </div>
            <div className="w-20 h-24 flex flex-col items-center justify-center">
              <Image width={25} height={25} src="/sunset.svg" alt="sunset" />
              <div className="text-sm opacity-80 mt-2">Sunset</div>
              <div className="text-sm font-medium text-center">
                {astro.sunset}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <div className="w-20 h-24 flex flex-col items-center justify-center">
              <Image width={25} height={25} src="/moonset.svg" alt="moonrise" />
              <div className="text-sm opacity-80 mt-2">Moonset</div>
              <div className="text-sm font-medium text-center ">
                {astro.moonset}
              </div>
            </div>
            <div className="flex flex-col items-center justify-end ">
              <div className="text-sm leading-4 opacity-80 mt-2">
                total time
              </div>
              <div className="text-sm font-medium text-center ">
                {moonriseToMoonset}
              </div>
            </div>
            <div className="w-20 h-24 flex flex-col items-center justify-center">
              <Image
                width={25}
                height={25}
                src="/moonrise.svg"
                alt="moonrise"
              />
              <div className="text-sm opacity-80 mt-2">Moonrise</div>
              <div className="text-sm font-medium text-center ">
                {astro.moonrise}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[30px]">
          <p className="text-[15px] font-semibold">Moon phase</p>
          <div className="flex items-center mt-3 ">
            <Image
              className="ml-1 w-[70px]"
              width={80}
              height={80}
              src={`/moon/${moonPhaseImages[astro.moon_phase]}`}
              alt="moon-icon"
            />
            <div className="ml-5 text-[17px]  opacity-95">
              {astro.moon_phase}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
