import ProgressBar from "@/components/ProgressBar";

export default function Loading() {
  return (
    <>
      <ProgressBar />
      <main className="animate-pulse px-3 pt-2 ">
        <section className="w-full h-fit flex flex-col gap-2 mx-auto sm:max-w-[640px] lg:max-w-[1024px] lg:flex-row  lg:h-[29rem] xl:max-w-[1280px] xl:h-[30rem]">
          <div className="h-[22.75rem] sm:h-[27.156rem] bg-gray-300 dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md lg:h-full lg:w-[40rem]  xl:w-[56rem] lg:rounded-lg xl:rounded-xl"></div>
          <div className="h-[28.375rem] sm:h-[21.125rem] bg-gray-300 dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md lg:h-full lg:w-[24rem]  lg:rounded-lg xl:rounded-xl"></div>
        </section>
        <section className="grid grid-cols-2 w-full h-fit gap-2 mt-2 sm:mx-auto sm:max-w-[640px] lg:max-w-[1024px]  sm:grid-cols-3 lg:grid-cols-6 xl:max-w-[1280px]">
          <div className="h-52 border bg-gray-300 dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-md lg:h-44 lg:rounded-lg xl:rounded-xl"></div>
          <div className="h-52 border bg-gray-300 dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-md lg:h-44 lg:rounded-lg xl:rounded-xl"></div>
          <div className="h-52 border bg-gray-300 dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-md lg:h-44 lg:rounded-lg xl:rounded-xl"></div>
          <div className="h-52 border bg-gray-300 dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-md lg:h-44 lg:rounded-lg xl:rounded-xl"></div>
          <div className="h-52 border bg-gray-300 dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-md lg:h-44 lg:rounded-lg xl:rounded-xl"></div>
          <div className="h-52 border bg-gray-300 dark:bg-stone-800 border-gray-300 dark:border-stone-700 rounded-md lg:h-44 lg:rounded-lg xl:rounded-xl"></div>
        </section>
        <h2 className="text-xl mt-5 mb-4 font-semibold sm:mx-auto sm:max-w-[640px] lg:max-w-[1024px] xl:max-w-[1280px] ">
          Forecast for
        </h2>
        <section className="grid grid-cols-1 gap-2 h-fit sm:mx-auto sm:max-w-[640px] sm:grid-cols-2 lg:max-w-[1024px] lg:grid-cols-4 xl:max-w-[1280px]">
          <div className="h-44 bg-gray-300 dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md lg:rounded-lg xl:rounded-xl lg:h-48 xl:text-base xl:h-52"></div>
          <div className="h-44 bg-gray-300 dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md lg:rounded-lg xl:rounded-xl lg:h-48 xl:text-base xl:h-52"></div>
          <div className="h-44 bg-gray-300 dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md lg:rounded-lg xl:rounded-xl lg:h-48 xl:text-base xl:h-52"></div>
          <div className="h-44 bg-gray-300 dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md lg:rounded-lg xl:rounded-xl lg:h-48 xl:text-base xl:h-52"></div>
        </section>
        <h2 className="mt-5 mb-4 text-xl font-semibold mx-auto sm:max-w-[640px] lg:max-w-[1024px] xl:max-w-[1280px] ">
          Hourly Forecast{" "}
        </h2>
        <section className="mt-4  w-full h-auto overflow-x-auto whitespace-nowrap pb-2 sm:max-w-[640px] sm:mx-auto lg:max-w-[1024px] xl:max-w-[1280px] ">
          <div className="inline-flex w-auto gap-2 ">
            <div className="w-44 h-80 bg-gray-300 dark:bg-stone-800 border rounded-md lg:rounded-lg xl:rounded-xl border-gray-300 dark:border-stone-700 "></div>
            <div className="w-44 h-80 bg-gray-300 dark:bg-stone-800 border rounded-md lg:rounded-lg xl:rounded-xl border-gray-300 dark:border-stone-700 "></div>
            <div className="w-44 h-80 bg-gray-300 dark:bg-stone-800 border rounded-md lg:rounded-lg xl:rounded-xl border-gray-300 dark:border-stone-700 "></div>
            <div className="w-44 h-80 bg-gray-300 dark:bg-stone-800 border rounded-md lg:rounded-lg xl:rounded-xl border-gray-300 dark:border-stone-700 "></div>
            <div className="w-44 h-80 bg-gray-300 dark:bg-stone-800 border rounded-md lg:rounded-lg xl:rounded-xl border-gray-300 dark:border-stone-700 "></div>
            <div className="w-44 h-80 bg-gray-300 dark:bg-stone-800 border rounded-md lg:rounded-lg xl:rounded-xl border-gray-300 dark:border-stone-700 "></div>
            <div className="w-44 h-80 bg-gray-300 dark:bg-stone-800 border rounded-md lg:rounded-lg xl:rounded-xl border-gray-300 dark:border-stone-700 "></div>
          </div>
        </section>
      </main>
    </>
  );
}
