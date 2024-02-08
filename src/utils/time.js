// Function that formats Date & Time both
export function formatDateTime(dateTimeString) {
  // Options for formatting time using toLocaleTimeString
  const optionsTime = {
    hour: "numeric", // Display the hour (1-12)
    minute: "numeric", // Display the minute (0-59)
    hour12: true, // Use 12-hour clock format (true) or 24-hour clock format (false)
  };

  // Creating a new Date object from the provided dateTimeString
  const date = new Date(dateTimeString);

  // Formatting time using toLocaleTimeString with the specified options
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  // Extracting day, month, and year from the Date object

  const day = date.getDate(); // Get the day of the month (1-31)
  const month = date.toLocaleString("en-US", { month: "long" }); // Get the full name of the month
  const year = date.getFullYear(); // Get the year (4 digits)

  // Returning the formatted date and time string in the format "formattedTime, day month year"
  return `${formattedTime}, ${day} ${month} ${year}`;
}

// function that formats and shows Date only
export function formatDateOnly(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`; // this function used for only position of day, month, year like this
}

// function that only formats and show Time
export function extractTime(dateTimeString) {
  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateTimeString);
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  return formattedTime;
}
