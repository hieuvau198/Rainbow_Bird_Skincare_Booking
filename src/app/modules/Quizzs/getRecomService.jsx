import { message } from "antd";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getRecomService = async (id) => {
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/Service/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching service details:", error);
        message.error("Error fetching service details:", error);
    }
};
export default getRecomService;
