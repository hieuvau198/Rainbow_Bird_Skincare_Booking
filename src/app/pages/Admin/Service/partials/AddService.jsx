import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button } from "antd";
import MDEditor from "@uiw/react-md-editor";

const AddService = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("");

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit({ ...values, description });
        form.resetFields();
        setDescription("");
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="cancel" danger onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Add Service
        </Button>,
      ]}
      title={
        <div className="text-center text-2xl font-bold">
          Add New Service
        </div>
      }
    >
      <Form form={form} layout="vertical">
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the service name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration (mins)"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select>
              <Select.Option value="Available">Available</Select.Option>
              <Select.Option value="Unavailable">Unavailable</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Description" className="col-span-2">
          <MDEditor value={description} onChange={setDescription} height={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddService;