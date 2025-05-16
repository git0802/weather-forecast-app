import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-teal-800 text-white w-full text-xs font-light mt-6 lg:text-sm">
      <div className="flex justify-between py-4 px-4 m-auto sm:max-w-[640px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <p className="">&copy; 2025 GungXu. All rights reserved.</p>
        <Link
          href="https://lovebee.me"
          target="_blank"
          className="hover:text-purple-500  hover:underline transition ease-linear duration-200"
        >
          Made by git0802
        </Link>
      </div>
    </footer>
  );
}
