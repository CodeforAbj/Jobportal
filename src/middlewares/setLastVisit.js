const setLastVisit = (req, res, next) => {
  // --- Refreshing the last visit holder -- //

  let date = formatDate(new Date());
  res.cookie("latestVisit", date);
  res.locals.lastVisit = req.cookies.lastVisit;
  next();
};

function formatDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure minutes are two digits
  const period = date.getHours() < 12 ? "AM" : "PM";

  return `${dayOfWeek}, ${month} ${day}, ${year} at ${hour}:${minutes} ${period}`;
}

export { setLastVisit, formatDate };
