import React from "react";
import { Result, Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const PaymentFailedModal = ({ onRetry, onClose }) => {
  return (
    <Result
      status="error"
      icon={<CloseCircleFilled className="text-red-500 text-3xl" />}
      title="Payment Failed"
      subTitle="Sorry, your payment could not be processed. Please try again or use a different payment method."
      extra={[
        <Button
          key="retry"
          type="primary"
          className="bg-red-500"
          onClick={onRetry}
        >
          Try Again
        </Button>,
        <Button key="close" onClick={onClose}>
          Cancel
        </Button>,
      ]}
    />
  );
};

export default PaymentFailedModal;
