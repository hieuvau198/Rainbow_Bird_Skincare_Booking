// BlogsAndNews/partials/NewsHashtags.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";

export default function NewsHashtags() {
  const { id } = useParams();
  const [hashtags, setHashtags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHashtags() {
      try {
        const response = await fetch(
          `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/BlogNewsHashtag/news/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch hashtags");
        const data = await response.json();
        if (Array.isArray(data)) {
          setHashtags(data); // Store the full hashtag objects
        }
      } catch (error) {
        console.error("Error fetching hashtags:", error);
        message.error("Không thể tải hashtag");
      }
    }

    fetchHashtags();
  }, [id]);

  if (!hashtags.length) return null;

  const handleHashtagClick = (hashtagId) => {
    navigate(`/newsandblog?hashtag=${hashtagId}`);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleHashtagClick(tag.hashtagId)}
            className="px-3 py-1 text-sm font-medium bg-lime-200 text-lime-800 rounded-full hover:bg-lime-300 transition cursor-pointer"
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
