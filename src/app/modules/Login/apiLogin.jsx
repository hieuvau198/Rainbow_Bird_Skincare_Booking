import { message } from "antd";
import Cookies from "js-cookie";

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

// Lưu accessToken và refreshToken vào Cookies với thời gian hết hạn 1 giờ
const saveTokens = (data) => {
    const oneHour = 1 / 24; // 1 giờ = 1/24 ngày

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

// ========================= Hàm refreshToken =========================
export async function refreshToken() {
    try {
        // Gửi refreshToken lấy từ Cookies đến API refresh-token
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
        const oneHour = 1 / 24; // 1 giờ

        // Cập nhật lại Cookies với token mới
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
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        throw error;
    }
}

// ========================= Hàm fetchWithAuth =========================
export async function fetchWithAuth(url, options = {}) {
    // Lấy accessToken hiện tại từ Cookies
    let accessToken = Cookies.get("accessToken");

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
