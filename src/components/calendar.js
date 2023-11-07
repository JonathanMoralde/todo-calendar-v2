import React, { useContext, useState } from "react";
import { TodoCalendarContext } from "../context/TodoCalendartContext";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import { useEffect } from "react";
import StatusIndicator from "./status/statusIndicator";

const Calendar = () => {
  const { setDate, allDates } = useContext(TodoCalendarContext);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const dt = new Date();
  const today = dt.getDate();
  const monthToday = dt.getMonth();
  const yearToday = dt.getFullYear();

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

  // ! FUNCTION FOR DISPLAY DAYS IN CALENDAR
  const displayDays = (days, isMonthDays, isPrefix, isNextMonth) => {
    let content = [];
    let prefixDays;
    if (isPrefix) {
      prefixDays = generatePrefixDays(days);
    }

    if (isNextMonth) {
      // Calculate and display days for the next mont
      const nextMonthDays = 42 - (days + blankDays); // 42 days in a 6x7 grid
      for (let i = 0; i < nextMonthDays; i++) {
        const nextMonthDate = new Date(year, month + 1, i + 1).getDate();

        // GETTING STATUS
        const monthValue = month === 11 ? 0 : month + 1;
        const yearValue = month === 11 ? year + 1 : year;
        const dateString = `${yearValue}-${monthValue}-${nextMonthDate}`;
        const dateIndex = allDates.map((d) => d.date).indexOf(dateString);

        content.push(
          <div
            onClick={() => {
              handleClick(i + 1, isMonthDays, isPrefix, isNextMonth);
            }}
            className={`w-full h-16 bg-white rounded-lg text-gray-400 hover:shadow-lg transition-all hover:cursor-pointer py-4`}
          >
            <h3 className="text-xs text-gray-400 mb-1">{nextMonthDate}</h3>

            {dateIndex !== -1 && (
              <StatusIndicator allDates={allDates} dateIndex={dateIndex} />
            )}
          </div>
        );
      }
    } else {
      for (let i = 0; i < days; i++) {
        let prefixDay;
        if (isPrefix) {
          prefixDay = new Date(year, month, prefixDays[i]).getDate();
        }

        // DISPLAYING STATUS
        let dateIndex;
        const monthValue = month === 0 ? 11 : month - 1;
        if (isPrefix) {
          const yearValue = month === 0 ? year - 1 : year;
          const dateString = `${yearValue}-${monthValue}-${prefixDay}`;
          dateIndex = allDates.map((d) => d.date).indexOf(dateString);
        } else {
          const dateString = `${year}-${month}-${i + 1}`;
          dateIndex = allDates.map((d) => d.date).indexOf(dateString);
        }
        // GETTING STATUS
        // let status;
        // if (dateIndex !== -1) {
        //   const singleDate = allDates[dateIndex];
        //   // Use Array.every() to check if all tasks are completed
        //   status = singleDate.tasks.every((t) => t.completed);
        // }

        content.push(
          <div
            onClick={
              isMonthDays && !isPrefix
                ? () => {
                    handleClick(i + 1, isMonthDays, isPrefix, isNextMonth);
                  }
                : () => {
                    handleClick(prefixDay, isMonthDays, isPrefix, isNextMonth);
                  }
            }
            className={`w-full h-16 bg-white rounded-lg hover:shadow-lg transition-all hover:cursor-pointer pt-4 pb-2 flex flex-col justify-between ${
              today === i + 1 &&
              isMonthDays === true &&
              month === monthToday &&
              year === yearToday
                ? "border-2 border-indigo-300"
                : ""
            }`}
          >
            {isMonthDays ? <h3 className="text-xs">{i + 1}</h3> : <></>}
            {isPrefix ? (
              <h3 className="text-xs text-gray-400">{prefixDay}</h3>
            ) : (
              <></>
            )}
            {dateIndex !== -1 && (
              // <div
              //   className={`w-3/5 h-2 mx-auto rounded-t-lg  ${
              //     status ? "bg-green-400" : "bg-red-400"
              //   }`}
              // ></div>
              <StatusIndicator allDates={allDates} dateIndex={dateIndex} />
            )}
          </div>
        );
      }
    }

    return content;
  };

  // FUNCTION FOR CHANGING MONTH & YEAR
  const changeDisplay = (isNext, isYear) => {
    if (isYear) {
      if (isNext) {
        setYear(year + 1);
      } else {
        setYear(year - 1);
      }
    } else {
      if (isNext) {
        if (month === 11) {
          setMonth(0);
          setYear(year + 1);
        } else {
          setMonth(month + 1);
        }
      } else {
        if (month === 0) {
          setMonth(11);
          setYear(year - 1);
        } else {
          setMonth(month - 1);
        }
      }
    }
  };

  // FUNCTION FOR SELECTING DATE
  const handleClick = (day, isMonthDays, isPrefix, isNextMonth) => {
    if (isMonthDays && !isPrefix && !isNextMonth) {
      setDate(new Date(year, month, day));
      console.log(year, month, day);
    } else if (!isMonthDays && isPrefix && !isNextMonth) {
      // if month is === 1, then value = 11 (cannot 1 -1 to go back to 11)
      const monthValue = month === 0 ? 11 : month - 1;
      const yearValue = month === 0 ? year - 1 : year;
      setDate(new Date(yearValue, monthValue, day));
      console.log(yearValue, monthValue, day);
    } else {
      // if month is ===11 , then value = 1
      const monthValue = month === 11 ? 0 : month + 1;
      const yearValue = month === 11 ? year + 1 : year;
      setDate(new Date(yearValue, monthValue, day));
      console.log(yearValue, monthValue, day);
    }
  };

  return (
    <div className="w-1/2 text-center">
      <div className="mb-2 flex items-center justify-between w-1/2 mx-auto">
        <button>
          <LuChevronsLeft
            onClick={() => {
              changeDisplay(false, true);
            }}
          />
        </button>
        <button
          onClick={() => {
            changeDisplay(false);
          }}
        >
          <LuChevronLeft />
        </button>
        <h3>
          {new Date(year, month, 1).toLocaleDateString("en-us", {
            month: "long",
          })}{" "}
          - {year}
        </h3>
        <button>
          <LuChevronRight
            onClick={() => {
              changeDisplay(true);
            }}
          />
        </button>
        <button>
          <LuChevronsRight
            onClick={() => {
              changeDisplay(true, true);
            }}
          />
        </button>
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

      <div className="w-full h-auto grid grid-cols-7 grid-rows-6 gap-1">
        {displayDays(blankDays, false, true)}
        {displayDays(lastDayOfMonth, true, false, false)}
        {displayDays(lastDayOfMonth, false, false, true)}
      </div>
    </div>
  );
};

export default Calendar;
