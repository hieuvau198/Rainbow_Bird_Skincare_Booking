import React, { useState } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import DecodeId from "../../../../components/DecodeId";

const API_BASE =
  "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/BlogComment";

const AddComment = ({ blogId, parentCommentId = 0, onCommentAdded, onCancel }) => {
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
      parentCommentId: parentCommentId, // Top-level or reply
      content: newComment.trim(),
    };

    axios
      .post(API_BASE, commentData)
      .then(() => {
        message.success("Bình luận đã được đăng!");
        setNewComment("");
        onCommentAdded(); // Refresh comments
        if (onCancel) onCancel(); // Close reply input
      })
      .catch(() => {
        message.error("Lỗi khi đăng bình luận!");
      });
  };

  return (
    <div className="mb-4">
      <Input.TextArea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={parentCommentId ? "Viết câu trả lời của bạn..." : "Viết bình luận của bạn..."}
        autoSize={{ minRows: 2 }}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="flex gap-2 mt-2">
        <Button type="primary" onClick={handleSubmit}>
          {parentCommentId ? "Trả lời" : "Gửi bình luận"}
        </Button>
        {onCancel && (
          <Button onClick={onCancel} danger>
            Hủy
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddComment;
