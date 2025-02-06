import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import getAllService from "../../../../app/modules/Admin/Service/getAllService";
import "../../../styles/Admin/ScrollbarTable.css";
import AddService from "./partials/AddService";

export default function Service() {
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Available" ? "green" : "volcano"}>{status}</Tag>
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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllService();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleAddService = (service) => {
    setServices((prevServices) => [
      ...prevServices,
      { key: prevServices.length + 1, ...service },
    ]);
    setIsModalVisible(false);
  };

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[580px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Skincare Services</h2>
          <Button
            type="primary"
            onClick={() => setIsModalVisible(true)}
            className="bg-blue-500"
          >
            Add Service
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={services}
            pagination={{ pageSize: 10 }}
            bordered
            scroll={{ y: 345 }}
          />
        </div>
        <AddService
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleAddService}
        />
      </div>
    </div>
  );
};