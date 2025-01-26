import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-lime-200 via-blue-100 to-green-200 px-4 relative">
      <div>
        <Button
          type="text"
          icon={<IoMdArrowRoundBack />}
          className="absolute top-3 left-1 lg:top-8 lg:left-12 md:top-4 md:left-4 sm:top-3 sm:left-3 text-lg font-semibold text-gray-600"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl flex flex-col lg:flex-row-reverse">
        <div
          className="relative h-40 lg:h-auto lg:w-2/5 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://biancobeauty.co.uk/wp-content/uploads/2020/11/woman-having-facial.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <h1 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
              Welcome Back
            </h1>
          </div>
        </div>
        <div className="p-6 lg:px-14 md:p-10 flex-1">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 text-center">
            Login to Your Account
          </h2>
          <p className="text-sm md:text-base text-gray-500 text-center mb-4 md:mb-6">
            Experience the best skincare services.
          </p>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={true}
            className="space-y-3"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email!",
                },
              ]}
            >
              <Input
                placeholder="Enter your email"
                size="large"
                className="rounded-md border-gray-300 focus:ring-sky-500 focus:border-sky-500"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                size="large"
                className="rounded-md border-gray-300 focus:ring-sky-500 focus:border-sky-500"
              />
            </Form.Item>
            <div className="flex justify-between items-center mb-2">
              <Checkbox name="rememberMe">Remember Me</Checkbox>
              <Link
                to="/forgot-password"
                className="text-sm text-sky-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full mt-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-md"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div>
            <Button
              type="default"
              size="large"
              className="w-full flex items-center justify-center rounded-md border-gray-300"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/256/2702/2702602.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </Button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                className="text-sky-500 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}