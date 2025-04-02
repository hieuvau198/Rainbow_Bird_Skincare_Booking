import { message } from "antd";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const updateTherapistProfile = async (therapistId, data) => {
  try {
    let formData;

    if (data instanceof FormData) {
      formData = data;
    } else {
      formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }

    console.log("Data sent to API:", formData);

    const response = await fetch(`${API_BASE_URL}/api/TherapistProfile/${therapistId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${Cookies.get("__atok")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(errorDetail || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    message.error(error.message || "Error updating Therapist Profile!");
    throw error;
  }
};

export default updateTherapistProfile;
