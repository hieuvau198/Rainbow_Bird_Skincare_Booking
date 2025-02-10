import React from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";

const { Option } = Select;

export default function AddStaff({ open, onClose, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Staff data submitted:", values);
    message.success("Staff added successfully!");
    form.resetFields();
    if (onSubmit) {
      onSubmit(values);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={800}
      footer={null}
      title={
        <div className="text-center text-2xl font-bold">
          Add Staff
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input
              placeholder="Enter full name"
              className="rounded-md border-gray-300"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter email"
              className="rounded-md border-gray-300"
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input
              placeholder="Enter phone number"
              className="rounded-md border-gray-300"
            />
          </Form.Item>
          <Form.Item
            label="Availability"
            name="isAvailable"
            rules={[{ required: true, message: "Please select availability" }]}
          >
            <Select placeholder="Select availability" className="rounded-md">
              <Option value={true}>Available</Option>
              <Option value={false}>Unavailable</Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex justify-end space-x-4">
          <Button danger onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Add Staff
          </Button>
        </div>
      </Form>
    </Modal>
  );
}