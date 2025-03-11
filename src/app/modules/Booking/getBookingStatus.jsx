import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getBookingStatus = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Booking/${id}/status`, {
      method: "GET",
      headers: {
        "accept": "*/*",
        "Authorization": `Bearer ${Cookies.get("__atok")}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch booking status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    message.error("Error fetching booking status:", error);
    throw error;
  }
};
