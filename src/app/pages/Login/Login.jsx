import { Button, Checkbox, Form, Input } from "antd";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/img/DeepCleansingfacial.jpg";
import { googleLogin, loginUser } from "../../modules/Login/apiLogin";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY; 

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => googleLogin(response, CLIENT_ID, setLoading, navigate),
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
      );
    };

    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    const savedUsername = Cookies.get("__run");
    const encryptedPassword = Cookies.get("__rpw");

    if (savedUsername && encryptedPassword) {
      try {
        const encryptedUserName = CryptoJS.AES.decrypt(savedUsername, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        form.setFieldsValue({ username: encryptedUserName, password: decryptedPassword });
        setRememberMe(true);
      } catch (error) {
        console.error("Lỗi giải mã mật khẩu:", error);
      }
    }
  }, [form]);

  const onFormFinish = async (values) => {
    if (rememberMe) {
      const encryptedUserName = CryptoJS.AES.encrypt(values.username, SECRET_KEY).toString();
      Cookies.set("__run", encryptedUserName, { expires: 7, secure: true, sameSite: "Strict" });
      const encryptedPassword = CryptoJS.AES.encrypt(values.password, SECRET_KEY).toString();
      Cookies.set("__rpw", encryptedPassword, { expires: 7, secure: true, sameSite: "Strict" });
    } else {
      Cookies.remove("__run");
      Cookies.remove("__rpw");
    }

    await loginUser(values, setLoading, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-lime-200 via-blue-100 to-green-200 px-4 relative">
      <Button
        type="text"
        icon={<IoMdArrowRoundBack />}
        className="absolute top-3 left-1 lg:top-8 lg:left-12 md:top-4 md:left-4 sm:top-3 sm:left-3 text-lg font-semibold text-gray-600"
        onClick={() => navigate("/")}
      >
        Home
      </Button>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl flex flex-col lg:flex-row-reverse">
        <div
          className="relative h-40 lg:h-auto lg:w-2/5 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <h1 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">Welcome Back</h1>
          </div>
        </div>
        <div className="p-6 lg:px-14 md:p-10 flex-1">
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 text-center">Login to Your Account</h2>
          <p className="text-sm md:text-base text-gray-500 text-center mb-4 md:mb-6">Experience the best skincare services.</p>
          <Form form={form} layout="vertical" onFinish={onFormFinish} className="space-y-3">
            <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter your username!" }]}>
              <Input placeholder="Enter your username" size="large" className="rounded-md border-gray-300 focus:ring-sky-500 focus:border-sky-500" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password!" }]}>
              <Input.Password placeholder="Enter your password" size="large" className="rounded-md border-gray-300 focus:ring-sky-500 focus:border-sky-500" />
            </Form.Item>
            <div className="flex justify-between items-center mb-2">
              <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>Remember Me</Checkbox>
              <Link to="/forgot-password" className="text-sm text-sky-500 hover:underline">Forgot Password?</Link>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" loading={loading} className="w-full mt-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-md">Login</Button>
            </Form.Item>
          </Form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div id="googleSignInButton"></div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Don't have an account? <Link to="/sign-up" className="text-sky-500 font-medium hover:underline">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
