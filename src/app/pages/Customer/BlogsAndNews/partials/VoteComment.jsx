import React, { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const API_BASE =
  "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/BlogComment";

const VoteComment = ({ commentId, initialUpvotes, initialDownvotes }) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [isVoting, setIsVoting] = useState(false); // Prevents spam clicking

  const handleVote = (type) => {
    if (isVoting) return; // Prevent multiple clicks

    setIsVoting(true);
    const voteUrl = `${API_BASE}/${commentId}/${type}`;
    
    axios.post(voteUrl)
      .then(() => {
        message.success(`Bạn đã ${type === "upvote" ? "thích" : "không thích"} bình luận này!`);
        // Optimistically update the count
        if (type === "upvote") setUpvotes(upvotes + 1);
        if (type === "downvote") setDownvotes(downvotes + 1);
      })
      .catch(() => {
        message.error("Lỗi khi bình chọn. Vui lòng thử lại!");
      })
      .finally(() => {
        setTimeout(() => setIsVoting(false), 1000); // Prevent rapid clicking
      });
  };

  return (
    <div className="flex gap-4 text-gray-500 mt-2 text-sm">
      <button
        className={`flex items-center gap-1 hover:text-lime-500 ${isVoting ? "opacity-50" : ""}`}
        onClick={() => handleVote("upvote")}
        disabled={isVoting}
      >
        <FaRegThumbsUp /> {upvotes}
      </button>
      <button
        className={`flex items-center gap-1 hover:text-red-500 ${isVoting ? "opacity-50" : ""}`}
        onClick={() => handleVote("downvote")}
        disabled={isVoting}
      >
        <FaRegThumbsDown /> {downvotes}
      </button>
    </div>
  );
};

export default VoteComment;
