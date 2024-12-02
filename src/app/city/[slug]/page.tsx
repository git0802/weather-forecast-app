import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import { API_KEY } from "@/utils/urls";
import { formatDateTime, formatDateOnly, extractTime } from "@/utils/time";
import siteMetadata from "@/utils/siteMetaData";

import Image from "next/image";
import SunMoonTime from "@/components/SunMoon";
import HourlyForecast from "@/components/HourlyForecast";

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

async function getWeather(slug: string) {
  noStore();
  const res = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${slug}&days=1&aqi=no&alerts=no`
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const data = await getWeather(slug);

  if (!data) {
    return;
  }
  const formattedTime = new Date(data.current.last_updated).toISOString();

  return {
    title: `${data.location.name} | ${data.location.country} `,
    description: `Get the latest weather forecast for ${data.location.name}, ${data.location.country}. Explore current conditions, daily and hourly forecasts, climate details, and more. Stay informed with accurate and up-to-date weather information.`,
    keywords: [
      "weather",
      "weather forecast",
      `${data.location.name} local weather`,
      `${data.location.name} forecast`,
      `${data.location.name} daily forecast`,
      `${data.location.name} hourly forecast`,
      `${data.location.name} climate`,
      `${data.location.name} temperature`,
      `${data.location.name} humidity`,
      `${data.location.name} wind speed`,
      `${data.location.name} precipitation`,
      `${data.location.name} weather conditions`,
      `${data.location.name} meteorology`,
      `${data.location.name} weather updates`,
      `${data.location.name} weather information`,
      `${data.location.name} weather report`,
      `${data.location.name} sunrise and sunset times`,
    ],
    openGraph: {
      title: `${data.location.name} | ${data.location.country} `,
      description: `Get the latest weather forecast for ${data.location.name}, ${data.location.country}. Explore current conditions, daily and hourly forecasts, climate details, and more. Stay informed with accurate and up-to-date weather information.`,

      url: siteMetadata.siteUrl + "/city/" + slug,
      siteName: siteMetadata.title,

      locale: "en_US",
      type: "article",
      publishedTime: formattedTime,
      modifiedTime: formattedTime,
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.location.name} | ${data.location.country} `,
      description: `Get the latest weather forecast for ${data.location.name}, ${data.location.country}. Explore current conditions, daily and hourly forecasts, climate details, and more. Stay informed with accurate and up-to-date weather information.`,

      images: [siteMetadata.socialBanner],
    },
  };
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

export default async function Page(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  const data: WeatherData = await getWeather(slug); // forecast data

  const formattedDateTime = formatDateTime(data.location.localtime);

  const lastUpdateTime = formatDateTime(data.current.last_updated);

  const astro = data.forecast.forecastday[0].astro;

  const forecastDate = formatDateOnly(data.forecast.forecastday[0].date);
  const forecast = data.forecast.forecastday[0].day;
  const hourlyForecastData = data.forecast.forecastday[0].hour;

  // for google
  const formattedTime = new Date(data.current.last_updated).toISOString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: `${data.location.name} | ${data.location.country} `,
    description: `Get the latest weather forecast for ${data.location.name}, ${data.location.country}. Explore current conditions, daily and hourly forecasts, climate details, and more. Stay informed with accurate and up-to-date weather information.`,

    image: [siteMetadata.socialBanner],
    datePublished: formattedTime,
    dateModified: formattedTime,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="px-3 pt-2 ">
        <section className="w-full h-fit flex flex-col gap-2 mx-auto sm:max-w-[640px] lg:max-w-[1024px] lg:flex-row  lg:h-[29rem] xl:max-w-[1280px] xl:h-[30rem]">
          <div className="w-full h-fit p-4 border border-gray-300 dark:border-stone-700 rounded-md lg:h-full lg:w-[40rem] lg:p-5 xl:w-[56rem] lg:rounded-lg xl:rounded-xl">
            <div>
              <h2 className="text-xl font-semibold leading-8 sm:text-3xl xl:text-4xl ">
                {data.location.name}
              </h2>
              <div className="text-sm font-normal leading-tight opacity-90 sm:text-base sm:mt-1 xl:text-lg xl:mt-2">
                {data.location.region && (
                  <span>
                    {data.location.region}
                    {" | "}
                  </span>
                )}
                {data.location.country && <span>{data.location.country}</span>}
              </div>

              <h4 className="mt-5 text-sm font-semibold sm:text-base sm:mt-9 xl:text-lg">
                Current Weather
              </h4>
              <div className="text-xs font-normal opacity-90 leading-5 sm:text-sm  xl:text-base">
                {formattedDateTime}
              </div>

              <div className="flex my-8 items-center gap-4 sm:my-10 xl:gap-7">
                <img
                  width={100}
                  height={100}
                  src={`https:${data.current.condition.icon}`}
                  alt={data.current.condition.text}
                  className="w-24 h-24 sm:w-28 sm:h-28"
                />

                <div className=" flex flex-col justify-between gap-3 mr-2 xl:gap-4">
                  <div className="flex ">
                    <div>
                      <span className="text-4xl font-medium sm:text-5xl xl:text-6xl">
                        {data.current.temp_c}
                      </span>
                      <span className="text-sm ml-1 sm:text-base xl:text-lg">
                        &deg;C
                      </span>
                    </div>
                    <div className="border mx-3 border-gray-300 dark:border-stone-700 sm:mx-5 xl:mx-6"></div>
                    <div>
                      <span className="text-4xl font-medium sm:text-5xl  xl:text-6xl">
                        {data.current.temp_f}
                      </span>

                      <span className="text-sm ml-1 sm:text-base xl:text-lg">
                        &deg;F
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold sm:text-3xl">
                    {data.current.condition.text}
                  </div>
                </div>
              </div>
              <div className="flex gap-2  text-sm font-semibold sm:gap-3 sm:text-base xl:text-lg xl:gap-4">
                <p>Feels like :</p>

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
              <div className="mt-6 text-[11px] font-light opacity-85 lg:mt-10 ">
                <span>Last Updated : </span>
                <span> {lastUpdateTime}</span>
              </div>
            </div>
          </div>
          <SunMoonTime astro={astro} />
        </section>
        <section className="grid grid-cols-2 w-full h-fit gap-2 mt-2 sm:mx-auto sm:max-w-[640px] lg:max-w-[1024px]  sm:grid-cols-3 lg:grid-cols-6 xl:max-w-[1280px]">
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3 lg:h-44 lg:rounded-lg xl:rounded-xl">
            <Image
              width={90}
              height={90}
              className="w-16"
              src={data.current.is_day ? "/day.png" : "/night.png"}
              alt="day night icon"
            />

            <p className="text-base xl:text-lg">
              <span className="opacity-80">it&apos;s a </span>
              <span className="font-medium ">
                {data.current.is_day ? "Day" : "Night"}
              </span>
            </p>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3 lg:h-44 lg:rounded-lg xl:rounded-xl">
            <Image
              width={90}
              height={90}
              className="w-16"
              src="/humidity.png"
              alt="humidity icon"
            />
            <p className="text-base xl:text-lg">
              <span className="opacity-80">Humidity </span>
              <span className="font-medium">{data.current.humidity}&#37;</span>
            </p>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3 lg:h-44 lg:rounded-lg xl:rounded-xl">
            <Image
              width={90}
              height={90}
              className="w-16"
              src="/cloud.png"
              alt="cloud icon"
            />
            <p className="text-base xl:text-lg">
              <span className="opacity-80">Cloud </span>
              <span className="font-medium">{data.current.cloud}&#37;</span>
            </p>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3 lg:h-44 lg:rounded-lg xl:rounded-xl">
            <Image
              width={90}
              height={90}
              className="w-14 invert-[0.25] dark:invert-0"
              src="/wind-speed.png"
              alt="wind speed icon"
            />
            <div className="flex text-sm gap-1 xl:text-base xl:items-center xl:gap-2 ">
              <span className="opacity-80 w-11 text-center leading-4 xl:w-12">
                Wind Speed
              </span>
              <span className="font-medium text-xs xl:text-sm">
                <p>{data.current.wind_kph} km&#47;hr</p>
                <p>{data.current.wind_mph} miles&#47;hr</p>
              </span>
            </div>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3 lg:h-44 lg:rounded-lg xl:rounded-xl">
            <Image
              width={90}
              height={90}
              className="w-14 invert-[0.25] dark:invert-0"
              src="/wind-direction.png"
              alt="wind dir icon"
              style={{ transform: `rotate(${data.current.wind_degree}deg)` }}
            />
            <div className="text-xs text-center font-medium xl:text-sm">
              <span className="opacity-80">Wind dir </span>
              <span className="text-sm xl:text-base">
                {data.current.wind_dir} &#124;
              </span>
              <span className="text-sm xl:text-base">
                {" "}
                {data.current.wind_degree}&deg;
              </span>
              <div className="opacity-80">
                ({getFullWindDirection(data.current.wind_dir)})
              </div>
            </div>
          </div>
          <div className="h-52 border  border-gray-300 dark:border-stone-700 rounded-md flex flex-col items-center justify-center gap-3 lg:h-44 lg:rounded-lg xl:rounded-xl">
            <Image
              width={90}
              height={90}
              className="w-14"
              src="/visibility.png"
              alt="visibility icon"
            />
            <div className="flex text-sm items-center gap-2 xl:text-base">
              <span className="opacity-80">Visibility </span>
              <span className="font-medium">
                <p>{data.current.vis_km} km</p>
                <p>{data.current.vis_miles} miles</p>
              </span>
            </div>
          </div>
        </section>
        <h2 className="mt-5 mb-4 font-semibold sm:mx-auto sm:max-w-[640px] lg:max-w-[1024px] xl:max-w-[1280px] ">
          <span className="text-xl ">Forecast </span>
          <span className="text-base  opacity-80"> for {forecastDate}</span>
        </h2>
        <section className="grid grid-cols-1 gap-2 h-fit sm:mx-auto sm:max-w-[640px] sm:grid-cols-2 lg:max-w-[1024px] lg:grid-cols-4 xl:max-w-[1280px]">
          <div className="h-44 text-sm font-medium flex gap-3 flex-col justify-center items-center border border-gray-300 dark:border-stone-700 rounded-md lg:rounded-lg xl:rounded-xl lg:h-48 xl:text-base xl:h-52">
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
          <div className="h-44 text-sm font-medium flex gap-3 flex-col justify-center items-center border border-gray-300 dark:border-stone-700 rounded-md lg:rounded-lg xl:rounded-xl lg:h-48 xl:text-base xl:h-52">
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
          <div className="h-44 text-sm font-medium flex gap-3 flex-col justify-center items-center border border-gray-300 dark:border-stone-700 rounded-md lg:rounded-lg xl:rounded-xl lg:h-48 xl:text-base xl:h-52">
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

          <div className="h-44  flex pb-6 flex-col justify-center items-center border border-gray-300 dark:border-stone-700 rounded-md lg:rounded-lg xl:rounded-xl lg:h-48 xl:h-52 xl:pb-3">
            <img
              width={90}
              height={90}
              src={`https:${forecast.condition.icon}`}
              alt={forecast.condition.text}
              className="w-20 xl:w-24"
            />
            <p className="text-lg font-medium opacity-80 xl:text-xl">
              Conditions will be
            </p>
            <p className="text-xl leading-6 font-semibold xl:text-2xl xl:leading-10">
              {forecast.condition.text}
            </p>
          </div>
        </section>

        <h2 className="mt-5 mb-4 text-xl font-semibold mx-auto sm:max-w-[640px] lg:max-w-[1024px] xl:max-w-[1280px] ">
          Hourly Forecast
        </h2>
        <HourlyForecast
          hourlyForecastData={hourlyForecastData}
          currentTime={extractTime(formattedDateTime)}
        />
      </main>
    </>
  );
}
