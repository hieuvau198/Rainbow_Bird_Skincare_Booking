import React from "react";
import { Result, Button } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const PaymentSuccessModal = ({ paymentDetails, onClose }) => {
  const formatCurrency = (amount, currency) => {
    if (!amount || !currency) return "";
    return currency === "VND"
      ? new Intl.NumberFormat("vi-VN").format(amount) + " ₫"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
        }).format(amount);
  };

  return (
    <Result
      status="success"
      icon={<CheckCircleFilled className="text-green-500 text-3xl" />}
      title="Payment Successful!"
      subTitle={
        <div className="space-y-2">
          <p className="text-gray-600">
            Your payment has been processed successfully. Thank you!
          </p>
          {paymentDetails && (
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(paymentDetails.totalAmount, paymentDetails.currency)}
            </p>
          )}
        </div>
      }
      extra={
        <Button type="primary" className="bg-green-500" onClick={onClose}>
          Close
        </Button>
      }
    />
  );
};

export default PaymentSuccessModal;
