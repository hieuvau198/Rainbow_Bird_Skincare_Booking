import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Card, Button, Spin, message, Alert } from "antd";
import { loadFullQuizData, startCustomerQuiz, submitCustomerAnswer } from "./QuizDataManager";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import DecodeId from "../../../../components/DecodeId";
import DecodeRoleId from "../../../../components/DecodeRoleId";

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

  const CUSTOMER_ID = DecodeRoleId('__CusIden');

  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        setLoading(true);
        const quizData = await loadFullQuizData(id);
        setQuiz(quizData);
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

  const handleSelectAnswer = (answerId) => setSelectedAnswerId(answerId);

  const handleNextQuestion = async () => {
    if (!selectedAnswerId) return;

    try {
      setSubmitting(true);
      const currentQuestion = quiz.questions[currentQuestionIndex];
      const selectedAnswer = currentQuestion.answers.find(a => a.answerId === selectedAnswerId);
      const pointsEarned = selectedAnswer?.points || 0;

      await submitCustomerAnswer(customerQuizId, currentQuestion.questionId, selectedAnswerId, pointsEarned);

      setAnsweredQuestions([...answeredQuestions, { questionId: currentQuestion.questionId, answerId: selectedAnswerId, isCorrect: selectedAnswer?.isCorrect, pointsEarned }]);
      setScore(score + pointsEarned);

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

  if (loading) return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
  if (error) return <Alert message="Lỗi" description={error} type="error" showIcon />;

  return (
    <div className="p-6 min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="flex items-center text-gray-600 text-sm mb-4">
        <Link to="/" className="flex items-center gap-1 text-lime-300 hover:text-lime-500">
          <AiOutlineHome className="text-lg" /> Home
        </Link>
        <span className="mx-2 text-gray-400"> / </span>
        <Link to="/quiz" className="text-lime-300 hover:text-lime-500">
          Quizzes
        </Link>
        <span className="mx-2 text-gray-400"> / </span>
        <span className="font-semibold text-gray-900">Quiz Details</span>
      </div>

      {/* Nội dung Quiz */}
      <div className="flex justify-center items-center">
        <Card className="max-w-7xl w-full shadow-2xl rounded-2xl p-20 bg-amber border border-lime-300">
          {showResult ? (
            <QuizResult 
              score={score} 
              totalPossiblePoints={quiz.totalPoints} 
              answeredQuestions={answeredQuestions} 
              onRetry={() => window.location.reload()} 
            />
          ) : (
            <>
              <QuizQuestion 
                currentQuestion={quiz.questions[currentQuestionIndex]} 
                selectedAnswerId={selectedAnswerId} 
                onSelectAnswer={handleSelectAnswer}
                currentIndex={currentQuestionIndex}
                totalQuestions={quiz.questions.length}
              />
              <div 
                className={`mt-6 mx-auto w-64 text-center p-4 text-white rounded-xl shadow-lg cursor-pointer transition
                            ${selectedAnswerId ? "bg-lime-400 hover:bg-lime-500" : "bg-lime-200 cursor-not-allowed"}`}
                onClick={selectedAnswerId ? handleNextQuestion : null}
              >
                Next
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};


export default QuizDetail;
