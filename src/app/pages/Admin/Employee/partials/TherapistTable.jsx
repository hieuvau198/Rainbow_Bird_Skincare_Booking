import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Table, Tag, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import getTherapists from "../../../../modules/Admin/Employee/getTherapist";
import AddTherapist from "./TherapistPartials/AddTherapist";
import ViewTherapistProfile from "./TherapistPartials/ViewTherapistProfile";
import addTherapist from "../../../../modules/Admin/Employee/addTherapist";
import SearchBar from "../../../../components/SearchBar";

const TherapistTable = () => {
    const [data, setData] = useState([]);
    const [filteredTherapists, setFilteredTherapists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedTherapistId, setSelectedTherapistId] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");

    const columns = [
        // { title: "ID", dataIndex: "id", key: "id", width: 50 },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email", width: 250 },
        { title: "Mobile", dataIndex: "mobile", key: "mobile" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 100,
            render: (status) => (
                <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button color="primary" variant="solid" type="link" onClick={() => {
                        setSelectedTherapistId(record.id);
                        setDetailModalVisible(true);
                    }}>
                        View details
                    </Button>
                </Space>
            ),
        },
    ];

    const fetchTherapists = async () => {
        setLoading(true);
        try {
            const therapistsData = await getTherapists();
            const formattedData = therapistsData.map((item) => ({
                id: item.therapistId,
                name: item.user.fullName,
                email: item.user.email,
                mobile: item.user.phone,
                status: item.isAvailable ? "Active" : "Inactive",
            }));
            setData(formattedData);
            setFilteredTherapists(formattedData);
        } catch (error) {
            console.error("Error fetching therapists:", error);
            setData([]);
            setFilteredTherapists([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTherapists();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        const filtered = data.filter((therapist) =>
            therapist.name.toLowerCase().includes(value)
        );
        setFilteredTherapists(filtered);
    };

    const handleAddTherapist = async (values) => {
        try {
            const newTherapist = await addTherapist(values);
            fetchTherapists();
            setAddModalVisible(false);
            message.success("Therapist added successfully!");
        } catch (error) {
            console.error("Error adding therapist:", error);
            message.error("Error adding therapist!");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Therapist List</h2>
                <div className="flex items-center">
                    <SearchBar
                        searchText={searchText}
                        onSearchChange={handleSearchChange}
                    />
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setAddModalVisible(true)}
                        className="ml-4"
                    >
                        Add Therapist
                    </Button>
                </div>
            </div>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredTherapists}
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered
                scroll={{ x: "max-content", y: 370 }}
            />

            <ViewTherapistProfile
                open={detailModalVisible}
                therapistId={selectedTherapistId}
                onClose={() => setDetailModalVisible(false)}
            />

            <AddTherapist
                open={addModalVisible}
                onClose={() => setAddModalVisible(false)}
                onSubmit={handleAddTherapist}
            />
        </div>
    );
};

export default TherapistTable;
