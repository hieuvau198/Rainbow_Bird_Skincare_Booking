import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import getAllQuiz from "../../../modules/Quizzs/getAllQuiz";
import getQuestionByQuizId from "../../../modules/Quizzs/getQuestionByQuizId";
import getQuizById from "../../../modules/Quizzs/getQuizById";
import QuizRenderDetails from "./partials/QuizDetailsPartials/QuizRenderDetails";
import QuizList from "./partials/QuizList";

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const data = await getAllQuiz();
      const quizData = data.map((quiz) => ({
        id: quiz.quizId,
        quizName: quiz.name,
        category: quiz.category,
        totalPoints: quiz.totalPoints,
        status: quiz.isActive,
      }));
      setQuizzes(quizData);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
    setLoading(false);
  };

  const handleViewDetails = async (quizId) => {
    setLoading(true);
    try {
      const quizData = await getQuizById(quizId);
      let questionData = await getQuestionByQuizId(quizId);

      setSelectedQuiz({ ...quizData, questions: questionData });
    } catch (error) {
      console.error("Error fetching quiz details:", error);
      message.error("Failed to load quiz details.");
    }
    setLoading(false);
  };


  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[640px]">
        {selectedQuiz ? (
          <>
            <Button
              variant="solid"
              color="primary"
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => setSelectedQuiz(null)}
              className="mb-4"
            >
              Back to Manage Quizzes
            </Button>
            <QuizRenderDetails quiz={selectedQuiz} />
          </>
        ) : (
          <QuizList quizzes={quizzes} loading={loading} onViewDetails={handleViewDetails} />
        )}
      </div>
    </div>
  );
};

export default ManageQuiz;
