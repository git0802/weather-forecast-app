import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex grow items-center justify-center ">
      <div className="p-8 text-center ">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className=" font-light">
          Oops! The page you are looking for could not be found.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-sm bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
