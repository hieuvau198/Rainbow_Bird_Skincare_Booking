import { message } from "antd";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import UserRole from "../../../enums/userRole";
import { autoRefreshToken } from "./refreshToken";

const secretKey = process.env.REACT_APP_SECRET_KEY || "ToiYeuEMToiYeuEM";
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
        autoRefreshToken();
        message.success("Google login successful!");
        const userRole = data.user.role;
        if (userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) {
            navigate("/management/dashboard");
        } else if(userRole === UserRole.STAFF){
            navigate("/management/booking");
        }else if(userRole === UserRole.THERAPIST){
            navigate("/management/schedule");
        }else {
            navigate("/");
        }
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
        autoRefreshToken();
        const userRole = data.user.role;
        if (userRole === UserRole.ADMIN || userRole === UserRole.MANAGER) {
            navigate("/management/dashboard");
        } else if(userRole === UserRole.STAFF){
            navigate("/management/booking");
        }else if(userRole === UserRole.THERAPIST){
            navigate("/management/schedule");
        }else {
            navigate("/");
        }
        message.success("Login successful!");
    } catch (err) {
        message.error(err.message || "Login failed!");
    } finally {
        setLoading(false);
    }
};

const encodeRoleToBase64 = (role) => {
    return btoa(String(role));
};

export const saveTokens = (data) => {
    const oneHour = 1 / 24;

    if (data.user && data.user.role !== undefined) {
        const encodedRole = encodeRoleToBase64(data.user.role);
        const encryptedRole = CryptoJS.AES.encrypt(encodedRole, secretKey).toString();
        Cookies.set("__urol", encryptedRole, {
            expires: oneHour,
            sameSite: "Strict",
            secure: true
        });
    }
    
    if (data.user && data.user.userId !== undefined) {
        const encodedRole = encodeRoleToBase64(data.user.userId);
        const encryptedRole = CryptoJS.AES.encrypt(encodedRole, secretKey).toString();
        Cookies.set("__uiden", encryptedRole, {
            expires: oneHour,
            sameSite: "Strict",
            secure: true
        });
    }

    Cookies.set("__atok", data.accessToken, {
        expires: oneHour,
        sameSite: "Strict",
        secure: true
    });

    Cookies.set("__rtok", data.refreshToken, {
        sameSite: "Strict",
        secure: true
    });
};
