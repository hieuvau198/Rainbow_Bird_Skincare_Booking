import React, { useEffect, useState } from "react";
import { Button, Form, message, Modal } from "antd";
import Loading from "../../../../components/Loading";
import editService from "../../../../modules/Admin/Service/editService";
import renderEditForm from "./ServiceDetailPartials/RenderEditForm";
import renderDetails from "./ServiceDetailPartials/RenderDetails";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ServiceDetails({ visible, onClose, service, onServiceUpdate }) {
  const [localService, setLocalService] = useState(service);
  const [isEdit, setIsEdit] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLocalService(service);
  }, [service]);

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
      setUploadedImageFile(null);
      setUploadedImagePreview(null);
    }
  }, [localService, visible, isEdit, form]);

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

      console.log("Payload sent:");
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
      open={visible}
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