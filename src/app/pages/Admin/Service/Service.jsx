import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import getAllService from "../../../../app/modules/Admin/Service/getAllService";
import getServiceDetail from "../../../../app/modules/Admin/Service/getServiceDetail";
import "../../../styles/Admin/ScrollbarTable.css";
import AddService from "./partials/AddService";
import { useNavigate } from "react-router-dom";
import ServiceDetails from "./partials/ServiceDetail";

export default function Service() {
  const [services, setServices] = useState([]);
  const [isAddServiceModalVisible, setIsAddServiceModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  const handleViewDetails = async (id) => {
    try {
      await getServiceDetail(id, setSelectedService);
      setIsDetailModalVisible(true);
      console.log("Service details:", selectedService);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "serviceId",
      key: "serviceId",
      width: 50,
    },
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Duration (Mins)",
      dataIndex: "durationMinutes",
      key: "durationMinutes",
      width: 150,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      width: 150,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "volcano"}>
          {isActive ? "Available" : "Unavailable"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button color="gold" variant="solid" type="link" onClick={() => handleViewDetails(record.serviceId)}>
            View details
          </Button>
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
        const servicesWithKey = data.map((service) => ({
          key: service.serviceId,
          ...service,
        }));
        setServices(servicesWithKey);
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
    setIsAddServiceModalVisible(false);
  };

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[580px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Skincare Services</h2>
          <Button
            type="primary"
            onClick={() => setIsAddServiceModalVisible(true)}
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
          open={isAddServiceModalVisible}
          onClose={() => setIsAddServiceModalVisible(false)}
          onSubmit={handleAddService}
        />
        <ServiceDetails
          visible={isDetailModalVisible}
          onClose={() => setIsDetailModalVisible(false)}
          service={selectedService}
        />
      </div>
    </div>
  );
}
