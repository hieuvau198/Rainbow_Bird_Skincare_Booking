import React, { useState, useEffect } from "react";
import { Table, Select, Spin } from "antd";
import getAllFeedback from "../../../modules/FeedBack/getAllFeedback";

const { Option } = Select;

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStar, setFilterStar] = useState(0);

  // ✅ Lấy danh sách feedback khi trang được load
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      const data = await getAllFeedback();
      setFeedbacks(data);
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  // ✅ Bộ lọc số sao
  const filteredFeedbacks = filterStar
    ? feedbacks.filter((fb) => fb.ratingValue === filterStar)
    : feedbacks;

  // ✅ Cột hiển thị cho bảng Ant Design
  const columns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Rating",
      dataIndex: "ratingValue",
      key: "ratingValue",
      render: (rating) => `${rating} ⭐`,
    },
    {
      title: "Feedback",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        <h2 className="text-xl font-semibold mb-6">Customer Feedback Management</h2>

        {/* Bộ lọc số sao */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter by Star Rating:</label>
          <Select
            value={filterStar}
            onChange={(value) => setFilterStar(value)}
            className="w-40"
          >
            <Option value={0}>All</Option>
            <Option value={5}>5 Stars</Option>
            <Option value={4}>4 Stars</Option>
            <Option value={3}>3 Stars</Option>
            <Option value={2}>2 Stars</Option>
            <Option value={1}>1 Star</Option>
          </Select>
        </div>

        {/* Hiển thị bảng */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredFeedbacks.map((fb, index) => ({ ...fb, key: index }))}
            pagination={{ pageSize: 10 }}
            bordered
            scroll={{ x: "max-content", y: 400 }}
          />
        )}
      </div>
    </div>
  );
};

export default Feedback;
