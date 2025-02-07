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
import React, { useEffect, useState } from "react";
import Loading from "../../../../components/Loading";
import editService from "../../../../modules/Admin/Service/editService";

// Thêm prop onServiceUpdate để thông báo cho component cha cập nhật service mới
export default function ServiceDetails({ visible, onClose, service, onServiceUpdate }) {
    const [isEdit, setIsEdit] = useState(false);
    const [uploadedImageFile, setUploadedImageFile] = useState(null);
    const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (service && visible && isEdit) {
            form.resetFields();
            form.setFieldsValue({
                serviceName: service.serviceName,
                durationMinutes: service.durationMinutes,
                price: service.price,
                currency: service.currency,
                location: service.location,
                isActive: service.isActive,
                description: service.description,
            });
            // Reset trạng thái ảnh upload
            setUploadedImageFile(null);
            setUploadedImagePreview(null);
        }
    }, [service, visible, isEdit, form]);

    const handleSaveEdit = async () => {
        try {
            const updatedValues = await form.validateFields();

            // Tạo FormData để gửi dữ liệu, bao gồm cả file ảnh
            const formData = new FormData();
            formData.append("ServiceName", updatedValues.serviceName || service.serviceName);
            formData.append("DurationMinutes", updatedValues.durationMinutes || service.durationMinutes);
            formData.append("Price", updatedValues.price || service.price);
            formData.append("Currency", updatedValues.currency || service.currency);
            formData.append("Location", updatedValues.location || service.location);
            formData.append("IsActive", updatedValues.isActive !== undefined ? updatedValues.isActive : service.isActive);
            formData.append("Description", updatedValues.description || service.description);

            // Nếu có upload ảnh mới thì sử dụng file đó,
            // còn không thì lấy file ảnh cũ từ URL (convert về blob và tạo File)
            if (uploadedImageFile) {
                formData.append("ServiceImage", uploadedImageFile);
            } else if (service.serviceImage) {
                try {
                    const response = await fetch(service.serviceImage);
                    const blob = await response.blob();
                    // Lấy tên file từ URL (nếu có thể)
                    const fileName = service.serviceImage.split('/').pop() || "oldImage.jpg";
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
            const updatedServiceData = await editService(service.serviceId, formData);
            message.success("Service updated successfully!");
            // Gọi callback để thông báo cho component cha cập nhật dữ liệu mới
            if (typeof onServiceUpdate === "function") {
                onServiceUpdate(updatedServiceData);
            }
            setIsEdit(false);
        } catch (error) {
            console.error("Error saving edit:", error);
            message.error("Failed to update service!");
        }
    };

    const renderDetails = () => {
        if (!service) return <Loading />;

        return (
            <>
                <div className="grid grid-cols-2 gap-4 gap-x-4">
                    <div className="flex justify-center items-center">
                        <img
                            src={service?.serviceImage || "https://www.chanchao.com.tw/images/default.jpg"}
                            alt="Service"
                            className="w-60 h-60 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-2">
                        <div className="flex items-center">
                            <span className="font-bold w-24 flex items-center">
                                <IdcardOutlined className="mr-1" /> ID:
                            </span>
                            <span className="ml-4">{service.serviceId}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24 flex items-center">
                                <ProfileOutlined className="mr-1" /> Name:
                            </span>
                            <span className="ml-4">{service.serviceName}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24 flex items-center">
                                <DollarOutlined className="mr-1" /> Price:
                            </span>
                            <span className="ml-4">
                                {service.currency}{service.price}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24 flex items-center">
                                <ClockCircleOutlined className="mr-1" /> Duration:
                            </span>
                            <span className="ml-4">{service.durationMinutes} minutes</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24 flex items-center">
                                <InfoCircleOutlined className="mr-1" /> Status:
                            </span>
                            <span className="ml-4">
                                <Tag color={service.isActive ? "green" : "volcano"}>
                                    {service.isActive ? "Available" : "Unavailable"}
                                </Tag>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <div className="p-4">
                        <MDEditor.Markdown source={service.description || "No description available"} />
                    </div>
                </div>
            </>
        );
    };

    const renderEditForm = () => (
        <Form
            form={form}
            layout="vertical"
            initialValues={{
                serviceName: service?.serviceName,
                durationMinutes: service?.durationMinutes,
                price: service?.price,
                currency: service?.currency,
                location: service?.location,
                isActive: service?.isActive,
                description: service?.description,
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
                    ) : service?.serviceImage ? (
                        <img
                            src={service.serviceImage}
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
            {isEdit ? renderEditForm() : renderDetails()}
        </Modal>
    );
}