import React from "react";
import { Pagination, Spin } from "antd";
import BlogsCard from "../../../../components/BlogsCard";

const BlogsTab = ({ blogs, totalBlogs, blogPage, setBlogPage, pageSize, loading }) => {
  return (
    <div className="bg-green-50 shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-serif text-gray-800 text-center flex-grow">Skincare Insights</h3>
        {loading && <Spin />}
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500 py-12">No blogs found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.map((blog) => (
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
  );
};

export default BlogsTab;