import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import getBookingById from '../../../modules/Booking/getBookingById';
import FormatDate from '../../../components/FormatDate';
import { IoIosStarOutline, IoMdStar } from 'react-icons/io';
import { message } from 'antd';
import CustomerRating from '../../../modules/Rating/CustomerRating';

export default function SkincareServiceReview() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingIdParam = searchParams.get("bookingId");

  const [booking, setBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (bookingIdParam) {
      const fetchBooking = async () => {
        try {
          const data = await getBookingById(bookingIdParam);
          setBooking(data);
        } catch (error) {
          console.error("Error fetching booking details:", error);
        }
      };
      fetchBooking();
    }
  }, [bookingIdParam]);

  const handleSubmit = async () => {
    if (!rating || !comment || !bookingIdParam) {
      message.warning("Please provide a rating and comment.");
      return;
    }

    const reviewData = {
      bookingId: Number(bookingIdParam),
      ratingValue: rating,
      experienceImageUrl: "",
      comment: comment
    };

    try {
      await CustomerRating(reviewData);
      message.success("Thank you for your review!");
      setRating(0);
      setComment("");
      navigate(-1);
    } catch (error) {
      message.error("Error submitting review. Please try again.");
      console.error("Error in CustomerRating:", error);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto my-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-3xl text-center font-bold mb-10 text-green-600">
        Review Your Skincare Service
      </h2>

      {booking ? (
        <div className="mb-6">
          <p className="text-lg">
            <strong>Service Name:</strong> {booking.serviceName}
          </p>
          <p className="text-lg">
            <strong>Therapist Name:</strong> {booking.therapistName}
          </p>
          <p className="text-lg">
            <strong>Booking Date:</strong> <FormatDate date={booking.bookingDate} />
          </p>
        </div>
      ) : (
        <Loading />
      )}

      <div className="mb-6 text-center">
        <div className="flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              type="button"
              className="focus:outline-none"
            >
              {star <= rating ? (
                <IoMdStar className="text-3xl text-yellow-400" />
              ) : (
                <IoIosStarOutline className="text-3xl text-yellow-400" />
              )}
            </button>
          ))}
        </div>
        <div className="mt-2">
          {rating ? `You have rated ${rating} stars` : 'Click on the stars to rate'}
        </div>
      </div>

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

      <button
        onClick={handleSubmit}
        disabled={!rating || !comment || !bookingIdParam}
        className={`w-full py-2 px-4 rounded text-white text-lg ${
          !rating || !comment || !bookingIdParam
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        Submit Review
      </button>
    </div>
  );
}
