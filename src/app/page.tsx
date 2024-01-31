import Image from "next/image";

export default function Home() {
  return (
    <main className="m-auto px-3">
      <div className="w-full h-full flex flex-col items-center ">
        <Image
          width={400}
          height={400}
          className="w-56 lg:w-80 xl:w-96"
          src="/earth.webp"
          alt="earth"
          priority
        />

        <h1 className="text-center mt-5 text-3xl font-semibold lg:text-4xl xl:text-5xl">
          Hey there!
        </h1>
        <p className="text-center mt-5 pb-5 text-xl opacity-90 font-normal px-4 lg:text-2xl  xl:text-3xl">
          Curious about the weather in your city? Find out with a quick search!
        </p>
      </div>
    </main>
  );
}
