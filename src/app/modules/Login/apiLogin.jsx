import { message } from "antd";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import UserRole from "../../../enums/userRole";

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

const saveTokens = (data) => {
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

    Cookies.set("__atok", data.accessToken, {
        expires: oneHour,
        sameSite: "Strict",
        secure: true
    });

    Cookies.set("__rtok", data.refreshToken, {
        expires: oneHour,
        sameSite: "Strict",
        secure: true
    });
};

// ========================= Hàm refreshToken =========================
export async function refreshToken() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: Cookies.get("refreshToken") }),
        });

        if (!response.ok) {
            throw new Error("Refresh token failed!");
        }

        const data = await response.json();
        const oneHour = 1 / 24;

        if (data.user && data.user.role !== undefined) {
            Cookies.set("userRole", data.user.role, {
                expires: oneHour,
                sameSite: "Strict",
                secure: true
            });
        }

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

        return data.accessToken;
    } catch (error) {
        message.error("Session expired. Please log in again.");
        Cookies.remove("__atok");
        Cookies.remove("__rtok");
        Cookies.remove("__urol");
        window.location.href = "/login";
        throw error;
    }
}

// ========================= Hàm fetchWithAuth =========================
export async function fetchWithAuth(url, options = {}) {
    // Lấy accessToken hiện tại từ Cookies
    let accessToken = Cookies.get("__atok");

    // Thiết lập header mặc định
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    // Thực hiện fetch
    let response = await fetch(url, { ...options, headers });

    // Nếu lỗi 401, thử refresh token và retry request
    if (response.status === 401) {
        try {
            accessToken = await refreshToken();
            headers.Authorization = `Bearer ${accessToken}`;
            response = await fetch(url, { ...options, headers });
        } catch (error) {
            throw error;
        }
    }

    return response;
}
