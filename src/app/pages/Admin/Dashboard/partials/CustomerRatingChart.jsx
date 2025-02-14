import React from "react";
import Chart from "react-apexcharts";

export default function CustomerRatingChart() {
  const options = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    colors: ["#FFD700", "#FFC107", "#FFB300", "#FFA000", "#FF8F00"],
    chart: { id: "customer-rating", toolbar: { show: false } },
  };

  // For a pie chart, series is an array of values.
  const series = [5, 10, 20, 40, 80];

  return (
    <div className="p-4 bg-white min-h-[330px] rounded-2xl shadow-md">
      <h3 className="font-bold mb-2">Customer Ratings</h3>
      <Chart options={options} series={series} type="pie" height={250} />
    </div>
  );
}
