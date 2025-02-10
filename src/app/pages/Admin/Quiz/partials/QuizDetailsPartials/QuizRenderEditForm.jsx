import React, { useState } from "react";
import { Card, Form, Input, InputNumber, Select, List, Button, Radio, message, Tag, Divider } from "antd";

const QuizRenderEditForm = ({ form, initialValues }) => {
  const [questions, setQuestions] = useState(initialValues.questions || []);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const handleAddAnswer = (questionId) => {
    if (!newAnswer) {
      message.error("Please enter the answer content.");
      return;
    }
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, answers: [...q.answers, { id: q.answers.length, content: newAnswer }] } : q
      )
    );
    setNewAnswer("");
  };

  const handleSelectCorrectAnswer = (questionId, answerId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, correctAnswer: answerId } : q))
    );
  };

  const handleUpdateQuestionContent = (questionId, content) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === questionId ? { ...q, content } : q))
    );
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };

  return (
    <Card title="Edit Quiz" bordered={false} className="shadow-md rounded-lg p-4">
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="quizName"
          label="Quiz Name"
          rules={[{ required: true, message: "Please enter the quiz name." }]}
        >
          <Input placeholder="Enter quiz name" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration (minutes)"
          rules={[{ required: true, message: "Please enter the duration." }]}
        >
          <InputNumber style={{ width: "100%" }} placeholder="e.g., 30" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status." }]}
        >
          <Select placeholder="Select status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
        <Divider />
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Edit Questions</h3>
          <List
            bordered
            dataSource={questions}
            renderItem={(question) => (
              <List.Item style={{ flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#f9f9f9', marginBottom: '10px', padding: '10px', borderRadius: '6px' }}>
                <Tag color="blue" className="mb-2">Question {question.id}</Tag>
                <Input
                  value={question.content}
                  onChange={(e) => handleUpdateQuestionContent(question.id, e.target.value)}
                  placeholder={`Question ${question.id} content`}
                  className="mb-2"
                />
                <h4 className="mt-2">Answers:</h4>
                <List
                  className="mb-2"
                  bordered
                  dataSource={question.answers}
                  renderItem={(answer) => (
                    <List.Item>
                      <Radio
                        checked={question.correctAnswer === answer.id}
                        onChange={() => handleSelectCorrectAnswer(question.id, answer.id)}
                      >
                        {answer.content}
                      </Radio>
                    </List.Item>
                  )}
                />
                <div className="flex gap-2 mb-2 w-full">
                  <Input
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Add new answer"
                    className="flex-grow"
                  />
                  <Button type="primary" onClick={() => handleAddAnswer(question.id)}>
                    Add Answer
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </div>
      </Form>
    </Card>
  );
};

export default QuizRenderEditForm;
