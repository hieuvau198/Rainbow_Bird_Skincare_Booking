import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import getNewsById from "../../../../modules/NewsAndBlog/getNewsById";

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNewsById(id);
        setNews(data);
      } catch (error) {
        message.error("Có lỗi khi tải chi tiết news");
        console.error("Error fetching news details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [id]);

  if (loading) {
    return <p>Đang tải dữ liệu chi tiết...</p>;
  }

  if (!news) {
    return <p>Không tìm thấy news nào!</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden">
        <img
          src={news.imageUrl}
          alt={news.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-5">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {news.title}
          </h1>
          <p className="text-gray-500 text-sm mb-2">
          {news.authorFullName} -{" "}
            {new Date(news.publishedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {new Date(news.publishedAt).toLocaleDateString()}
          </p>
          <div className="p-4">
            <MDEditor.Markdown
              source={news.content || "No content available"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
