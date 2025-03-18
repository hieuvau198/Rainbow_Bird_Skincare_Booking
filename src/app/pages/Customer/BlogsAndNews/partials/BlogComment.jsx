import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";

const API_BASE =
  "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/BlogComment";

const BlogComment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [id]);

  const fetchComments = () => {
    setLoading(true);
    axios
      .get(API_BASE + "/filter", {
        params: { blogId: id, sortBy: "createdAt", order: "desc", page: 1, size: 10 },
      })
      .then((response) => {
        setComments(response.data?.data ?? []);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mt-6 bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Bình luận</h2>

      {/* Add Comment Component */}
      <AddComment blogId={id} onCommentAdded={fetchComments} />

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center">
          <Spin />
        </div>
      )}

      {/* Comments List */}
      {!loading && comments.length === 0 && (
        <p className="text-gray-500">Chưa có bình luận nào, hãy là người đầu tiên bình luận!</p>
      )}

      {!loading && comments.length > 0 && (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem 
              key={comment.commentId} 
              comment={comment} 
              blogId={id} 
              onCommentAdded={fetchComments} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogComment;
