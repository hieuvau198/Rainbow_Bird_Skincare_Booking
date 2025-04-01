import React, { useEffect, useState } from "react";
import { Descriptions, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import StatusColor from "../../../../components/StatusColor";
import getTimeSlotById from "../../../../modules/Admin/TimeSlot/getTimeSlotById";
import VndFormat from "../../../../components/VndFormat/VndFormat";
import FormatDate from "../../../../components/FormatDate";

export default function BookingDetail({ booking }) {
  if (!booking) return null;

  const [timeSlot, setTimeSlot] = useState({ startTime: "", endTime: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeSlot = async () => {
      try {
        const response = await getTimeSlotById(booking.slotId);
        setTimeSlot({ startTime: response.startTime, endTime: response.endTime });
      } catch (error) {
        console.error("Error fetching time slot:", error);
      }
    };
    fetchTimeSlot();
  }, [booking.slotId]);

  const handlePayment = () => {
    navigate(
      `/payment?paymentId=${booking.bookingId}&amount=${booking.servicePrice}&currency=${booking.currency || "VND"}`
    );
  };

  const handleRating = () => {
    navigate(`/rating?bookingId=${booking.bookingId}`);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md min-h-[600px]">
      <Descriptions
        title={<div className="pt-2 text-xl font-semibold">Booking Detail</div>}
        bordered
        column={1}
        layout="horizontal"
      >
        <Descriptions.Item label="Booking Date">
          <FormatDate date={booking.bookingDate} />
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={StatusColor(booking.status)}>{booking.status}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Service Name">{booking.serviceName}</Descriptions.Item>
        <Descriptions.Item label="Therapist Name">{booking.therapistName}</Descriptions.Item>
        <Descriptions.Item label="Duration">{booking.durationMinutes} Mins</Descriptions.Item>
        <Descriptions.Item label="Start Time">
          {timeSlot.startTime || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="End Time">
          {timeSlot.endTime || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Service Price">
          <VndFormat amount={booking.servicePrice} />
        </Descriptions.Item>
        <Descriptions.Item label="Payment Status">
          <Tag color={StatusColor(booking.paymentStatus)}>{booking.paymentStatus}</Tag>
        </Descriptions.Item>
      </Descriptions>

      <div className="flex gap-4 mt-4">
        {booking.paymentStatus !== "Paid" && (
          <Button
            type="primary"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            onClick={handlePayment}
          >
            Proceed to Payment
          </Button>
        )}
        {booking.status === "Checked Out" && !booking.isRated && (
          <Button
            type="primary"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleRating}
          >
            Rating
          </Button>
        )}
      </div>
    </div>
  );
}
