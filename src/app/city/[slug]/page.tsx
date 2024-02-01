import { unstable_noStore as noStore } from "next/cache";

import { API_KEY } from "@/utils/urls";
import { formatDateTime, formatDateOnly, extractTime } from "@/utils/time";

import styles from "./page.module.css";
import Image from "next/image";
import SunMoonTime from "@/components/SunMoon";

type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        maxwind_mph: number;
        maxwind_kph: number;
        avgvis_km: number;
        avgvis_miles: number;
        avghumidity: number;
        daily_will_it_rain: number;
        daily_chance_of_rain: number;
        daily_will_it_snow: number;
        daily_chance_of_snow: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
      };
      hour: Array<{
        time_epoch: number;
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        snow_cm: number;
        humidity: number;
      }>;
    }>;
  };
};

// data fetching

export async function getWeather(slug: string) {
  // noStore();
  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${slug}&days=1&aqi=no&alerts=no`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Type for wind direction map
type WindDirectionMap = {
  [key: string]: string;
};

// Direction map
const windDirectionMap: WindDirectionMap = {
  N: "North",
  NNE: "North-Northeast",
  NE: "Northeast",
  ENE: "East-Northeast",
  E: "East",
  ESE: "East-Southeast",
  SE: "Southeast",
  SSE: "South-Southeast",
  S: "South",
  SSW: "South-Southwest",
  SW: "Southwest",
  WSW: "West-Southwest",
  W: "West",
  WNW: "West-Northwest",
  NW: "Northwest",
  NNW: "North-Northwest",
};

// Function to get full wind direction
function getFullWindDirection(abbreviation: string): string {
  return windDirectionMap[abbreviation] || abbreviation;
}

// page

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data: WeatherData = await getWeather(slug);

  const formattedDateTime = formatDateTime(data.location.localtime);

  const lastUpdateTime = formatDateTime(data.current.last_updated);

  const astro = data.forecast.forecastday[0].astro;

  const forecastDate = formatDateOnly(data.forecast.forecastday[0].date);
  const forecast = data.forecast.forecastday[0].day;
  const hourlyForecastData = data.forecast.forecastday[0].hour;

  // for google
  const formattedTime = new Date(data.current.last_updated).toISOString();

  return (
    <>
      <main className="px-3 pt-2">
        <section className="w-full h-fit flex flex-col gap-2 ">
          <div className="w-full h-fit p-4 border border-gray-300 dark:border-stone-700 rounded-md">
            <div>
              <h2 className="text-xl font-semibold leading-8">
                {data.location.name}
              </h2>
              <div className="text-sm font-normal leading-tight opacity-90">
                {data.location.region && (
                  <span>
                    {data.location.region}
                    {" | "}
                  </span>
                )}
                {data.location.country && <span>{data.location.country}</span>}
              </div>

              <h4 className="mt-5 text-sm font-semibold">Current Weather</h4>
              <div className="text-xs font-normal opacity-90 leading-5">
                {formattedDateTime}
              </div>

              <div className="flex my-8 items-center gap-4">
                <Image
                  width={100}
                  height={100}
                  src={`https:${data.current.condition.icon}`}
                  alt={data.current.condition.text}
                  className="w-24"
                />

                <div className=" flex flex-col justify-between gap-3 mr-2">
                  <div className="flex ">
                    <div>
                      <span className="text-4xl">{data.current.temp_c}</span>
                      <span className="text-sm">&deg;C</span>
                    </div>
                    <div className="border mx-3  border-gray-300 dark:border-stone-700"></div>
                    <div>
                      <span className="text-4xl">{data.current.temp_f}</span>

                      <span className="text-sm">&deg;F</span>
                    </div>
                  </div>
                  <div className="text-2xl font-medium">
                    {data.current.condition.text}
                  </div>
                </div>
              </div>
              <div className="flex gap-2  text-sm font-semibold">
                <p className="">Feels like :</p>

                <p>
                  <span className="opacity-85">{data.current.feelslike_c}</span>
                  <span className="text-xs font-light ml-1">&deg;C</span>
                </p>
                <div className="border my-1 mx-1  border-gray-300 dark:border-stone-700"></div>
                <p>
                  <span className="opacity-85">{data.current.feelslike_f}</span>

                  <span className="text-xs font-light ml-1">&deg;F</span>
                </p>
              </div>
              <div className="mt-6 text-[11px] font-light opacity-85">
                <span>Last Updated : </span>
                <span> {lastUpdateTime}</span>
              </div>
            </div>
          </div>
          <SunMoonTime astro={astro} />
        </section>
        <section className="grid grid-cols-2 w-full h-fit gap-2 mt-2">
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3">
            <Image
              width={90}
              height={90}
              className="w-16"
              src={data.current.is_day ? "/day.png" : "/night.png"}
              alt="day night icon"
            />

            <p className="text-base">
              <span className="opacity-80">it&apos;s a </span>
              <span className="font-medium">
                {data.current.is_day ? "Day" : "Night"}
              </span>
            </p>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3">
            <Image
              width={90}
              height={90}
              className="w-16"
              src="/humidity.png"
              alt="humidity icon"
            />
            <p className="text-base">
              <span className="opacity-80">Humidity </span>
              <span className="font-medium">{data.current.humidity}&#37;</span>
            </p>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3">
            <Image
              width={90}
              height={90}
              className="w-16"
              src="/cloud.png"
              alt="cloud icon"
            />
            <p className="text-base">
              <span className="opacity-80">Cloud </span>
              <span className="font-medium">{data.current.cloud}&#37;</span>
            </p>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3">
            <Image
              width={90}
              height={90}
              className="w-14 invert-[0.25] dark:invert-"
              src="/wind-speed.png"
              alt="wind speed icon"
            />
            <div className="flex text-sm gap-1 ">
              <span className="opacity-80 w-11 text-center leading-4">
                Wind Speed
              </span>
              <span className="font-medium text-xs">
                <p>{data.current.wind_kph} km&#47;hr</p>
                <p>{data.current.wind_mph} miles&#47;hr</p>
              </span>
            </div>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3">
            <Image
              width={90}
              height={90}
              className="w-14 invert-[0.25] dark:invert-0"
              src="/wind-direction.png"
              alt="wind dir icon"
              style={{ transform: `rotate(${data.current.wind_degree}deg)` }}
            />
            <div className="text-xs text-center font-medium">
              <span className="opacity-80">Wind dir </span>
              <span className="text-sm">{data.current.wind_dir} &#124;</span>
              <span className="text-sm"> {data.current.wind_degree}&deg;</span>
              <div className="opacity-80">
                ({getFullWindDirection(data.current.wind_dir)})
              </div>
            </div>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3">
            <Image
              width={90}
              height={90}
              className="w-14"
              src="/visibility.png"
              alt="visibility icon"
            />
            <div className="flex text-sm items-center gap-2 ">
              <span className="opacity-80">Visibility </span>
              <span className="font-medium">
                <p>{data.current.vis_km} km</p>
                <p>{data.current.vis_miles} miles</p>
              </span>
            </div>
          </div>
        </section>
        <h2 className="mt-5 mb-4 font-semibold">
          <span className="text-xl ">Forecast </span>
          <span className="text-base  opacity-80"> for {forecastDate}</span>
        </h2>
        <section className="grid grid-cols-1 gap-2 h-fit">
          <div className="h-44 text-sm font-medium flex gap-3 flex-col justify-center items-center border border-gray-300 dark:border-stone-700 rounded-md">
            <div>
              <span className="opacity-80">Max temp today &#58; </span>
              <span className="ml-1">
                <span> {forecast.maxtemp_c} </span>
                <span className="text-xs">&deg;C</span>
                <span className=" border border-gray-300 dark:border-stone-700 mr-1 ml-2"></span>
                <span> {forecast.maxtemp_f} </span>
                <span className="text-xs">&deg;F</span>
              </span>
            </div>
            <div>
              <span className="opacity-80">Min temp today &#58; </span>
              <span className="ml-1">
                <span> {forecast.mintemp_c} </span>
                <span className="text-xs">&deg;C</span>
                <span className=" border border-gray-300 dark:border-stone-700 mr-1 ml-2"></span>
                <span> {forecast.mintemp_f} </span>
                <span className="text-xs">&deg;F</span>
              </span>
            </div>
            <div>
              <span className="opacity-80">Avg temp today &#58; </span>
              <span className="ml-1">
                <span> {forecast.avgtemp_c} </span>
                <span className="text-xs">&deg;C</span>
                <span className=" border border-gray-300 dark:border-stone-700 mr-1 ml-2"></span>
                <span> {forecast.avgtemp_f} </span>
                <span className="text-xs">&deg;F</span>
              </span>
            </div>
          </div>
          <div className="h-44 text-sm font-medium flex gap-3 flex-col justify-center items-center border border-gray-300 dark:border-stone-700 rounded-md">
            <div className="flex items-center gap-3">
              <span className="opacity-80">Max wind speed &#58; </span>
              <span className="text-xs ">
                <p>{forecast.maxwind_kph} km&#47;hr</p>
                <p>{forecast.maxwind_mph} miles&#47;hr</p>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="opacity-80">Average visibility &#58; </span>
              <span className="text-xs">
                <p>{forecast.avgvis_km} km</p>
                <p>{forecast.avgvis_miles} miles</p>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="opacity-80">Average humidity &#58; </span>
              <span className="text-xs">{forecast.avghumidity} &#37;</span>
            </div>
          </div>
          <div className="h-44 text-sm font-medium flex gap-3 flex-col justify-center items-center border border-gray-300 dark:border-stone-700 rounded-md">
            <div>
              <div className="mb-1">
                <span className="opacity-80 mr-1">
                  Will it Rain today &#58;{" "}
                </span>
                <span>{forecast.daily_will_it_rain ? "Yes" : "No"}</span>
              </div>
              <div>
                <span className="opacity-80 mr-1">Chance of rain &#58; </span>
                <span>{forecast.daily_chance_of_rain} &#37;</span>
              </div>
            </div>
            <div>
              <div className="mb-1">
                <span className="opacity-80 mr-1">
                  Will it Snow today &#58;{" "}
                </span>
                <span>{forecast.daily_will_it_snow ? "Yes" : "No"}</span>
              </div>
              <div>
                <span className="opacity-80 mr-1">Chance of Snow &#58; </span>
                <span>{forecast.daily_chance_of_snow} &#37;</span>
              </div>
            </div>
          </div>

          <div className="h-44  flex pb-6 flex-col justify-center items-center border border-gray-300 dark:border-stone-700 rounded-md">
            <Image
              width={90}
              height={90}
              src={`https:${forecast.condition.icon}`}
              alt={forecast.condition.text}
              className="w-20"
            />
            <p className="text-lg font-medium opacity-80">Conditions will be</p>
            <p className="text-xl leading-6 font-semibold">
              {forecast.condition.text}
            </p>
          </div>
        </section>

        <h2 className="mt-5 mb-4 text-xl font-semibold">Hourly Forecast</h2>
      </main>
    </>
  );
}
