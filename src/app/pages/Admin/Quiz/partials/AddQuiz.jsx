import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, List, message, Radio, Tag } from "antd";

const AddQuiz = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [questionContent, setQuestionContent] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answerContent, setAnswerContent] = useState("");

  const handleAddAnswer = () => {
    if (!answerContent) {
      message.error("Please enter the answer content.");
      return;
    }
    setAnswers([...answers, { id: answers.length, content: answerContent }]);
    setAnswerContent("");
  };

  const handleAddQuestion = () => {
    if (!questionContent) {
      message.error("Please enter the question content.");
      return;
    }
    if (answers.length < 2) {
      message.error("Please add at least two answers.");
      return;
    }
    if (correctAnswer === null) {
      message.error("Please select the correct answer.");
      return;
    }
    setQuestions([...questions, { id: questions.length + 1, content: questionContent, answers, correctAnswer }]);
    setQuestionContent("");
    setAnswers([]);
    setCorrectAnswer(null);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (questions.length === 0) {
        message.error("Please add at least one question.");
        return;
      }
      onSubmit({ ...values, questions });
      form.resetFields();
      setQuestions([]);
    } catch (error) {
      message.error("Please complete the form correctly.");
    }
  };

  return (
    <Modal
      visible={visible}
      title="Add New Quiz"
      onCancel={onClose}
      onOk={handleOk}
      okText="Add Quiz"
    >
      <Form form={form} layout="vertical">
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
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Add Questions</h3>
          <div className="flex gap-2 mb-2">
            <Input
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
              placeholder="Enter question content"
            />
          </div>
          <h4 className="mt-2">Add Answers</h4>
          <div className="flex gap-2 mb-2">
            <Input
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              placeholder="Enter answer content"
            />
            <Button type="primary" onClick={handleAddAnswer}>
              Add Answer
            </Button>
          </div>
          <List
            bordered
            dataSource={answers}
            renderItem={(item) => (
              <List.Item>
                <Radio
                  checked={correctAnswer === item.id}
                  onChange={() => setCorrectAnswer(item.id)}
                >
                  {item.content}
                </Radio>
              </List.Item>
            )}
          />
          <Button type="dashed" block className="mt-4" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </div>
        <List
          className="mt-4"
          bordered
          header={<strong>Questions List</strong>}
          dataSource={questions}
          renderItem={(item) => (
            <List.Item>
              <strong>Question {item.id}:</strong> {item.content}
              <List
                className="mt-2"
                bordered
                dataSource={item.answers}
                renderItem={(answer, index) => (
                  <List.Item>
                    {index + 1}. {answer.content} {item.correctAnswer === index ? <Tag color="green">Correct</Tag> : null}
                  </List.Item>
                )}
              />
            </List.Item>
          )}
        />
      </Form>
    </Modal>
  );
};

export default AddQuiz;
