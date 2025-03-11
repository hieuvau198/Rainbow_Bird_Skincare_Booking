import React, { useState, useEffect } from 'react';
import getBookByCusId from '../../../modules/Booking/getBookByCusId';
import DecodeId from '../../../components/DecodeId';
import axios from 'axios';

const possibleTags = [
  'Great quality',
  'Very professional',
  'Worth the money',
  'Relaxing environment',
  'Friendly staff'
];

export default function SkincareServiceReview() {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState(null); // Thay bằng ID thực tế
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

   // ✅ Lấy thông tin `customerId` từ API khi user đăng nhập
   const fetchCustomerDetails = async () => {
    try {
      const userId = DecodeId(); // Hàm decode user từ token

      if (!userId) {
        console.error("User ID không tồn tại, vui lòng đăng nhập lại.");
        return;
      }

      const response = await axios.get(
        `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Customer/user/${userId}`
      );

      if (response.status === 200) {
        const customer = response.data;
        console.log("Thông tin khách hàng:", customer);
        
        setCustomerId(customer.customerId);
        localStorage.setItem("customerId", customer.customerId); // Lưu lại để dùng sau
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin khách hàng:", error);
    }
  };

  // ✅ Lấy danh sách lịch đặt theo `customerId`
  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      const storedCustomerId = localStorage.getItem("customerId");

      if (!storedCustomerId) {
        console.warn("Không tìm thấy Customer ID.");
        return;
      }

      console.log("Lấy lịch đặt cho CustomerId:", storedCustomerId);
      
      const data = await getBookByCusId(storedCustomerId);
      if (Array.isArray(data) && data.length > 0) {
        setBookings(data);
      } else {
        console.warn("Không có lịch đặt nào.");
      }
    };

    if (customerId) {
      fetchBookings();
    }
  }, [customerId]);
  

   // ✅ Gửi đánh giá lên API
   const handleSubmit = async () => {
    if (!rating || !comment || !selectedBookingId) {
      alert("Vui lòng chọn số sao, nhập nhận xét và chọn lịch đặt.");
      return;
    }

    const reviewData = {
      ratingId: 0,
      bookingId: Number(selectedBookingId), // Đảm bảo đúng kiểu dữ liệu
      ratingValue: rating,
      experienceImageUrl: "",
      comment: comment,
      createdAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      console.log("Gửi dữ liệu đánh giá:", reviewData);

      const response = await fetch(
        "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/CustomerRating",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Gửi đánh giá thất bại: ${errorMessage}`);
      }

      alert("Cảm ơn bạn đã gửi đánh giá!");
      setRating(0);
      setSelectedTags([]);
      setComment("");
      setSelectedBookingId(null);
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-10 pb-24 bg-slate-50">
      <div className="max-w-[1080px] mx-auto my-10 p-6 bg-green-100/70 shadow rounded">
        <h2 className="text-3xl text-center font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">
          Review Your Skincare Service
        </h2>

        {/* Chọn Booking */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Select a calendar booking to review:</p>
          <select
            value={selectedBookingId || ""}
            onChange={(e) => setSelectedBookingId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
          >
            <option value="" disabled>-- Select booking schedule --</option>
            {bookings.map((booking) => (
              <option key={booking.bookingId} value={booking.bookingId}>
                {`Booking #${booking.bookingId} - ${booking.bookingDate}`}
              </option>
            ))}
          </select>
        </div>

        {/* Star Rating */}
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                type="button"
                className="focus:outline-none"
              >
                <svg
                  className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              </button>
            ))}
          </div>
          <div className="mt-2">
            {rating ? `You have rating ${rating} stars` : 'Click on the star to rating'}
          </div>
        </div>

        {/* Comment Box */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Share your experience about service:</p>
          <textarea
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
            placeholder="Please share your service experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !rating || !comment || !selectedBookingId}
          className={`w-full py-2 px-4 rounded text-white text-lg ${
            !rating || !comment || !selectedBookingId || isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? "Sending..." : "Submit review"}
        </button>
      </div>
    </div>
  );
}
