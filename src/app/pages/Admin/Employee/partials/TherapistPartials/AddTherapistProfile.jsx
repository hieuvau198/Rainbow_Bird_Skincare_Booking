import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message, Switch } from "antd";

// Dummy API functions, thay thế bằng API thực tế khi cần.
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

const updateTherapistProfileAPI = async (profileId, values) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          ...values,
          profileId,
          updatedAt: new Date().toISOString(),
        }),
      1000
    );
  });
};

export default function AddTherapistProfile({ open, onClose, initialData }) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  // Khi mở modal, nếu có dữ liệu ban đầu thì set vào form, ngược lại reset form.
  useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue(initialData);
    } else if (open) {
      form.resetFields();
    }
  }, [open, initialData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      let response;
      // Nếu có initialData và có profileId -> cập nhật hồ sơ
      if (initialData && initialData.profileId) {
        response = await updateTherapistProfileAPI(initialData.profileId, values);
        message.success("Cập nhật hồ sơ thành công!");
      } else {
        response = await addTherapistProfileAPI(values);
        message.success("Thêm hồ sơ thành công!");
      }
      console.log("Response:", response);
      form.resetFields();
      onClose(response);
    } catch (error) {
      console.error("Error:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title={initialData ? "Cập nhật Hồ sơ Therapist" : "Thêm Hồ sơ Therapist"}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onClose}
      okText={initialData ? "Cập nhật" : "Thêm"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Therapist ID"
          name="therapistId"
          rules={[{ required: true, message: "Vui lòng nhập Therapist ID!" }]}
        >
          {/* Khi cập nhật, bạn có thể disable trường này để không cho sửa */}
          <Input type="number" disabled={!!initialData} />
        </Form.Item>
        <Form.Item
          label="Bio"
          name="bio"
          rules={[{ required: true, message: "Vui lòng nhập Bio!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Personal Statement"
          name="personalStatement"
          rules={[{ required: true, message: "Vui lòng nhập Personal Statement!" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Profile Image URL"
          name="profileImage"
          rules={[{ required: true, message: "Vui lòng nhập URL hình ảnh!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Education"
          name="education"
          rules={[{ required: true, message: "Vui lòng nhập thông tin Education!" }]}
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
          rules={[{ required: true, message: "Vui lòng nhập số năm kinh nghiệm!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Accepts New Clients"
          name="acceptsNewClients"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
