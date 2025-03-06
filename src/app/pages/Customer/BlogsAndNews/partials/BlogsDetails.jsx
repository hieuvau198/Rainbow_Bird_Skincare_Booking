import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import getBlogById from "../../../../modules/NewsAndBlog/getBlogById";
import MDEditor from "@uiw/react-md-editor";
import Loading from "../../../../components/Loading";
import getBlog from "../../../../modules/NewsAndBlog/getBlog";

export default function NewsDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (error) {
        // message.error("Có lỗi khi tải chi tiết blog");
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  useEffect(() => {
    async function fetchRecommendedBlog() {
      try {
        const data = await getBlog();
        setRecommended(data);
      } catch (error) {
        console.error("Error fetching recommended Blog:", error);
      }
    }
    fetchRecommendedBlog();
  }, [id]);

  if (loading) {
    return <><Loading /></>;
  }

  if (!blog) {
    return <p>Không tìm thấy blog nào!</p>;
  }

  return (
    <div className="container px-24 p-6 flex gap-6">
      <div className="flex-1">
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
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

      <div className="w-80">
        <div className="sticky top-6">
          <h2 className="text-xl font-bold mb-4">Recommended Blog</h2>
          {recommended.slice(0, 6).map((item) => (
            <div key={item.blogId} className="mb-4">
              <a href={`/Blog/${item.blogId}`} className="flex gap-2">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
