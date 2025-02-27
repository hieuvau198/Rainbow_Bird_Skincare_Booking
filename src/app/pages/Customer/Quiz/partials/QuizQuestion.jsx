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

      <Radio.Group
        className="w-full flex flex-col gap-3 mt-4"
        value={selectedAnswerId}
        onChange={(e) => onSelectAnswer(e.target.value)}
      >
        {currentQuestion.answers.map((answer) => (
          <Radio.Button
            key={answer.answerId}
            value={answer.answerId}
            className={`flex items-center p-8 text-lg w-full border-2 rounded-lg shadow-md transition 
                        ${selectedAnswerId === answer.answerId 
                            ? "bg-lime-200 text-white border-lime-500" 
                            : "bg-white hover:bg-lime-200 border-lime-200"}`}
            >
            {answer.content}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
};

export default QuizQuestion;
