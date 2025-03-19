import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function getAllPayments() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Payments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`, // Authentication token
            },
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
            throw new Error("Failed to fetch payments. Please try again.");
        }

        const data = await response.json();
        console.log("Fetch payments response:", data);
        return data;
    } catch (error) {
        message.error("Failed to fetch payments. Please try again.");
        console.error("❌ Error fetching payments:", error);
        return [];
    }
}
