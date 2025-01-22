import { mockTherapists } from "../../../../mocks/Admin/DashboardData";

export async function getBestTherapists() {
    try {
        // const response = await fetch("/topService");
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        return mockTherapists;
    } catch (error) {
        console.error("Error fetching top services:", error);
        throw error;
    }
}