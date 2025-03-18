import React, { useState } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import DecodeId from "../../../../components/DecodeId";

const API_BASE =
  "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/BlogComment";

const AddComment = ({ blogId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState("");
  const userId = DecodeId(); // Get current user ID

  const handleSubmit = () => {
    if (!newComment.trim()) {
      message.warning("Vui lòng nhập nội dung bình luận!");
      return;
    }
    if (!userId) {
      message.error("Bạn cần đăng nhập để bình luận!");
      return;
    }

    const commentData = {
      blogId: parseInt(blogId, 10),
      userId: userId,
      parentCommentId: 0, // Top-level comment
      content: newComment.trim(),
    };

    axios
      .post(API_BASE, commentData)
      .then(() => {
        message.success("Bình luận đã được đăng!");
        setNewComment("");
        onCommentAdded(); // Refresh comments
      })
      .catch(() => {
        message.error("Lỗi khi đăng bình luận!");
      });
  };

  return (
    <div className="mb-6">
      <Input.TextArea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Viết bình luận của bạn..."
        autoSize={{ minRows: 3 }}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <Button type="primary" className="mt-2" onClick={handleSubmit}>
        Gửi bình luận
      </Button>
    </div>
  );
};

export default AddComment;
