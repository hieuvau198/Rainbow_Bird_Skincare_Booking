import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleTwoTone, CloseCircleTwoTone, UserOutlined, StarOutlined, DollarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import mockServices from "./mock_quizDetail"; 

const QuizResult = ({ score, totalPossiblePoints, answeredQuestions, onRetry }) => {
  const correctAnswers = answeredQuestions.filter(q => q.isCorrect).length;
  const totalQuestions = answeredQuestions.length;
  const navigate = useNavigate();
  const [suggestedServices, setSuggestedServices] = useState([]);

  useEffect(() => {
    setSuggestedServices(mockServices);
  }, []);

  return (
    <div className="text-center">
      <div
        className="absolute top-4 right-4 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer transition"
        onClick={() => navigate("/quiz")}
      >
        Take Another Quiz
      </div>

      <Typography.Title level={2} className="text-lime-500">
        Result
      </Typography.Title>

      <Typography.Title level={3}>
        You answered {correctAnswers} / {totalQuestions} questions correctly!
      </Typography.Title>

      <Typography.Title level={4}>
        Point: {score} / {totalPossiblePoints}
      </Typography.Title>

      {score >= totalPossiblePoints * 0.5 ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "48px" }} />
      ) : (
        <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: "48px" }} />
      )}

      <div
        className="mt-6 mx-auto w-64 text-center p-4 bg-lime-500 hover:bg-lime-600 text-white rounded-xl shadow-lg cursor-pointer transition"
        onClick={onRetry}
      >
        Take Again
      </div>

      {/* 🛠️ Hiển thị danh sách dịch vụ */}
      {suggestedServices.length > 0 && (
        <div className="mt-14">
          <Typography.Title level={2} className="text-gray-700">
            Recommended services for you
          </Typography.Title>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedServices.map((service) => (
              <div 
                key={service.service_id} 
                className="bg-white p-4 border border-lime-200 rounded-md shadow-sm flex flex-col justify-between h-full"
              >
                {/* Hình ảnh */}
                <div className="relative bg-white">
                  <img
                    src={service.image}
                    alt={service.service_name}
                    className="w-full h-40 object-cover rounded-md transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Nội dung dịch vụ */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold mb-1 text-center">{service.service_name}</h3>
                  <div className="flex items-center justify-between text-gray-600 text-xs mb-1">
                    <p className="text-start"><UserOutlined className="mr-1" /> {service.buyers} Booking</p>
                    <p className="text-end"><StarOutlined className="mr-1" /> {service.reviews} Rating</p>
                  </div>

                  <div className="text-start">
                    <p className="text-red-500 font-bold text-sm"><DollarOutlined className="mr-1" /> {service.price}</p>
                    <p className="text-gray-700 text-xs"><ClockCircleOutlined className="mr-1" /> {service.duration_minutes}</p>
                  </div>

                  <p className="text-gray-600 text-start text-xs mt-1 flex-grow">
                    {service.description.length > 1200
                      ? `${service.description.substring(0, 1200)}...`
                      : service.description}
                  </p>

                  <div className="mt-auto">
                    <div
                      className="bg-lime-500 text-white px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-lime-700 transition"
                      onClick={() => navigate(`/services/${service.service_id}`)}
                    >
                      Learn More
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResult;
