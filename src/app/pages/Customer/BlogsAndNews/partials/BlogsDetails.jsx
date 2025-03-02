import {
    ClockCircleOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    ProfileOutlined,
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getBlogById from "../../../../modules/NewsAndBlog/getBlogById";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (!id) return;
        getBlogById(id)
            .then((data) => {
                setBlog(data);
            })
            .catch((error) => {
                console.error("Error fetching blog details:", error);
            });
    }, [id]);

    if (!blog) return <div className="text-center text-lg text-red-500">Blog not found.</div>;

    // Format ngày tạo
    const formattedDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString("en-GB")
        : "Unknown Date";
    const formattedTime = blog.createdAt
        ? new Date(blog.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "Unknown Time";

    return (
        <div className="container mx-auto px-6 lg:px-24 py-10 min-h-screen">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Ảnh bài viết */}
                <div className="w-full md:w-1/3 flex justify-center">
                    <img
                        src={blog.imageUrl || "https://www.chanchao.com.tw/images/default.jpg"}
                        alt="Blog"
                        className="w-full h-auto max-w-md object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Thông tin chi tiết */}
                <div className="w-full md:w-2/3 space-y-3">
                    <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
                    
                    <div className="text-gray-500 flex flex-col space-y-2">
                        <span className="flex items-center">
                            <ClockCircleOutlined className="mr-2 text-gray-600" />
                            <span className="font-semibold">Published:</span> {formattedDate} at {formattedTime}
                        </span>
                        <span className="flex items-center">
                            <InfoCircleOutlined className="mr-2 text-gray-600" />
                            <span className="font-semibold">Author:</span> {blog.authorFullName || "Unknown"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Nội dung bài viết */}
            <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Content</h3>
                <MDEditor.Markdown source={blog.content || "No content available"} />
            </div>
        </div>
    );
};

export default BlogDetails;
