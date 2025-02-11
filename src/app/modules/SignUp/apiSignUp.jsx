import { message } from "antd";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function apiSignUp(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Signup failed! Please try again.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during signup:", error);
        message.error("Signup failed! Please try again.");
        throw error;
    }
}
