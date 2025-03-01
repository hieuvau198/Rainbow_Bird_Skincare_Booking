import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import editRecom from "../../../../../modules/Quizzs/editRecom";

const { Option } = Select;

const EditRecommend = ({ open, onClose, recommendation, onEdited }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (recommendation) {
      form.setFieldsValue({
        minScore: recommendation.minScore,
        maxScore: recommendation.maxScore,
        isActive: recommendation.isActive ? "true" : "false",
      });
    }
  }, [recommendation, form]);

  const handleFinish = async (values) => {
    const payload = {
      minScore: parseInt(values.minScore, 10),
      maxScore: parseInt(values.maxScore, 10),
      isActive: values.isActive === "true",
    };
    try {
      await editRecom(recommendation.recommendationId, payload);
      message.success("Recommendation updated successfully!");
      form.resetFields();
      if (onEdited) onEdited();
      onClose();
    } catch (error) {
      console.error("Error editing recommendation:", error);
      message.error("Error editing recommendation!");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={<div className="text-center text-2xl font-bold">Edit Recommendation</div>}
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-4">
        <Form.Item label="Service ID">
          <Input value={recommendation?.serviceId} disabled />
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
        <Form.Item
          label="Status"
          name="isActive"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select status" className="rounded-md">
            <Option value="true">Active</Option>
            <Option value="false">Inactive</Option>
          </Select>
        </Form.Item>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} danger>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditRecommend;
