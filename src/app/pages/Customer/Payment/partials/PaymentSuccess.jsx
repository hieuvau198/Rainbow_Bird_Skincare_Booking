import React from "react";

export default function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h2 className="text-2xl font-bold text-green-700 mb-2">
        Payment Successful
      </h2>
      <p className="text-gray-700">
        Your payment has been processed successfully.
      </p>
      <button
        className="mt-6 px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
        onClick={() => window.location.href = "/"}
      >
        Back to Home
      </button>
    </div>
  );
}
