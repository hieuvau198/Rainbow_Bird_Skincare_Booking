import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const secretKey = process.env.REACT_APP_SECRET_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const encodeIdToBase64 = (id) => {
    return btoa(String(id));
};
export default async function getCustomerId(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Customer/user/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("__atok")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch. Please try again.");
        }

        const data = await response.json();
        const oneHour = 1 / 24;
        if (data.customerId !== undefined) {
            const encodedId = encodeIdToBase64(data.customerId);
            const encryptedId = CryptoJS.AES.encrypt(encodedId, secretKey).toString();
            Cookies.set("__CusIden", encryptedId, {
                expires: oneHour,
                sameSite: "Strict",
                secure: true
            });
        }
        return data;
    } catch (error) {
        // message.error("Failed to fetch. Please try again.");
        return [];
    }
}