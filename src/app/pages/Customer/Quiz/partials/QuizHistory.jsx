import React, { useState } from 'react';
import DecodeId from '../../../../components/DecodeId';
import { Card, Pagination } from 'antd';

export default function QuizHistory() {
  const customerId = DecodeId();
  const quizData = [
    { id: 1, name: "Quiz 1", score: 80, dateTaken: "2023-03-01" },
    { id: 2, name: "Quiz 2", score: 90, dateTaken: "2023-03-05" },
    { id: 3, name: "Quiz 3", score: 70, dateTaken: "2023-03-07" },
    { id: 4, name: "Quiz 4", score: 60, dateTaken: "2023-03-10" },
    { id: 5, name: "Quiz 5", score: 85, dateTaken: "2023-03-12" },
    { id: 6, name: "Quiz 6", score: 75, dateTaken: "2023-03-15" },
    { id: 7, name: "Quiz 7", score: 88, dateTaken: "2023-03-18" },
    { id: 8, name: "Quiz 8", score: 92, dateTaken: "2023-03-20" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = quizData.slice(startIndex, startIndex + pageSize);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-[600px]">
      <h1 className="text-xl font-bold mb-3">Quiz History</h1>
      <div className="flex-1">
        {currentData.map((item) => (
          <Card
            key={item.id}
            bordered
            style={{ borderLeft: '4px solid #65a30d', marginBottom: '16px' }}
            className='hover:border-lime-400'
          >
            <h3 className="text-xl font-bold mb-4">{item.name}</h3>
            <p className="font-semibold mb-2">
              Score: <span>{item.score}</span>
            </p>
            <p className="font-semibold mb-2">
              Date Taken: <span className="font-bold">{item.dateTaken}</span>
            </p>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-0">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={quizData.length}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}
