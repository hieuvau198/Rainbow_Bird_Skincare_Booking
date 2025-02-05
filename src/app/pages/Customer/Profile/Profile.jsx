import React, { useState, useEffect } from 'react';
import { Input, Button, Form, message } from 'antd';

export default function Profile() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    fullName: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = {
        username: 'johndoe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        fullName: 'John Doe'
      };
      setUser(data);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    message.success('Profile updated successfully!');
    console.log(user);
  };

  return (
    <div className="p-6 lg:p-24 md:p-16 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl text-center font-semibold text-gray-700 mb-6">User Profile</h1>
        <Form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium mb-2">Username</label>
            <Input
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              size="large"
              className="rounded-md border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
            <Input
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              size="large"
              className="rounded-md border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600 font-medium mb-2">Phone</label>
            <Input
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              size="large"
              className="rounded-md border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-600 font-medium mb-2">Full Name</label>
            <Input
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              size="large"
              className="rounded-md border-gray-300"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="primary"
              size="large"
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-6 py-2"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}