import React, { useEffect, useState } from "react";
import getNews from "../../../modules/NewsAndBlog/getNews";
import Loading from "../../../components/Loading";
import NewsCard from "../../../components/NewsCard"; // Ensure NewsCard is styled like BlogsCard

export default function HomeCenterNews() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        // Show 4 news items to match the blogs layout
        setNewsData(data.slice(0, 4));
      } catch (err) {
        setError("Failed to fetch news data");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="bg-slate-50 py-10 ">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          NEWS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {newsData.map((news, index) => (
            <NewsCard key={news.newsId || `news-${index}`} {...news} />
          ))}
        </div>
      </div>
    </div>
  );
}
