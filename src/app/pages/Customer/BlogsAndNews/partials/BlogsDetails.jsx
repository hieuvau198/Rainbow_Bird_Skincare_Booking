import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import getBlogById from "../../../../modules/NewsAndBlog/getBlogById";
import MDEditor from "@uiw/react-md-editor";
import Loading from "../../../../components/Loading";

export default function NewsDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        message.error("Có lỗi khi tải chi tiết blog");
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return <><Loading /></>;
  }

  if (!blog) {
    return <p>Không tìm thấy blog nào!</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <div className="p-5">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            {blog.authorFullName} -{" "}
            {new Date(blog.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div className="p-4">
                    <MDEditor.Markdown source={blog.content || "No content available"} />
                </div>
        </div>
      </div>
    </div>
  );
}
