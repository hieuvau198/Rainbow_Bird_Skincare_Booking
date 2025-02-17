import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import getTherapists from "../../../../modules/Admin/Employee/getTherapist";
import AddTherapist from "./TherapistPartials/AddTherapist";
import ViewTherapistProfile from "./TherapistPartials/ViewTherapistProfile";

const TherapistTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedTherapistId, setSelectedTherapistId] = useState(null);
    const [addModalVisible, setAddModalVisible] = useState(false);

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 150 },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email", width: 250 },
        { title: "Mobile", dataIndex: "mobile", key: "mobile" },
        {
            title: "Action",
            key: "action",
            // render: (_, record) => (
            //     <Space size="middle">
            //         <Button color="gold" variant="solid" type="link" onClick={() => {
            //             setSelectedTherapistId(record.id);
            //             setDetailModalVisible(true);
            //         }}>View details</Button>
            //         <Button color="danger" variant="solid" type="link" danger>
            //             Delete
            //         </Button>
            //     </Space>
            // ),
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

    const handleAddTherapist = (values) => {
        console.log("New therapist data:", values);
    };

    return (
        <div>
            <div className="flex justify-between my-4">
                <div className="text-xs lg:text-xl font-medium">Therapist List</div>
                {/* <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
                    Add Therapist
                </Button> */}
            </div>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered
                scroll={{ x: "max-content", y: 350 }}
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
}

export default TherapistTable;