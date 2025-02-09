import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button } from "antd";
import getTherapists from "../../../../modules/Admin/Employee/getTherapist";
import therapist from "../../../../../mocks/Admin/therapist.json";

const TherapistTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 50 },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email", width: 250 },
        { title: "Mobile", dataIndex: "mobile", key: "mobile" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Active" ? "green" : "volcano"}>{status}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button color="primary" variant="solid" type="link">Edit</Button>
                    <Button color="danger" variant="solid" type="link" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const fetchTherapists = async () => {
        setLoading(true);
        try {
            // const therapistsData = await getTherapists();
            const formattedData = therapist.map((item) => ({
                id: item.therapistId,
                name: item.user.fullName,
                email: item.user.email,
                mobile: item.user.phone,
                status: item.isAvailable ? "Active" : "Inactive",
            }));
            setData(formattedData);
        } catch (error) {
            console.error("Error:", error);
            setData([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTherapists();
    }, []);

    const handleAdd = () => {
        console.log("Add Therapist clicked");
    };

    return (
        <div>
            <div className="flex justify-between my-4">
                <div className="text-xl font-medium">Therapist Management</div>
                <Button type="primary" onClick={handleAdd}>
                    Add Therapist
                </Button>
            </div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered
                scroll={{ y: 350 }}
            />
        </div>
    );
}

export default TherapistTable;