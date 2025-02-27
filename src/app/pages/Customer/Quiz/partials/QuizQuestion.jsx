// QuizQuestion.jsx
import React from "react";
import { Typography, Progress, Radio } from "antd";

const QuizQuestion = ({ currentQuestion, selectedAnswerId, onSelectAnswer, currentIndex, totalQuestions }) => {
  if (!currentQuestion) return null;

  return (
    <div>
      <Typography.Title level={2} className="text-center text-lime-600">
        Câu {currentIndex + 1}/{totalQuestions}
      </Typography.Title>
      <Progress 
        percent={((currentIndex + 1) / totalQuestions) * 100}
        strokeColor="#93eb1a"
        showInfo
      />
      
      <Typography.Title level={4} className="mt-4 text-gray-700">
        {currentQuestion.content}
      </Typography.Title>

      <div className="mt-2 mb-4">
        <Typography.Text type="secondary">
          Điểm: {currentQuestion.points}
        </Typography.Text>
      </div>

      {/* Answer List */}
      <div className="w-full flex flex-col gap-3 mt-4">
        {currentQuestion.answers.map((answer) => (
          <div
            key={answer.answerId}
            className={`cursor-pointer p-5 text-lg w-full border-2 rounded-lg shadow-md transition flex text-center
                        ${selectedAnswerId === answer.answerId 
                            ? "bg-lime-300 text-white border-lime-300"  // Khi chọn
                            : "bg-white hover:bg-lime-200 border-lime-300"}`} // Khi hover
            onClick={() => onSelectAnswer(answer.answerId)}
          >
            {answer.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
