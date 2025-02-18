import dayjs from "dayjs";

export default function CustomTimeCell({ time, selectedTime, onClick }) {
    const isNow = time.isSame(dayjs(), "minute");
    const isSelected = selectedTime?.isSame(time, "minute");
  
    return (
      <div
        className={`p-2 rounded cursor-pointer ${
          isSelected
            ? "bg-lime-400 text-white"      // Giờ được chọn
            : isNow
            ? "bg-lime-300 text-gray-800"  // Giờ hiện tại
            : "bg-white text-gray-700 hover:bg-lime-300" // Giờ khác
        }`}
        onClick={() => onClick(time)}
      >
        {time.format("HH:mm")}
      </div>
    );
  }

export const disabledTime = (selectedDate) => {
  if (selectedDate && selectedDate.isSame(dayjs(), "day")) {
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().minute();
    return {
      disabledHours: () =>
        Array.from({ length: 24 }, (_, i) => (i < currentHour ? i : null)).filter(Number.isInteger),
      disabledMinutes: (selectedHour) =>
        selectedHour === currentHour
          ? Array.from({ length: 60 }, (_, i) => (i < currentMinute ? i : null)).filter(Number.isInteger)
          : [],
    };
  }
  return {};
};
