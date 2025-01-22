import React from "react";
import Chart from "react-apexcharts";

function RevenueByDayChart() {
  const options = {
    chart: { id: "revenue-by-day", toolbar: { show: false } },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    colors: ["#34D399"],
    stroke: { curve: "smooth" },
  };

  const series = [
    { name: "Revenue", data: [500, 800, 650, 900, 1200, 750, 1100] },
  ];

  return (
    <div className="bg-white p-6 rounded-lg max-h-80 shadow-md">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Revenue by Day</h3>
      <Chart options={options} series={series} type="line" height={220} />
    </div>
  );
}

export default RevenueByDayChart;