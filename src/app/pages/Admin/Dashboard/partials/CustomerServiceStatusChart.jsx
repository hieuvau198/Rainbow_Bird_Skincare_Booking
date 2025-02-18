import React from "react";
import Chart from "react-apexcharts";

export default function CustomerServiceStatusChart() {
    const options = {
        chart: {
            id: "customer-service-status",
            type: "area",
            toolbar: { show: false },
            zoom: { enabled: false },
        },
        stroke: {
            curve: "smooth",
            width: 2,
        },
        xaxis: {
            categories: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            x: {
                format: "HH:mm",
            },
        },
        legend: {
            position: "top",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                stops: [0, 90, 100],
            },
        },
        colors: ["#008FFB", "#00E396", "#FEB019"],
    };

    const series = [
        {
            name: "Booked",
            data: [5, 10, 15, 20, 18, 22, 25, 30, 28],
        },
        {
            name: "In Service",
            data: [0, 3, 5, 10, 12, 15, 10, 8, 5],
        },
        {
            name: "Completed",
            data: [0, 0, 2, 5, 10, 15, 20, 22, 25],
        },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Daily Service Status Statistics</h3>
            <Chart options={options} series={series} type="area" height={225} />
        </div>
    );
}
