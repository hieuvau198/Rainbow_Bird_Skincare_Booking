import React, { useEffect, useState } from "react";
import { BarChartOutlined, FileTextOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import VndFormat from "../../../../components/VndFormat";
import getTransaction from "../../../../modules/Admin/Dashboard/getTransaction";
import getAllBook from "../../../../modules/Booking/getAllBook";
import getCustomer from "../../../../modules/Admin/Employee/getCustomer";
import getAllService from "../../../../modules/Admin/Service/getAllService";

function OverviewMetrics() {
  const [revenue, setRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [chosenServices, setChosenServices] = useState(0);
  const [newCustomers, setNewCustomers] = useState(0);

  // Hàm lấy dữ liệu giao dịch và tính tổng doanh thu
  const transactionData = async () => {
    try {
      const data = await getTransaction();

      // Tính tổng doanh thu từ các giao dịch
      const totalRevenue = data.reduce((sum, transaction) => sum + transaction.amount, 0);
      setRevenue(totalRevenue);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Hàm lấy và cập nhật số lượng booking, customers, services
  const fetchMetricsData = async () => {
    try {
      // Lấy tổng số bookings
      const bookings = await getAllBook();
      setTotalBookings(bookings.length); // Giả sử API trả về mảng các booking

      // Lấy tổng số customers
      const customers = await getCustomer();
      setNewCustomers(customers.length); // Giả sử API trả về mảng các khách hàng

      // Lấy tổng số services
      const services = await getAllService();
      setChosenServices(services.length); // Giả sử API trả về mảng các dịch vụ
    } catch (error) {
      console.error("Error fetching metrics data:", error);
    }
  };

  // Gọi các hàm khi component được render
  useEffect(() => {
    transactionData();
    fetchMetricsData();
  }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col">
      <div className="flex items-center justify-between pl-2 mb-4">
        <h3 className="font-bold text-lg text-gray-800">Overview Metrics</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 flex-grow">
        {/* Revenue */}
        <div className="flex flex-col items-start p-4 rounded-lg bg-red-100 hover:shadow-lg hover:-translate-y-1 transition duration-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-red-500 rounded-full flex items-center justify-center w-10 h-10">
              <BarChartOutlined className="text-white text-2xl" />
            </div>
            <p className="text-sm font-bold text-gray-700">Revenue</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="pl-2 text-lg font-bold">
              <VndFormat amount={revenue} />
            </h2>
          </div>
        </div>
        {/* Total Bookings */}
        <div className="flex flex-col items-start p-4 rounded-lg bg-yellow-100 hover:shadow-lg hover:-translate-y-1 transition duration-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-yellow-500 rounded-full flex items-center justify-center w-10 h-10">
              <FileTextOutlined className="text-white text-2xl" />
            </div>
            <p className="text-sm font-bold text-gray-700">Total Bookings</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="pl-2 text-lg font-bold">{totalBookings.toLocaleString()} Bookings</h2>
          </div>
        </div>
        {/* Chosen Services */}
        <div className="flex flex-col items-start p-4 rounded-lg bg-green-100 hover:shadow-lg hover:-translate-y-1 transition duration-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-green-500 rounded-full flex items-center justify-center w-10 h-10">
              <ShoppingOutlined className="text-white text-2xl" />
            </div>
            <p className="text-sm font-bold text-gray-700">Total Services</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="pl-2 text-lg font-bold">{chosenServices.toLocaleString()} Services</h2>
          </div>
        </div>
        {/* New Customers */}
        <div className="flex flex-col items-start p-4 rounded-lg bg-purple-100 hover:shadow-lg hover:-translate-y-1 transition duration-300">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-purple-500 rounded-full flex items-center justify-center w-10 h-10">
              <UserOutlined className="text-white text-2xl" />
            </div>
            <p className="text-sm font-bold text-gray-700">Customers</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="pl-2 text-lg font-bold">{newCustomers.toLocaleString()} Customers</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewMetrics;
