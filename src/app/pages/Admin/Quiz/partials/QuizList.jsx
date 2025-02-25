import React from "react";
import { Table, Tag, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const QuizList = ({ quizzes, loading, onViewDetails }) => {
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
            </div>
            <Table
                columns={columns}
                dataSource={quizzes}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                bordered
            />
        </>
    );
};

export default QuizList;
