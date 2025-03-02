// NewsAndBlogs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import getBlog from "../../../modules/NewsAndBlog/getBlog";
import getNews from "../../../modules/NewsAndBlog/getNews";

export default function NewsAndBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

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

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNews();
        setNewsList(data);
      } catch (error) {
        message.error("Có lỗi khi tải dữ liệu news");
        console.error("Error fetching news:", error);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchNews();
  }, []);

  if (loadingBlogs || loadingNews) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">News & Blogs</h2>
      
      {/* Section Blogs */}
      <section className="mb-10">
        <h3 className="text-2xl font-bold mb-4">Blogs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.blogId}
              className="bg-white shadow-md rounded-2xl overflow-hidden"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">{blog.description}</p>
                <p className="text-gray-500 text-sm mb-2">
                  {blog.authorFullName} -{" "}
                  {new Date(blog.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/news/${blog.blogId}`}
                  className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section News */}
      <section>
        <h3 className="text-2xl font-bold mb-4">News</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsList.map((news) => (
            <div
              key={news.newsId}
              className="bg-white shadow-md rounded-2xl overflow-hidden"
            >
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">{news.description}</p>
                <p className="text-gray-500 text-sm mb-2">
                  {news.authorFullName} -{" "}
                  {new Date(news.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {new Date(news.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/news/${news.newsId}`}
                  className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
