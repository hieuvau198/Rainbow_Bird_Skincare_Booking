import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const editService = async (id, payload) => {
    try {
        const options = {
            method: "PUT",
            body: payload
        };

        if (!(payload instanceof FormData)) {
            options.headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            };
        }

        const response = await fetch(`${API_BASE_URL}/api/Service/${id}`, options);
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