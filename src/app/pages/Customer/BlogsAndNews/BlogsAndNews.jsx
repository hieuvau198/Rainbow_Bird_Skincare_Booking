import React, { useEffect, useState } from "react";
import { message, Radio, Input, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Loading from "../../../components/Loading";
import BlogsCard from "../../../components/BlogsCard";
import NewsCard from "../../../components/NewsCard";
import getBlog from "../../../modules/NewsAndBlog/getBlog";
import getNews from "../../../modules/NewsAndBlog/getNews";

export default function NewsAndBlogs() {
  // Raw data
  const [blogs, setBlogs] = useState([]);
  const [newsList, setNewsList] = useState([]);

  // Loading states
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  // Sidebar filters
  const [filterType, setFilterType] = useState("all"); // "all", "blogs", or "news"
  const [sortOption, setSortOption] = useState("newest"); // "newest" or "oldest"
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states (separate for blogs & news)
  const [blogPage, setBlogPage] = useState(1);
  const [newsPage, setNewsPage] = useState(1);
  const pageSize = 8; // Show up to 8 items per section

  // Fetch blogs
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

  // Fetch news
  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await getNews();
        // If you want to filter published news, do it here:
        // const published = data.filter((item) => item.isPublished);
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

  // If still loading, show spinner
  if (loadingBlogs || loadingNews) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingOutlined style={{ fontSize: 40 }} spin />
      </div>
    );
  }

  // ---------------------
  // Filtering & Sorting
  // ---------------------
  // Filter & sort for Blogs
  const filteredBlogs = blogs
    // Search by title
    .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
    // Sort by date (createdAt)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  // Filter & sort for News
  const filteredNews = newsList
    // Search by title
    .filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
    // Sort by date (publishedAt)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt);
      const dateB = new Date(b.publishedAt);
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  // ---------------------
  // Pagination
  // ---------------------
  // Blogs
  const totalBlogs = filteredBlogs.length;
  const blogIndexOfLast = blogPage * pageSize;
  const blogIndexOfFirst = blogIndexOfLast - pageSize;
  const currentBlogs = filteredBlogs.slice(blogIndexOfFirst, blogIndexOfLast);

  // News
  const totalNews = filteredNews.length;
  const newsIndexOfLast = newsPage * pageSize;
  const newsIndexOfFirst = newsIndexOfLast - pageSize;
  const currentNews = filteredNews.slice(newsIndexOfFirst, newsIndexOfLast);

  // ---------------------
  // Render
  // ---------------------
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar using ViewTherapist styling */}
      <div className="hidden lg:block ml-10">
        <div className="sticky top-4 bg-slate-200 shadow rounded-lg p-4 w-[240px] ml-20 mt-20 mb-10">
          {/* Search by title */}
          <div className="mb-6">
            <p className="font-medium mb-2">Search:</p>
            <Input
              placeholder="Search title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setBlogPage(1);
                setNewsPage(1);
              }}
            />
          </div>
          {/* Filter by type */}
          <div className="mb-6">
            <p className="font-medium mb-2">Type:</p>
            <Radio.Group
              onChange={(e) => {
                setFilterType(e.target.value);
                setBlogPage(1);
                setNewsPage(1);
              }}
              value={filterType}
            >
              <Radio value="all">All</Radio>
              <Radio value="blogs">Blogs</Radio>
              <Radio value="news">News</Radio>
            </Radio.Group>
          </div>

          {/* Sort by date */}
          <div className="mb-6">
            <p className="font-medium mb-2">Sort by:</p>
            <Radio.Group
              onChange={(e) => {
                setSortOption(e.target.value);
                setBlogPage(1);
                setNewsPage(1);
              }}
              value={sortOption}
            >
              <Radio value="newest">Newest</Radio>
              <Radio value="oldest">Oldest</Radio>
            </Radio.Group>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">News & Blogs</h1>

        {/* Blogs Section (only show if filterType !== "news") */}
        {filterType !== "news" && (
          <section className="mb-10">
            {/* Card Container for Blogs */}
            <div className="bg-slate-200 shadow-lg rounded-lg p-6">
              <h3 className="text-3xl font-bold mb-4 text-center">Blogs</h3>
              {filteredBlogs.length === 0 ? (
                <p className="text-center text-gray-500">No blogs found.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
                        onChange={(page) => setBlogPage(page)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {/* News Section (only show if filterType !== "blogs") */}
        {filterType !== "blogs" && (
          <section>
            {/* Card Container for News */}
            <div className="bg-slate-200 shadow-lg rounded-lg p-6">
              <h3 className="text-3xl font-bold mb-4 text-center">News</h3>
              {filteredNews.length === 0 ? (
                <p className="text-center text-gray-500">No news found.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
                        onChange={(page) => setNewsPage(page)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
