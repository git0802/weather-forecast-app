export function formatDateTime(dateTimeString) {
  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = new Date(dateTimeString);
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${formattedTime}, ${day} ${month} ${year}`;
}

export function formatDateOnly(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

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
