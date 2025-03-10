import { message } from "antd";
import Cookies from "js-cookie";
import { saveTokens } from "./apiLogin";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function refreshToken() {
    try {
        const accessToken = Cookies.get("__atok");
        const refreshToken = Cookies.get("__rtok");

        if (!accessToken || !refreshToken) {
            throw new Error("No valid tokens found. Please log in again.");
        }

        const response = await fetch(`${API_BASE_URL}/api/Auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken, refreshToken }),
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token. Please log in again.");
        }

        const data = await response.json();
        saveTokens(data);
        return data.accessToken;
    } catch (error) {
        message.error(error.message || "Session expired. Please log in again.");

        Cookies.remove("__atok");
        Cookies.remove("__rtok");
        Cookies.remove("__urol");
        Cookies.remove("__uiden");
        Cookies.remove("__CusIden");
        Cookies.remove("__StaIden");
        Cookies.remove("__MaIden");
        Cookies.remove("__TheIden");
        window.location.href = "/login";
        throw error;
    }
}

export function autoRefreshToken() {
    const refreshInterval = 58 * 60 * 1000;

    setTimeout(async () => {
        try {
            console.log("Automatically refreshing token...");
            const newAccessToken = await refreshToken();

            if (newAccessToken) {
                console.log("Token successfully refreshed.");
                message.success("Session refreshed successfully!");
            }
        } catch (error) {
            console.error("Refresh token failed, requiring re-login.");
            message.error("Session expired. Please log in again.");
        }
    }, refreshInterval);
}
