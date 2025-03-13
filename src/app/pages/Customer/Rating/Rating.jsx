import React, { useState, useEffect } from 'react';
import getBookByCusId from '../../../modules/Booking/getBookByCusId';
import DecodeId from '../../../components/DecodeId';
import axios from 'axios';

const API_BASE_URL = "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api";

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
  const [customerId, setCustomerId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [feedbackQuestions, setFeedbackQuestions] = useState([]);

  // ✅ Lấy thông tin `customerId` từ API khi user đăng nhập
  const fetchCustomerDetails = async () => {
    try {
      const userId = DecodeId(); // Lấy UserId từ token

      if (!userId) {
        console.error("User ID không tồn tại, vui lòng đăng nhập lại.");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/Customer/user/${userId}`);

      if (response.status === 200) {
        const customer = response.data;
        console.log("Thông tin khách hàng:", customer);

        setCustomerId(customer.customerId);
        localStorage.setItem("customerId", customer.customerId);
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
      if (!customerId) return;
      console.log("Lấy lịch đặt cho CustomerId:", customerId);
      const data = await getBookByCusId(customerId);
      if (Array.isArray(data) && data.length > 0) {
        setBookings(data);
      } else {
        console.warn("Không có lịch đặt nào.");
      }
    };

    fetchBookings();
  }, [customerId]);

  // ✅ Lấy danh sách câu hỏi feedback từ API CustomerFeedback
  useEffect(() => {
    const fetchCustomerFeedback = async () => {
      if (!selectedBookingId) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/CustomerFeedback?bookingId=${selectedBookingId}`);
        if (response.status === 200 && response.data.length > 0) {
          setFeedbackQuestions(response.data[0].customerFeedbackAnswers);
        } else {
          setFeedbackQuestions([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu feedback:", error);
      }
    };

    fetchCustomerFeedback();
  }, [selectedBookingId]);

  // ✅ Gửi đánh giá lên API
  const handleSubmit = async () => {
    if (!rating || !comment || !selectedBookingId) {
      alert("Vui lòng chọn số sao, nhập nhận xét và chọn lịch đặt.");
      return;
    }

    const reviewData = {
      ratingId: 0,
      bookingId: Number(selectedBookingId),
      ratingValue: rating,
      experienceImageUrl: "",
      comment: comment,
      createdAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);
      console.log("Gửi dữ liệu đánh giá:", reviewData);

      const response = await fetch(`${API_BASE_URL}/CustomerRating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

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
      <div className="max-w-[1080px] mx-auto my-10 p-6 bg-white shadow-md rounded">
        <h2 className="text-3xl text-center font-bold mb-10 text-green-600">
          Review Your Skincare Service
        </h2>

        {/* Chọn Booking */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Select a booking to review:</p>
          <select
            value={selectedBookingId || ""}
            onChange={(e) => setSelectedBookingId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
          >
            <option value="" disabled>-- Select booking schedule --</option>
            {bookings.map((booking) => (
              <option key={booking.bookingId} value={booking.serviceName}>
                {`${booking.serviceName} - ${booking.bookingDate}`}
              </option>
            ))}
          </select>
        </div>

        {/* Feedback Questions */}
        {feedbackQuestions.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Additional Feedback Questions:</h3>
            {feedbackQuestions.map((feedback) => (
              <div key={feedback.responseId} className="mb-4 p-2 border rounded bg-gray-50">
                <p>{feedback.answerText}</p>
              </div>
            ))}
          </div>
        )}

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
                <span className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}>⭐</span>
              </button>
            ))}
          </div>
          <div className="mt-2">{rating ? `You have rated ${rating} stars` : 'Click on the stars to rate'}</div>
        </div>

        {/* Comment Box */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Share your experience:</p>
          <textarea
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-300"
            placeholder="Tell us about your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !rating || !comment || !selectedBookingId}
          className={`w-full py-2 px-4 rounded text-white text-lg ${
            isSubmitting || !rating || !comment || !selectedBookingId
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? "Sending..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
