import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import addNews from "../../../../../modules/NewsAndBlog/addNews";
import DecodeId from "../../../../../components/DecodeId";

const AddNews = ({ open, onClose, onAdded }) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState("**Enter Your Content**");

    const handleFinish = async (values) => {
        const publisherId = DecodeId();
        const payload = {
            title: values.title,
            content: content,
            imageUrl: values.imageUrl,
            publisherId: publisherId,
        };
        try {
            await addNews(payload);
            message.success("News added successfully!");
            form.resetFields();
            setContent("");
            if (onAdded) onAdded();
            onClose();
        } catch (error) {
            console.error("Error adding news:", error);
            message.error("Error adding news!");
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title={<div className="text-center text-2xl font-bold">Add News</div>}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                className="space-y-4"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Please enter the title" }]}
                >
                    <Input
                        placeholder="Enter title"
                        className="rounded-md border-gray-300"
                    />
                </Form.Item>
                <Form.Item
                    label="Image URL"
                    name="imageUrl"
                    rules={[{ required: true, message: "Please enter the image URL" }]}
                >
                    <Input
                        placeholder="Enter image URL"
                        className="rounded-md border-gray-300"
                    />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: "Please enter the content" }]}
                >
                    <MDEditor value={content} onChange={setContent} data-color-mode="light"  />
                </Form.Item>
                <div className="flex justify-end space-x-4">
                    <Button onClick={onClose} danger>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Add News
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddNews;
