// QuizDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Radio, Progress, Typography, Spin, message, Alert } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { loadFullQuizData, startCustomerQuiz, submitCustomerAnswer } from "./QuizDataManager";

const QuizDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [customerQuizId, setCustomerQuizId] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Hard-coded customer ID for demo purposes
  // In a real application, this would come from authentication
  const CUSTOMER_ID = 3; 

  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        setLoading(true);
        
        // Load quiz data with questions and answers
        const quizData = await loadFullQuizData(id);
        setQuiz(quizData);
        
        // Start a customer quiz session
        const quizSessionId = await startCustomerQuiz(CUSTOMER_ID, id);
        setCustomerQuizId(quizSessionId);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        message.error("Không thể tải bài kiểm tra: " + err.message);
      }
    };

    initializeQuiz();
  }, [id]);

  const getCurrentQuestion = () => {
    return quiz?.questions[currentQuestionIndex] || null;
  };

  const handleSelectAnswer = (answerId) => {
    setSelectedAnswerId(answerId);
  };

  const handleNextQuestion = async () => {
    if (!selectedAnswerId) return;
    
    try {
      setSubmitting(true);
      const currentQuestion = getCurrentQuestion();
      
      // Find the selected answer to determine points
      const selectedAnswer = currentQuestion.answers.find(
        a => a.answerId === selectedAnswerId
      );
      
      // Record points for this answer
      const pointsEarned = selectedAnswer?.points || 0;
      
      // Submit the answer to the backend
      await submitCustomerAnswer(
        customerQuizId, 
        currentQuestion.questionId, 
        selectedAnswerId, 
        pointsEarned
      );
      
      // Update local state
      const updatedAnsweredQuestions = [...answeredQuestions];
      updatedAnsweredQuestions[currentQuestionIndex] = {
        questionId: currentQuestion.questionId,
        answerId: selectedAnswerId,
        isCorrect: selectedAnswer?.isCorrect || false,
        pointsEarned: pointsEarned
      };
      
      setAnsweredQuestions(updatedAnsweredQuestions);
      setScore(score + pointsEarned);
      
      // Move to next question or show results
      if (currentQuestionIndex + 1 < quiz.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswerId(null);
      } else {
        setShowResult(true);
      }
      
      setSubmitting(false);
    } catch (err) {
      message.error("Không thể lưu câu trả lời: " + err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
        <Spin size="large" tip="Đang tải bài kiểm tra..." />
      </div>
    );
  }

  if (error || !quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className="p-6 text-center text-red-500 text-lg">
        <Alert
          message="Lỗi"
          description={error || "Quiz không tồn tại hoặc chưa được tải!"}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const totalPossiblePoints = quiz.questions.reduce(
    (total, q) => total + Math.max(...q.answers.map(a => a.points || 0), 0), 
    0
  );

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="max-w-3xl w-full shadow-xl rounded-lg p-6 bg-white">
        {!showResult ? (
          <div>
            <Typography.Title level={2} className="text-center text-blue-600">
              {quiz.name}
            </Typography.Title>
            <p className="text-center text-gray-500 mb-4">{quiz.category}</p>
            
            <Progress
              percent={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
              showInfo={true}
              format={() => `${currentQuestionIndex + 1}/${quiz.questions.length}`}
              strokeColor="#1890ff"
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
              onChange={(e) => handleSelectAnswer(e.target.value)}
            >
              {currentQuestion.answers.map((answer) => (
                <Radio.Button
                  key={answer.answerId}
                  value={answer.answerId}
                  className="p-2 border rounded-md w-full hover:bg-gray-200 text-left"
                >
                  {answer.content}
                </Radio.Button>
              ))}
            </Radio.Group>
            
            <Button
              type="primary"
              size="large"
              className="mt-6 w-full bg-blue-500 hover:bg-blue-700"
              onClick={handleNextQuestion}
              disabled={selectedAnswerId === null || submitting}
              loading={submitting}
            >
              {currentQuestionIndex + 1 === quiz.questions.length ? "Xem Kết Quả" : "Câu Tiếp Theo"}
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Typography.Title level={2} className="text-green-500">
              Kết Quả
            </Typography.Title>
            
            <Typography.Title level={3}>
              Bạn đã trả lời đúng {answeredQuestions.filter(q => q.isCorrect).length} / {quiz.questions.length} câu!
            </Typography.Title>
            
            <Typography.Title level={4}>
              Số điểm: {score} / {totalPossiblePoints}
            </Typography.Title>
            
            {score >= totalPossiblePoints / 2 ? (
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