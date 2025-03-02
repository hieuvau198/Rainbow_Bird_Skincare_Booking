import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getBlog from "../../../../modules/NewsAndBlog/getBlog";

export default function Blogs() {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogResponse = await getBlog();
        setBlogData(blogResponse || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to fetch blogs. Please try again.");
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
    <section className="p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogData.length > 0 ? (
          blogData.map((blog) => (
            <Link to={`/blog/${blog.blogId}`} key={blog.blogId} className="group">
              <div
                className="relative bg-white border-2 border-lime-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:scale-105"
              >
                <img
                  src={blog.imageUrl || "https://via.placeholder.com/500"}
                  alt={blog.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-lime-700 transition">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(blog.createdAt).toLocaleDateString()} - {new Date(blog.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-gray-600 text-sm">By {blog.authorFullName || "Unknown Author"}</p>
                  <button className="mt-4 text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg">
                    Read More
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No blog posts available.</p>
        )}
      </div>
    </section>
  );
}
