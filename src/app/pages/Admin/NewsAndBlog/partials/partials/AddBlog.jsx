import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import DecodeId from "../../../../../components/DecodeId";
import addBlog from "../../../../../modules/NewsAndBlog/addBlog";

const AddBlog = ({ open, onClose, onAdded }) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState("");

    const handleFinish = async (values) => {
        const authorId = DecodeId();
        const payload = {
            title: values.title,
            authorFullName: values.authorFullName,
            content: content,
            imageUrl: values.imageUrl,
            authorId: authorId,
        };
        try {
            await addBlog(payload);
            message.success("Blog added successfully!");
            form.resetFields();
            setContent("");
            if (onAdded) onAdded();
            onClose();
        } catch (error) {
            console.error("Error adding blog:", error);
            message.error("Error adding blog!");
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title={<div className="text-center text-2xl font-bold">Add Blog</div>}
            width={800}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish} className="space-y-4">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter the title" }]}
                >
                    <Input placeholder="Enter title" className="rounded-md border-gray-300" />
                </Form.Item>
                <Form.Item
                    label="Author Name"
                    name="authorFullName"
                    rules={[{ required: true, message: "Please enter the Author Name" }]}
                >
                <Input
            placeholder="Enter Author Name" className="rounded-md border-gray-300"
             />
                </Form.Item>
                <Form.Item
                    label="Image URL"
                    name="imageUrl"
                    rules={[{ required: true, message: "Please enter the image URL" }]}
                >
                    <Input placeholder="Enter image URL" className="rounded-md border-gray-300" />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: "Please enter the content" }]}
                >
                    <MDEditor value={content} onChange={setContent} />
                </Form.Item>
                <div className="flex justify-end space-x-4">
                    <Button onClick={onClose} danger>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Add Blog
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddBlog;
