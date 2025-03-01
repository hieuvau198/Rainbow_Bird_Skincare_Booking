import React from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";

const { Option } = Select;

export default function AddTherapist({ open, onClose, onSubmit }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const payload = {
      username: values.username,
      password: values.password,
      email: values.email,
      phone: values.phone,
      fullName: values.fullName,
      isAvailable: true,
      schedule: "string",
      rating: 0,  
    };
    console.log("Therapist data submitted:", payload);
    form.resetFields();
    if (onSubmit) {
      onSubmit(payload);
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
        <div className="text-center text-2xl font-bold">Add Therapist</div>
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
            Add Therapist
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
