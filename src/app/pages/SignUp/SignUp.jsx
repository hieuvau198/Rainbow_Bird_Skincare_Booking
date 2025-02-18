import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import apiSignUp from "../../modules/SignUp/apiSignUp";

export default function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        username: values.username,
        password: values.password,
        email: values.email,
        fullName: values.fullName,
        phone: values.phone,
      };

      await apiSignUp(payload);
      message.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-lime-200 via-blue-100 to-green-200 px-4">
      <div>
        <Button
          type="text"
          icon={<IoMdArrowRoundBack />}
          className="absolute top-3 left-1 lg:top-8 lg:left-12 md:top-4 md:left-4 sm:top-3 sm:left-3 text-lg font-semibold text-gray-600"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl flex flex-col lg:flex-row">
        <div
          className="relative h-40 lg:h-auto lg:w-2/5 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://biancobeauty.co.uk/wp-content/uploads/2020/11/woman-having-facial.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <h1 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
              Create an Account
            </h1>
          </div>
        </div>
        <div className="p-6 md:p-8 flex-1">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 text-center">
            Join the Skincare Hub
          </h2>
          <p className="text-sm md:text-base text-gray-500 text-center mb-4 md:mb-6">
            Enhance your skincare journey with us.
          </p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={true}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                name="username"
                label="User Name"
                rules={[{ required: true, message: "Please enter your username!" }]}
              >
                <Input placeholder="Enter your username" size="large" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input type="email" placeholder="Enter your email" size="large" />
              </Form.Item>

              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[{ required: true, message: "Please enter your full name!" }]}
              >
                <Input placeholder="Enter your full name" size="large" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "Please enter your phone number!" }]}
              >
                <Input type="tel" placeholder="Enter your phone number" size="large" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please create a password!" }]}
              >
                <Input.Password placeholder="Create a password" size="large" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm your password" size="large" />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-md"
              >
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
