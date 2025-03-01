import { message } from "antd";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const addNews = async (formData) => {
    try {
        console.log("Data sent to API:", formData);
        const response = await fetch(`${API_BASE_URL}/api/News`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error(error.message || "Error adding service!");
        throw error;
    }
};

export default addNews;
