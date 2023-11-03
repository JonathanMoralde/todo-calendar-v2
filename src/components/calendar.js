import React from "react";

const Calendar = () => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dt = new Date();
  const today = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const blankDays = weekdays.indexOf(dateString.split(", ")[0]);

  const generateNegativeNum = (num) => {
    if (num === 0) {
      return num;
    } else {
      return num * -1;
    }
  };

  const generatePrefixDays = (days) => {
    let index = [];
    for (let i = days - 1; i >= 0; i--) {
      index.push(generateNegativeNum(i));
    }

    return index;
  };

  const displayDays = (days, isMonthDays, isPrefix, isNextMonth) => {
    let content = [];
    let prefixDays;
    if (isPrefix) {
      prefixDays = generatePrefixDays(days);
    }

    for (let i = 0; i < days; i++) {
      let prefixDay;
      if (isPrefix) {
        prefixDay = new Date(year, month, prefixDays[i]).getDate();
      }

      content.push(
        <div
          className={`w-full h-16 bg-white rounded-lg ${
            today === i + 1 && isMonthDays === true
              ? "border-2 border-red-300"
              : ""
          }`}
        >
          {isMonthDays ? <h3 className="text-xs">{i + 1}</h3> : <div></div>}
          {isPrefix ? (
            <h3 className="text-xs text-gray-400">{prefixDay}</h3>
          ) : (
            <div></div>
          )}
        </div>
      );
    }

    if (isNextMonth) {
      // Calculate and display days for the next month
      const nextMonthDays = 42 - (days + blankDays); // 42 days in a 6x7 grid
      for (let i = 0; i < nextMonthDays; i++) {
        const nextMonthDate = new Date(year, month + 1, i + 1).getDate();
        content.push(
          <div className={`w-full h-16 bg-white rounded-lg text-gray-400`}>
            <h3 className="text-xs text-gray-400">{nextMonthDate}</h3>
          </div>
        );
      }
    }

    return content;
  };

  return (
    <div className="w-1/2 text-center">
      <div className="mb-2">
        <h3>
          {new Date(year, month, 1).toLocaleDateString("en-us", {
            month: "long",
          })}{" "}
          - {year}
        </h3>
      </div>
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((day, index) => {
          return (
            <h3 key={index} className="uppercase text-xs">
              {day}
            </h3>
          );
        })}
      </div>
      <div className="w-full grid grid-cols-7 grid-rows-6 gap-1">
        {displayDays(blankDays, false, true)}
        {displayDays(lastDayOfMonth, true, false, true)}
      </div>
    </div>
  );
};

export default Calendar;
