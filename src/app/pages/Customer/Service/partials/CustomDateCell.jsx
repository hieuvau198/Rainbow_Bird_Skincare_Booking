import React from "react";
import dayjs from "dayjs";

export default function CustomDateCell({ current, selectedDate }) {
  const isToday = current.isSame(dayjs(), "day");
  const isSelected = selectedDate?.isSame(current, "day");

  return (
    <div
      className={`p-1 rounded ${
        isSelected
          ? "bg-lime-400 text-white" // Selected date
          : isToday
          ? "bg-lime-300 text-gray-700" // Today's date
          : "bg-white text-gray-700 hover:bg-lime-300" // Default date
      }`}
    >
      {current.date()}
    </div>
  );
}

// Utility functions for disabling dates and times
export const disabledDate = (current) => current && current.isBefore(dayjs(), "day");

// export const disabledTime = (selectedDate) => {
//   if (selectedDate && selectedDate.isSame(dayjs(), "day")) {
//     const currentHour = dayjs().hour();
//     const currentMinute = dayjs().minute();
//     return {
//       disabledHours: () => Array.from({ length: 24 }, (_, i) => (i < currentHour ? i : null)).filter(Number.isInteger),
//       disabledMinutes: (selectedHour) =>
//         selectedHour === currentHour
//           ? Array.from({ length: 60 }, (_, i) => (i < currentMinute ? i : null)).filter(Number.isInteger)
//           : [],
//     };
//   }
//   return {};
// };
