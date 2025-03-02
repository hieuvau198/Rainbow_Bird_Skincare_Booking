import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getNews from "../../../../modules/NewsAndBlog/getNews";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsResponse = await getNews();
        setNewsData(newsResponse || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news. Please try again.");
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
    <section className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsData.length > 0 ? (
          newsData.map((news) => (
            <Link to={`/news/${news.newsId}`} key={news.newsId} className="group">
              <div
                className="relative bg-white border-2 border-lime-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-105"
              >
                <img
                  src={news.imageUrl || "https://via.placeholder.com/500"}
                  alt={news.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-lime-700 transition">
                    {news.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(news.publishedAt).toLocaleDateString()} - {new Date(news.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <button className="mt-4 text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No news available.</p>
        )}
      </div>
    </section>
  );
}
