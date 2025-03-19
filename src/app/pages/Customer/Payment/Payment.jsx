import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PaymentSuccess from "./partials/PaymentSuccess";
import PaymentFail from "./partials/PaymentFailed";

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const totalAmount = parseFloat(searchParams.get("amount")) || 0;
  const currency = searchParams.get("currency") || "USD";
  const paymentMethod = searchParams.get("method") || "Cash";
  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("vnpay");
  const [loading, setLoading] = useState(false);
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    if (bookingId) {
      fetch(`https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Bookings/${bookingId}`)
        .then(res => res.json())
        .then(data => {
          setServiceDetails(data);
        })
        .catch(err => console.error("Error fetching service details:", err));
    }
  }, [bookingId]);

  const handlePay = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentId: bookingId,
            totalAmount: totalAmount,
            currency: currency,
            paymentMethod: activeTab === "vnpay" ? "VNPAY" : "Cash",
            status: "Paid",
            paymentDate: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setStatus("fail");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") return <PaymentSuccess />;
  if (status === "fail") return <PaymentFail />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex bg-white rounded shadow-lg overflow-hidden">
        
        {/* LEFT PANEL: Payment Summary */}
        <div className="bg-green-500 text-white p-6 w-72 md:w-80">
          <div className="text-3xl font-bold mb-4">
            {currency} {totalAmount.toFixed(2)}
          </div>
          <div className="text-xs mb-2">Booking ID: {bookingId}</div>
        </div>

        {/* RIGHT PANEL: Payment Methods & Service Details */}
        <div className="p-16 w-120 md:w-96">
          <h2 className="text-lg font-bold mb-4">Payment methods</h2>

          {serviceDetails ? (
            <div className="mb-4">
              <p className="text-gray-700 text-md font-semibold">Service Name: {serviceDetails.serviceName}</p>
              <p className="text-gray-600 text-sm">Therapist: {serviceDetails.therapistName}</p>
              <p className="text-gray-600 text-sm">Duration: {serviceDetails.durationMinutes} mins</p>
            </div>
          ) : (
            <p className="text-gray-500">Loading service details...</p>
          )}

          <div className="flex space-x-4 text-sm mb-6">
            <button onClick={() => setActiveTab("vnpay")} className={activeTab === "vnpay" ? "font-semibold text-green-600" : "text-gray-500"}>
              VNPAY
            </button>
            <button onClick={() => setActiveTab("cash")} className={activeTab === "cash" ? "font-semibold text-green-600" : "text-gray-500"}>
              Pay by Cash
            </button>
          </div>

          {activeTab === "vnpay" && (
            <div className="mb-4 text-center">
              <img src="https://www.hellotech.com/guide/wp-content/uploads/2020/05/HelloTech-qr-code-1024x1024.jpg" alt="VNPAY QR Code" className="mx-auto" style={{ width: "200px", height: "200px" }} />
              <p className="mt-2 text-gray-600">Scan this QR with your VNPAY app</p>
            </div>
          )}

          {activeTab === "cash" && (
            <div className="mb-4">
              <p className="bg-green-50 p-4 rounded text-gray-700 text-sm">
                Please pay in cash at our store counter. Thank you!
              </p>
            </div>
          )}

          <button
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 text-sm font-semibold"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ${currency} ${totalAmount.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
