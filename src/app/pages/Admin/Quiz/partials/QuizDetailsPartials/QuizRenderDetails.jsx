import React, { useState } from "react";
import { Collapse, List, Spin } from "antd";
import getAnsByQuesId from "../../../../../modules/Quizzs/getAnsByQuesId";
import Loading from "../../../../../components/Loading";

const { Panel } = Collapse;

const QuizRenderDetails = ({ quiz }) => {
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState({});

  if (!quiz) return <><Loading /></>;

  const fetchAnswers = async (questionId) => {
    if (answers[questionId]) return;

    setLoading((prev) => ({ ...prev, [questionId]: true }));
    try {
      const ansData = await getAnsByQuesId(questionId);
      setAnswers((prev) => ({ ...prev, [questionId]: ansData }));
    } catch (error) {
      console.error(`Error fetching answers for question ${questionId}:`, error);
    }
    setLoading((prev) => ({ ...prev, [questionId]: false }));
  };

  return (
    <div className="p-6">
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
        <Collapse
          accordion
          onChange={(questionIds) => {
            questionIds.forEach((questionId) => fetchAnswers(questionId));
          }}
        >
          {quiz.questions.map((question, index) => (
            <Panel
              key={question.questionId}
              header={
                <>
                  <strong className="font-bold">{`Question ${index + 1}:`}</strong> {question.content}
                </>
              }
            >
              {loading[question.questionId] ? (
                <Spin size="small" />
              ) : (
                <>
                  <h1 className="font-bold py-2">Answers:</h1>
                  <List
                    bordered
                    dataSource={answers[question.questionId] || []}
                    renderItem={(answer, answerIndex) => (
                      <List.Item>
                        <span>
                          {answerIndex + 1}. {answer.content} (Points: {answer.points})
                        </span>
                      </List.Item>
                    )}
                  />
                </>
              )}
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default QuizRenderDetails;
