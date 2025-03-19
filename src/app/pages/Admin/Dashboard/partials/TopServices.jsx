import React, { useEffect, useState } from "react";
import Loading from "../../../../components/Loading/index";
import getAllBook from "../../../../modules/Booking/getAllBook";

export default function TopServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const calculatePopularity = (bookings) => {
        const totalBookings = bookings.length;
        const serviceBookingCount = {};

        bookings.forEach((booking) => {
            const serviceId = booking.serviceName;
            serviceBookingCount[serviceId] = (serviceBookingCount[serviceId] || 0) + 1;
        });

        const servicesWithPopularity = Object.keys(serviceBookingCount).map((serviceId) => {
            const serviceBooking = serviceBookingCount[serviceId];
            const popularity = totalBookings === 0 ? 0 : (serviceBooking / totalBookings) * 100;

            return { id: serviceId, name: serviceId, popularity: popularity.toFixed(2) };
        });

        servicesWithPopularity.sort((a, b) => b.popularity - a.popularity);
        return servicesWithPopularity.slice(0, 5);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookings = await getAllBook();
                const topServices = calculatePopularity(bookings);
                setServices(topServices);
            } catch (error) {
                setError("Failed to load Top Services. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (loading) {
        return <><Loading /></>;
    }

    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <h3 className="font-bold mb-4">Best Selling Services</h3>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-left p-2 border-b w-12">#</th>
                        <th className="text-left p-2 border-b w-1/4">Service</th>
                        <th className="text-left p-2 border-b w-3/4">Popularity</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr key={service.id}>
                            <td className="p-2 border-b">{index + 1}</td>
                            <td className="p-2 border-b truncate">{service.name}</td>
                            <td className="p-2 border-b">
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2 relative mr-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full absolute"
                                            style={{ width: `${service.popularity}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-gray-600">{service.popularity}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
