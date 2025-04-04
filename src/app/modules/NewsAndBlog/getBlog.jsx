import { message } from "antd";
// import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getBlog(hashtagId = null) {
  try {
    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (hashtagId !== null) {
      queryParams.append("hashtagId", hashtagId);
    }

    const url = `${API_BASE_URL}/api/Blog${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${Cookies.get("__atok")}`,
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
