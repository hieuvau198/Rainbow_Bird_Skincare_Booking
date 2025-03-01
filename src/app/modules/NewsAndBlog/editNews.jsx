const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const editNews = async (id, payload) => {
    const response = await fetch(`${API_BASE_URL}/api/News/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    // Kiểm tra nội dung trả về
    const text = await response.text();

    // Nếu không có nội dung trả về hoặc nội dung rỗng
    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        throw new Error(`Failed to parse JSON response: ${error.message}`);
    }
};

export default editNews;
