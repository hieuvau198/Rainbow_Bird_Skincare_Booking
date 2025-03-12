import { message } from "antd";
import Cookies from "js-cookie";
import DecodeRoleId from "../../../components/DecodeRoleId";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Polyfill: Kiểm tra key có tồn tại trong FormData hay không
function formDataHas(formData, key) {
  for (let pair of formData.entries()) {
    if (pair[0] === key) {
      return true;
    }
  }
  return false;
}

const addTherapistProfile = async (therapistId, data) => {
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

    // Thêm giá trị mặc định nếu chưa có
    if (!formDataHas(formData, "Bio")) {
      formData.append("Bio", "");
    }
    if (!formDataHas(formData, "PersonalStatement")) {
      formData.append("PersonalStatement", "None");
    }
    if (!formDataHas(formData, "ProfileImage")) {
      formData.append("ProfileImage", "https://i.pravatar.cc/450?"+data.user.username);
    }
    if (!formDataHas(formData, "Education")) {
      formData.append("Education", "FPTU");
    }
    if (!formDataHas(formData, "Certifications")) {
      formData.append("Certifications", "None");
    }
    if (!formDataHas(formData, "Specialties")) {
      formData.append("Specialties", "None");
    }
    if (!formDataHas(formData, "Languages")) {
      formData.append("Languages", "None");
    }
    if (!formDataHas(formData, "YearsExperience")) {
      formData.append("YearsExperience", "0");
    }
    if (!formDataHas(formData, "AcceptsNewClients")) {
      formData.append("AcceptsNewClients", "false");
    }

    console.log("Data sent to API:", formData);

    const response = await fetch(`${API_BASE_URL}/api/TherapistProfile/${therapistId}`, {
      method: "POST",
      // Không set header Content-Type khi dùng FormData
      headers: {
        "Authorization": `Bearer ${Cookies.get("__atok")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    message.error(error.message || "Error adding The Therapist!");
    throw error;
  }
};

export default addTherapistProfile;
