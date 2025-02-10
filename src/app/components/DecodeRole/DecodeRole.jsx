import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const DecodeRole = () => {
    const encryptedRole = Cookies.get("_uR");

    if (!encryptedRole) return null;

    const secretKey = process.env.REACT_APP_SECRET_KEY;
    // Giải mã AES, kết quả là một WordArray
    const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
    // Chuyển đổi WordArray thành chuỗi UTF-8 chứa giá trị đã mã hóa base64
    const base64Role = bytes.toString(CryptoJS.enc.Utf8);
    const roleStr = atob(base64Role);

    return parseInt(roleStr, 10);
};
