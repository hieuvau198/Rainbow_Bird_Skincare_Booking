import React from 'react';
import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-50">
      <Spin size="large" />
    </div>
  );
};