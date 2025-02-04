import { message } from "antd";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function logOut() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed! Please try again.");
    }
    window.location.href = "/";
  } catch (error) {
    console.error("Error during logout:", error);
    message.error("Logout failed! Please try again.");
  }
}