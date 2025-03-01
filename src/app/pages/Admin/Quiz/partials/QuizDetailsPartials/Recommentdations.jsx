import { Table, Tag, message, Button, Space, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import getRecomByQuizIdWithReferences from "../../../../../modules/Quizzs/getRecomByQuizIdWithReferences";
import deleteRecom from "../../../../../modules/Quizzs/deleteRecom";
import AddRecommend from "./AddRecommend";
import EditRecommend from "./EditRecommend";

const Recommendations = ({ quizId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recommendationToDelete, setRecommendationToDelete] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [recommendationToEdit, setRecommendationToEdit] = useState(null);

    // Fetch recommendations including Service details
    const loadRecommendations = async () => {
        setLoading(true);
        try {
            const recomData = await getRecomByQuizIdWithReferences(quizId);
            setData(recomData);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            message.error("Error fetching recommendations!");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (quizId) {
            loadRecommendations();
        }
    }, [quizId]);

    const handleDeleteRecom = async () => {
        if (!recommendationToDelete) return;
        try {
            await deleteRecom(recommendationToDelete.recommendationId);
            message.success("Recommendation deleted successfully!");
            setData((prev) =>
                prev.filter(
                    (recom) =>
                        recom.recommendationId !== recommendationToDelete.recommendationId
                )
            );
        } catch (error) {
            console.error("Error deleting recommendation:", error);
            message.error("Failed to delete recommendation!");
        } finally {
            setIsDeleteModalVisible(false);
            setRecommendationToDelete(null);
        }
    };

    const handleEditClick = (record) => {
        setRecommendationToEdit(record);
        setEditModalVisible(true);
    };

    const columns = [
        {
            title: "Service ID",
            dataIndex: "serviceId",
            key: "serviceId",
            width: 100,
        },
        {
            title: "Service Name",
            dataIndex: ["service", "serviceName"], // Updated to fetch from included service data
            key: "serviceName",
        },
        {
            title: "Price",
            dataIndex: ["service", "price"], // Updated
            key: "price",
            render: (price, record) => `${price} ${record.service.currency}`,
        },
        {
            title: "Min Score",
            dataIndex: "minScore",
            key: "minScore",
            width: 100,
        },
        {
            title: "Max Score",
            dataIndex: "maxScore",
            key: "maxScore",
            width: 100,
        },
        {
            title: "Status",
            dataIndex: "isActive",
            key: "isActive",
            width: 100,
            render: (isActive) => (
                <Tag color={isActive ? "green" : "red"}>
                    {isActive ? "Active" : "Inactive"}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEditClick(record)}>
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => {
                            setRecommendationToDelete(record);
                            setIsDeleteModalVisible(true);
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="mt-8">
            <div className="flex justify-between my-4">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setAddModalVisible(true)}
                >
                    Add recommend
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="recommendationId"
                loading={loading}
                pagination={{ pageSize: 5 }}
                bordered
                scroll={{ x: "max-content" }}
            />
            <AddRecommend
                open={addModalVisible}
                onClose={() => setAddModalVisible(false)}
                quizId={quizId}
                onAdded={loadRecommendations}
            />
            <Modal
                title="Confirm Delete"
                open={isDeleteModalVisible}
                onOk={handleDeleteRecom}
                onCancel={() => setIsDeleteModalVisible(false)}
                okText="Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to delete this recommendation?</p>
            </Modal>
            <EditRecommend
                open={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                recommendation={recommendationToEdit}
                onEdited={loadRecommendations}
            />
        </div>
    );
};

export default Recommendations;
