import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const deleteBooking = async (BookingId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Booking/${BookingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true;
    } catch (error) {
        console.error("Error deleting service:", error);
        throw error;
    }
};

export default deleteBooking;
