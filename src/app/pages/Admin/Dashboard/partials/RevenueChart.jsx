import React from "react";
import Chart from "react-apexcharts";

export default function RevenueChart() {
  const options = {
    chart: { id: "revenue-chart", toolbar: { show: false } },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    colors: ["#1E88E5"],
    stroke: { curve: "smooth" },
  };

  const series = [
    { name: "Revenue", data: [5000, 7000, 8500, 10000, 12000, 15000, 14000, 13000, 11000, 16000, 18000, 20000] },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-bold mb-2">Revenue by Month</h3>
      <Chart options={options} series={series} type="line" height={250} />
    </div>
  );
}