import React from "react";
import { Card, Tag, List } from "antd";
import { ClockCircleOutlined, IdcardOutlined, InfoCircleOutlined } from "@ant-design/icons";

const QuizRenderDetails = ({ quiz }) => {
  if (!quiz) return <p>Loading...</p>;

  return (
    <Card title="Quiz Details" bordered={false} className="shadow-md rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <IdcardOutlined className="mr-2 text-lg" />
          <strong className="w-32">ID:</strong> {quiz.id}
        </div>
        <div className="flex items-center">
          <ClockCircleOutlined className="mr-2 text-lg" />
          <strong className="w-32">Duration:</strong> {quiz.duration} minutes
        </div>
        <div className="flex items-center">
          <InfoCircleOutlined className="mr-2 text-lg" />
          <strong className="w-32">Quiz Name:</strong> {quiz.quizName}
        </div>
        <div className="flex items-center">
          <strong className="w-32">Status:</strong>
          <Tag color={quiz.status === "active" ? "green" : "volcano"} className="ml-2">
            {quiz.status.toUpperCase()}
          </Tag>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Questions</h3>
        <List
          bordered
          dataSource={quiz.questions}
          renderItem={(question) => (
            <List.Item>
              <strong>Question {question.id}:</strong> {question.content}
              <List
                className="mt-2"
                bordered
                dataSource={question.answers}
                renderItem={(answer, index) => (
                  <List.Item>
                    {index + 1}. {answer.content} {question.correctAnswer === index ? <Tag color="green">Correct</Tag> : null}
                  </List.Item>
                )}
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default QuizRenderDetails;
