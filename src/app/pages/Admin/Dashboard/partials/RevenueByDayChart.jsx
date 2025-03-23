import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import getRevenueByWeek from "../../../../modules/Admin/Dashboard/getRevenueByWeek";
import ReactDOMServer from "react-dom/server";
import VndFormat from "../../../../components/VndFormat/VndFormat";

export default function RevenueByDayChart() {
  const [chartData, setChartData] = useState({
    options: {
      chart: { id: "revenue-by-day", toolbar: { show: false } },
      xaxis: { categories: [] },
      yaxis: {
        labels: {
          formatter: (value) => {
            const html = ReactDOMServer.renderToStaticMarkup(
              <VndFormat amount={value} />
            );
            return html.replace(/<\/?span>/g, "");
          },
        },
      },
      colors: ["#34D399"],
      stroke: { curve: "smooth" },
      dataLabels: { enabled: false },
      tooltip: {
        y: {
          formatter: (value) => {
            const html = ReactDOMServer.renderToStaticMarkup(
              <VndFormat amount={value} />
            );
            return html.replace(/<\/?span>/g, "");
          },
        },
      },
    },
    series: [{ name: "Revenue", data: [] }],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRevenueByWeek();
        const sortedData = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const categories = sortedData.map((item) => {
          const dateObj = new Date(item.date);
          return dateObj.toLocaleDateString("en-US", { weekday: "short" });
        });
        const revenueData = sortedData.map((item) => item.totalRevenue);

        setChartData({
          options: {
            ...chartData.options,
            xaxis: { categories },
          },
          series: [{ name: "Revenue", data: revenueData }],
        });
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Revenue by Week</h3>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={230}
      />
    </div>
  );
}
