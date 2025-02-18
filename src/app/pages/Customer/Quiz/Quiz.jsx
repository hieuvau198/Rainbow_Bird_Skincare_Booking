import React from "react";
import { Link } from "react-router-dom";
import mockData from "./mock_quiz.json";
import { Card, Typography, Button } from "antd";

const categories = [
  { name: "Skin Type", key: "Skin Type" },
  { name: "Sensitivity", key: "Sensitivity" },
  { name: "Acne", key: "Acne" },
  { name: "Anti-Aging", key: "Anti-Aging" }
];

const Quiz = () => {
  if (!mockData || !mockData.quizzes) {
    return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="grid grid-cols-4 justify-center">
        {categories.map((category) => (
          <div key={category.key} className=" p-1">
            <Typography.Title level={4} className="text-center text-blue-600">
              {category.name}
            </Typography.Title>
            <div className="flex flex-col items-center gap-4">
              {mockData.quizzes
                .filter((quiz) => quiz.category === category.key)
                .map((quiz) => (
                  <Card
                    key={quiz.id}
                    hoverable
                    className="shadow-lg rounded-lg overflow-hidden w-64"
                    cover={<img alt={quiz.name} src={quiz.image} className="h-40 object-cover" />}
                  >
                    <Typography.Title level={4} className="truncate">
                      {quiz.name}
                    </Typography.Title>
                    <p>{quiz.questions.length} Câu hỏi - {quiz.plays} lần chơi</p>
                    <Link to={`/quiz/${quiz.id}`}>
                      <Button type="primary" className="mt-3 w-full bg-blue-500 hover:bg-blue-700">
                        Bắt đầu
                      </Button>
                    </Link>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
