const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default async function addPayment(paymentDetails) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/Payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId: paymentDetails.paymentId,
        totalAmount: paymentDetails.totalAmount,
        currency: paymentDetails.currency,
        paymentMethod: paymentDetails.paymentMethod,
        status: "Paid",
        paymentDate: new Date().toISOString(),
        tax: paymentDetails.tax || Math.round(paymentDetails.totalAmount * 0.1), // 10% tax if not specified
        sender: "Prestine Care Customer",
        receiver: "Prestine Care"
      }),
    });

    if (!response.ok) {
      throw new Error("Payment failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;  // Rethrow the error to be handled in the calling function
  }
}
