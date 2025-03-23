import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getRevenueByYear() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Dashboard/revenue/year`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("__atok")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch. Please try again.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    message.error("Failed to fetch. Please try again.");
    return [];
  }
}