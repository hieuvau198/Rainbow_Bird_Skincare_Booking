import React, { useState } from 'react';

// A simple success page
function SuccessPage() {
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
        onClick={() => window.location.reload()}
      >
        Back to Payment
      </button>
    </div>
  );
}

// A simple fail page
function FailPage() {
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
        Back to Payment
      </button>
    </div>
  );
}

export default function PaymentPage() {
  // Manage payment status: 'idle' | 'success' | 'fail'
  const [status, setStatus] = useState('idle');

  // Payment details
  const totalAmount = 599.0;
  const commission = 1.99;
  const grandTotal = totalAmount + commission;

  // Tab management
  const [activeTab, setActiveTab] = useState('vnpay');

  // Handle final payment
  const handlePay = () => {
    // For demonstration, randomly succeed or fail
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      setStatus('success');
    } else {
      setStatus('fail');
    }
  };

  // If payment is successful, show SuccessPage
  if (status === 'success') {
    return <SuccessPage />;
  }

  // If payment fails, show FailPage
  if (status === 'fail') {
    return <FailPage />;
  }

  // Otherwise, show the main payment UI
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex bg-white rounded shadow-lg overflow-hidden">
        {/* LEFT PANEL: Payment Summary */}
        <div className="bg-green-500 text-white p-6 w-72 md:w-80">
          <div className="text-3xl font-bold mb-4">
            ${totalAmount.toFixed(2)}
          </div>

          <div className="flex items-center justify-between text-sm mb-2">
            <span>Commission</span>
            <span>${commission.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-4">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <div className="text-xs mb-2">Invoice ID: SN8478042099</div>
          <div className="text-xs mb-4">Next payment: 22 July, 2018</div>

          <hr className="border-white mb-2" />
          <div className="text-xs">Customer Support: online chat 24/7</div>
        </div>

        {/* RIGHT PANEL: Payment Methods & Form */}
        <div className="p-16 w-120 md:w-96">
          <h2 className="text-lg font-bold mb-4">Payment methods</h2>

          {/* Tabs: VNPAY and Pay by Cash */}
          <div className="flex space-x-4 text-sm mb-6">
            <button
              onClick={() => setActiveTab('vnpay')}
              className={
                activeTab === 'vnpay'
                  ? 'font-semibold text-green-600'
                  : 'text-gray-500'
              }
            >
              VNPAY
            </button>
            <button
              onClick={() => setActiveTab('cash')}
              className={
                activeTab === 'cash'
                  ? 'font-semibold text-green-600'
                  : 'text-gray-500'
              }
            >
              Pay by Cash
            </button>
          </div>

          {/* VNPAY Section */}
          {activeTab === 'vnpay' && (
            <div className="mb-4 text-center">
              <div className="flex flex-col items-center">
                {/* Replace 'path/to/your-qr-image.png' with your actual QR code image path or URL */}
                <img
                  src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code-1024x1024.jpg"
                  alt="VNPAY QR Code"
                  className="mx-auto"
                  style={{ width: '200px', height: '200px' }}
                />
                <p className="mt-2 text-gray-600">
                  Scan this QR with your VNPAY app
                </p>
              </div>
            </div>
          )}

          {/* Pay by Cash Section */}
          {activeTab === 'cash' && (
            <div className="mb-4">
              <p className="bg-green-50 p-4 rounded text-gray-700 text-sm">
                Please pay in cash at our store counter. Thank you!
              </p>
            </div>
          )}

          {/* Pay Button */}
          <button
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 text-sm font-semibold"
            onClick={handlePay}
          >
            Pay ${totalAmount.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
