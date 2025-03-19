import { message, Pagination, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import BlogsCard from "../../../components/BlogsCard";
import Loading from "../../../components/Loading";
import NewsCard from "../../../components/NewsCard";
import getBlog from "../../../modules/NewsAndBlog/getBlog";
import getNews from "../../../modules/NewsAndBlog/getNews";

export default function NewsAndBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [newsList, setNewsList] = useState([]);

  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  const [activeTab, setActiveTab] = useState("news"); // Default tab: News
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPage, setBlogPage] = useState(1);
  const [newsPage, setNewsPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlog();
        setBlogs(data);
      } catch (error) {
        message.error("Error loading blogs data");
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
        message.error("Error loading news data");
        console.error("Error fetching news:", error);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchNews();
  }, []);

  if (loadingBlogs || loadingNews) {
    return <Loading />;
  }

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNews = newsList.filter((n) =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBlogs = filteredBlogs.length;
  const currentBlogs = filteredBlogs.slice((blogPage - 1) * pageSize, blogPage * pageSize);

  const totalNews = filteredNews.length;
  const currentNews = filteredNews.slice((newsPage - 1) * pageSize, newsPage * pageSize);

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center">
      <div className="w-full max-w-6xl p-6">

        {/* 🔍 Search Box */}
        <form className="max-w-lg mx-auto mb-6">
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-3 w-full z-20 text-sm text-gray-900 bg-white rounded-full border border-gray-300 focus:ring-green-400 focus:border-green-400"
                placeholder="Search News or Blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-3 text-sm font-medium h-full text-white bg-green-500 rounded-r-full border border-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>

        {/* 📌 Tabs for News and Blogs */}
        <div className="bg-lime-100 p-3 rounded-xl shadow-md">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            className="flex justify-center gap-6"
          >
            {/* 🌿 News Tab */}
            <Tabs.TabPane
              tab={<span className="text-lg font-semibold text-gray-700 hover:text-green-600">🌿 News</span>}
              key="news"
            >
              <div className="bg-green-50 shadow-lg rounded-xl p-6">
                <h3 className="text-3xl font-serif text-gray-800 mb-4 text-center">Latest News</h3>
                {filteredNews.length === 0 ? (
                  <p className="text-center text-gray-500">No news found.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {currentNews.map((news) => (
                        <NewsCard key={news.newsId} {...news} />
                      ))}
                    </div>
                    {totalNews > pageSize && (
                      <div className="mt-6 flex justify-center">
                        <Pagination
                          current={newsPage}
                          pageSize={pageSize}
                          total={totalNews}
                          onChange={setNewsPage}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </Tabs.TabPane>

            {/* 💆 Blogs Tab */}
            <Tabs.TabPane
              tab={<span className="text-lg font-semibold text-gray-700 hover:text-green-600">💆 Blogs</span>}
              key="blogs"
            >
              <div className="bg-green-50 shadow-lg rounded-xl p-6">
                <h3 className="text-3xl font-serif text-gray-800 mb-4 text-center">Skincare Insights</h3>
                {filteredBlogs.length === 0 ? (
                  <p className="text-center text-gray-500">No blogs found.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                      {currentBlogs.map((blog) => (
                        <BlogsCard key={blog.blogId} {...blog} />
                      ))}
                    </div>
                    {totalBlogs > pageSize && (
                      <div className="mt-6 flex justify-center">
                        <Pagination
                          current={blogPage}
                          pageSize={pageSize}
                          total={totalBlogs}
                          onChange={setBlogPage}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
