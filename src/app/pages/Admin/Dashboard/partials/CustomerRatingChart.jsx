import React from "react";
import Chart from "react-apexcharts";

export default function CustomerRatingChart() {
  const options = {
    chart: { id: "customer-rating", toolbar: { show: false } },
    xaxis: { categories: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"] },
    colors: ["#FFD700"],
  };

  const series = [
    { name: "Ratings", data: [5, 10, 20, 40, 80] },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Customer Ratings</h3>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
}