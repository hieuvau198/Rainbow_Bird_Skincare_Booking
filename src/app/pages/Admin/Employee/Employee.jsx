import React from "react";
import { Table, Tag, Space, Button } from "antd";

const Employee = () => {
  // Sample data for the table
  const data = [
    {
      key: "1",
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "123-456-7890",
      role: "Admin",
      status: "Active",
    },
    {
      key: "2",
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "987-654-3210",
      role: "User",
      status: "Inactive",
    },
    {
      key: "3",
      id: "3",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      mobile: "456-789-1230",
      role: "Manager",
      status: "Active",
    },
    {
      key: "4",
      id: "4",
      name: "Robert Brown",
      email: "robert.brown@example.com",
      mobile: "321-654-9870",
      role: "Developer",
      status: "Active",
    },
    {
      key: "5",
      id: "5",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      mobile: "654-321-0987",
      role: "Designer",
      status: "Inactive",
    },
    {
      key: "6",
      id: "6",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      mobile: "789-012-3456",
      role: "Support",
      status: "Active",
    },
    {
      key: "7",
      id: "7",
      name: "Emma Thomas",
      email: "emma.thomas@example.com",
      mobile: "890-123-4567",
      role: "Admin",
      status: "Inactive",
    },
    {
      key: "8",
      id: "8",
      name: "James White",
      email: "james.white@example.com",
      mobile: "901-234-5678",
      role: "User",
      status: "Active",
    },
    {
      key: "9",
      id: "9",
      name: "Olivia Harris",
      email: "olivia.harris@example.com",
      mobile: "012-345-6789",
      role: "Manager",
      status: "Inactive",
    },
    {
      key: "10",
      id: "10",
      name: "Lucas Martin",
      email: "lucas.martin@example.com",
      mobile: "345-678-9012",
      role: "Developer",
      status: "Active",
    },
    {
      key: "11",
      id: "11",
      name: "Charlotte Lee",
      email: "charlotte.lee@example.com",
      mobile: "678-901-2345",
      role: "Designer",
      status: "Inactive",
    },
    {
      key: "12",
      id: "12",
      name: "Liam King",
      email: "liam.king@example.com",
      mobile: "789-123-4567",
      role: "Support",
      status: "Active",
    },
    {
      key: "13",
      id: "13",
      name: "Sophia Anderson",
      email: "sophia.anderson@example.com",
      mobile: "890-234-5678",
      role: "Admin",
      status: "Inactive",
    },
    {
      key: "14",
      id: "14",
      name: "Mason Rodriguez",
      email: "mason.rodriguez@example.com",
      mobile: "901-345-6789",
      role: "User",
      status: "Active",
    },
    {
      key: "15",
      id: "15",
      name: "Isabella Hall",
      email: "isabella.hall@example.com",
      mobile: "012-456-7890",
      role: "Manager",
      status: "Inactive",
    },
    {
      key: "16",
      id: "16",
      name: "Sophia Anderson",
      email: "sophia.anderson@example.com",
      mobile: "890-234-5678",
      role: "Admin",
      status: "Inactive",
    },
    {
      key: "17",
      id: "17",
      name: "Mason Rodriguez",
      email: "mason.rodriguez@example.com",
      mobile: "901-345-6789",
      role: "User",
      status: "Active",
    },
    {
      key: "18",
      id: "18",
      name: "Isabella Hall",
      email: "isabella.hall@example.com",
      mobile: "012-456-7890",
      role: "Manager",
      status: "Inactive",
    },
  ];

  // Define columns for the table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button color="primary" variant="solid" type="link">
            Edit
          </Button>
          <Button color="danger" variant="solid" type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-slate-100">
      <div className="p-6 bg-white rounded-md shadow-md">
        <div className="text-xl font-medium mb-6">Employee Management</div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10, // Number of rows per page
          }}
          bordered
          scroll={{y: 400}}
        />
      </div>
    </div>
  );
};

export default Employee;
