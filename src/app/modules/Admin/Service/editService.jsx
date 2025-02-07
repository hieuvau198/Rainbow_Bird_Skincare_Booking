import { message } from "antd";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const editService = async (id, payload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Service/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Service updated:", data);
        return data;
    } catch (error) {
        message.error(error.message || "Error updating service!");
        throw error;
    }
};

export default editService;
