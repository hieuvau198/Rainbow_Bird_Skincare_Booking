const API_GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_GEMINI_API_KEY}`;

export default async function chatBotAI(prompt) {
    console.log("API_KEY:", API_GEMINI_API_KEY);
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        if (!response.ok) {
            throw new Error("API response was not ok");
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Chatbot API Error:", error);
        return "Sorry, an error occurred.";
    }
}
