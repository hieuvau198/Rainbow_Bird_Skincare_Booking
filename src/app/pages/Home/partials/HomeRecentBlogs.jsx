import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getBlog from "../../../modules/NewsAndBlog/getBlog";
import BlogsCard from "../../../components/BlogsCard";
import Loading from "../../../components/Loading";

export default function HomeRecentBlogs() {
  const [blogData, setBlogs] = useState([]);
  const [loading, setLoadingBlogs] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlog();
        setBlogs(data);
      } catch (error) {
        message.error("Có lỗi khi tải dữ liệu blog");
        console.error("Error fetching blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return <><Loading /></>;
  }

  return (
    <div className="bg-slate-50 py-10 border border-lime-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          BLOG POSTS
        </h2>

        {/* Hiển thị 2 bài viết*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogData.map((blog, index) => (
  <BlogsCard key={blog.id || `blog-${index}`} {...blog} />
))}

        </div>
      </div>
    </div>
  );
}
