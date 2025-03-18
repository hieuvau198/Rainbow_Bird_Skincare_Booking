import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Input, Button, message } from "antd";
import addRecom from "../../../../../modules/Quizzs/addRecom";
import getAllService from "../../../../../modules/Admin/Service/getAllService";

const { Option } = Select;

const AddRecommend = ({ open, onClose, quizId, onAdded, existingRecommendations = [] }) => {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    try {
      const serviceData = await getAllService();
      // Lấy danh sách các serviceId đã được thêm vào recommendation
      const existingServiceIds = existingRecommendations.map(rec => rec.serviceId);
      // Lọc bỏ những service đã có
      const filteredServices = serviceData.filter(service => !existingServiceIds.includes(service.serviceId));
      setServices(filteredServices);
    } catch (error) {
      console.error("Error fetching services:", error);
      message.error("Error fetching services!");
    }
  };

  useEffect(() => {
    if (open) {
      loadServices();
    }
  }, [open, existingRecommendations]);

  const handleFinish = async (values) => {
    const payload = {
      quizId,
      serviceId: parseInt(values.serviceId, 10),
      minScore: parseInt(values.minScore, 10),
      maxScore: parseInt(values.maxScore, 10),
    };
    try {
      await addRecom(payload);
      message.success("Recommendation added successfully!");
      form.resetFields();
      if (onAdded) {
        onAdded();
      }
      onClose();
    } catch (error) {
      console.error("Error adding recommendation:", error);
      message.error("Error adding recommendation!");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={<div className="text-center text-2xl font-bold">Add Recommendation</div>}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-4">
        <Form.Item
          label="Service"
          name="serviceId"
          rules={[{ required: true, message: "Please select a Service" }]}
        >
          <Select placeholder="Select a service">
            {services.map((service) => (
              <Option key={service.serviceId} value={service.serviceId}>
                <strong>ID: </strong>{service.serviceId} - <strong>Name: </strong>{service.serviceName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Min Score"
          name="minScore"
          rules={[
            { required: true, message: "Please enter minimum score" },
            {
              validator: (_, value) => {
                if (value === undefined || value === null || value === "") {
                  return Promise.resolve();
                }
                if (isNaN(value)) {
                  return Promise.reject("Minimum score must be a number");
                }
                if (Number(value) < 0) {
                  return Promise.reject("Minimum score must be at least 0");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Enter minimum score" className="rounded-md border-gray-300" />
        </Form.Item>
        <Form.Item
          label="Max Score"
          name="maxScore"
          rules={[
            { required: true, message: "Please enter maximum score" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value === undefined || value === null || value === "") {
                  return Promise.resolve();
                }
                if (isNaN(value)) {
                  return Promise.reject("Maximum score must be a number");
                }
                const minScore = Number(getFieldValue("minScore"));
                if (Number(value) > minScore) {
                  return Promise.resolve();
                }
                return Promise.reject("Maximum score must be greater than minimum score");
              },
            }),
          ]}
        >
          <Input placeholder="Enter maximum score" className="rounded-md border-gray-300" />
        </Form.Item>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} danger>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Add new
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddRecommend;
