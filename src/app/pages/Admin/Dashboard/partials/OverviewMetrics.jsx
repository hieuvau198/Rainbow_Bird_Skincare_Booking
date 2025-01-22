import React from "react";

function OverviewMetrics() {
    const metrics = [
        {
            title: "Revenue",
            value: "$18.8k",
            change: "+8% from yesterday",
            bg: "bg-red-100",
            icon: "📊",
        },
        {
            title: "Total Bookings",
            value: "270",
            change: "-10% from yesterday",
            bg: "bg-yellow-100",
            icon: "📋",
        },
        {
            title: "Chosen Services",
            value: "15",
            change: "+1.2% from yesterday",
            bg: "bg-green-100",
            icon: "💅",
        },
        {
            title: "New Customers",
            value: "10",
            change: "0.5% from yesterday",
            bg: "bg-purple-100",
            icon: "👤",
        },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md h-80 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800">Overview Metrics</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
                {metrics.map((metric, index) => (
                    <div
                        key={index}
                        className={`flex items-start p-4 rounded-lg ${metric.bg}`}
                    >
                        <div className="mr-4 text-2xl">{metric.icon}</div>
                        <div>
                            <h2 className="text-lg font-bold">{metric.value}</h2>
                            <p className="text-sm text-gray-600">{metric.title}</p>
                            <span className="text-xs text-gray-500">{metric.change}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverviewMetrics;