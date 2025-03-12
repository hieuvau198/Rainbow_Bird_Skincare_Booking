import React, { useEffect, useState } from 'react';
import DecodeRoleId from '../../../components/DecodeRoleId';
import Loading from '../../../components/Loading';
import getBookByTheId from '../../../modules/Booking/getBookByTheId';
import CalendarTherapist from './partials/CalendarTherapist';
import TodayBooking from './partials/TodayBooking';

export default function TherapistChedule() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const therapistId = DecodeRoleId("__TheIden");

    useEffect(() => {
        async function fetchBookings() {
            if (therapistId) {
                try {
                    const data = await getBookByTheId(therapistId);
                    setBookings(data);
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                } finally {
                    setLoading(false);
                }
            }
        }
        fetchBookings();
    }, [therapistId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-6 max-w-[1270px] grid grid-cols-3 gap-4">
            <div className="col-span-2 ">
                <CalendarTherapist bookings={bookings} />
            </div>
            <div className="col-span-1">
                <div className="grid gap-4 min-h-[600px]">
                    <div className="p-6 bg-white rounded-md shadow-md">
                        <TodayBooking bookings={bookings} />
                    </div>
                </div>
            </div>
        </div>
    );
}
