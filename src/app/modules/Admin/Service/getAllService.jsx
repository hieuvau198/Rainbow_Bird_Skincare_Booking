const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAllService = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/Service`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
};

export default getAllService;