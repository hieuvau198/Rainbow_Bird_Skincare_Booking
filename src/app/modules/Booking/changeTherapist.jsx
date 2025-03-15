import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function changeTherapist(bookingId, therapistId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Booking/${bookingId}/therapist`, {
      method: "PATCH",
      headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`
      },
      body: JSON.stringify({ therapistId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update therapist");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    message.error(error);
    throw error;
  }
}
