import { UploadOutlined } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";

const renderEditForm = (localService, form, uploadedImagePreview, setUploadedImageFile, setUploadedImagePreview) => (
  <Form
    form={form}
    layout="vertical"
    initialValues={{
      serviceName: localService?.serviceName,
      durationMinutes: localService?.durationMinutes,
      price: localService?.price,
      currency: localService?.currency,
      location: localService?.location,
      isActive: localService?.isActive,
      description: localService?.description,
      shortDescription: localService?.shortDescription,
      categoryId: localService?.categoryId,
    }}
  >
    <div className="grid grid-cols-2 gap-4">
      <Form.Item
        name="serviceName"
        label="Service Name"
        rules={[{ required: true, message: "Please input the service name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="durationMinutes"
        label="Duration (Minutes)"
        rules={[{ required: true, message: "Please input the duration!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input the price!" }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="currency"
        label="Currency"
        rules={[{ required: true, message: "Please input the currency!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: "Please input the location!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="isActive"
        label="Status"
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Select>
          <Select.Option value={true}>Available</Select.Option>
          <Select.Option value={false}>Unavailable</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="shortDescription"
        label="Short Description"
        rules={[{ required: true, message: "Please input the short description!" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Category ID"
        rules={[{ required: true, message: "Please input the category ID!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Service Image">
        <Upload
          showUploadList={false}
          beforeUpload={(file) => {
            setUploadedImageFile(file);
            setUploadedImagePreview(URL.createObjectURL(file));
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Upload New Image</Button>
        </Upload>
        {uploadedImagePreview ? (
          <img
            src={uploadedImagePreview}
            alt="Preview"
            className="w-24 h-24 object-cover rounded-lg shadow-md mt-2"
          />
        ) : localService?.serviceImage ? (
          <img
            src={localService.serviceImage}
            alt="Current Service"
            className="w-24 h-24 object-cover rounded-lg shadow-md mt-2"
          />
        ) : null}
      </Form.Item>
    </div>
    <Form.Item
      name="description"
      label="Description"
      rules={[{ required: true, message: "Please input the description!" }]}
    >
      <MDEditor height={200} />
    </Form.Item>
  </Form>
);

export default renderEditForm;
