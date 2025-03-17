import { Button, Form, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import UserRole from "../../../../../enums/userRole";
import DecodeRole from "../../../../components/DecodeRole";
import Loading from "../../../../components/Loading";
import editService from "../../../../modules/Admin/Service/editService";
import RenderDetails from "./ServiceDetailPartials/RenderDetails";
import RenderEditForm from "./ServiceDetailPartials/RenderEditForm";
import getServiceDetail from "../../../../modules/Admin/Service/getServiceDetail";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ServiceDetails({ open, onClose, service, onServiceUpdate }) {
  // Sử dụng localService cho chế độ edit
  const [localService, setLocalService] = useState(service);
  const [isEdit, setIsEdit] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  // reloadKey được dùng để buộc RenderDetails re-fetch dữ liệu khi có thay đổi
  const [reloadKey, setReloadKey] = useState(0);
  const userRole = DecodeRole();
  const [form] = Form.useForm();

  // Cập nhật localService khi prop service thay đổi
  useEffect(() => {
    setLocalService(service);
  }, [service]);

  // Khi chuyển sang chế độ edit, reset form với dữ liệu hiện tại của localService
  useEffect(() => {
    if (localService && open && isEdit) {
      form.resetFields();
      form.setFieldsValue({
        serviceName: localService.serviceName,
        durationMinutes: localService.durationMinutes,
        price: localService.price,
        currency: localService.currency,
        location: localService.location,
        isActive: localService.isActive,
        description: localService.description,
        shortDescription: localService.shortDescription,
        categoryId: localService.categoryId,
      });
      setUploadedImageFile(null);
      setUploadedImagePreview(null);
    }
  }, [localService, open, isEdit, form]);

  // Hàm này dùng để fetch lại chi tiết dịch vụ sau khi chỉnh sửa
  const fetchServiceDetail = async () => {
    try {
      const data = await getServiceDetail(service.serviceId);
      setLocalService(data);
    } catch (error) {
      message.error("Failed to fetch updated service detail!");
      return null;
    } finally {
      setIsReloading(false);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const updatedValues = await form.validateFields();

      const formData = new FormData();
      formData.append("ServiceName", updatedValues.serviceName || localService.serviceName);
      formData.append("DurationMinutes", updatedValues.durationMinutes || localService.durationMinutes);
      formData.append("Price", updatedValues.price || localService.price);
      formData.append("Currency", updatedValues.currency || localService.currency);
      formData.append("Location", updatedValues.location || localService.location);
      formData.append("IsActive", updatedValues.isActive !== undefined ? updatedValues.isActive : localService.isActive);
      formData.append("Description", updatedValues.description || localService.description);
      formData.append("ShortDescription", updatedValues.shortDescription || localService.shortDescription);
      formData.append("CategoryId", updatedValues.categoryId || localService.categoryId);

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
          console.error("Cannot fetch file from URL:", fetchError);
          message.error("Cannot fetch old image, please upload a new one!");
          return;
        }
      } else {
        message.error("No image available for Service Image!");
        return;
      }

      // Debug: log các entry của formData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      await editService(localService.serviceId, formData);
      message.success("Service updated successfully!");
      setIsEdit(false);
      setIsReloading(true);
      const updatedService = await fetchServiceDetail();
      if (updatedService && typeof onServiceUpdate === "function") {
        onServiceUpdate(updatedService);
      }
      // Tăng reloadKey để RenderDetails tự re-fetch dữ liệu
      setReloadKey(prev => prev + 1);
    } catch (error) {
      console.error("Error saving edit:", error);
      message.error("Failed to update service!");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        setIsEdit(false);
        onClose();
      }}
      footer={
        isEdit
          ? [
              <Button key="cancel" danger onClick={() => setIsEdit(false)}>
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
          <div className="w-11/12 text-end">
            {(!isEdit && (userRole === UserRole.ADMIN || userRole === UserRole.MANAGER)) && (
              <Button color="primary" variant="solid" type="link" onClick={() => setIsEdit(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>
      }
    >
      {isReloading ? (
        <Loading />
      ) : isEdit ? (
        <RenderEditForm
          localService={localService}
          form={form}
          uploadedImagePreview={uploadedImagePreview}
          setUploadedImageFile={setUploadedImageFile}
          setUploadedImagePreview={setUploadedImagePreview}
        />
      ) : (
        // Chỉ truyền vào serviceId và reloadKey để RenderDetails tự gọi API lấy dữ liệu chi tiết
        <RenderDetails serviceId={service?.serviceId} reloadKey={reloadKey} />
      )}
    </Modal>
  );
}
