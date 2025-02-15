import React from "react";
import { Modal, Form, Input, DatePicker, TimePicker, Button } from "antd";

export default function AddBooking({ onClose }) {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("New booking: ", values);
    // Xử lý thêm booking tại đây (gọi API hoặc cập nhật state)
    onClose(); // Đóng modal sau khi submit
  };

  return (
    <Modal title="Add Booking" open onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="customerName"
          label="Customer Name"
          rules={[{ required: true, message: "Please input the customer name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="service"
          label="Service"
          rules={[{ required: true, message: "Please input the service" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select the date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true, message: "Please select the time" }]}
        >
          <TimePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Booking
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
