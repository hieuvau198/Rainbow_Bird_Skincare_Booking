import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CLIENT_ID =
    "472695676845-p90k5n0bfbl730krba46c016htbckvrk.apps.googleusercontent.com";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    setError(null);

    console.log("Google login response:", response);

    try {
      const serverResponse = await fetch(
        "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Auth/google-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: response.credential,
            clientId: CLIENT_ID,
          }),
        }
      );

      console.log("Server response:", serverResponse);

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json();
        console.error("Error response from server:", errorData);
        throw new Error("Authentication failed");
      }

      const data = await serverResponse.json();

      console.log("Authentication successful, server data:", data);

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error during Google login:", err);
      setError(err.message);
      setLoading(false);
      message.error(err.message || "Google login failed!");
    }
  };

  const onFinish = async (values) => {
    console.log("Form login values:", values);
    try {
      const response = await fetch(
        "https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      message.error(err.message || "Login failed!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form validation failed:", errorInfo);
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
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username!",
                }
              ]}
            >
              <Input
                placeholder="Enter your username"
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
            {/* <div className="flex justify-between items-center mb-2">
              <Checkbox name="rememberMe">Remember Me</Checkbox>
              <Link
                to="/forgot-password"
                className="text-sm text-sky-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div> */}
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
          <div id="googleSignInButton"></div>
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
