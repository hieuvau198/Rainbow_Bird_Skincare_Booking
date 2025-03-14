import { message } from "antd";
import Cookies from "js-cookie";

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function logOut() {
  try {
    // const response = await fetch(`${API_BASE_URL}/api/Auth/logout`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${Cookies.get("__atok")}`,
    //   },
    // });

    // if (!response.ok) {
    //   throw new Error("Logout failed! Please try again.");
    // }

    Cookies.remove("__atok");
    Cookies.remove("__rtok");
    Cookies.remove("__urol");
    Cookies.remove("__uiden");
    Cookies.remove("__CusIden");
    Cookies.remove("__StaIden");
    Cookies.remove("__MaIden");
    Cookies.remove("__TheIden");
    
    window.location.href = "/";
  } catch (error) {
    console.error("Error during logout:", error);
    message.error("Logout failed! Please try again.");
  }
}