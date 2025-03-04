import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getBlog from "../../../modules/NewsAndBlog/getBlog";

export default function HomeRecentBlogs() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlog();
        const formattedBlogs = data.map((blog) => ({
          id: blog.blogId || "N/A",
          subtitle: "LATEST BLOG",
          title: blog.title || "No title available",
          description: blog.description || "No description available.",
          buttonText: "Read More",
          image: blog.imageUrl || "https://via.placeholder.com/500",
        }));
        setBlogData(formattedBlogs.slice(0, 2)); // Hiển thị 2 bài viết
      } catch (err) {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="bg-slate-50 py-10 border border-lime-200">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-center font-bold font-Arial mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          BLOG POSTS
        </h2>

        {/* Hiển thị 2 bài viết*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogData.map((blog) => (
            <div
              key={blog.id}
              className="relative h-[350px] md:h-[400px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition group border border-lime-200"
            >
              {/* Ảnh nền với hiệu ứng blur */}
              <img
                src={blog.image}
                alt={blog.title}
                className="absolute w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 blur-[2px]"
              />

              {/* Nội dung overlay */}
              <div className="relative z-10 h-full mt-4 flex flex-col justify-center px-6 text-gray-950">
                <p className="text-sm uppercase tracking-widest font-semibold mb-2 opacity-90">
                  {blog.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug">
                  {blog.title}
                </h3>
                <p className="mt-8 text-sm text-gray-800 md:text-base max-w-md opacity-90">
                  {blog.description.length > 100
                    ? `${blog.description.slice(0, 100)}...`
                    : blog.description}
                </p>
              </div>

              {/* Nút Read More */}
              <Link to={`/blog/${blog.id}`}>
                <button
                  className="absolute bottom-4 left-6 text-sm font-bold px-4 py-2 text-green-700 rounded-lg transition duration-300 transform hover:scale-105 z-20"
                >
                  {blog.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
