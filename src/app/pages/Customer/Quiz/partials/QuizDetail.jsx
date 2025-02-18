import React, { useState } from "react";
import { useParams } from "react-router-dom";
import mockData from "../mock_quiz.json";
import { Card, Button, Radio, Progress, Typography } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const QuizDetail = () => {
  const { id } = useParams();
  console.log("Quiz ID from params:", id); // Log ID
  const quiz = mockData.quizzes.find((q) => q.id.toString() === id);
  console.log("Quiz data:", quiz); // Log quiz data
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="p-6 text-center text-red-500 text-lg">❌ Quiz không tồn tại hoặc chưa được tải!</div>;
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-3xl w-full shadow-xl rounded-lg p-6 bg-white">
        {!showResult ? (
          <div>
            <Typography.Title level={2} className="text-center text-blue-600">
              {quiz.name}
            </Typography.Title>
            <p className="text-center text-gray-500 mb-4">{quiz.category}</p>
            <img
              src={quiz.image}
              alt={quiz.name}
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <Progress
              percent={((currentQuestion + 1) / quiz.questions.length) * 100}
              showInfo={false}
              strokeColor="#1890ff"
            />
            <Typography.Title level={4} className="mt-4 text-gray-700">
              {quiz.questions[currentQuestion].question}
            </Typography.Title>
            <Radio.Group
              className="w-full flex flex-col gap-3"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            >
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <Radio.Button
                  key={index}
                  value={option}
                  className="p-2 border rounded-md w-full hover:bg-gray-200"
                >
                  {option}
                </Radio.Button>
              ))}
            </Radio.Group>
            <Button
              type="primary"
              size="large"
              className="mt-6 w-full bg-blue-500 hover:bg-blue-700"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {currentQuestion + 1 === quiz.questions.length ? "Xem Kết Quả" : "Câu Tiếp Theo"}
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Typography.Title level={2} className="text-green-500">
              Kết Quả
            </Typography.Title>
            <Typography.Title level={3}>
              Bạn đã trả lời đúng {score} / {quiz.questions.length} câu!
            </Typography.Title>
            {score >= quiz.questions.length / 2 ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: "48px" }} />
            ) : (
              <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: "48px" }} />
            )}
            <Button
              type="primary"
              size="large"
              className="mt-6 bg-green-500 hover:bg-green-700"
              onClick={() => window.location.reload()}
            >
              Chơi Lại
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuizDetail;