import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import getAllBook from "../../../../modules/Booking/getAllBook";
import Loading from "../../../../components/Loading/index";

export default function CustomerServiceStatusChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookings = await getAllBook();
                const statusCounts = {};

                bookings.forEach((booking) => {
                    const status = booking.status;
                    statusCounts[status] = (statusCounts[status] || 0) + 1;
                });

                const total = bookings.length;

                const percentages = Object.keys(statusCounts).reduce((acc, status) => {
                    acc[status] = statusCounts[status];
                    return acc;
                }, {});

                setData(percentages);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const options = {
        chart: {
            type: "pie",
            width: "80%",
        },
        labels: Object.keys(data),
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: "80%",
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
        legend: {
            position: "top",
        },
        colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#008FFB",
            "#F4B400",
            "#9C27B0",
            "#43A047",
        ],
        tooltip: {
            y: {
                formatter: function (value, { seriesIndex }) {
                    const statusLabel = options.labels[seriesIndex];
                    const count = data[statusLabel];
                    return `${count} Bookings`;
                },
            },
        },
    };

    const series = Object.values(data);

    if (loading) {
        return <Loading />; 
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md max-h-[450px]">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Booking Distribution</h3>
            <Chart options={options} series={series} type="pie" height={350} />
        </div>
    );
}
