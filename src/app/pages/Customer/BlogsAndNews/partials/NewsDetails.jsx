import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import MDEditor from "@uiw/react-md-editor";
import getNewsById from "../../../../modules/NewsAndBlog/getNewsById";
import getNews from "../../../../modules/NewsAndBlog/getNews";

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewsDetail() {
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
    fetchNewsDetail();
  }, [id]);

  useEffect(() => {
    async function fetchRecommendedNews() {
      try {
        const data = await getNews();
        // Lọc ra các bài khác với bài hiện tại và chỉ lấy những bài đã publish
        const rec = data.filter(
          (item) => item.newsId !== id && item.isPublished === true
        );
        setRecommended(rec);
      } catch (error) {
        console.error("Error fetching recommended news:", error);
      }
    }
    fetchRecommendedNews();
  }, [id]);

  if (loading) {
    return <p>Đang tải dữ liệu chi tiết...</p>;
  }
  if (!news) {
    return <p>Không tìm thấy news nào!</p>;
  }

  return (
    <div className="container mx-auto p-6 flex gap-6">
      {/* Cột nội dung chính */}
      <div className="flex-1">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-auto object-contain"
          />
          <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {news.title}
            </h1>
            <p className="text-gray-500 text-sm mb-2">
              {news.publisherFullName} -{" "}
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

      {/* Cột tin đề cử */}
      <div className="w-80">
        <div className="sticky top-6">
          <h2 className="text-xl font-bold mb-4">Recommended News</h2>
          {recommended.map((item) => (
            <div key={item.newsId} className="mb-4">
              <a href={`/news/${item.newsId}`} className="flex gap-2">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(item.publishedAt).toLocaleDateString()}
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
