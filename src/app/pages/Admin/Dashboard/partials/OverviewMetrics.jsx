import React from "react";
import { BarChartOutlined, FileTextOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";

function OverviewMetrics() {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col">
            <div className="flex items-center justify-between pl-2 mb-4">
                <h3 className="font-bold text-lg text-gray-800">Overview Metrics</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 flex-grow">
                {/* Revenue */}
                <div className="flex flex-col items-start p-8 m-2 rounded-lg bg-red-100">
                    <div className="bg-red-500 rounded-full flex items-center justify-center w-10 h-10">
                        <BarChartOutlined className="text-white text-2xl"/>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">$18.8k</h2>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <span className="text-xs text-gray-500">+8% from yesterday</span>
                    </div>
                </div>
                {/* Total Bookings */}
                <div className="flex flex-col items-start p-8 m-2 rounded-lg bg-yellow-100">
                    <div className="bg-yellow-500 rounded-full flex items-center justify-center w-10 h-10">
                        <FileTextOutlined className="text-white text-2xl"/>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">270</h2>
                        <p className="text-sm text-gray-600">Total Bookings</p>
                        <span className="text-xs text-gray-500">-10% from yesterday</span>
                    </div>
                </div>
                {/* Chosen Services */}
                <div className="flex flex-col items-start p-8 m-2 rounded-lg bg-green-100">
                    <div className="bg-green-500 rounded-full flex items-center justify-center w-10 h-10">
                        <ShoppingOutlined className="text-white text-2xl"/>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">15</h2>
                        <p className="text-sm text-gray-600">Chosen Services</p>
                        <span className="text-xs text-gray-500">+1.2% from yesterday</span>
                    </div>
                </div>
                {/* New Customers */}
                <div className="flex flex-col items-start p-8 m-2 rounded-lg bg-purple-100">
                    <div className="bg-purple-500 rounded-full flex items-center justify-center w-10 h-10">
                        <UserOutlined className="text-white text-2xl"/>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">10</h2>
                        <p className="text-sm text-gray-600">Customers</p>
                        <span className="text-xs text-gray-500">0.5% from yesterday</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OverviewMetrics;
