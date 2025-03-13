import { PlusOutlined } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, InputNumber, Modal, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import getAllCategory from "../../../../modules/Admin/Service/getAllCategory";

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const AddService = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [description, setDescription] = useState("**Add you description**");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategory();
        setCategories(res);
      } catch (error) {
        message.error("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      let fileObject = null;
      const fileList = values.serviceImage;
      if (fileList && fileList.length > 0) {
        fileObject = fileList[0].originFileObj;
      }

      const formData = new FormData();
      formData.append("ServiceName", values.serviceName);
      formData.append("Description", description);
      if (fileObject) {
        formData.append("ServiceImage", fileObject);
      }
      formData.append("Price", values.price);
      formData.append("Currency", values.currency);
      formData.append("DurationMinutes", values.durationMinutes);
      formData.append("Location", values.location);
      formData.append("IsActive", values.isActive.toString());
      formData.append("ShortDescription", values.shortDescription);
      formData.append("CategoryId", values.categoryId);

      onSubmit(formData);
      form.resetFields();
      setDescription("");
    } catch (info) {
      console.error("Validation Failed:", info);
      message.error("Please complete the form correctly.");
    }
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage ? false : Upload.LIST_IGNORE;
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
            name="serviceName"
            label="Service Name"
            rules={[{ required: true, message: "Please input the service name!" }]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>
          <Form.Item
            name="durationMinutes"
            label="Duration (minutes)"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="e.g. 60" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="e.g. 19.99" />
          </Form.Item>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true, message: "Please input the currency!" }]}
          >
            <Input placeholder="e.g. $" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value={true}>Available</Select.Option>
              <Select.Option value={false}>Unavailable</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="shortDescription"
            label="Short Description"
            rules={[{ required: true, message: "Please input the short description!" }]}
          >
            <Input placeholder="Enter short description" />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select Category">
              {categories.map((category) => (
                <Select.Option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="serviceImage"
            label="Service Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please select an image!" }]}
          >
            <Upload
              name="serviceImage"
              listType="picture-card"
              beforeUpload={beforeUpload}
              maxCount={1}
              accept="image/*"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </div>
        <Form.Item label="Description">
          <MDEditor value={description} onChange={setDescription} height={200} data-color-mode="light" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddService;
