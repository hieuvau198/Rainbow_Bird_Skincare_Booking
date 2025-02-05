import Cookies from "js-cookie";
import { message } from "antd";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const googleLogin = async (response, CLIENT_ID, setLoading, navigate) => {
    setLoading(true);
    try {
        const serverResponse = await fetch(`${API_BASE_URL}/api/Auth/google-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: response.credential, clientId: CLIENT_ID }),
        });
        if (!serverResponse.ok) throw new Error("Google login failed!");
        const data = await serverResponse.json();
        saveTokens(data);
        message.success("Google login successful!");
        navigate("/");
    } catch (err) {
        message.error(err.message || "Google login failed!");
    } finally {
        setLoading(false);
    }
};

export const loginUser = async (values, setLoading, navigate) => {
    setLoading(true);
    try {
        const response = await fetch(`${API_BASE_URL}/api/Auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed!");
        }
        const data = await response.json();
        saveTokens(data);
        message.success("Login successful!");
        navigate("/");
    } catch (err) {
        message.error(err.message || "Login failed!");
    } finally {
        setLoading(false);
    }
};
const saveTokens = (data) => {
    const oneHour = 1 / 24;
    
    Cookies.set("accessToken", data.accessToken, { 
        expires: oneHour, 
        sameSite: "Strict", 
        secure: true 
    });

    Cookies.set("refreshToken", data.refreshToken, { 
        expires: oneHour, 
        sameSite: "Strict", 
        secure: true 
    });
};