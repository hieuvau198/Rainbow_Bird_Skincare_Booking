import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import userRole from "../../../../../enums/userRole";
import getAllUser from "../../../../modules/Admin/Employee/getAllUser";
import staff from "../../../../../mocks/Admin/staff.json";

const StaffTable = () => {
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

  const loadStaffData = async () => {
    setLoading(true);
    try {
      const allUsers = await getAllUser();
      const staffUsers = allUsers.filter(user => user.role === userRole.STAFF);

      const formattedData = staffUsers.map(user => ({
        key: user.userId, // Giả sử API trả về userId
        id: user.userId,
        name: user.fullName,
        email: user.email,
        mobile: user.phone,
        status: "Active", // Nếu có thông tin trạng thái cụ thể, bạn có thể thay thế ở đây
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStaffData();
  }, []);

  const handleAdd = () => {
    console.log("Add Staff clicked");
    // Ở đây bạn có thể mở modal thêm mới Staff hoặc chuyển hướng sang trang thêm mới
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="text-xl font-medium">Staff List</div>
        <Button type="primary" onClick={handleAdd}>
          Add Staff
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

export default StaffTable;