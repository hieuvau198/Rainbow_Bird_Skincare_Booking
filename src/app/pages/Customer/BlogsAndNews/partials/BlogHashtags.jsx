import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { message } from "antd";

export default function BlogHashtags() {
  const { id } = useParams();
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    async function fetchHashtags() {
      try {
        const response = await fetch(
          `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/BlogNewsHashtag/blog/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch hashtags");
        const data = await response.json();
        if (Array.isArray(data)) {
          setHashtags(data.map((tag) => tag.name)); // Assuming 'tittle' is the actual hashtag name
        }
      } catch (error) {
        console.error("Error fetching hashtags:", error);
        message.error("Không thể tải hashtag");
      }
    }

    fetchHashtags();
  }, [id]);

  if (!hashtags.length) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag, index) => (
          <Link
            key={index}
            to={`/blogs?hashtag=${encodeURIComponent(tag)}`}
            className="px-3 py-1 text-sm font-medium bg-lime-200 text-lime-800 rounded-full hover:bg-lime-300 transition"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
