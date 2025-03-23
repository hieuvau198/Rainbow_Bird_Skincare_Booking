import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import getRevenueByYear from "../../../../modules/Admin/Dashboard/getRevenueByYear";
import ReactDOMServer from "react-dom/server";
import VndFormat from "../../../../components/VndFormat/VndFormat";

export default function RevenueChart() {
  const [chartData, setChartData] = useState({
    options: {
      chart: { id: "revenue-chart", toolbar: { show: false } },
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
      colors: ["#1E88E5"],
      stroke: { curve: "smooth" },
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
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [{ name: "Revenue", data: [] }],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRevenueByYear();
        const sortedData = data.sort((a, b) => a.month - b.month);
        const categories = sortedData.map(item =>
          item.monthName.substring(0, 3)
        );
        const revenueData = sortedData.map(item => item.totalRevenue);

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
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h3 className="font-bold mb-2">Revenue by Month</h3>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={258}
      />
    </div>
  );
}
