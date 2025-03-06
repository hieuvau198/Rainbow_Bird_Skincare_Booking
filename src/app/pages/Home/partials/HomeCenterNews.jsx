import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getNews from "../../../modules/NewsAndBlog/getNews";

export default function HomeCenterNews() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        const formattedNews = data.map((news) => ({
          id: news.newsId || "N/A",
          subtitle: news.subtitle || "LATEST NEWS",
          title: news.title || "No title available",
          buttonText: "Read More",
          image: news.imageUrl || "https://via.placeholder.com/500",
        }));
        setNewsData(formattedNews);
      } catch (err) {
        setError("Failed to fetch news data");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="bg-slate-50 py-10 border border-lime-200">
      <div className="max-w-7xl mx-auto px-4 ">
        <h2 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          NEWS
        </h2>

        {/* Chia 2 cột (card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {newsData.map((news) => (
            <div
              key={news.id}
              className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden hover:shadow-xl transition group border border-lime-200"
            >
              {/* Ảnh nền đặt tuyệt đối, phủ toàn bộ */}
              <img
                src={news.image}
                alt={news.title}
                className="absolute w-full h-full object-left transition-transform duration-500 group-hover:scale-105 blur-[2px]"
              />

              {/* Nội dung text hiển thị đè lên */}
              <div className="relative z-10 h-full mt-4 flex flex-col justify-center px-6 text-gray-950">
                <p className="text-sm uppercase tracking-widest font-semibold mb-2 opacity-90">
                  {news.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug">
                  {news.title}
                </h3>
                {/* <p className="mt-8 text-sm text-gray-800 md:text-base max-w-md opacity-90">
                  {news.description.length > 100
                    ? `${news.description.slice(0, 100)}...`
                    : news.description}
                </p> */}
              </div>

              {/* Button đặt ở dưới cùng */}
              <Link to={`/news/${news.id}`}>
                <button
                  className="absolute bottom-4 left-6 text-sm font-bold px-4 py-2 text-green-700 rounded-lg transition duration-300 transform hover:scale-105 z-20"
                >
                  {news.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
