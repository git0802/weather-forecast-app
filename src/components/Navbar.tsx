"use client";

import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { API_KEY } from "@/utils/urls";

import { TfiClose, TfiSearch } from "react-icons/tfi";
import { CiLocationArrow1 } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";

// interface for Search Result
interface SearchResult {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
}

export default function Navbar() {
  // Refs for managing focus on search input and clicking on the first result link
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const firstResultLinkRef = useRef<HTMLAnchorElement | null>(null);

  // for managing search input value, search results, and whether to show results
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // for handling key events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        // Effect for handling key events (
        searchInputRef.current?.focus();
      } else if (e.key === "Enter" && data.length > 0) {
        e.preventDefault();
        // Check if firstResultLinkRef is not null before clicking
        if (firstResultLinkRef.current) {
          // Click on the first result link when "Enter" key is pressed
          firstResultLinkRef.current.click();
        }
      }
    };

    // Add event listener for keydown even
    window.addEventListener("keydown", handleKeyPress);

    // Clean up the event listener when the component unmounts or data changes
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [data]);

  //  for updating search input value and showing/hiding results
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowResults(e.target.value.length >= 3); // Show results only when input length is >= 3 characters
  };

  // for clearing the search input and hiding results
  const handleClearSearch = () => {
    setSearch("");
    setData([]); // Reset the data state to an empty array
    setShowResults(false); // Hide the search results
  };

  // fetches data from the weather API based on the search input
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${search}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData: SearchResult[] = await res.json(); // Parse and set the response data to the state
        setData(responseData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    // Check if the trimmed search input has at least three characters, then fetch the data
    if (search.trim().length >= 3) {
      fetchData();
    }
  }, [search]);

  return (
    <div className=" z-20 sticky top-0 h-12  bg-teal-800 px-3 ">
      <nav className="h-full m-auto flex items-center justify-between  sm:max-w-[640px] lg:max-w-[1024px] xl:max-w-[1280px]">
        <div className="w-full flex justify-between items-center">
          <Link
            href="/"
            className="text-sm text-white font-bold leading-4 sm:text-base lg:text-xl lg:font-extrabold"
          >
            Weather Forecast
          </Link>
          {/* <ThemeSwitch /> */}
        </div>

        <div className="relative">
          <div className="w-52 h-10 rounded-md overflow-hidden flex justify-between items-center bg-gray-100  sm:w-72 lg:w-96 p-2">
            <input
              className="h-full w-32 outline-hidden rounded-md bg-inherit text-xs p-2 sm:w-52 sm:text-sm lg:w-[306px]"
              type="text"
              placeholder="Search for location"
              value={search}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                // Check if the released key is Backspace and the search input is empty
                if (e.key === "Backspace" && search === "") {
                  // If true, hide the search results
                  setShowResults(false);
                }
              }}
              ref={searchInputRef}
            />
            {search && ( // Only render the button if the search is not empty
              <button className="cursor-pointer w-8 h-8 bg-teal-100 ml-4 rounded-ful hover:bg-teal-500 rounded-full  transition-colors ease-in-out duration-300 flex items-center justify-center">
                <TfiClose
                  className="w-full h-4"
                  onClick={() => {
                    handleClearSearch(); // Clear the search bar and hide search options
                  }}
                />
              </button>
            )}

            <button className="cursor-pointer w-8 h-8 bg-teal-300 rounded-full transition-colors ease-in-out duration-300 flex items-center justify-center">
              <TfiSearch
                className="w-full h-4"
                onClick={() => {
                  if (data.length > 0 && firstResultLinkRef.current) {
                    //  if there are search results and if the firstResultLinkRef is available
                    firstResultLinkRef.current.click(); // Click on the first result link when the search icon is clicked
                  }
                }}
              />
            </button>
          </div>
          {showResults && ( // when showResults is true
            <ul className="absolute mt-2 h-fit w-full rounded-md overflow-hidden bg-teal-50">
              {data.map((result, index) => (
                <li key={result.id}>
                  <Link
                    href={`/city/${result.name}`}
                    ref={index === 0 ? firstResultLinkRef : null}
                    className="px-3 py-2  flex justify-between items-center border-b-[1px] border-teal-300 dark:border-teal-600  hover:bg-teal-200 dark:hover:bg-teal-900 transition-colors ease-in-out duration-300 "
                    onClick={() => {
                      handleClearSearch(); // Clear the search bar and hide search options
                    }}
                  >
                    <div>
                      <h2 className="text-base leading-5">{result.name}</h2>
                      <p className="text-sm font-light opacity-80 leading-4 pt-1">
                        {result.region && (
                          <span>
                            {result.region}
                            {", "}
                          </span>
                        )}
                        {result.country && <span>{result.country}</span>}
                      </p>
                    </div>
                    <CiLocationArrow1 className="min-w-8 h-6" />{" "}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}
