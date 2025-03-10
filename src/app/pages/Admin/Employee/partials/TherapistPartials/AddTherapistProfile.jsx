import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";

// Dummy API function to simulate adding a therapist profile.
// Replace this with your actual API call.
const addTherapistProfileAPI = async (values) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          ...values,
          profileId: Math.floor(Math.random() * 1000),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      1000
    );
  });
};

export default function AddTherapistProfile({ open, onClose }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      const response = await addTherapistProfileAPI(values);
      console.log("Therapist profile added:", response);
      message.success("Therapist profile added successfully!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error adding therapist profile:", error);
      message.error("Failed to add therapist profile.");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Add Therapist Profile"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onClose}
      okText="Add"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Therapist ID"
          name="therapistId"
          rules={[{ required: true, message: "Please input the Therapist ID!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Bio"
          name="bio"
          rules={[{ required: true, message: "Please input the bio!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Personal Statement"
          name="personalStatement"
          rules={[{ required: true, message: "Please input the personal statement!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Profile Image URL"
          name="profileImage"
          rules={[{ required: true, message: "Please input the profile image URL!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Education"
          name="education"
          rules={[{ required: true, message: "Please input the education details!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Certifications" name="certifications">
          <Input />
        </Form.Item>
        <Form.Item label="Specialties" name="specialties">
          <Input />
        </Form.Item>
        <Form.Item label="Languages" name="languages">
          <Input />
        </Form.Item>
        <Form.Item
          label="Years Experience"
          name="yearsExperience"
          rules={[{ required: true, message: "Please input the years of experience!" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
