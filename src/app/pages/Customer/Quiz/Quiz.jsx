import React from "react";
import { Link } from "react-router-dom";
import mockData from "./mock_quiz.json";
import { Card } from "antd";
import { HeartOutlined, SearchOutlined } from "@ant-design/icons";

const categories = [
  { name: "Skin Type", key: "Skin Type" },
  { name: "Sensitivity", key: "Sensitivity" },
  { name: "Acne", key: "Acne" },
  { name: "Anti-Aging", key: "Anti-Aging" },
  { name: "Moisturizing Habits", key: "Skin Health" }
];

const Quiz = () => {
  if (!mockData || !mockData.quizzes) {
    return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Quiz Categories</h2>
      <p className="text-center text-gray-600 mb-10">Hiển thị các loại quiz theo danh mục</p>

      {/* Grid có 5 hàng dọc */}
      <div className="grid grid-rows-5 gap-6">
        {categories.map((category, index) => (
          <div key={category.key}>
            <div className="p-4 bg-white shadow-md rounded-lg border border-lime-200">
              <h3 className="text-lg font-semibold text-center text-blue-600 mb-4">{category.name}</h3>

              {/* Quiz hiển thị theo hàng ngang */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {mockData.quizzes
                  .filter((quiz) => quiz.category === category.key)
                  .slice(0, 5) // Hiển thị tối đa 5 quiz trong mỗi hàng
                  .map((quiz) => (
                    <Card
                      key={quiz.id}
                      hoverable
                      className="relative shadow-lg rounded-lg overflow-hidden"
                      cover={<img alt={quiz.name} src={quiz.image} className="h-32 object-cover" />}
                    >
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <HeartOutlined className="text-gray-500 hover:text-red-500 cursor-pointer" />
                        <SearchOutlined className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                      </div>

                      <h3 className="text-sm font-semibold mt-2 truncate text-gray-800">{quiz.name}</h3>
                      <p className="text-xs text-gray-600">{quiz.questions.length} Câu hỏi - {quiz.plays} lượt chơi</p>

                      <Link to={`/quiz/${quiz.id}`}>
                        <button className="mt-3 w-full py-1 text-white bg-blue-600 hover:bg-blue-800 rounded text-xs">
                          Bắt đầu
                        </button>
                      </Link>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
