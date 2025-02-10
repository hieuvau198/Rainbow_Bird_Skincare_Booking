import { Button, message, Modal, Space, Table, Tag } from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import getAllService from "../../../../app/modules/Admin/Service/getAllService";
import getServiceDetail from "../../../../app/modules/Admin/Service/getServiceDetail";
import UserRole from "../../../../enums/userRole";
import addService from "../../../modules/Admin/Service/addService";
import deleteService from "../../../modules/Admin/Service/deleteService";
import "../../../styles/Admin/ScrollbarTable.css";
import AddService from "./partials/AddService";
import ServiceDetails from "./partials/ServiceDetail";

export default function Service() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [isAddServiceModalVisible, setIsAddServiceModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const userRole = Cookies.get("userRole");

  const showDeleteConfirm = (service) => {
    setServiceToDelete(service);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteService = async () => {
    if (!serviceToDelete) return;
    try {
      await deleteService(serviceToDelete.serviceId);
      message.success("Service deleted successfully!");
      setServices((prev) => prev.filter((s) => s.serviceId !== serviceToDelete.serviceId));
    } catch (error) {
      console.error("Error deleting service:", error);
      message.error("Failed to delete service!");
    } finally {
      setIsDeleteModalVisible(false);
      setServiceToDelete(null);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      await getServiceDetail(id, setSelectedService);
      setIsDetailModalVisible(true);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const handleAddService = async (service) => {
    const newService = await addService(service);
    console.log("Data sent to API:", service);
    setServices((prevServices) => [
      ...prevServices,
      { key: newService.serviceId, ...newService },
    ]);
    setIsAddServiceModalVisible(false);
  };

  const handleServiceUpdate = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((s) =>
        s.serviceId === updatedService.serviceId ? { key: updatedService.serviceId, ...updatedService } : s
      )
    );
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
          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Button color="danger" variant="solid" type="link" danger onClick={() => showDeleteConfirm(record)}>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
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
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[580px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Skincare Services</h2>
          {(userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) && (
            <Button
              type="primary"
              onClick={() => setIsAddServiceModalVisible(true)}
              className="bg-blue-500"
            >
              Add Service
            </Button>
          )}
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={services}
            loading={loading}
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
          onServiceUpdate={handleServiceUpdate}
        />
        <Modal
          title="Confirm Delete"
          open={isDeleteModalVisible}
          onOk={handleDeleteService}
          onCancel={() => setIsDeleteModalVisible(false)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p>Are you sure you want to delete this service?</p>
        </Modal>
      </div>
    </div>
  );
}