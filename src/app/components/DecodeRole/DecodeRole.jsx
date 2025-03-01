import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;

export const DecodeRole = () => {
    const encryptedRole = Cookies.get("__urol");

    if (!encryptedRole) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedRole, secretKey);
    const base64Role = bytes.toString(CryptoJS.enc.Utf8);
    const roleStr = atob(base64Role);

    return parseInt(roleStr, 10);
};

export const DecodeId = () => {
    const encryptedIden = Cookies.get("__uiden");

    if (!encryptedIden) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedIden, secretKey);

    const base64Iden = bytes.toString(CryptoJS.enc.Utf8);
    const IdenStr = atob(base64Iden);

    return parseInt(IdenStr, 10);
};
