import React from 'react';
import dayjs from 'dayjs';

const FormatDate = ({ date, format = 'DD-MM-YYYY' }) => {
  const formattedDate = dayjs(date).format(format);
  return <span>{formattedDate}</span>;
};

export default FormatDate;
