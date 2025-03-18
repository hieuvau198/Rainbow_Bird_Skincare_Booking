import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { SaveId } from "./getTherapistId";
import { message } from "antd";

const secretKey = process.env.REACT_APP_SECRET_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const encodeIdToBase64 = (id) => {
    return btoa(String(id));
};
export default async function getStaffId(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Staff/by-user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch. Please try again.");
        }

        const data = await response.json();
        SaveId(data.staffId, "__StaIden");
        return data;
    } catch (error) {
        // message.error("Failed to fetch. Please try again.");
        return [];
    }
}