import React from "react";
import { Avatar } from "antd";
import VoteComment from "./VoteComment"; // Import the new component

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
          
          {/* Upvote & Downvote Section */}
          <VoteComment 
            commentId={comment.commentId} 
            initialUpvotes={comment.upvotes} 
            initialDownvotes={comment.downvotes} 
          />
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

export default CommentItem;
