import { mockTopServices } from "../../../../mocks/Admin/DashboardData";

export async function getTopServices() {
    try {
        // const response = await fetch("/topService");
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        return mockTopServices;
    } catch (error) {
        console.error("Error fetching top services:", error);
        throw error;
    }
}