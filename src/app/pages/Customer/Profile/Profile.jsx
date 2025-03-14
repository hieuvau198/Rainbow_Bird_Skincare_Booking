import React, { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';
import DecodeId from '../../../components/DecodeId';
import getCusById from '../../../modules/Admin/Employee/getCusById';

export default function Profile() {
  // Lấy userId từ hàm DecodeId
  const userId = DecodeId();

  // Khởi tạo state với các giá trị mặc định theo yêu cầu
  const [customer, setCustomer] = useState({
    customerId: 0,
    userId: 0,
    email: 'quangdieuvcl11@gmail.com',
    phone: '0704585671',
    fullName: 'Duong Minh Cus.',
    preferences: '',
    medicalHistory: '',
    lastVisitAt: '',
    user: {
      userId: 0,
      username: '',
      email: '',
      phone: '',
      fullName: '',
      role: 0,
      createdAt: '',
      lastLoginAt: ''
    }
  });
  const [loading, setLoading] = useState(false);

  // Lấy dữ liệu customer theo userId khi component mount
  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const data = await getCusById(userId);
        setCustomer(data);
      } catch (error) {
        message.error('Failed to fetch customer data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [userId]);

  // Hàm cập nhật các trường top-level của customer
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // Hàm cập nhật các trường bên trong đối tượng user
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      user: {
        ...prevCustomer.user,
        [name]: value,
      },
    }));
  };

  // Hàm cập nhật profile bằng API qua phương thức PUT
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const updatedCustomer = await response.json();
      setCustomer(updatedCustomer);
      message.success('Profile updated successfully!');
    } catch (error) {
      message.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl text-center font-semibold text-gray-700 mb-6">Profile</h1>

        <div className="flex justify-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${customer.fullName}`}
            alt="Avatar"
            className="rounded-full w-24 h-24"
          />
        </div>

        <Form>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-600 font-medium mb-2">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              value={customer.fullName}
              onChange={handleChange}
              size="large"
              className="rounded-md border-gray-300"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <Input
              id="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              size="large"
              className="rounded-md border-gray-300"
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600 font-medium mb-2">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              size="large"
              className="rounded-md border-gray-300"
              disabled={loading}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
