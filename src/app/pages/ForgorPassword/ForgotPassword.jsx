import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function ForgotPassword() {
  const [form] = Form.useForm();
    const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = (values) => {
    setIsSubmitting(true);
    console.log("Email submitted:", values.email);
    setTimeout(() => {
      setIsSubmitting(false);
      form.resetFields();
    }, 2000); // Simulate API call delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-lime-200 via-blue-100 to-green-200 px-4">
      <div >
        <Button
          type="text"
          icon={<IoMdArrowRoundBack />}
          className="absolute top-3 left-1 lg:top-8 lg:left-12 md:top-4 md:left-4 sm:top-3 sm:left-3 text-lg font-semibold text-gray-600"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md md:max-w-lg">
        <div
          className="relative h-40 md:h-60 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://biancobeauty.co.uk/wp-content/uploads/2020/11/woman-having-facial.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <h1 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">
              Forgot Password
            </h1>
          </div>
        </div>
        <div className="p-8 md:p-10">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 text-center">
            Reset Your Password
          </h2>
          <p className="text-sm md:text-base text-gray-500 text-center mb-4 md:mb-6">
            Please enter your registered email address. We will send you a link
            to reset your password.
          </p>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            requiredMark={true}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                size="large"
                className="rounded-md border-gray-300 focus:ring-sky-500 focus:border-sky-500"
              />
            </Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full mt-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md"
              loading={isSubmitting}
            >
              Send Reset Link
            </Button>
          </Form>
          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-sm text-sky-500 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}