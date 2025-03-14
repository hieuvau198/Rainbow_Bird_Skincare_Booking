import React, { useEffect, useState } from 'react';
import { Card, Pagination, Tag, message } from 'antd';
import Cookies from 'js-cookie';
import DecodeRoleId from '../../../../components/DecodeRoleId';
import getCustomerQuiz from '../../../../modules/Quizzs/getCustomerQuiz';

export default function QuizHistory() {
  const token = Cookies.get("__atok");

  if (!token) {
    return (
      <div className="sticky top-2 min-h-60 p-6 bg-white border border-lime-200 hover:border-lime-400 shadow-md rounded-xl">
        <div className="flex flex-col items-center justify-center min-h-[600px]">
          <p className="text-lg text-gray-600">You need to login to view quiz history.</p>
        </div>
      </div>
    );
  }

  const customerId = DecodeRoleId("__CusIden");
  const [quizData, setQuizData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const data = await getCustomerQuiz(customerId);
        setQuizData(data);
      } catch (error) {
        message.error("Failed to load quiz history.");
        console.error(error);
      }
    };
    fetchQuizData();
  }, [customerId]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentData = quizData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="sticky top-2 min-h-60 p-6 bg-white border border-lime-200 shadow-md rounded-xl">
      <div className="flex flex-col min-h-[600px]">
        <h1 className="text-xl font-bold mb-3">Quiz History</h1>
        <div className="flex-1">
          {currentData.map((item) => (
            <Card
              key={item.customerQuizId}
              bordered
              style={{ borderLeft: '4px solid #65a30d', marginBottom: '16px' }}
              className="hover:border-lime-400"
            >
              <h3 className="text-xl font-bold mb-4">{item.quiz.name}</h3>
              <p className="font-semibold mb-2">
                Score: <span>{item.totalScore !== null ? item.totalScore : <Tag color="red">Not Attempted</Tag>}</span>
              </p>
              <p className="font-semibold mb-2">
                Date Taken:{" "}
                <span className="font-bold">
                  {item.startedAt ? new Date(item.startedAt).toLocaleDateString() : "N/A"}
                </span>
              </p>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-auto">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={quizData.length}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
