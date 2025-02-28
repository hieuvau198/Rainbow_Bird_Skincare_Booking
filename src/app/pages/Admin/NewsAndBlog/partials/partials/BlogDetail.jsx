import {
    ClockCircleOutlined,
    IdcardOutlined,
    InfoCircleOutlined,
    ProfileOutlined,
} from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";
import React from "react";
import Loading from "../../../../../components/Loading";

const BlogDetail = ({ blog }) => {
    if (!blog) return <Loading />;

    return (
        <>
            <div className="grid grid-cols-2 gap-1">
                <div className="flex justify-center items-center">
                    <img
                        src={blog.imageUrl || "https://www.chanchao.com.tw/images/default.jpg"}
                        alt="Blog"
                        className="w-60 h-60 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="flex flex-col justify-center space-y-3">
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">
                            <IdcardOutlined className="mr-1" /> ID:
                        </span>
                        <span className="ml-4">{blog.blogId}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">
                            <ProfileOutlined className="mr-1" /> Title:
                        </span>
                        <span className="ml-4">{blog.title}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">
                            <ClockCircleOutlined className="mr-1" /> Date:
                        </span>
                        <span className="ml-4">
                            {new Date(blog.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-bold w-24 flex items-center">
                            <InfoCircleOutlined className="mr-1" /> Author:
                        </span>
                        <span className="ml-4">{blog.authorFullName}</span>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Content</h3>
                <div className="p-4">
                    <MDEditor.Markdown source={blog.content || "No content available"} />
                </div>
            </div>
        </>
    );
};

export default BlogDetail;
