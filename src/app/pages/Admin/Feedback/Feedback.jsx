import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message } from "antd";
import { TfiReload } from "react-icons/tfi";
import getAllCusFeedback from "../../../modules/FeedBack/getAllCusFeedback";

export default function CustomerFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hàm lấy dữ liệu feedback từ API
  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCusFeedback();
      setFeedbacks(data);
    } catch (error) {
      message.error("Failed to fetch customer feedback");
      console.error("Error fetching customer feedback:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // Định nghĩa các cột hiển thị trong bảng
  const columns = [
    {
      title: "Feedback ID",
      dataIndex: "customerFeedbackId",
      key: "customerFeedbackId",
      width: 100,
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
      width: 100,
    },
    {
      title: "Booking Date",
      dataIndex: ["booking", "bookingDate"],
      key: "bookingDate",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Submitted At",
      dataIndex: "submittedAt",
      key: "submittedAt",
      width: 150,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Answers",
      dataIndex: "customerFeedbackAnswers",
      key: "answers",
      render: (answers) => {
        if (!answers || answers.length === 0) return "-";
        return answers.map((ans, index) => (
          <div key={index}>{ans.answerText}</div>
        ));
      },
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Customer Feedback</h2>
        </div>
        <Table
          dataSource={feedbacks}
          columns={columns}
          rowKey="customerFeedbackId"
          loading={loading}
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: "max-content", y: 250 }}
        />
      </div>
    </div>
  );
}
