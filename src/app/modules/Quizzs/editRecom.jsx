const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const editRecom = async (id, payload) => {
    const response = await fetch(`${API_BASE_URL}/api/QuizRecommendations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export default editRecom;
