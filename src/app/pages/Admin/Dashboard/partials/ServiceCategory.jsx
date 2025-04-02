import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import getServiceCategories from "../../../../modules/Admin/Dashboard/getServiceCategories";

export default function ServiceCategoryDonutChart() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await getServiceCategories();
        const result = {};
        categories.forEach((item) => {
          result[item.categoryName] = item.serviceCount;
        });
        setData(result);
      } catch (error) {
        console.error("Error fetching service categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const options = {
    chart: {
      type: "donut",
    },
    labels: Object.keys(data),
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: true,
    },
    colors: [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#F4B400",
      "#9C27B0",
      "#43A047",
    ],
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
        },
      },
    },
  };

  const series = Object.values(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-h-[450px]">
      <h3 className="font-bold mb-2">Service Categories</h3>
      <ReactApexChart options={options} series={series} type="donut" height={350} />
    </div>
  );
}
