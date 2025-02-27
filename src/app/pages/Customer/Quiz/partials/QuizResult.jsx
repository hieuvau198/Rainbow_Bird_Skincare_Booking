// QuizResult.jsx
import React from "react";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const QuizResult = ({ score, totalPossiblePoints, answeredQuestions, onRetry }) => {
  const correctAnswers = answeredQuestions.filter(q => q.isCorrect).length;
  const totalQuestions = answeredQuestions.length;
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <Button
        className="absolute top-4 right-4 bg-lime-500 hover:bg-lime-700 text-gray-800 px-8 py-8 rounded-lg shadow-md"
        onClick={() => navigate("/quiz")}
      >
        Take Another Quiz
      </Button>

      <Typography.Title level={2} className="text-lime-500">
        Kết Quả
      </Typography.Title>

      <Typography.Title level={3}>
        Bạn đã trả lời đúng {correctAnswers} / {totalQuestions} câu!
      </Typography.Title>

      <Typography.Title level={4}>
        Số điểm: {score} / {totalPossiblePoints}
      </Typography.Title>

      {score >= totalPossiblePoints / 2 ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "48px" }} />
      ) : (
        <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: "48px" }} />
      )}

      <div className="flex justify-center gap-4 mt-6">  
        <Button
          className="mt-6 bg-lime-500 hover:bg-lime-700 px-8 py-8"
          onClick={onRetry}
        >
          Chơi Lại
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
