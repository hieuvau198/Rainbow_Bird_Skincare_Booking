import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export  const editBookingStatus = async (id, newStatus) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Booking/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`
      },
      body: JSON.stringify(newStatus)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update booking status");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    message.error("Error updating booking status:", error);
    throw error;
  }
};
