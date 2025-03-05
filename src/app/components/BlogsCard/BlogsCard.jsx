import React from "react";
import { Link } from "react-router-dom";

export default function BlogsCard(blog) {
    return (
        <div
            key={blog.blogId}
            className="bg-white shadow-md rounded-2xl overflow-hidden"
        >
            <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-64 object-cover"
            />
            <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-5">{blog.description}</p>
                <p className="text-gray-500 text-sm mb-2">
                    {blog.authorFullName} -{" "}
                    {new Date(blog.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <Link
                    to={`/blog/${blog.blogId}`}
                    className="text-sm font-medium text-white bg-lime-700 px-4 py-2 rounded-lg"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
}
