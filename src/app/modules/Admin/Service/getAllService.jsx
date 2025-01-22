import serviceData from '../../../../mocks/Admin/ServiceData';

const getAllService = async () => {
    try {
        // const response = await fetch("/topService");
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        return serviceData;
    } catch (error) {
        console.error("Error fetching top services:", error);
        throw error;
    }
};

export default getAllService;