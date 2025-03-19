import React from "react";

export default function PaymentFail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h2 className="text-2xl font-bold text-red-700 mb-2">Payment Failed</h2>
      <p className="text-gray-700">
        Something went wrong. Please try again later.
      </p>
      <button
        className="mt-6 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
        onClick={() => window.location.reload()}
      >
        Retry Payment
      </button>
    </div>
  );
}
