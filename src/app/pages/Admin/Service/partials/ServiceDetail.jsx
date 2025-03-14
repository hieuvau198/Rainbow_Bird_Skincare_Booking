import { Button, Form, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import UserRole from "../../../../../enums/userRole";
import DecodeRole from "../../../../components/DecodeRole";
import Loading from "../../../../components/Loading";
import editService from "../../../../modules/Admin/Service/editService";
import renderDetails from "./ServiceDetailPartials/RenderDetails";
import RenderEditForm from "./ServiceDetailPartials/RenderEditForm";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ServiceDetails({ open, onClose, service, onServiceUpdate }) {
  const [localService, setLocalService] = useState(service);
  const [isEdit, setIsEdit] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const userRole = DecodeRole();
  const [form] = Form.useForm();

  useEffect(() => {
    setLocalService(service);
  }, [service]);

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

  const fetchServiceDetail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Service/${service.serviceId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch service detail");
      }
      const data = await response.json();
      setLocalService(data);
      return data;
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
      
      // For debugging: log each form data entry
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
      {isReloading ? <Loading /> : (isEdit ? (
        <RenderEditForm
          localService={localService}
          form={form}
          uploadedImagePreview={uploadedImagePreview}
          setUploadedImageFile={setUploadedImageFile}
          setUploadedImagePreview={setUploadedImagePreview}
        />
      ) : (
        renderDetails(localService)
      ))}
    </Modal>
  );
}
