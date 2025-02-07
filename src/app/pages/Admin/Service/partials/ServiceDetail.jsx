import {
    ClockCircleOutlined,
    DollarOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    PlusOutlined,
    ProfileOutlined,
    UpCircleFilled,
    UploadOutlined
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, InputNumber, message, Modal, Select, Tag, Upload } from "antd";
import React, { useEffect, useState } from "react";
import Loading from "../../../../components/Loading";
import editService from "../../../../modules/Admin/Service/editService";

export default function ServiceDetails({ visible, onClose, service }) {
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
        }
    }, [service, visible, isEdit, form]);

    const handleSaveEdit = async () => {
        try {
            const updatedValues = await form.validateFields();

            const payload = {
                ServiceName: updatedValues.serviceName || service.serviceName,
                DurationMinutes: updatedValues.durationMinutes || service.durationMinutes,
                Price: updatedValues.price || service.price,
                Currency: updatedValues.currency || service.currency,
                Location: updatedValues.location || service.location,
                IsActive: updatedValues.isActive !== undefined ? updatedValues.isActive : service.isActive,
                Description: updatedValues.description || service.description,
                ServiceImage: updatedValues.serviceImage || uploadedImageFile,
            };
            console.log("API Payload:", payload);

            // Gọi API cập nhật
            await editService(service.serviceId, payload);
            message.success("Service updated successfully!");
            setIsEdit(false);
        } catch (error) {
            console.error("Error saving edit:", error);
            message.error("Failed to update service!");
        }
    };


    const renderDetails = () => {
        if (!service) return <><Loading /></>;

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
                                {service.currency}
                                {service.price}
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
                    {uploadedImagePreview && (
                        <img
                            src={uploadedImagePreview}
                            alt="Preview"
                            style={{ width: "150px", marginTop: "8px", objectFit: "cover", borderRadius: "4px" }}
                        />
                    )}
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
                            <Button color="primary" variant="solid" type="link" onClick={() => setIsEdit(true)}>
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
