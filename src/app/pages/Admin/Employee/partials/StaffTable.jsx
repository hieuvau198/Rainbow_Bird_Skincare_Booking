import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import userRole from "../../../../../enums/userRole";
import getAllUser from "../../../../modules/Admin/Employee/getAllUser";
import AddStaff from "./StaffPartials/AddStaff";
import addEmployee from "../../../../modules/Admin/Employee/addEmployee";

const StaffTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 50 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    {
      title: "Action",
      key: "action",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <Button color="gold" variant="solid" type="link">View details</Button>
      //     <Button color="danger" variant="solid" type="link" danger>
      //       Delete
      //     </Button>
      //   </Space>
      // ),
    },
  ];

  const loadStaffData = async () => {
    setLoading(true);
    try {
      const allUsers = await getAllUser();
      const staffUsers = allUsers.filter(user => user.role === userRole.STAFF);

      const formattedData = staffUsers.map(user => ({
        key: user.userId,
        id: user.userId,
        name: user.fullName,
        email: user.email,
        mobile: user.phone,
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

  const handleAddStaff = async (values) => {
    try {
      const newStaff = await addEmployee(values);
      console.log("Data sent to API:", values);
      setData((prevData) => [
        ...prevData,
        { key: newStaff.username, ...newStaff },
      ]);
      setAddModalVisible(false);
      loadStaffData();
      message.success("Staff added successfully!");
    } catch (error) {
      console.error("Error adding staff:", error);
      message.error("Error adding staff!");
    }
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="text-xl font-medium">Staff List</div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
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
        scroll={{ x: "max-content", y: 350 }}
      />
      <AddStaff
        open={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddStaff}
      />
    </div>
  );
};

export default StaffTable;