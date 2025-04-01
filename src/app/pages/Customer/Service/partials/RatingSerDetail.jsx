import React, { useEffect, useState } from "react";
import { Rate, Empty, Pagination } from "antd";
import { getCustomerRating } from "../../../../modules/Rating/getAllCusRating";
import dayjs from "dayjs";

export default function RatingSerDetail({ serviceId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const data = await getCustomerRating(serviceId);
        setRatings(data);
      } catch (err) {
        console.error("Failed to fetch ratings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, [serviceId]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRatings = ratings.slice(startIndex, startIndex + pageSize);

  if (loading) return <div className="text-center my-4">Loading ratings...</div>;

  if (ratings.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mt-6">
        <h3 className="text-xl font-bold mb-2">Customer Ratings</h3>
        <Empty description="No ratings yet" />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-6">
      <h3 className="text-xl font-bold mb-4">Customer Ratings</h3>

      <div className="space-y-4">
        {paginatedRatings.map((rating) => (
          <div key={rating.ratingId} className="border-b pb-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">
                {rating.booking?.customerName || "Anonymous"}
              </span>
              <Rate disabled defaultValue={rating.ratingValue} />
            </div>
            <p className="text-gray-700 mt-1">{rating.comment}</p>
            <p className="text-xs text-gray-400">
              {dayjs(rating.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>
          </div>
        ))}
      </div>

      {/* AntD Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={ratings.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
