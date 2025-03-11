import { message } from "antd";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import UserRole from "../../../enums/userRole";
import { autoRefreshToken } from "./refreshToken";
import getCustomerId from "../Iden/getCustomerId";
import getStaffId from "../Iden/getStaffId";
import getManagerId from "../Iden/getManagerId";
import getTherapistId from "../Iden/getTherapistId";
import DecodeId from "../../components/DecodeId";

const secretKey = process.env.REACT_APP_SECRET_KEY;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const googleLogin = async (response, CLIENT_ID, setLoading, navigate, redirectPath = null) => {
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
        const userRole = data.user.role;
        const userId = DecodeId();

        switch (userRole) {
            case UserRole.ADMIN:
                navigate("/management/dashboard");
                break;
            case UserRole.MANAGER:
                await getManagerId(userId);
                navigate("/management/dashboard");
                break;
            case UserRole.STAFF:
                await getStaffId(userId);
                navigate("/management/booking");
                break;
            case UserRole.THERAPIST:
                await getTherapistId(userId);
                navigate("/management/schedule");
                break;
            default:
                await getCustomerId(userId);
                if (redirectPath) {
                    navigate(redirectPath, { replace: true });
                } else {
                    navigate("/");
                }
                break;
        }
        message.success("Google login successful!");
    } catch (err) {
        message.error(err.message || "Google login failed!");
    } finally {
        setLoading(false);
    }
};

export const loginUser = async (values, setLoading, navigate, redirectPath = null) => {
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
        const userId = data.user.userId;

        switch (userRole) {
            case UserRole.ADMIN:
                navigate("/management/dashboard");
                break;
            case UserRole.MANAGER:
                navigate("/management/dashboard");
                await getManagerId(userId);
                break;
            case UserRole.STAFF:
                navigate("/management/booking");
                await getStaffId(userId);
                break;
            case UserRole.THERAPIST:
                navigate("/management/schedule");
                await getTherapistId(userId);
                break;
            default:
                await getCustomerId(userId);
                if (redirectPath) {
                    navigate(redirectPath, { replace: true });
                } else {
                    navigate("/");
                }
                break;
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
        const encodedId = encodeRoleToBase64(data.user.userId);
        const encryptedId = CryptoJS.AES.encrypt(encodedId, secretKey).toString();
        Cookies.set("__uiden", encryptedId, {
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
