import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import getRevenueByYear from "../../../../modules/Admin/Dashboard/getRevenueByYear";
import ReactDOMServer from "react-dom/server";
import VndFormat from "../../../../components/VndFormat/VndFormat";

export default function RevenueChart() {
  const [state, setState] = useState({
    series: [
      {
        name: "Revenue",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          const html = ReactDOMServer.renderToStaticMarkup(
            <VndFormat amount={val} />
          );
          return html.replace(/<\/?span>/g, "");
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      xaxis: {
        categories: [],
        position: "top",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            const html = ReactDOMServer.renderToStaticMarkup(
              <VndFormat amount={val} />
            );
            return html.replace(/<\/?span>/g, "");
          },
        },
      },
      
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getRevenueByYear();
        // Sắp xếp theo tháng nếu cần (giả sử mỗi object có trường month và monthName)
        const sortedData = data.sort((a, b) => a.month - b.month);
        const categories = sortedData.map((item) =>
          item.monthName.substring(0, 3)
        );
        const revenueData = sortedData.map((item) => item.totalRevenue);

        setState((prevState) => ({
          ...prevState,
          series: [
            {
              name: "Revenue",
              data: revenueData,
            },
          ],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: categories,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <h3 className="font-bold mb-2">Revenue by Month</h3>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
}
