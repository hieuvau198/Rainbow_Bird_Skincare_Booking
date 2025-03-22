import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Spin, Radio, Alert, Tag, Divider } from "antd";
import { CreditCardOutlined, DollarOutlined, CheckCircleOutlined } from "@ant-design/icons";
import PaymentSuccess from "./partials/PaymentSuccess";
import PaymentFail from "./partials/PaymentFailed";
import getPayment from "../../../modules/Payment/getPayment";
import addPayment from "../../../modules/Payment/addPayment"; 

export default function PaymentPage() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  const [status, setStatus] = useState("idle");
  const [activeTab, setActiveTab] = useState("vnpay");
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPaymentDetails() {
      if (!paymentId) {
        setFetchingDetails(false);
        setError("No payment ID provided");
        return;
      }

      setFetchingDetails(true);
      setError(null);
      
      try {
        // Gọi API để lấy tất cả payment
        const allPayments = await getPayment();
        
        // Tìm payment theo paymentId
        const payment = allPayments.find(p => p.paymentId.toString() === paymentId);
        
        if (payment) {
          setPaymentDetails(payment);
        } else {
          // Nếu không tìm thấy payment, tạo một payment mới từ query params
          const newPayment = {
            paymentId: parseInt(paymentId),
            totalAmount: parseFloat(searchParams.get("amount") || 0),
            currency: searchParams.get("currency") || "VND",
            status: "Pending",
            paymentDate: new Date().toISOString(),
            // Thêm các trường khác nếu cần
          };
          setPaymentDetails(newPayment);
        }
      } catch (error) {
        setError("Error fetching payment details: " + error.message);
        console.error("Error fetching payment details:", error);
      } finally {
        setFetchingDetails(false);
      }
    }

    fetchPaymentDetails();
  }, [paymentId]);

  const handlePay = async () => {
    if (!paymentDetails) return;
  
    setLoading(true);
    try {
      // Create payment payload
      const paymentPayload = {
        paymentId: paymentDetails.paymentId,
        totalAmount: paymentDetails.totalAmount,
        currency: paymentDetails.currency,
        paymentMethod: activeTab === "vnpay" ? "VNPAY" : "Cash",
        tax: paymentDetails.tax || Math.round(paymentDetails.totalAmount * 0.1),
      };
  
      // Call API to process payment
      const paymentResponse = await addPayment(paymentPayload);
      
      // If the response exists, set status to success
      if (paymentResponse && paymentResponse.paymentId) {
        // Update local payment details with new status
        setPaymentDetails({
          ...paymentDetails,
          status: "Paid",
          paymentMethod: activeTab === "vnpay" ? "VNPAY" : "Cash",
          paymentDate: new Date().toISOString()
        });
        
        // Set status to success to show PaymentSuccess component
        setStatus("success");
      } else {
        throw new Error("Payment response was empty");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setStatus("fail");
    } finally {
      setLoading(false);
    }
  };

  // Format currency function
  const formatCurrency = (amount, currency) => {
    if (currency === "VND") {
      return new Intl.NumberFormat('vi-VN').format(amount) + " ₫";
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (status === "success") return <PaymentSuccess paymentDetails={paymentDetails} />;
  if (status === "fail") return <PaymentFail />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white">
          <h1 className="text-3xl font-bold">Prestine Care Payment</h1>
          <p className="text-green-100">Complete your payment securely</p>
        </div>
        
        {fetchingDetails ? (
          <div className="p-10 text-center">
            <Spin size="large" />
            <p className="mt-4 text-gray-500">Loading payment details...</p>
          </div>
        ) : error ? (
          <div className="p-10 text-center">
            <Alert
              message="Payment Error"
              description={error}
              type="error"
              showIcon
            />
          </div>
        ) : paymentDetails ? (
          <div className="md:flex">
            {/* LEFT PANEL: Payment Summary */}
            <div className="p-6 md:w-1/2 border-r border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Details</h2>
              
              <div className="space-y-4">
                {/* <div>
                  <p className="text-sm text-gray-500">Payment ID</p>
                  <p className="font-semibold text-gray-700">#{paymentDetails.paymentId}</p>
                </div> */}

                <div>
                  <p className="text-sm text-gray-500">ToTal Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(paymentDetails.totalAmount, paymentDetails.currency)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Tax</p>
                  <p className="font-semibold text-gray-700">
                    {formatCurrency(paymentDetails.tax || Math.round(paymentDetails.totalAmount * 0.1), paymentDetails.currency)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Payment Date</p>
                  <p className="font-semibold text-gray-700">
                    {paymentDetails.paymentDate ? formatDate(paymentDetails.paymentDate) : "Pending"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Tag color={paymentDetails.status === "Paid" ? "success" : "warning"}>
                    {paymentDetails.status || "Pending"}
                  </Tag>
                </div>

                <Divider />

                <div>
                  <p className="text-sm text-gray-500">Receiver</p>
                  <p className="font-semibold text-gray-700">{paymentDetails.receiver || "Prestine Care"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Sender</p>
                  <p className="font-semibold text-gray-700">{paymentDetails.sender || "Prestine Care Customer"}</p>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: Payment Methods & Actions */}
            <div className="p-6 md:w-1/2">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Method</h2>
              
              <Radio.Group 
                onChange={(e) => setActiveTab(e.target.value)}
                value={activeTab}
                buttonStyle="solid"
                className="w-full mb-6"
              >
                <Radio.Button 
                  value="vnpay" 
                  className="w-1/2 text-center py-2 flex items-center justify-center"
                >
                  <CreditCardOutlined className="mr-2" /> VNPAY
                </Radio.Button>
                <Radio.Button 
                  value="cash" 
                  className="w-1/2 text-center py-2 flex items-center justify-center"
                >
                  <DollarOutlined className="mr-2" /> Cash
                </Radio.Button>
              </Radio.Group>

              {activeTab === "vnpay" && (
                <div className="mb-6 text-center">
                  <div className="bg-white p-4 rounded-lg border-2 border-green-500 inline-block">
                    <img 
                      src="data:image/jpeg;base64,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" 
                      alt="VNPAY QR Code" 
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  <p className="mt-4 text-gray-600">Scan QR code with VNPAY app to complete payment</p>
                </div>
              )}

              {activeTab === "cash" && (
                <Alert
                  message="Cash Payment"
                  description="Please pay in cash at our store counter. Our staff will assist you with the payment process."
                  type="info"
                  showIcon
                  className="mb-6"
                />
              )}

              {paymentDetails.status === "Paid" ? (
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircleOutlined className="text-green-500 text-3xl mb-2" />
                  <p className="text-green-800 font-medium">This payment has already been completed</p>
                </div>
              ) : (
                <button
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white rounded-lg px-4 py-3 font-bold text-lg transition duration-200 ease-in-out transform hover:scale-105"
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Spin className="mr-2" /> Processing...
                    </span>
                  ) : (
                    `Pay ${formatCurrency(paymentDetails.totalAmount, paymentDetails.currency)}`
                  )}
                </button>
              )}

              <p className="mt-4 text-xs text-center text-gray-500">
                All transactions are secure and encrypted.
                <br />By completing this payment, you agree to our terms of service.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center">
            <Alert
              message="Payment Not Found"
              description="The requested payment could not be found. Please check the payment ID and try again."
              type="error"
              showIcon
            />
          </div>
        )}
      </div>
    </div>
  );
}