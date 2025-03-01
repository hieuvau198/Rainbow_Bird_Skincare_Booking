import { Collapse } from "antd";
import React from "react";
import Loading from "../../../../../components/Loading";
import AnswerRender from "./AnswerRender";
import Recommendations from "./Recommentdations";

const QuizRenderDetails = ({ quiz }) => {
  if (!quiz) return <Loading />;

  const items = quiz.questions.map((question, index) => ({
    key: question.questionId,
    label: (
      <>
        <strong className="font-bold">{`Question ${index + 1}:`}</strong> {question.content}
      </>
    ),
    children: <AnswerRender questionId={question.questionId} />,
  }));

  return (
    <div className="p-2">
      <div>
        <h2 className="text-2xl flex justify-center font-bold mb-4">Quiz Details</h2>
        <p><strong>ID:</strong> {quiz.quizId}</p>
        <p><strong>Name:</strong> {quiz.name}</p>
        <p><strong>Category:</strong> {quiz.category}</p>
        <p><strong>Total Points:</strong> {quiz.totalPoints}</p>
        <p><strong>Description:</strong> {quiz.description}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Questions:</h3>
        <Collapse accordion items={items} />
      </div>
      <Recommendations quizId={quiz.quizId} />
    </div>
  );
};

export default QuizRenderDetails;
