import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const addTherapist = async (formData) => {
    try {
        console.log("Data sent to API:", formData);
        const response = await fetch(`${API_BASE_URL}/api/Therapists/with-user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        message.error(error.message || "Error adding The Therapist!");
        throw error;
    }
};

export default addTherapist;
