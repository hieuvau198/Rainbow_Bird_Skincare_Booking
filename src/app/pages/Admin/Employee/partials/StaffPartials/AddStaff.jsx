import { Button, Form, Input, message, Modal } from "antd";
import React from "react";

export default function AddStaff({ open, onClose, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const staffData = { ...values, role: 2 };
    console.log("Staff data submitted:", staffData);
    message.success("Staff added successfully!");
    form.resetFields();
    if (onSubmit) {
      onSubmit(staffData);
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={800}
      footer={null}
      title={<div className="text-center text-2xl font-bold">Add Staff</div>}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input
              placeholder="Enter username"
              className="rounded-md border-gray-300"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              placeholder="Enter password"
              className="rounded-md border-gray-300"
            />
          </Form.Item>
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
        </div>
        <div className="flex justify-end space-x-4">
          <Button danger onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Add Staff
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
