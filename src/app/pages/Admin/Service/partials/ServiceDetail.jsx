import React, { useEffect, useState } from "react";
import {
  ClockCircleOutlined,
  DollarOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  ProfileOutlined,
  UploadOutlined
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, InputNumber, message, Modal, Select, Tag, Upload } from "antd";
import Loading from "../../../../components/Loading";
import editService from "../../../../modules/Admin/Service/editService";

// Giả sử API_BASE_URL được định nghĩa trong biến môi trường
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ServiceDetails({ visible, onClose, service }) {
  // localService lưu trữ dữ liệu service được cập nhật từ API
  const [localService, setLocalService] = useState(service);
  const [isEdit, setIsEdit] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [form] = Form.useForm();

  // Khi prop service thay đổi từ component cha, cập nhật lại localService
  useEffect(() => {
    setLocalService(service);
  }, [service]);

  // Khi đang edit và modal mở, reset form với dữ liệu từ localService
  useEffect(() => {
    if (localService && visible && isEdit) {
      form.resetFields();
      form.setFieldsValue({
        serviceName: localService.serviceName,
        durationMinutes: localService.durationMinutes,
        price: localService.price,
        currency: localService.currency,
        location: localService.location,
        isActive: localService.isActive,
        description: localService.description,
      });
      // Reset trạng thái upload ảnh
      setUploadedImageFile(null);
      setUploadedImagePreview(null);
    }
  }, [localService, visible, isEdit, form]);

  // Hàm fetch lại API detail sau khi chỉnh sửa thành công
  const fetchServiceDetail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Service/${service.serviceId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch service detail");
      }
      const data = await response.json();
      setLocalService(data);
    } catch (error) {
      message.error("Failed to fetch updated service detail!");
    } finally {
      setIsReloading(false);
    }
  };

  // Hàm xử lý khi nhấn Save edit
  const handleSaveEdit = async () => {
    try {
      const updatedValues = await form.validateFields();

      // Tạo FormData để gửi dữ liệu, bao gồm cả file ảnh
      const formData = new FormData();
      formData.append("ServiceName", updatedValues.serviceName || localService.serviceName);
      formData.append("DurationMinutes", updatedValues.durationMinutes || localService.durationMinutes);
      formData.append("Price", updatedValues.price || localService.price);
      formData.append("Currency", updatedValues.currency || localService.currency);
      formData.append("Location", updatedValues.location || localService.location);
      formData.append("IsActive", updatedValues.isActive !== undefined ? updatedValues.isActive : localService.isActive);
      formData.append("Description", updatedValues.description || localService.description);

      // Nếu có upload ảnh mới thì sử dụng file đó,
      // còn không thì lấy file ảnh cũ từ URL (convert về blob và tạo File)
      if (uploadedImageFile) {
        formData.append("ServiceImage", uploadedImageFile);
      } else if (localService.serviceImage) {
        try {
          const response = await fetch(localService.serviceImage);
          const blob = await response.blob();
          const fileName = localService.serviceImage.split('/').pop() || "oldImage.jpg";
          const fileFromUrl = new File([blob], fileName, { type: blob.type });
          formData.append("ServiceImage", fileFromUrl);
        } catch (fetchError) {
          console.error("Không lấy được file từ URL:", fetchError);
          message.error("Không thể lấy ảnh cũ, vui lòng upload ảnh mới!");
          return;
        }
      } else {
        message.error("Không có ảnh nào để sử dụng cho Service Image!");
        return;
      }

      console.log("Payload gửi đi:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      // Gọi API cập nhật với payload là FormData
      await editService(localService.serviceId, formData);
      message.success("Service updated successfully!");
      setIsEdit(false);
      // Sau khi chỉnh sửa thành công, bật chế độ loading và fetch lại detail
      setIsReloading(true);
      await fetchServiceDetail();
    } catch (error) {
      console.error("Error saving edit:", error);
      message.error("Failed to update service!");
    }
  };

  // Render giao diện detail của service
  const renderDetails = () => {
    if (!localService) return <Loading />;

    return (
      <>
        <div className="grid grid-cols-2 gap-4 gap-x-4">
          <div className="flex justify-center items-center">
            <img
              src={localService.serviceImage || "https://www.chanchao.com.tw/images/default.jpg"}
              alt="Service"
              className="w-60 h-60 object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <IdcardOutlined className="mr-1" /> ID:
              </span>
              <span className="ml-4">{localService.serviceId}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <ProfileOutlined className="mr-1" /> Name:
              </span>
              <span className="ml-4">{localService.serviceName}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <DollarOutlined className="mr-1" /> Price:
              </span>
              <span className="ml-4">
                {localService.currency}{localService.price}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <ClockCircleOutlined className="mr-1" /> Duration:
              </span>
              <span className="ml-4">{localService.durationMinutes} minutes</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-24 flex items-center">
                <InfoCircleOutlined className="mr-1" /> Status:
              </span>
              <span className="ml-4">
                <Tag color={localService.isActive ? "green" : "volcano"}>
                  {localService.isActive ? "Available" : "Unavailable"}
                </Tag>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <div className="p-4">
            <MDEditor.Markdown source={localService.description || "No description available"} />
          </div>
        </div>
      </>
    );
  };

  // Render form chỉnh sửa
  const renderEditForm = () => (
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
        <Form.Item label="Service Image">
          <Upload
            showUploadList={false} // Không hiển thị fileList tự động
            beforeUpload={(file) => {
              // Lưu file mới được chọn vào state và tạo URL preview
              setUploadedImageFile(file);
              setUploadedImagePreview(URL.createObjectURL(file));
              return false; // Ngăn upload tự động
            }}
          >
            <Button icon={<UploadOutlined />}>Upload New Image</Button>
          </Upload>
          {uploadedImagePreview ? (
            <img
              src={uploadedImagePreview}
              alt="Preview"
              style={{ width: "150px", marginTop: "8px", objectFit: "cover", borderRadius: "4px" }}
            />
          ) : localService?.serviceImage ? (
            <img
              src={localService.serviceImage}
              alt="Current Service"
              style={{ width: "150px", marginTop: "8px", objectFit: "cover", borderRadius: "4px" }}
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

  return (
    <Modal
      open={visible}
      onCancel={() => {
        setIsEdit(false);
        onClose();
      }}
      footer={
        isEdit
          ? [
              <Button key="cancel" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>,
              <Button key="save" type="primary" onClick={handleSaveEdit}>
                Save
              </Button>,
            ]
          : null
      }
      width={880}
      title={
        <div className="flex flex-col items-center pb-4 text-2xl font-bold">
          <span>Service Details</span>
          <div className="w-5/6 text-end">
            {!isEdit && (
              <Button type="link" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>
      }
    >
      {isReloading ? <Loading /> : (isEdit ? renderEditForm() : renderDetails())}
    </Modal>
  );
}