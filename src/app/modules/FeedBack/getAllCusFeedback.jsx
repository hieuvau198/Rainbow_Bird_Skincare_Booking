import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getAllCusFeedback() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/CustomerFeedback`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`, // Xác thực admin bằng token
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch customer feedback. Please try again.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        message.error("Failed to fetch customer feedback. Please try again.");
        console.error("❌ Error fetching customer feedback:", error);
        return [];
    }
}
