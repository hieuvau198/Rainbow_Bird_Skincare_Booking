import React, { useEffect, useState } from "react";
import { Avatar, Spin } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const API_URL =
  "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/BlogComment/filter";

const BlogComment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL, {
        params: {
          blogId: id,
          sortBy: "createdAt",
          order: "desc",
          page: 1,
          size: 10,
        },
      })
      .then((response) => {
        const commentData = response.data?.data ?? [];
        setComments(commentData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="mt-6 bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Bình luận</h2>
      {loading ? (
        <div className="flex justify-center">
          <Spin />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">Chưa có bình luận nào, hãy là người đầu tiên bình luận!</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.commentId} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <div className="border-b pb-4">
      <div className="flex gap-3">
        <Avatar src={comment.avatarUrl} size={40} />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">{comment.fullName}</h3>
            <span className="text-gray-400 text-xs">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700 mt-1">{comment.content}</p>
          <div className="flex gap-4 text-gray-500 mt-2 text-sm">
            <button className="flex items-center gap-1 hover:text-lime-500">
              <FaRegThumbsUp /> {comment.upvotes}
            </button>
            <button className="flex items-center gap-1 hover:text-red-500">
              <FaRegThumbsDown /> {comment.downvotes}
            </button>
          </div>
        </div>
      </div>
      {/* Display Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 mt-4 space-y-3 border-l-2 border-gray-200 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.commentId} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogComment;
