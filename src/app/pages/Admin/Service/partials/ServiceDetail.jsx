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
import renderEditForm from "./ServiceDetailPartials/RenderEditForm";
import renderDetails from "./ServiceDetailPartials/RenderDetails";

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
            <Button key="cancel" variant="solid" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>,
            <Button key="save" variant="solid" type="primary" onClick={handleSaveEdit}>
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
              <Button color="primary" variant="solid" type="link" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>
      }
    >
      {isReloading ? <Loading /> : (isEdit ? renderEditForm(localService, form, uploadedImagePreview) : renderDetails(localService))}
    </Modal>
  );
}