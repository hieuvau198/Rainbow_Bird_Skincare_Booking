import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import getBlog from "../../../modules/NewsAndBlog/getBlog";
import getNews from "../../../modules/NewsAndBlog/getNews";
import Loading from "../../../components/Loading";
import BlogsCard from "../../../components/BlogsCard";

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
        // Lọc ra những bài news có ispublic là true
        const filteredNews = data.filter((news) => news.isPublished === true);
        setNewsList(filteredNews);
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
    return <><Loading /></>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">NEWS & BLOGS</h2>
      
      {/* Section Blogs */}
      <section className="mb-10">
        <h3 className="text-3xl font-bold mb-4">Blogs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogsCard key={blog.blogId} {...blog} />
          ))}
        </div>
      </section>

      {/* Section News */}
      <section>
        <h3 className="text-3xl font-bold mb-4">News</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <div
              key={news.newsId}
              className="bg-white shadow-md rounded-2xl overflow-hidden"
            >
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">{news.description}</p>
                <p className="text-gray-500 text-sm mb-2">
                  {news.publisherFullName} -{" "}
                  {new Date(news.publishedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  {new Date(news.publishedAt).toLocaleDateString()}
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
