import { Table } from "antd";
import React, { useEffect, useState } from "react";
import getCustomer from "../../../modules/Admin/Employee/getCustomer";

const CustomerTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const customers = await getCustomer();
      const formattedData = customers.map((user) => ({
        key: user.userId,
        username: user.user.username,
        ...user,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <h2 className="text-xl font-semibold mb-6">Customer List</h2>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
