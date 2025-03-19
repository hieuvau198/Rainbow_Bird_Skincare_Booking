import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import { CheckCircleFilled, HomeOutlined, FileTextOutlined } from "@ant-design/icons";

const PaymentSuccess = ({ paymentDetails }) => {
  // Format currency function
  const formatCurrency = (amount, currency) => {
    if (!amount || !currency) return "";
    
    if (currency === "VND") {
      return new Intl.NumberFormat('vi-VN').format(amount) + " ₫";
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <Result
          icon={<CheckCircleFilled className="text-green-500" />}
          status="success"
          title="Payment Successful!"
          subTitle={
            <div className="space-y-2">
              <p className="text-gray-600">
                Your payment has been processed successfully. Thank you for your purchase!
              </p>
              {paymentDetails && (
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(paymentDetails.totalAmount, paymentDetails.currency)}
                </p>
              )}
              {paymentDetails && (
                <p className="text-gray-600">
                  Payment ID: #{paymentDetails.paymentId}
                </p>
              )}
            </div>
          }
          extra={[
            <Button
              type="primary"
              key="home"
              icon={<HomeOutlined />}
              className="bg-green-500 hover:bg-green-600 border-none"
            >
              <Link to="/">Return to Home</Link>
            </Button>,
            <Button 
              key="receipt" 
              icon={<FileTextOutlined />}
            >
              <Link to="/schedule-booking">View My Bookings</Link>
            </Button>,
          ]}
        />
        
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <span className="font-semibold text-green-600">1</span>
              </div>
              <p className="text-gray-600 text-sm">
                You will receive a confirmation email with your payment details.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <span className="font-semibold text-green-600">2</span>
              </div>
              <p className="text-gray-600 text-sm">
                Our staff will review your booking and service details.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <span className="font-semibold text-green-600">3</span>
              </div>
              <p className="text-gray-600 text-sm">
                You can view your booking details and receipt in your account at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;