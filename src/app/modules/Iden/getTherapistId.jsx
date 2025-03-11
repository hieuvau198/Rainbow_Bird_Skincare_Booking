import { message } from "antd";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const encodeIdToBase64 = (id) => {
    return btoa(String(id));
};

export default async function getTherapistId(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Therapists/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain",
                // "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch. Please try again.");
        }

        const data = await response.json();
        SaveId(data.therapistId, "__TheIden");
        return data;
    } catch (error) {
        message.error("Failed to fetch. Please try again.");
        return [];
    }
}
export const SaveId = (id, name) => {
    const oneHour = 1 / 24;
    const encodedId = encodeIdToBase64(id);
    const encryptedId = CryptoJS.AES.encrypt(encodedId, secretKey).toString();
    Cookies.set(name, encryptedId, {
        expires: oneHour,
        sameSite: "Strict",
        secure: true
    });
}