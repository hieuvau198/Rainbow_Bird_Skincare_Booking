import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button } from "antd";
import getAllUser from "../../../../modules/Admin/Employee/getAllUser";
import userRole from "../../../../../enums/userRole";
import manager from "../../../../../mocks/Admin/manager.json";

const ManagerTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 50 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button color="gold" variant="solid" type="link">View details</Button>
          <Button color="danger" variant="solid" type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const loadManagerData = async () => {
    setLoading(true);
    try {

      const allUsers = await getAllUser();
      const managerUsers = allUsers.filter(
        (user) => user.role === userRole.MANAGER
      );

      const formattedData = managerUsers.map((user) => ({
        key: user.userId, 
        id: user.userId,
        name: user.fullName,
        email: user.email,
        mobile: user.phone,
        status: "Active", 
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching manager data:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadManagerData();
  }, []);

  const handleAdd = () => {
    console.log("Add Manager clicked");
    // Thêm modal hoặc chuyển hướng sang trang thêm Manager tại đây.
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="text-xl font-medium">Manager List</div>
        <Button type="primary" onClick={handleAdd}>
          Add Manager
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ y: 350 }}
      />
    </div>
  );
};

export default ManagerTable;