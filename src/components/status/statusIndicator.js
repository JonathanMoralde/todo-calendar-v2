import React, { useEffect, useState } from "react";

const StatusIndicator = ({ allDates, dateIndex }) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const singleDate = allDates[dateIndex];
    // Use Array.every() to check if all tasks are completed
    setCompleted(singleDate.tasks.every((t) => t.completed));
  }, [allDates]);
  return (
    <div
      className={`w-3/5 h-2 mx-auto rounded-t-lg transition-all ${
        completed ? "bg-green-400" : "bg-red-400"
      }`}
    ></div>
  );
};

export default StatusIndicator;
