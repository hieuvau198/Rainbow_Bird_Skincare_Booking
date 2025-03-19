import React from "react";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CloseCircleFilled, HomeOutlined, ReloadOutlined } from "@ant-design/icons";

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(window.location.pathname + window.location.search); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <Result
          icon={<CloseCircleFilled className="text-red-500" />}
          status="error"
          title="Payment Failed"
          subTitle="Sorry, your payment could not be processed. Please try again or use a different payment method."
          extra={[
            <Button
              type="primary"
              key="retry"
              icon={<ReloadOutlined />}
              className="bg-red-500 hover:bg-red-600 border-none"
              onClick={handleRetry} //
            >
              Try Again
            </Button>,
            <Button 
              key="home" 
              icon={<HomeOutlined />}
            >
              <Link to="/">Return to Home</Link>
            </Button>,
          ]}
        />
        
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Common issues and solutions:</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <span className="font-semibold text-red-600">1</span>
              </div>
              <p className="text-gray-600 text-sm">
                Insufficient funds: Please check your account balance and try again.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <span className="font-semibold text-red-600">2</span>
              </div>
              <p className="text-gray-600 text-sm">
                Network issues: Check your internet connection and try again in a few minutes.
              </p>
            </div>
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <span className="font-semibold text-red-600">3</span>
              </div>
              <p className="text-gray-600 text-sm">
                Payment method restrictions: Try using a different payment method or contact your bank.
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              If you continue to experience issues, please contact our customer support:
              <br />
              <a href="mailto:support@prestinecare.com" className="text-green-600 hover:text-green-700">
                support@prestinecare.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;