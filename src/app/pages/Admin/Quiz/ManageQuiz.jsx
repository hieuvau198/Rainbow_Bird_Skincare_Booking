import React, { useState, useEffect } from "react";
import { Button, Table, Tag, Space, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddQuiz from "./partials/AddQuiz";
import QuizDetail from "./partials/QuizDetail";

const ManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Quiz Name",
      dataIndex: "quizName",
      key: "quizName",
    },
    {
      title: "Duration (mins)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "volcano"}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleViewDetails(record)}>View Details</Button>
          <Button type="link" danger onClick={() => handleDeleteQuiz(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      // Simulate fetching data from an API
      const mockData = [
        { id: 1, quizName: "Quiz 1", duration: 30, status: "active" },
        { id: 2, quizName: "Quiz 2", duration: 45, status: "inactive" },
        { id: 3, quizName: "Quiz 3", duration: 60, status: "active" },
      ];
      setQuizzes(mockData);
    } catch (error) {
      message.error("Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleAddQuiz = (quiz) => {
    const newQuiz = { id: quizzes.length + 1, ...quiz };
    setQuizzes([...quizzes, newQuiz]);
    setIsAddModalVisible(false);
    message.success("Quiz added successfully!");
  };

  const handleViewDetails = (quiz) => {
    setSelectedQuiz(quiz);
    setIsDetailModalVisible(true);
  };

  const handleDeleteQuiz = (quiz) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete quiz: ${quiz.quizName}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setQuizzes(quizzes.filter((q) => q.id !== quiz.id));
        message.success("Quiz deleted successfully!");
      },
    });
  };

  return (
    <div className="p-6 max-w-[1270px]">
      <div className="p-6 bg-white rounded-md shadow-md min-h-[580px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Manage Quizzes</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add Quiz
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={quizzes}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
        />
        <AddQuiz
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          onSubmit={handleAddQuiz}
        />
        <QuizDetail
          visible={isDetailModalVisible}
          onClose={() => setIsDetailModalVisible(false)}
          quiz={selectedQuiz}
          onQuizUpdate={(updatedQuiz) => {
            setQuizzes((prevQuizzes) =>
              prevQuizzes.map((q) => (q.id === updatedQuiz.id ? updatedQuiz : q))
            );
          }}
        />
      </div>
    </div>
  );
};

export default ManageQuiz;
