import Cookies from "js-cookie"; // Ensure you're importing cookies

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function addPayment(paymentDetails) {
  try {
    // Get authentication token for API request
    const token = Cookies.get("__atok");
    
    const response = await fetch(`${API_BASE_URL}/api/Payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": token ? `Bearer ${token}` : "", // Add auth token if available
        //"Authorization": `Bearer ${Cookies.get("__atok")}`, // Authentication token
      },
      body: JSON.stringify({
        bookingId: paymentDetails.bookingId || paymentDetails.paymentId, // ✅ Ưu tiên bookingId, fallback paymentId
        totalAmount: paymentDetails.totalAmount,
        currency: paymentDetails.currency,
        paymentMethod: paymentDetails.paymentMethod,
        status: "Paid",
        paymentDate: new Date().toISOString(),
        tax: paymentDetails.tax || Math.round(paymentDetails.totalAmount * 0.1),
        sender: paymentDetails.sender || "Prestine Care Customer",
        receiver: paymentDetails.receiver || "Prestine Care",
      }),
    });

    console.log("Payment API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Payment API error:", errorData);
      throw new Error(errorData.message || "Payment failed with status: " + response.status);
    }

    const data = await response.json();
    console.log("Payment API success:", data);
    return data;
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;  // Rethrow the error to be handled in the calling function
  }
}