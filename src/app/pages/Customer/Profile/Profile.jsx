import React, { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';
import DecodeId from '../../../components/DecodeId';

export default function Profile() {
  // Replace with actual user id from your authentication or context

  
  const userId = DecodeId(); 
  const [customer, setCustomer] = useState({
    customerId: 0,
    userId: 0,
    email: '',
    phone: '',
    fullName: '',
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

  // Fetch customer data by userId on component mount
  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Customer/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const data = await response.json();
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

  // Update top-level customer fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // Update nested user fields (for example, username)
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

  // Update the customer profile by calling the API via PUT
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://prestinecare-dxhvfecvh5bxaaem.southeastasia-01.azurewebsites.net/api/Customer/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update customer profile');
      }
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
    <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl text-center font-semibold text-gray-700 mb-6">Customer Profile</h1>
        <Form>
          {/* Username from nested user object */}

          {/* Email (top-level) */}
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

          {/* Phone (top-level) */}
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

          {/* Full Name (top-level) */}
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



          <div className="flex justify-end">
            <Button
              type="primary"
              size="large"
              onClick={handleUpdateProfile}
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-6 py-2"
            >
              Update Profile
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
