import React, { useEffect, useState } from "react";
import { Typography, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import mockServices from "./mock_quizDetail"; 
import { fetchQuizRecommendations, fetchAllServices } from "./QuizApiService";

const QuizResult = ({ score, totalPossiblePoints , onRetry }) => {
  const navigate = useNavigate();
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        // Gọi API lấy danh sách gợi ý
        const recommendations = await fetchQuizRecommendations();
        // Gọi API lấy tất cả dịch vụ
        const allServices = await fetchAllServices();

        // Lọc gợi ý theo điểm số người dùng
        const filteredRecommendations = recommendations.filter(rec => 
          (rec.minScore === null || score >= rec.minScore) &&
          (rec.maxScore === null || score <= rec.maxScore)
        );

        // Ghép dữ liệu với thông tin dịch vụ
        const servicesWithDetails = filteredRecommendations.map(rec => {
          const serviceDetails = allServices.find(service => service.serviceId === rec.serviceId);
          return {
            ...rec,
            ...serviceDetails
          };
        });

        setRecommendedServices(servicesWithDetails);
      } catch (error) {
        message.error("Lỗi khi tải gợi ý: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [score]);

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
        You answered questions correctly!
      </Typography.Title>

      <Typography.Title level={4}>
        With {score} / {totalPossiblePoints} point.
      </Typography.Title>

      {score >= totalPossiblePoints * 0 ? (
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

      {/* 🛠️ Hiển thị danh sách dịch vụ dựa trên điểm số */}
      {loading ? <Spin size="large" className="mt-6" /> : (
        recommendedServices.length > 0 ? (
          <div className="mt-12">
            <Typography.Title level={1} className="text-gray-700">
            Recommended services for you
            </Typography.Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedServices.map((service) => (
                <div key={service.serviceId} className="bg-white p-4 border border-lime-200 rounded-md shadow-sm">
                  <img 
                    src={service.serviceImage} 
                    alt={service.serviceName} 
                    className="w-full h-40 object-cover rounded-md hover:scale-105"
                  />
                  <h3 className="text-xl font-semibold text-center">{service.serviceName}</h3>
                  <p className="text-gray-700 text-lg">Price: {service.price} {service.currency}</p>
                  {/* <p className="text-gray-700 text-sm">Min Score: {service.minScore}</p>
                  <p className="text-gray-700 text-sm">Max Score: {service.maxScore}</p> */}
                  {/* <p className={`text-sm font-bold ${service.isActive ? "text-green-500" : "text-red-500"}`}>
                    {service.isActive ? "Active" : "Inactive"}
                  </p> */}
                  <ReactMarkdown>
                    {service.description.length > 150 
                      ? `${service.description.substring(47, 169)}...` 
                      : service.description}
                  </ReactMarkdown>
                  <div className="flex justify-center mt-3">
                    <button 
                      className="bg-lime-500 text-white px-4 py-2 rounded-lg cursor-pointer text-center hover:bg-lime-700 transition"
                      onClick={() => navigate(`/services/${service.serviceId}`)}>
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Typography.Text type="secondary" className="mt-6">
            There are no suitable suggestions.
          </Typography.Text>
        )
      )}
    </div>
  );
};

export default QuizResult;
