import React, { useState, useEffect } from "react";
import { Table, Select, Spin } from "antd";
import getAllCusFeedback from "../../../modules/FeedBack/getAllCusFeedback";
import getAllCusRating from "../../../modules/Rating/getAllCusRating";

const { Option } = Select;

const Rating = () => {
  const [ratings, setRatings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingId, setSelectedBookingId] = useState(0);

  // ✅ Gọi API để lấy danh sách feedback & rating khi trang Admin được load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const ratingData = await getAllCusRating();
      const feedbackData = await getAllCusFeedback();
      setRatings(ratingData);
      setFeedbacks(feedbackData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // ✅ Lọc dữ liệu theo Booking ID (nếu người dùng chọn)
  const filteredRatings = selectedBookingId
    ? ratings.filter((r) => r.bookingId === selectedBookingId)
    : ratings;

  const filteredFeedbacks = selectedBookingId
    ? feedbacks.filter((fb) => fb.bookingId === selectedBookingId)
    : feedbacks;

  // ✅ Cột hiển thị cho bảng Rating
  const ratingColumns = [
    {
      title: "No.",
      key: "no",
      width: 70,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      width: 100,
      key: "bookingId",
    },
    {
      title: "Rating",
      dataIndex: "ratingValue",
      key: "ratingValue",
      render: (rating) => `${rating} ⭐`,
    },
    {
      title: "Comment",
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
        <h2 className="text-xl font-semibold mb-6">Customer Ratings Management</h2>

        {/* Bộ lọc Booking ID */}
        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter by Booking ID:</label>
          <Select
            value={selectedBookingId}
            onChange={(value) => setSelectedBookingId(value)}
            className="w-40"
          >
            <Option value={0}>All</Option>
            {[...new Set([...ratings, ...feedbacks].map((item) => item.bookingId))].map((id) => (
              <Option key={id} value={id}>
                Booking #{id}
              </Option>
            ))}
          </Select>
        </div>

        {/* Hiển thị bảng Rating */}
        <h3 className="text-lg font-semibold mb-2">Customer Ratings</h3>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={ratingColumns}
            dataSource={filteredRatings.map((r, index) => ({ ...r, key: index }))}
            pagination={{ pageSize: 10 }}
            bordered
            scroll={{ x: "max-content", y: 400 }}
          />
        )}
      </div>
    </div>
  );
};

export default Rating;
