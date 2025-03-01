import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const DecodeId = () => {
    const encryptedIden = Cookies.get("__uiden");
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    if (!encryptedIden) return null;
    const bytes = CryptoJS.AES.decrypt(encryptedIden, secretKey);

    const base64Iden = bytes.toString(CryptoJS.enc.Utf8);
    const IdenStr = atob(base64Iden);

    return parseInt(IdenStr, 10);
};
