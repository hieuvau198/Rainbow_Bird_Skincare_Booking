import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import SearchBar from "../../../../components/SearchBar";

const QuizList = ({ quizzes, loading, onViewDetails }) => {
    const [searchText, setSearchText] = useState("");
    const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);

    useEffect(() => {
        setFilteredQuizzes(quizzes);
    }, [quizzes]);

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = quizzes.filter((quiz) =>
            quiz.quizName.toLowerCase().includes(value)
        );
        setFilteredQuizzes(filtered);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Quiz Name", dataIndex: "quizName", key: "quizName" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Total Points", dataIndex: "totalPoints", key: "totalPoints" },
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
                    <Button color="primary" variant="solid" type="link" onClick={() => onViewDetails(record.id)}>
                        View Details
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Quizzes</h2>
                <SearchBar
                    searchText={searchText}
                    onSearchChange={handleSearchChange}
                />
            </div>
            <Table
                columns={columns}
                dataSource={filteredQuizzes}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                bordered
                scroll={{ x: "max-content", y: 370 }}
            />
        </>
    );
};

export default QuizList;
