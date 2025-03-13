import MDEditor from "@uiw/react-md-editor";
import { Button, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import DecodeId from "../../../../../components/DecodeId";
import getUserById from "../../../../../modules/Admin/Employee/getUserById";
import addBlog from "../../../../../modules/NewsAndBlog/addBlog";

const AddBlog = ({ open, onClose, onAdded }) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState("");
    const [authorFullName, setAuthorFullName] = useState("");
    const authorId = DecodeId();

    useEffect(() => {
        const getName = async () => {
            try {
                const name = await getUserById(authorId);
                setAuthorFullName(name.fullName);
                form.setFieldsValue({ authorFullName: name.fullName });
            } catch (error) {
                console.error("Error fetching author name:", error);
            }
        };
        getName();
    }, [authorId, form]);

    const handleFinish = async (values) => {
        const payload = {
            title: values.title,
            authorFullName: authorFullName,
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
                    <Input placeholder="Enter title" className="rounded-md border-gray-300" />
                </Form.Item>
                <Form.Item
                    label="Author Name"
                    name="authorFullName"
                    rules={[{ required: true, message: "Author name is required" }]}
                >
                    <Input
                        placeholder="Author Name"
                        className="rounded-md border-gray-300"
                        disabled
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
