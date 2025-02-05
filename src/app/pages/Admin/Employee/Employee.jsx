// EmployeeManagement.jsx
import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button } from "antd";
import getTherapists from "../../../modules/Admin/Employee/getTherapist";

export default function Employee() {
  const [activeCategory, setActiveCategory] = useState("therapists");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchTherapists = async () => {
    setLoading(true);
    try {
      const therapistsData = await getTherapists();

      const formattedData = therapistsData.map((item) => ({
        id: item.therapistId,
        name: item.user.fullName,
        email: item.user.email,
        mobile: item.user.phone,
        status: item.isAvailable ? "Active" : "Inactive",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error:", error);
      setData([]);
    }
    setLoading(false);
  };

  const loadMockData = (category) => {
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
    const mockData = [
      {
        key: "1",
        id: "1",
        name: `${formattedCategory} One`,
        email: `${category.toLowerCase()}1@example.com`,
        mobile: "123-456-7890",
        role: formattedCategory,
        status: "Active",
      },
      {
        key: "2",
        id: "2",
        name: `${formattedCategory} Two`,
        email: `${category.toLowerCase()}2@example.com`,
        mobile: "987-654-3210",
        role: formattedCategory,
        status: "Inactive",
      },
    ];
    setData(mockData);
  };

  useEffect(() => {
    if (activeCategory === "therapists") {
      fetchTherapists();
    } else if (activeCategory === "staffs" || activeCategory === "managers") {
      loadMockData(activeCategory);
    }
  }, [activeCategory]);


  const getTitle = () => {
    switch (activeCategory) {
      case "therapists":
        return "Therapist Management";
      case "staffs":
        return "Staff Management";
      case "managers":
        return "Manager Management";
      default:
        return "Employee Management";
    }
  };

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[550px]">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-medium">{getTitle()}</div>
          <div className="flex space-x-4">
            <Button
              type={activeCategory === "therapists" ? "primary" : "default"}
              onClick={() => setActiveCategory("therapists")}
            >
              Therapists
            </Button>
            <Button
              type={activeCategory === "staffs" ? "primary" : "default"}
              onClick={() => setActiveCategory("staffs")}
            >
              Staffs
            </Button>
            <Button
              type={activeCategory === "managers" ? "primary" : "default"}
              onClick={() => setActiveCategory("managers")}
            >
              Managers
            </Button>
          </div>
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
    </div>
  );
}