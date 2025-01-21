import React from "react";
import { Table, Tag, Button } from "antd";

const employees = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Manager", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Staff", status: "Inactive" },
  { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Staff", status: "Active" },
  { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "HR", status: "Inactive" },
  { id: 5, name: "Charlie Green", email: "charlie.green@example.com", role: "Staff", status: "Active" },
];

const columns = [
  {
    title: "Employee Name",
    dataIndex: "name",
    key: "name",
    with: 1000,
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Column heading",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Active" ? "green" : "gray"}>{status}</Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: () => <Button type="text">...</Button>,
  },
];

export default function Employee() {
  return (
    <div className="p-6 ">
      <div className="bg-white rounded-lg shadow-md min-h-[570px] p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Employee List</h1>
            <p className="text-sm text-gray-500">A descriptive body text comes here</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r text-white text-sm font-sans from-blue-500 to-sky-500 p-2 rounded-lg shadow-sm hover:from-blue-400 hover:to-sky-400" type="primary">Add Employee</button>
            <Button type="primary">Add Employee</Button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Table
            columns={columns}
            dataSource={employees}
            pagination={{ pageSize: 5 }}
            rowKey="id"
            scroll={{ y: 300 }}
            bordered
          />
        </div>
      </div>
    </div>
  );
}