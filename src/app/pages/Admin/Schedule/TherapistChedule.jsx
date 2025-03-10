import React, { useEffect, useState } from 'react';
import BookingList from './partials/BookingList';
import CalendarTherapist from './partials/CalendarTherapist';
import TodayBooking from './partials/TodayBooking';
import getBookByTheId from '../../../modules/Booking/getBookByTheId';
import DecodeRoleId from '../../../components/DecodeRoleId';
import Loading from '../../../components/Loading';

export default function TherapistChedule() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // const therapistId = DecodeRoleId("__TheIden");
    const therapistId = 2;

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
        return <><Loading /></>;
    }

    return (
        <div className="p-6 max-w-[1270px] grid grid-cols-12 gap-4">
            <div className="col-span-8 p-6 bg-white rounded-md shadow-md min-h-[600px]">
                <h2 className="text-xl font-semibold mb-6">Booking List</h2>
                <BookingList bookings={bookings} />
            </div>
            <div className="col-span-4">
                <div className="grid grid-rows-2 gap-4 min-h-[600px]">
                    <div className="row-span-1 p-6 bg-white rounded-md shadow-md">
                        <CalendarTherapist />
                    </div>
                    <div className="row-span-1 p-6 bg-white rounded-md shadow-md">
                        <TodayBooking bookings={bookings} />
                    </div>
                </div>
            </div>
        </div>
    );
}
