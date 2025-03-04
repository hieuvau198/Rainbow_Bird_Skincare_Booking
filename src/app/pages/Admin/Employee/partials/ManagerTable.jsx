
import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import userRole from "../../../../../enums/userRole";
import getAllUser from "../../../../modules/Admin/Employee/getAllUser";
import AddManager from "./ManagerPartials/AddManager";
import addEmployee from "../../../../modules/Admin/Employee/addEmployee";
import SearchBar from "../../../../components/SearchBar";

const ManagerTable = () => {
  const [data, setData] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 50 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email", width: 250 },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    {
      title: "Action",
      key: "action",
      // render: (_, record) => (
      //   <Space size="middle">
      //     <Button color="gold" variant="solid" type="link">View details</Button>
      //     <Button color="danger" variant="solid" type="link" danger>
      //       Delete
      //     </Button>
      //   </Space>
      // ),
    },
  ];

  const loadManagerData = async () => {
    setLoading(true);
    try {

      const allUsers = await getAllUser();
      const managerUsers = allUsers.filter(
        (user) => user.role === userRole.MANAGER
      );

      const formattedData = managerUsers.map((user) => ({
        key: user.userId,
        id: user.userId,
        name: user.fullName,
        email: user.email,
        mobile: user.phone,

      }));
      setData(formattedData);
      setFilteredManagers(formattedData);
    } catch (error) {
      console.error("Error fetching manager data:", error);
      setData([]);
      setFilteredManagers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadManagerData();
  }, []);

  const handleAddManager = async (values) => {
    try {
      const newManager = await addEmployee(values);
      setData((prevData) => [
        ...prevData,
        { key: newManager.username, ...newManager },
      ]);
      setFilteredManagers((prevData) => [
        ...prevData,
        { key: newManager.username, ...newManager },
      ]);
      setAddModalVisible(false);
      loadManagerData();
      message.success("Manager added successfully!");
    } catch (error) {
      console.error("Error adding Manager:", error);
      message.error("Error adding Manager!");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter((manager) =>
      manager.name.toLowerCase().includes(value)
    );
    setFilteredManagers(filtered);
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="text-xl font-medium">Manager List</div>
        <div className="flex items-center">
          <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddModalVisible(true)}>
            Add Manager
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredManagers}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ x: "max-content", y: 400 }}
      />
      <AddManager
        open={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSubmit={handleAddManager}
      />
    </div>
  );
};

export default ManagerTable;