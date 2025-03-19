import React from 'react';

const VndFormat = ({ amount }) => {
  const formattedAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default VndFormat;
