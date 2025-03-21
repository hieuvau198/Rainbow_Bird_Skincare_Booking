import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getTherapist() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Therapists`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch therapists. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching therapists:", error);
    message.error("Failed to fetch therapists. Please try again.");
    return [];
  }
}