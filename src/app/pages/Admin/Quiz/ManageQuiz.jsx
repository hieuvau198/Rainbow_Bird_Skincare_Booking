import React, { useState, useEffect } from "react";
import { Button, Table, Tag, Space, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddQuiz from "./partials/AddQuiz";
import QuizDetail from "./partials/QuizDetail";
import getAllQuiz from "../../../modules/Quizzs/getAllQuiz"

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
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Total Points",
      dataIndex: "totalPoints",
      key: "totalPoints",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => (
        <Tag color={status ? "green" : "volcano"}>
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button color="gold" variant="solid" type="link">View Details</Button>
          {/* <Button type="link" danger onClick={() => handleDeleteQuiz(record)}>Delete</Button> */}
        </Space>
      ),
    },
  ];

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
      console.error("Error fetching quizs:", error);
    }
    setLoading(false);
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
          {/* <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            Add Quiz
          </Button> */}
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
