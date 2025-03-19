import React from "react";
import { Tag, Spin } from "antd";

const HashtagFilter = ({ hashtags, selectedHashtag, onHashtagClick, loading }) => {
  return (
    <div className="max-w-6xl mx-auto mb-6 bg-lime-50 rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-gray-700">Popular Topics</h4>
        {loading && <Spin size="small" />}
      </div>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag) => (
          <Tag
            key={tag.hashtagId}
            color={selectedHashtag === tag.hashtagId ? "green" : "default"}
            className="cursor-pointer px-3 py-1 text-sm rounded-full hover:bg-green-50"
            onClick={() => onHashtagClick(tag.hashtagId)}
          >
            {tag.name}
          </Tag>
        ))}
        {selectedHashtag && (
          <Tag
            className="cursor-pointer px-3 py-1 text-sm rounded-full bg-red-50 hover:bg-red-100 text-red-600"
            onClick={() => onHashtagClick(selectedHashtag)}
          >
            Clear Filters
          </Tag>
        )}
      </div>
    </div>
  );
};

export default HashtagFilter;