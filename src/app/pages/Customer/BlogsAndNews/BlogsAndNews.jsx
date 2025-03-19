// BlogsAndNews/BlogsAndNews.jsx
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import SearchBar from "./partials/SearchBar";
import HashtagFilter from "./partials/HashtagFilter";
import NewsTab from "./partials/NewsTab";
import BlogsTab from "./partials/BlogsTab";
import getBlog from "../../../modules/NewsAndBlog/getBlog";
import getNews from "../../../modules/NewsAndBlog/getNews";
import { message } from "antd";

export default function BlogsAndNews() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get hashtag from URL query parameters
  const getHashtagFromQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    const hashtagId = searchParams.get("hashtag");
    return hashtagId ? parseInt(hashtagId, 10) : null;
  };

  const [blogs, setBlogs] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [selectedHashtag, setSelectedHashtag] = useState(getHashtagFromQuery());

  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingHashtags, setLoadingHashtags] = useState(true);

  const [activeTab, setActiveTab] = useState("news");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPage, setBlogPage] = useState(1);
  const [newsPage, setNewsPage] = useState(1);
  const pageSize = 8;

  // Update URL when selectedHashtag changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (selectedHashtag) {
      searchParams.set("hashtag", selectedHashtag);
    } else {
      searchParams.delete("hashtag");
    }

    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true }
    );
  }, [selectedHashtag, navigate, location.pathname]);

  // Fetch hashtags data first
  useEffect(() => {
    async function fetchHashtags() {
      try {
        const response = await fetch(
          "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Hashtag"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hashtags");
        }
        const data = await response.json();
        setHashtags(data);
      } catch (error) {
        message.error("Error loading hashtags");
        console.error("Error fetching hashtags:", error);
      } finally {
        setLoadingHashtags(false);
      }
    }
    fetchHashtags();
  }, []);

  // Fetch blogs with selected hashtag
  useEffect(() => {
    async function fetchBlogs() {
      setLoadingBlogs(true);
      try {
        const data = await getBlog(selectedHashtag);
        setBlogs(data);
      } catch (error) {
        message.error("Error loading blogs data");
        console.error("Error fetching blogs:", error);
      } finally {
        setLoadingBlogs(false);
      }
    }
    fetchBlogs();
  }, [selectedHashtag]);

  // Fetch news with selected hashtag
  useEffect(() => {
    async function fetchNews() {
      setLoadingNews(true);
      try {
        const data = await getNews(selectedHashtag);
        setNewsList(data);
      } catch (error) {
        message.error("Error loading news data");
        console.error("Error fetching news:", error);
      } finally {
        setLoadingNews(false);
      }
    }
    fetchNews();
  }, [selectedHashtag]);

  const handleHashtagClick = (hashtagId) => {
    if (selectedHashtag === hashtagId) {
      setSelectedHashtag(null); // Clear filter
    } else {
      setSelectedHashtag(hashtagId); // Apply filter
    }
    // Reset pagination when changing filters
    setBlogPage(1);
    setNewsPage(1);
  };

  if (loadingHashtags || (loadingBlogs && loadingNews)) {
    return <Loading />;
  }

  // Now we only need to filter by search query since hashtag filtering happens at API level
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNews = newsList.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate current page data
  const totalBlogs = filteredBlogs.length;
  const currentBlogs = filteredBlogs.slice(
    (blogPage - 1) * pageSize,
    blogPage * pageSize
  );

  const totalNews = filteredNews.length;
  const currentNews = filteredNews.slice(
    (newsPage - 1) * pageSize,
    newsPage * pageSize
  );

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center">
      <div className="w-full max-w-6xl p-6">
        {/* Search Bar Component */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Hashtag Filter Component */}
        <HashtagFilter
          hashtags={hashtags}
          selectedHashtag={selectedHashtag}
          onHashtagClick={handleHashtagClick}
          loading={loadingBlogs || loadingNews}
        />

        {/* Tabs for News and Blogs */}
        <div className="bg-lime-50 p-3 rounded-xl shadow-md">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered
            className="flex justify-center gap-6"
          >
            {/* News Tab */}
            <Tabs.TabPane
              tab={
                <span className="text-lg font-semibold text-gray-700 hover:text-green-600">
                  🌿 News
                </span>
              }
              key="news"
            >
              <NewsTab
                newsList={currentNews}
                totalNews={totalNews}
                newsPage={newsPage}
                setNewsPage={setNewsPage}
                pageSize={pageSize}
                loading={loadingNews}
              />
            </Tabs.TabPane>

            {/* Blogs Tab */}
            <Tabs.TabPane
              tab={
                <span className="text-lg font-semibold text-gray-700 hover:text-green-600">
                  💆 Blogs
                </span>
              }
              key="blogs"
            >
              <BlogsTab
                blogs={currentBlogs}
                totalBlogs={totalBlogs}
                blogPage={blogPage}
                setBlogPage={setBlogPage}
                pageSize={pageSize}
                loading={loadingBlogs}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
