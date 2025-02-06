import React from "react";
import { Modal, Tag } from "antd";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function ServiceDetails({ visible, onClose, service }) {
    if (!service) return null;

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            title={
                <div className="text-center pb-4 text-2xl font-bold">
                    Service Details
                </div>
            }
        >
            <div className="grid grid-cols-2 gap-4 gay-x-4">
                <div>
                    <img
                        src={service.imageUrl || "https://via.placeholder.com/300"}
                        alt="Service"
                        className="w-full object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <div className="flex">
                        <span className="font-bold w-24">ID:</span>
                        <span className="ml-4">{service.serviceId}</span>
                    </div>

                    <div className="flex">
                        <span className="font-bold w-24">Name:</span>
                        <span className="ml-4">{service.serviceName}</span>
                    </div>

                    <div className="flex">
                        <span className="font-bold w-24">Price:</span>
                        <span className="ml-4">{service.currency}{service.price}</span>
                    </div>

                    <div className="flex">
                        <span className="font-bold w-24">Duration:</span>
                        <span className="ml-4">{service.durationMinutes} minutes</span>
                    </div>

                    <div className="flex">
                        <span className="font-bold w-24">Status:</span>
                        <span className="ml-4">
                            <Tag color={service.isActive ? "green" : "volcano"}>
                                {service.isActive ? "Available" : "Unavailable"}
                            </Tag>
                        </span>
                    </div>
                </div>
            </div>


            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <div className="border p-4 rounded-md bg-gray-50">
                    <MarkdownPreview source={service.description || "No description available"} />
                </div>
            </div>
        </Modal>
    );
}
