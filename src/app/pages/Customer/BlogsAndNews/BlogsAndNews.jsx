import React, { useEffect, useState } from "react";
import { message, Pagination } from "antd";
import getBlog from "../../../modules/NewsAndBlog/getBlog";
import getNews from "../../../modules/NewsAndBlog/getNews";
import Loading from "../../../components/Loading";
import BlogsCard from "../../../components/BlogsCard";
import NewsCard from "../../../components/NewsCard";

export default function NewsAndBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [blogCurrentPage, setBlogCurrentPage] = useState(1);
  const [newsCurrentPage, setNewsCurrentPage] = useState(1);
  const pageSize = 6;

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
    return (
      <>
        <Loading />
      </>
    );
  }

  const indexOfLastBlog = blogCurrentPage * pageSize;
  const indexOfFirstBlog = indexOfLastBlog - pageSize;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const indexOfLastNews = newsCurrentPage * pageSize;
  const indexOfFirstNews = indexOfLastNews - pageSize;
  const currentNews = newsList.slice(indexOfFirstNews, indexOfLastNews);

  return (
    <div className="container p-6 px-24">
      <section className="mb-10">
        <h3 className="text-3xl font-bold mb-4 text-center">Blogs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentBlogs.map((blog) => (
            <BlogsCard key={blog.blogId} {...blog} />
          ))}
        </div>
        {blogs.length > pageSize && (
          <div className="mt-6 flex justify-center">
            <Pagination
              current={blogCurrentPage}
              pageSize={pageSize}
              total={blogs.length}
              onChange={(page) => setBlogCurrentPage(page)}
            />
          </div>
        )}
      </section>

      <section>
        <h3 className="text-3xl font-bold mb-4 text-center">News</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentNews.map((news) => (
            <NewsCard key={news.newsId} {...news} />
          ))}
        </div>
        {newsList.length > pageSize && (
          <div className="mt-6 flex justify-center">
            <Pagination
              current={newsCurrentPage}
              pageSize={pageSize}
              total={newsList.length}
              onChange={(page) => setNewsCurrentPage(page)}
            />
          </div>
        )}
      </section>
    </div>
  );
}
